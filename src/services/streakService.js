import { supabase } from '../lib/supabase';

/**
 * Atualiza o streak de dias consecutivos do usuário
 * @param {string} userId - ID do usuário
 */
export async function updateUserStreak(userId) {
  if (!userId) {
    console.warn('updateUserStreak: userId não fornecido');
    return;
  }

  try {
    // Buscar dados atuais do usuário
    const { data: userData, error: fetchError } = await supabase
      .from('profiles')
      .select('streak_days, last_login_date')
      .eq('id', userId)
      .single();

    if (fetchError) {
      console.error('Erro ao buscar dados do usuário:', fetchError.message);
      return;
    }

    const today = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
    const lastLoginDate = userData?.last_login_date;
    const currentStreak = userData?.streak_days || 0;

    // Se não há last_login_date (primeiro login)
    if (!lastLoginDate) {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          streak_days: 0, // Primeiro dia não conta como consecutivo
          last_login_date: today
        })
        .eq('id', userId);

      if (updateError) {
        console.error('Erro ao atualizar primeiro login:', updateError.message);
      } else {
        console.log('Primeiro login registrado - streak_days = 0');
      }
      return;
    }

    // Se já logou hoje, não fazer nada
    if (lastLoginDate === today) {
      console.log('Usuário já logou hoje - streak mantido');
      return;
    }

    // Calcular diferença em dias
    const lastLogin = new Date(lastLoginDate);
    const currentDate = new Date(today);
    const diffTime = currentDate.getTime() - lastLogin.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    let newStreak = currentStreak;

    if (diffDays === 1) {
      // Login no dia seguinte - incrementar streak
      newStreak = currentStreak + 1;
      console.log(`Login consecutivo - streak incrementado para ${newStreak}`);
    } else if (diffDays > 1) {
      // Login após pular dias - resetar streak
      newStreak = 1;
      console.log(`Streak quebrado após ${diffDays} dias - resetado para 1`);
    }

    // Atualizar no banco
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        streak_days: newStreak,
        last_login_date: today
      })
      .eq('id', userId);

    if (updateError) {
      console.error('Erro ao atualizar streak:', updateError.message);
    } else {
      console.log(`Streak atualizado: ${currentStreak} → ${newStreak}`);
    }

  } catch (error) {
    console.error('Erro inesperado em updateUserStreak:', error);
  }
}
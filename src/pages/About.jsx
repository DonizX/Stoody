import { useNavigate } from "react-router-dom";
import logo from "../assets/logo-stoody.png";

function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* NAVBAR */}
      <nav className="w-full px-4 sm:px-8 py-4 flex justify-between items-center bg-white shadow-md border-b border-gray-200">
        <img 
          src={logo} 
          className="h-12 sm:h-16 object-contain cursor-pointer hover:opacity-80 transition" 
          alt="Stoody"
          onClick={() => navigate("/")}
        />

        <div className="flex gap-3 sm:gap-4">
          <button 
            onClick={() => navigate("/")}
            className="border-2 border-purple-600 text-purple-600 px-4 sm:px-6 py-2 rounded-full font-semibold hover:bg-purple-50 transition text-sm sm:text-base"
          >
            Login
          </button>
          <button 
            onClick={() => navigate("/signup")}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 sm:px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all text-sm sm:text-base"
          >
            Criar Conta
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-purple-600 to-pink-600 text-white py-12 sm:py-20 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Bem-vindo ao Stoody 🎓
          </h1>
          <p className="text-lg sm:text-xl text-purple-100">
            A plataforma revolucionária para aprender idiomas de forma divertida e interativa
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12 sm:py-20">
        
        {/* ABOUT SECTION */}
        <section className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Sobre Stoody
          </h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
            Stoody é uma plataforma educacional inovadora que combina a poder do aprendizado de idiomas com 
            elementos de gamificação para criar uma experiência única e envolvente. Nossa missão é tornar o 
            aprendizado de idiomas acessível, divertido e eficaz para todos.
          </p>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            Com conteúdo baseado em seus filmes, séries e animes favoritos, você aprende de forma natural 
            e imersiva, transformando atividades do dia a dia em oportunidades de aprendizado.
          </p>
        </section>

        {/* FEATURES SECTION */}
        <section className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
            Por que Stoody?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 sm:p-8 rounded-2xl border-2 border-purple-200">
              <div className="text-4xl mb-4">🎮</div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                Gamificação Completa
              </h3>
              <p className="text-gray-700 text-base sm:text-lg">
                Ganhe XP, suba de nível, acumule moedas e desbloqueie achievements enquanto aprende. 
                Transformamos o aprendizado em uma jornada épica!
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 sm:p-8 rounded-2xl border-2 border-blue-200">
              <div className="text-4xl mb-4">🎬</div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                Conteúdo Pop Culture
              </h3>
              <p className="text-gray-700 text-base sm:text-lg">
                Aprenda através de cenas de seus animes, séries e filmes favoritos. 
                Contexto real + entretenimento = aprendizado efetivo.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 sm:p-8 rounded-2xl border-2 border-green-200">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                Cursos Estruturados
              </h3>
              <p className="text-gray-700 text-base sm:text-lg">
                Aprenda com progressão lógica desde o básico até o avançado. 
                Cada curso tem vídeos, exercícios e quizzes.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 sm:p-8 rounded-2xl border-2 border-orange-200">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                Aprendizado Rápido
              </h3>
              <p className="text-gray-700 text-base sm:text-lg">
                Aulas curtas e objetivas (10-15 minutos). Perfeito para quem tem uma agenda ocupada.
              </p>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
            Como Funciona
          </h2>
          
          <div className="space-y-6">
            <div className="flex gap-4 sm:gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-600 text-white font-bold text-lg">
                  1
                </div>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                  Escolha um Curso
                </h3>
                <p className="text-gray-700 text-base sm:text-lg mt-2">
                  Navegue por nossos cursos de vários idiomas e escolha o que mais te interessa. 
                  Cada um foi cuidadosamente preparado por especialistas.
                </p>
              </div>
            </div>

            <div className="flex gap-4 sm:gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-600 text-white font-bold text-lg">
                  2
                </div>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                  Assista e Aprenda
                </h3>
                <p className="text-gray-700 text-base sm:text-lg mt-2">
                  Assista a um vídeo curto com cenas do seu conteúdo favorito. 
                  Você vai entender o contexto real das palavras.
                </p>
              </div>
            </div>

            <div className="flex gap-4 sm:gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-600 text-white font-bold text-lg">
                  3
                </div>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                  Responda Quizzes
                </h3>
                <p className="text-gray-700 text-base sm:text-lg mt-2">
                  Teste seu conhecimento com perguntas divertidas e interativas. 
                  Cada resposta correta ganha você XP e moedas!
                </p>
              </div>
            </div>

            <div className="flex gap-4 sm:gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-600 text-white font-bold text-lg">
                  4
                </div>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                  Suba de Nível
                </h3>
                <p className="text-gray-700 text-base sm:text-lg mt-2">
                  Conforme você aprende, você sobe de nível e desbloqueia novos cursos e conquistas. 
                  Acompanhe seu progresso na barra de XP.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* GAMIFICATION */}
        <section className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
            Sistema de Gamificação
          </h2>
          
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 sm:p-10 rounded-2xl border-2 border-purple-200">
            <p className="text-base sm:text-lg text-gray-700 mb-6">
              Stoody usa um sistema único de recompensas para manter você motivado:
            </p>
            
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <span className="text-2xl">⭐</span>
                <div>
                  <h4 className="font-bold text-gray-900">XP (Experiência)</h4>
                  <p className="text-gray-700 text-base sm:text-lg">Ganhe XP por resposta correta. A cada progressão você sobe de nível!</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-2xl">💰</span>
                <div>
                  <h4 className="font-bold text-gray-900">Moedas</h4>
                  <p className="text-gray-700 text-base sm:text-lg">Colecione moedas em cada aula. Use para comprar itens especiais na loja.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-2xl">🏆</span>
                <div>
                  <h4 className="font-bold text-gray-900">Badges</h4>
                  <p className="text-gray-700 text-base sm:text-lg">Desbloqueie insígnias raras ao completar desafios especiais.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-2xl">📈</span>
                <div>
                  <h4 className="font-bold text-gray-900">Níveis</h4>
                  <p className="text-gray-700 text-base sm:text-lg">Progresso visual do seu crescimento na plataforma. Quanto mais aprende, mais sobe!</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12 sm:py-16 px-6 sm:px-8 rounded-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Pronto para Começar?
          </h2>
          <p className="text-lg sm:text-xl text-purple-100 mb-8">
            Crie sua conta gratuitamente e comece sua jornada de aprendizado
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="bg-white text-purple-600 px-8 py-3 rounded-full font-bold text-lg hover:shadow-lg transition-all active:scale-95"
          >
            Criar Conta Agora 🚀
          </button>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-base sm:text-lg mb-4">
            © 2024 Stoody - Aprenda idiomas de forma divertida
          </p>
          <p className="text-sm text-gray-500">
            Criado com ❤️ para aprendizes de todo o mundo
          </p>
        </div>
      </footer>
    </div>
  );
}

export default About;

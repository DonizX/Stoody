# Stoody

## Visão geral do projeto

Stoody é uma plataforma web de aprendizado gamificada construída em React. A aplicação oferece inscrição, autenticação e acompanhamento de progresso para estudantes que desejam transformar estudo em hábito com elementos de gamificação.

O projeto resolve o problema de falta de engajamento em plataformas de aprendizagem online, combinando recursos de progresso contínuo, pontuação por experiência, streaks de uso e suporte direto via email.

O propósito da plataforma é oferecer uma experiência de estudo mais motivadora e estruturada para usuários que buscam organizar o aprendizado por meio de cursos, rewards e feedback de uso.

Usuários-alvo:

- Estudantes e aprendizes digitais
- Usuários que desejam acompanhar progresso e rendimento
- Pessoas que valorizam gamificação e métricas de engajamento
- Equipes de educação que usam um MVP frontend com backend gerenciado

## Funcionalidades do sistema

### Autenticação e cadastro

- Cadastro de novos usuários com nome, email e senha
- Login de usuários existentes
- Fluxo de autenticação integrado a Supabase
- Validação básica de email e senha no frontend

### Gamificação

- Sistema de XP para representar progresso dentro da aplicação
- Níveis e `coins` como elementos de recompensa
- Indicação de progresso visual com barras e indicadores
- Streak de uso para rastrear sequência de acessos ou ações consecutivas

### Envio de email automático

- Envio de email de boas-vindas ao cadastrar um novo usuário
- Envio de email de suporte a partir do formulário de contato
- Integração com EmailJS para disparo de templates configurados
- Uso de templates específicos para contato e boas-vindas

### Página de contato

- Formulário de contato com título e mensagem
- Envio direto ao canal de suporte configurado em EmailJS
- Feedback de envio bem-sucedido ou de erro ao usuário

### Perfil do usuário

- Página de perfil com informações do usuário
- Exibição de progresso e dados de usuário autenticado
- Possibilidade de acessar histórico e métricas de aprendizado

### Cursos e progresso

- Navegação para páginas de cursos e aula individual
- Página de curso que demonstra a estrutura de aprendizado
- Integração com dados armazenados em Supabase para persistência

### Estado global e persistência

- Uso de Context API para gerenciamento de estado global
- Contextos dedicados para jogo e sidebar
- Persistência de dados de usuário e progresso com Supabase
- Estados reativos compartilhados entre páginas e componentes

## Arquitetura do projeto

### Stack principal

- React 19 como base da aplicação frontend
- Create React App com `react-scripts` para build e desenvolvimento
- Tailwind CSS para estilização utilitária e responsiva
- React Router DOM para navegação entre rotas

### Backend e serviços externos

- Supabase utilizado para autenticação (`auth`) e persistência de dados
- EmailJS utilizado para enviar emails de boas-vindas e suporte
- `.env` para guardar IDs de serviço EmailJS e possíveis chaves do Supabase

### Gerenciamento de estado

- Context API nativa do React para estados globais
- `GameContext` para dados de usuário, XP, coins e autenticação
- `SidebarContext` para controle de colapso da navegação lateral

### Estrutura de componentes e páginas

- `src/pages/` contém as páginas principais: `Home`, `Login`, `Signup`, `About`, `CoursePlayer`, `Shop`, `Profile`, `Leaderboard`, `Contact`
- `src/components/` concentra elementos reutilizáveis como `Navbar`, `Sidebar`, `CourseCard`, `QuestionCard`, `Quiz`, `VideoSection` e `CompletionCard`
- `src/lib/` guarda integrações externas como `emailjs.js`
- `src/context/` mantém logicamente os providers de estado
- `src/services/` hospeda utilitários como `streakService.js`

## Segurança e variáveis de ambiente

- O projeto depende de variáveis sensíveis armazenadas em `.env`
- Variáveis EmailJS estão definidas como `REACT_APP_EMAILJS_SERVICE_ID`, `REACT_APP_EMAILJS_PUBLIC_KEY`, `REACT_APP_EMAILJS_WELCOME_TEMPLATE_ID` e `REACT_APP_EMAILJS_CONTACT_TEMPLATE_ID`
- Em produção, essas variáveis devem ser configuradas na plataforma de deploy (Vercel) sem inclusão no repositório
- A exposição de chaves em código-fonte público compromete segurança e confiabilidade do serviço

## Deploy

- O projeto está pronto para deploy em Vercel com build padrão de Create React App
- Deploy automático pode ser configurado via GitHub
- Variáveis de ambiente em Vercel devem ser configuradas exatamente como no `.env`
- O comando de build principal é `npm run build`

## UI/UX

- Interface moderna construída com Tailwind CSS
- Layout responsivo e adaptado para desktop e mobile
- Design focado em simplicidade e clareza de leitura
- Experiência gamificada com elementos visuais de progresso, níveis e coins
- Navegação consistente com sidebar e barra superior

## Conclusão técnica

Stoody é um projeto bem estruturado para um MVP de plataforma educacional gamificada. Ele combina tecnologias modernas de frontend com serviços externos gerenciados, oferecendo uma base sólida para prototipagem e validação de produto.

A arquitetura é coerente para o escopo atual: React no frontend, Supabase para backend e EmailJS para comunicação. A aplicação demonstra foco em UX e engajamento, com um conjunto de funcionalidades que suporta cadastro, autenticação, envio de email e acompanhamento de progresso.

## 🔎 Feedback técnico do projeto

### Organização do código

A organização é funcional e segue uma separação razoável entre páginas, componentes, contextos e integrações. O uso de, pelo menos, duas camadas de contexto mostra preocupação com o gerenciamento de estado global.

### Estrutura de pastas

A estrutura de pastas é direta e adequada para um projeto de tamanho médio. As pastas `pages`, `components`, `context`, `lib` e `services` refletem responsabilidades claras.

### Qualidade da arquitetura

A arquitetura apresenta uma solução híbrida de frontend leve com backend gerenciado. A escolha por Supabase e EmailJS reduz o trabalho de infraestrutura, o que é apropriado para produtos em fase inicial.

### Escalabilidade

O projeto está posicionado para crescer de forma incremental. A base React + Context API funciona bem para o estado atual, mas a evolução para um gerenciamento de estado mais robusto pode ser necessária com aumento de complexidade.

### Boas práticas aplicadas

- Uso de variáveis de ambiente para serviços externos
- Separação de responsabilidades por pasta
- Utilização de Context API para estado global
- Dependências modernas e compatíveis com o ecossistema React

### Possíveis melhorias futuras

- Refinar a organização dos serviços e integrações em camadas mais explícitas
- Ampliar testes automatizados além do ambiente padrão do CRA
- Introduzir logs e tratamento de erros mais centralizados
- Considerar modularizar ainda mais componentes e dados de curso

### Nível de maturidade

O projeto se posiciona entre o nível intermediário e profissional. Ele demonstra entendimento de práticas de desenvolvimento web e uso de serviços SaaS, mas ainda mantém a simplicidade de um MVP. Para um nível totalmente SaaS-ready, depende de evolução em testes, observabilidade e organização de backend/aplicações.

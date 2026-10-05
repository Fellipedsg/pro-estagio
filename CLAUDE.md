# Pró-Estágio — guia para o Claude Code

Protótipo navegável de um app que conecta estudantes a vagas de estágio.
Todos os dados são fictícios (sem backend). Idioma da interface: português do Brasil.

## Stack

- React 18 + TypeScript (strict) + Vite 5
- Sem bibliotecas de UI: estilos em `src/styles/global.css` (classes utilitárias próprias)
- Fonte Manrope (Google Fonts), ícones SVG próprios em `src/components/Icon.tsx`

## Comandos

```bash
npm install      # instala dependências
npm run dev      # servidor local em http://localhost:5173
npm run build    # checa tipos (tsc) e gera dist/
npm run preview  # abre a versão de produção localmente
```

Sempre rode `npm run build` antes de commitar: ele falha se houver erro de tipo
ou variável não usada (`noUnusedLocals` / `noUnusedParameters`).

## Publicação

- Repositório: https://github.com/Fellipedsg/pro-estagio
- Site público (sem login): https://fellipedsg.github.io/pro-estagio/
- Todo push na branch `main` dispara `.github/workflows/deploy.yml`, que builda e
  publica no GitHub Pages em ~1 minuto. O link e o QR code nunca mudam.
- `vite.config.ts` usa `base: '/pro-estagio/'` no build — não remover.

## Estrutura

```
src/
  main.tsx              ponto de entrada
  App.tsx               moldura do iPhone, roteamento por abas/pilhas, painel lateral
  state/AppContext.tsx  estado global (etapa, abas, pilhas de rotas, favoritos,
                        candidaturas, chats, sheets, toasts) e todas as ações
  data/types.ts         tipos: Company, Job, Application, Route, Sheet…
  data/mock.ts          empresas (9), vagas (10), candidaturas e chats iniciais
  components/           Icon, ui (Logo, Ring, JobCard, TabBar…), IllustratedMap
  screens/Access.tsx    Splash, Onboarding, Login, Cadastro
  screens/Tabs.tsx      Perfil, Meu Currículo, Oportunidades, Empresas
  screens/Details.tsx   Vaga, Empresa, Chat, Notificações, Candidaturas, Mapa
  screens/Overlays.tsx  Candidatura rápida, Editar currículo, Sucesso
  styles/global.css     tokens de cor e classes
```

## Convenções

- Navegação: cada aba tem uma pilha de `Route` (`actions.push`, `actions.back`).
- Para adicionar empresa/vaga, edite `src/data/mock.ts`; ao criar empresa, dê
  `mapX`/`mapY` (mapa ilustrado de 1000×720) e ela aparece em Empresas e no mapa.
- Cores (tokens): primária `#1463F3`, escura `#0B4AC7`, clara `#6FA3FF`,
  suave `#EAF1FF`, texto `#0E1B3D`, fundo `#F4F7FD`.
- Textos de interface em pt-BR; nomes de código em inglês.

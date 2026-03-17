# Turistei

App de descoberta de locais (restaurantes, bares, pubs, padarias, cafeterias) em **Barretos, SP**.

---

## O que é o Turistei?

O Turistei é um aplicativo mobile que ajuda você a descobrir lugares para visitar na cidade. Você pode ver categorias (como Restaurantes, Bares, Cafeterias), buscar por nome, salvar favoritos e ver detalhes de cada lugar. Por enquanto os dados são mockados (fictícios), mas a estrutura está pronta para conectar a um backend depois.

---

## O que foi feito nesta atualização?

Esta versão trouxe várias melhorias que deixam o app mais organizado, bonito e fácil de manter:

1. **Estilização com Tailwind (NativeWind)** — Antes os estilos eram escritos em objetos JavaScript (`StyleSheet.create`). Agora usamos classes prontas como no CSS da web (`className="bg-primary rounded-xl"`), o que deixa o código mais legível e consistente.

2. **Fluxo de login e rotas** — Adicionamos telas de login e cadastro, e corrigimos o problema do botão "voltar" do Android que dava erro quando não havia tela anterior. Agora o app redireciona corretamente e o fluxo de navegação está estável.

3. **StatusBar legível** — A barra de status (hora, bateria, sinal) no topo do celular estava invisível em algumas telas. Ajustamos para que os ícones tenham contraste e sejam visíveis em qualquer tela.

4. **Layout dos cards e da barra inferior** — Os cards de lugares ganharam cantos mais arredondados, sombra e ícones de estrela e localização. A barra de navegação inferior (tabs) ficou flutuante, com cantos arredondados e ícones em vez de emojis.

---

## Glossário (termos técnicos explicados)

| Termo | O que significa |
|-------|-----------------|
| **NativeWind** | Biblioteca que permite usar Tailwind CSS dentro do React Native. O Tailwind é um conjunto de classes prontas (como `bg-primary`, `rounded-xl`) para estilizar telas sem escrever CSS manual. |
| **Tailwind CSS** | Framework de estilos que usa classes utilitárias. Em vez de criar um estilo "botão verde arredondado" do zero, você combina classes: `bg-primary rounded-xl`. |
| **StyleSheet** | Forma nativa do React Native de definir estilos. Você cria um objeto com as propriedades (backgroundColor, padding, etc.) e aplica com `style={styles.botao}`. |
| **className** | Atributo que recebe classes do Tailwind. Ex.: `className="flex-1 bg-primary"`. No React para web é comum; no React Native só funciona com NativeWind. |
| **expo-router** | Biblioteca de rotas baseada em arquivos. A pasta `app/` define as telas: `app/index.tsx` é a rota `/`, `app/(tabs)/buscar/index.tsx` é `/buscar`, etc. |
| **Rotas tipadas** | O TypeScript conhece as rotas do app. Ao usar `router.push({ pathname: '/lugar/[id]', params: { id } })`, o editor sugere e valida os parâmetros. |
| **StatusBar** | A faixa no topo do celular que mostra hora, bateria, sinal. No código controlamos a cor dos ícones (claro ou escuro) e o fundo. |
| **SafeAreaView** | Componente que evita que o conteúdo fique embaixo do notch (entalhe) ou da barra de status. Garante que nada seja cortado. |
| **handleBack / canGoBack** | `router.canGoBack()` verifica se existe tela anterior na pilha. Se não existir, usamos `router.replace()` para ir para uma tela segura em vez de dar erro. |
| **BackHandler** | API do React Native que intercepta o botão "voltar" físico do Android. Usamos para evitar o erro "GO_BACK was not handled" na tela de login. |

---

## Stack técnica

| Tecnologia | Versão | O que faz |
|------------|--------|-----------|
| **Expo** | SDK 54 | Plataforma para criar apps React Native sem configurar Android/iOS manualmente. |
| **React Native** | 0.81 | Framework para construir interfaces nativas (Android/iOS) com JavaScript/React. |
| **React** | 19 | Biblioteca para construir interfaces com componentes reutilizáveis. |
| **TypeScript** | 5.9 | JavaScript com tipagem. Ajuda a evitar erros e melhora a autocompletar no editor. |
| **expo-router** | 6.x | Rotas baseadas em arquivos (cada arquivo em `app/` vira uma tela). |
| **NativeWind** | 4.x | Tailwind CSS para React Native. |
| **Tailwind CSS** | 3.x | Classes utilitárias de estilo. |
| **Supabase** | 2.x | Backend-as-a-Service (autenticação, banco). Preparado para uso futuro. |

---

## Estrutura do projeto

```
├── app/                      # Rotas (cada arquivo = uma tela)
│   ├── _layout.tsx           # Layout raiz (SafeArea, StatusBar, Stack)
│   ├── index.tsx             # Entrada: redireciona para login ou home
│   ├── (auth)/               # Grupo de rotas de autenticação
│   │   ├── _layout.tsx       # Stack com BackHandler no login
│   │   ├── login.tsx         # Tela de login (Google)
│   │   └── cadastro.tsx      # Tela de cadastro
│   ├── (tabs)/               # Grupo com bottom tabs
│   │   ├── _layout.tsx       # Tab navigator (Início, Buscar, Favoritos, Perfil)
│   │   ├── index.tsx         # Home (Início)
│   │   ├── buscar/           # Aba Buscar
│   │   │   ├── _layout.tsx   # Stack (index → resultados)
│   │   │   ├── index.tsx     # Hero da busca
│   │   │   └── resultados.tsx
│   │   ├── favoritos.tsx
│   │   └── perfil.tsx
│   ├── lugar/[id].tsx        # Detalhe do lugar (rota dinâmica)
│   ├── filtros.tsx           # Modal de filtros
│   └── mapa.tsx              # Tela do mapa
├── components/               # Componentes reutilizáveis
│   ├── Header.tsx
│   ├── SearchBar.tsx
│   ├── CategoryChip.tsx
│   ├── PlaceCard.tsx
│   ├── PlaceCardGrid.tsx
│   ├── PlaceCardHorizontal.tsx
│   ├── BottomNav.tsx
│   ├── MapViewWrapper.native.tsx
│   ├── MapViewWrapper.web.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       └── Link.tsx
├── constants/
│   └── theme.ts              # Cores e tokens de design
├── data/                     # Dados mockados
│   ├── categories.ts
│   └── places.ts
├── hooks/
│   ├── useAuth.ts            # Autenticação (Supabase)
│   └── useFavorites.ts       # Favoritos (AsyncStorage)
├── lib/
│   └── supabase.ts          # Cliente Supabase
├── global.css                # Diretivas Tailwind
├── tailwind.config.js        # Configuração Tailwind (cores, content)
├── babel.config.js           # Babel + NativeWind
├── metro.config.js           # Metro + NativeWind
└── nativewind-env.d.ts        # Tipos TypeScript para className
```

---

## Como rodar

```bash
# Instalar dependências
npm install

# Iniciar o app
npx expo start
```

Depois, abra no emulador ou Expo Go:

- **Android**: `a` ou toque em "Run on Android device/emulator"
- **iOS**: `i` ou toque em "Run on iOS simulator"
- **Web**: `w` ou toque em "Run in web browser"

### Porta em uso

Se a porta 8081 estiver ocupada:

```bash
npx expo start --port 8082
```

### Limpar cache

Se algo estranho acontecer após mudanças de config:

```bash
npx expo start --clear
```

---

## Fluxo de navegação

```
Index (entrada)
    ├── Se autenticado ou não configurado → (tabs) Home
    └── Caso contrário → (auth)/login

Login
    ├── "Continuar com Google" ou bypass → (tabs) Home
    └── "Criar conta" → (auth)/cadastro

Cadastro
    └── "Já tem conta" → (auth)/login

Home (tabs)
    └── Cards horizontais → lugar/[id]

Buscar (tabs)
    ├── index (hero) → resultados
    └── resultados → lugar/[id] | mapa | filtros

Mapa
    └── "Ver mais" → lugar/[id] | Voltar → resultados

Filtros (modal)
    └── Voltar ou Aplicar → volta para tela anterior

Lugar (detalhe)
    └── Voltar → tela anterior
```

---

## Scripts

| Script | Comando | O que faz |
|--------|---------|-----------|
| `start` | `npm start` | Inicia o Expo |
| `android` | `npm run android` | Abre direto no Android |
| `ios` | `npm run ios` | Abre direto no iOS |
| `web` | `npm run web` | Abre no navegador |
| `lint` | `npm run lint` | Verifica erros de código |
| `test` | `npm test` | Roda os testes Jest |

---

## Próximos passos

- [ ] Conectar autenticação real (Supabase)
- [ ] Backend para lugares e favoritos
- [ ] Tela de detalhes com dados reais
- [ ] Integração com mapa (expo-location + Mapbox)
- [ ] Testes E2E

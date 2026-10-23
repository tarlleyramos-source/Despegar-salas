# Despegar Salas — App Mobile (Expo)
Gera APK (Android) e IPA (iOS) sem Android Studio, sem Xcode, sem Mac.

---

## PRÉ-REQUISITO: Instalar Node.js

1. Acesse: https://nodejs.org
2. Clique em "LTS" (botão verde)
3. Baixe e instale normalmente (não precisa de admin)
4. Abra o CMD e confirme: `node -v` — deve aparecer a versão

---

## PASSO 1 — Criar conta no Expo (gratuito)

1. Acesse: https://expo.dev
2. Clique em "Sign Up"
3. Crie com e-mail pessoal ou corporativo

---

## PASSO 2 — Instalar as ferramentas (CMD)

Abra o Prompt de Comando (Win + R → cmd) e rode:

```
npm install -g eas-cli
```

---

## PASSO 3 — Fazer login no Expo

```
eas login
```
Digite o e-mail e senha da conta que criou no Expo.

---

## PASSO 4 — Entrar na pasta do projeto

```
cd C:\caminho\para\DespSalas
```

---

## PASSO 5 — Instalar dependências

```
npm install
```
Aguarde terminar (2-5 minutos).

---

## PASSO 6 — Configurar o projeto no Expo

```
eas init
```
Isso gera um Project ID. Copie e cole em app.json no campo:
```
"projectId": "COLE_SEU_PROJECT_ID_AQUI"
```

---

## PASSO 7 — Gerar o APK (Android) e IPA (iOS) na nuvem

```
eas build --platform android --profile preview
```

Para iOS (precisa de conta Apple Developer U$99/ano):
```
eas build --platform ios --profile preview
```

Para os dois ao mesmo tempo:
```
eas build --platform all --profile preview
```

O build acontece na nuvem da Expo (não no seu PC).
Você recebe o link por e-mail quando terminar (~15 minutos).

---

## PASSO 8 — Baixar e distribuir

**Android (.apk):**
- Baixe o arquivo .apk do link gerado
- Envie por WhatsApp ou Google Drive para os funcionários
- No celular Android: abrir o arquivo → "Instalar" → ativar "Fontes desconhecidas" se pedir

**iOS (.ipa):**
- Sem conta Apple Developer: use TestFlight (precisa da conta U$99/ano)
- Alternativa gratuita: instalar via AltStore no iPhone

---

## Estrutura do projeto

```
DespSalas/
├── App.js          ← app completo (HTML dentro do WebView)
├── app.json        ← configurações do app (nome, ícone, etc)
├── eas.json        ← configurações de build
├── package.json    ← dependências
├── babel.config.js ← configuração do compilador
└── assets/
    ├── icon.png           ← ícone 1024x1024px (adicionar)
    ├── splash.png         ← splash screen (adicionar)
    └── adaptive-icon.png  ← ícone Android (adicionar)
```

---

## Ícones necessários

Antes do build, adicione na pasta assets/:
- icon.png — 1024x1024px, fundo roxo #6600FF, logo D branco
- splash.png — 1284x2778px, fundo roxo #6600FF
- adaptive-icon.png — 1024x1024px (mesmo que icon.png)

Ferramenta para criar: https://appicon.co

---

## Suporte

Para dúvidas sobre o build: https://docs.expo.dev/build/introduction
Para iOS sem conta Apple: https://altstore.io

*Despegar · Decolar — uso interno corporativo*

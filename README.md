# 🎻 Afinador Cromático de Violino

![PWA Badge](https://img.shields.io/badge/PWA-ready-blue?logo=googlechrome&style=flat-square)

Afinador online de violino, responsivo e fácil de usar. Desenvolvido como uma Progressive Web App (PWA), permite detectar e afinar cada corda (G3, D4, A4, E5) por meio do microfone do seu dispositivo, com feedback visual em tempo real.

> ✅ Compatível com dispositivos móveis e desktop  
> 🔇 Funciona totalmente offline após a primeira visita  
> 📶 Sem anúncios e sem necessidade de cadastro

---

## 📸 Captura de Tela

![Screenshot do Afinador](https://github.com/jonatas07rocha/afinador-cromatico/blob/main/screenshot.png)

---

## ✨ Recursos

- 🎤 **Detecção de frequência via microfone**
- 🎯 **Indicação visual da afinação** com agulha e cores
- 🧭 **Modo de afinação guiado**: uma corda por vez (G, D, A, E)
- 🔊 **Sinal sonoro opcional** ao afinar corretamente
- 📲 **PWA instalável**: use como app no celular
- 📤 **Botão de compartilhamento nativo** (Web Share API)
- ❔ **Modal de ajuda** integrado

---

## 🚀 Acesse Agora

👉 [**Afinador Online**](https://jonatas07rocha.github.io/afinador-cromatico/)

Ou instale como aplicativo no seu celular acessando via navegador.

---

## 🛠️ Desenvolvedores

### Estrutura do Projeto

```
📁 afinador-cromatico/
├── index.html         # Interface e lógica principal
├── manifest.json      # Manifesto da PWA
├── sw.js              # Service Worker (cache offline)
├── icons/             # Ícones para PWA
└── screenshot.png     # Imagem para o README
```

### Executar Localmente

Você pode testar localmente com qualquer servidor web. Exemplo usando Python:

```bash
# Python 3.x
python -m http.server
```

Depois, abra `http://localhost:8000` no navegador.

---

## ⚖️ Licença

Distribuído sob a licença MIT.  
© [Jônatas de Aquino Rocha](https://github.com/jonatas07rocha)
# 🎵 Afinador Cromático

![Screenshot da Aplicação](https://i.imgur.com/link-para-sua-screenshot.png)
*Substitua o link acima por um screenshot da sua aplicação em funcionamento.*

Um afinador cromático simples, preciso e de código aberto para músicos. Desenvolvido para ser leve e com uma interface limpa, ideal para afinar o seu instrumento de forma rápida e eficiente.

---

## ✨ Funcionalidades

* **🎤 Detecção Precisa:** Utiliza o microfone do seu dispositivo para capturar e analisar o som em tempo real.
* **🎼 Interface Visual:** Mostra a nota detetada (Dó, Ré, Mi...), a oitava e o desvio em cents.
* **🎯 Medidor Intuitivo:** Uma agulha visual indica o quão perto você está da afinação perfeita, mudando de cor para sinalizar quando a nota está correta.
* **🌐 Multiplataforma:** Nascido como uma aplicação web e agora disponível como um aplicativo de desktop para Linux.

---

## 💻 Instalação (Linux)

Existem duas formas fáceis de usar a versão de desktop.

### Opção 1: AppImage (Portátil)

O `.AppImage` é um ficheiro portátil que não precisa de instalação.

1.  **Descarregue:** Vá à secção de [Releases](https://github.com/jonatas07rocha/afinador-cromatico/releases) e descarregue o ficheiro `.AppImage` mais recente.
2.  **Dê Permissão de Execução:**
    ```bash
    chmod +x "Afinador Cromático-1.0.0.AppImage"
    ```
3.  **Execute:** Dê um duplo clique no ficheiro ou execute-o pelo terminal:
    ```bash
    ./"Afinador Cromático-1.0.0.AppImage"
    ```

### Opção 2: Pacote .deb (Instalação no Sistema)

Para uma integração completa com o seu sistema (Ubuntu, Debian, etc.).

1.  **Descarregue:** Vá à secção de [Releases](https://github.com/jonatas07rocha/afinador-cromatico/releases) e descarregue o ficheiro `.deb` mais recente.
2.  **Instale:** Você pode instalar com um duplo clique no ficheiro ou pelo terminal:
    ```bash
    sudo apt install ./afinador-cromatico_1.0.0_amd64.deb
    ```
3.  **Execute:** Após a instalação, procure por "Afinador Cromático" no seu menu de aplicações.

---

## 🚀 Como Construir a Partir do Código Fonte

Se você é um programador e quer construir a aplicação manualmente, siga estes passos:

1.  **Clone o Repositório:**
    ```bash
    git clone [https://github.com/jonatas07rocha/afinador-cromatico.git](https://github.com/jonatas07rocha/afinador-cromatico.git)
    cd afinador-cromatico
    ```

2.  **Instale as Dependências:**
    * Você precisará do [Node.js](https://nodejs.org/) e do npm instalados.
    ```bash
    npm install
    ```

3.  **Execute em Modo de Desenvolvimento:**
    ```bash
    npm start
    ```

4.  **Crie os Pacotes Finais (`.AppImage` e `.deb`):**
    ```bash
    npm run build
    ```
    Os ficheiros finais estarão na pasta `dist/`.

---

## 🛠️ Tecnologias Utilizadas

* **Framework:** [Electron](https://www.electronjs.org/)
* **Frontend:** HTML, CSS (TailwindCSS), JavaScript
* **Empacotamento:** [electron-builder](https://www.electron.build/)

---

## 📄 Licença

Este projeto é distribuído sob a licença MIT. Veja o ficheiro `LICENSE` para mais detalhes.

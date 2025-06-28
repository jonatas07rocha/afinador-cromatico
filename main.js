// main.js

// Módulos para controlar o ciclo de vida da aplicação e criar janelas de navegador nativas
const { app, BrowserWindow } = require('electron');
const path = require('path');

// Função para criar a janela do navegador.
const createWindow = () => {
  // Cria a janela do navegador.
  const mainWindow = new BrowserWindow({
    width: 500,
    height: 750,
    resizable: false,
    // Adiciona o ícone à janela
    icon: path.join(__dirname, 'assets/icon.png'),
    webPreferences: {
      // Anexa um script de pré-carregamento, se necessário no futuro
      // preload: path.join(__dirname, 'preload.js')
    }
  });

  // e carrega o index.html da aplicação.
  mainWindow.loadFile(path.join(__dirname, 'src/index.html'));

  // Opcional: Remove o menu da aplicação
  mainWindow.setMenu(null);
};

// Este método será chamado quando o Electron tiver terminado
// a inicialização e estiver pronto para criar janelas do navegador.
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // No macOS, é comum recriar uma janela na aplicação quando o
    // ícone da dock é clicado e não há outras janelas abertas.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Saia quando todas as janelas estiverem fechadas, exceto no macOS.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


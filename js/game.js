"use strict";
class Game {
    constructor() {
        this._altura = window.innerHeight;
        this._largura = window.innerWidth;
        this._gameOver = false;
        this._frameAtual = 0;
        this._personagem = new Personagem();
        this._chao = new Chao();
        this._fundo = new Fundo(this._altura, this._largura);
        this._obstaculos = new Obstaculos();
        this._placar = new Placar();
        if (this._largura > 600) {
            this._altura = 600;
            this._largura = 600;
        }
        this._canvas = document.createElement("canvas");
        this._canvas.width = this._largura;
        this._canvas.height = this._altura;
        this._contexto = this._canvas.getContext("2d");
        document.body.appendChild(this._canvas);
        document.addEventListener("mousedown", (e) => this._personagem.Pula());
        document.addEventListener("keypress", (e) => e.keyCode == 32 ? this._personagem.Pula() : null);
        this.TocaMusica();
        this.Roda();
        // Esconde tela de carregando
        document.getElementById("loading").style.display = "none";
    }
    TocaMusica() {
        var music = document.getElementById("audio-music");
        music.play();
    }
    Roda() {
        if (!this._gameOver) {
            this.Atualiza();
            this.Desenha();
            window.requestAnimationFrame(() => this.Roda());
        }
    }
    Atualiza() {
        this._frameAtual++;
        this._fundo.Atualiza();
        this._personagem.Atualiza(this._chao._y, this, this._frameAtual);
        this._obstaculos.Atualiza(this._largura, this._chao._y, this._personagem, this);
    }
    Desenha() {
        this._fundo.Desenha(this._contexto);
        this._chao.Desenha(this._contexto, this._largura);
        this._personagem.Desenha(this._contexto);
        this._obstaculos.Desenha(this._contexto);
        this._placar.Desenha(this._contexto, this._obstaculos);
        document.getElementById("dev").innerHTML =
            "Frames: " + String(this._frameAtual) + "<br />" +
                "Velocidade: " + String(this._obstaculos.velocidade) + "<br />" +
                "Blocos total: " + String(this._obstaculos.total) + "<br />" +
                "Blocos: " + String(this._obstaculos.Quantidade) + "<br />" +
                "Fundo X: " + String(this._fundo._x);
    }
    Perdeu() {
        this._gameOver = true;
        var audio = document.getElementById("audio-game-over");
        audio.volume = 0.7;
        audio.play();
        alert('Você perdeu!\nFez ' + String(this._obstaculos.ultrapassados) + ' pontos.');
        //location.reload(true);
    }
}

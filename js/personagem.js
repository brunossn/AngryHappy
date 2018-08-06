"use strict";
class Personagem {
    constructor() {
        this._x = 40;
        this._y = 0;
        this._altura = 60;
        this._largura = 108;
        this._cor = "#FF0000";
        this._velocidade = 0;
        this._gravidade = 0.3;
        this._puloForcaInicial = 5;
        this._puloForca = 5;
        this._puloIncremento = 2; // a cada batida de asa, o pulo fica mais forte (gato bate asa?)
        // Sprites
        this._quadrosPorImagem = 5;
        this._imagemAtual = 0;
        this._totalImagens = 9;
        this._spriteX = 0;
        this._spriteY = 0;
        this._spriteLargura = 256;
        this._spriteAltura = 97;
    }
    get X() { return this._x; }
    get Y() { return this._y; }
    get Altura() { return this._altura; }
    get Largura() { return this._largura; }
    AtualizaSprite(frameAtual) {
        if (frameAtual % this._quadrosPorImagem == 0) {
            if (this._imagemAtual == this._totalImagens - 1) {
                this._imagemAtual = 0;
            }
            else {
                this._imagemAtual++;
            }
            this._spriteX = this._imagemAtual * this._spriteLargura;
        }
    }
    Atualiza(alturaChao, game, frameAtual) {
        this._velocidade += this._gravidade;
        this._y += this._velocidade;
        if (this._y < 0) {
            this._velocidade = 0;
            this._y = 0;
        }
        // Verifica se perdeu
        if (this._y + this._altura >= alturaChao) {
            game.Perdeu();
            return;
        }
        // Decremento a força do pulo com o passar do tempo
        if (this._puloForca > this._puloForcaInicial) {
            this._puloForca -= this._puloDecremento;
        }
        else {
            this._puloForca = this._puloForcaInicial;
        }
        // Atualiza imagem do personagem
        this.AtualizaSprite(frameAtual);
    }
    Desenha(context) {
        var img = document.getElementById("cat");
        context.drawImage(img, this._spriteX, this._spriteY, this._spriteLargura, this._spriteAltura, this._x, this._y, this._largura, this._altura);
    }
    Pula() {
        this._puloForca += this._puloIncremento;
        this._velocidade = -this._puloForca;
    }
}

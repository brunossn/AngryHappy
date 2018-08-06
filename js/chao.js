"use strict";
class Chao {
    constructor() {
        this._y = 550;
        this._altura = 50;
        this._cor = "#ffdf70";
    }
    Desenha(contexto, larguraFundo) {
        contexto.fillStyle = this._cor;
        contexto.fillRect(0, this._y, larguraFundo, this._altura);
    }
}

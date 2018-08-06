"use strict";
class Fundo {
    constructor(altura, largura) {
        this._x = 0;
        this._y = 0;
        this._cor = "#0000FF";
        this._taxaAtualizacao = 1;
        this._frame = 0;
        this._altura = altura;
        this._largura = largura;
    }
    Atualiza() {
        // Reseta fundo
        if (this._frame == this._taxaAtualizacao) {
            this._frame = 0;
            if (this._x == 1200) {
                this._x = 0;
            }
            else {
                this._x++;
            }
        }
        this._frame++;
    }
    ;
    Desenha(contexto) {
        var img = document.getElementById("sky");
        contexto.drawImage(img, this._x, 0, this._largura, this._altura, 0, 0, this._largura, this._altura);
    }
}

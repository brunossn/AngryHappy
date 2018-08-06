class Chao {

	_y = 550;
	_altura = 50;
	_cor = "#ffdf70";
	
	Desenha(contexto: CanvasRenderingContext2D, larguraFundo: number) {
		contexto.fillStyle = this._cor;
		contexto.fillRect(0, this._y, larguraFundo, this._altura);
	}
}
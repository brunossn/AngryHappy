class Fundo {
	_x = 0;
	_y = 0;
	_altura: number;
	_largura: number;
	_cor = "#0000FF";
	_taxaAtualizacao = 1;
	_frame = 0;

	constructor(altura: number, largura: number) {
		this._altura = altura;
		this._largura = largura;
	}
	
	Atualiza() {
		
		// Reseta fundo
		if(this._frame == this._taxaAtualizacao) {
			this._frame = 0;
			
			if(this._x == 1200) {
				this._x = 0;
			}
			else {
				this._x++;
			}
		}
		
		this._frame++;
	};
	
	Desenha(contexto: CanvasRenderingContext2D) {
		var img = <HTMLImageElement>document.getElementById("sky");	
		contexto.drawImage(img, this._x, 0, this._largura, this._altura, 0, 0, this._largura, this._altura);
	}
}

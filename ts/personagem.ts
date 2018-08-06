class Personagem {
	
	private _x = 40;
	private _y = 0;
	private _altura = 60;
	private _largura = 108;
	
	private _cor = "#FF0000";
	private _velocidade = 0;
	private _gravidade = 0.3;
	
	private _puloForcaInicial = 5;
	private _puloForca = 5;
	private _puloIncremento = 2; // a cada batida de asa, o pulo fica mais forte
	private _puloDecremento: 0.1 // a cada frame, perde-se a força do pulo incremental

	private _quadrosPorImagem = 5;
	private _imagemAtual = 0;
	private _totalImagens = 9;

	public get X(): number { return this._x; }
	public get Y(): number { return this._y; }
	public get Altura(): number { return this._altura; }
	public get Largura(): number { return this._largura; }

	AtualizaSprite(frameAtual) {

		if(frameAtual % this._quadrosPorImagem == 0) {
			if(this._imagemAtual == this._totalImagens - 1) {
				this._imagemAtual = 0;
			}
			else {
				this._imagemAtual++;
			}
			
			this._x = this._imagemAtual * this._largura;
		}
	}
	
	Atualiza(alturaChao: number, game: Game, frameAtual: number) {
		this._velocidade += this._gravidade;
		this._y += this._velocidade;
		
		if(this._y + this._altura >= alturaChao) {
			this._y = alturaChao - this._altura;
			this._velocidade = 0;
		}
		
		// Verifica se perdeu
		if(this._y < 0 || this._y + this._altura >= alturaChao) {
			game.Perdeu();
			return;
		}
		
		// Decremento a força do pulo com o passar do tempo
		if(this._puloForca > this._puloForcaInicial) {
			this._puloForca -= this._puloDecremento;
		}
		else {
			this._puloForca = this._puloForcaInicial
		}
		
		// Atualiza imagem do personagem
		this.AtualizaSprite(frameAtual);
	};
	
	public Desenha(context: CanvasRenderingContext2D) {
		var img = <HTMLImageElement>document.getElementById("cat");
		context.drawImage(img, this._x, this._y, this._largura,
			this._altura, this._x, this._y, this._largura, this._altura);
	}
	
	public Pula() {
		this._puloForca += this._puloIncremento;
		this._velocidade = -this._puloForca;
	}
}
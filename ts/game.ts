class Game {

	_personagem = new Personagem();
	_chao = new Chao();
	_fundo = new Fundo();
	_obstaculos = new Obstaculos();
	_placar = new Placar();

	_altura = window.innerHeight;
	_largura = window.innerWidth; 
	_canvas: HTMLCanvasElement;
	_contexto: CanvasRenderingContext2D;
	_gameOver = false;
	_frameAtual = 0;

	constructor() {

		if(this._largura > 600) {
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

	private TocaMusica() {
		var music = <HTMLAudioElement>document.getElementById("audio-music");
		music.play();
	}

	private Roda() {
		if(!this._gameOver) {
			this.Atualiza();
			this.Desenha();
		
			window.requestAnimationFrame(() => this.Roda());
		}
	}

	private Atualiza() {
		this._frameAtual++;
		this._fundo.Atualiza();
		this._personagem.AtualizaSprite(this._frameAtual);
		this._obstaculos.Atualiza(this._largura, this._chao._y, this._personagem, this);
	}

	private Desenha() {
		this._fundo.Desenha(this._contexto);
		this._chao.Desenha(this._contexto, this._largura);
		this._personagem.Desenha(this._contexto);
		this._obstaculos.Desenha(this._contexto);
		this._placar.Desenha(this._contexto, this._obstaculos);
		
		document.getElementById("dev").innerHTML =
			"Frames: " + String(this._frameAtual) +"<br />" + 
			"Velocidade: " + String(this._obstaculos.velocidade) + "<br />" +
			"Blocos total: " + String(this._obstaculos.total) +"<br />" +
			"Blocos: " + String(this._obstaculos.Quantidade)	+"<br />" +
			"Fundo X: " + String(this._fundo._x);
	}

	Perdeu() {
		this._gameOver = true;
		
		var audio = <HTMLAudioElement>document.getElementById("audio-game-over");
		audio.volume = 0.7;
		audio.play();
		
		alert('Você perdeu!\nFez ' + String(this._obstaculos.ultrapassados) + ' pontos.');
		//location.reload(true);
	}
}
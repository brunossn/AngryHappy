class Obstaculo {

	x: number;
	y: number;
	imagem: HTMLImageElement;
	largura: number;
	altura: number;
	passou: boolean;

	constructor(x: number, y: number, imagem: HTMLImageElement, largura: number, altura: number, passou: boolean) {
		this.x = x;
		this.y = y;
		this.imagem = imagem;
		this.largura = largura;
		this.altura = altura;
		this.passou = passou;
	}
}

class Obstaculos {
	_obstaculos = new Array<Obstaculo>();
	timerInsere = 300;
	frequenciaInimigo = 300;
	velocidade = 1;
	incrementoVelocidade = 0.1;
	total = 0; // obstaculos criados
	ultrapassados = 0;
	margemSeguranca = 35; // pixels permitidos de aproximacao
	imagens: ["aspirador", "chuveiro", "pug", "betoneira"]; // deve ser o ID da imagem na index.html
	repeticaoInimigo = 6; // quantas vezes aparece cada objeto
	alturaObstaculos = 145;
	larguraObstaculos = 120;
	
	get Quantidade(): number {
		return this._obstaculos.length;
	}

	Insere(larguraFundo: number, alturaChao: number) {
		const imagem = this.GetImagem();
		
		this._obstaculos.push(
			new Obstaculo(
				larguraFundo,
				GetRandom(0, alturaChao - this.alturaObstaculos),
				imagem,
				imagem.width,
				imagem.height,
				false));
	}
	
	// Retorna imagem de acordo com fase
	GetImagem(): HTMLImageElement {
		return <HTMLImageElement>document.getElementById(this.imagens[Math.floor(this.total / this.repeticaoInimigo)]);
	};

	// Efeito ao pegar whiskas sachê
	Explode() {
		for(var i = 0; i < this._obstaculos.length; i++) {
			this._obstaculos.splice(i, 1);	
		}
	};
	
	Atualiza(larguraFundo: number, alturaChao: number, personagem: Personagem, game: Game) {
		// Insere inimigo e reseta timer
		if(this.timerInsere * this.velocidade >= this.frequenciaInimigo) {
			this.Insere(larguraFundo, alturaChao);
			this.timerInsere = 0;
			this.total++;
			
			this.velocidade += this.incrementoVelocidade; // aumenta velocidade
		}
		
		// Movimenta inimigos
		for(var i = 0; i < this._obstaculos.length; i++) {
			let obs = this._obstaculos[i];
			obs.x -= this.velocidade;
			
			// Verifica se houve contato
			if(
				(personagem.Y + this.margemSeguranca <= obs.y + this.alturaObstaculos &&
					personagem.Y + personagem.Altura >= obs.y  + this.margemSeguranca) && // contato em y
				(obs.x + this.margemSeguranca <= personagem.X + personagem.Largura &&
					obs.x + this.larguraObstaculos >= personagem.X + this.margemSeguranca) // contato em x
			) {
				game.Perdeu();
			}
			
			// Som ao passar obstáculo
			if(personagem.X >= obs.x + this.larguraObstaculos && obs.passou == false) {
				var audio = <HTMLAudioElement>document.getElementById("audio-passou");
				audio.play();
				
				obs.passou = true;
				
				this.ultrapassados++;
			}
			
			// Remove ao sair da tela
			if(obs.x + this.larguraObstaculos <= 0) {
				this._obstaculos.splice(i, 1);
			}
		}
		
		this.timerInsere++;
	}
	
	Desenha(context: CanvasRenderingContext2D) {
		for(var i = 0; i < this._obstaculos.length; i++) {
			var obs = this._obstaculos[i];
			context.drawImage(
				obs.imagem, 0, 0, obs.largura, obs.altura,
				obs.x, obs.y, this.larguraObstaculos, this.alturaObstaculos);
		}
	}
}


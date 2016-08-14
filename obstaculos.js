/* global obstaculos */
obstaculos = {
	_obs: [],
	timerInsere: 300,
	frequenciaInimigo: 300,
	velocidade: 1,
	incrementoVelocidade: 0.1,
	total: 0, // obstaculos criados
	ultrapassados: 0,
	margemSeguranca: 35, // pixels permitidos de aproximacao
	imagens: ["aspirador", "chuveiro", "pug", "betoneira"], // deve ser o ID da imagem na index.html
	repeticaoInimigo: 6, // quantas vezes aparece cada objeto
	alturaObstaculos: 145,
	larguraObstaculos: 120,
	
	insere: function() {

		var imagem = this.getImagem();
		
		this._obs.push({
			x: LARGURA,
			y: getRandom(0, chao.y - this.alturaObstaculos),
			imagem: imagem,
			largura: imagem.width,
			altura: imagem.height,
			passou: false // identifica se já passou
		});

console.log(imagem.width);

	},
	
	// Retorna imagem de acordo com fase
	getImagem: function() {
		return document.getElementById(this.imagens[Math.floor(this.total / this.repeticaoInimigo)]);
	},

	// Efeito ao pegar whiskas sache
	explode: function() {
		for(var i = 0; i < this._obs.length; i++) {
			this._obs.splice(i, 1);	
		}
	},
	
	atualiza: function() {
		// Insere inimigo e reseta timer
		if(this.timerInsere * this.velocidade >= this.frequenciaInimigo) {
			this.insere();
			this.timerInsere = 0;
			this.total++;
			
			this.velocidade += this.incrementoVelocidade; // aumenta velocidade
		}
		
		// Movimenta inimigos
		for(var i = 0; i < this._obs.length; i++) {
			var obs = this._obs[i];
			obs.x -= this.velocidade;
			
			// Verifica se houve contato
			if(
				(bloco.y + this.margemSeguranca <= obs.y + this.alturaObstaculos && bloco.y + bloco.altura >= obs.y  + this.margemSeguranca) && // contato em y
				(obs.x + this.margemSeguranca <= bloco.x + bloco.largura && obs.x + this.larguraObstaculos >= bloco.x + this.margemSeguranca) // contato em x
			) {
				game.perdeu();
			}
			
			// Som ao passar obstáculo
			if(bloco.x >= obs.x + this.larguraObstaculos && obs.passou == false) {
				var audio = document.getElementById("audio-passou");
				audio.play();
				
				obs.passou = true;
				
				this.ultrapassados++;
			}
			
			// Remove ao sair da tela
			if(obs.x + this.larguraObstaculos <= 0) {
				this._obs.splice(i, 1);
			}
		}
		
		this.timerInsere++;
	},
	
	desenha: function() {
		for(var i = 0; i < this._obs.length; i++) {
			var obs = this._obs[i];
			ctx.drawImage(
					obs.imagem, 0, 0, obs.largura, obs.altura,
					obs.x, obs.y, this.larguraObstaculos, this.alturaObstaculos);
		}
	}
}


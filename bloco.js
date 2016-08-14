/* global bloco */
bloco = {
	x: 40,
	y: 0,
	altura: 60,
	largura: 108,
	cor:"#FF0000",
	velocidade: 0, 
	gravidade: 0.3,
	
	pulo: {
		forcaInicial: 5,
		forca: 5,
		incremento: 2, // a cada batida de asa, o pulo fica mais forte
		decremento: 0.1 // a cada frame, perde-se a força do pulo incremental
	},
	
	sprite: {
		x: 0,
		y: 0,
		largura: 256,
		altura: 97,
		quadrosPorImagem: 5,
		imagemAtual: 0,
		totalImagens: 9,
		
		atualiza: function() {	
			
			// Atualiza imagem
			if(qtFrames % this.quadrosPorImagem == 0) {
				if(this.imagemAtual == this.totalImagens - 1) {
					this.imagemAtual = 0;
				}
				else {
					this.imagemAtual++;
				}
				
				this.x = this.imagemAtual * this.largura;
			}
			
		}
	},
	
	atualiza: function() {
		this.velocidade += this.gravidade;
		this.y += this.velocidade;
		
		if(this.y + this.altura >= chao.y) {
			this.y = chao.y - this.altura;
			this.velocidade = 0;
		}
		
		// Verifica se perdeu
		if(this.y < 0 || this.y + this.altura >= chao.y) {
			game.perdeu();
		}
		
		// Decremento a força do pulo com o passar do tempo
		if(this.pulo.forca > this.pulo.forcaInicial) {
			this.pulo.forca -= this.pulo.decremento;
		}
		else {
			this.pulo.forca = this.pulo.forcaInicial;
		}
		
		// Atualiza imagem do personagem
		this.sprite.atualiza();
	},
	
	desenha: function() {
		
		//ctx.clearRect(0, 0, LARGURA, ALTURA);
		var img = document.getElementById("cat");
		ctx.drawImage(img, this.sprite.x, this.sprite.y, this.sprite.largura,
			this.sprite.altura, this.x, this.y, this.largura, this.altura);
		
		//ctx.fillStyle = this.cor;
		//ctx.fillRect(this.x, this.y, this.largura, this.altura);
	},
	
	pula: function() {
		this.pulo.forca += this.pulo.incremento;
		this.velocidade = -this.pulo.forca;
	}
}
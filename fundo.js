/* global fundo */
fundo = {
	x: 0,
	y: 0,
	altura: ALTURA,
	largura: LARGURA,
	cor: "#0000FF",
	taxaAtualizacao: 1,
	frame: 0,
	
	atualiza: function() {
		
		// Atualiza fundo
		if(this.frame == this.taxaAtualizacao) {
			this.frame = 0;
			
			// Reseta fundo
			if(this.x == 1200) {
				this.x = 0;
			}
			else {
				this.x++;
			}
		}
		
		this.frame++;
	},
	
	desenha: function() {
		var img = document.getElementById("sky");	
		ctx.drawImage(img, this.x, 0, LARGURA, ALTURA, 0, 0, LARGURA, ALTURA);
	}
}

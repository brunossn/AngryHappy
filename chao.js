/* global chao */
chao = {
	y: 550,
	altura: 50,
	cor: "#ffdf70",
	
	desenha: function() {
		ctx.fillStyle = this.cor;
		ctx.fillRect(0, this.y, LARGURA, this.altura);
	}
}

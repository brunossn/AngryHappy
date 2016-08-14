/* global placar */
placar = {
	desenha: function() {
		ctx.fillStyle = "#FFF";
		
		ctx.font = "15px Arial";
		ctx.fillText("Pontos:", 15, 36);
		
		ctx.font = "40px catty";
		ctx.fillText(String(obstaculos.ultrapassados), 65, 40);
	}
}
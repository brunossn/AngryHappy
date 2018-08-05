/* global obstaculos */
/* global game */
/* global bloco */
/* global chao */

// variáveis do jogo
var canvas, ctx, ALTURA, LARGURA, qtFrames = 0, gameOver = false;

function pula(e) {
	bloco.pula();
}

function main() {
	
	// Tamanho do cenário
	ALTURA = window.innerHeight;
	LARGURA = window.innerWidth;
	
	if(LARGURA > 600) {
		ALTURA = 600;
		LARGURA = 600;
	}
	
	// Canvas
	canvas = document.createElement("canvas");
	canvas.width = LARGURA;
	canvas.height = ALTURA;
	
	ctx = canvas.getContext("2d");
	document.body.appendChild(canvas);
	document.addEventListener("mousedown", pula);
	document.addEventListener("keypress", (e) => e.keyCode == 32 ? pula(e) : null);
	
	// Música
	var music = document.getElementById("audio-music");
	music.play();
	
	game.roda();
	
	// Esconde tela de carregando
	document.getElementById("loading").style.display = "none";
}


game = {
	roda: function() {
		if(!gameOver) {
			game.atualiza();
			game.desenha();
		
			window.requestAnimationFrame(game.roda);
		}
	},
	
	atualiza: function() {
		qtFrames++;
		
		fundo.atualiza();
		bloco.atualiza();
		obstaculos.atualiza();
	},
	
	desenha: function() {
		fundo.desenha();
		//chao.desenha();
		bloco.desenha();
		obstaculos.desenha();
		placar.desenha();
		
		document.getElementById("dev").innerHTML =
			"Frames: " + String(qtFrames) +"<br />" + 
			"Velocidade: " + obstaculos.velocidade + "<br />" +
			"Blocos total: " + String(obstaculos.total) +"<br />" +
			"Blocos: " + String(obstaculos._obs.length)	+"<br />" +
			"Fundo X: " + String(fundo.x);
	},
	
	perdeu: function() {
		gameOver = true;
		
		var audio = document.getElementById("audio-game-over");
		audio.volume = 0.7;
		audio.play();
		
		alert('Você perdeu!\nFez ' + String(obstaculos.ultrapassados) + ' pontos.');
		//location.reload(true);
	}
}
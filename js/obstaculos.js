class Obstaculo {
    constructor(x, y, imagem, largura, altura, passou) {
        this.x = x;
        this.y = y;
        this.imagem = imagem;
        this.largura = largura;
        this.altura = altura;
        this.passou = passou;
    }
}
class Obstaculos {
    constructor() {
        this._obstaculos = new Array();
        this.timerInsere = 300;
        this.frequenciaInimigo = 300;
        this.velocidade = 1;
        this.incrementoVelocidade = 0.1;
        this.total = 0; // obstaculos criados
        this.ultrapassados = 0;
        this.margemSeguranca = 35; // pixels permitidos de aproximacao
        this.repeticaoInimigo = 6; // quantas vezes aparece cada objeto
        this.alturaObstaculos = 145;
        this.larguraObstaculos = 120;
    }
    get Quantidade() {
        return this._obstaculos.length;
    }
    Insere(larguraFundo, alturaChao) {
        const imagem = this.GetImagem();
        this._obstaculos.push(new Obstaculo(larguraFundo, GetRandom(0, alturaChao - this.alturaObstaculos), imagem, imagem.width, imagem.height, false));
    }
    // Retorna imagem de acordo com fase
    GetImagem() {
        return document.getElementById(this.imagens[Math.floor(this.total / this.repeticaoInimigo)]);
    }
    ;
    // Efeito ao pegar whiskas sachê
    Explode() {
        for (var i = 0; i < this._obstaculos.length; i++) {
            this._obstaculos.splice(i, 1);
        }
    }
    ;
    Atualiza(larguraFundo, alturaChao, personagem, game) {
        // Insere inimigo e reseta timer
        if (this.timerInsere * this.velocidade >= this.frequenciaInimigo) {
            this.Insere(larguraFundo, alturaChao);
            this.timerInsere = 0;
            this.total++;
            this.velocidade += this.incrementoVelocidade; // aumenta velocidade
        }
        // Movimenta inimigos
        for (var i = 0; i < this._obstaculos.length; i++) {
            let obs = this._obstaculos[i];
            obs.x -= this.velocidade;
            // Verifica se houve contato
            if ((personagem.Y + this.margemSeguranca <= obs.y + this.alturaObstaculos &&
                personagem.Y + personagem.Altura >= obs.y + this.margemSeguranca) && // contato em y
                (obs.x + this.margemSeguranca <= personagem.X + personagem.Largura &&
                    obs.x + this.larguraObstaculos >= personagem.X + this.margemSeguranca) // contato em x
            ) {
                game.Perdeu();
            }
            // Som ao passar obstáculo
            if (personagem.X >= obs.x + this.larguraObstaculos && obs.passou == false) {
                var audio = document.getElementById("audio-passou");
                audio.play();
                obs.passou = true;
                this.ultrapassados++;
            }
            // Remove ao sair da tela
            if (obs.x + this.larguraObstaculos <= 0) {
                this._obstaculos.splice(i, 1);
            }
        }
        this.timerInsere++;
    }
    Desenha(context) {
        for (var i = 0; i < this._obstaculos.length; i++) {
            var obs = this._obstaculos[i];
            context.drawImage(obs.imagem, 0, 0, obs.largura, obs.altura, obs.x, obs.y, this.larguraObstaculos, this.alturaObstaculos);
        }
    }
}

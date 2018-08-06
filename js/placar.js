class Placar {
    Desenha(context, obstaculos) {
        context.fillStyle = "#FFF";
        context.font = "15px Arial";
        context.fillText("Pontos:", 15, 36);
        context.font = "40px catty";
        context.fillText(String(obstaculos.ultrapassados), 65, 40);
    }
}

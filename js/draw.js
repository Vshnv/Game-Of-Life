
function drawUnit(ctx, x, y, color, size) {
    ctx.beginPath()
    ctx.fillStyle = color;
    ctx.fillRect(x*size, y*size, size, size)
    ctx.stroke()
}
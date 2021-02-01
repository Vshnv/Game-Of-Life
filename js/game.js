(function (window) {
    const canvas = document.getElementById("game-elem")
    const body = document.getElementsByTagName("body")
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let board = {};
    initBoard(board)
    distributeAnomalies(board)
    render(ctx, board, updateGradient(ctx))
    function gameLoop() {
        update(board)
        render(ctx, board, updateGradient(ctx))
    }

    setInterval(gameLoop, 10)


    canvas.onmousemove = (mouse) => {
        let bounds = canvas.getBoundingClientRect();
        let x = mouse.pageX - bounds.left - scrollX;
        let y = mouse.pageY - bounds.top - scrollY;
        x /=  bounds.width;
        y /=  bounds.height;
        x *= canvas.width;
        y *= canvas.height;
        if (x < 0 || y < 0 || x >= 20*120 || y >= 20*120) return
        let tileX = Math.round(x / 20)
        let tileY = Math.round(y / 20)
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                board[tileX + i][tileY+ j] = !board[tileX + i][tileY+ j]
            }
        }
        ctx.beginPath()
        ctx.fillStyle = '#FF0000'
        ctx.fillRect(x, y, 10, 10)
        ctx.stroke()
    }
    setInterval(() => updateGradient(ctx), 20)
    setInterval(() => {
        initBoard(board)
        distributeAnomalies(board)
    }, 2000)
})(window)
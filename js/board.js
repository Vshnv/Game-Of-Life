function initBoard(board) {
    for (let i = 0; i < 120; i++) {
        board[i] = {}
        for (let j = 0; j < 120; j++) {
            board[i][j] = false
        }
    }
}
function initPalette(palette) {
    for (let i = 0; i < 120; i++) {
        palette[i] = {}
        for (let j = 0; j < 120; j++) {
            palette[i][j] = 0
        }
    }
}

function distributeAnomalies(board) {
    for (let i = 0; i < 120; i++) {
        for (let j = 0; j < 120; j++) {
            if (Math.random() < 0.05) {
                board[i][j] = true
            }
        }
    }
}



function render(ctx, board, color) {
    clearScreen(ctx)
    for (let i = 0; i < 120; i++) {
        for (let j = 0; j < 120; j++) {
            if (board[i][j]) {
                drawUnit(ctx, i , j, color, 20)
            }
        }
    }
}


function clearScreen(ctx) {
    ctx.beginPath()
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
    ctx.stroke()
}

function update(board) {
    let oldBoard = Object.assign({}, board)
    for (let i = 0; i < 120; i++) {
        for (let j = 0; j < 120; j++) {
            let n = getNeighbourCount(i, j, oldBoard)
            if (oldBoard[i][j] === true) {
                if (n < 2 || n > 3) {
                    board[i][j] = false
                }
            } else if (n === 3) {
                board[i][j] = true
            }
        }
    }
}

function getNeighbourCount(i, j, board) {
    let sum = 0
    for (let a = -1; a <= 1; a++) {
        for (let b = -1;b <= 1; b++) {
            if (i === 0 && j === 0) {
                continue
            }
            sum += valueAt(i+a,j+b,board)
        }
    }
    return sum
}
function valueAt(i, j, board) {
    if (i < 0 || i >= 120) return 0
    if (j < 0 || j >= 120) return 0
    return board[i][j] ? 1 : 0
}

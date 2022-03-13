type Field = {
    row: number
    column: number
    opened: boolean
    flagged: boolean
    mined: boolean
    exploded: boolean
    nearMines: number
}

type Board = Field[][]

const createBoard = (rows: number, columns: number): Board =>
    Array(rows)
        .fill([])
        .map((_, row) =>
            Array(columns)
                .fill({})
                .map((__, column) => ({
                    row,
                    column,
                    opened: false,
                    flagged: false,
                    mined: false,
                    exploded: false,
                    nearMines: 0,
                })),
        )

const spreadMines = (board: Board, minesAmount: number) => {
    const rows = board.length
    const columns = board[0].length
    let minesPlanted = 0

    while (minesPlanted < minesAmount) {
        const rowSel = Math.floor(Math.random() * rows)
        const columnSel = Math.floor(Math.random() * columns)

        if (!board[rowSel][columnSel].mined) {
            // eslint-disable-next-line no-param-reassign
            board[rowSel][columnSel].mined = true
            // eslint-disable-next-line no-plusplus
            minesPlanted++
        }
    }
}

const createMinedBoard = (rows: number, columns: number, minesAmount: number): Board => {
    const board = createBoard(rows, columns)

    spreadMines(board, minesAmount)

    return board
}

const cloneBoard = (board: Board): Board => board.map(rows => rows.map(field => ({ ...field })))

const getNeighbors = (board: Board, row: number, column: number): Field[] => {
    const neighbors: Field[] = []
    const rows = [row - 1, row, row + 1]
    const columns = [column - 1, column, column + 1]

    rows.forEach(r => {
        columns.forEach(c => {
            const different = r !== row || c !== column
            const validRow = r >= 0 && r < board.length
            const validColumn = c >= 0 && c < board[0].length

            if (different && validRow && validColumn) {
                neighbors.push(board[r][c])
            }
        })
    })

    return neighbors
}

const safeNeighborhood = (board: Board, row: number, column: number) => {
    const safes = (result: boolean, neighbor: Field) => result && !neighbor.mined

    return getNeighbors(board, row, column).reduce(safes, true)
}

const openField = (board: Board, row: number, column: number) => {
    const field = board[row][column]

    if (!field.opened) {
        field.opened = true

        if (field.mined) {
            field.exploded = true
        } else if (safeNeighborhood(board, row, column)) {
            getNeighbors(board, row, column).forEach(neighbor => openField(board, neighbor.row, neighbor.column))
        } else {
            const neighbors = getNeighbors(board, row, column)

            field.nearMines = neighbors.filter(neighbor => neighbor.mined).length
        }
    }
}

const allFields = (board: Board): Field[] => Array<Field>(0).concat(...board)

const hadExplosion = (board: Board): boolean => allFields(board).filter(field => field.exploded).length > 0

const pending = (field: Field): boolean => (field.mined && !field.flagged) || (!field.mined && !field.opened)

const wonGame = (board: Board): boolean => allFields(board).filter(pending).length === 0

const showMines = (board: Board): void =>
    allFields(board)
        .filter(field => field.mined)
        .forEach(field => {
            // eslint-disable-next-line no-param-reassign
            field.opened = true
        })

const invertFlag = (board: Board, row: number, column: number): void => {
    const field = board[row][column]
    field.flagged = !field.flagged
}

const flagsUsed = (board: Board): number => allFields(board).filter(field => field.flagged).length

export {
    Field,
    Board,
    createMinedBoard,
    cloneBoard,
    openField,
    hadExplosion,
    wonGame,
    showMines,
    invertFlag,
    flagsUsed,
}

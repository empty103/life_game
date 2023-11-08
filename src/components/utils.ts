type RowAndCol = {
    row: number,
    col: number,
}

export const getRowAndColumn = (index: number, columns: number): RowAndCol => {
    const row = Math.floor(index / columns);
    const col = index % columns;

    return {
        row,
        col
    }
}

export const getAliveCells = (alive: boolean, aliveNeighbors: number): boolean => {
    return alive
        ? (aliveNeighbors === 2 || aliveNeighbors === 3)
        : aliveNeighbors === 3;
}

export const countAliveNeighbors = (neighbors: boolean[]): number => {
    return neighbors.filter(el => el).length;
}

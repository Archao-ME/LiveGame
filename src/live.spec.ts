class Cell {
    status: number = 0;

    getStatus() {
        return this.status;
    }

    getEnv(map: number[][], position: { x: number; y: number }) {
        let envX = position.x - 1;
        let envY = position.y - 1;
        let envMap = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]
        envMap.forEach((row, rowIndex) => {
            row.forEach((col, colIndex) => {
                if (rowIndex === 1 && colIndex === 1) {
                    return envMap[rowIndex][colIndex] = 2;
                }
                envMap[rowIndex][colIndex] = map[envX + rowIndex][envY + colIndex]
            });
        });
        return envMap;
    }
}

describe('Cell', () => {
    it('live has a default status', () => {
        const cell = new Cell();

        expect(cell.getStatus()).toBe(0);
    });

    it('should return environment of life, 2 means itself ', () => {
        const map = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
        const position = {
            x: 1,
            y: 1
        }
        const cell = new Cell();

        expect(cell.getEnv(map, position)).toStrictEqual(
            [
                [0, 0, 0],
                [0, 2, 0],
                [0, 0, 0]
            ]
        )
    });
});

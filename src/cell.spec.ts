import { Cell } from './cell';

describe('Cell', () => {

    it('cell has a default status', () => {
        const position = {
            x: 0,
            y: 0
        }

        const cell = new Cell(position);

        expect(cell.getStatus()).toBe(0);
    });

    it('should return environment of cell, 2 means itself ', () => {
        const map = [
            [1, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
        const position = {
            x: 1,
            y: 1
        }
        const cell = new Cell(position);

        expect(cell.getEnv(map)).toStrictEqual(
            [
                [1, 0, 0],
                [0, 2, 0],
                [0, 0, 0]
            ]
        )
    });

    it('should return environment of cell when near the border, 2 means itself', () => {
        const map1 = [
            [1, 1, 0],
            [0, 1, 0],
            [0, 0, 0]
        ]
        const map2 = [
            [0, 0, 1],
            [0, 0, 1],
            [0, 0, 1]
        ]
        const position1 = {
            x: 0,
            y: 1
        }
        const position2 = {
            x: 2,
            y: 2
        }
        const cell1 = new Cell(position1);
        const cell2 = new Cell(position2);

        expect(cell1.getEnv(map1)).toStrictEqual(
            [
                [0, 1, 1],
                [0, 2, 1],
                [0, 0, 0]
            ]
        )
        expect(cell2.getEnv(map2)).toStrictEqual(
            [
                [0, 1, 0],
                [0, 2, 0],
                [0, 0, 0]
            ]
        )
    });

    it('should return cells num in environment', () => {
        const map = [
            [1, 1, 0],
            [0, 1, 0],
            [0, 0, 0]
        ];
        const position = {x: 1, y: 1};
        const cell = new Cell(position);

        const num = cell.getEnvCellNum(map);

        expect(num).toBe(2);


        const map1 = [
            [0, 0, 1],
            [0, 0, 0],
            [0, 0, 1]
        ];
        const position1 = {x: 2, y: 1};
        const cell1 = new Cell(position1);

        const num1 = cell1.getEnvCellNum(map1);

        expect(num).toBe(2);
    });

    it('should return the cell die when env with nothing', () => {
        const map = [
            [0, 0, 0],
            [0, 1, 0],
            [0, 0, 0]
        ];
        const position = {x: 1, y: 1};
        const cell = new Cell(position);

        const nextStatus = cell.getNextStatus(map);

        expect(nextStatus).toBe(0);
    });

    it('should return the cell dead when env with 3 live cell and itself is dead', () => {
        const map = [
            [0, 0, 1],
            [0, 0, 1],
            [0, 0, 1]
        ];
        const position = {x: 1, y: 1};
        const cell = new Cell(position);
        cell.setStatus(0);

        const nextStatus = cell.getNextStatus(map);

        expect(nextStatus).toBe(1);
    });

    it('should return the cell live when env with 3 live cell and itself is living', () => {
        const map = [
            [0, 0, 1],
            [0, 1, 1],
            [0, 0, 1]
        ];
        const position = {x: 1, y: 1};
        const cell = new Cell(position);
        cell.setStatus(1);

        const nextStatus = cell.getNextStatus(map);

        expect(nextStatus).toBe(1);
    });

    it('should return the cell live when env with 2 live cell and itself is living', () => {
        const map = [
            [0, 0, 1],
            [0, 1, 0],
            [0, 0, 1]
        ];
        const position = {x: 1, y: 1};
        const cell = new Cell(position);
        cell.setStatus(1);

        const nextStatus = cell.getNextStatus(map);

        expect(nextStatus).toBe(1);
    });

    it('should return the cell status when env === 2', () => {
        const map = [
            [0, 0, 1],
            [0, 0, 0],
            [0, 0, 1]
        ];
        const position = {x: 2, y: 1};
        const cell = new Cell(position);

        const nextStatus = cell.getNextStatus(map);

        expect(nextStatus).toBe(0);


        const cell2 = new Cell(position);

        cell2.setStatus(1);
        const nextStatus2 = cell2.getNextStatus(map);

        expect(nextStatus2).toBe(cell2.getStatus());
    });

    it('should return status is setStatus value', () => {
        const cell = new Cell({x: 1, y:1 });

        cell.setStatus(1);

        expect(cell.getStatus()).toBe(1);
    });
});

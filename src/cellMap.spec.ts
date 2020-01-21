import { Cell } from "./cell";

export interface CellInterface {
    setStatus(status: number);

    getNextStatus(map: number[][]);

    getStatus();

    getEnv(map: number[][]);
}

class CellMap {
    xSize: number;
    ySize: number;
    map: Cell[][];

    constructor(x: number, y: number) {
        this.xSize = x;
        this.ySize = y;
        this.generateMap();
    }

    generateMap() {
        this.map = [];
        for (let y = 0; y < this.ySize; y++) {
            this.map.push([])
            for (let x = 0; x < this.xSize; x++) {
                this.map[y].push(new Cell({x, y}));
            }
        }
    }

    getMap() {
        return this.map;
    }

    getStatusMap() {
        return this.map.map((row) => {
            return row.map((cell) => {
                return cell.getStatus();
            });
        })
    }

    getNextMap() {
        return this.map.map(row => row.map(cell => cell.getNextStatus(this.getStatusMap())));
    }
}

describe('Map of cells', () => {
    it('should return a map of 10*10', () => {
        const cellMap = generateMapWithMockData();

        expect(cellMap.xSize).toBe(10);
        expect(cellMap.ySize).toBe(10);
    });

    it('should return array when call getMap', () => {
        const cellMap = generateMapWithMockData();

        const map = cellMap.getMap();

        expect(map[0][0]).toBeInstanceOf(Cell);
    });

    it('should return statusMap when call toStatusMap', () => {
        const cellMap = new CellMap(3, 3);
        const map = cellMap.getMap();
        map[1][1].setStatus(1);

        const resMock = [
            [0, 0, 0],
            [0, 1, 0],
            [0, 0, 0]
        ]
        expect(cellMap.getStatusMap()).toStrictEqual(resMock);
    });

    it('should return next map of cell status', () => {
        const cellMap = new CellMap(3, 3);
        const map = cellMap.getMap();
        map[1][1].setStatus(1);

        const nextMap = cellMap.getNextMap();

        const resMock = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]
        expect(nextMap).toStrictEqual(resMock);
    });

    function generateMapWithMockData() {
        const xSize = 10;
        const ySize = 10;
        const cellMap = new CellMap(xSize, ySize);
        return cellMap
    }
});

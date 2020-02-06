import { CellInterface } from "./cellMap.spec";

interface PositionInterface {
    x: number;
    y: number;
}

export class Cell implements CellInterface{
    status: number = 0;
    position: PositionInterface;

    constructor(position: PositionInterface) {
        this.position = position;
    }

    setStatus(status: number) {
        this.status = status
    }

    getNextStatus(map: number[][]) {
        const envCellNum = this.getEnvCellNum(map);
        if (this.status === 1 && envCellNum > 3) {
            return 0;
        }
        if (this.status === 0 && envCellNum >= 3) {
            return 1;
        }
        if (envCellNum === 2 || envCellNum === 3) {
            return this.status;
        }
        if (envCellNum < 2) {
            return 0;
        }
        return 0
    }

    getStatus() {
        return this.status;
    }

    getEnv(map: number[][]) {
        let envX = this.position.x - 1;
        let envY = this.position.y - 1;
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
                if (map[envY + rowIndex] === undefined) {
                    return envMap[rowIndex][colIndex] = 0;
                }
                if (map[envY + rowIndex][envX + colIndex] === undefined) {
                    return envMap[rowIndex][colIndex] = 0;
                }
                envMap[rowIndex][colIndex] = map[envY + rowIndex][envX + colIndex] || 0
            });
        });
        return envMap;
    }

    getEnvCellNum(map: number[][]) {
        const env = this.getEnv(map);
        let num = 0;
        env.forEach((row, rowIndex) => {
            row.forEach((col, colIndex) => {
                if (col === 1) {
                    num++;
                }
            });
        });
        return num;
    }

}

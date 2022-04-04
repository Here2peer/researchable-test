
export class Matrix {
    matrix: String[][];
    index: number = 0;

    constructor() {
        this.matrix = [];
    }

    addEdge(edge: string) {
        if(this.matrix[this.index].length !> 5) {
            this.matrix[this.index].concat(edge);
        } else {
            this.index++;
            this.addEdge(edge);
        }
    }

    randomFill(amount: number) {
        for (let i = 0; i < amount; i++) {
            this.matrix[i] = [];
            for (let x = 0; x < amount; x++) {
                let entry = Math.floor(Math.random() * (99999 - 10000 + 1) + 10000)
                this.matrix[i][x] = String(entry);
            }
        }
        this.printMatrix();
    }

    getEntry(x: number, y: number) {
        return this.matrix[x][y];
    }

    printMatrix() {
        console.log(this.matrix)
    }
}
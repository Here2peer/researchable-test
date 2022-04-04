
export class Matrix {
    matrix: Array<Array<String>>
    index: number = 0;

    constructor() {
        this.matrix = [
            []
        ];
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
            for (let x = 0; x < 5; i++) {
                let entry = Math.floor(Math.random() * (99999 - 10000 + 1) + 10000)
                this.matrix[i].concat(String(entry));
            }
        }
    }

    getEntry(x: number, y: number) {
        return this.matrix[x][y];
    }

    printMatrix() {
        for (let i = 0; i < this.matrix.length; i++) {
            console.log(this.matrix[i])
        }
    }
}
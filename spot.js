class Spot {
    constructor(i, j, width, height) {
        this.i = i;
        this.j = j;
        this.width = width;
        this.height = height;

        this.reset()

        this.wall = Math.random() < 0.3
        this.neighbors = []
    }

    //global control of diagonal behaviors
    static allowDiagonalNeigbors = true
    static allowDiagonalOnlyIfAtLeastOneVerticalOrHorizontalFree = true
    static drawCircle = false

    reset() {
        this.f = Infinity;
        this.g = Infinity;
        this.h = 0;
    }

    addNeighbors(grid) {

        this.neighbors = []

        if (!grid) return;

        let i = this.i
        let j = this.j
        let cols = grid.length
        let rows = grid[0].length

        //vertical neighbors
        if (i < cols - 1 && !grid[i + 1][j].wall)
            this.neighbors.push(grid[i + 1][j])

        if (i > 0 && !grid[i - 1][j].wall)
            this.neighbors.push(grid[i - 1][j])

        if (j < rows - 1 && !grid[i][j + 1].wall)
            this.neighbors.push(grid[i][j + 1])

        if (j > 0 && !grid[i][j - 1].wall)
            this.neighbors.push(grid[i][j - 1])

        //diagonal neighbors
        if (!Spot.allowDiagonalNeigbors) return;

        if (i > 0 && j > 0 && !grid[i - 1][j - 1].wall) //top-left
        {
            if (!Spot.allowDiagonalOnlyIfAtLeastOneVerticalOrHorizontalFree || !grid[i][j - 1].wall || !grid[i - 1][j].wall)
                this.neighbors.push(grid[i - 1][j - 1])
        }

        if (i < cols - 1 && j > 0 && !grid[i + 1][j - 1].wall) //top-right
        {
            if (!Spot.allowDiagonalOnlyIfAtLeastOneVerticalOrHorizontalFree || !grid[i][j - 1].wall || !grid[i + 1][j].wall)
                this.neighbors.push(grid[i + 1][j - 1])
        }

        if (i > 0 && j < rows - 1 && !grid[i - 1][j + 1].wall) //bottom-left
        {
            if (!Spot.allowDiagonalOnlyIfAtLeastOneVerticalOrHorizontalFree || !grid[i][j + 1].wall || !grid[i - 1][j].wall)
                this.neighbors.push(grid[i - 1][j + 1])
        }

        if (i < cols - 1 && j < rows - 1 && !grid[i + 1][j + 1].wall) //bottom-right
        {
            if (!Spot.allowDiagonalOnlyIfAtLeastOneVerticalOrHorizontalFree || !grid[i][j + 1].wall || !grid[i + 1][j].wall)
                this.neighbors.push(grid[i + 1][j + 1])
        }
    }

    show(color) {
        //control color from the grid if the spot is a wall

        fill(color)

        

        noStroke()
        if (Spot.drawCircle)
            ellipse(1 + this.i * this.width + this.width / 2,
                1 + this.j * this.height + this.height / 2,
                this.width,
                this.height);
        else
            rect(1 + this.i * this.width,
                1 + this.j * this.height,
                this.width,
                this.height);

    }
}


// function Spot(i, j, width, height) {
//     this.i = i;
//     this.j = j;
//     this.width = width;
//     this.height = height;

//     this.f = 0;
//     this.g = 0;
//     this.h = 0;


//     this.show = function () {
//         rect(this.i * this.width,
//             this.j * this.height,
//             this.width,
//             this.height);
//     }
// }

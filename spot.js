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

    reset() {
        this.f = Infinity;
        this.g = Infinity;
        this.h = 0;
    }

    setNeighbors(neighbors) {
        //this.neighbors = neighbors.filter( n=> !n.wall)
        this.neighbors = neighbors //.filter( n=> !n.wall)
    }

    show(color) {
        //control color from the grid if the spot is a wall

        fill(color)

        let drawCircle = true

        noStroke()
        if (drawCircle)
            ellipse(1 + this.i * this.width+ this.width/2,
                1 + this.j * this.height + this.height/2,
                this.width,
                this.height);
        else
            rect(1 + this.i * this.width,
                1 + this.j * this.height,
                this.width,
                this.height);

    }
}
var s = new Spot()

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

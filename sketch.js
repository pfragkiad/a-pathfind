
var cols = 50, rows =50

var grid;

function setup() {
    createCanvas(600, 600)
    console.log('A* algorithm')

    grid = new Grid(cols, rows, width, height,cols-1,rows-1)

}

function mousePressed()
{
    var i= Math.floor(mouseX/width*cols)
    var j= Math.floor(mouseY/height*rows)
    console.log(`Clicked ${i}, ${j}`)

    //grid = new Grid(cols, rows, width, height,i,j)
    grid.resetStart(i,j)
}


function draw() {
   
    background(0)

    if(grid===undefined) return;

    grid.checkLowest()
    grid.show()


}




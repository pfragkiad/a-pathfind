
var cols = 30, rows =30

var grid;

function setup() {
    createCanvas(400, 400)
    console.log('A* algorithm')

    grid = new Grid(cols, rows, width, height,cols-1,rows-1)

}

function mousePressed()
{
    var i= Math.floor(mouseX/width*cols)
    var j= Math.floor(mouseY/height*rows)
    console.log(`${i}, ${j}, ${mouseX/width}`)

    grid = new Grid(cols, rows, width, height,i,j)
}


function draw() {
   
    background(0)

    if(grid===undefined) return;

    grid.checkLowest()
    grid.show()


}




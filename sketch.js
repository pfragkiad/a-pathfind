//Vastly inspired by Coding Challenge 51.1, 51.2, 51.3

const cols = 50, rows = 50

var grid;
var checkbox;

function setup() {
    console.log('A* algorithm')

    createCanvas(600, 600)
    textAlign(CENTER, CENTER)
    background(0)

    checkbox = createCheckbox('Click will set endpoint', true)
    //checkbox.changed(checkedClickBehavior)

    grid = new Grid(cols, rows, width, height, 0, 0, cols - 1, rows - 1)

}

//function checkedClickBehavior(){}


//Custom features:
//All OP
//Solved/unsolved messages via 'text' centered messages
//Remember wall - change end by clicking with the mouse
//Option to not use closedSet
//Different distance for diagonal neighbors (1.4)
//Ability to change the start point/end point with click (behavior controlled by checkbox)

function mousePressed() {
    if (grid === undefined || checkbox === undefined) return

    if (mouseButton !== LEFT) return

    var i = Math.floor(mouseX / width * cols)
    var j = Math.floor(mouseY / height * rows)
    if (i < 0 || i >= cols || j < 0 || j >= rows) return


    //grid = new Grid(cols, rows, width, height,i,j)

    if (checkbox.checked()) {
        grid.setEnd(i, j)
        console.log(`New end: ${i}, ${j}`)
    }
    else {
        grid.setStart(i, j)
        console.log(`New start: ${i}, ${j}`)
    }
}


function draw() {
    if (grid === undefined) return;

    background(240)

    if (!grid.isFinished) grid.checkLowest()
    grid.show()
}




//Vastly inspired by Coding Challenge 51.1, 51.2, 51.3

const cols = 50, rows = 50

var grid;
var chkClickPoint, chkAllowDiagonals, chkDrawOpenClosedSets, chkAllowOpenDiagonalsOnly, chkRunUntilEnd;

function setup() {
    console.log('A* algorithm')

    createCanvas(600, 600)
    textAlign(CENTER, CENTER)
    background(0)

    chkClickPoint = createCheckbox('Click will set endpoint', true)

    chkAllowDiagonals = createCheckbox('Allow diagonal neighbors', true)
    Spot.allowDiagonalNeigbors = chkAllowDiagonals.checked()
    chkAllowDiagonals.changed(checkedAllowDiagonals)

    chkAllowOpenDiagonalsOnly = createCheckbox('Allow open diagonals only', true)
    chkAllowOpenDiagonalsOnly.changed(checkedAllowOpenDiagonalsOnly)
    Spot.allowDiagonalOnlyIfAtLeastOneVerticalOrHorizontalFree = chkAllowOpenDiagonalsOnly.checked()

    chkDrawOpenClosedSets = createCheckbox('Draw open/closed sets', true)
    Grid.drawOpenClosedSets = chkDrawOpenClosedSets.checked()
    chkDrawOpenClosedSets.changed(checkedDrawOpenClosedSets)

    chkRunUntilEnd = createCheckbox('Run until end',true)
    Grid.runUntilEnd = chkRunUntilEnd.checked()
    chkRunUntilEnd.changed(checkedRunUntilEnd)

    grid = new Grid(cols, rows, width, height, 0, 0, cols - 1, rows - 1)

}

function checkedAllowDiagonals() { 
    Spot.allowDiagonalNeigbors = chkAllowDiagonals.checked()
    grid.reset()
}

function checkedAllowOpenDiagonalsOnly()
{
    Spot.allowDiagonalOnlyIfAtLeastOneVerticalOrHorizontalFree = chkAllowOpenDiagonalsOnly.checked()
    grid.reset()
}

function checkedDrawOpenClosedSets(){
    Grid.drawOpenClosedSets = chkDrawOpenClosedSets.checked()
    grid.reset()
}

function checkedRunUntilEnd()
{
    Grid.runUntilEnd = chkRunUntilEnd.checked()
    grid.reset()
}



//Custom features:
//All OP
//Solved/unsolved messages via 'text' centered messages
//Remember wall - change end by clicking with the mouse
//Option to not use closedSet
//Different distance for diagonal neighbors (1.4)
//Ability to change the start point/end point with click (behavior controlled by checkbox)

function mousePressed() {
    if (grid === undefined || chkClickPoint === undefined) return

    if (mouseButton !== LEFT) return

    var i = Math.floor(mouseX / width * cols)
    var j = Math.floor(mouseY / height * rows)
    if (i < 0 || i >= cols || j < 0 || j >= rows) return


    //grid = new Grid(cols, rows, width, height,i,j)

    if (chkClickPoint.checked()) {
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

    if (!grid.isFinished) grid.proceed()
    grid.show()
}




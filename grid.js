class Grid {
    constructor(cols, rows, width, height, starti, startj, endi, endj) {
        this.cols = cols
        this.rows = rows
        this.width = width
        this.height = height

        //initialize 2d array
        this.grid = new Array(cols)
        //this.grid = []; this.grid.length = cols
        for (let i = 0; i < cols; i++) this.grid[i] = new Array(rows)

        //initialize spots
        this.w = (width - 2) / cols
        this.h = (height - 2) / rows
        for (let i = 0; i < cols; i++)
            for (let j = 0; j < rows; j++)
                this.grid[i][j] = new Spot(i, j, this.w, this.h)

        this.setStartEnd(starti, startj, endi, endj)
    }

    setEnd(endi, endj) {
        this.setStartEnd(this.start.i, this.start.j, endi, endj)
    }

    setStart(starti, startj) {
        this.setStartEnd(starti, startj, this.end.i, this.end.j)
    }


    setStartEnd(starti, startj, endi, endj) {
        for (let i = 0; i < cols; i++)
            for (let j = 0; j < rows; j++)
                this.grid[i][j].reset()

        //initialize other algorithm properties
        this.start = this.grid[starti][startj]
        this.start.g = this.start.f = 0
        this.start.wall = false

        this.end = this.grid[endi][endj]
        this.end.wall = false

        //initialize neighbors (neighbors are filtered)
        for (let i = 0; i < cols; i++)
            for (let j = 0; j < rows; j++)
                this.addNeighborsTo(i, j)

        this.useClosedSet = true

        this.openSet = [this.start]
        if (this.useClosedSet)
            this.closedSet = []

        //state: 0 working, 1 solved, -1 unsolved
        this.state = 0
        this.isFinished = false
        this.path = []


    }

    // get(i, j) {
    //     return this.grid[i][j]
    // }

    addNeighborsTo(i, j) {

        var neighbors = []

        if (i < this.cols - 1 && !this.grid[i + 1][j].wall)
            neighbors.push(this.grid[i + 1][j])

        if (i > 0 && !this.grid[i - 1][j].wall)
            neighbors.push(this.grid[i - 1][j])

        if (j < this.rows - 1 && !this.grid[i][j + 1].wall)
            neighbors.push(this.grid[i][j + 1])

        if (j > 0 && !this.grid[i][j - 1].wall)
            neighbors.push(this.grid[i][j - 1])

        let allowDiagonalOnlyIfAtLeastOneVerticalOrHorizontalFree = true

        //diagonal neighbors
        if (i > 0 && j > 0 && !this.grid[i - 1][j - 1].wall) //top-left
        {
            if (!allowDiagonalOnlyIfAtLeastOneVerticalOrHorizontalFree || !this.grid[i][j - 1].wall || !this.grid[i - 1][j].wall)
                neighbors.push(this.grid[i - 1][j - 1])
        }

        if (i < this.cols - 1 && j > 0 && !this.grid[i + 1][j - 1].wall) //top-right
        {
            if(!allowDiagonalOnlyIfAtLeastOneVerticalOrHorizontalFree || !this.grid[i][j - 1].wall || !this.grid[i + 1][j].wall)
            neighbors.push(this.grid[i + 1][j - 1])
        }

        if (i > 0 && j < rows - 1 && !this.grid[i - 1][j + 1].wall) //bottom-left
        {
            if(!allowDiagonalOnlyIfAtLeastOneVerticalOrHorizontalFree || !this.grid[i][j + 1].wall || !this.grid[i - 1][j].wall)
            neighbors.push(this.grid[i - 1][j + 1])
        }

        if (i < this.cols - 1 && j < rows - 1 && !this.grid[i + 1][j + 1].wall) //bottom-right
        {
            if(!allowDiagonalOnlyIfAtLeastOneVerticalOrHorizontalFree ||!this.grid[i][j + 1].wall || !this.grid[i + 1][j].wall)
            neighbors.push(this.grid[i + 1][j + 1])
        }

        this.grid[i][j].setNeighbors(neighbors)

        //console.log(`Added neighbors for ${i}, ${j}`)
        // if(i==0 && j==0)
        //     console.log(this.grid[0][0])
    }

    updatePath(current) {
        this.path = []
        var temp = current;
        this.path.push(temp)
        while (temp.previous) {
            this.path.push(temp.previous)
            temp = temp.previous
        }
    }

    checkLowest() {
        if (this.isFinished) return

        if (this.openSet.length == 0) {
            this.isFinished = true
            console.log("NO SOLUTION!")
            this.state = -1
            return
        }

        var current = this.openSet[0];
        this.openSet.forEach(s => { if (s.f < current.f) current = s })

        if (current === this.end) {
            this.updatePath(current)
            this.isFinished = true
            console.log("DONE!")
            this.state = 1
            return
        }

        removeFromArray(this.openSet, current)
        if (this.useClosedSet)
            this.closedSet.push(current)

        //https://en.wikipedia.org/wiki/A*_search_algorithm
        var neighbors = current.neighbors
        neighbors.forEach(n => {
            if (this.useClosedSet && this.closedSet.includes(n)) return
            //if (n.wall) return; //no need because 'neighbors' that are wall are not added at all

            //distance current to neigbor (mine)
            let d = manhattan(current.i, current.j, n.i, n.j)
            let tentativeScore = current.g + (d == 1 ? 1 : 1.4)

            if (tentativeScore < n.g) {
                n.previous = current
                this.updatePath(current)

                n.g = tentativeScore
                n.h = heuristic(n.i, n.j, this.end.i, this.end.j)
                n.f = n.g + n.h
                if (!this.openSet.includes(n))
                    this.openSet.push(n)
            }

        })

        //based on code-train
        // for (let i = 0; i < neighbors.length; i++) {
        //     var n = neighbors[i]
        //     if (this.closedSet.includes(n) || n.wall) continue

        //     let d = manhattan(current.i, current.j, n.i, n.j)
        //     var tempG = current.g + d == 1 ? 1 : 1.4 //1 ==distance between neigbor and current

        //     let newPath = false
        //     if (this.openSet.includes(n)) {
        //         if (tempG < n.g) {
        //             n.g = tempG
        //             newPath = true
        //         }
        //     }
        //     else {
        //         n.g = tempG
        //         this.openSet.push(n)
        //         newPath = true
        //     }

        //     //heuristic (distance between neighbor and end)
        //     if (newPath) {
        //         n.h = heuristic(current.i, current.j, this.end.i, this.end.j)
        //         n.f = n.g + n.h
        //         n.previous = current
        //     }
        // }

        //this.updatePath(current)
    }

    showPath() {
        if (this.path) {
            const cPath = color(10, 10, 200)
            //this.path.forEach(s => s.show(cPath))

            noFill()
            stroke(255,20,200)
            strokeWeight(5)
            beginShape()
            this.path.forEach(p => vertex(p.i * this.w + this.w / 2, p.j * this.h + this.h / 2))
            endShape()

        }
    }

    showEmptyOrWall() {
        const cEmpty = color(220)
        const cWall = color(0)

        const drawEmpty = false

        stroke(100)
        for (let i = 0; i < this.cols; i++)
            for (let j = 0; j < this.rows; j++) {
                let s = this.grid[i][j]

                if (s.wall) s.show(cWall)

                if (drawEmpty) {
                    //do not draw closedset/openset squares
                    if (this.openSet.includes(s) || this.useClosedSet && this.closedSet.includes(s)) continue
                    s.show(s.wall ? cWall : cEmpty)
                }
            }
    }

    showOpenClosedSets()
    {
        const cClosed = color(200, 10, 10)
        const cOpen = color(20, 200, 20)


        // this.openSet.forEach(function(s)
        // {
        //     s.show(color(0,255,0))
        // })

        stroke(100)
        this.openSet.forEach(s => s.show(cOpen))
        if (this.useClosedSet)
            this.closedSet.forEach(s => s.show(cClosed))
    }

    show() {
        let drawOpenClosedSets = false
        if(drawOpenClosedSets) this.showOpenClosedSets()
        
        this.showEmptyOrWall();

        

        this.showPath()

        const cStart = color(200, 200, 20)
        const cEnd = color(20, 200, 200)
        this.start.show(cStart)
        this.end.show(cEnd)

        if (this.isFinished) {
            textSize(32)
            stroke(0)
            fill(255)
            strokeWeight(4)
            if (this.state == 1)
                text('SOLVED', this.width / 2, this.height / 2)
            else
                text('UNSOLVED', this.width / 2, this.height / 2)
            strokeWeight(1)

        }


    }
}


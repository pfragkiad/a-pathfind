class Grid {
    constructor(cols, rows, width, height, endi, endj) {
        this.cols = cols
        this.rows = rows
        this.width = width
        this.height = height

        //initialize 2d array
        this.grid = new Array(cols)
        for (let i = 0; i < cols; i++) this.grid[i] = new Array(rows)

        //initialize spots
        let w = (width - 2) / cols
        let h = (height - 2) / rows
        for (let i = 0; i < cols; i++)
            for (let j = 0; j < rows; j++)
                this.grid[i][j] = new Spot(i, j, w, h)

        //initialize neighbors
        for (let i = 0; i < cols; i++)
            for (let j = 0; j < rows; j++)
                this.addNeighborsTo(i, j)

        //initialize other algorithm properties
        this.start = this.grid[0][0]
        this.start.g = this.start.f = 0
        this.start.wall = false

        this.end = this.grid[endi][endj]
        this.end.wall = false


        this.openSet = []
        this.openSet.push(this.start)

        //state: 0 working, 1 solved, -1 unsolved
        this.state = 0

        this.useClosedSet = false
        if (this.useClosedSet)
            this.closedSet = []
    }

    get(i, j) {
        return this.grid[i][j]
    }

    addNeighborsTo(i, j) {
        var neighbors = []
        if (i < this.cols - 1)
            neighbors.push(this.grid[i + 1][j])
        if (i > 0)
            neighbors.push(this.grid[i - 1][j])
        if (j < this.rows - 1)
            neighbors.push(this.grid[i][j + 1])
        if (j > 0)
            neighbors.push(this.grid[i][j - 1])

        if (i > 0 && j > 0)
            neighbors.push(this.grid[i - 1][j - 1])

        if (i < this.cols - 1 && j > 0)
            neighbors.push(this.grid[i + 1][j - 1])

        if (i > 0 && j < rows - 1)
            neighbors.push(this.grid[i - 1][j + 1])

        if (i < this.cols - 1 && j < rows - 1)
            neighbors.push(this.grid[i + 1][j + 1])


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
            if (n.wall) return;

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

    show() {
        const cClosed = color(255, 0, 0)
        const cOpen = color(0, 255, 0)
        const cEmpty = color(210)
        const cPath = color(0, 0, 255)

        for (let i = 0; i < this.cols; i++)
            for (let j = 0; j < this.rows; j++)
                this.grid[i][j].show(cEmpty)

        // this.closedSet.forEach(function(s)
        // {
        //     s.show(color(255,0,0))
        // })

        // this.openSet.forEach(function(s)
        // {
        //     s.show(color(0,255,0))
        // })

    
        this.openSet.forEach(s => s.show(cOpen))
        if (this.useClosedSet)
            this.closedSet.forEach(s => s.show(cClosed))
  
        if (this.path)
            this.path.forEach(s => s.show(cPath))

        if (this.isFinished) {
            textSize(32)
            stroke(0)
            fill(255)
            strokeWeight(4)
            if (this.state == 1)
                text('FINISHED!', this.width / 2, this.height / 2)
            else
                text('UNSOLVED!', this.width / 2, this.height / 2)
            strokeWeight(1)

        }

    }
}

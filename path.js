class Path {
    constructor(spotWidth, spotHeight) {
        this.path = []
        this.spotWidth = spotWidth
        this.spotHeight = spotHeight

        Path.lineColor = color(255, 20, 200)
    }

    static drawWithCurves = false
    static lineColor //= color(255, 20, 200)

    update(current) {
        this.path = [current]

        while (current.previous) {
            this.path.push(current.previous)
            current = current.previous
        }
    }

    show() {
        if (!this.path || this.path.length == 0) return

        noFill()

        stroke(Path.lineColor)
        strokeWeight(6)
        beginShape()
        {
            if (Path.drawWithCurves) {
                let p = this.path[0]
                curveVertex(p.i * this.spotWidth + this.spotWidth / 2, p.j * this.spotHeight + this.spotHeight / 2)

                this.path.forEach(p => curveVertex(p.i * this.spotWidth + this.spotWidth / 2, p.j * this.spotHeight + this.spotHeight / 2))
                // for (let i = 0; i < this.path.length; i++) {

                //     p = this.path[i];

                //     stroke(55, 20, 200, 255 * i / this.path.length)
                //     curveVertex(p.i * this.spotWidth + this.spotWidth / 2, p.j * this.spotHeight + this.spotHeight / 2)
                // }

                p = this.path[this.path.length - 1]
                curveVertex(p.i * this.spotWidth + this.spotWidth / 2, p.j * this.spotHeight + this.spotHeight / 2)
            }
            else {
                this.path.forEach(p => vertex(p.i * this.spotWidth + this.spotWidth / 2, p.j * this.spotHeight + this.spotHeight / 2))
                // for (let i = 0; i < this.path.length; i++) {
                //     let p = this.path[i];
                //     vertex(p.i * this.spotWidth + this.spotWidth / 2, p.j * this.spotHeight + this.spotHeight / 2)
                // }
            }
        }
        endShape()
    }
}
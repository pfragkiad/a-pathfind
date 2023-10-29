class Path
{
    constructor(w,h){
        this.path = []
        this.w = w
        this.h = h
    }

    static drawWithCurves = true

    update(current) {
        this.path = [current]

        var temp = current;
        while (temp.previous) {
            this.path.push(temp.previous)
            temp = temp.previous
        }
    }

    show() {
        if (!this.path || this.path.length == 0) return

        const cPath = color(10, 10, 200)

        noFill()
        stroke(255, 20, 200)
        strokeWeight(6)
        beginShape()
        {
            if (Path.drawWithCurves) {
                let p = this.path[0]
                curveVertex(p.i * this.w + this.w / 2, p.j * this.h + this.h / 2)
                this.path.forEach(p => curveVertex(p.i * this.w + this.w / 2, p.j * this.h + this.h / 2))
                p = this.path[this.path.length - 1]
                curveVertex(p.i * this.w + this.w / 2, p.j * this.h + this.h / 2)
            }
            else
                this.path.forEach(p => vertex(p.i * this.w + this.w / 2, p.j * this.h + this.h / 2))
        }
        endShape()
    }
}
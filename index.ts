const w : number = window.innerWidth 
const h : number = window.innerHeight 
const parts : number = 4
const scGap : number = 0.02 / parts 
const rFactor : number = 10.9 
const barFactor : number = 4.9 
const delay : number = 20 
const colors : Array<string> = [
    "#f44336",
    "#9C27B0",
    "#6200EA",
    "#00C853",
    "#795548"
] 
const backColor : string = "#BDBDBD"

class ScaleUtil {

    static maxScale(scale : number, i : number, n : number) : number {
        return Math.max(0, scale - i / n)
    }

    static divideScale(scale : number, i : number, n : number) : number {
        return Math.min(1 / n, ScaleUtil.maxScale(scale, i, n))
    }

    static sinify(scale : number) : number {
        return Math.sin(scale * Math.PI)
    }
}

class DrawingUtil {

    static drawCircle(context : CanvasRenderingContext2D, x : number, y : number, r : number) {
        context.beginPath()
        context.arc(x, y, r, 0, 2 * Math.PI)
        context.fill()
    }

    static drawBallPlace(context : CanvasRenderingContext2D, scale : number) {
        const size : number = Math.min(w, h) / barFactor 
        const r : number = Math.min(w, h) / rFactor 
        const sf : number = ScaleUtil.sinify(scale)
        context.save()
        context.translate(w / 2, h / 2)
        for (var j = 0; j < 2; j++) {
            const sf1 : number = ScaleUtil.divideScale(sf, j, parts)
            const sf2 : number = ScaleUtil.divideScale(sf, 2 + j, parts)
            context.save()
            context.scale(1 - 2 * j, 1)
            context.fillRect(-w / 2, h / 2 - r, size * sf1, r)
            DrawingUtil.drawCircle(context, -w / 2 + size - r, -h / 2 - r + (h / 2 - r) * sf2, r)
            context.restore()
        }
        context.restore()
    }

    static drawBPNode(context : CanvasRenderingContext2D, i : number, scale : number) {
        context.fillStyle = colors[i]
        DrawingUtil.drawBallPlace(context, scale)
    }
}

class Stage {

    canvas : HTMLCanvasElement = document.createElement('canvas')
    context : CanvasRenderingContext2D 

    initCanvas() {
        this.canvas.width = w 
        this.canvas.height = h 
        this.context = this.canvas.getContext('2d')
        document.body.appendChild(this.canvas)
    }

    render() {
        this.context.fillStyle = backColor 
        this.context.fillRect(0, 0, w, h)
    }

    handleTap() {
        this.canvas.onmousedown = () => {

        }
    }

    static init() {
        const stage : Stage = new Stage()
        stage.initCanvas()
        stage.render()
        stage.handleTap()
    }
}
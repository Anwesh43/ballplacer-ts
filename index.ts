const w : number = window.innerWidth 
const h : number = window.innerHeight 
const parts : number = 3 
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
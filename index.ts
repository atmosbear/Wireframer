function el(id: string) {
    return document.getElementById(id)!
}

let globState = {
    mouseIsDown: false,
    currentTool: "Box",
    currentColor: "lightblue"
}

let dragState = {
    dragStart: [0, 0],
    dragEnd: [0, 0]
}

window.addEventListener("mousedown", (e) => { globState.mouseIsDown = true})
window.addEventListener("mouseup", (e) => { globState.mouseIsDown = false})
window.addEventListener("mousemove", (e) => { })

class RectangleElement {
    constructor(
        public pos: {x: number, y: number} = {x: 0, y: 0},
        public element: HTMLDivElement = document.createElement("div")
    ) {}

}

function makeArrFromProperty<G>(array: G[], property: any) {
    let a: any[] = []
    array.forEach((entry) => {
        a.push(entry[property])
    })
    return a
}

let boxes: RectangleElement[] = []

function onMouseDown(e: MouseEvent) {
    e.target as HTMLDivElement
    let target = e.target as HTMLDivElement
    let  listOfElements = makeArrFromProperty(boxes, "element")
    if (listOfElements.includes(target)) { 
        // the box is being targeted...
        // so let's move it
        target.style.top = e.clientY + "px"
        target.style.left = e.clientX + "px"
    }
}

function onMouseUp(e: MouseEvent) {

}
function onMouseMove(e: MouseEvent) {

}

function animate(tick) {
    requestAnimationFrame(animate)
}
requestAnimationFrame(animate)



dispatchEvent(new CustomEvent("drag"))
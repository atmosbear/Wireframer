function el(id: string) {
    return document.getElementById(id)!
}

let globState = {
    mouseIsDown: false,
    currentTool: "Box",
    currentColor: "lightblue",
    creatingNewBox: false,
    currentBox: undefined as unknown as HTMLDivElement
}

let dragState = {
    dragStart: [0, 0],
    dragEnd: [0, 0]
}

window.addEventListener("mousedown", (e) => { globState.mouseIsDown = true; onMouseDown(e) })
window.addEventListener("mouseup", (e) => { globState.mouseIsDown = false; onMouseUp(e) })
window.addEventListener("mousemove", (e) => { onMouseMove(e) })

class RectangleElement {
    constructor(
        public pos: { x: number, y: number } = { x: 0, y: 0 },
        public element: HTMLDivElement = document.createElement("div")
    ) { }

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
    let target = e.target
    let listOfElements = makeArrFromProperty(boxes, "element")
    if (listOfElements.includes(target)) {
        // the box is being targeted...
        // so let's move it
        let t = target as HTMLDivElement
        t.style.top = e.clientY + "px"
        t.style.left = e.clientX + "px"
    } else if (target === document.body) {
        if (!globState.creatingNewBox) {
            let box = document.createElement("div")
            globState.creatingNewBox = true
            globState.currentBox = box
            box.style.top = e.clientY + "px"
            box.style.left = e.clientX + "px"
            box.style.position = "absolute"
            document.body.appendChild(box)
            console.log("e1")
            box.style.backgroundColor = "orange"
        }
    }
}

function onMouseUp(e: MouseEvent) {
    if (globState.creatingNewBox) {
        globState.creatingNewBox = false
        globState.currentBox = undefined as unknown as HTMLDivElement
    }
}
function onMouseMove(e: MouseEvent) {
    if (globState.creatingNewBox) {
        console.log("e")
        globState.currentBox.style.width = Math.abs(e.clientX - Number(globState.currentBox.style.left.replace("px", ""))) + "px"
        globState.currentBox.style.height = Math.abs(e.clientY - Number(globState.currentBox.style.top.replace("px", ""))) + "px"
    }
}

function animate(tick) {
    boxes.forEach(box => { box.element.style.border = "3px red solid" })
    requestAnimationFrame(animate)
}
requestAnimationFrame(animate)

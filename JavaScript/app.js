const setForm = document.getElementById("set-form");
const addForm = document.getElementById("add-form");
const insertForm = document.getElementById("insert-form");
const animationContainer = document.querySelector(".animation-container")
var root = document.querySelector(':root');
var rootStyles = getComputedStyle(root);
var animationDuration=parseInt(rootStyles.getPropertyValue('--varAnimationDuration').slice(0,-2));
var linkedlist = []
var nextDelay = 0
async function accessAnim(el){
    nextDelay+=animationDuration
    await el.animate([
        {transform: "scale(1)", offset:0},
        {transform: "scale(1.2)", offset:.5},
        {transform: "scale(1)", offset:1}
    ], {
        duration: animationDuration,
        easing: "ease-in-out",
    }).finished
}
async function appearAnim(el){
    el.style.display = "flex"
    await el.animate([
        {transform:"scale(0)", offset:0},
        {transform:"scale(1.2)", offset:.5},
        {transform:"scale(1)", offset:1}
    ], {
        duration: animationDuration,
        fill:"forwards",
        easing: "ease-in"
    }).finished
}
async function rotateAppearAnim(el){
    el.style.display = "block"
    await el.animate([
        {transform:"scale(0) rotate(-30deg)", offset:0},
        {transform:"scale(1.2) rotate(30deg)", offset:.7},
        {transform:"scale(1) rotate(0)", offset:1}
    ], {
        duration: animationDuration,
        fill:"forwards",
        easing: "ease-in",
    }).finished
}
async function updateAnim(el, dat){
    setTimeout(()=>{
        linkedlist[setIndex.value].innerText=dat
    }, animationDuration)
    await el.animate([
        {transform: "scale(1)", offset:0},
        {background:"lawngreen", offset:0.2},
        {transform: "scale(1.2)", offset:.5},
        {background:"lawngreen", offset:0.8},
        {transform: "scale(1)", offset:1}
    ], {
        duration: animationDuration*2,
        easing: "ease-in-out",
    }).finished
}
function forwardAnim(el){
    let dist=138
    return el.animate([
        {transform: "translateX(" + dist +"px)", offset:1}
    ], {
        duration: animationDuration,
        easing: "ease-in-out",
    }).finished
}
async function chainAnimation(idx){
    for (let i = 0; i < idx;i++){
        await accessAnim(linkedlist[i])
        let arrow = animationContainer.children.item(i*2+1)
        await accessAnim(arrow)
    }
}
async function createSpace(idx){
    let lastFinished
    for (let i = idx; i <linkedlist.length;i++){
        forwardAnim(linkedlist[i])
        lastFinished=forwardAnim(animationContainer.children.item(i*2+1))
    }
    await lastFinished
}
function createVar(data){
    const variable = document.createElement("div")
    variable.innerText=data
    variable.classList.add("variable")
    return variable
}
function createArrow(){
    const arrow = document.createElement("i")
    arrow.classList.add("fa-solid", "fa-arrow-right-long")
    return arrow
}
async function linkedListSet(){
    await chainAnimation(setIndex.value)
    await updateAnim(linkedlist[setIndex.value], setData.value)
}
async function linkedListAdd(){
    const variable=createVar(addData.value)
    const arrow=createArrow()
    linkedlist[linkedlist.length]=variable
    animationContainer.appendChild(variable)
    animationContainer.appendChild(arrow)
    await chainAnimation(linkedlist.length-1)
    await appearAnim(variable)
    await rotateAppearAnim(arrow)
    nextDelay=0
}
async function linkedListInsert(){
    const variable=createVar(insertData.value)
    const arrow=createArrow()
    animationContainer.insertBefore(variable, linkedlist[insertIndex.value])
    animationContainer.insertBefore(arrow, linkedlist[insertIndex.value])
    linkedlist.splice(insertIndex.value,0,variable)
    await chainAnimation(insertIndex.value)
    await createSpace(insertIndex.value)
    variable.style.display="flex"
    arrow.style.display="block"
    await appearAnim(variable)
    await rotateAppearAnim(arrow)
}
function linkedListRemove(){
    chainAnimation(removeIndex.value)
}
setForm.addEventListener('submit', (e) => {
    e.preventDefault()
    if (setFormValid()){
        linkedListSet()
    }
})
addForm.addEventListener('submit', (e) => {
    e.preventDefault()
    if (addFormValid()){
        linkedListAdd()
    }
})
insertForm.addEventListener('submit', (e) => {
    e.preventDefault()
    if (insertFormValid()){
        linkedListInsert()
    }
})
removeForm.addEventListener('submit', (e) => {
    e.preventDefault()
    if (removeFormValid()){
        linkedListRemove()
    }
})
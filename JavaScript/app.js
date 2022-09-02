const setForm = document.getElementById("set-form");
const addForm = document.getElementById("add-form");
const insertForm = document.getElementById("insert-form");
const animationContainer = document.querySelector(".animation-container")
var root = document.querySelector(':root');
var rootStyles = getComputedStyle(root);
var animationDuration=parseInt(rootStyles.getPropertyValue('--varAnimationDuration').slice(0,-2));
var linkedlist = []
function accessAnim(el,del){
    el.animate([
        {transform: "scale(1)", offset:0},
        {transform: "scale(1.2)", offset:.5},
        {transform: "scale(1)", offset:1}
    ], {
        duration: animationDuration,
        easing: "ease-in-out",
        delay:del,
    })
}
function appearAnim(el, del){
    el.animate([
        {transform:"scale(0)", offset:0},
        {transform:"scale(1.2)", offset:.5},
        {transform:"scale(1)", offset:1}
    ], {
        duration: animationDuration,
        fill:"forwards",
        easing: "ease-in",
        delay:del,
    })
    setTimeout(()=>{el.style.display = "flex"}, del+1)
    return del+animationDuration
}
function rotateAppearAnim(el, del){
    el.animate([
        {transform:"scale(0) rotate(-30deg)", offset:0},
        {transform:"scale(1.2) rotate(30deg)", offset:.7},
        {transform:"scale(1) rotate(0)", offset:1}
    ], {
        duration: animationDuration,
        fill:"forwards",
        easing: "ease-in",
        delay:del,
    })
    setTimeout(()=>{el.style.display = "block"}, del+1)
    return del+animationDuration
}
function updateAnim(el,del){
    el.animate([
        {transform: "scale(1)", offset:0},
        {background:"lawngreen", offset:0.2},
        {transform: "scale(1.2)", offset:.5},
        {background:"lawngreen", offset:0.8},
        {transform: "scale(1)", offset:1}
    ], {
        duration: animationDuration*2,
        easing: "ease-in-out",
        delay:del,
    })
}
function forwardAnim(el){
    let dist=138
    el.animate([
        {transform: "translateX(" + dist +"px)", offset:1}
    ], {
        duration: animationDuration,
        easing: "ease-in-out"
    })
}
function createSpace(idx,del){
    setTimeout(()=> {
        for (let i = idx; i <linkedlist.length;i++){
            forwardAnim(linkedlist[i])
            forwardAnim(animationContainer.children.item(i*2+1))
        }
    }, del)
    return del+animationDuration
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
function chainAnimation(idx){
    let nextDelay=0
    for (let i = 0; i < idx;i++){
        accessAnim(linkedlist[i],nextDelay)
        nextDelay+=animationDuration
        let arrow = animationContainer.children.item(i*2+1)
        accessAnim(arrow,nextDelay)
        nextDelay+=animationDuration
    }
    return nextDelay
}
function linkedListSet(){
    let nextDelay = chainAnimation(setIndex.value)
    updateAnim(linkedlist[setIndex.value],nextDelay)
    nextDelay+=animationDuration
    setTimeout(() => {linkedlist[setIndex.value].innerText=setData.value}, nextDelay)
}
function linkedListAdd(){
    const variable=createVar(addData.value)
    const arrow=createArrow()
    linkedlist[linkedlist.length]=variable
    animationContainer.appendChild(variable)
    animationContainer.appendChild(arrow)
    let nextDelay=chainAnimation(linkedlist.length-1)
    nextDelay=appearAnim(variable,nextDelay)
    nextDelay=rotateAppearAnim(arrow, nextDelay)
}
function linkedListInsert(){
    const variable=createVar(insertData.value)
    const arrow=createArrow()
    animationContainer.insertBefore(variable, linkedlist[insertIndex.value])
    animationContainer.insertBefore(arrow, linkedlist[insertIndex.value])
    linkedlist.splice(insertIndex.value,0,variable)
    let nextDelay=chainAnimation(insertIndex.value)
    nextDelay=createSpace(insertIndex.value,nextDelay)
    setTimeout(() => {  variable.style.display="flex"
                        arrow.style.display="block"}, nextDelay)
    nextDelay=appearAnim(variable,nextDelay)
    rotateAppearAnim(arrow,nextDelay)
}
function linkedListRemove(){
    let nextDelay=chainAnimation(removeIndex.value)
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
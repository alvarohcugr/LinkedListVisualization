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
        easing: "ease-in",
        delay:del,
    })
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
function forwardAnim(el, del){
    let dist=138
    el.animate([
        {transform: "translateX(" + dist +"px)", offset:1}
    ], {
        duration: animationDuration,
        easing: "ease-in-out",
        delay:del,
    })
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
function linkedListSet(){
    let nextDelay=0
    for (let i = 0; i < setIndex.value;i++){
        accessAnim(linkedlist[i],nextDelay)
        nextDelay+=animationDuration
        let arrow = animationContainer.children.item(i*2+1)
        accessAnim(arrow,nextDelay)
        nextDelay+=animationDuration
    }
    updateAnim(linkedlist[setIndex.value],nextDelay)
    nextDelay+=animationDuration
    setTimeout(() => {linkedlist[setIndex.value].innerText=setData.value}, nextDelay)
}
function linkedListAdd(){
    let nextDelay=0
    const variable=createVar(addData.value)
    const arrow=createArrow()
    for (let i = 0; i < linkedlist.length;i++){
        accessAnim(linkedlist[i],nextDelay)
        nextDelay+=animationDuration
        accessAnim(animationContainer.children.item(i*2+1),nextDelay)
        nextDelay+=animationDuration
    }
    linkedlist[linkedlist.length]=variable
    setTimeout(() => {
        animationContainer.appendChild(variable)
        animationContainer.appendChild(arrow)
    }, nextDelay)
}
function linkedListInsert(){
    let nextDelay=0
    const variable=createVar(insertData.value)
    const arrow=createArrow()
    for (let i = 0; i < insertIndex.value;i++){
        accessAnim(linkedlist[i],nextDelay)
        nextDelay+=animationDuration
        accessAnim(animationContainer.children.item(i*2+1),nextDelay)
        nextDelay+=animationDuration
    }
    for (let i = insertIndex.value; i <linkedlist.length;i++){
        forwardAnim(linkedlist[i],nextDelay)
        forwardAnim(animationContainer.children.item(i*2+1),nextDelay)
    }
    nextDelay+=animationDuration
    setTimeout(() => {
        animationContainer.insertBefore(variable, linkedlist[insertIndex.value])
        animationContainer.insertBefore(arrow, linkedlist[insertIndex.value])
        linkedlist.splice(insertIndex.value,0,variable)
    }, nextDelay)
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
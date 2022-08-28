const setIndex = document.getElementById("set-index");
const setData = document.getElementById("set-data");
const setErrors = document.querySelectorAll("#set-form .error-container");
const addData = document.getElementById("add-data");
const addError = document.querySelector("#add-form .error-container");
 const insertIndex = document.getElementById("insert-index"); 
const insertData = document.getElementById("insert-data");
const insertErrors = document.querySelectorAll("#insert-form .error-container");
const removeIndex = document.getElementById("remove-index");
const removeForm = document.getElementById("remove-form");
const removeErrors = document.querySelectorAll("#remove-form .error-container");
function setErrorFor(el, mes){
    const span = el.querySelector("span")
    span.innerText=mes
    el.classList.add("active-error")
}
function indexValid(idx,err){
    if (idx.value.length == 0){
        setErrorFor(err,"Index can't be empty")
    }else if (isNaN(idx.value)){
        setErrorFor(err,"Index must be a number")
    }else if (idx.value >= linkedlist.length || idx.value < 0){
        setErrorFor(err,"Index must be a positive number lower than linked list size")
    }else{
        err.classList.remove("active-error")
    }
}
function dataValid(dat,err){
    if (dat.value.length == 0){
        setErrorFor(err,"Data can't be empty")
    } else if (isNaN(dat.value)){
        setErrorFor(err,"Data must be a number")
    }else{
        err.classList.remove("active-error")
    }
}
function setFormValid(){
    indexValid(setIndex,setErrors[0])
    dataValid(setData,setErrors[1])
    return  !setErrors[0].classList.contains("active-error") && 
            !setErrors[1].classList.contains("active-error")
}
function insertFormValid(){
    indexValid(insertIndex,insertErrors[0])
    dataValid(insertData,insertErrors[1])
    return  !insertErrors[0].classList.contains("active-error") && 
            !insertErrors[1].classList.contains("active-error")
}
function addFormValid(){
    dataValid(addData,addError);
    return  !addError.classList.contains("active-error")
}
function removeFormValid(){
    indexValid(removeIndex,removeErrors[0]);
    return  !removeError.classList.contains("active-error")
}
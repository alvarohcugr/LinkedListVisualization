const speedInput=document.getElementById("speed-input")
const speedOutput=document.getElementById("speed-output")
const settingsButton=document.getElementById("sidebar-menu-button")
const settingsContainer=document.querySelector(".settings-container")
const headerContainer=document.querySelector(".container")  
speedInput.addEventListener('input', ()=>{
    speedOutput.innerHTML=speedInput.value
    animationDuration=parseInt(speedInput.value);
})
settingsButton.addEventListener('click', ()=>{
    settingsContainer.classList.toggle("hided")
})
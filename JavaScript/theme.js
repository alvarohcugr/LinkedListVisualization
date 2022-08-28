const themeButton = document.getElementById("theme-button");
const darkBg = "#333", darkHeader="#555", darkFont="#fff", darkInput="#ddd";
const lightBg = "#fff", lightHeader="#ddd", lightFont="#555", lightInput="#ddd";
var dark=true;
var r = document.querySelector(":root");
themeButton.addEventListener('click', () => {
    if (dark){
        r.style.setProperty("--background", lightBg);
        r.style.setProperty("--headerBackground", lightHeader);
        r.style.setProperty("--fontColor", lightFont);
        r.style.setProperty("--inputBackground", darkInput)
    }else {
        r.style.setProperty("--background", darkBg);
        r.style.setProperty("--headerBackground", darkHeader);
        r.style.setProperty("--fontColor", darkFont);
        r.style.setProperty("--inputBackground", lightInput)
    };
    dark=!dark;
});
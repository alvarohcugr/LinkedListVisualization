const themeButton = document.getElementById("theme-button");
const darkBg = "#333", darkHeader="#555", darkFont="#fff", darkInput="#ddd";
const lightBg = "#fff", lightHeader="#ddd", lightFont="#555", lightInput="#ddd";
var dark=true;
themeButton.addEventListener('click', () => {
    if (dark){
        root.style.setProperty("--background", lightBg);
        root.style.setProperty("--headerBackground", lightHeader);
        root.style.setProperty("--fontColor", lightFont);
        root.style.setProperty("--inputBackground", darkInput)
    }else {
        root.style.setProperty("--background", darkBg);
        root.style.setProperty("--headerBackground", darkHeader);
        root.style.setProperty("--fontColor", darkFont);
        root.style.setProperty("--inputBackground", lightInput)
    };
    dark=!dark;
});
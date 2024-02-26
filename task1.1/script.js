const idDropDown = document.getElementById("blockTextDropdown");
const dropdown = document.querySelector("blockTextDropdown");
const button = document.querySelector("dropdownButton");

document.getElementById('dropdownButton').addEventListener('click', function(event) {
    idDropDown.style.display = idDropDown.style.display === "block" ? "none" : "block";
});

document.addEventListener('click', function(event) {
    if (!dropdown.contains(event.target) && event.target !== button) {
        dropdown.style.display = "none";
    }
});
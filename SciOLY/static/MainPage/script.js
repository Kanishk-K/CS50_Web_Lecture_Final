document.addEventListener('DOMContentLoaded', function(){
    const MenuButton = document.querySelector(".Menu");
    const MenuClose = document.querySelector(".closebtn");

    MenuButton.addEventListener('click', ()=>{
        document.getElementById("mySidenav").style.width = "250px";
    })
    MenuClose.addEventListener('click', ()=>{
        document.getElementById("mySidenav").style.width = "0px";
    })
})
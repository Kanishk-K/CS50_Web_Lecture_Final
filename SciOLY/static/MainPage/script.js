document.addEventListener('DOMContentLoaded', function(){
    const MenuButton = document.querySelector(".Menu");
    const MenuClose = document.querySelector(".closebtn");
    const UserImgInfo = document.querySelector(".UserInfo");
    const UserTitles = document.querySelector(".Titles")
    const UserInfo = document.querySelector(".Info");
    const MemberDropdown = document.querySelector(".MemberChoose");

    MenuButton.addEventListener('click', ()=>{
        document.getElementById("mySidenav").style.width = "250px";
    })
    MenuClose.addEventListener('click', ()=>{
        document.getElementById("mySidenav").style.width = "0px";
    })

    document.querySelectorAll(".Team").forEach((TeamButton) => {
        TeamButton.addEventListener("click", ()=>{
            //When any button on the Team Dropdown is clicked.
            MemberDropdown.className = MemberDropdown.className.split(" d-none")[0];
            UserImgInfo.className += " d-none";
            UserTitles.className += " d-none";
            UserInfo.className += " d-none";
        })
    })
    document.querySelectorAll(".Member").forEach((MemberButton) => {
        MemberButton.addEventListener("click", ()=>{
            //When any button on the Member Dropdown is clicked.
            UserImgInfo.className = UserImgInfo.className.split(" d-none")[0]
            UserTitles.className = UserTitles.className.split(" d-none")[0]
            UserInfo.className = UserInfo.className.split(" d-none")[0]
        })
    })
})
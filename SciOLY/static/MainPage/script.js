document.addEventListener('DOMContentLoaded', function(){
    const MenuButton = document.querySelector(".Menu");
    const MenuClose = document.querySelector(".closebtn");
    const UserImgInfo = document.querySelector(".UserInfo");
    const UserTitles = document.querySelector(".Titles")
    const UserInfo = document.querySelector(".Info");
    const MemberDropdown = document.querySelector(".MemberChoose");
    const UserDropdown = document.querySelector(".Users")
    const CSRFToken = document.querySelector("input[name='csrfmiddlewaretoken']").value;

    MenuButton.addEventListener('click', ()=>{
        document.getElementById("mySidenav").style.width = "250px";
    })
    MenuClose.addEventListener('click', ()=>{
        document.getElementById("mySidenav").style.width = "0px";
    })

    document.querySelectorAll(".Team").forEach((TeamButton) => {
        TeamButton.addEventListener("click", ()=>{
            //When any button on the Team Dropdown is clicked.
            const TeamRequest = new XMLHttpRequest();
            TeamRequest.open("POST","/UserInfo")
            TeamRequest.onload = () => {
                //When the server returns information regarding teams.
                const responseTeam = JSON.parse(TeamRequest.responseText);
                UserDropdown.querySelectorAll("button").forEach(btn => btn.remove());
                for (username in responseTeam){
                    var newUser = document.createElement("button");
                    newUser.className = "Member dropdown-item";
                    newUser.innerHTML = responseTeam[username];
                    //Add an onclick attribute to all generated buttons.
                    newUser.onclick = () => {
                        const UserRequest = new XMLHttpRequest();
                        UserRequest.open("POST","/UserInfo")
                        UserRequest.onload = () => {
                            //What to do when a user is selected
                            const responseUser = JSON.parse(UserRequest.responseText)
                            console.log(responseUser);
                            UserInfo.querySelectorAll("li").forEach(list => list.remove());
                            UserImgInfo.querySelector("img").src = responseUser.MemberImg;
                            UserImgInfo.querySelector("p").innerHTML = responseUser.MemberDesc;
                            var Events = responseUser.Events.split(",");
                            var Awards = responseUser.Awards.split(",");
                            for (var i=0; i<Events.length-1;i++){
                                var newEvent = document.createElement("li")
                                newEvent.innerHTML = Events[i]
                                UserInfo.querySelector(".Events").appendChild(newEvent);
                            }
                            for (var i=0;i<Awards.length-1;i++){
                                var newAward = document.createElement("li");
                                newAward.innerHTML = Awards[i];
                                UserInfo.querySelector(".Awards").appendChild(newAward);
                            }
                            console.log(Events)
                            UserImgInfo.className = UserImgInfo.className.split(" d-none")[0]
                            UserTitles.className = UserTitles.className.split(" d-none")[0]
                            UserInfo.className = UserInfo.className.split(" d-none")[0]
                        }
                        const UserResponse = new FormData();
                        UserResponse.append('Type',"User")
                        UserResponse.append('Member',newUser.innerHTML)
                        UserResponse.append('csrfmiddlewaretoken',CSRFToken)
                        UserRequest.send(UserResponse)
                    }
                    UserDropdown.appendChild(newUser);
                }
                MemberDropdown.className = MemberDropdown.className.split(" d-none")[0];
                UserImgInfo.className += " d-none";
                UserTitles.className += " d-none";
                UserInfo.className += " d-none";
            }
            const TeamResponse = new FormData();
            TeamResponse.append('Type',"Team");
            TeamResponse.append('Team',TeamButton.innerHTML);
            TeamResponse.append('csrfmiddlewaretoken',CSRFToken);
            TeamRequest.send(TeamResponse);
        })
    })
})
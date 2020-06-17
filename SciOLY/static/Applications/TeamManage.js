document.addEventListener("DOMContentLoaded",function(){
    const RemoveButtons = document.querySelectorAll(".RemovePerson");
    const RemoveTeamButtons = document.querySelectorAll(".RemoveTeam");
    const MemberButtons = document.querySelectorAll(".Member");
    const CSRFToken = document.querySelector("input[name='csrfmiddlewaretoken']").value;

    RemoveTeamButtons.forEach((RemoveTeamButton)=>{
        RemoveTeamButton.addEventListener("click",()=>{
            RemoveTeamname = RemoveTeamButton.parentElement.dataset.teamname;
            const TeamRemoveRequest = new XMLHttpRequest();
            TeamRemoveRequest.open("POST","/AdminPage/Teams/Submit");
            TeamRemoveRequest.onload = () => {
                const response = JSON.parse(TeamRemoveRequest.responseText);
                if (response["request"] == "Success"){
                    RemoveTeamButton.parentElement.parentElement.parentElement.parentElement.remove();
                }
            }
            const TeamRemoveResponse = new FormData();
            TeamRemoveResponse.append("Teamname",RemoveTeamname)
            TeamRemoveResponse.append("intent","RemoveTeam");
            TeamRemoveResponse.append("csrfmiddlewaretoken",CSRFToken);
            TeamRemoveRequest.send(TeamRemoveResponse);
        })
    })

    RemoveButtons.forEach((RemoveButton)=>{
        RemoveButton.addEventListener("click",()=>{
            Username = RemoveButton.parentElement.dataset.username;
            Teamname = RemoveButton.parentElement.parentElement.parentElement.parentElement.querySelector(".Teamname").dataset.teamname;
            const TeamRequest = new XMLHttpRequest();
            TeamRequest.open("POST","/AdminPage/Teams/Submit");
            TeamRequest.onload = () => {
                const response = JSON.parse(TeamRequest.responseText);
                if (response["request"] == "Success"){
                    RemoveButton.parentElement.remove();
                }
            }
            const TeamResponse = new FormData();
            TeamResponse.append("Username",Username);
            TeamResponse.append("Teamname",Teamname)
            TeamResponse.append("intent","Remove");
            TeamResponse.append("csrfmiddlewaretoken",CSRFToken);
            TeamRequest.send(TeamResponse);
        })
    })
    MemberButtons.forEach((MemberButton)=>{
        MemberButton.addEventListener("click",()=>{
            Username = MemberButton.dataset.username;
            Teamname = MemberButton.parentElement.parentElement.parentElement.querySelector(".Teamname").dataset.teamname;
            const MemberRequest = new XMLHttpRequest();
            MemberRequest.open("POST","/AdminPage/Teams/Submit");
            MemberRequest.onload = () => {
                var newListMember = document.createElement("li");
                newListMember.className = "text-white";
                newListMember.dataset.username = MemberButton.dataset.username;
                var newRemoveButton = document.createElement("button");
                newRemoveButton.className = "RemovePerson btn btn-outline-danger btn-sm mx-2 mb-2";
                newRemoveButton.innerText = "Remove";
                newRemoveButton.onclick = () => {
                    ButtonUsername = newRemoveButton.parentElement.dataset.username;
                    ButtonTeamname = newRemoveButton.parentElement.parentElement.parentElement.parentElement.querySelector(".Teamname").innerText;
                    const TeamRequest = new XMLHttpRequest();
                    TeamRequest.open("POST","/AdminPage/Teams/Submit");
                    TeamRequest.onload = () => {
                        const response = JSON.parse(TeamRequest.responseText);
                        if (response["request"] == "Success"){
                            newRemoveButton.parentElement.remove();
                        }
                    }
                    const TeamResponse = new FormData();
                    TeamResponse.append("Username",ButtonUsername);
                    TeamResponse.append("Teamname",ButtonTeamname)
                    TeamResponse.append("intent","Remove");
                    TeamResponse.append("csrfmiddlewaretoken",CSRFToken);
                    TeamRequest.send(TeamResponse);
                }
                var newTextNode = document.createTextNode(MemberButton.innerText);
                newListMember.appendChild(newRemoveButton);
                newListMember.appendChild(newTextNode);
                if (document.querySelector(".NullMembers") != null){
                    document.querySelector(".NullMembers").remove();
                }
                MemberButton.parentElement.parentElement.parentElement.querySelector(".MemberList").appendChild(newListMember);
            }
            const MemberResponse = new FormData();
            MemberResponse.append("Username",Username);
            MemberResponse.append("Teamname",Teamname);
            MemberResponse.append("intent","Add");
            MemberResponse.append("csrfmiddlewaretoken",CSRFToken);
            MemberRequest.send(MemberResponse);
        })
    })
})
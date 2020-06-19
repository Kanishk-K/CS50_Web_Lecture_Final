document.addEventListener("DOMContentLoaded",function(){
    const CSRFToken = document.querySelector("input[name='csrfmiddlewaretoken']").value;
    NewEventButton = document.querySelector(".EventButton");
    NewAwardButton = document.querySelector(".AwardButton");
    ButtonListButtons = document.querySelectorAll(".ButtonList");
    AwardListButtons = document.querySelectorAll(".AwardList");
    EventDeleteButtons = document.querySelectorAll(".EventDelete");
    AwardDeleteButtons = document.querySelectorAll(".AwardDelete");



    NewEventButton.addEventListener("click",()=>{
        if (NewEventButton.parentElement.parentElement.querySelector("input").value.length > 0){
            const NewEventRequest = new XMLHttpRequest();
            NewEventRequest.open("POST","/AdminPage/StudentManager");
            NewEventRequest.onload = () => {
                const response = JSON.parse(NewEventRequest.responseText);
                if (response["request"] == "Success"){
                    location.reload();
                }
            }
            const NewEventResponse = new FormData();
            NewEventResponse.append("Intent","NewEvent");
            NewEventResponse.append("EventName",NewEventButton.parentElement.parentElement.querySelector("input").value);
            NewEventResponse.append("csrfmiddlewaretoken",CSRFToken);
            NewEventRequest.send(NewEventResponse);
        }
    })
    NewAwardButton.addEventListener("click",()=>{
        if (NewAwardButton.parentElement.parentElement.querySelector("input").value.length > 0){
            const NewAwardRequest = new XMLHttpRequest();
            NewAwardRequest.open("POST","/AdminPage/StudentManager");
            NewAwardRequest.onload = () => {
                const response = JSON.parse(NewAwardRequest.responseText);
                if (response["request"] == "Success"){
                    location.reload();
                }
            }
            const NewAwardResponse = new FormData();
            NewAwardResponse.append("Intent","NewAward");
            NewAwardResponse.append("AwardName",NewAwardButton.parentElement.parentElement.querySelector("input").value);
            NewAwardResponse.append("csrfmiddlewaretoken",CSRFToken);
            NewAwardRequest.send(NewAwardResponse);
        }
    })
    EventDeleteButtons.forEach((EventDeleteButton)=>{
        EventDeleteButton.addEventListener("click",()=>{
            var EventName = EventDeleteButton.parentElement.innerText;
            var Username = EventDeleteButton.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(".UsernameContainer").innerText;
            const DeleteEventRequest = new XMLHttpRequest();
            DeleteEventRequest.open("POST","/AdminPage/StudentManager");
            DeleteEventRequest.onload = () => {
                const response = JSON.parse(DeleteEventRequest.responseText);
                if (response["request"] == "Success"){
                    EventDeleteButton.parentElement.remove();
                }
            }
            const DeleteEventResponse = new FormData();
            DeleteEventResponse.append("Intent","DeleteEvent");
            DeleteEventResponse.append("EventName",EventName);
            DeleteEventResponse.append("Username",Username);
            DeleteEventResponse.append("csrfmiddlewaretoken",CSRFToken);
            DeleteEventRequest.send(DeleteEventResponse);
        })
    })
    AwardDeleteButtons.forEach((AwardDeleteButton)=>{
        AwardDeleteButton.addEventListener("click",()=>{
            var AwardName = AwardDeleteButton.parentElement.innerText;
            var Username = AwardDeleteButton.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(".UsernameContainer").innerText;
            const DeleteAwardRequest = new XMLHttpRequest();
            DeleteAwardRequest.open("POST","/AdminPage/StudentManager");
            DeleteAwardRequest.onload = () => {
                const response = JSON.parse(DeleteAwardRequest.responseText);
                if (response["request"] == "Success"){
                    AwardDeleteButton.parentElement.remove();
                }
            }
            const DeleteAwardResponse = new FormData();
            DeleteAwardResponse.append("Intent","DeleteAward");
            DeleteAwardResponse.append("AwardName",AwardName);
            DeleteAwardResponse.append("Username",Username);
            DeleteAwardResponse.append("csrfmiddlewaretoken",CSRFToken);
            DeleteAwardRequest.send(DeleteAwardResponse);
        })
    })
    ButtonListButtons.forEach((ButtonListButton)=>{
        ButtonListButton.addEventListener("click",()=>{
            var NewEvent = ButtonListButton.innerText;
            var Username = ButtonListButton.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(".UsernameContainer").innerText;
            const AddEventRequest = new XMLHttpRequest();
            AddEventRequest.open("POST","/AdminPage/StudentManager");
            AddEventRequest.onload = () => {
                const response = JSON.parse(AddEventRequest.responseText);
                if (response["request"] == "Success"){
                    console.log("Event Added")
                    newEventDeleteButtonImage = document.createElement("img");
                    newEventDeleteButtonImage.src = "/static/Applications/close.png";
                    newEventDeleteButton = document.createElement("button");
                    newEventDeleteButton.className = "EventDelete btn btn-outline-danger w-25 d-flex justify-content-center mr-2";
                    newEventDeleteButton.appendChild(newEventDeleteButtonImage);
                    newEventDeleteButton.onclick = () => {
                        var newEventDeleteEventName = newEventDeleteButton.parentElement.innerText;
                        var newEventDeleteEventUsername = newEventDeleteButton.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(".UsernameContainer").innerText;
                        const DeleteEventRequest = new XMLHttpRequest();
                        DeleteEventRequest.open("POST","/AdminPage/StudentManager");
                        DeleteEventRequest.onload = () => {
                            const response = JSON.parse(DeleteEventRequest.responseText);
                            if (response["request"] == "Success"){
                                newEventDeleteButton.parentElement.remove();
                            }
                        }
                        const DeleteEventResponse = new FormData();
                        DeleteEventResponse.append("Intent","DeleteEvent");
                        DeleteEventResponse.append("EventName",newEventDeleteEventName);
                        DeleteEventResponse.append("Username",newEventDeleteEventUsername);
                        DeleteEventResponse.append("csrfmiddlewaretoken",CSRFToken);
                        DeleteEventRequest.send(DeleteEventResponse);
                    }
                    newTextNode = document.createTextNode(NewEvent);
                    newEventListItem = document.createElement("li")
                    newEventListItem.className = "row mt-2";
                    newEventListItem.appendChild(newEventDeleteButton);
                    newEventListItem.appendChild(newTextNode);
                    ButtonListButton.parentElement.parentElement.parentElement.querySelector("ul").appendChild(newEventListItem);
                }
            }
            const AddEventResponse = new FormData();
            AddEventResponse.append("Intent","AddEvent");
            AddEventResponse.append("EventName",NewEvent);
            AddEventResponse.append("Username",Username);
            AddEventResponse.append("csrfmiddlewaretoken",CSRFToken);
            AddEventRequest.send(AddEventResponse);
        })
    })
    AwardListButtons.forEach((AwardListButton)=>{
        AwardListButton.addEventListener("click",()=>{
            var NewAward = AwardListButton.innerText;
            var Username = AwardListButton.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(".UsernameContainer").innerText;
            const AddAwardRequest = new XMLHttpRequest();
            AddAwardRequest.open("POST","/AdminPage/StudentManager");
            AddAwardRequest.onload = () => {
                const response = JSON.parse(AddAwardRequest.responseText);
                if (response["request"] == "Success"){
                    console.log("Event Added")
                    newAwardDeleteButtonImage = document.createElement("img");
                    newAwardDeleteButtonImage.src = "/static/Applications/close.png";
                    newAwardDeleteButton = document.createElement("button");
                    newAwardDeleteButton.className = "AwardDelete btn btn-outline-danger w-25 d-flex justify-content-center mr-2";
                    newAwardDeleteButton.appendChild(newAwardDeleteButtonImage);
                    newAwardDeleteButton.onclick = () => {
                        var newAwardDeleteEventName = newAwardDeleteButton.parentElement.innerText;
                        var newAwardDeleteEventUsername = newAwardDeleteButton.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(".UsernameContainer").innerText;
                        const DeleteAwardRequest = new XMLHttpRequest();
                        DeleteAwardRequest.open("POST","/AdminPage/StudentManager");
                        DeleteAwardRequest.onload = () => {
                            const response = JSON.parse(DeleteEventRequest.responseText);
                            if (response["request"] == "Success"){
                                newAwardDeleteButton.parentElement.remove();
                            }
                        }
                        const DeleteAwardResponse = new FormData();
                        DeleteAwardResponse.append("Intent","DeleteAward");
                        DeleteAwardResponse.append("EventName",newAwardDeleteEventName);
                        DeleteAwardResponse.append("Username",newAwardDeleteEventUsername);
                        DeleteAwardResponse.append("csrfmiddlewaretoken",CSRFToken);
                        DeleteAwardRequest.send(DeleteAwardResponse);
                    }
                    newTextNode = document.createTextNode(NewAward);
                    newAwardListItem = document.createElement("li")
                    newAwardListItem.className = "row mt-2";
                    newAwardListItem.appendChild(newAwardDeleteButton);
                    newAwardListItem.appendChild(newTextNode);
                    AwardListButton.parentElement.parentElement.parentElement.querySelector("ul").appendChild(newAwardListItem);
                }
            }
            const AddAwardResponse = new FormData();
            AddAwardResponse.append("Intent","AddAward");
            AddAwardResponse.append("AwardName",NewAward);
            AddAwardResponse.append("Username",Username);
            AddAwardResponse.append("csrfmiddlewaretoken",CSRFToken);
            AddAwardRequest.send(AddAwardResponse);
        })
    })
})
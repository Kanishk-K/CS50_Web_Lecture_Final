document.addEventListener("DOMContentLoaded",function(){
    const ActivateButtons = document.querySelectorAll(".Activate");
    const DenyButtons = document.querySelectorAll(".Deny");
    const CSRFToken = document.querySelector("input[name='csrfmiddlewaretoken']").value;

    ActivateButtons.forEach((ActivateButton) => {
        ActivateButton.addEventListener("click",()=>{
            //When any activate button is clicked, find the user it belongs to and send a query to activate the user.
            const Username = ActivateButton.parentElement.parentElement.querySelector(".UsernameContainer").innerText;
            const ApplicationRequest = new XMLHttpRequest();
            ApplicationRequest.open("POST","/AdminPage/Applications");
            ApplicationRequest.onload = () => {
                ActivateButton.parentElement.parentElement.parentElement.remove();
            }
            const ApplicationResponse = new FormData();
            ApplicationResponse.append("username",Username);
            ApplicationResponse.append("intent","Activate");
            ApplicationResponse.append("csrfmiddlewaretoken",CSRFToken);
            ApplicationRequest.send(ApplicationResponse);
        })
    })
    DenyButtons.forEach((DenyButton)=>{
        DenyButton.addEventListener("click",()=>{
            //When any deny button is clicked, get the username from the parent and send information to the server.
            const Username = DenyButton.parentElement.parentElement.querySelector(".UsernameContainer").innerText;
            const ApplicationRequest = new XMLHttpRequest();
            ApplicationRequest.open("POST","/AdminPage/Applications");
            ApplicationRequest.onload = () => {
                DenyButton.parentElement.parentElement.querySelector(".Status").innerText = "Rejected";
            }
            const ApplicationResponse = new FormData();
            ApplicationResponse.append("username",Username);
            ApplicationResponse.append("intent","Deny");
            ApplicationResponse.append("csrfmiddlewaretoken",CSRFToken);
            ApplicationRequest.send(ApplicationResponse);
        })
    })
})
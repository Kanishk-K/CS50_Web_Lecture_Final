document.addEventListener("DOMContentLoaded",function(){
    const ActivateButtons = document.querySelectorAll(".Activate");
    const CSRFToken = document.querySelector("input[name='csrfmiddlewaretoken']").value;

    ActivateButtons.forEach((ActivateButton) => {
        ActivateButton.addEventListener("click",()=>{
            //What to do when any activate button is clicked.
            const Username = ActivateButton.parentElement.parentElement.querySelector(".UsernameContainer").innerText;
            const ApplicationRequest = new XMLHttpRequest();
            ApplicationRequest.open("POST","/AdminPage/Graduate");
            ApplicationRequest.onload = () => {
                ActivateButton.parentElement.parentElement.parentElement.remove();
            }
            const ApplicationResponse = new FormData();
            ApplicationResponse.append("username",Username);
            ApplicationResponse.append("csrfmiddlewaretoken",CSRFToken);
            ApplicationRequest.send(ApplicationResponse);
        })
    })
})
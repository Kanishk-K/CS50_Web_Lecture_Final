document.addEventListener("DOMContentLoaded",function(){
    const Textfield = document.querySelector(".Textfield");
    const TextLabel = document.querySelector(".TextfieldLabel");
    characters = Textfield.maxLength - Textfield.value.length;
    TextLabel.innerHTML = `Characters Remaining: ${characters}`;
    const InputField = document.querySelector(".UploadField");
    const ImageHolder = document.querySelector(".ImageHolder");


    Textfield.addEventListener("keyup", ()=>{
        //If a user changes the value of the text in the textbox update the remaining characters accordingly.
        console.log("Keypressed")
        characters = Textfield.maxLength - Textfield.value.length
        TextLabel.innerHTML = `Characters Remaining: ${characters}`
    })
    InputField.addEventListener("change",()=>{
        //If the user has uploaded an image read the value and change the display image accordingly to reflect changes.
        var reader = new FileReader();
        reader.readAsDataURL(InputField.files[0])
        reader.onload = (event) => {
            ImageHolder.src = event.target.result;
        }
    })
})
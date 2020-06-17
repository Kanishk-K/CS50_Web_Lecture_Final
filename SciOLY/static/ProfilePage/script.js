document.addEventListener("DOMContentLoaded",function(){
    const Textfield = document.querySelector(".Textfield");
    const TextLabel = document.querySelector(".TextfieldLabel");
    characters = Textfield.maxLength - Textfield.value.length;
    TextLabel.innerHTML = `Characters Remaining: ${characters}`;
    const InputField = document.querySelector(".UploadField");
    const ImageHolder = document.querySelector(".ImageHolder");


    Textfield.addEventListener("keyup", ()=>{
        console.log("Keypressed")
        characters = Textfield.maxLength - Textfield.value.length
        TextLabel.innerHTML = `Characters Remaining: ${characters}`
    })
    InputField.addEventListener("change",()=>{
        var reader = new FileReader();
        reader.readAsDataURL(InputField.files[0])
        reader.onload = (event) => {
            ImageHolder.src = event.target.result;
        }
    })
})
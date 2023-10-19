// mouse click
for(var i=0; i<document.querySelectorAll(".drum").length; i++){
    document.querySelectorAll(".drum")[i].addEventListener("click", handleClick);
}

//keyboard press
document.addEventListener("keydown", handleKey);

function handleClick(){
    var key = this.innerHTML;
    makeSound(key);
    buttonAnimation(key);
}

function handleKey(KeyboardEvent){
    makeSound(KeyboardEvent.key);
    buttonAnimation(KeyboardEvent.key);
}

function makeSound(key){
    var sound = "";
    switch(key){
        case "w":
            sound = "tom-1";
            break;
        case "a":
            sound = "tom-2";
            break;
        case "s":
            sound = "tom-3";
            break;
        case "d":
            sound = "tom-4";
            break;
        case "j":
            sound = "snare";
            break;
        case "k":
            sound = "crash";
            break;
        case "l":
            sound = "kick-bass";
            break;
        default:
            console.log(key);
            break;
    }
    if(sound !== ""){
        var audio = new Audio("./sounds/" + sound + ".mp3");
        audio.play();
    } 
}

function buttonAnimation(buttonPressed){
    var activeKey = document.querySelector("." + buttonPressed);
    activeKey.classList.add("pressed");
    setTimeout(function(){
        activeKey.classList.remove("pressed")
    }, 100);
}


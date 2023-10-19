var random1 = Math.floor(Math.random()*6) + 1;
var random1path = "./images/dice" + random1 + ".png";
document.querySelectorAll("img")[0].setAttribute("src", random1path);

var random2 = Math.floor(Math.random()*6) + 1;
var random2path = "./images/dice" + random2 + ".png";
document.querySelectorAll("img")[1].setAttribute("src", random2path);

if(random1 > random2){
    document.querySelector("h1").textContent = "🚩 Player 1 Wins";
}
else if(random2 > random1){
    document.querySelector("h1").textContent = "Player 2 Wins 🚩";
}
else{
    document.querySelector("h1").textContent = "Draw!";
}
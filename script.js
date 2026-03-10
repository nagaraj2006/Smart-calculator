let display = document.getElementById("display");
let historyList = document.getElementById("historyList");

/* DISPLAY FUNCTIONS */

function appendValue(value){
display.value += value;
}

function clearDisplay(){
display.value = "";
}

function deleteLast(){
display.value = display.value.slice(0,-1);
}

/* CALCULATION */

function calculate(){

try{

let expression = display.value;
let result = eval(expression);

display.value = result;

addToHistory(expression + " = " + result);

}
catch{
display.value = "Error";
}

}

/* HISTORY */

function addToHistory(text){

let li = document.createElement("li");

li.textContent = text;

/* click history → result reuse */

li.onclick = function(){

let result = text.split("=")[1].trim();

display.value = result;

};

historyList.prepend(li);

saveHistory();

}

function clearHistory(){

historyList.innerHTML="";

localStorage.removeItem("calcHistory");

}

/* SAVE HISTORY */

function saveHistory(){

localStorage.setItem("calcHistory",historyList.innerHTML);

}

function loadHistory(){

historyList.innerHTML = localStorage.getItem("calcHistory") || "";

}

/* KEYBOARD SUPPORT */

document.addEventListener("keydown",function(e){

if(!isNaN(e.key) || "+-*/.".includes(e.key)){

display.value += e.key;

}

if(e.key === "Enter"){

calculate();

}

if(e.key === "Backspace"){

deleteLast();

}

if(e.key === "Escape"){

clearDisplay();

}

});

/* THEME TOGGLE */

document.getElementById("themeToggle")
.addEventListener("change",function(){

document.body.classList.toggle("light");

});

document.getElementById("themeToggle")
.addEventListener("change",function(){

document.body.classList.toggle("dark-mode");

});

/* LOAD HISTORY WHEN PAGE OPEN */

window.onload = loadHistory;
let memory = 0;


const searchInput = document.getElementById("historySearch");

searchInput.addEventListener("keyup", function(){

let filter = searchInput.value.toLowerCase();

let items = historyList.getElementsByTagName("li");

for(let i = 0; i < items.length; i++){

let text = items[i].textContent.toLowerCase();

if(text.includes(filter)){
items[i].style.display = "";
}
else{
items[i].style.display = "none";
}

}

});
function copyResult(){

let display = document.getElementById("display");

if(display.value === "") return;

navigator.clipboard.writeText(display.value);

}
function copyResult(){

let display = document.getElementById("display");
let toast = document.getElementById("copyToast");

if(display.value === "") return;

navigator.clipboard.writeText(display.value);

toast.classList.add("show");

setTimeout(()=>{
toast.classList.remove("show");
},2000);

}


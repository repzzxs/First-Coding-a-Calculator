// sekarang buat codingannya buat calculator 

const display = document.getElementById("display");

function appendToDisplay(input){ // papan ketik
    display.value += input;
}

function clearDisplay(){
   display.value = ""; // command clear
}

function calculate(){
    try{
        display.value = eval(display.value);
    }
    catch(error)
    {
        display.value = "error"; // visible if theres wrong calculation
    }
}

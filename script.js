//creation of calculation portion of calculator
let runningTotal = 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector('.screen');

function buttonClick(value)
{
    if (isNaN(value));
    {
        handleSymbol(value);
    }
    else 
    {
        handleNumber(value);
    }
    screen.innerText = buffer;
}


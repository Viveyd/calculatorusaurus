[... document.querySelectorAll(".calc-controls input.num-btn")].forEach(numBtn =>{
    numBtn.addEventListener("click", inputNumber)
});
[... document.querySelectorAll(".calc-controls input.num-operator")].forEach(numBtn =>{
    numBtn.addEventListener("click", setOperator)
});
document.querySelector(".calc-controls input.num-sign").addEventListener("click", toggleNumSign);
document.querySelector(".calc-controls input.num-point").addEventListener("click", addPoint);
document.querySelector(".calc-controls input.num-sqrd").addEventListener("click", squareNumber);

const calcInputs = {
    operand1: null,
    operand2: null,
    operator: null,
    temp: null,
    justCalculated: false,
}

function setOperator(e){
    if(calcInputs.temp === null) return;
    else if(calcInputs.operand1 === null || calcInputs.justCalculated === true){
        calcInputs.operand1 = calcInputs.temp;
        calcInputs.operator = e.target.value;
        clearTemp();
        if(calcInputs.justCalculated === true) calcInputs.justCalculated = false;
    } else if(calcInputs.operand2 === null){ // has operand1 but no operand2
        calcInputs.operand2 = calcInputs.temp;
        calcInputs.temp = operate(e.target.value, calcInputs.operand1, calcInputs.operand2);
        document.querySelector(".calc-display").textContent = calcInputs.temp;
        calcInputs.operand2 = null;
        calcInputs.operand1 = calcInputs.temp;
        calcInputs.justCalculated = true;
    }
}

function clearDisplay(){
    document.querySelector(".calc-display").textContent = "";
}

function clearTemp(){
    calcInputs.temp = null;
}
    


function toggleNumSign(){
    if(Number(calcInputs.temp) === 0) return;
    else if(calcInputs.temp.includes("-")) calcInputs.temp = calcInputs.temp.slice(1);
    else calcInputs.temp = "-" + calcInputs.temp;
    document.querySelector(".calc-display").textContent = calcInputs.temp;
}

function addPoint(){
    if(calcInputs.temp === null) calcInputs.temp = "0.";
    else if(calcInputs.temp.includes(".")) return;
    else calcInputs.temp +=  ".";
    document.querySelector(".calc-display").textContent = calcInputs.temp;
}

function inputNumber(e){
    if(calcInputs.temp === null || calcInputs.justCalculated) {
        if(calcInputs.justCalculated === true){
            calcInputs.justCalculated = false;
        } 
        calcInputs.temp = e.target.value;
    }
    else calcInputs.temp += e.target.value;
    document.querySelector(".calc-display").textContent = calcInputs.temp;
}

function squareNumber(){
    const calcDisplay = document.querySelector(".calc-display");
    if(Number(calcDisplay.textContent) > 1) calcDisplay.textContent = Number(calcDisplay.textContent)**2;
}

function add(num1 , num2){
    return num1 + num2;
}

function subtract(num1 , num2){
    return num1 - num2;
}

function multiply(num1 , num2){
    return num1 * num2;
}

function divide(num1 , num2){
    return num1 / num2;
}

function operate(operator, num1, num2){ // operator is one of the func above
    switch(operator){
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
    }
}



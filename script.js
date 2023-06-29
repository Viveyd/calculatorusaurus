[... document.querySelectorAll(".calc-controls input.num-btn")].forEach(numBtn =>{
    numBtn.addEventListener("click", inputNumber)
});
[... document.querySelectorAll(".calc-controls input.num-operator")].forEach(numBtn =>{
    numBtn.addEventListener("click", setOperator)
});
document.querySelector(".calc-controls input.num-sign").addEventListener("click", toggleNumSign);
document.querySelector(".calc-controls input.num-point").addEventListener("click", addPoint);
document.querySelector(".calc-controls input.num-sqrd").addEventListener("click", squareNumber);
document.querySelector(".calc-controls input.num-equal").addEventListener("click", equate);


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
    } else {
        calcInputs.operand2 = calcInputs.temp;
        calcInputs.temp = operate(e.target.value, calcInputs.operand1, calcInputs.operand2);
        calcInputs.operand1 = calcInputs.temp;
        calcInputs.justCalculated = true;
        document.querySelector(".calc-display").textContent = calcInputs.temp;
    }
}

function equate(){ // for equal operator
    if(calcInputs.temp === null) return;
    else if(calcInputs.operand1 && calcInputs.operator){
        calcInputs.operand2 = calcInputs.temp;
        calcInputs.temp = operate(calcInputs.operator, calcInputs.operand1, calcInputs.operand2);
        calcInputs.operand1 = null;
        calcInputs.justCalculated = true;
        document.querySelector(".calc-display").textContent = calcInputs.temp;

    } else if(calcInputs.justCalculated){
        calcInputs.temp = operate(calcInputs.operator, calcInputs.temp, calcInputs.operand2);
        document.querySelector(".calc-display").textContent = calcInputs.temp;
    }
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

function operate(operator, num1, num2){ // operator is one of the func above
    num1 = Number(num1);
    num2 = Number(num2);
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




function toggleNumSign(){
    if(Number(calcInputs.temp) === 0) return;
    else if(calcInputs.temp.toString().includes("-")) calcInputs.temp = calcInputs.temp.slice(1);
    else calcInputs.temp = "-" + calcInputs.temp;
    document.querySelector(".calc-display").textContent = calcInputs.temp;
}

function addPoint(){
    if(calcInputs.temp === null) calcInputs.temp = "0.";
    else if(calcInputs.temp.includes(".")) return;
    else calcInputs.temp +=  ".";
    document.querySelector(".calc-display").textContent = calcInputs.temp;
}

function squareNumber(){
    const calcDisplay = document.querySelector(".calc-display");
    if(Number(calcDisplay.textContent) > 1) calcDisplay.textContent = Number(calcDisplay.textContent)**2;
}

function clearDisplay(){
    document.querySelector(".calc-display").textContent = "";
}

function clearTemp(){
    calcInputs.temp = null;
}


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
document.querySelector(".calc-controls input.clear-all").addEventListener("mousedown", clearAll);


window.addEventListener("keydown", (e) => {
    const ACCEPTED = ["Enter","0","1","2","3","4","5","6","7","8","9","/","*","-", "+", "."];
    if(ACCEPTED.includes(e.key)){
        if(e.key === "Enter") {
            document.querySelector(`.calc-controls input.num-equal`).click();
        } else {
            document.querySelector(`.calc-controls input[value='${e.key}']`).click();
        }
    }
})


const calcInputs = {
    operand1: null,
    operand2: null,
    operator: null,
    temp: null,
    justCalculated: false,
    lastInput: null
}

let calcResult = null;

function setOperator(e){
    const {operand1, operand2, operator, temp} = calcInputs;
    const calcDisplay =  document.querySelector(".calc-display");
    if(operand1 === null && temp){
        calcInputs.operand1 = temp;
        calcInputs.operator = e.target.value;
        calcInputs.temp = null;
    } else if(operand1 && temp === null){
        calcInputs.operator = e.target.value;
    }
    else if(operand1 && operator && operand2 === null && temp){ // Computes result and changes operator
        calcInputs.operand2 = temp;
        calcResult = operate(operator, operand1, calcInputs.temp);
        calcInputs.operator = e.target.value;
        calcInputs.operand1 = calcResult;
        calcInputs.operand2 = null;
        calcDisplay.textContent = calcResult;
        clearTemp();
    } 
}

function equate(){ // for equal operator
    const {operand1, operand2, operator, temp} = calcInputs;
    const calcDisplay =  document.querySelector(".calc-display");
    if(operand1 === null){
        return;
    }
    else if(operand1 && operand2 === null && temp){
        calcInputs.operand2 = temp;
        calcResult = operate(calcInputs.operator, operand1, calcInputs.operand2);
        calcDisplay.textContent = calcResult;
        calcInputs.operand1 = calcResult;
        calcInputs.operand2 = null;
        calcInputs.operator = null;
        clearTemp();
    }

}

function inputNumber(e){
    if(calcInputs.temp === null) calcInputs.temp = e.target.value;
    else calcInputs.temp += e.target.value;
    const calcDisplay =  document.querySelector(".calc-display");
    calcDisplay.textContent = calcInputs.temp;
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
    else if(calcInputs.temp.toString().includes(".")) return;
    else calcInputs.temp +=  ".";
    document.querySelector(".calc-display").textContent = calcInputs.temp;
}

function squareNumber(){
    const calcDisplay = document.querySelector(".calc-display");
    if(Number(calcDisplay.textContent) > 1) calcDisplay.textContent = Number(calcDisplay.textContent)**2;
}

function clearAll(e){
    document.querySelector(".calc-display").textContent = "";
    calcInputs.operand1 = null;
    calcInputs.operand2 = null;
    calcInputs.operator = null;
    calcInputs.temp = null;
    e.preventDefault();
}

function clearDisplay(){
    document.querySelector(".calc-display").textContent = "";
}

function clearTemp(){
    calcInputs.temp = null;
}

/* 
if click
*/
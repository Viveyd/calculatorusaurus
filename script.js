[... document.querySelectorAll(".calc-controls input.num-btn")].forEach(numBtn =>{
    numBtn.addEventListener("click", inputNumber)
});
[... document.querySelectorAll(".calc-controls input.num-operator")].forEach(numBtn =>{
    numBtn.addEventListener("click", setOperator)
});
document.querySelector(".calc-controls input.num-sign").addEventListener("click", toggleNumSign);
document.querySelector(".calc-controls input.num-point").addEventListener("click", addPoint);
document.querySelector(".calc-controls input.num-sqrd").addEventListener("click", squareNumber);
document.querySelector(".calc-controls input.num-sqrt").addEventListener("click", numToSqrt);
document.querySelector(".calc-controls input.num-reciprocal").addEventListener("click", numToReciprocal);
document.querySelector(".calc-controls input.num-equal").addEventListener("click", equate);
document.querySelector(".calc-controls input.clear-all").addEventListener("click", clearAll);
document.querySelector(".calc-controls input.clear-entry").addEventListener("click", clearEntry);
document.querySelector(".calc-controls input.del").addEventListener("click", delChar);


window.addEventListener("keydown", (e) => {
    const ACCEPTED = ["Enter","Backspace","Escape", "Delete","0","1","2","3","4","5","6","7","8","9","/","*","-", "+", "."];
    if(ACCEPTED.includes(e.key)){
        if(e.key === "Enter") {
            document.querySelector(`.calc-controls input.num-equal`).click();
        } else if(e.key === "Backspace") {
            document.querySelector(`.calc-controls input.del`).click();
        } else if(e.key === "Escape") {
            document.querySelector(`.calc-controls input.clear-all`).click();
        }else if(e.key === "Delete") {
            document.querySelector(`.calc-controls input.clear-entry`).click();
        }else {
            document.querySelector(`.calc-controls input[value='${e.key}']`).click();
        }
    }
})


const calcInputs = {
    operand1: null,
    operand2: null,
    operator: null,
    temp: null,
    lastInput: null
}

let calcResult = null;
let hadJustComputed = false;
let hadJustComputed_setOperator = false;
let previousOperation = { // Mainly for equate()
    operand1: null,
    operand2: null,
    operator: null,
};

function setOperator(e){ // Also sets the operands, and computes the result if current data is operable
    const {operand1, operand2, operator, temp} = calcInputs;
    const calcDisplay =  document.querySelector(".calc-display");
    if(hadJustComputed === true){ // Initialize or prep a follow up computation after equate() if operator was immediately inputted after.
        hadJustComputed = false;
        calcInputs.temp = null;
    }
    if(operand1 === null && temp){ // Set operand 1 (step 1)
        calcInputs.operand1 = temp;
        calcInputs.operator = e.target.value;
        calcInputs.temp = null;
    } else if(operand1 && temp === null){ // Change operator mid operation (optional step 1.1)
        calcInputs.operator = e.target.value;
    }
    else if(operand1 && operator && operand2 === null && temp){ // Set operand 2, compute, prep variables for next computation AIO (step 2)
        calcInputs.operand2 = temp;
        calcResult = operate(operator, operand1, calcInputs.temp);
        recordOperation();
        calcInputs.operator = e.target.value;
        calcInputs.operand1 = calcResult;
        calcInputs.operand2 = null;
        calcDisplay.textContent = calcResult;
        clearTemp();
        hadJustComputed_setOperator = true;
    } 
}

function equate(){ // for equal operator
    const {operand1, operand2, operator, temp} = calcInputs;
    const calcDisplay =  document.querySelector(".calc-display");
    if(hadJustComputed || hadJustComputed_setOperator){ // If user presses equal for second time in a row, repeat previous operation but with new operand 1 (the result from last computation)
        calcResult = operate(previousOperation.operator, calcInputs.operand1, previousOperation.operand2);
        calcDisplay.textContent = calcResult;
        calcInputs.operand1 = calcResult;
        return;
    }
    if(operand1 === null){
        return;
    }
    else if(operand1 && operand2 === null && temp){
        calcInputs.operand2 = temp;
        calcResult = operate(calcInputs.operator, operand1, calcInputs.operand2);
        recordOperation();
        calcDisplay.textContent = calcResult;
        calcInputs.operand1 = calcResult;
        calcInputs.operand2 = null;
        calcInputs.operator = null;
        clearTemp();
        hadJustComputed = true; // temporarily change the behavior of the succeeding inputNumber(), setOperator(), and equate() (for just 1 call, except equate, with whichever consumes it first)
    }

}

function recordOperation(){
    previousOperation = { // Actually, only operand2 is used currently but will be useful for future features
        operand1: calcInputs.operand1,
        operand2: calcInputs.operand2,
        operator: calcInputs.operator,
    };
}

function setCalcInputs(op, op1, op2){
    if(op !== undefined) calcInputs.operator = op;
    if(op1 !== undefined) calcInputs.operand1 = op1;
    if(op2 !== undefined) calcInputs.operand2 = op2;
}

function inputNumber(e){
    if(hadJustComputed){ // Reset state if user inputs number immediately after equate(), prepping the state for brand new computation. 
        hadJustComputed = false;
        calcInputs.operand1 = null;
        if(calcInputs.temp === "0.") calcInputs.temp += e.target.value; // Prevents '0.' from being overwritten on next new computation.
        else calcInputs.temp = e.target.value;
    }
    else if(calcInputs.temp === null) calcInputs.temp = e.target.value;
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
    if(calcInputs.temp === null) {
        calcInputs.temp = "0.";
    }
    else if(calcInputs.temp.toString().includes(".")) return;
    else calcInputs.temp +=  ".";
    document.querySelector(".calc-display").textContent = calcInputs.temp;
}

function squareNumber(){
    if(Number(calcInputs.temp) > 1) {
        calcInputs.temp = Number(calcInputs.temp)**2
        document.querySelector(".calc-display").textContent = calcInputs.temp;
    };
}

function numToSqrt(){
    calcInputs.temp = Math.sqrt(Number(calcInputs.temp));
    document.querySelector(".calc-display").textContent = calcInputs.temp;
}

function numToReciprocal(){
    if(Number(calcInputs.temp) > 1) {
        calcInputs.temp = 1/Number(calcInputs.temp);
        document.querySelector(".calc-display").textContent = calcInputs.temp;
    };
}

function clearAll(e){
    document.querySelector(".calc-display").textContent = "";
    calcInputs.operand1 = null;
    calcInputs.operand2 = null;
    calcInputs.operator = null;
    calcInputs.temp = null;
    e.preventDefault();
}

function clearEntry(){
    if(calcInputs.temp === null) return;
    else if(calcInputs.temp !== ""){
        calcInputs.temp = "";
    }
    document.querySelector(".calc-display").textContent = calcInputs.temp;
}

function clearDisplay(){
    document.querySelector(".calc-display").textContent = "";
}

function delChar(){
    if(calcInputs.temp === null) return;
    else if(calcInputs.temp !== ""){
        calcInputs.temp = calcInputs.temp.slice(0, -1)
    }
    document.querySelector(".calc-display").textContent = calcInputs.temp;
}

function clearTemp(){
    calcInputs.temp = null;
}

/* 
if click
*/
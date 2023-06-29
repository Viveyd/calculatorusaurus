[... document.querySelectorAll(".calc-controls input.num-btn")].forEach(numBtn =>{
    numBtn.addEventListener("click", inputNumber)
});
document.querySelector(".calc-controls input.num-sign").addEventListener("click", toggleNumSign);
document.querySelector(".calc-controls input.num-point").addEventListener("click", addPoint);

function toggleNumSign(){
    const calcDisplay = document.querySelector(".calc-display");
    if(Number(calcDisplay.textContent) === 0) return;
    else if(calcDisplay.textContent.includes("-")) calcDisplay.textContent = calcDisplay.textContent.slice(1);
    else calcDisplay.textContent = "-" + calcDisplay.textContent;
}

function addPoint(){
    const calcDisplay = document.querySelector(".calc-display");
    if(calcDisplay.textContent.includes(".")) return;
    else if(calcDisplay.textContent === "") calcDisplay.textContent = "0.";
    else calcDisplay.textContent +=  ".";
}

function inputNumber(e){
    document.querySelector(".calc-display").textContent += e.target.value;
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
    return operator(num1, num2); 
}



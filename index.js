function display(event){
    document.getElementById("text").value += (event);
}
function displayOp(event){
    document.getElementById("text").value += (" " + event + " ");
}
function clr(){
    document.getElementById("text").value = "";
}
function solve(){
    let text = (document.getElementById("text").value);
    text = text.trim();
    let equation = text.split(' ').reverse();
    for(let i = 0; i < equation.length; i++){
        alert(equation[i]);
    }
    let postfixArr = postfix(equation);
    let answer = orderOfOps(postfixArr);
    document.getElementById("text").value = answer;
}
function postfix(equation){ 
    var output = [];
    var opStack = [];
    while(equation.length > 0){
        var next = equation.pop();
        if(next == "+"){
            if(opStack.length == 0){
                opStack.push(next);
            }else{
                output.push(opStack.pop());
                opStack.push(next);
            }
        }else if(next == "-"){
            if(opStack.length == 0){
                opStack.push(next);
            }else{
                output.push(opStack.pop());
                opStack.push(next);
            }
        }else if(next == "x"){
            if((opStack.length == 0) || (opStack[opStack.length - 1] == "+") || (opStack[opStack.length - 1] == "-")){
                opStack.push(next);
            }else{
                output.push(opStack.pop());
                opStack.push(next);
            }
        }else if(next == "/"){
            if((opStack.length == 0) || (opStack[opStack.length - 1] == "+") || (opStack[opStack.length - 1] == "-")){
                opStack.push(next);
            }else{
                output.push(opStack.pop());
                opStack.push(next);
            }
        }else{
            output.push(next);
        }
    }
        while(opStack.length > 0){
            output.push(opStack.pop());
        }
        return output;
}

function orderOfOps(equation){
    var input = equation.reverse();
    var outStack = [];
    while(input.length > 0){
        let next = input.pop();
        let operand1 = 0;
        let operand2 = 0;
        if((next == "+") || (next == "-")){
                if(next == "+"){
                    operand2 = outStack.pop();
                    operand1 = outStack.pop();
                    outStack.push(parseInt(operand1) + parseInt(operand2));
                }else{
                    operand2 = outStack.pop();
                    operand1 = outStack.pop();
                    outStack.push(parseInt(operand1) - parseInt(operand2));
                }
        }else if((next == "x") || (next == "/")){
            if(next == "x"){
                operand2 = outStack.pop();
                operand1 = outStack.pop();
                outStack.push(parseInt(operand1) * parseInt(operand2));
            }else{
                operand2 = outStack.pop();
                operand1 = outStack.pop();
                outStack.push(parseInt(operand1) / parseInt(operand2));
            }
        }else{
            outStack.push(next);
        }
    }
    return outStack.pop();
}

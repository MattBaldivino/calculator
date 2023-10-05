function display(event){
    document.getElementById("text").value += (event);
}
function displayOp(event){
    //need different display method for operators to add space before and after
    //need space before and after operators to act as delimiter to support multidigit nums
    document.getElementById("text").value += (" " + event + " ");
}
function clr(){
    document.getElementById("text").value = "";
}
function solve(){
    let text = (document.getElementById("text").value);

    //need to reverse array so it's easier to use as a stack
    let equation = text.split(' ').reverse();
    try{
        let postfixArr = postfix(equation);
        let answer = orderOfOps(postfixArr);
        if(isNaN(answer)){
            throw new Error("No expression may start or end with an operator!");
        }
        document.getElementById("text").value = answer;
    }catch(e){
        alert(e);
    }
}
function postfix(equation){ 
    var outStack = [];
    var opStack = [];
    while(equation.length > 0){
        //look at each index one by one
        var next = equation.pop();
        if(next == "+"){
            if(opStack.length == 0){
                opStack.push(next);
            }else{
                //add and sub have lowest precedence so any ops already in stack are pushed to output first
                outStack.push(opStack.pop());
                opStack.push(next);
            }
        }else if(next == "-"){
            if(opStack.length == 0){
                opStack.push(next);
            }else{
                outStack.push(opStack.pop());
                opStack.push(next);
            }
        }else if(next == "x"){
            if((opStack.length == 0) || (opStack[opStack.length - 1] == "+") || (opStack[opStack.length - 1] == "-")){
                //mult and div have higher precedence than add or sub so it is pushed first
                opStack.push(next);
            }else{
                outStack.push(opStack.pop());
                opStack.push(next);
            }
        }else if(next == "/"){
            if((opStack.length == 0) || (opStack[opStack.length - 1] == "+") || (opStack[opStack.length - 1] == "-")){
                opStack.push(next);
            }else{
                outStack.push(opStack.pop());
                opStack.push(next);
            }
        }else{
            outStack.push(next);
        }
    }
        while(opStack.length > 0){
            //push anything leftover to the output
            outStack.push(opStack.pop());
        }
        return outStack;
}

function orderOfOps(equation){
    //reversed array easier to use as stack
    var input = equation.reverse();
    var outStack = [];
    while(input.length > 0){
        let next = input.pop();
        let operand1 = 0;
        let operand2 = 0;
        if((next == "+") || (next == "-")){
                if(next == "+"){
                    //take two nums off the top of the stack and perform the operation
                    //push result to stack
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
            //anything that is not an operator is pushed
            outStack.push(next);
        }
    }
    //should only be one element in stack at the end
    return outStack.pop();
}

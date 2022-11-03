class calculator{
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement=previousOperandTextElement;
        this.currentOperandTextElement=currentOperandTextElement;
        this.clear();
    }
    clear(){
        this.current='';
        this.previous='';
        this.operation=undefined;
    }
    delete(){
        this.current=this.current.toString().slice(0,-1);

    }
    appendNumber(number){
        if(number=='.' && this.current.includes('.')) return;
        this.current=this.current.toString()+number.toString();

    }
    chooseOperation(operation){
        if(this.current==='') return;
        if(this.previous!==' '){
            this.compute();
        } 
        this.operation=operation;
        this.previous=this.current;
        this.current='';



    }
    compute(){
        let ans;
        const prev=parseFloat(this.previous);
        const curr=parseFloat(this.current);
        let op=this.operation;
        if(isNaN(prev) || isNaN(curr)) return;
        switch(op){
            case '+':
                ans=prev+curr;
                break;
            case '-':
                ans=prev-curr;
                break;
            case '*':
                ans=prev*curr;
                break;
            case '÷':
                ans=prev/curr;
                break;

        }
        this.current=ans;
        this.previous='';
        this.operation=undefined;

    }
    updateDisplay(){

        this.currentOperandTextElement.innerText=this.current;

        if(this.operation!=null){
            let x=this.previous.toString()+this.operation.toString();
            this.previousOperandTextElement.innerText=x;


        }
        else{
            this.previousOperandTextElement.innerText='';

        }
        

    }
}
const numberButtons=document.querySelectorAll(".number");
const operationButtons=document.querySelectorAll(".operation");
const equalsButton=document.querySelector(".equals");
const deleteButton=document.querySelector(".delete");
const allClearButton=document.querySelector(".all-clear");
const previousOperandTextElement = document.querySelector(".previous-operand");
const currentOperandTextElement = document.querySelector(".current-operand");

const cal=new calculator(previousOperandTextElement,currentOperandTextElement);
numberButtons.forEach((button)=>{
    button.addEventListener('click',(e)=>{
        //console.log(e.target)
        cal.appendNumber(e.target.innerText);
        cal.updateDisplay();

    })
});

operationButtons.forEach((button)=>{
    button.addEventListener('click',()=>{
       // console.log(e.target)
        cal.chooseOperation(button.innerText);
        cal.updateDisplay();

    })
});

equalsButton.addEventListener('click',(btn)=>{
    cal.compute();
    cal.updateDisplay();
})

allClearButton.addEventListener('click',()=>{
    cal.clear();
    cal.updateDisplay();
})

deleteButton.addEventListener('click',()=>{
    cal.delete();
    cal.updateDisplay();
})


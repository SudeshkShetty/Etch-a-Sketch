//grab the html elements
const mainContainer = document.querySelector('.mainContainer');
const userInput = document.querySelector('.userInput');
const userInputVarBlack = document.querySelector('.userInputVarBlack');
const userRandomColor = document.querySelector('.userRandomColor');
const userInputAny = document.querySelector('.userInputAny');
const clearButton = document.querySelector('.clearButton');
const blackColor = document.querySelector('.blackColor');
const anyColor = document.querySelector('.anyColor');
//crate a input element to receive the color value from user
const inputColor = document.createElement('input');
//initilize the grid size i.e horizontal grid '20' and vertical grid '20' elements
let numberGrid = 20;
//intialize black color as the default user choice 
//use the variable to get the user choice for different button choice
let colorValue = 'blackColor';
//use black as the default color when the user presses the input color box 
//but does not select any color
let userChoiceColorValue = '#000000';
/*add eventlistener to prevent the mouse from dragging the div element in the grid
e.preventDefault function prevents the drag event from continuing further.
Problem caused if the below line is omitted is when the mouse drag starts 
the background color change of grid element stops*/
document.body.addEventListener('dragstart',(e) => {e.preventDefault();});
//say user clicked BlackColor button then the var colorvalue is changed to blackcolor
blackColor.addEventListener('click',() => {colorValue='blackColor';});
//say user clicked UserChoice button and did not select any particular color then default color is black
//getColorchoice updates the userColorChoice variable if the user select the color from the color box
userInputAny.addEventListener('click',() => {getColorChoice();colorValue='userInputColor';});
userInputVarBlack.addEventListener('click',() => {colorValue='varShadeBlack';});
userRandomColor.addEventListener('click',() => {colorValue='randomColor';});


//clear the grid from any color and refresh the page with default value
clearButton.addEventListener('click',() => {
    colorValue = 'blackColor';
    mainContainer.replaceChildren(); 
    //call function to recreate the grid from scratch
    createGrid();
    //compare if colorValue i.e (it contains the user choice 'userInputColor' or 'blackColor' or 'varShadeBlack' or 'randomColor')
    //anyColor is a div element the removechild removes colorbox from the page 
    if(colorValue !== 'userInputColor'&&anyColor.childElementCount > 1){
        anyColor.removeChild(inputColor);
    }
})


//get usercolor choice and store it in userChoiceColor value
function getColorChoice(){
    inputColor.classList.add('inputColor');
    inputColor.setAttribute('type','color');
    anyColor.insertBefore(inputColor,userInputAny);
    //prevent multible colorboxes appending to anycolor element and appearing in the screen
    if(anyColor.childElementCount > 2){
        anyColor.removeChild(inputColor);
    }
    //input event triggered when user selects the color value e.target.value contains hex color value
    inputColor.addEventListener('input',(e) => {userChoiceColorValue = e.target.value;});
 }
 

//declare the function to color the grid element according to user button choice 
function applyColor(e){
    //get the value in e.buttons (is equal to zero if mouse left button is not clicked)
    //prevents the change in background color if just the mouse is hovering over the grid and not clicked
    if(e.buttons === 0)return;
        //apply black color when no user has not selected any color explicitely
        //apply black color if user presses BlackColor button

    if(colorValue === 'blackColor'){
        this.style.backgroundColor = '#000000';
        //increment color intensity for each pass and get black color for tength pass
        //apply variableblackshades if user presses black shade button

    }else if( colorValue === 'varShadeBlack'){
        let num1 = null;
        let num2 = null;
        let num3 = null;
        //get the backgroung color of the grid element(initially the value is rgb(''))
        let num4 = this.style.backgroundColor;
        //use the string methods to get the r,g,b values and store it into the myArray
        let myArray = num4.slice(4,-1).split(',');
        //check num4 for first pass of the grid element(ie num4 is empty for first pass of the grid element) update the num1 num2 num3 value
        if(num4===''||num4===null){
            num1 = 250;
            num2 = 250;
            num3 = 250;
        }else{
            //reduce the rgb value for every next pass of the same elements
            //if the rgb values of the element reaches zero(ie after 10passes) then stop return from function
            if(myArray[0]==0||myArray[1]==0||myArray[2]==0) return;
            num1 = myArray[0]-25;
            num2 = myArray[1]-25;
            num3 = myArray[2]-25;
        }
        this.style.backgroundColor=`rgb(${num1},${num2},${num3})`;

        //apply the user preferred color
    }else if(colorValue === 'userInputColor'){
        this.style.backgroundColor = userChoiceColorValue;

        //apply random rgb color
    }else if(colorValue === 'randomColor'){
        const randomVar1 = Math.floor(Math.random()*256);
        const randomVar2 = Math.floor(Math.random()*256);
        const randomVar3 = Math.floor(Math.random()*256);
        this.style.backgroundColor = `rgb(${randomVar1},${randomVar2},${randomVar3})`;
    }
 }

 //listen for mouse click on every grid element and apply the color as per user choice
 //listen for mouse over the element to get the trace of color on the grid element
function eventListener(){
    const blockElements = document.querySelectorAll('.blockElement');
    blockElements.forEach(blockElement => {blockElement.addEventListener('mousedown',applyColor);});
    blockElements.forEach(blockElement => {blockElement.addEventListener('mouseover',applyColor);});
}

//create the grid using the css grid attribute
function createGrid(){
    //maincontainer has a css style of dislay:grid
    //below attribute specifies the number columns in the grid
    //the number column depend on user choice default being 20
    mainContainer.setAttribute('style',`grid-template-columns: repeat(${numberGrid},1fr);`);
    for(let i=0; i<(numberGrid*numberGrid); i++){
        const blockElement = document.createElement('div');
        blockElement.classList.add('blockElement');
        mainContainer.appendChild(blockElement);
    }
    eventListener();
}

//get the number of grid element row and colun wise from the user default being 20*20
function getGridNumber(){
    let tempVar = prompt('Enter the no of grid boxes in each side');
    //compare tempvar for null and empty string 
    //prompt returns null if user cancelled the prompt
    //prompt returns empty string if user has not entered the value but pressed ok
    if(tempVar === null || tempVar === ''){
        //reset the value to default 20 in edge cases
        tempVar = 20;
    }
    //prevent the user from entering values greater than 100
    if(tempVar > 100 || tempVar < 0 ) return;
    numberGrid = tempVar;
    //delete all the mainContainer elements when user enters the grid size
    //if below statement is omitted then the new grid will be appended to the previous grid 
    //to create new grid first remove all the previous children then create newgrid
    mainContainer.replaceChildren();
    createGrid();
    
 }

//listens for user input on grid size
userInput.addEventListener('click',getGridNumber);
//create the default initial grid 20*20
createGrid();

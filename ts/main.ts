// @ts-ignore: Ignoring issue with js-datepicker lack of intellisense
const picker = datepicker("#due-date");
picker.setMin(new Date()); // set to today's date

class ToDoItem{
    title:string;
    dueDate:Date;
    isCompleted:boolean;

}
window.onload = function (){
    let addItem = document.getElementById("add");
    addItem.onclick = main;

    loadSavedItems();
}

function loadSavedItems(){
    let itemArray = getToDoItems(); // read it from web storage

    for(let i = 0; i < itemArray.length; i++){
        let currItem = itemArray[i];
        displayToDoItem(currItem);
    }

}

function main(){
    if(isValid()){
        let item = getToDoItem();
        displayToDoItem(item);
        saveToDo(item);
    }
}

/**
 * Check form data is valid
 */
function isValid():boolean{
    return true;
}
/**
 * Get all input off form and wrap in a ToDoItem object
 */
function getToDoItem():ToDoItem{
    let myItem = new  ToDoItem();
    
    // get title
    let titleInput = getInput("title");
    myItem.title = titleInput.value;

    let dueDateInput = getInput("due-date");
    myItem.dueDate = new Date(dueDateInput.value);

    // get isCompleted
    let isCompleted = getInput("is-complete");
    myItem.isCompleted = isCompleted.checked;

    return myItem;
}

function getInput(id):HTMLInputElement{
    return <HTMLInputElement>document.getElementById(id);
}

/**
 * Display given ToDoItem on the webpage
 */
function displayToDoItem(item:ToDoItem):void{
    // ex. <h3>Record JS Lecture</h3>
    let itemText = document.createElement("h3");
    itemText.innerText = item.title;

    // ex. <p>June 1st 2020</p>
    let itemDate = document.createElement("p");
    //itemDate.innerText = item.dueDate.toDateString();
    let dueDate =  new Date(item.dueDate.toString())
    itemDate.innerText = dueDate.toDateString();

    // ex. <div class="todo completed"></div> or <div class="todo"></div>
    let itemDiv = document.createElement("div");

    itemDiv.onclick = markAsComplete;

    itemDiv.classList.add("todo");
    if(item.isCompleted){
        itemDiv.classList.add("completed");
    }

    /* This is what is being created programmatically 
        <div class="completed">
            <h3>Record JS Lecture</h3>
            <p>June 1st 2020</p>
        </div>
    */
    
    itemDiv.appendChild(itemText);
    itemDiv.appendChild(itemDate);

    if(item.isCompleted){
        let completedToDos = getInput("complete-items");
        completedToDos.appendChild(itemDiv);
    }
    else{
        let incompleteToDos = getInput("incomplete-items");
        incompleteToDos.appendChild(itemDiv);
    }
}
// this changed it from incomplete to completed
function markAsComplete(){
    let itemDiv = <HTMLDivElement>this;
    itemDiv.classList.add("completed");

    let completedItems = document.getElementById("complete-items")
    completedItems.appendChild(itemDiv);
}

// Task: Store ToDoItems in web stoage

function saveToDo(item:ToDoItem):void{
    //this in now an array
    let currItems = getToDoItems();
    if(currItems == null){ // No items found
        currItems = new Array();
    }
    currItems.push(item); // add the new item to the curr item list

    let currItemsString = JSON.stringify(currItems);
    localStorage.setItem(todokey, currItemsString);
    // // convert our ToDoItem to a string
    // let itemString = JSON.stringify(item);

    // // this takes a key and a value
    // // how to save the string
    // localStorage.setItem("todokey", itemString);
}

const todokey = "todo";

/**
 * Get stored ToDo items or return null if
 * none are found
 * @returns 
 */

function getToDoItems():ToDoItem[]{
    let itemString = localStorage.getItem("todokey");
    let item:ToDoItem[] = JSON.parse(itemString);
    return item; 
}

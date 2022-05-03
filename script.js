
const input = document.getElementById('task-input')
const list=document.getElementById('task-list');
const form = document.getElementById('form');
const todos= JSON.parse(localStorage.getItem("todosString"));
var addition = false;

if(todos){
    todos.forEach(todo=>addToDo(todo.text))
}

form.addEventListener("submit",(e)=>{
    addition = true;
    e.preventDefault();
    const task = input.value;
    if(task==='')showalert("Please add something!",'red');
    else addToDo(task);
})
function showalert(msg,bg){
    const div = document.createElement('div');
    div.className = `alert alert-${bg}`;
    div.appendChild(document.createTextNode(msg));
    const display = document.querySelector('.display');
    const form = document.querySelector('#form');
    display.insertBefore(div, form);
    // Make vanish after three seconds
    setTimeout(()=>document.querySelector('.alert').remove(), 3000)
}
function addToDo(task){
    let symbols = document.createElement('span')
    symbols.classList.add('symbol');
    let check = document.createElement('span')
    check.innerHTML = '<i class="fas fa-check"></i>';
    check.classList.add('complete');
    let deleteBtn = document.createElement('span')
    deleteBtn.classList.add('delete')
    deleteBtn.innerHTML='<i class="fas fa-ban"></i>';
    symbols.appendChild(check);
    symbols.appendChild(deleteBtn);

    let list_item = document.createElement('li');
    list_item.innerHTML = task;
    list_item.classList.add('list-item');
    list_item.classList.add('shadow-box')
    list_item.appendChild(symbols);
    list.appendChild(list_item);
    if(addition)showalert("Task added Successfully!",'green')
    input.value = '';
    LS();
    check.addEventListener("click",(e)=>{
        completed(e.target.parentElement,list_item);
    })
    deleteBtn.addEventListener("click",(e)=>{
        showalert("Task deleted Successfully!",'red');
        list_item.remove()
        LS();
    })
}
function completed(check,list_item){
    check.classList.add('hide');
    LS();
    showalert("Congrats on completing the task!",'green');
    list_item.classList.add('completed');
}
function LS(){
    const todoEls = document.querySelectorAll('li');
    const todos = [];

    todoEls.forEach((todo)=>{
        todos.push({
            text: todo.innerText,
            isCompleted : todo.classList.contains('completed'),
        })
    })

    localStorage.setItem("todosString",JSON.stringify(todos))
}

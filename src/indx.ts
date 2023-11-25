const todoValue = document.querySelector(".todo-value") as HTMLInputElement;
const addTodo = document.querySelector(".add-todo") as HTMLButtonElement;
const clearTodos = document.querySelector(".clear-todos") as HTMLButtonElement;
const todoList = document.querySelector(".todoList") as HTMLUListElement;

interface Todo {
    id: string;
    title: string;
    isComplete: boolean;
}
let todos: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]')

const handleSubmit = (event: Event) => {
    event.preventDefault();


    const newTodo: Todo = {
        id: crypto.randomUUID(),
        title: todoValue.value,
        isComplete: false,
    };
    if (todoValue.value === '') {
        alert('یک مقداری را وارد کنید')
    } else {

        addTodoToDom(newTodo);

        todoValue.value = "";
        todoValue.focus();
        todos.push(newTodo)
        saveTodoToLocal()
    }

};

const addTodoToDom = (todo: Todo) => {
    todoList.innerHTML += `
    <li onclick="removeToDo('${todo.id}')">
      ${todo.title}<span class="icon"
        ><i class="fas fa-trash"></i
      ></span>
    </li>
`
};
const saveTodoToLocal = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
    return true
}
const removeToDo = (todoID: string) => {
    todos = todos.filter(todo => todo.id !== todoID)
    saveTodoToLocal()
    todoList.innerHTML=''
    todos.forEach((todo) => addTodoToDom(todo))

}
clearTodos.addEventListener('click',()=>{
    todos=[]
    saveTodoToLocal()
    todoList.innerHTML=''
})

addTodo.addEventListener("click", (event) => handleSubmit(event));
window.addEventListener('DOMContentLoaded', () => todos.forEach((todo) => addTodoToDom(todo)));
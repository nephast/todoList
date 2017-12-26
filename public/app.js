$(document).ready(function() {
$.getJSON('/api/todos')
.then(addTodos)
.catch(e => console.log(e))

$('#todoInput').keypress(function(event) {
    if(event.which == 13) {
        createTodo();
    }
})
});

function addTodos(todos) {
    todos.forEach(todo => addTodo(todo))
}

function addTodo(todo) {
    let newTodo = $('<li class="task">' + todo.name + '</li>')
    if(todo.completed){
        newTodo.addClass('done');
    }
    $('.list').append(newTodo);
}

function createTodo() {
    let userInput = $('#todoInput').val();
    $.post('api/todos', {name: userInput})
    .then(newTodo => {
        $('#todoInput').val('')
        addTodo(newTodo)})
    .catch(e => console.log(e))
}

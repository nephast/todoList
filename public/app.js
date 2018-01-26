$(document).ready(function() {
$.getJSON('/api/todos')
.then(addTodos)
.catch(e => console.log(e))

$('#todoInput').keypress(function(event) {
    if(event.which == 13) {
        createTodo();
    }
})

$('.list').on('click', 'span', function(e) {
    e.stopPropagation();
    removeTodo($(this).parent());
})

$('.list').on('click', 'li', function() {
    updateTodo($(this));
})
});

function addTodos(todos) {
    todos.forEach(todo => addTodo(todo))
}

function addTodo(todo) {
    let newTodo = $('<li class="task">' + todo.name + '<span>X</span></li>')
    newTodo.data('id', todo._id);
    newTodo.data('completed', todo.completed);
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

function removeTodo(todo) {
    let clickedId = todo.data('id');
    let deleteUrl = 'api/todos/' + clickedId;
    $.ajax({
        method: 'DELETE',
        url: deleteUrl
    })
    .then(() => todo.remove())
    .catch(e => console.log(e))
}

function updateTodo(todo) {
    let clickedId = todo.data('id');
    let updateUrl = 'api/todos/' + clickedId;
    let isDone = !todo.data('completed');
    let updateData = {completed: isDone};
    $.ajax({
        method: 'PUT',
        url: updateUrl,
        data: updateData
    })
    .then(updatedTodo => {
        todo.toggleClass('done');
        todo.data('completed', isDone);
    })
}

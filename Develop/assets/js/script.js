// Retrieve tasks and nextId from localStorage

let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    const uuid = crypto.randomUUID();
    return uuid
}

// Todo: create a function to create a task card
// function createTaskCard(task) {
//     const taskCard =
//         $div = $
//         $('<div />').appendTo('body').addClass("taskBoard");
//         $( ".taskBoard" ).append("#taskTitle");
//         $( ".taskBoard" ).append("#taskDescription");
//         $( ".taskBoard" ).append("#taskDeadline");
//         $( ".taskBoard" ).append("<button>Delete</button>").addClass("deleteBtn")
//     }


//appendchild


// Todo: create a function to render the task list and make cards draggable
//function renderTaskList() {
  //  $('#todo-cards').append(taskCard)
//}

//$(function() {
   // $('.task-card').draggable({

    //});
//});
//apendchild
//.draggable


// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault()


let taskTitle = $(this).siblings("#taskTitle").val()
let taskDescription = $(this).siblings("#taskDescription").val()
let taskDeadline = $(this).siblings("#taskDeadline").val()

let taskList = JSON.parse(localStorage.getItem("tasks")) || [];



let task = {
    taskTitle:taskTitle,
    taskDescription:taskDescription,
    taskDeadline:taskDeadline,
    taskID:generateTaskId()
}

taskList.push(task)

localStorage.setItem('tasks',JSON.stringify(taskList))
}  

// Todo: create a function to handle deleting a task
//function handleDeleteTask(event){
//$('.deleteBtn').last().on('click', function() {
 //       $(this).closest('.taskCard').remove();
  //  });
//}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
$('#addTaskBtn').click(function() {
    $('#taskModal').show();
});
$('.close').click(function() {
    $('#taskModal').hide();
});
})

$(".saveTask").on('click', handleAddTask)
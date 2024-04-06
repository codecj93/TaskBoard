// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));


// Todo: create a function to generate a unique task id
function generateTaskId() {
  const uuid = crypto.randomUUID();
  return uuid
}

// Todo: create a function to create a task card
function createTaskcard(task) {


  const taskCard = $('<div>')
    .addClass('card project-card draggable my-3')
    .attr('data-project-id', task.id);
  const cardHeader = $('<div>').addClass('card-header h4').text(task.title);
  const cardBody = $('<div>').addClass('card-body');
  const cardDescription = $('<p>').addClass('card-text').text(task.description);
  const cardDueDate = $('<p>').addClass('card-text').text(task.deadline);
  const cardDeleteBtn = $('<button>')
    .addClass('btn btn-danger delete')
    .text('Delete')
    .attr('id',task.id)
  cardDeleteBtn.on('click', handleDeleteTask);
  cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
  taskCard.append(cardHeader, cardBody);
  $('#todo-cards').append(taskCard)
}



// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  $('#todo-cards').empty()
  let taskList = JSON.parse(localStorage.getItem("tasks"))
  for (let index = 0; index < taskList.length; index++) {
    const task = taskList[index];
    createTaskcard(task)
  }
  $('.draggable').draggable({
    opacity: 0.7,
    zIndex: 100,
    
    helper: function (e) {
      
      const original = $(e.target).hasClass('ui-draggable')
        ? $(e.target)
        : $(e.target).closest('.ui-draggable');
      
      return original.clone().css({
        width: original.outerWidth(),
      });
    },
  });

}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault()


  let taskTitle = $(this).siblings("#taskTitle").val()
  let taskDescription = $(this).siblings("#taskDescription").val()
  let taskDeadline = $(this).siblings("#taskDeadline").val()

  let taskList = JSON.parse(localStorage.getItem("tasks")) || [];



  let task = {
    title: taskTitle,
    description: taskDescription,
    deadline: taskDeadline,
    id: generateTaskId()
  }

  taskList.push(task)

  localStorage.setItem('tasks', JSON.stringify(taskList))
  renderTaskList()
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
  console.log('delete')
    const deleteBtn = $(event.target)
    console.log(deleteBtn.attr('id'))
    let taskList = JSON.parse(localStorage.getItem("tasks"))
    const result = taskList.filter((task) => task.id !== deleteBtn.attr('id'));
    console.log(result)
    localStorage.setItem('tasks', JSON.stringify(result))
    renderTaskList()
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    // ? Read projects from localStorage
    const tasks = readTasksFromStorage();
  
    // ? Get the project id from the event
    const taskId = ui.draggable[0].task.id;
  
    // ? Get the id of the lane that the card was dropped into
    const newStatus = event.target.id;
  
    for (let task of tasks) {
      // ? Find the project card by the `id` and update the project status.
      if (task.id === taskId) {
        task.status = newStatus;
      }
    }
    // ? Save the updated projects array to localStorage (overwritting the previous one) and render the new project data to the screen.
    localStorage.setItem('tasks', JSON.stringify(taskList));
    renderTaskList();
    

    
  };
  



// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  renderTaskList()
  $('#addTaskBtn').click(function () {
    $('#taskModal').show();
  });
  $('.close').click(function () {
    $('#taskModal').hide();
  });
  $('.lane').droppable({
    accept: '.draggable',
    drop: handleDrop,
  });


})

$(".saveTask").on('click', handleAddTask)
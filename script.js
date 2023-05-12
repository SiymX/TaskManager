document.getElementById('task-form').addEventListener('submit', function(e) {
    e.preventDefault();

    var title = document.getElementById('title').value;
    var description = document.getElementById('description').value;
    var dueDate = document.getElementById('dueDate').value;
    var editIndex = document.getElementById('editIndex').value;
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    if (editIndex !== "") {
        
        tasks[editIndex] = {
            title: title,
            description: description,
            dueDate: dueDate,
            isComplete: false,
        };
        document.getElementById('taskButton').textContent = 'Add Task'; 
    } else {
        
        tasks.push({
            title: title,
            description: description,
            dueDate: dueDate,
            isComplete: false,
        });
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));

    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('dueDate').value = '';
    document.getElementById('editIndex').value = '';

    loadTasks();
});

        



document.getElementById('sort-by').addEventListener('change', function() {
    loadTasks(); 
});

document.getElementById('filter-by').addEventListener('change', function() {
    loadTasks(); 
});



function loadTasks() {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    var sortBy = document.getElementById('sort-by').value;
    var filterBy = document.getElementById('filter-by').value;
    var sortedTasks = [...tasks]; 
    var filteredTasks = [...tasks]; 
    var taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
  
 
    sortedTasks.sort(function(a, b) {
      if (sortBy === 'due-date') {
        return new Date(a.dueDate) - new Date(b.dueDate);
      } else if (sortBy === 'priority') {
        
      }
      
      return 0;
    });
  
    
    if (filterBy === 'completed') {
      filteredTasks = filteredTasks.filter(function(task) {
        return task.isComplete;
      });
    } else if (filterBy === 'incomplete') {
      filteredTasks = filteredTasks.filter(function(task) {
        return !task.isComplete;
      });
    }
  
    
    var tasksToRender = sortedTasks.filter(function(task) {
      return filteredTasks.includes(task);
    });
  
    for (var i = 0; i < tasksToRender.length; i++) {
      var task = tasksToRender[i];
      var div = document.createElement('div');
      div.classList.add('task');
      div.innerHTML = `
        <div class="title">${task.title}</div>
        <div class="description">${task.description}</div>
        <div class="dueDate">${task.dueDate}</div>
        <div class="buttons">
          <button onclick="editTask(${tasks.indexOf(task)})">&#9998;</button>
          <button onclick="deleteTask(${tasks.indexOf(task)})">Delete</button>
          <button onclick="toggleComplete(${tasks.indexOf(task)})">${task.isComplete ? 'Incomplete' : 'Complete'}</button>
        </div>
      `;
  
      
      if (task.isComplete) {
        div.classList.add('complete');
      } else {
        div.classList.add('incomplete');
      }
  
      taskList.appendChild(div);
    }
  
    
    var currentDate = new Date();
    var upcomingTasks = tasks.filter(function(task) {
      var dueDate = new Date(task.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      currentDate.setHours(0, 0, 0, 0);
      return !task.isComplete && dueDate.getTime() === currentDate.getTime();
    });
    
  
    
    var notificationCount = upcomingTasks.length;
    var notificationCountElement = document.getElementById('notification-count');
    notificationCountElement.textContent = notificationCount;
  }
  




function toggleComplete(index) {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks[index].isComplete = !tasks[index].isComplete;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}




function editTask(index) {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    var taskToEdit = tasks[index];

    document.getElementById('title').value = taskToEdit.title;
    document.getElementById('description').value = taskToEdit.description;
    document.getElementById('dueDate').value = taskToEdit.dueDate;
    document.getElementById('editIndex').value = index;
    document.getElementById('taskButton').textContent = 'Update current task';
}

function deleteTask(index) {
  var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  var taskElements = document.querySelectorAll('.task');
  var taskToDelete = taskElements[index];

  var deleteButton = taskToDelete.querySelectorAll('button')[1];
  deleteButton.classList.add('deleting'); 

 
  taskToDelete.classList.add('deleting');

  setTimeout(() => {
      tasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      loadTasks();
  }, 1000); 
}




document.getElementById('taskButton').textContent = 'Add Task';
loadTasks();

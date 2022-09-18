const dom = {
  new: document.getElementById('newTask'),
  add: document.getElementById('addTask'),
  tasks: document.getElementById('taskList'),
  count: document.getElementById('count')
}
const tasks = []

// Отслеживаем клик по кнопке "Добавить задачу"

dom.add.onclick = () => {
  const newTaskText = dom.new.value;
  if(newTaskText && isNotHaveTask(newTaskText, tasks)) {
    addTask(newTaskText, tasks)
    dom.new.value = ''
    tasksRender(tasks)
  }
}

// Функция добавления задачи 

function addTask(text, list) {
  const timestamp = Date.now()
  const task = {
    id: timestamp,
    text,
    isComplete: false
  }
    list.push(task)
}

// Проверка существования задачи в массиве

function isNotHaveTask(text, list) {
  let isNotHave = true
  list.forEach((task) => {
    if(task.text == text) {
      alert('Задача уже есть')
      isNotHave = false
    }
  })
  return isNotHave
}

// Функция генерации HTML задачи

function tasksRender(list) {
  let htmlList = ''

  list.forEach((task) => {
    const classActive = task.isComplete ? 'task-item active' : 'task-item'
    const checked = task.isComplete ? 'checked' : ''
    const taskHtml = `
      <li id="${task.id}" class="${classActive}">
        <label>
          <input class="checkbox-input" type="checkbox" ${checked}>
          <div class="checkbox">
            <svg class="icon">
              <use xlink:href="sprite.svg#checkbox"></use>
            </svg>
          </div>
        </label>
        <p class="task">
          ${task.text}
        </p>
        <button class="task__delete">
          <svg class="icon delete">
            <use xlink:href="sprite.svg#delete"></use>
          </svg>
        </button>
      </li>
    `
    htmlList = htmlList + taskHtml
  })
  dom.tasks.innerHTML = htmlList

  countTask(list)
}

dom.tasks.onclick = (event) => {
  const target = event.target
  const isCheckboxEl = target.classList.contains('checkbox')
  const isDeleteEl = target.classList.contains('task__delete')

  if(isCheckboxEl){
    const task = target.parentElement.parentElement
    const taskId = task.getAttribute('id')
    changeTaskStatus(taskId, tasks)
    tasksRender(tasks)
  }
  if(isDeleteEl){
    const task = target.parentElement
    const taskId = task.getAttribute('id')
    deleteTask(taskId, tasks)
    tasksRender(tasks)
  }
}

// Функция изменения статуса задачи

function changeTaskStatus(id, list){
  list.forEach((task) => {
    if(task.id == id){
      task.isComplete = !task.isComplete
    }
  })
}

// Функция удаления задачи

function deleteTask(id, list) {
  list.forEach((task, ind) => {
    if(task.id == id){
      list.splice(ind, 1)
    }
  })
}

// Счетчик количества задач

function countTask(list){
  dom.count.innerHTML = list.length
}

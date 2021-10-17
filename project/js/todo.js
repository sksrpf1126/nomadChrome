const toDoForm = document.querySelector('#todo-form')
const toDoInput = document.querySelector('#todo-form input')
const toDoList = document.querySelector('#todo-list')

const TODOS_KEY = 'toDos'
let toDos = []

//localStorage는 그냥 값을 넘기면, 타입이 array는 object든 string으로 저장. 그래서 아래와 방법으로 배열을 string으로 바꾸어주면
// '["3232","232","23"]' 배열의 값을 문자열로 저장함. 이걸 이제 JSON.parse를 통해 사용할 때 다시 배열(객체화)시킬 꺼임.
function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos))
}

/*
 *  todos를 지울 때 li와 localStorage 둘 다 지워야함.
 *  사용자가 지우고자하는 버튼의 부모인 li를 찾아 지움으로써, li는 잘 지울 수 있지만, localStorage의 경우에는 값이 중복으로 들어가기
 *  때문에 객체형태로 id를 저장하여, li에 id값을 주고, 그 id값과 localStorage의 id값을 비교하여, 그 값만 filter하는 방식
 *  지우고 나서, saveToDos()를 해주어야, 제대로 적용
 */
function deleteToDo(e) {
  const li = e.target.parentElement
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id))
  li.remove()
  saveToDos()
}

function paintToDo(newTodo) {
  const li = document.createElement('li')
  li.id = newTodo.id
  const span = document.createElement('span')
  span.innerText = newTodo.text
  const button = document.createElement('button')
  button.innerText = '❌' //윈도우 + . 키로 이모지 추가
  button.addEventListener('click', deleteToDo)
  li.appendChild(span)
  li.appendChild(button)
  toDoList.appendChild(li)
}

function handleToDoSubmit(event) {
  event.preventDefault()
  const newTodo = toDoInput.value
  toDoInput.value = ''
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  }
  toDos.push(newTodoObj)
  paintToDo(newTodoObj)
  saveToDos()
}

toDoForm.addEventListener('submit', handleToDoSubmit)

const savedToDos = localStorage.getItem(TODOS_KEY)

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos)
  toDos = parsedToDos
  parsedToDos.forEach(paintToDo)
}

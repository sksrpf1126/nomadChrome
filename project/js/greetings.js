// 주석처리가 된 것들은 부족한 부분, 새로운 방법에 대한 것, 보충 설명임

//로그인 폼의 자식들을 찾는 방법 1
// const loginForm = document.querySelector('#login-form')
// const loginInput = loginForm.querySelector('input')
// const loginButton = loginForm.querySelector('button')

const loginForm = document.querySelector('#login-form')
//로그인 폼의 자식들을 찾는 방법 2 (더 간단)
const loginInput = document.querySelector('#login-form input')
//const loginButton = document.querySelector('#login-form button') form태그를 이용하면서 필요 없어짐
const greeting = document.querySelector('#greeting')
const HIDDEN_CLASSNAME = 'hidden' // hidden을 반복적으로 사용하므로, 유지보수를 위하여 변수 선언
const USERNAME_KEY = 'userName'

//loginButton.addEventListener('click', onLoginBtnClick)
function onLoginBtnClick() {
  const userName = loginInput.value
  // 아래의 방법으로도 유효성 검사를 실시할 수 있지만, html input 속성 중 required(필수 입력) maxlength(글자 제한)으로 검사 가능.
  // 단, input의 위 속성들을 쓰기 위해서는 form 태그안에 존재해야함 하지만 form태그에서 버튼을 누르거나 type이 submit인 input을 누르면 제출되면서 새로고침이 일어남.
  // if (userName === '') {
  //   alert('이름을 입력해 주세요.')
  // } else if (userName.length > 15) {
  //   alert('이름이 너무 깁니다.')
  // }
}

//엔터를 누르거나 submit속성의 input태그나, button을 눌를 때 동작
function onLoginSubmit(event) {
  event.preventDefault() //기본동작 제거(submit 이후 새로고침 되는 동작 포함)
  loginForm.classList.add(HIDDEN_CLASSNAME)
  const userName = loginInput.value
  localStorage.setItem(USERNAME_KEY, userName)
  paintGreetings(userName)
}

const paintGreetings = (userName) => {
  greeting.innerText = `Hello ${userName}`
  greeting.classList.remove(HIDDEN_CLASSNAME)
}

const savedUserName = localStorage.getItem(USERNAME_KEY)

if (savedUserName === null) {
  //show the form
  loginForm.classList.remove(HIDDEN_CLASSNAME)
  loginForm.addEventListener('submit', onLoginSubmit)
} else {
  //show the greeting
  paintGreetings(savedUserName)
}

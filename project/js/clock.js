const clock = document.querySelector('#clock')

function getClock() {
  const date = new Date()
  const hours = String(date.getHours()).padStart(2, '0') //string.padStart("만들 문자열길이", "앞의string의 길이가 만들 문자열길이보다 작을 경우에 추가할 문자열")
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  clock.innerText = `${hours}:${minutes}:${seconds}`
}

getClock() // 웹사이트 로딩 되자마자, 우선 한번 실행
//setTimeout은 일정시간 이후에 실행, setInterval은 일정 간격을 두고, 계속 실행
setInterval(getClock, 1000)

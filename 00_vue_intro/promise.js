// 외부에 요청을 보내서 결과를 출력하는 코드 작성
// 1. 몇초 뒤에 데이터가 응답되면
// 2. 데이터를 변수에 저장하여 출력!

function getData() {
  let data

  setTimeout(() => {
    console.log('요청보내무')
    data = {'data': 'somedata'}
  }, 100);

  return data
}

function printData() {
  let response1 = getData()
  console.log(response1)
}

printData()

function getDataCallback(callback) {  // 2. callback 으로 함수가 넘어옴. 즉, callback = 저 익명함수
  setTimeout(() => {
    console.log('요청보내무니다')
    const data = {'data': 'somedata'}
    callback(data)  // 3. 다 끝나고 저 함수를 실행
  }, 100);
}

// 1. 출력하는 작업을 하는 함수를 인자로 넘김
getDataCallback(function(data) {
  console.log(data)
})

function getDataPromise() { // === axios.get(DATA_URL)
  // 얘는 반환부터 하고 시작한다. 하는 일은 그저 return 뿐. 다짐을 만들어서 반환한다.
  // new를 쓰는 이유는 새로운 instance를 생성해서 반환하고 싶기 때문이다.
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('요청보냄보냄')
      const data = {'data': 'somedata'}
      resolve(data) // .then 으로 꺼낼 수 있는 객체
    }, 100);
  })
}

getDataPromise()
  .then(response => {
    console.log(response)
  })
// console.log(getDataPromise())

// 이게 바로 어신크 어웨이트
const handleData = async function() {
  const response = await getDataPromise()
  console.log(response)
  // getDataPromise().then(response => {
  //   console.log(response)
  //   // 이후 작업
  // })
}

handleData()
# ToDoList

- Node.js (express)
- React.js
- MongoDB ([MLab](https://mlab.com/))

## [react-app](./react-app) (creat-react-app)

- 이동
  ```
  $ cd <ToDoList PATH>/react-app
  ```

- 의존성 설치
  ```
  $ npm install
  ```

- 빌드
  ```
  $ npm run build
  ```

- 복사
  ```
  $ cp -r ./build/ ../express/public/
  ```

## [express](./express) [![Build Status](https://travis-ci.org/bum752/Oh-My-App.svg)](https://travis-ci.org/bum752/Oh-My-App)

- 이동
  ```
  $ cd <ToDoList PATH>/express
  ```

- 의존성 설치
  ```
  $ npm install
  ```

- 설정
  ```
  $ cp config.default.json config.json
  ```
  - 필요에 따라 설정을 수정해야 합니다.

- 테스트
  ```
  $ npm test ./test/mongo.js # mongoose
  $ npm test ./test/api.js # api

  $ npm test
  ```

- 어플리케이션 실행
  ```
  $ npm start
  ```
  - port
    - 3001 (default)

> 이 과정을 완료하셨나요? [로컬 서버](http://localhost:3001/) 또는 [AWS EC2 Instance](#)에 접속해보세요.

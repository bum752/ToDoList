# ToDoList

[여기](http://ec2-13-209-73-62.ap-northeast-2.compute.amazonaws.com/)에서 사용해보세요!

![image](https://user-images.githubusercontent.com/20104232/47961250-8518d900-e04a-11e8-94b7-5f6ed160e7cb.png)

- Node.js 8 (express)
- React.js (create-react-app v1.5.2)
- **(!주의) MongoDB** ([MLab](https://mlab.com/))
  - 아래 방법으로 실행할 경우 localhost:27017 mongodb의 todolist 컬렉션을 사용합니다.
    - 변경을 원하시면 `<ToDoList>/express/config.json` 을 수정해주세요.
  - 데모 페이지는 MLab을 이용하고 있습니다.
- AWS EC2
- nginx

```
$ git clone https://github.com/bum752/ToDoList
```

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
  $ cp -r ./build/* ../express/public/
  ```

## [express](./express) [![Build Status](https://travis-ci.org/bum752/ToDoList.svg)](https://travis-ci.org/bum752/ToDoList)

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
  $ npm test
  ```

- 어플리케이션 실행
  ```
  $ npm start
  ```
  - port
    - 3001 (default)

## 실행

> 위의 과정을 완료하셨나요? [로컬 서버](http://localhost:3001/) 또는 [AWS EC2 Instance](http://ec2-13-209-73-62.ap-northeast-2.compute.amazonaws.com/)에 접속해보세요.

- [로컬 서버](http://localhost:3001/)
- [AWS EC2 Instance](http://ec2-13-209-73-62.ap-northeast-2.compute.amazonaws.com/)

## API Documentation

`/api-docs`에서 API 문서 열람은 물론 실행이 가능합니다!

- [로컬 서버](http://localhost:3001/api-docs)
- [AWS EC2 Instance](http://ec2-13-209-73-62.ap-northeast-2.compute.amazonaws.com/api-docs)

![image](https://user-images.githubusercontent.com/20104232/47980062-43029c80-e109-11e8-985b-c878ec1c85b1.png)

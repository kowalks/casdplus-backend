
# CASDplus - backend

This is the backend for CASDplus project. Authors
- Guilherme Kowalczuk ([@kowalks](https://github.com/kowalks))
- Yuri Gama ([@yuri-gama](https://github.com/yuri-gama/))


## Installation

Create and run docker container

```bash
  docker-compose up -d
```

Install backend with npm

```bash
  npm install
```

Run database migrations
```bash
  npm run migrate
  npm run seed
```

Start server in dev mode
```bash
  npm run dev
```


## API Reference

### Admin

#### Login

```http
  GET /admin/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username`| `string` | **Required**. The requested admin ID |
| `password`| `string` | **Required**. Password for admin | 


Returns 
- `400: Bad Request` if request doesn't contain specified parameters.
- `406: Not Acceptable` if username or password is incorrect.
- JSON containing session tokens if username and password match a valid admin.


#### Register Student

```http
  POST /admin/students
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `class_id`      | `integer` | **Required**. Which class the student belongs |
| `first_name`      | `string` | **Required**. Student's first name |
| `last_name`      | `string` | **Required**. Student's first name |
| `birthday`      | `date` | **Required**. Student's birthday |
| `email`      | `string` | **Required**. Login email for student's account |
| `password`      | `string` | **Required**. Password for student's account |

Returns 
- `406: Not Acceptable` If theres no valid class or the email is already used.
- JSON containing information for the created user.


## File Tree

```bash
.
├── docker-compose.yml
├── LICENSE
├── package.json
├── package-lock.json
├── README.md
└── src
    ├── config
    │   └── database.js
    ├── controllers
    │   ├── AdminController.js
    │   ├── ClassController.js
    │   ├── ExamController.js
    │   ├── MessageController.js
    │   └── StudentController.js
    ├── database
    │   ├── index.js
    │   ├── migrations
    │   └── seeders
    ├── middleware.js
    ├── models
    │   ├── Absence.js
    │   ├── Admin.js
    │   ├── AdminToken.js
    │   ├── Class.js
    │   ├── Event.js
    │   ├── Exam.js
    │   ├── message_class.js
    │   ├── Message.js
    │   ├── Question.js
    │   ├── student_exam.js
    │   ├── Student.js
    │   └── StudentToken.js
    ├── routes.js
    └── server.js
```

let users = [
    { 'username': 'admin@gmail.com', 'password': '0000', 'isAdmin': 1 },
    { 'username': 'demo@gmail.com', 'password': '1111', 'isAdmin': 1 },
    { 'username': 'client@gmail.com', 'password': '0000', 'isAdmin': 0 },
    { 'username': 'user@gmail.com', 'password': '1111', 'isAdmin': 0 },
    { 'username': 'user1@gmail.com', 'password': '1111', 'isAdmin': 0 },
    { 'username': 'user2@gmail.com', 'password': '1111', 'isAdmin': 0 },
    { 'username': 'user3@gmail.com', 'password': '1111', 'isAdmin': 0 },
    { 'username': 'user4@gmail.com', 'password': '1111', 'isAdmin': 0 },
    { 'username': 'user5@gmail.com', 'password': '1111', 'isAdmin': 0 },
    { 'username': 'user6@gmail.com', 'password': '1111', 'isAdmin': 0 },
];

let taskList = [
    { 'taskId': 1, 'status': 'new', 'taskName': 'GUI Change', 'taskDescription': 'CSS change and validation', 'taskAmount': 100, 'createdBy': 'admin@gmail.com', 'assignTo': 'user@gmail.com', 'startDate': '1-10-2023', 'endDate': '10-10-2023' },
    { 'taskId': 2, 'status': 'new', 'taskName': 'API Chnages', 'taskDescription': 'API validation', 'taskAmount': 30, 'createdBy': 'demo@gmail.com', 'assignTo': 'client@gmail.com', 'startDate': '15-10-2023', 'endDate': '20-10-2023' },
    { 'taskId': 3, 'status': 'new', 'taskName': 'API Chnages', 'taskDescription': 'API validation', 'taskAmount': 30, 'createdBy': 'admin@gmail.com', 'assignTo': 'client@gmail.com', 'startDate': '15-10-2023', 'endDate': '20-10-2023' },
    { 'taskId': 4, 'status': 'new', 'taskName': 'API Chnages', 'taskDescription': 'API validation', 'taskAmount': 30, 'createdBy': 'demo@gmail.com', 'assignTo': 'user3@gmail.com', 'startDate': '15-10-2023', 'endDate': '20-10-2023' },
]

let childTaskList = [
    {'childTaskId':1, 'parentTaskId':1,'subTaskName':'button Changes','subTaskDescription':'button loader', 'subTaskAmount':10,'createdBy':'user@gmail.com'},
    {'childTaskId':2, 'parentTaskId':2,'subTaskName':'API MOdel','subTaskDescription':'api model loader', 'subTaskAmount':30,'createdBy':'client@gmail.com'},
]

let URL = "file:///C:/Users/shingadiya%20ravi/Desktop/TFS/";
// let URL = "file:///D:/RShingadiya/TFS/";
localStorage.setItem('users', JSON.stringify(users));
localStorage.setItem('url', URL);
// localStorage.setItem('taskList', JSON.stringify(taskList));

function onLoad() {
    sessionStorage.removeItem('user');
    let parent = JSON.parse(sessionStorage.getItem('tempParentTask'));
    let child = JSON.parse(sessionStorage.getItem('tempChildTask'));
    if((parent != undefined || parent != null) && (child != undefined || child != null) ){
        localStorage.setItem('taskList',JSON.stringify(parent));
        localStorage.setItem('childTaskList',JSON.stringify(child));

    }else{
        localStorage.setItem('taskList',JSON.stringify(taskList));
        localStorage.setItem('childTaskList',JSON.stringify(childTaskList));
    }
    
}

function login(a, b) {

    let data = users.map(element => {
        if (element.username == a.value && element.password == b.value) {
            sessionStorage.setItem('user', JSON.stringify(element));
            return true;
        } else {
            return false;
        }
    });

    if (!data.includes(true)) {
        alert("Invalid Username Or Password");
        window.location.href = URL + "login.html";
    } else {
        let user = JSON.parse(sessionStorage.getItem('user'))
        if (user.isAdmin) {
            window.location.href = URL + "adminDashboard.html";
        } else {
            window.location.href = URL + "clientDashboard.html";
        }
    }
}

function logout() {
    sessionStorage.removeItem('user');
    let parent = JSON.parse(localStorage.getItem('taskList'));
    sessionStorage.setItem('tempParentTask',JSON.stringify(parent));
    let child = JSON.parse(localStorage.getItem('childTaskList'));
    sessionStorage.setItem('tempChildTask',JSON.stringify(child));

    
    window.location.href = URL + "login.html";
}


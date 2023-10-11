let userInformation = JSON.parse(sessionStorage.getItem('user'));


function checkAccess() {
    let data = JSON.parse(sessionStorage.getItem('user'));
    if (data?.isAdmin != 1 || data == null) {
        window.location.href = localStorage.getItem('url') + 'login.html';
    } else {
        document.getElementById('username').innerHTML = userInformation.username;
        getTaskList(userInformation.username);
    }
}

function getTaskList(username) {
    let data = JSON.parse(localStorage.getItem('taskList'));
    let temp = data.map(x => {
        if (x.createdBy == username) {
            return x;
        }
    });

    let parent = document.getElementById('addItem');
    temp.forEach(element => {
        if (element != undefined) {
            let row = parent.insertRow(1);
            row.insertCell(0).innerHTML = element.taskId;
            row.insertCell(1).innerHTML = element.status;
            row.insertCell(2).innerHTML = element.taskName;
            row.insertCell(3).innerHTML = element.taskDescription;
            row.insertCell(4).innerHTML = element.taskAmount + '$';
            row.insertCell(5).innerHTML = element.assignTo;
            row.insertCell(6).innerHTML = element.startDate;
            row.insertCell(7).innerHTML = element.endDate;
        }
    });
    clientUsers();
}

function clientUsers() {
    let allUsers = JSON.parse(localStorage.getItem('users'))
    let clientUsers = allUsers.map(x => {
        if (!x.isAdmin) {
            return x.username;
        }
    });

    clientUsers.forEach(element => {
        if (element != undefined) {
            const clientList = document.getElementById("assignTo");
            clientList.options[clientList.options.length] = new Option(element, element);
        }
    });
    return clientUsers;
}


function createTask() {
    let taskList = JSON.parse(localStorage.getItem('taskList'));
    let object = {
        'taskId': taskList.length + 1,
        'status': 'new',
        'taskName': document.getElementById('taskName').value,
        'taskDescription': document.getElementById('taskDescription').value,
        'taskAmount': document.getElementById('taskAmount').value,
        'createdBy': userInformation.username,
        'assignTo': document.getElementById('assignTo').value,
        'startDate': document.getElementById('startDate').value,
        'endDate': document.getElementById('endDate').value
    }

    if (object.taskName == null || object.taskName == undefined || object.taskName == '') {
        alert("Please fill the taskname");
        return;
    }
    if (object.taskDescription == null || object.taskDescription == undefined || object.taskDescription == '') {
        alert("Please fill the task Description");
        return;
    }
    if (object.taskAmount != null || object.taskAmount != undefined || object.taskAmount != '') {
        if (object.taskAmount < 0) {
            alert("Please fill the task Amount greater than 0");
            return;
        }
    }
    if (object.endDate != null || object.endDate != undefined || object.endDate != '') {
        let start = document.getElementById('startDate').value;
        let end = document.getElementById('endDate').value;
        if (start > end) {
            alert('Start date should be less than End date');
            return;
        }
    }


    let parent = document.getElementById('addItem');
    parent.innerHTML = ''
    let row = parent.insertRow(0);
    row.insertCell(0).innerHTML = 'taskId';
    row.insertCell(1).innerHTML = 'status';
    row.insertCell(2).innerHTML = 'taskName';
    row.insertCell(3).innerHTML = 'taskDescription';
    row.insertCell(4).innerHTML = 'taskAmount';
    row.insertCell(5).innerHTML = 'assignTo';
    row.insertCell(6).innerHTML = 'startDate';
    row.insertCell(7).innerHTML = 'endDate';

    taskList.push(object);
    localStorage.setItem('taskList', JSON.stringify(taskList));
    getTaskList(userInformation.username);

    openModal();
}

function openModal() {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    document.getElementById('startDate').value = `${year}-${month}-${day}`;
    document.getElementById('endDate').value = `${year}-${month}-${day + 15}`;
    document.getElementById('taskAmount').value = 0;
}




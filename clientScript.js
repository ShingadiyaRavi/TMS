let userInformation = JSON.parse(sessionStorage.getItem('user'));

function checkAccess() {
    let data = JSON.parse(sessionStorage.getItem('user'));
    if (data?.isAdmin != 0 || data == null) {
        window.location.href = localStorage.getItem('url') + 'login.html';
    }else{
        document.getElementById('username').innerHTML = userInformation.username;
        getParentTaskList(userInformation.username);
        getChildTaskList(userInformation.username);
    }
}

function getParentTaskList(username) {
    let data = JSON.parse(localStorage.getItem('taskList'));
    let temp = data.map(x => {
        if (x.assignTo == username) {
            return x;
        }
    });

    let parent = document.getElementById('parentTask');
    temp.forEach(element => {
        if (element != undefined) {
            let row = parent.insertRow(1);
            row.insertCell(0).innerHTML = element.taskId;
            row.insertCell(1).innerHTML = element.status;
            row.insertCell(2).innerHTML = element.taskName;
            row.insertCell(3).innerHTML = element.taskDescription;
            row.insertCell(4).innerHTML = element.taskAmount + '$';
            row.insertCell(5).innerHTML = element.startDate;
            row.insertCell(6).innerHTML = element.endDate;

            const parentTaskList = document.getElementById("parentTaskDropDown");
            parentTaskList.options[parentTaskList.options.length] = new Option(element.taskName, element.taskId);
        }
    });
}

function getChildTaskList(username) {
    let data = JSON.parse(localStorage.getItem('childTaskList'));
    let temp = data.map(x => {
        if (x.createdBy == username) {
            return x;
        }
    });

    let child = document.getElementById('childTask');
    temp.forEach(element => {
        if (element != undefined) {
            let row = child.insertRow(1);
            row.insertCell(0).innerHTML = element.childTaskId;
            row.insertCell(1).innerHTML = element.parentTaskId;
            row.insertCell(2).innerHTML = element.subTaskName;
            row.insertCell(3).innerHTML = element.subTaskDescription;
            row.insertCell(4).innerHTML = element.subTaskAmount + '$';
        }
    });
}


function createSubTask() {
    let childTaskList = JSON.parse(localStorage.getItem('childTaskList'));
    let parentTaskList = JSON.parse(localStorage.getItem('taskList'));
    let object = {
        'childTaskId': childTaskList.length + 1,
        'parentTaskId': document.getElementById('parentTaskDropDown').value,
        'subTaskName': document.getElementById('subTaskName').value,
        'subTaskDescription': document.getElementById('subTaskDescription').value,
        'subTaskAmount': document.getElementById('subTaskAmount').value,
        'createdBy': userInformation.username,
    }

    if (object.subTaskName == null || object.subTaskName == undefined || object.subTaskName == '') {
        alert("Please fill the taskname");
        return;
    }
    if (object.subTaskDescription == null || object.subTaskDescription == undefined || object.subTaskDescription == '') {
        alert("Please fill the task Description");
        return;
    }
    if (object.subTaskAmount != null || object.subTaskAmount != undefined || object.subTaskAmount != '') {
        let oldData = childTaskList.map(x=>{
            if(parseInt(x.parentTaskId) == parseInt(object.parentTaskId)){
                return x.subTaskAmount;
            }
        });
        let totalSum = 0;
        oldData.forEach(element => {
            if(element != undefined){
                totalSum+=parseInt(element);
            }
        });
        
        let actualAmount = 0;
        parentTaskList.map(x=>{
            if(x.taskId == object.parentTaskId){
                actualAmount = parseInt(x.taskAmount);
                x.taskAmount
            }
        });
        totalSum+= parseInt(object.subTaskAmount);

        if (parseInt(object.subTaskAmount) < 0) {
            alert("Please fill the task Amount greater than 0");
            return;
        }else if (!(totalSum <= actualAmount)){
            alert("Total Sub Task Amount Should Be Less Than or Equal to Parent Task Amount");
            return;
        }
    }

    let child = document.getElementById('childTask');
    child.innerHTML = ''
    let row = child.insertRow(0);
    row.insertCell(0).innerHTML = 'childTaskId';
    row.insertCell(1).innerHTML = 'parentTaskId';
    row.insertCell(2).innerHTML = 'subTaskName';
    row.insertCell(3).innerHTML = 'subTaskDescription';
    row.insertCell(4).innerHTML = 'subTaskAmount';

    childTaskList.push(object);
    localStorage.setItem('childTaskList', JSON.stringify(childTaskList));
    getParentTaskList(userInformation.username);
    getChildTaskList(userInformation.username);
}

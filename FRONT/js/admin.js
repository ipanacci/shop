const addUserButton = document.getElementById("userSubmit");
const addUserForm = document.getElementById("userForm");
const userListButton = document.getElementById("userList");
const getUserForm = document.getElementById("getByIdForm");
const getUserButton = document.getElementById("getByIdSubmit");
const userUpdateForm = document.getElementById("updateUserForm");
const userUpdateButton = document.getElementById("updateUserSubmit");
const userDeleteForm = document.getElementById("deleteUserForm");
const userDeleteButton = document.getElementById("deleteUserSubmit");

function handleUserAdd(e){
    e.preventDefault();
    // let formData = new FormData(addUserForm);
    // const data = new URLSearchParams();
    // for (const pair of formData) {
    //     data.append(pair[0], pair[1]);
    // }
    data = new URLSearchParams([
        ["firstname",  addUserForm.firstname.value],
        ["lastname", addUserForm.lastname.value],
        ["email", addUserForm.email.value],
        ["password", addUserForm.password.value]
    ]);
    fetch("http://localhost:3000/api/user", {
        method:'POST',
        mode: 'cors',
        body: data,
    })
    .then(result => result.json())
    .then(result => console.log(result));
}

function handleGetAllUsers(){
    fetch("http://localhost:3000/api/user",{
        method: 'GET',
        mode: 'cors'
    })
    .then(result => result.json())
    .then(result => console.log(result));
}

function handleGetUser(e){
    e.preventDefault();
    const id = getUserForm.userId.value;
    fetch(`http://localhost:3000/api/user/${id}`, {
        method: 'GET',
        mode: 'cors'
    })
    .then(result => result.json())
    .then(result => console.log(result));
}

function handleUpdateUser(e){
    e.preventDefault();
    const id = userUpdateForm.userId.value;
    // let formData = new FormData(userUpdateForm);
    // const data = new URLSearchParams();
    // for (const pair of formData) {
    //     if (pair[0] !== "userId") data.append(pair[0], pair[1]);
    // }
    data = new URLSearchParams([
        ["firstname",  userUpdateForm.firstname.value],
        ["lastname", userUpdateForm.lastname.value],
        ["password", userUpdateForm.password.value]
    ]);
    fetch(`http://localhost:3000/api/user/${id}`, {
        method: 'PUT',
        mode:'cors',
        body: data,
    })
    .then(result => result.json())
    .then(result => console.log(result));
}

function handleDeleteUser(e){
    e.preventDefault();
    const id = userDeleteForm.userId.value;
    fetch(`http://localhost:3000/api/user/${id}`, {
        method: 'DELETE',
        mode:'cors',
    })
    .then(result => result.json())
    .then(result => console.log(result));
}

addUserButton.addEventListener('click', handleUserAdd);
userListButton.addEventListener('click', handleGetAllUsers);
getUserButton.addEventListener('click', handleGetUser);
userUpdateButton.addEventListener('click', handleUpdateUser);
userDeleteButton.addEventListener('click', handleDeleteUser);
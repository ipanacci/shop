const connectionForm = document.querySelector("#connectionForm");
const connectionButton = document.querySelector("#connectionButton");

function handleConnection(e){
    e.preventDefault();
    data = new URLSearchParams([
        ["email", connectionForm.email.value],
        ["password", connectionForm.password.value]
    ]);
    console.log(data);
    fetch("http://localhost:3000/api/user/connection", {
        method: "POST",
        mode: 'cors',
        body: data,
        credentials: "include"
    })
    .then(result => console.log(result))
        // document.cookie = "connect.sid="+result;
        //return result.json();
    //.then(result => console.log(result));
}

connectionButton.addEventListener("click", handleConnection);
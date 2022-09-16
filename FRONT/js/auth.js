const connectionForm = document.querySelector("#connectionForm");
const connectionButton = document.querySelector("#connectionButton");

function handleConnection(e){
    e.preventDefault();
    let formData = new FormData(addUserForm);
    const data = new URLSearchParams();
    for (const pair of formData) {
        data.append(pair[0], pair[1]);
    }
    fetch("http://localhost:3000/api/user", {
        method: "POST",
        mode: 'cors',
        body: data
    })
    .then(result => result.json())
    .then(result => console.log(result));
}

connectionButton.addEventListener("click", handleConnection);
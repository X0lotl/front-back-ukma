const addNewUserButton = document.getElementById("addNewUserButton");
const table = document.getElementById("sortTable");

function sendEmailToUser(id){
  console.log("Email was sended");
}

addNewUserButton.addEventListener("click", () =>{
  const tBody = table.childNodes[3];

  const id = 1;
  const inputName = document.getElementById("newNameInput");
  const inputSurname = document.getElementById("newSurnameInput");
  const inputEmail = document.getElementById("newEmailInput");

  const inputs = [inputName, inputSurname, inputEmail];

  const newUser = document.createElement("tr");
  newUser.innerHTML = `<th>${id}</th>
                    <th>${inputName.value}</th>
                    <th>${inputSurname.value}</th>
                    <th>${inputEmail.value}</th>`;

  const newUserButtonsTh = document.createElement("th");
  newUser.appendChild(newUserButtonsTh);

  const newUserButtonsArray = [
    document.createElement("button"),
    document.createElement("button"),
    document.createElement("button")
  ];

  for (let button of newUserButtonsArray) {
    button.classList.add("btn");
    newUserButtonsTh.appendChild(button);
  }

  newUserButtonsArray[0].classList.add("btn-success");
  newUserButtonsArray[0].addEventListener("click", (id) => {

    sendEmailToUser(id);

  });
  newUserButtonsArray[0].innerHTML = '<i class="fa-regular fa-paper-plane">'

  newUserButtonsArray[1].classList.add("btn-warning")
  newUserButtonsArray[1].addEventListener(("click"), () => {

    console.log("Reduct this user");

  });
  newUserButtonsArray[1].innerHTML = '<i class="fa-solid fa-user-pen">';

  newUserButtonsArray[2].classList.add("btn-danger");
  newUserButtonsArray[2].addEventListener("click", () => {

    console.log("Delete this user");

  });
  newUserButtonsArray[2].innerHTML='<i class="fa-regular fa-trash-can"></i>';

  tBody.appendChild(newUser);

  console.log(newUser.childNodes);

  for (let input of inputs) {
    input.value = "";
  }
});
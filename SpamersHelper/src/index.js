const addNewUserButton = document.getElementById("addNewUserButton");
const table = document.getElementById("sortTable");
const Http = new XMLHttpRequest();

function sendEmailToUser(id){
  console.log("Email was sended");
}

function addNewUserFunction(id , name, surname, email) {

  const tBody = table.childNodes[3];

  const newUser = document.createElement("tr");
  newUser.innerHTML = `<th>${id}</th>
                    <th>${name}</th>
                    <th>${surname}</th>
                    <th>${email}</th>`;

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
}

addNewUserButton.addEventListener("click", () => {
  const id = 1;
  const inputName = document.getElementById("newNameInput");
  const inputSurname = document.getElementById("newSurnameInput");
  const inputEmail = document.getElementById("newEmailInput");

  const inputs = [inputName, inputSurname, inputEmail];

  addNewUserFunction(id, inputName.value, inputSurname.value, inputEmail.value);

  for (let input of inputs) {
    input.value = "";
  }
});

window.addEventListener('DOMContentLoaded', () => {

  axios.get('http://localhost:3000/emails')
    .then(res => {
      const responseData = res.data;
      for (let person of responseData) {
        console.log(person);
        addNewUserFunction(person.id, person.firstname, person.secondname, person.email);
      }
    })
    .catch(err => console.log(err));
})
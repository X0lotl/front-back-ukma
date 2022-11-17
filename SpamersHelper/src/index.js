const addNewUserButton = document.getElementById("addNewUserButton");
const table = document.getElementById("sortTable");

function sendEmailToUser(id, text) {
  axios({
    method: 'post',
    url: `http://localhost:3000/sendEmail?id=${id}`,
    data: {
      text: text
    }
  })
    .catch(err => console.log(err));
}

function addUserToDB(name, surname, email) {
  axios({
    method: 'post',
    url: 'http://localhost:3000/email',
    data: {
      "firstname": name,
      "secondname": surname,
      "email": email
    }
  })
    .catch(err => console.log(err));
}

function removeUserFromDB(id) {
  axios({
    method: "delete",
    url: `http://localhost:3000/email?id=${id}`
  })
    .catch(err => console.log(err));
}

function editUserInDB(id, name, surname, email) {
  axios({
    method: 'post',
    url: `http://localhost:3000/emails?id=${id}`,
    data: {
      "firstname": name,
      "secondname": surname,
      "email": email
    }
  })
    .catch(err => console.log(err));
}

function addNewUserFunction(id, name, surname, email) {

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
  newUserButtonsArray[0].addEventListener("click", () => {

    sendEmailToUser(id, "Test");

  });
  newUserButtonsArray[0].innerHTML = '<i class="fa-regular fa-paper-plane">'

  newUserButtonsArray[1].classList.add("btn-warning")
  newUserButtonsArray[1].addEventListener(("click"), () => {

    newUser.innerHTML = `<th>${id}</th>
                    <th><input value="${name}"></th>
                    <th><input value="${surname}"></th>
                    <th><input value="${email}"></th>
                    <th><button class="btn btn-success"><i class="fa-solid fa-user-pen"></button></th>`;

    const changeUserButton = newUser.childNodes[8].childNodes[0];

    const inputName = newUser.childNodes[2].childNodes[0]
    const inputSurname = newUser.childNodes[4].childNodes[0]
    const inputEmail = newUser.childNodes[6].childNodes[0]

    changeUserButton.addEventListener("click", () => {
      editUserInDB(id, inputName.value,  inputSurname.value, inputEmail.value)
      setTimeout(() => {
        document.location.reload();
      }, 50);

    });
  });
  newUserButtonsArray[1].innerHTML = '<i class="fa-solid fa-user-pen">';

  newUserButtonsArray[2].classList.add("btn-danger");
  newUserButtonsArray[2].addEventListener("click", () => {
    removeUserFromDB(id);
    setTimeout(() => {
      document.location.reload();
    }, 50)
  });
  newUserButtonsArray[2].innerHTML = '<i class="fa-regular fa-trash-can"></i>';

  tBody.appendChild(newUser);
}

addNewUserButton.addEventListener("click", () => {
  const inputName = document.getElementById("newNameInput");
  const inputSurname = document.getElementById("newSurnameInput");
  const inputEmail = document.getElementById("newEmailInput");

  addUserToDB(inputName.value, inputSurname.value, inputEmail.value);
  const inputs = [inputName, inputSurname, inputEmail];

  //addNewUserFunction(id, inputName.value, inputSurname.value, inputEmail.value);

  for (let input of inputs) {
    input.value = "";
  }

  setTimeout(() => {
    document.location.reload();
  }, 50);
});

window.addEventListener('DOMContentLoaded', () => {

  axios.get('http://localhost:3000/emails')
    .then(res => {
      const responseData = res.data;
      for (let person of responseData) {
        addNewUserFunction(person.id, person.firstname, person.secondname, person.email);
      }
    })
    .catch(err => console.log(err));
})
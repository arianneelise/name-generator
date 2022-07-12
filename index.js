/* 
Random Person Generator

- Should mimic the real deal (layout, buttons, etc)
- Names on the left should be rendered from a list of people
- People must be weighted (higher weight === more likely to be selected)
- Must be randomly selected. The selected user should not be chosen again until at least everyone has been called on (except in the event of higher weights)
- Must display the selected user

Extra: Even if you can't figure it out, try to use this api to fetch the names: https://devpipeline-mock-api.herokuapp.com/api/get-users
to render the users. I want to see at least an attempt at this.

- Add some fun color phases, animations, etc whatever. 
*/
let users;
let userList = [];
let calledUsers = [];

fetch("https://devpipeline-mock-api.herokuapp.com/api/get-users")
  .then((res) => res.json())
  .then((data) => {
    users = data.users;
  })
  .then(() => displayUsers(users))
  .catch((err) => console.error(err));

function displayUsers(users) {
  users.forEach((user) => {
    const li = document.createElement("li");
    const newText = document.createTextNode(`${user["first_name"]}`);
    li.appendChild(newText);
    const ul = document.querySelector(".name-list");
    ul.appendChild(li);
  });
}

function generateName() {
  let randomNumber = numberGenerator();
  let randomName = users[randomNumber]["first_name"];
  number = 0;
  while (calledUsers.includes(randomName)) {
    randomNumber = numberGenerator();
    randomName = users[randomNumber]["first_name"];
    if (number == 12) {
      calledUsers = [];
      break;
    }
    number++;
  }
  document.querySelector(".name").innerHTML = users[randomNumber]["first_name"];
  calledUsers.push(users[randomNumber]["first_name"]);
  console.log(calledUsers);

  console.log("hello");
}

function numberGenerator() {
  return Math.floor(Math.random() * users.length);
}

const button = document.querySelector(".name-button");
button.addEventListener("click", generateName);

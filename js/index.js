const URL = "https://n36-todolist.herokuapp.com";

const token = JSON.parse(localStorage.getItem("token"));
const elToDoList = document.querySelector(".todo__list");
const elToDoTemplate = document.querySelector(".template").content;
const elToDoButton = document.querySelector(".add-todo__btn");
const elToDoForm = document.querySelector(".add-todo");
const elToDoInput = document.querySelector(".add-todo__input");
const elLogOut = document.querySelector('.log-out')

//ADD TO DO
async function addToDo(user) {
  const response = await fetch(`${URL}/todos`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      token,
    },
    body: JSON.stringify(user),
  });
}

elLogOut.addEventListener("click", (e)=>{
  e.preventDefault
  localStorage.removeItem("token")
    location.pathname = "auth.html"
})
async function toDoRender() {
  const response = await fetch(`${URL}/todos`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      token,
    },
  });
  const data = await response.json();
  RenderData(data);
}
toDoRender();
elToDoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    text: elToDoInput.value.trim(),
  };
  addToDo(data);
});

//Read
async function toDoRender() {
  const response = await fetch(`${URL}/todos`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      token,
    },
  });
  const data = await response.json();
  console.log(data);
  RenderData(data);
}
toDoRender();
//Render DATA
function RenderData(argument) {
  elToDoList.innerHTML = null;
  argument.forEach((element) => {
    const newTemp = elToDoTemplate.cloneNode(true);
    newTemp.querySelector(".todo__item").setAttribute("data-id", element.id);
    newTemp.querySelector(".todo__text").textContent = element.body;
    if (element.is_checked === true) {
      newTemp.querySelector(".todo__checkbox").setAttribute("checked", true);
    }
    elToDoList.append(newTemp);
  });
}

//DELETE
async function deleteToDo(id) {
  const response = await fetch(`${URL}/todos/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      token: token,
    },
  });
  toDoRender();
}
elToDoList.addEventListener("click", (e) => {
  e.preventDefault;
  if (e.target.matches(".todo__btn")) {
    const deleteId = e.target.closest(".todo__item").dataset.id;
    deleteToDo(deleteId);
  }
});

//EDIT
async function editToDo(id) {
  const response = await fetch(`${URL}/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      token: token,
    },
  });
  toDoRender();
}

elToDoList.addEventListener("change", (e) => {
  e.preventDefault;
  if (e.target.matches(".todo__checkbox")) {
    const editId = e.target.closest(".todo__item").dataset.id;
    editToDo(editId);
  }
});

let todos = [];

const TODOS_API_URL = "https://jsonplaceholder.typicode.com/todos";

const addBtn = document.querySelector("#add-btn");

const render = (todos) => {
  const listContainer = document.querySelector("#list");
  console.log(todos);

  todos.forEach((todo, index) => {
    const item = document.createElement("div");
    const removeBtn = document.createElement("button");
    const checkBox = document.createElement("input");

    checkBox.type = "checkbox";

    removeBtn.textContent = "X";
    removeBtn.addEventListener("click", () => remove(index));

    item.classList.add("todo-list__item");
    item.textContent = todo.title;

    if (todos[index].completed) {
      item.classList.add("completed");
      checkBox.checked = true;
    } else {
      item.classList.remove("completed");
      checkBox.checked = false;
    }

    item.append(checkBox);
    item.append(removeBtn);

    checkBox.onchange = () => checkTodo(index);

    listContainer.append(item);
  });
};

const addTodo = (text) => {
  todos.push({
    title: text,
    completed: false,
  });

  document.querySelector("#list").textContent = "";
  render(todos);
};

const remove = (id) => {
  todos.splice(id, 1);

  document.querySelector("#list").textContent = "";
  render(todos);
};

const checkTodo = (id) => {
  todos[id].completed = !todos[id].completed;

  document.querySelector("#list").textContent = "";
  render(todos);
};

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const text = document.querySelector("#text").value;
  if (text === "" || text === " ") {
    return;
  }

  addTodo(text);
  document.querySelector("#text").value = "";
});

const fetchTodos = async () => {
  fetch(TODOS_API_URL)
    .then((res) => res.json())
    .then((data) => {
      todos = data;
      render(todos);
    });
};

fetchTodos();

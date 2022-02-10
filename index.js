const addBtn = document.getElementById("addTodo");

// Form Data
// ==================================
const todoTitle = document.getElementById("todoTitle");
const todoContent = document.getElementById("todoContent");

// Add Todo
// ==================================
const addTodo = (title, content) => {
  // if items is not exists in localStorage
  // then create items key and store the todo in it
  if (localStorage.getItem("items") === null) {
    let itemJsonArray = [];
    itemJsonArray.push({ title, content });
    localStorage.setItem("items", JSON.stringify(itemJsonArray));
  } else {
    // if items is already exists in localStorage
    // then get and update items with new todo
    let itemJsonArrayStr = localStorage.getItem("items");
    let itemJsonArray = JSON.parse(itemJsonArrayStr);
    itemJsonArray.push({ title, content });
    localStorage.setItem("items", JSON.stringify(itemJsonArray));
  }
};

// Delete Todo
// ==================================
const deleteTodo = (id) => {
  if (localStorage.getItem("items") !== null) {
    const itemJsonArrayStr = localStorage.getItem("items");
    const itemJsonArray = JSON.parse(itemJsonArrayStr);
    // Delete item from array
    itemJsonArray.splice(id, 1);
    localStorage.setItem("items", JSON.stringify(itemJsonArray));
    updateTodoList();
  }
};

// input data sanitization
// ==================================
const sanitize = (str) => {
  return str.trim();
};

// Update Todo List
// ==================================
const updateTodoList = () => {
  let todoArrayStr;
  let todoArray;
  if (localStorage.getItem("items") !== null) {
    todoArrayStr = localStorage.getItem("items");
    todoArray = JSON.parse(todoArrayStr);
  } else {
    todoArray = [];
  }
  const todoContainer = document.getElementById("todoContainer");
  let str = "";

  todoArray.forEach((item, index) => {
    // Limit characters for showing on table
    const limit = 100;
    let content;
    if (item.content.length > limit) {
      content = item.content.substr(0, limit);
      content += "...";
    } else {
      content = item.content;
    }

    str += `<tr>
              <th scope="row">${index + 1}</th>
              <td>${item.title}</td>
              <td>${content}</td>
              <td><button type="button" onclick="deleteTodo(${index})" class="btn btn-danger">Delete</button></td>
            </tr>`;
  });
  todoContainer.innerHTML = str;
};

// Event Handlers
// ==================================
const addNewTodo = (e) => {
  e.stopPropagation();
  e.preventDefault();
  const title = sanitize(todoTitle.value);
  const content = sanitize(todoContent.value);

  // If content or title is blank then
  // prevent submission
  if (title === "") {
    todoTitle.classList.add("is-invalid");
    return false;
  }

  if (content === "") {
    todoContent.classList.add("is-invalid");
    return false;
  }

  // Add item to todo list
  addTodo(title, content);
  // Update todolist table
  updateTodoList();

  // Clear Form field values;
  (todoTitle.value = ""), (todoContent.value = "");
};

// Event listener
// ==================================
addBtn.addEventListener("click", addNewTodo);

todoTitle.addEventListener("change", () => {
  todoTitle.classList.remove("is-invalid");
});

todoContent.addEventListener("change", () => {
  todoContent.classList.remove("is-invalid");
});

// Call updateTodoList on page load to populate
// todos in the table
updateTodoList();

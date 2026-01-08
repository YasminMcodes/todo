import { saveProjects } from "./storage.js";
export function initUI(appState) {
  let activeProject = null;


  const addProjectBtn = document.getElementById("addProject");
  const projectDialog = document.getElementById("projectDialog");
  const projectNameInput = document.getElementById("projectNameInput");
  const projectList = document.getElementById("projects-list");
  const todoList = document.getElementById("todo-list");

  // ---- Create Todo Dialog ----
  const todoDialog = document.createElement("dialog");
  todoDialog.id = "todoDialog";

  todoDialog.innerHTML = `
  <form id="todoForm">
    <h3>Add Todo</h3>

    <label>
      Title
      <input type="text" id="todoTitle" required />
    </label>

    <label>
      Description
      <textarea id="todoDescription"></textarea>
    </label>

    <label>
      Due Date
      <input type="date" id="todoDueDate" />
    </label>

    <label>
      Priority
      <select id="todoPriority">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </label>

    <div class="actions">
      <button type="button" id="cancelTodo">Cancel</button>
      <button type="submit">Add</button>
    </div>
  </form>
`;
  const todoForm = todoDialog.querySelector("#todoForm");
  const todoTitle = todoDialog.querySelector("#todoTitle");
  const todoDescription = todoDialog.querySelector("#todoDescription");
  const todoDueDate = todoDialog.querySelector("#todoDueDate");
  const todoPriority = todoDialog.querySelector("#todoPriority");

  document.body.appendChild(todoDialog);


  addProjectBtn.addEventListener("click", () => {
    projectNameInput.value = "";
    projectDialog.showModal();
  });

  projectDialog.querySelector("#submitProject").addEventListener("click", () => {
    if (projectDialog.returnValue !== "default") return;

    const projectName = projectNameInput.value.trim();
    if (!projectName) return;

    appState.addProject(projectName);
    displayProjects();

  });
  projectDialog.querySelector("#cancel").addEventListener("click", () => {
    projectDialog.close();

  });

  function displayProjects() {
    projectList.innerHTML = "";

    appState.projects.forEach((project, projectIndex) => {
      const projectItem = document.createElement("li");
      projectItem.classList.add("project-item");

      // Project header
      const nameSpan = document.createElement("span");
      nameSpan.textContent = project.name;


      const addTodoBtn = document.createElement("button");
      addTodoBtn.textContent = "Add Todo";
      addTodoBtn.addEventListener("click", () => {
        activeProject = project;
        todoForm.reset();
        todoDialog.showModal();

        todoForm.onsubmit = defaultTodoSubmit;
      });
      todoDialog.querySelector("#cancelTodo").addEventListener("click", () => {
        todoDialog.close();
      });


      const editProjectBtn = document.createElement("button");
      editProjectBtn.textContent = "Edit";

      const deleteProjectBtn = document.createElement("button");
      deleteProjectBtn.textContent = "Delete";

      deleteProjectBtn.addEventListener("click", () => {
        if (!confirm(`Delete project "${project.name}"?`)) return;

        appState.projects.splice(projectIndex, 1);
        
        displayProjects();
      });

      editProjectBtn.addEventListener("click", () => {
        const newName = prompt("Edit project name:", project.name);
        if (!newName || !newName.trim()) return;
        project.name = newName.trim();
        
        displayProjects();
      });

      const header = document.createElement("div");
      header.classList.add("project-header");
      header.append(nameSpan, addTodoBtn, editProjectBtn, deleteProjectBtn);

      // Todos list
      const todoList = document.createElement("ul");
      todoList.classList.add("todo-list");

      project.todos.forEach((todo, todoIndex) => {
        const actions = document.createElement("li");

        const editTodoBtn = document.createElement("button");
        editTodoBtn.textContent = "Edit";

        const deleteTodoBtn = document.createElement("button");
        deleteTodoBtn.textContent = "Delete";

        deleteTodoBtn.addEventListener("click", () => {
          if (!confirm("Delete this todo?")) return;

          project.todos.splice(todoIndex, 1);
    
          displayProjects();
        });
        editTodoBtn.addEventListener("click", () => {
          activeProject = project;

          todoTitle.value = todo.title;
          todoDescription.value = todo.description;
          todoDueDate.value = todo.dueDate;
          todoPriority.value = todo.priority;

          todoDialog.showModal();

          todoForm.onsubmit = (e) => {
            e.preventDefault();

            todo.title = todoTitle.value;
            todo.description = todoDescription.value;
            todo.dueDate = todoDueDate.value;
            todo.priority = todoPriority.value;

            todoDialog.close();
            
            displayProjects();


            todoForm.onsubmit = defaultTodoSubmit;
          };
        });

        actions.append(editTodoBtn, deleteTodoBtn);

        const todoItem = document.createElement("ul");
        todoItem.classList.add("todo-Item-container");

        const titleItem = document.createElement("li");


        const title = document.createElement("span");
        title.classList.add("todoTitle");
        title.textContent = todo.title;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        titleItem.append(checkbox, title);

        const description = document.createElement("li");
        description.classList.add("description")
        description.textContent = todo.description;

        const dueDate = document.createElement("li");
        dueDate.classList.add("date");
        dueDate.textContent = "Due: " + todo.dueDate;

        const priority = document.createElement("li");
        priority.classList.add("priority");
        priority.textContent = "Priority: " + todo.priority;


        todoItem.append(titleItem, description, dueDate, priority, actions)

        todoList.appendChild(todoItem);
        checkbox.addEventListener("change", () => {
          title.classList.toggle("completed", checkbox.checked);
        });
      });

      projectItem.append(header, todoList);
      projectList.appendChild(projectItem);
    });
  }
  function defaultTodoSubmit(e) {
    e.preventDefault();

    if (!activeProject) return;

    activeProject.addTodo(
      todoTitle.value,
      todoDescription.value,
      todoDueDate.value,
      todoPriority.value
    );

    todoDialog.close();
    displayProjects();
  }

  todoForm.addEventListener("submit", defaultTodoSubmit);


  displayProjects();
}


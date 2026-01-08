import State from "./state.js";
import { initUI} from "./ui.js"; 
import "./style.css";

const appState = new State();



const project = appState.addProject("Work");
project.addTodo(
  "Persist me",
  "This should survive refresh",
  "2026-01-15",
  "high"
);
project.addTodo(
  "Persist me",
  "This should survive refresh",
  "2026-01-15",
  "high"
);

const project2 = appState.addProject("personal");
project2.addTodo(
  "fdjfhdds",
  "fddgfd",
  "fsfdf"
);
console.log(appState.projects);

initUI(appState);
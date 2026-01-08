import State from "./state.js";
import { initUI} from "./ui.js"; 
import "./style.css";

const appState = new State();



if (appState.projects.length === 0) {
  const project = appState.addProject("Work");
  project.addTodo("todo item 1", "This should survive refresh", "2026-01-15", "high");

  const project2 = appState.addProject("Personal");
  project2.addTodo("Todo example", "Example description", "2026-01-15", "medium");
}


initUI(appState);
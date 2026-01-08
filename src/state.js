import Project from "./project.js";
import Todo from "./todo.js";
import { saveProjects, loadProjects } from "./storage.js";


export default class State {
    constructor() {
        this.projects = [];
        this.activeProjectIndex = 0;
    }



createDefaultProject() {
    const defaultProject = new Project("Your Project");
    this.projects.push(defaultProject);
    this.activeProjectIndex = 0;
}

    get activeProject() {
    return this.projects[this.activeProjectIndex];
}
addProject(name) {
    const project = new Project(name);
    this.projects.push(project);
    return project;
}

setActiveProject(index) {
    if (index < 0 || index >= this.projects.length) return;
    this.activeProjectIndex = index;
}

}
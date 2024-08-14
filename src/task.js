import { projects, displayTasks } from "./project"
import { saveData } from "./storage"

let formcontainer = document.getElementById("formcontainer")
let buttoncontainer = document.getElementById("buttons")
export function createTaskBut(){
    let b = document.createElement("button")
    b.textContent = "create task"
    b.addEventListener(("click"), () => {
        newTask(projects)
    })
    buttoncontainer.appendChild(b)
}

function newTask(project){
if(projects.length == 0){
    formcontainer.textContent = "Add a project first"
}else{
    formcontainer.textContent = ""
    let form = document.createElement("form")
    let name = document.createElement("input")
    name.placeholder = "name of task"
    name.id = "name"
    form.appendChild(name)
    let desc = document.createElement("input")
    desc.id = "desc"
    desc.maxLength = "100"
    desc.placeholder = "description"
    form.appendChild(desc)
    let e = document.createElement("div")
    let datelabel = document.createElement("label")
    datelabel.textContent = "due date: "
    e.appendChild(datelabel)
    let date = document.createElement("input")
    date.id = date
    date.type = "date"
    e.appendChild(date)
    form.appendChild(e)
    let r = document.createElement("div")
    let priolabel = document.createElement("label")
    priolabel.textContent = "important: "
    r.appendChild(priolabel)
    let prio = document.createElement("input")
    prio.id = "prio"
    prio.type = "checkbox"
    r.append(prio)
    form.appendChild(r)
    let u = document.createElement("div")
    let selectlabel = document.createElement("label")
    selectlabel.textContent = "select a project: "
    u.appendChild(selectlabel)
    let select = document.createElement("select")
    project.forEach(element => {
        let x = document.createElement("option")
        x.textContent = element.name
        select.appendChild(x)
    });
    u.appendChild(select)
    form.appendChild(u)
    let submitbut = document.createElement("button")
    submitbut.textContent = "submit"
    submitbut.addEventListener(("click"), (e) => {
        e.preventDefault()
        if(name.value != "" && desc.value != "" && date.value != ""){
        formcontainer.removeChild(form)
        let cont = select.options[select.selectedIndex].value
        let task = {
            name: name.value,
            desc:desc.value,
            date:date.value,
            priority:prio.checked,
            completed:false
        }
        for(let i = 0; i < projects.length; i++){
            if(projects[i].name == cont){
                projects[i].tasks.push(task)
            }
        saveData(projects)
        displayTasks(projects[i].tasks)
        }
        console.log(projects)
}
    })
    form.appendChild(submitbut)
    formcontainer.appendChild(form)
}}
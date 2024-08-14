let buttoncontainer = document.getElementById("buttons")
let container = document.getElementById("formcontainer")
let projectcontaier = document.getElementById("projectcontainer")
let taskcontainer = document.getElementById("taskcontainer")
var projects = loadData()
if(projects == null){
    projects = []
}
import { loadData, saveData } from "./storage"

function newProject(){
    let but = document.createElement("button")
    but.textContent = "new project"
    but.addEventListener(("click"), () => {
        showformproject()
    })
    buttoncontainer.appendChild(but)
}

function showformproject(){
    container.textContent = ""
    let form = document.createElement("form")
    let name = document.createElement("input")
    name.id = "name"
    name.placeholder = "name for the project"
    form.appendChild(name)
    let desc = document.createElement("input")
    desc.id = "desc"
    desc.placeholder = "description"
    form.appendChild(desc)
    let submitbut = document.createElement("button")
    submitbut.textContent = "submit"
    submitbut.addEventListener(("click"), (e) =>{
        e.preventDefault()
        if(name.value != "" && desc.value != ""){
            container.removeChild(form)
            let x = {
                name: name.value,
                description: desc.value,
                tasks:[]
            }
            projects.push(x)
            saveData(projects)
            displayProjects(projects)
        }
    })
    form.appendChild(submitbut)
    container.appendChild(form)
}
export function displayProjects(){
    projectcontaier.textContent = ""
    projects.forEach(element => {
        let x = document.createElement("div")
        let y = document.createElement("h2")
        y.textContent = element.name
        x.appendChild(y)
        let z = document.createElement("p")
        z.textContent = element.description
        x.appendChild(z)
        let h = document.createElement("button")
        h.textContent = "show projects"
        h.addEventListener(("click"), () => {
            loadData().forEach(r => {
                if(r.name == element.name){
                    displayTasks(r.tasks)
                }
            })
        })
        let k = document.createElement("div")
        k.classList.add("projectbuttons")
        let e = document.createElement("span")
        e.classList.add("material-symbols-outlined")
        e.textContent = "edit"
        let i = projects.indexOf(element)
        e.addEventListener(("click"), () => {
            loadData().forEach(w => {
                if(w.name == element.name){
                    editProject(w)
                }})
        })
        k.appendChild(e)
        let r = document.createElement("span")
        r.classList.add("material-symbols-outlined")
        r.addEventListener(("click"), () => {
        deleteproject(i)
        })
        r.textContent = "delete"
        k.appendChild(r)
        x.appendChild(k)
        x.appendChild(h)
        projectcontaier.appendChild(x)        
        saveData(projects)
    }
);
}
function deleteproject(x){
    projects.splice(x, 1)
    saveData(projects)
    displayProjects(projects)
}
function editProject(x){
    let form = document.createElement("form")
    form.classList.add("edit")
    let namef = document.createElement("input")
    namef.value = x.name
    form.appendChild(namef)
    let descf = document.createElement("input")
    descf.value = x.description
    form.appendChild(descf)
    let submitbut = document.createElement("button")
    submitbut.textContent = "rename"
    submitbut.addEventListener(("click"), (e) => {
        e.preventDefault()
        let a = namef.value
        let b = descf.value
        rename(a,b,x)
        document.body.removeChild(form)
    })
    form.appendChild(submitbut)
    document.body.appendChild(form)
}
function rename(a,b,x){
            projects.forEach(element => {
            if(element.name == x.name && element.description == x.description){
                element.name = a
                element.description = b
                saveData(projects)
                displayProjects()
            }
            })
            
        }
    
function displayTasks(x){
    taskcontainer.textContent = ""
    console.log(x)
    x.forEach(element => {
        let l = document.createElement("div")
        l.classList.add("task")
        let o = document.createElement("h3")
        o.textContent = element.name
        l.appendChild(o)
        let k = document.createElement("p")
        k.textContent = element.date
        l.appendChild(k)
        let r = document.createElement("p")
        r.textContent = element.desc
        l.appendChild(r)
        if(element.priority){
            l.style.boxShadow = "0 0 10px 3px rgb(156, 14, 14)"
        }
        let icon = document.createElement("span")
        icon.textContent = "check_circle"
        icon.classList.add("material-symbols-outlined")
        let del = document.createElement("span")
        del.classList.add("material-symbols-outlined")
        del.textContent = "delete"
        del.style.display = "none"
        icon.addEventListener(("click"), () => {
            if(!element.completed){
            o.style.textDecoration = "line-through"
            k.style.textDecoration = "line-through"
            r.style.textDecoration = "line-through"
            del.style.display = "inline"
            l.style.boxShadow = "0 0 10px 3px rgb(34, 143, 38)"
            element.completed = true
            saveData(projects)
        }
        else{
            if(element.priority){
            o.style.textDecoration = "none"
            k.style.textDecoration = "none"
            r.style.textDecoration = "none"
            del.style.display = "none"
            l.style.boxShadow = "0 0 10px 3px rgb(5, 14, 99)"
            }
            else{
                o.style.textDecoration = "none"
                k.style.textDecoration = "none"
                r.style.textDecoration = "none"
                del.style.display = "none"
                l.style.boxShadow = "0 0 10px 3px rgb(156, 14, 14)"
            }
            element.completed = false
            saveData(projects)
        }
        })
        del.addEventListener(("click"), () => {
            x.pop(element)
            console.log(projects)
            displayTasks(x)
        })
        l.appendChild(icon)
        l.appendChild(del)
        if(element.completed){
            o.style.textDecoration = "line-through"
            k.style.textDecoration = "line-through"
            r.style.textDecoration = "line-through"
            del.style.display = "inline"
            l.style.boxShadow = "0 0 10px 3px rgb(34, 143, 38)"
        }
        taskcontainer.appendChild(l)
    })
}

export{
    newProject,
    projects,
    displayTasks
}
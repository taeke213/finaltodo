function saveData(projects){
    localStorage.setItem("projects", JSON.stringify(projects))
}
function loadData(){
    let storeddata = localStorage.getItem("projects")
    if(storeddata){
        return JSON.parse(storeddata)
    }
    return null
}
function removeData(){
    localStorage.removeItem("projects")
}
function checkData(){
    return localStorage.getItem("projects") !== null 
}

export{
    saveData,
    loadData,
    removeData,
    checkData
}
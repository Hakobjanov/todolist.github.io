loadFilter();
loadToDos();

addToList.onclick = () => {
    if (!inputToDo.value) return;
    const name = inputToDo.value, id = unId();
    createToDo({name, id});
    saveToDo(name, id);
}

filter.onchange = filter.oninput = () => {

    saveFilter();
    loadToDos();
}

function createToDo({name, id}) {
    const clone = li.cloneNode(1);
    const span = clone.children[0];
    span.innerText = name;
    span.onkeydown = handleEdit;
    clone.id = id;
    span.onblur = () => updateToDo(span.innerText, clone.id);
    toDos.append(clone);

    updateStatus();
}

function unId() {
    localStorage.id = localStorage.id ? +localStorage.id + 1 : 1
    return localStorage.id
}



function saveToDo(name, id) {
    const toDos = localStorage.toDos ? JSON.parse(localStorage.toDos) : [];
    toDos.push({name, id});
    localStorage.toDos = JSON.stringify(toDos);
}

function updateToDo(name, id) {
    const toDos = localStorage.toDos ? JSON.parse(localStorage.toDos) : [];
    toDos.find(todo => todo.id === id).name = name;
    localStorage.toDos = JSON.stringify(toDos);
}

function handleEdit(e) {
    if (e.key === 'Enter') {
        this.blur();
    }
}

function deleteToDo(id) {
    const toDos = localStorage.toDos ? JSON.parse(localStorage.toDos) : [];
    toDos.splice(toDos.findIndex(todo => todo.id === id));
    localStorage.toDos = JSON.stringify(toDos);

    document.getElementById(id).remove();

    updateStatus();
}

function deleteAllToDos() {
    delete localStorage.toDos;

    toDos.innerHTML = '';

    updateStatus();

}

function loadToDos(){
    const arrToDos = localStorage.toDos ? JSON.parse(localStorage.toDos) : [];

    //toDos.forEach(({name, id}) => {createToDo(name, id)})
    toDos.innerHTML = '';
    arrToDos.filter(todo => todo.name.includes(filter.value)).forEach(createToDo);
    updateStatus();
}

function updateStatus() {
    const arrToDos = localStorage.toDos ? JSON.parse(localStorage.toDos) : [];
    
    if (!arrToDos.length) {
        statusBar.innerText = '';
    } else if (!filter.value) {
        statusBar.innerText = `${toDos.children.length} things to do` 
    } else {
        statusBar.innerText = `${toDos.children.length} of ${arrToDos.length} things to do shown`
    }

}

function saveFilter() {
    localStorage.filter = filter.value;
}

function loadFilter() {
    filter.value = localStorage.filter || '';
}

function clearFilter() {
    filter.value = '';

    saveFilter();
    loadToDos();
}




document.addEventListener("DOMContentLoaded", () => {
    const theme = localStorage.getItem("theme") || "light"
    const html = document.documentElement
    html.dataset.theme = theme
})


document.body.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn")) {
        const html = document.documentElement
        html.dataset.theme = e.target.dataset.theme
        localStorage.setItem("theme", e.target.dataset.theme)
    }
})


let todos = JSON.parse(localStorage.getItem("todos")) || [
    { id: 1, title: "nazarbek vazifa qilmoqchi", status: false, },
    { id: 2, title: "hamidulloh vazifa qilmoqchi", status: true, },
    { id: 3, title: "hoji vazifa qilmoqchi", status: true, }
];
const elTodos = document.getElementById("todos")
const elForm = document.getElementById("form")
elForm.addEventListener("submit", (e2) => {
    e2.preventDefault()
    const newTodo = {
        title: e2.target[0].value,
        id: todos.length + 1,
        status: false
    }
    addTodo(newTodo)
    e2.target[0].value = ""
})

// UI updater
function UIupdater(todos) {
    localStorage.setItem("todos", JSON.stringify(todos))
    elTodos.innerHTML = null
    if (todos.length > 0) {
        todos.forEach(({ title, id, status }) => {
            const removebtn = document.createElement("button")
            const li = document.createElement("li")
            const h3 = document.createElement("h3")
            const statusInput = document.createElement("input")
            statusInput.type = "checkbox"
            statusInput.checked = status
            statusInput.addEventListener("change", () => {
                changeStatus(id)
            })
            removebtn.addEventListener("click", () => {
                deleteTodo(id)
            })
            removebtn.textContent = "Delete ❌"
            h3.textContent = title
            li.appendChild(h3)
            li.appendChild(removebtn)
            li.appendChild(statusInput)
            elTodos.append(li)
        });

    } else {
        elTodos.innerHTML = "No data"
    }
}

// add
function addTodo(newTodos) {
    todos = [...todos, newTodos]
    UIupdater(todos)
}

// remove
function deleteTodo(id) {
    const result = todos.filter((el) => el.id !== id)
    todos = result
    UIupdater(todos)
    const sound = document.getElementById("audio")
    sound.play()
}




// statusCHange
function changeStatus(id) {
    const result = todos.map((el) => {
        if (el.id === id) {
            return { ...el, status: !el.status }
        } else {
            return el
        }
    })
    todos = result
    UIupdater(result)
}
// start
UIupdater(todos)
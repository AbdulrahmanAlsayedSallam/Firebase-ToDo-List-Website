// Import the necessary Firebase modules from your config.js file
import { db } from "./config.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const charCount = document.querySelector("#char-count span"); // Character count display
const maxCharLimit = 50; 

document.addEventListener("DOMContentLoaded", loadTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", handleTodoAction);
filterOption.addEventListener("change", filterTodo);

document.addEventListener("DOMContentLoaded", () => {
    // Update the character count when user types
    todoInput.addEventListener("input", updateCharCount);
});

function updateCharCount() {
    const currentLength = todoInput.value.length;
    const remaining = maxCharLimit - currentLength;

    // Update the character count display
    charCount.innerText = remaining;
}



async function addTodo(event) {
    event.preventDefault();  
    const task = todoInput.value.trim();

    // Check if the task is empty or exceeds the character limit
    if (!task) {
        showError("Error: You can't add an empty task!");
        return;
    } else if (task.length > maxCharLimit) {
        showError(`Error: Character limit of ${maxCharLimit} exceeded!`);
        return;
    }

    try {
        // Add task to Firestore
        const docRef = await addDoc(collection(db, "tasks"), { text: task, completed: false });
        console.log("Task added with ID:", docRef.id);

        // Add task to the UI
        createTodoElement(task, false, docRef.id);
        todoInput.value = ""; // Clear input
        charCount.innerText = maxCharLimit; // Reset the character count
    } catch (error) {
        console.error("Error adding task:", error);
    }
}


async function loadTodos() {
    try {
        const querySnapshot = await getDocs(collection(db, "tasks"));
        querySnapshot.forEach((doc) => {
            const { text, completed } = doc.data();
            createTodoElement(text, completed, doc.id);
        });
    } catch (error) {
        console.error("Error loading tasks:", error);
    }
}

function createTodoElement(task, completed, id) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    if (completed) todoDiv.classList.add("completed");
    todoDiv.dataset.id = id;

    const newTodo = document.createElement("li");
    newTodo.innerText = task;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    const editButton = document.createElement("button");
    editButton.innerHTML = '<i class="fas fa-edit"></i>';
    editButton.classList.add("edit-btn");
    todoDiv.appendChild(editButton);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
}

async function handleTodoAction(event) {
    const item = event.target;
    const todo = item.parentElement;
    const taskId = todo.dataset.id;

    if (item.classList.contains("trash-btn")) {
        // Add the 'deleting' class to trigger the animation
        todo.classList.add("deleting");

        // After the animation ends, remove the task from Firestore and DOM
        todo.addEventListener("animationend", async () => {
            try {
                // Remove the task from Firestore
                await deleteDoc(doc(db, "tasks", taskId));
                console.log("Task deleted:", taskId);

                // Remove the task from the DOM
                todo.remove();
            } catch (error) {
                console.error("Error deleting task:", error);
            }
        });
    }

    if (item.classList.contains("complete-btn")) {
        try {
            const isCompleted = todo.classList.contains("completed");
            await updateDoc(doc(db, "tasks", taskId), { completed: !isCompleted });
            console.log("Task updated:", taskId);
            todo.classList.toggle("completed");
        } catch (error) {
            console.error("Error updating task:", error);
        }
    }

    if (item.classList.contains("edit-btn")) {
        const todoItem = todo.querySelector(".todo-item");

        if (todo.classList.contains("completed")) {
            showError("Error: You cannot edit a completed task!");
            return;
        }

        todoItem.setAttribute("contenteditable", "true");
        todoItem.focus();
        todoItem.style.border = "1px solid rgb(0, 123, 255)";
        todoItem.style.backgroundColor = "rgba(0, 123, 255, 0.1)";
        todoItem.style.padding = "0.2rem";

        todoItem.addEventListener("blur", async function () {
            const newValue = todoItem.innerText.trim();
            todoItem.setAttribute("contenteditable", "false");
            todoItem.style.border = "none";
            todoItem.style.backgroundColor = "transparent";
            todoItem.style.padding = "0";

            try {
                await updateDoc(doc(db, "tasks", taskId), { text: newValue });
                console.log("Task edited:", taskId);
            } catch (error) {
                console.error("Error editing task:", error);
            }
        }, { once: true });
    }
}

function filterTodo(event) {
    const todos = todoList.childNodes;
    todos.forEach((todo) => {
        if (todo.nodeType === 1) { // Only process element nodes
            switch (event.target.value) {
                case "all":
                    todo.style.display = "flex";
                    break;
                case "completed":
                    todo.style.display = todo.classList.contains("completed") ? "flex" : "none";
                    break;
                case "incomplete":
                    todo.style.display = !todo.classList.contains("completed") ? "flex" : "none";
                    break;
            }
        }
    });
}

function showError(message) {
    if (document.querySelector(".error-message")) return; // Prevent duplicate error messages

    const errorDiv = document.createElement("div");
    errorDiv.classList.add("error-message");
    errorDiv.innerText = message;

    // Insert the error message above the `.form` div
    const formDiv = document.querySelector(".form"); // Target the div with class "form"
    formDiv.insertAdjacentElement("beforebegin", errorDiv);

    // Remove the error message after 3 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

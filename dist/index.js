const addBtn = document.getElementById("addBtn");
const editBtn = document.getElementById("editBtn");
const removeBtn = document.getElementById("removeBtn");
const todoValueInputField = document.getElementById("todoValueInputField");
const noteList = document.getElementById("noteList");
let noteCount = 0;
let isEditActive = false;
let isRemoveActive = false;
class Note {
    note;
    id;
    constructor(note) {
        this.note = todoValueInputField.value.trim();
        this.id = noteCount++;
    }
    addNote() {
        if (this.note !== "") {
            const noteListItem = document.createElement("li");
            noteListItem.classList.add("listElement");
            noteListItem.innerHTML = this.note;
            noteListItem.id = `${this.id}`;
            noteList.appendChild(noteListItem);
        }
    }
}
addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    ClickAddNoteHandler(e);
});
editBtn.addEventListener("click", (e) => {
    isEditActive = !isEditActive;
    if (isEditActive) {
        editBtn.classList.add("active");
    }
    else {
        editBtn.classList.remove("active");
    }
});
removeBtn.addEventListener("click", (e) => {
    isRemoveActive = !isRemoveActive;
    if (isRemoveActive) {
        removeBtn.classList.add("active");
    }
    else {
        removeBtn.classList.remove("active");
    }
});
todoValueInputField.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        ClickAddNoteHandler(e);
    }
});
function ClickAddNoteHandler(event) {
    if (todoValueInputField.value !== "") {
        let note = new Note(todoValueInputField.value);
        note.addNote();
        todoValueInputField.value = "";
        checkNodeListChildren();
    }
}
document.addEventListener("DOMContentLoaded", checkNodeListChildren);
document.addEventListener("change", checkNodeListChildren);
const emptyListMsg = document.createElement("p");
function checkNodeListChildren() {
    const listItems = noteList.querySelectorAll("li");
    if (listItems.length === 0) {
        if (!noteList.contains(emptyListMsg)) {
            emptyListMsg.innerHTML = "No thoughts collected...";
            emptyListMsg.id = "emptyListTxt";
            noteList.appendChild(emptyListMsg);
        }
        emptyListMsg.style.display = "block";
    }
    else {
        emptyListMsg.style.display = "none";
        noteList.removeChild(emptyListMsg);
    }
}
noteList.addEventListener("dblclick", (e) => {
    console.log("dblclick found!");
    const target = e.target;
    if (target.tagName !== "LI")
        return console.log("returned from dblclick event!");
    if (target.classList.contains("selectedItem")) {
        console.log("SELECTED ALREADY!!!");
        target.classList.remove("selectedItem");
    }
    else {
        target.classList.add("selectedItem");
        console.log("added class");
    }
});
export {};
//# sourceMappingURL=index.js.map
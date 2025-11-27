const addBtn = document.getElementById("addBtn");
const editBtn = document.getElementById("editBtn");
const removeBtn = document.getElementById("removeBtn");
const todoValueInputField = document.getElementById("todoValueInputField");
const noteList = document.getElementById("noteList");
let noteCount = 0;
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
todoValueInputField.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        ClickAddNoteHandler(e);
    }
});
function ClickAddNoteHandler(event) {
    console.log("add Button clicked!");
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
export {};
//# sourceMappingURL=index.js.map
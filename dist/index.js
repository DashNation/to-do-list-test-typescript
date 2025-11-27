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
            noteList.appendChild(noteListItem);
        }
    }
}
addBtn.addEventListener("click", (e) => {
    ClickAddNoteHandler(e);
});
todoValueInputField.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        ClickAddNoteHandler(e);
    }
});
function ClickAddNoteHandler(event) {
    console.log("add Button clicked!");
    if (todoValueInputField.value !== "") {
        let note = new Note(todoValueInputField.value);
        note.addNote();
        todoValueInputField.value = "";
    }
}
export {};
//# sourceMappingURL=index.js.map
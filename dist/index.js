//cSpell: disable
//TODO: Ich möchte einbauen das wenn man die notes Editieren oder Löschen möchte das man den Editieren oder Löschen Knopf
// TODO mit anclicken an und aus toggelt und dann im active toggle modus per doppelclick eine beliebige note löschen kann
//cSpell: enable
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
    static editNote(target) {
        const noteListItemContent = target.textContent || "";
        const userInputField = document.createElement("input");
        userInputField.value = noteListItemContent;
        userInputField.id = "userInputField";
        userInputField.classList.add("userInputField");
        userInputField.type = "text";
        target.replaceWith(userInputField);
        userInputField.focus();
        function finishEdit() {
            const noteListItem = document.createElement("li");
            let noteListItemContent = noteListItem.value;
            noteListItem.textContent = userInputField.value;
            noteListItem.classList.add("listElement");
            userInputField.replaceWith(noteListItem);
        }
        function stopEdit(noteListItemContent) {
            const noteListItem = document.createElement("li");
            noteListItem.textContent = noteListItemContent;
            noteListItem.classList.add("listElement");
            userInputField.replaceWith(noteListItem);
        }
        userInputField.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                finishEdit();
            }
            if (e.key === "Escape") {
                console.log("Escape Pressed!");
                stopEdit(noteListItemContent);
            }
        });
        userInputField.addEventListener("blur", () => finishEdit());
    }
}
//Add Btn Event listener
addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    ClickAddNoteHandler(e);
});
//Edit Btn Event Listener
editBtn.addEventListener("click", (e) => {
    //   console.log("Edit Btn Clicked!");
    isEditActive = !isEditActive;
    //   console.log(`EditBtnState: ${isEditActive}`);
    if (isEditActive) {
        editBtn.classList.add("active");
    }
    else {
        editBtn.classList.remove("active");
    }
});
//Remove Btn Event Listener
removeBtn.addEventListener("click", (e) => {
    //   console.log("Remove Button Clicked!");
    isRemoveActive = !isRemoveActive;
    //   console.log(`RemoveBtnState:${isRemoveActive}`);
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
//cSpell: disable-next-line
//Funktion die bei einem Button click aufgerufen wird
function ClickAddNoteHandler(event) {
    //   console.log("add Button clicked!");
    if (todoValueInputField.value !== "") {
        let note = new Note(todoValueInputField.value);
        note.addNote();
        todoValueInputField.value = "";
        checkNodeListChildren();
    }
}
//cSpell: disable-next-line
// Conditions um zu bestimmen ob der "No thoughts collected Text" erscheint
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
//Giving noteList children events
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
    if (isEditActive && target.classList.contains("selectedItem")) {
        editBtnClickHandler(target);
    }
});
function editBtnClickHandler(target) {
    if (target.tagName !== "LI")
        return;
    Note.editNote(target);
}
export {};
//# sourceMappingURL=index.js.map
const addBtn = document.getElementById("addBtn");
const editBtn = document.getElementById("editBtn");
const removeBtn = document.getElementById("removeBtn");
const todoValueInputField = document.getElementById("todoValueInputField");
const noteList = document.getElementById("noteList");
let noteCount = 0;
let isEditActive = false;
let isRemoveActive = false;
window.addEventListener("keydown", (e) => {
    if (e.key.toLocaleLowerCase() === "e" && e.altKey) {
        isEditActive = !isEditActive;
        if (isEditActive) {
            editBtn.classList.add("active");
        }
        else {
            editBtn.classList.remove("active");
        }
    }
});
window.addEventListener("keydown", (e) => {
    if (e.key.toLocaleLowerCase() === "r" && e.altKey) {
        isRemoveActive = !isRemoveActive;
        if (isRemoveActive) {
            removeBtn.classList.add("active");
        }
        else {
            removeBtn.classList.remove("active");
        }
    }
});
class Note {
    note;
    id;
    constructor(note) {
        this.note = todoValueInputField.value.trim();
        this.id = noteCount++;
    }
    addNote() {
        if (this.note !== "") {
            const noteListItemWrapper = document.createElement("div");
            noteListItemWrapper.id = "noteListItemWrapper";
            noteListItemWrapper.style.display = "flex";
            noteListItemWrapper.style.flexDirection = "row";
            noteListItemWrapper.style.width = "100%";
            noteListItemWrapper.style.height = "100%";
            noteList.appendChild(noteListItemWrapper);
            const noteListItem = document.createElement("li");
            noteListItem.classList.add("listElement");
            noteListItem.innerHTML = this.note;
            noteListItem.id = `${this.id}`;
            noteListItemWrapper.appendChild(noteListItem);
        }
    }
    static editNote(target) {
        const userInputWrapper = document.createElement("div");
        userInputWrapper.id = "userInputWrapper";
        userInputWrapper.style.display = "flex";
        userInputWrapper.style.flexDirection = "row";
        userInputWrapper.style.justifyContent = "space-between";
        userInputWrapper.style.gap = "0.05rem";
        noteList.appendChild(userInputWrapper);
        const noteListItemContent = target.textContent || "";
        const userInputField = document.createElement("input");
        userInputField.value = noteListItemContent;
        userInputField.id = "userInputField";
        userInputField.classList.add("userInputField");
        userInputField.type = "text";
        const checkBtn = document.createElement("button");
        checkBtn.classList.add("checkBtn");
        checkBtn.classList.add("btn");
        const checkImg = document.createElement("img");
        checkImg.src = "SVG/checkMark24.svg";
        checkImg.classList.add("check");
        checkBtn.appendChild(checkImg);
        const crossBtn = document.createElement("button");
        crossBtn.classList.add("crossBtn");
        crossBtn.classList.add("btn");
        const crossImg = document.createElement("img");
        crossImg.src = "SVG/cross50.svg";
        crossImg.classList.add("cross");
        crossBtn.appendChild(crossImg);
        userInputWrapper.appendChild(userInputField);
        userInputWrapper.appendChild(checkBtn);
        userInputWrapper.appendChild(crossBtn);
        target.replaceWith(userInputWrapper);
        userInputField.focus();
        function finishEdit() {
            const noteListItem = document.createElement("li");
            let noteListItemContent = noteListItem.value;
            noteListItem.textContent = userInputField.value;
            noteListItem.classList.add("listElement");
            userInputWrapper.replaceWith(noteListItem);
            checkBtn.remove();
            crossBtn.remove();
        }
        function stopEdit(noteListItemContent) {
            const noteListItem = document.createElement("li");
            noteListItem.textContent = noteListItemContent;
            noteListItem.classList.add("listElement");
            userInputField.replaceWith(noteListItem);
            checkBtn.remove();
            crossBtn.remove();
        }
        let isClickingBtn = false;
        checkBtn.addEventListener("mousedown", () => {
            isClickingBtn = true;
            finishEdit();
        });
        crossBtn.addEventListener("mousedown", () => {
            isClickingBtn = true;
            stopEdit(noteListItemContent);
        });
        userInputField.addEventListener("keydown", (e) => {
            if (!isClickingBtn) {
                if (e.key === "Enter") {
                    finishEdit();
                }
                if (e.key === "Escape") {
                    console.log("Escape Pressed!");
                    stopEdit(noteListItemContent);
                }
            }
        });
        userInputField.addEventListener("blur", () => {
            if (!isClickingBtn) {
                finishEdit();
            }
        });
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
        if (noteList.contains(emptyListMsg)) {
            noteList.removeChild(emptyListMsg);
        }
        emptyListMsg.style.display = "none";
    }
}
noteList.addEventListener("dblclick", (e) => {
    const target = e.target;
    const li = target.closest("li");
    if (!li || !noteList.contains(li))
        return;
    if (li.classList.contains("selectedItem")) {
        li.classList.remove("selectedItem");
    }
    else {
        li.classList.add("selectedItem");
    }
    if (isEditActive && li.classList.contains("selectedItem")) {
        editBtnClickHandler(li);
    }
});
function editBtnClickHandler(target) {
    if (target.tagName !== "LI")
        return;
    Note.editNote(target);
}
export {};
//# sourceMappingURL=index.js.map
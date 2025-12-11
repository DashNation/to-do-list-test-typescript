import * as storage from "./storage.js";
const addBtn = document.getElementById("addBtn");
const editBtn = document.getElementById("editBtn");
const removeBtn = document.getElementById("removeBtn");
const todoValueInputField = document.getElementById("todoValueInputField");
const noteList = document.getElementById("noteList");
let noteCount = 0;
let isEditActive = false;
let isRemoveActive = false;
let isFillerTextVisible = true;
window.addEventListener("keydown", (e) => {
  if (e.key.toLocaleLowerCase() === "e" && e.altKey) {
    isEditActive = !isEditActive;
    if (isEditActive) {
      editBtn.classList.add("active");
    } else {
      editBtn.classList.remove("active");
    }
  }
});
window.addEventListener("keydown", (e) => {
  if (e.key.toLocaleLowerCase() === "r" && e.altKey) {
    isRemoveActive = !isRemoveActive;
    if (isRemoveActive) {
      removeBtn.classList.add("active");
      if (!isFillerTextVisible) {
        addRemoveNoteBtns();
      } else {
        closeRemoveNoteBtns();
      }
    } else {
      removeBtn.classList.remove("active");
      if (!isFillerTextVisible) {
        closeRemoveNoteBtns();
      }
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
    if (this.note) {
      const noteListItemWrapper = document.createElement("div");
      noteListItemWrapper.classList.add("noteListItemWrapper");
      noteListItemWrapper.style.display = "flex";
      noteListItemWrapper.style.flexDirection = "row";
      noteListItemWrapper.style.justifyContent = "start";
      noteListItemWrapper.style.alignItems = "center";
      noteListItemWrapper.style.width = "100%";
      noteListItemWrapper.style.height = "100%";
      noteList.appendChild(noteListItemWrapper);
      const noteListItem = document.createElement("li");
      noteListItem.classList.add("listElement");
      noteListItem.innerHTML = this.note;
      noteListItem.id = `${this.id}`;
      storage.add(`${this.id}`, this.note);
      noteListItemWrapper.appendChild(noteListItem);
    }
  }
  static editNote(target) {
    const targetID = target.id;
    console.log("targetID", targetID);
    const userInputWrapper = document.createElement("div");
    userInputWrapper.id = "userInputWrapper";
    userInputWrapper.style.display = "flex";
    userInputWrapper.style.flexDirection = "row";
    userInputWrapper.style.alignItems = "center";
    userInputWrapper.style.justifyContent = "space-between";
    userInputWrapper.style.gap = "0.05rem";
    noteList.appendChild(userInputWrapper);
    const noteListItemContent = target.textContent || "";
    const userInputField = document.createElement("input");
    userInputField.value = noteListItemContent;
    userInputField.focus();
    userInputField.select();
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
      storage.edit(`${targetID}`, userInputField.value);
      noteListItem.textContent = userInputField.value;
      noteListItem.id = targetID;
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
  ClickAddNoteHandler();
});
editBtn.addEventListener("click", (e) => {
  isEditActive = !isEditActive;
  if (isEditActive) {
    editBtn.classList.add("active");
  } else {
    editBtn.classList.remove("active");
  }
});
removeBtn.addEventListener("click", (e) => {
  isRemoveActive = !isRemoveActive;
  if (isRemoveActive) {
    removeBtn.classList.add("active");
    if (!isFillerTextVisible) {
      addRemoveNoteBtns();
    } else {
      closeRemoveNoteBtns();
    }
  } else {
    removeBtn.classList.remove("active");
    closeRemoveNoteBtns();
  }
});
todoValueInputField.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    ClickAddNoteHandler();
  }
});
function ClickAddNoteHandler() {
  if (todoValueInputField.value !== "") {
    let note = new Note(todoValueInputField.value);
    note.addNote();
    todoValueInputField.value = "";
    checkNodeListChildren();
  }
}
document.addEventListener("DOMContentLoaded", checkNodeListChildren);
document.addEventListener("change", checkNodeListChildren);
let emptyListMsg = document.createElement("p");
function checkNodeListChildren() {
  const listItems = noteList.querySelectorAll("li");
  if (listItems.length === 0) {
    if (!noteList.contains(emptyListMsg)) {
      emptyListMsg = document.createElement("p");
      emptyListMsg.innerHTML = "No thoughts collected...";
      emptyListMsg.id = "emptyListTxt";
      noteList.appendChild(emptyListMsg);
    }
    isFillerTextVisible = true;
    emptyListMsg.style.display = "block";
  } else {
    if (noteList.contains(emptyListMsg)) {
      noteList.removeChild(emptyListMsg);
    }
    isFillerTextVisible = false;
    emptyListMsg.style.display = "none";
  }
}
noteList.addEventListener("dblclick", (e) => {
  const target = e.target;
  const li = target.closest("li");
  if (!li || !noteList.contains(li)) return;
  if (li.classList.contains("selectedItem")) {
    li.classList.remove("selectedItem");
  } else {
    li.classList.add("selectedItem");
  }
  if (isEditActive && li.classList.contains("selectedItem")) {
    editBtnClickHandler(li);
  }
});
function editBtnClickHandler(target) {
  if (target.tagName !== "LI") return;
  Note.editNote(target);
}
function addRemoveNoteBtns() {
  Array.from(noteList.children).forEach((child) => {
    const removeNoteBtn = document.createElement("button");
    removeNoteBtn.classList.add("btn");
    removeNoteBtn.classList.add("removeNoteBtn");
    removeNoteBtn.style.justifyContent = "center";
    removeBtn.style.alignItems = "center";
    const img = document.createElement("img");
    img.src = "SVG/minus.svg";
    img.classList.add("minus");
    removeNoteBtn.appendChild(img);
    child.appendChild(removeNoteBtn);
    removeNoteBtn.addEventListener("click", (e) => {
      const target = e.target;
      if (!target) return;
      const noteListItemWrapper = target.closest(".noteListItemWrapper");
      if (!noteListItemWrapper) return;
      const note = noteListItemWrapper.querySelector(".listElement");
      const noteID = note?.id;
      console.log("noteID when deleting stuff", noteID);
      storage.remove(`${noteID}`);
      noteListItemWrapper.remove();
      checkNodeListChildren();
    });
  });
}
function closeRemoveNoteBtns() {
  Array.from(noteList.children).forEach((child) => {
    const removeNoteBtn = child.querySelector(".removeNoteBtn");
    if (removeNoteBtn) {
      removeNoteBtn.remove();
    }
  });
}
document.addEventListener("DOMContentLoaded", () => {
  loadLocalStorageKeys();
});
function loadLocalStorageKeys() {
  const notes = storage.loadLocalStorage();
  if (notes.length !== 0) {
    for (let i = 0; i < notes.length; i++) {
      console.log(storage.get(notes[i]));
      let noteValue = storage.get(notes[i]);
      todoValueInputField.value = noteValue;
      ClickAddNoteHandler();
    }
  }
}
todoValueInputField.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && todoValueInputField.value == "//reset") {
    reset();
    window.location.reload();
  }
});
function reset() {
  storage.clear();
  todoValueInputField.value = "";
  todoValueInputField.placeholder = "reset successful!";
  const children = noteList.querySelectorAll(".noteListItemWrapper");
  children.forEach((child) => child.remove());
  checkNodeListChildren();
}
todoValueInputField.addEventListener("input", () => {
  if (todoValueInputField.value === "//reset") {
    todoValueInputField.style.color = "#ff1818ff";
  } else {
    todoValueInputField.style.color = "#ffffff";
    todoValueInputField.placeholder = "enter your thoughts here";
  }
});
//# sourceMappingURL=index.js.map

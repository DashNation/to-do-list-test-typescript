import * as storage from "./storage";

const addBtn = document.getElementById("addBtn") as HTMLButtonElement;
const editBtn = document.getElementById("editBtn") as HTMLButtonElement;
const removeBtn = document.getElementById("removeBtn") as HTMLButtonElement;
const todoValueInputField = document.getElementById(
  "todoValueInputField"
) as HTMLInputElement;
const noteList = document.getElementById("noteList") as HTMLUListElement;
let noteCount: number = 0;
let isEditActive: boolean = false;
let isRemoveActive: boolean = false;
let isFillerTextVisible: boolean = true;

// cSpell:disable-next-line
//hotkeys um buttons oben zu aktivieren und zu deaktivieren
window.addEventListener("keydown", (e: KeyboardEvent) => {
  if (e.key.toLocaleLowerCase() === "e" && e.altKey) {
    isEditActive = !isEditActive;
    if (isEditActive) {
      editBtn.classList.add("active");
    } else {
      editBtn.classList.remove("active");
    }
  }
});

window.addEventListener("keydown", (e: KeyboardEvent) => {
  if (e.key.toLocaleLowerCase() === "r" && e.altKey) {
    isRemoveActive = !isRemoveActive;
    if (isRemoveActive) {
      removeBtn.classList.add("active");
      if (!isFillerTextVisible) {
        addRemoveNoteBtns();
      } else {
        removeRemoveNoteBtns();
      }
    } else {
      removeBtn.classList.remove("active");
      if (!isFillerTextVisible) {
        removeRemoveNoteBtns();
      }
    }
  }
});

class Note {
  note: string;
  id: number;

  constructor(note: string) {
    this.note = todoValueInputField.value.trim();
    this.id = noteCount++;
  }

  addNote(): void {
    if (this.note !== "") {
      const noteListItemWrapper = document.createElement(
        "div"
      ) as HTMLDivElement;
      noteListItemWrapper.classList.add("noteListItemWrapper");
      noteListItemWrapper.style.display = "flex";
      noteListItemWrapper.style.flexDirection = "row";
      noteListItemWrapper.style.justifyContent = "start";
      noteListItemWrapper.style.alignItems = "center";
      noteListItemWrapper.style.width = "100%";
      noteListItemWrapper.style.height = "100%";
      noteList.appendChild(noteListItemWrapper);

      const noteListItem = document.createElement("li") as HTMLLIElement;
      noteListItem.classList.add("listElement");
      noteListItem.innerHTML = this.note;
      noteListItem.id = `${this.id}`;
      storage.add(`note${this.id}`, this.note);
      noteListItemWrapper.appendChild(noteListItem);
    }
  }

  static editNote(target: HTMLElement): void {
    //cSpell: disable-next-line
    //Wrapper der das InputFeld und die Buttons zusammen schön aligned
    const targetID = target.id;
    console.log("targetID", targetID);
    const userInputWrapper = document.createElement("div") as HTMLDivElement;
    userInputWrapper.id = "userInputWrapper";
    userInputWrapper.style.display = "flex";
    userInputWrapper.style.flexDirection = "row";
    userInputWrapper.style.alignItems = "center";
    userInputWrapper.style.justifyContent = "space-between";
    userInputWrapper.style.gap = "0.05rem";
    noteList.appendChild(userInputWrapper);
    //cSpell: disable-next-line
    //inputfield wird erstellt
    const noteListItemContent = target.textContent || "";
    const userInputField = document.createElement("input") as HTMLInputElement;
    userInputField.value = noteListItemContent;
    userInputField.id = "userInputField";
    userInputField.classList.add("userInputField");
    userInputField.type = "text";

    // cSpell: disable-next-line
    //erstellen der Buttons
    //checkBtn
    const checkBtn = document.createElement("button") as HTMLButtonElement;
    checkBtn.classList.add("checkBtn");
    checkBtn.classList.add("btn");
    const checkImg = document.createElement("img") as HTMLImageElement;
    checkImg.src = "SVG/checkMark24.svg";
    checkImg.classList.add("check");
    checkBtn.appendChild(checkImg);

    //crossBtn
    const crossBtn = document.createElement("button") as HTMLButtonElement;
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
      const noteListItem = document.createElement("li") as HTMLLIElement;
      let noteListItemContent = noteListItem.value;
      storage.edit(`note${targetID}`, userInputField.value);
      noteListItem.textContent = userInputField.value;
      noteListItem.classList.add("listElement");
      userInputWrapper.replaceWith(noteListItem);
      checkBtn.remove();
      crossBtn.remove();
    }

    function stopEdit(noteListItemContent: string) {
      const noteListItem = document.createElement("li") as HTMLLIElement;
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

    userInputField.addEventListener("keydown", (e: KeyboardEvent) => {
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

//Add Btn Event listener
addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  ClickAddNoteHandler();
});

//Edit Btn Event Listener
editBtn.addEventListener("click", (e) => {
  //   console.log("Edit Btn Clicked!");
  isEditActive = !isEditActive;
  //   console.log(`EditBtnState: ${isEditActive}`);
  if (isEditActive) {
    editBtn.classList.add("active");
  } else {
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
    if (!isFillerTextVisible) {
      addRemoveNoteBtns();
    } else {
      removeRemoveNoteBtns();
    }
  } else {
    removeBtn.classList.remove("active");
    removeRemoveNoteBtns();
  }
});

todoValueInputField.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    ClickAddNoteHandler();
  }
});
//cSpell: disable-next-line
//Funktion die bei einem Button click aufgerufen wird
function ClickAddNoteHandler() {
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
document.addEventListener("change", checkNodeListChildren); // cSpell: disable-next-line
let emptyListMsg = document.createElement("p") as HTMLParagraphElement; // erste eklaration des filler texts
function checkNodeListChildren() {
  const listItems = noteList.querySelectorAll("li");
  if (listItems.length === 0) {
    if (!noteList.contains(emptyListMsg)) {
      //cSpell: disable-next-line
      emptyListMsg = document.createElement("p") as HTMLParagraphElement; // zweite deklaration die deklariert wird wenn die Liste wieder leer wird
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

//Giving noteList children events
noteList.addEventListener("dblclick", (e) => {
  const target = e.target as HTMLElement;
  const li = target.closest("li") as HTMLElement;
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

function editBtnClickHandler(target: HTMLElement) {
  if (target.tagName !== "LI") return;
  Note.editNote(target);
}

function addRemoveNoteBtns() {
  Array.from(noteList.children).forEach((child) => {
    const removeNoteBtn = document.createElement("button") as HTMLButtonElement;
    removeNoteBtn.classList.add("btn");
    removeNoteBtn.classList.add("removeNoteBtn");
    removeNoteBtn.style.justifyContent = "center";
    removeBtn.style.alignItems = "center";
    const img = document.createElement("img") as HTMLImageElement;
    img.src = "SVG/minus.svg";
    img.classList.add("minus");
    removeNoteBtn.appendChild(img);
    child.appendChild(removeNoteBtn);
    removeNoteBtn.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const noteListItemWrapper = target.closest(".noteListItemWrapper");
      if (!noteListItemWrapper) return;
      //Getting the ID and removing it
      const note = noteListItemWrapper.querySelector(".listElement");
      const noteID = note?.id;
      console.log("noteID when deleting stuff", noteID);
      storage.remove(`note${noteID}`);
      //localStorage remove stuff ends here
      noteListItemWrapper.remove();
      checkNodeListChildren();
    });
  });
}

function removeRemoveNoteBtns() {
  Array.from(noteList.children).forEach((child) => {
    const removeNoteBtn = child.querySelector(".removeNoteBtn");
    if (removeNoteBtn) {
      removeNoteBtn.remove();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadNotesFromLocalStorage();
});
//Testing a function I made
function loadNotesFromLocalStorage() {
  const notes: number[] = storage.getFilteredBy("note");
  if (notes.length !== 0) {
    for (let i = 0; i < notes.length; i++) {
      console.log(storage.get(notes[i]));
      let noteValue: string = storage.get(notes[i]);
      todoValueInputField.value = noteValue;
      ClickAddNoteHandler();
    }
  }
}

//! DON'T FORGET TO ADD .JS TO THE IMPORTS IN THE INDEX.JS FILE

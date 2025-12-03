//cSpell: disable
//TODO: Ich möchte einbauen das wenn man die notes Editieren oder Löschen möchte das man den Editieren oder Löschen Knopf
// TODO mit anclicken an und aus toggelt und dann im active toggle modus per doppelclick eine beliebige note löschen kann
//cSpell: enable

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
    } else {
      removeBtn.classList.remove("active");
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
      const noteListItem = document.createElement("li") as HTMLLIElement;
      noteListItem.classList.add("listElement");
      noteListItem.innerHTML = this.note;
      noteListItem.id = `${this.id}`;
      noteList.appendChild(noteListItem);
    }
  }

  static editNote(target: HTMLElement): void {
    //cSpell: disable-next-line
    //Wrapper der das InputFeld und die Buttons zusammen schön aligned
    const userInputWrapper = document.createElement("div") as HTMLDivElement;
    userInputWrapper.id = "userInputWrapper";
    userInputWrapper.style.display = "flex";
    userInputWrapper.style.flexDirection = "row";
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
  ClickAddNoteHandler(e);
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
  } else {
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
function ClickAddNoteHandler(event: Event) {
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
const emptyListMsg = document.createElement("p") as HTMLParagraphElement;
function checkNodeListChildren() {
  const listItems = noteList.querySelectorAll("li");
  if (listItems.length === 0) {
    if (!noteList.contains(emptyListMsg)) {
      emptyListMsg.innerHTML = "No thoughts collected...";
      emptyListMsg.id = "emptyListTxt";
      noteList.appendChild(emptyListMsg);
    }
    emptyListMsg.style.display = "block";
  } else {
    emptyListMsg.style.display = "none";
    noteList.removeChild(emptyListMsg);
  }
}

//Giving noteList children events
noteList.addEventListener("dblclick", (e) => {
  console.log("dblclick found!");
  const target = e.target as HTMLElement;
  if (target.tagName !== "LI")
    return console.log("returned from dblclick event!");
  if (target.classList.contains("selectedItem")) {
    console.log("SELECTED ALREADY!!!");
    target.classList.remove("selectedItem");
  } else {
    target.classList.add("selectedItem");
    console.log("added class");
  }
  if (isEditActive && target.classList.contains("selectedItem")) {
    editBtnClickHandler(target);
  }
});

function editBtnClickHandler(target: HTMLElement) {
  if (target.tagName !== "LI") return;
  Note.editNote(target);
}

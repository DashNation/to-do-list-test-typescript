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
});

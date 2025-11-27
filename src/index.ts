const addBtn = document.getElementById("addBtn") as HTMLButtonElement;
const editBtn = document.getElementById("editBtn") as HTMLButtonElement;
const removeBtn = document.getElementById("removeBtn") as HTMLButtonElement;
const todoValueInputField = document.getElementById(
  "todoValueInputField"
) as HTMLInputElement;
const noteList = document.getElementById("noteList") as HTMLUListElement;
let noteCount: number = 0;

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

//Funktion die bei einem Button click aufgerufen wird
function ClickAddNoteHandler(event: Event) {
  console.log("add Button clicked!");
  if (todoValueInputField.value !== "") {
    let note = new Note(todoValueInputField.value);
    note.addNote();
    todoValueInputField.value = "";
  }
}

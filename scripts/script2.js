const titleElement = document.getElementById("noteTitle");
const bodyElement = document.getElementById("noteBody");
const removeElement = document.getElementById("removeNote");
const dateElement = document.getElementById("lastEdited");
const noteId = location.hash.substring(1);
const notes = getSavedNotes();
const note = notes.find(function (note) {
  return note.id === noteId;
});

if (note === undefined) {
  location.assign("/notes-app/index.html");
}

titleElement.value = note.title;
bodyElement.value = note.body;
dateElement.textContent = generateLastEdited(note.updatedAt);

titleElement.addEventListener("input", function (evt) {
  note.title = evt.target.value;
  note.updatedAt = moment().valueOf();
  dateElement.textContent = generateLastEdited(note.updatedAt);
  saveNotes(notes);
});

bodyElement.addEventListener("input", function (evt) {
  note.body = evt.target.value;
  note.updatedAt = moment().valueOf();
  dateElement.textContent = generateLastEdited(note.updatedAt);
  saveNotes(notes);
});

removeElement.addEventListener("click", function (evt) {
  removeNote(note.id);
  saveNotes(notes);
  location.assign("/notes-app/index.html");
});

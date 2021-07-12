// read existing notes from localStorage
const getSavedNotes = function () {
  const notesJSON = localStorage.getItem("notes");

  if (notesJSON !== null) {
    return JSON.parse(notesJSON);
  } else {
    return [];
  }
};

// save notes to localstorage
const saveNotes = function (notesData) {
  localStorage.setItem("notes", JSON.stringify(notesData));
};

// remove a note from the list
const removeNote = function (id) {
  const noteIndex = notes.findIndex(function (note) {
    return note.id === id;
  });

  if (noteIndex > -1) {
    notes.splice(noteIndex, 1);
  }
};

// generate the DOM structure
const generateNoteDOM = function (note) {
  const noteEl = document.createElement("a");
  const textEl = document.createElement("p");
  const statusEl = document.createElement("p");

  // setup the remove note button
  // button.textContent = "x";
  // noteEl.appendChild(button);
  // button.addEventListener("click", function (e) {
  //   removeNote(note.id);
  //   saveNotes(notes);
  //   renderNotes(notes, filters);
  // });

  if (note.title.length > 0) {
    textEl.textContent = note.title;
  } else {
    textEl.textContent = "no title note";
  }
  textEl.classList.add("list-item__title");
  noteEl.appendChild(textEl);

  // link setup
  noteEl.setAttribute("href", `/notes-app/edit.html#${note.id}`);
  noteEl.classList.add("list-item");

  // status message
  statusEl.textContent = generateLastEdited(note.updatedAt);
  statusEl.classList.add("list-item__subtitle");
  noteEl.appendChild(statusEl);

  return noteEl;
};

// sort notes
function sortNotes(notes, sortBy) {
  if (sortBy === "byEdited") {
    return notes.sort((a, b) => b.updatedAt - a.updatedAt);
  } else if (sortBy === "byCreated") {
    return notes.sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return 1;
      } else if (a.createdAt < b.createdAt) {
        return -1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === "byAlphabet") {
    return notes.sort((a, b) => {
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      } else if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      } else {
        return 0;
      }
    });
  } else {
    return notes;
  }
}

// render notes
const renderNotes = function (notesData, filtersData) {
  notesData = sortNotes(notesData, filtersData.sortBy);
  const filteredNotes = notesData.filter(function (noteData) {
    return noteData.title
      .toLowerCase()
      .includes(filtersData.searchText.toLowerCase());
  });

  document.getElementById("notes").innerHTML = "";

  filteredNotes.forEach(function (note) {
    const noteEl = generateNoteDOM(note);
    document.getElementById("notes").appendChild(noteEl);
  });

  console.log(notesData);
};

// generate the last edit message
let generateLastEdited = function (timestamp) {
  return `Last edited ${moment(timestamp).fromNow()}`;
};

let notes = getSavedNotes();

const filters = {
  searchText: "",
  sortBy: "byEdited",
};

renderNotes(notes, filters);

document
  .getElementById("searchText")
  .addEventListener("input", function (event) {
    filters.searchText = event.target.value;
    renderNotes(notes, filters);
  });

document
  .getElementById("filterBy")
  .addEventListener("change", function (event) {
    filters.sortBy = event.target.value;
    renderNotes(notes, filters);
  }); 

document
  .getElementById("createNote")
  .addEventListener("click", function (event) {
    const id = uuid();
    const timeStamp = moment().valueOf();
    notes.push({
      id: id,
      title: "",
      body: "",
      createdAt: timeStamp,
      updatedAt: timeStamp,
    });
    saveNotes(notes); // notes is stringified
    location.assign(`/notes-app/edit.html#${id}`);
  });
  
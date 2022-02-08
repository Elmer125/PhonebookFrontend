import { Note } from "./Note";
import React, { useState, useEffect } from "react";
import noteService from "../../services/notes";
export const Notas = () => {
  const [notas, setnotas] = useState([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    noteService.getAll().then((resut) => {
      setnotas(resut.data);
    });
  }, []);
  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    };
    noteService.create(noteObject).then((response) => {
      console.log(response);
      setnotas(notas.concat(response.data));
      setNewNote("");
    });
  };
  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  };

  const toggleImportance = (id) => {
    const note = notas.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };
    noteService.update(id, changedNote).then((response) => {
      setnotas(notas.map((note) => (note.id !== id ? note : response.data)));
    });
  };

  const notesToShow = showAll ? notas : notas.filter((note) => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={() => setShowAll(!showAll)}>
        Show {showAll ? "Important" : "All"}
      </button>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportance(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

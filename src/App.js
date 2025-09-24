import React, { useState } from "react";
import NotesList from "./components/NotesList";
import NoteEditor from "./components/NoteEditor";
import SearchBar from "./components/SearchBar";
import { useLocalStorage } from "./hooks/useLocalStorage";
import "./styles/App.css";

function App() {
  const [notes, setNotes] = useLocalStorage("notes", []);
  const [currentNote, setCurrentNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showEditor, setShowEditor] = useState(false);

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      title: "Ghi chú mới",
      content: "# Tiêu đề\n\nViết ghi chú của bạn ở đây...",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    // Lấy lại note mới nhất từ mảng updatedNotes (đảm bảo đồng bộ object)
    const latestNote = updatedNotes.find((n) => n.id === newNote.id);
    setCurrentNote(latestNote);
    setShowEditor(true);
  };

  const updateNote = (updatedNote) => {
    const updated = notes.map((note) =>
      note.id === updatedNote.id
        ? { ...updatedNote, updatedAt: new Date().toISOString() }
        : note
    );
    setNotes(updated);
    setCurrentNote(updatedNote); // 🔥 quan trọng để đồng bộ state
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
    if (currentNote?.id === id) {
      setCurrentNote(null);
      setShowEditor(false);
    }
  };

  const openNote = (note) => {
    setCurrentNote(note);
    setShowEditor(true);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>📝 My Notes</h1>
        <button className="add-note-btn" onClick={addNote}>
          + Thêm ghi chú
        </button>
      </header>

      <div className="app-content">
        {!showEditor ? (
          <div className="notes-view">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <NotesList
              notes={filteredNotes}
              onOpenNote={openNote}
              onDeleteNote={deleteNote}
            />
          </div>
        ) : (
          <NoteEditor
            note={currentNote}
            onUpdateNote={updateNote}
            onClose={() => setShowEditor(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;

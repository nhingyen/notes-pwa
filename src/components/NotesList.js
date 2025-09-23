import React from "react";

const NotesList = ({ notes, onOpenNote, onDeleteNote }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const getPreview = (content) => {
    return (
      content
        .replace(/#+\s/g, "")
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .substring(0, 100) + "..."
    );
  };

  if (notes.length === 0) {
    return (
      <div className="empty-state">
        <p>Chưa có ghi chú nào. Tạo ghi chú đầu tiên của bạn!</p>
      </div>
    );
  }

  return (
    <div className="notes-list">
      {notes.map((note) => (
        <div key={note.id} className="note-item">
          <div className="note-content" onClick={() => onOpenNote(note)}>
            <h3 className="note-title">{note.title}</h3>
            <p className="note-preview">{getPreview(note.content)}</p>
            <span className="note-date">{formatDate(note.updatedAt)}</span>
          </div>
          <button
            className="delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteNote(note.id);
            }}
          >
            🗑️
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotesList;

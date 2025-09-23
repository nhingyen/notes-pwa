import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

const NoteEditor = ({ note, onUpdateNote, onClose }) => {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [isPreview, setIsPreview] = useState(false);
  const prevNoteId = useRef(null);

  // Chỉ update state khi mở note mới (không ghi đè khi đang gõ)
  useEffect(() => {
    if (note && note.id !== prevNoteId.current) {
      setTitle(note.title ?? "");
      setContent(note.content ?? "");
      prevNoteId.current = note.id;
    }
  }, [note]);

  const handleSave = () => {
    if (note) {
      onUpdateNote({
        ...note,
        title: title || "Không có tiêu đề",
        content: content,
      });
    }
  };

  return (
    <div className="note-editor">
      <div className="editor-header">
        <button
          className="back-btn"
          onClick={() => {
            handleSave();
            onClose();
          }}
        >
          ← Quay lại
        </button>
        <button
          className="preview-btn"
          onClick={() => setIsPreview(!isPreview)}
        >
          {isPreview ? "✏️ Chỉnh sửa" : "👁️ Xem trước"}
        </button>
        {/* <button className="save-btn" onClick={handleSave}>
          💾 Lưu
        </button> */}
      </div>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Tiêu đề ghi chú..."
        className="note-title-input"
      />

      <div className="editor-content">
        {!isPreview ? (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`Viết ghi chú của bạn ở đây... (Hỗ trợ Markdown)

Thử viết:
# Tiêu đề
**Chữ đậm**
*Chữ nghiêng*
- Danh sách`}
            className="note-textarea"
          />
        ) : (
          <div className="markdown-preview">
            <ReactMarkdown>{content || "*Chưa có nội dung*"}</ReactMarkdown>
          </div>
        )}
      </div>

      <div className="markdown-help">
        <p>
          💡 <strong>Markdown shortcuts:</strong> # Tiêu đề, **Bold**, *Italic*,
          - Danh sách | <strong>Ctrl+S</strong> để lưu nhanh
        </p>
      </div>
    </div>
  );
};

export default NoteEditor;

import { useState, forwardRef, useRef, useEffect } from "react";
import { FiX, FiCheck, FiEdit, FiTrash } from "react-icons/fi";
import { useBoardContext } from "../../contexts";
import { AutoResizeTextarea } from "../shared";

export const Card = forwardRef(function Card(
  { listId, card, draggableProps, dragHandleProps, isDragging },
  ref,
) {
  const { deleteCard, editCard } = useBoardContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(card.title);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [isEditing]);

  function handleSubmit(e) {
    e.preventDefault();
    if (editedTitle.trim()) {
      editCard(card.id, { ...card, title: editedTitle });
      setIsEditing(false);
    }
  }


  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit(e);
    }
    if (e.key === "Escape") {
      setIsEditing(false);
      setEditedTitle(card.title);
    }
  }

  return (
    <div
      ref={ref}
      {...draggableProps}
      className={`group relative mb-1.5 w-full ${isDragging ? "z-50" : ""}`}
    >
      <div
        {...dragHandleProps}
        className={`border-1 mb-1.5 rounded-lg border-border bg-bg-card p-2 text-sm text-text-primary shadow hover:border-border-hover hover:bg-bg-card-hover ${isDragging ? "shadow-lg" : ""}`}
      >
        {isEditing ? (
          <form
            onSubmit={handleSubmit}
            className="flex w-full items-center gap-2"
          >
            <AutoResizeTextarea
              value={editedTitle}
              ref={textareaRef}
              onChange={(e) => {
                setEditedTitle(e.target.value);
              }}
              onKeyDown={handleKeyDown}
              className="w-full resize-none rounded-md border-border bg-secondary p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="rounded-md p-1 text-green-600 hover:bg-green-400 hover:text-white"
            >
              <FiCheck size={16} /> 
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditedTitle(card.title);
              }}
              className="rounded-md p-1 text-red-600 hover:bg-red-400 hover:text-white"
            >
              <FiX size={16} /> 
            </button>
          </form>
        ) : (
          <div className="flex w-full max-w-full items-center justify-between">
            <div className="w-full max-w-full">
              <span
                className="break-words"
              >
                {card.title}
              </span>
            </div>
            <div
              className="absolute right-2 top-1.5 hidden gap-0 rounded-md bg-bg-card-hover text-text-secondary 
                  transition-opacity duration-300 group-hover:flex"
            >
              <button
                onClick={() => setIsEditing(true)}
                className="rounded-md p-1 transition-colors duration-200 hover:bg-bg-card"
              >
                <FiEdit size={15} />
              </button>{" "}
              <button
                onClick={() => deleteCard(listId, card.id)}
                className="rounded-md p-1 transition-colors duration-200 hover:bg-bg-card hover:text-red-500"
              >
                <FiTrash size={15} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

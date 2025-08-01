import { useState, useRef, useEffect } from "react";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import { AutoResizeTextarea } from "../shared";
import { toast } from "react-toastify";

export const AddNew = ({ type, multiAddMode = true, handleAddNew, id }) => {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current && isAddingNew) {
      const timeoutFocus = setTimeout(() => {
        inputRef.current.focus();
      }, 0);
      return () => clearTimeout(timeoutFocus);
    }
  }, [isAddingNew]);

  function handleSubmit() {
    if (newTitle.trim()) {
      if (id) {
        handleAddNew(id, newTitle);
      } else {
        handleAddNew(newTitle);
      }
      setNewTitle("");
      toast.success(`New ${type} added successfully`, { autoClose: 2000 });
    }
    if (multiAddMode) {
      inputRef.current?.focus();
    } else {
      setIsAddingNew(false);
    }
  }

  function handleCancel() {
    setIsAddingNew(false);
    setNewTitle("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === "Escape") {
      e.preventDefault();
      handleCancel();
    }
  }

  function handleBlur() {
    if (newTitle.trim()) {
      handleSubmit();
      setIsAddingNew(false);
    } else {
      handleCancel();
    }
  }

  if (!isAddingNew) {
    return (
      <button
        onClick={() => setIsAddingNew(true)}
        className="flex w-full items-center gap-2 rounded-md bg-primary p-2 text-sm text-text-primary hover:bg-bg-card"
      >
        <AiOutlinePlus />
        <span>Add new {type}</span>
      </button>
    );
  }

  return (
    <div className="flex h-min w-full flex-col space-y-1 rounded-lg p-1 text-text-primary">
      <AutoResizeTextarea
        placeholder="Enter a title..."
        value={newTitle}
        ref={inputRef}
        onChange={(e) => setNewTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        className="mb-1 resize-none rounded-md border-border bg-bg-card p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          className="flex-grow rounded-md bg-accent px-3 py-1.5 text-sm text-primary hover:bg-accent-hover"
        >
          Add {type}
        </button>
        <button
          onClick={handleCancel}
          className="rounded-md bg-secondary px-3 py-1.5 text-sm hover:bg-primary"
        >
          <AiOutlineClose />
        </button>
      </div>
    </div>
  );
};

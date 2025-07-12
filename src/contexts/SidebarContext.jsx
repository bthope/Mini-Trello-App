import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showBoardCreator, setShowBoardCreator] = useState(false);
  const [activePopoverBoard, setActivePopoverBoard] = useState(null);
  const [editingBoardId, setEditingBoardId] = useState(null);

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        setIsCollapsed,
        showBoardCreator,
        setShowBoardCreator,
        activePopoverBoard,
        setActivePopoverBoard,
        editingBoardId,
        setEditingBoardId,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSidebar = () => useContext(SidebarContext);

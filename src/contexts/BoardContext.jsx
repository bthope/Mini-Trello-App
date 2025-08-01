import { initialData } from "../initialData";
import { createContext, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";

const BoardContext = createContext();

export function BoardProvider({ children }) {
  const [boardsData, setBoardsData] = useLocalStorage("boardsData", {
    boards: initialData.boards,
    lists: initialData.lists,
    cards: initialData.cards,
    activeBoardId: "board-1",
  });

  // Board management functions
  const addNewBoard = (title, color) => {
    const newBoardId = `board-${uuidv4()}`;

    setBoardsData((prevData) => ({
      ...prevData,
      boards: {
        ...prevData.boards,
        [newBoardId]: {
          id: newBoardId,
          title: title,
          color: color,
          listIds: [],
        },
      },
      activeBoardId: newBoardId,
    }));
  };

  const switchBoard = (boardId) => {
    setBoardsData((prevData) => ({
      ...prevData,
      activeBoardId: boardId,
    }));
  };

  const deleteBoard = (boardId) => {
    // Return if there's one or less boards
    // if (Object.keys(boardsData.boards).length <= 1) return;

    setBoardsData((prevData) => {
      const { [boardId]: deletedBoard, ...remainingBoards } = prevData.boards;
      const remainingLists = { ...prevData.lists };
      const remainingCards = { ...prevData.cards };

      deletedBoard.listIds.forEach((listId) => {
        const list = remainingLists[listId];
        if (list) {
          // Delete all cards in the list
          list.cardIds.forEach((cardId) => {
            delete remainingCards[cardId];
          });
          // Finally delete the list
          delete remainingLists[listId];
        }
      });

      const newActiveBoardId =
        boardId === prevData.activeBoardId
          ? Object.keys(remainingBoards).length > 0
            ? Object.keys(remainingBoards)[0]
            : null
          : prevData.activeBoardId;

      return {
        ...prevData,
        boards: remainingBoards,
        lists: remainingLists,
        cards: remainingCards,
        activeBoardId: newActiveBoardId,
      };
    });
  };

  function editBoard(boardId, newBoardTitle) {
    setBoardsData((prevData) => ({
      ...prevData,
      boards: {
        ...prevData.boards,
        [boardId]: {
          ...prevData.boards[boardId],
          title: newBoardTitle,
        },
      },
    }));
  }

  // List management functions
  function addNewList(title) {
    const newListId = `list-${uuidv4()}`;
    const activeBoard = boardsData.boards[boardsData.activeBoardId];

    setBoardsData((prevData) => ({
      ...prevData,
      lists: {
        ...prevData.lists,
        [newListId]: {
          id: newListId,
          title: title,
          cardIds: [],
        },
      },
      boards: {
        ...prevData.boards,
        [activeBoard.id]: {
          ...activeBoard,
          listIds: [...activeBoard.listIds, newListId],
        },
      },
    }));
  }

  function editList(listId, newTitle) {
    setBoardsData((prevData) => ({
      ...prevData,
      lists: {
        ...prevData.lists,
        [listId]: {
          ...prevData.lists[listId],
          title: newTitle,
        },
      },
    }));
  }

  function deleteList(listId) {
    const activeBoard = boardsData.boards[boardsData.activeBoardId];
    // fetch the list associated w the listId
    const list = boardsData.lists[listId];
    // get all the cards
    const remainingCards = { ...boardsData.cards };

    // delete the cards that belong to the list
    list.cardIds.forEach((cardId) => delete remainingCards[cardId]);

    // create new lists object and delete the list
    const remainingLists = { ...boardsData.lists };
    delete remainingLists[listId];

    setBoardsData((prevData) => ({
      ...prevData,
      lists: remainingLists,
      cards: remainingCards,
      boards: {
        ...prevData.boards,
        [activeBoard.id]: {
          ...activeBoard,
          listIds: activeBoard.listIds.filter((id) => id !== listId),
        },
      },
    }));
  }

  // Card management functions
  function addNewCard(listId, cardTitle) {
    const newCardId = `card-${uuidv4()}`;
    const newCard = {
      id: newCardId,
      title: cardTitle,
      description: "",
      labels: "",
      completed: false,
      createdAt: new Date().toISOString(), // Track creation time
    };

    setBoardsData((prevData) => {
      const list = prevData.lists[listId];
      return {
        ...prevData,
        cards: { ...prevData.cards, [newCardId]: newCard },
        lists: {
          ...prevData.lists,
          [listId]: {
            ...list,
            cardIds: [...list.cardIds, newCardId],
          },
        },
      };
    });
  }

  function deleteCard(listId, cardId) {
    setBoardsData((prevData) => {
      const list = prevData.lists[listId];
      const remainingCards = { ...prevData.cards };
      delete remainingCards[cardId];
      return {
        ...prevData,
        cards: remainingCards,
        lists: {
          ...prevData.lists,
          [listId]: {
            ...list,
            cardIds: list.cardIds.filter((id) => id !== cardId),
          },
        },
      };
    });
  }

  function editCard(cardId, updatedCard) {
    setBoardsData((prevData) => ({
      ...prevData,
      cards: {
        ...prevData.cards,
        [cardId]: {
          ...prevData.cards[cardId],
          ...updatedCard,
        },
      },
    }));
  }

  // Function to handle what happens when dragging ends
  function handleDragEnd(result) {
    const { destination, source, type } = result;
    // If there's no destination (dropped outside), do nothing
    if (!destination) return;

    const activeBoard = boardsData.boards[boardsData.activeBoardId];

    // Handle list reordering
    if (type === "list") {
      const newListIds = Array.from(activeBoard.listIds);
      const [movedList] = newListIds.splice(source.index, 1);
      newListIds.splice(destination.index, 0, movedList);

      setBoardsData((prevData) => ({
        ...prevData,
        boards: {
          ...prevData.boards,
          [activeBoard.id]: {
            ...activeBoard,
            listIds: newListIds,
          },
        },
      }));
      return;
    }

    // Handle card reordering
    const sourceList = boardsData.lists[source.droppableId];
    const destList = boardsData.lists[destination.droppableId];

    // If moving to same list
    if (sourceList === destList) {
      const newCardIds = Array.from(sourceList.cardIds);
      const [movedCard] = newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, movedCard);

      setBoardsData((prevData) => ({
        ...prevData,
        lists: {
          ...prevData.lists,
          [sourceList.id]: {
            ...sourceList,
            cardIds: newCardIds,
          },
        },
      }));
    } else {
      // If moving to different list
      const sourceCardIds = Array.from(sourceList.cardIds);
      const destCardIds = Array.from(destList.cardIds);

      const [movedCard] = sourceCardIds.splice(source.index, 1);
      destCardIds.splice(destination.index, 0, movedCard);

      setBoardsData((prevData) => ({
        ...prevData,
        lists: {
          ...prevData.lists,
          [sourceList.id]: {
            ...sourceList,
            cardIds: sourceCardIds,
          },
          [destList.id]: {
            ...destList,
            cardIds: destCardIds,
          },
        },
      }));
    }
  }

  const value = {
    boards: boardsData.boards,
    lists: boardsData.lists,
    cards: boardsData.cards,
    activeBoardId: boardsData.activeBoardId,
    addNewBoard,
    switchBoard,
    deleteBoard,
    editBoard,
    addNewList,
    deleteList,
    editList,
    addNewCard,
    editCard,
    deleteCard,
    onDragEnd: handleDragEnd,
  };

  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useBoardContext() {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error("useBoardContext must be used within a BoardProvider");
  }
  return context;
}

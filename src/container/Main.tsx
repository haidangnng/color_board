import { useCallback, useEffect } from "react"
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useAppDispatch } from "../app/hooks";
import Maze from "../component/Maze";
import { createMaze } from "../features/Maze";

const Main: React.FC = () => {
  const dispatch = useAppDispatch();

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleCreateMaze = useCallback(() => {
    const maze = [...Array(8)].map(x => Array.from({length: 8}, () => getRandomColor()))

    dispatch(createMaze(maze));
  }, [dispatch]);

  useEffect(() => {
    handleCreateMaze()
  }, [handleCreateMaze])
  
  return (
    <DndProvider backend={HTML5Backend}>
      <Maze />
    </DndProvider>
  )
}

export default Main
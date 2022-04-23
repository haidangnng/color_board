import { useCallback, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { createMaze, selectDragCell, selectMaze, setDragItem } from "../../features/Maze"

interface MazeRowsProps {
  cellValues: string[];
  rowPosition: number;
}

export interface MazeCellProps {
  value: string;
  position: [number, number]
}

const MazeCell: React.FC<MazeCellProps> = (props) => {
  const { value, position } = props;
  const dispatch = useAppDispatch()
  const dragCell = useAppSelector(selectDragCell);
  const maze = useAppSelector(selectMaze);
  
  const [{ item, isDragging }, drag] = useDrag(() => ({
    type: 'cell',
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
      item: monitor.getItem()
    }),
    item: {
      ...props
    }
  }), [maze])

  const compareCell = (targetCell: MazeCellProps, currentCell: MazeCellProps) => {
    return JSON.stringify(targetCell) !== JSON.stringify(currentCell)
  }

  useEffect(() => {
    if (item && compareCell(item, dragCell)) {
      console.log('item', item)
      console.log('dragCell', dragCell)
      dispatch(setDragItem(item))
    };
  }, [item, dispatch, dragCell])

  const handleUpdateMaze = useCallback((dropCell, dragCell) => {
    console.log({dropCell, dragCell})
    if (!maze) return;
    const { value: dragValue, position: [dragRow, dragCol] } = dragCell;
    const { value: dropValue, position: [dropRow, dropCol] } = dropCell;

    const newMaze = JSON.parse(JSON.stringify(maze));
    newMaze[dragRow][dragCol] = dropValue;
    newMaze[dropRow][dropCol] = dragValue;

    dispatch(createMaze(newMaze));
  }, [dispatch, maze]);

  const [_, drop] = useDrop(
    () => ({
      accept: 'cell',
      drop: () => handleUpdateMaze({value, position}, dragCell),
    }),
    [value, position, dragCell]
  )

  return (
    <div ref={drop}>
      <div ref={drag} style={{
        display: "flex"
      }}>
        <svg width="50" height="50" >
          <rect
            width="50" 
            height="50"
            style={{
              fill: `#${value}`,
              opacity: isDragging ? 0.5 : 1,
              strokeWidth: 1,
              stroke: 'black'
            }}
          />
        </svg>
      </div>
    </div>
  )
}

const MazeRows: React.FC<MazeRowsProps> = (props) => {
  const { cellValues, rowPosition } = props;

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexWrap: 'wrap'
    }}>
      {cellValues.map((cellValue: string, index: number) => (
        <MazeCell
          value={cellValue}
          position={[rowPosition, index]}
        />
      ))}
    </div>
  )
}

const Maze: React.FC = () => {
  const maze = useAppSelector(selectMaze)

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexWrap: 'wrap'
    }}>
      {maze.map((cellValues: string[], index: number) => (
        <MazeRows
          cellValues={cellValues}
          rowPosition={index}
        />
      ))}
    </div>
  )
}

export default Maze
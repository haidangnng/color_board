import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { MazeCellProps } from "../../component/Maze";


export interface Maze {
  maze: string[][];
  dragCell: MazeCellProps,
}

const initialState: Maze = {
  maze: [[]],
  dragCell: {
    value: '',
    position: [0,0],
  },
};

export const mazeSlice = createSlice({
  name: 'maze',
  initialState,

  reducers: {
    createMaze: (state, action: PayloadAction<string[][]>) => {
      state.maze = action.payload;
    },
    setDragItem: (state, action: PayloadAction<MazeCellProps>) => {
      state.dragCell = action.payload;
    },
  },
});

export const { createMaze, setDragItem } = mazeSlice.actions

export const selectMaze = (state: RootState) => state.maze.maze;
export const selectDragCell = (state: RootState) => state.maze.dragCell;

export default mazeSlice.reducer;

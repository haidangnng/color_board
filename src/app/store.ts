import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import mazeReducer from '../features/Maze';

export const store = configureStore({
  reducer: {
    maze: mazeReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

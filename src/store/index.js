import { configureStore } from '@reduxjs/toolkit';

import uiSlice from './uiSlice';
import commentsSlice from './commentsSlice';

const store = configureStore({
  reducer: {
    [uiSlice.name]: uiSlice.reducer,
    [commentsSlice.name]: commentsSlice.reducer
  }
});

store.subscribe(() => localStorage.setItem("interactive-comments-app", JSON.stringify(store.getState().comments)));

export default store;
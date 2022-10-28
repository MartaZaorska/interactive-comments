import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: "ui",
  initialState: { isOpenModal: false, commentId: null, replyId: null },
  reducers: {
    openModal: (state, action) => { state.isOpenModal = true; state.commentId = action.payload.commentId; state.replyId = action.payload.replyId; },
    closeModal: (state) => { state.isOpenModal = false; state.commentId = null; state.replyId = null; }
  }
});

export const { openModal, closeModal } = uiSlice.actions;
export default uiSlice;
import { createSlice } from '@reduxjs/toolkit';
import { v4 } from 'uuid';

import { placeholderData } from '../data/constants';

function getInitialState() {
  const localData = localStorage.getItem("interactive-comments-app");
  return localData ? JSON.parse(localData) : placeholderData;
}

const commentsSlice = createSlice({
  name: "comments",
  initialState: getInitialState,
  reducers: {
    addComment: {
      prepare: (content) => ({ payload: { content, id: v4(), createdAt: Date.now(), score: 0, replies: [] }}),
      reducer: (state, action) => {
        state.comments.push({ ...action.payload, user: state.currentUser });
      }
    },
    addReply: {
      prepare: ({ content, replyingTo, commentId }) => ({ payload: { 
          commentId,
          data: { content, replyingTo, id: v4(), createdAt: Date.now(), score: 0 }
      }}),
      reducer: (state, action) => {
        const comment = state.comments.find(item => item.id === action.payload.commentId);
        if(!comment) return;
        comment.replies.push({ ...action.payload.data, user: state.currentUser });
      }
    },
    updateComment: (state, action) => {
      const { commentId, replyId = "", content} = action.payload;

      const comment = state.comments.find(item => item.id === commentId);
      if(!comment) return;

      if(replyId) {
        comment.replies = comment.replies.map(reply => reply.id === replyId ? {...reply, content} : reply);
      }else{
        comment.content = content;
      }
    },
    deleteComment: (state, action) => {
      const { commentId, replyId = "" } = action.payload;

      if(!replyId) {
        state.comments = state.comments.filter(comment => comment.id !== commentId);
      }else{
        const comment = state.comments.find(item => item.id === commentId);
        if(!comment) return;
        comment.replies = comment.replies.filter(reply => reply.id !== replyId);
      }
    },
    incScore: (state, action) => {
      const { commentId, replyId = "" } = action.payload;
      const comment = state.comments.find(item => item.id === commentId);
      
      if(!comment) return;

      if(!replyId){
        comment.score += 1;
      }else{
        comment.replies = comment.replies.map(reply => reply.id === replyId ? {...reply, score: reply.score + 1} : reply);
      }
    },
    decScore: (state, action) => {
      const { commentId, replyId  = "" } = action.payload;
      const comment = state.comments.find(item => item.id === commentId);

      if(!comment) return;

      if(!replyId){
        comment.score -= 1;
      }else{
        comment.replies = comment.replies.map(reply => reply.id === replyId ? {...reply, score: reply.score - 1 } : reply);
      }
    }
  }
});

export const { addComment, addReply, updateComment, deleteComment, incScore, decScore } = commentsSlice.actions;
export default commentsSlice;
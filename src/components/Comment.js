import { useSelector, useDispatch } from 'react-redux';
import { useState, memo, useMemo, useCallback } from 'react';

import { FaReply, FaTrash, FaPen } from 'react-icons/fa'
import formatRelativeDate from '../utils/formatDate';

function Comment({setShowFormReply, commentId, ...data }) {
  const [showEditForm, setShowEditForm] = useState(false);
  const { currentUser } = useSelector(state => state.comments);
  const dispatch = useDispatch();

  const replyId = useMemo(() => commentId !== data.id ? data.id : "", [commentId, data]);

  const toggleEditForm = useCallback(() => setShowEditForm(prev => !prev), []);

  const updateCommentHandler = async e => {
    e.preventDefault();
    const { content } = e.target.elements;

    if(content.value === "" || content.value === data.content) {
      setShowEditForm(false); 
      return;
    }

    const { updateComment } = await import("../store/commentsSlice");
    dispatch(updateComment({commentId, content: content.value, replyId}));
    setShowEditForm(false);
  }

  const decScoreHandler = async () => {
    const { decScore } = await import("../store/commentsSlice");
    dispatch(decScore({commentId, replyId}));
  }

  const incScoreHandler = async () => {
    const { incScore } = await import("../store/commentsSlice");
    dispatch(incScore({commentId, replyId}));
  }

  const openModalHandler = async () => {
    const { openModal } = await import("../store/uiSlice");
    dispatch(openModal({commentId, replyId}));
  }

  return (
    <article className="comment box flex">
      <div className="content">
        <header className='author'>
          <img src={data.user.image.png} alt={data.user.username} />
          <h2>{data.user.username} {currentUser.username === data.user.username && <span className="badge">you</span>}</h2>
          <p>{formatRelativeDate(data.createdAt)}</p>
        </header>
        {(showEditForm && currentUser.username === data.user.username) ? (
          <form onSubmit={updateCommentHandler}>
            <textarea defaultValue={data.content} name="content"></textarea>
            <button type="submit" className="btn--update">Update</button>
          </form>
        ) : (
          <p className='text'><span className="replay__author">{data.replyingTo && `@${data.replyingTo}`}</span> {data.content}</p>
        )}
      </div>
      <div className="score">
        <button onClick={incScoreHandler} aria-label="increment score">+</button>
        <mark>{data.score}</mark>
        <button onClick={decScoreHandler} aria-label="decrement score">-</button>
      </div>
      {currentUser.username === data.user.username ? (
        <div className="controls">
          <button className="link--delete" onClick={openModalHandler}><FaTrash className="icon" /> Delete</button>
          <button className="link--edit" onClick={toggleEditForm}><FaPen className="icon" /> Edit</button>
        </div>
      ) : (
        <div className="controls">
          <button className="link--reply" onClick={() => setShowFormReply(prev => !prev)}><FaReply className="icon" /> Reply</button>
        </div>
      )}   
    </article>
  )
}

export default memo(Comment);
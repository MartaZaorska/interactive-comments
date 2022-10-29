import { useDispatch, useSelector } from 'react-redux';
import { memo } from 'react';

function Form({ reply = false, replyingTo = "", commentId = "", setShowFormReply }) {
  const { currentUser } = useSelector(state => state.comments);
  const dispatch = useDispatch();

  const addCommentHandler = async (e) => {
    e.preventDefault();
    const { content } = e.target.elements;

    if(content.value === ""){
      if(reply) setShowFormReply(false);
      return;
    }

    const { addReply, addComment } = await import("../store/commentsSlice");

    if(reply){
      dispatch(addReply({content: content.value, commentId, replyingTo }));
      setShowFormReply(false);
    }else{
      dispatch(addComment(content.value));
    }

    e.target.reset();
  }

  return (
    <form className="box form flex" onSubmit={addCommentHandler}>
      <img src={currentUser.image.png} alt={currentUser.username} />
      <textarea name="content" placeholder="Add a comment..."></textarea>
      <button type="submit" className="btn--submit">{reply ? "reply" : "send"}</button>
    </form>
  )
}

export default memo(Form)
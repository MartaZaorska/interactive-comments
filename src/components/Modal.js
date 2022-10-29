import { useDispatch, useSelector } from 'react-redux';

function Modal() {
  const { commentId, replyId } = useSelector(state => state.ui);
  const dispatch = useDispatch();

  const deleteHandler = async () => {
    const { deleteComment } = await import("../store/commentsSlice");
    dispatch(deleteComment({ commentId, replyId }));
    await closeHandler();
  }

  const closeHandler = async () => {
    const { closeModal } = await import("../store/uiSlice");
    dispatch(closeModal());
  }

  return (
    <section className="modal">
      <div className="modal__content flex">
        <h2>Delete comment</h2>
        <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
        <button onClick={closeHandler} className="btn--cancel">no, cancel</button>
        <button onClick={deleteHandler} className="btn--delete">yes, delete</button>
      </div>
    </section>
  )
}

export default Modal
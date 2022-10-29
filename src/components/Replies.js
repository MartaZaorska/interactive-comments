import { memo } from 'react';
import CommentBox from './CommentBox';

function Replies({ replies, commentId }) {
  return (
    <div className="replies__container">
      {replies.map(reply => <CommentBox key={reply.id} commentId={commentId} {...reply} />)}
    </div>
  )
}

export default memo(Replies)
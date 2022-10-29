import { useState, memo } from 'react';

import Comment from './Comment';
import Form from './Form';
import Replies from './Replies';

function CommentBox({replies = [], commentId, ...data}) {
  const [showFormReply, setShowFormReply] = useState(false);

  return (
    <section className="comment__box">
      <Comment {...data} setShowFormReply={setShowFormReply} commentId={commentId} />
      {showFormReply && <Form reply={true} replyingTo={data.user.username} commentId={commentId} setShowFormReply={setShowFormReply} />}
      {replies?.length > 0 && <Replies replies={replies} commentId={data.id} />}
    </section>
  )
}

export default memo(CommentBox)
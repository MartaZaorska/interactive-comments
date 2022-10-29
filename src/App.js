import { useSelector } from 'react-redux';

import CommentBox from './components/CommentBox';
import Form from './components/Form';
import Modal from './components/Modal';
import Footer from './components/Footer';

function App() {
  const data = useSelector(state => state.comments);
  const { isOpenModal } = useSelector(state => state.ui);

  return (
    <>
      {isOpenModal && <Modal />}
      <main className="container">
        {data.comments.map(comment => <CommentBox key={comment.id} commentId={comment.id} {...comment} />)}
        <Form />
      </main>
      <Footer />
    </>
  );
}

export default App;

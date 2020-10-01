import React, { useState } from 'react';
import repoFeedbacks from '../../repo/feedbacks';
import './index.css';

const Feedback = ({ id, collaboratorId, message, createdAt, like, removeFeedback}) => {
  const [ likes, setLikes ] = useState(like);
  const updateLike = () => {
    const newLikes = likes + 1;
    repoFeedbacks.likeFeedback(collaboratorId, id, { like: newLikes })
      .then(responseLike => {
        const { like } = responseLike;
        setLikes(like);
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <section>
      <div>
        <label>Mensagem:</label><span className="message">{message}</span>
      </div>
      <div>
        <label>Criado em:</label><span className="createdAt">{createdAt}</span>
      </div>
      <nav>
        <span className="likes">{likes}
          <span role="img" aria-label="Curtir feedback" onClick={updateLike}>🤍</span>
        </span>
        <span className="remove">
          <span role="img" aria-label="Remover feedback" onClick={removeFeedback}>❌</span>
        </span>
      </nav>
    </section>
  )
}

export default Feedback;
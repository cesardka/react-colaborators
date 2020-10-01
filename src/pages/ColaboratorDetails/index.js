import React, { useState, useEffect } from 'react';
import repoColaborators from '../../repo/colaborators';
import repoFeedbacks from '../../repo/feedbacks';
import Feedback from '../../components/Feedback';
import useForm from '../../hooks/useForm';
import './index.css';

const ColaboratorDetails = ({ match: { params }}) => {
  const [ colaborator, setColaborator ] = useState({message: ''});
  const [ feedbacks, setFeedbacks ] = useState([]);
  const [ page, setPage ] = useState(1);

  const { id } = params;

  const { values, handleChange, clearForm } = useForm({});
  const MAX_DELETE_FEEDBACK = 5 * 60 * 1000; // 5 minutos máximos antes de deletar feedback
  const FEEDBACK_PAGE_SIZE = 20;

  const loadFeedbacks = () => {
    repoFeedbacks.getAll(id)
      .then(responseFeedbacks => {
        setFeedbacks(responseFeedbacks);
      })
      .catch(err => {
        console.error(err);
      });
  }

  const removeFeedback = (collaboratorId, feedbackId, createdAt) => {
    const now = new Date();
    const since = new Date(createdAt);
    const canDeleteFeedback = (now - since) <= MAX_DELETE_FEEDBACK;
    if (canDeleteFeedback) {
      repoFeedbacks.removeFeedback(collaboratorId, feedbackId)
        .then(responseRemove => {
          console.log(responseRemove);
          loadFeedbacks();
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  const addNewFeedback = () => {
    console.log(values);
    if (!values.message || values.message.length < 5) {
      return false;
    }

    const newFeedback = {
      like: 1,
      collaboratorId: id,
      message: values.message,
    };

    repoFeedbacks.addFeedback(id, newFeedback)
      .then(responseNewFeedback => {
        setFeedbacks(...feedbacks, responseNewFeedback);
      })
      .catch(err => {
        console.error(err);
      });

    clearForm();
    loadFeedbacks();
  }

  const goPreviousPage = () => {
    const previousPage = page - 1;
    if (previousPage > 0) {
      setPage(previousPage);
      // loadFeedbacks(feedbacks, previousPage)
    }
  }

  const goNextPage = () => {
    const nextPage = page + 1;
    if (page * FEEDBACK_PAGE_SIZE <= feedbacks.length) {
      setPage(nextPage);
      // loadFeedbacks(feedbacks, nextPage)
    }
  }

  useEffect(() => {
    repoColaborators.getDetails(id)
      .then(responseColaborator => {
        setColaborator(responseColaborator);
      })
      .catch(err => {
        console.error(err);
      });

      repoFeedbacks.getAll(id)
      .then(responseFeedbacks => {
        setFeedbacks(responseFeedbacks);
      })
      .catch(err => {
        console.error(err);
      });
  }, [id, page]);

  return (
    <>
      { colaborator !== undefined && colaborator ?
        <>
          <h2>Detalhes do Colaborador</h2>
          <section>
            <p>
              <img src={colaborator.avatar} alt={`Avatar do colaborador ${colaborator.name}`} className="avatar" />
            </p>
            <p>
              <label>Nome:</label><span className="name">{colaborator.name}</span>
              <label>Cargo:</label><span className="role">{colaborator.role}</span>
              <label>Empresa:</label><span className="company">{colaborator.company}</span>
              <label>Criado em:</label><span className="createdAt">{colaborator.createdAt}</span>
            </p>
          </section>

          { feedbacks.length > 0 && feedbacks ? (
            <>
              <header>
                <h2>
                  Feedbacks
                </h2>
                <h3>
                  <button onClick={goPreviousPage}>{`<`}</button>
                  <span>Página { page }</span>
                  <button onClick={goNextPage}>{`>`}</button>
                </h3>
              </header>
              {feedbacks.map((feedback) => {
                const { id, collaboratorId, message, createdAt, like } = feedback;
                return (
                  <Feedback
                    id={id}
                    collaboratorId={collaboratorId}
                    message={message}
                    createdAt={createdAt}
                    like={like}
                    key={`${collaboratorId}_${id}`}
                    removeFeedback={removeFeedback(collaboratorId, id, createdAt)}
                  />
                )
              })}
            </>
          ) : (
            <></>
          )}
          <>
            <textarea
              name="message"
              onChange={handleChange}
              placeholder={`Escreva um feedback para ${colaborator.name}`}
            >
              {values.message}
            </textarea>
            <button onClick={addNewFeedback}>
              Enviar
            </button>
          </>
        </>
      : "Carregando..."}
    </>
  )
}

export default ColaboratorDetails;
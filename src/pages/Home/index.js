import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ColaboratorSummary from '../../components/ColaboratorSummary';
import repoColaborators from '../../repo/colaborators';
import './index.css';


const Home = () => {
  const [ colaborators, setColaborators ] = useState([]);
  const [ page, setPage ] = useState(1);

  const COLABORATOR_PAGE_SIZE = 10;

  const goPreviousPage = () => {
    const previousPage = page - 1;
    if (previousPage > 0) {
      setPage(previousPage);
      updateColaborators(colaborators, previousPage)
    }
  }

  const goNextPage = () => {
    const nextPage = page + 1;
    if (page * COLABORATOR_PAGE_SIZE <= colaborators.length) {
      setPage(nextPage);
      updateColaborators(colaborators, nextPage)
    }
  }

  const updateColaborators = (list, page) => {
    const start = (page - 1) * COLABORATOR_PAGE_SIZE;
    const end = start + COLABORATOR_PAGE_SIZE;
    const colaboratorsInPage = list.slice(start, end);

    setColaborators(colaboratorsInPage);
  }

  useEffect(() => {
    repoColaborators.getAll()
      .then(responseColaborators => {
        updateColaborators(responseColaborators, page);
      })
      .catch(err => {
        console.error(err);
      });
  }, [page]);

  return (
    <>
      <header>
        <button onClick={goPreviousPage}>{`<`}</button>
        Página { page }
        <button onClick={goNextPage}>{`>`}</button>
      </header>
      { colaborators.lenght === 0 && "Carregando..." }
      { colaborators.length > 0 && colaborators.map((colaborator, pos) => {
        const { id, avatar, name, company, role } = colaborator;
        return (
          <Link to={`/colaborator/${id}`}>
            <ColaboratorSummary
              key={`${id}_${pos}`}
              id={id}
              pos={pos + 1}
              avatar={avatar}
              name={name}
              company={company}
              role={role}
            />
          </Link>
        )
      })}
    </>
  )
};

export default Home;
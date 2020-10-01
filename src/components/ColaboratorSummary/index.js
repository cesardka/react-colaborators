import React from 'react';
import './index.css';

const ColaboratorSummary = ({ id, avatar, name, role, company, pos }) => {
  return (
    <section>
      <div>
        <label>Nome:</label><span className="name">{name}</span>
      </div>
      <div>
        <label>Cargo:</label><span className="role">{role}</span>
      </div>
      <div>
        <label>Empresa:</label><span className="company">{company}</span>
      </div>
    </section>
  );
};

export default ColaboratorSummary;
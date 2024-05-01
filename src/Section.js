// Section.js
import React from 'react';

const Section = ({ title, link, children }) => {
  return (
    <section style={{ borderBottom: '2px solid black', padding: '20px 0' }}>
      <h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>{title}</h2>
        <div style={{ padding: '0 50px' }}>{children}</div>
    </section>
  );
};

export default Section;

import React from 'react';

const Section = ({legend, children}) => {
  return (
    <fieldset>
      <legend>{legend}</legend>
        <div className="form-grid">
          {children}
        </div>
    </fieldset>
    );
};

export default Section;
import React from 'react';

const Select = props => {
  const Options = () => props.options.map(option => {
      return(<option key={option}>{option}</option>);
    });
  return (
    <>
      <label htmlFor={props.name}>{props.label}</label>
      <select name={props.name} id={props.name} value={props.selected} onChange={props.onChange}>
        <Options/>
      </select>
    </>
  );
};

export default Select;
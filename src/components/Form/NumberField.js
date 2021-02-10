import React from 'react';

const NumberField = props => {
  const changeHandler = event => {
    if (props.allowDecimal) {
      let newValue = event.currentTarget.value.replace(/[^0-9\.]/g, '');
      if (newValue.indexOf('.') != newValue.lastIndexOf('.')) {
        let values = newValue.split('.');
        newValue = values.shift() + '.' + values.join('');
      }
      props.setValue(event.currentTarget.name, newValue);
    } else {
      props.setValue(event.currentTarget.name, event.currentTarget.value.replace(/[^0-9]/g, ''));
    }
  };
  return(
    <div>
      <label htmlFor={props.name}>{props.label}</label>
      <input type="text"
        className="wwbjNumberField"
        id={props.name}
        name={props.name}
        value={props.value}
        onChange={changeHandler}>
      </input>
    </div>
  );
};

export default NumberField;
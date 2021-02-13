import React from 'react';

const NumberField = props => {
  const changeHandler = event => {
    let newValue = 0;
    if (props.allowDecimal) {
      newValue = event.currentTarget.value.replace(/[^0-9\.]/g, '');
      if (newValue.indexOf('.') != newValue.lastIndexOf('.')) {
        let values = newValue.split('.');
        newValue = values.shift() + '.' + values.join('');
      }
    } else {
      newValue =  event.currentTarget.value.replace(/[^0-9]/g, '');
    }
    debugger
    if (props.max && Number(newValue) > Number(props.max)) {
      newValue = props.max;
    }
    props.setValue(event.currentTarget.name, newValue);
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
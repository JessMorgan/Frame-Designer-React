import React from 'react';
import NumberField from './NumberField';

const FrameDesignerForm = props => {
  const updateValue = (key, value) => {
    props.update({...props.state, [key]: value});
  }
  const toggleMat = () => {
    props.update({...props.state, 'mat': !props.state.mat});
  }
  return(
    <form className="wwbjFrameDesigner">
      <fieldset>
        <legend>Frame Dimensions:</legend>
        <NumberField name="width" label="Width:" value={props.state.width} setValue={updateValue} allowDecimal={true} />
        <NumberField name="height" label="Height:" value={props.state.height} setValue={updateValue} allowDecimal={true} />
        <NumberField name="thickness" label="Frame Thickness:" value={props.state.thickness} setValue={updateValue} allowDecimal={true} />
      </fieldset>
      <fieldset>
        <legend>Frame Style:</legend>
        {/* wood radios
        stripes
        profiles
        glazing */}
      </fieldset>
      <fieldset>
        <legend>Mat Options:</legend>
        <input type="checkbox" name="mat" id="mat" onChange={toggleMat} checked={props.state.mat}/>
        <label htmlFor="mat">Add Mat</label>
        { props.state.mat &&
          <div>
          { /* Dropdown/radio for color */ }
            <NumberField name="matOpeningWidth" label="Mat Opening Width:" value={props.state.matOpeningWidth} setValue={updateValue} allowDecimal={true} />
            <NumberField name="matOpeningHeight" label="Mat Opening Height:" value={props.state.matOpeningHeight} setValue={updateValue} allowDecimal={true} />
          </div>
        }
      </fieldset>
    </form>
  );
};

export default FrameDesignerForm;
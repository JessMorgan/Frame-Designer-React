import React from 'react';
import NumberField from './NumberField';
import Select from './Select';

const FrameDesignerForm = props => {
  const updateValue = (key, value) => {
    props.update({...props.state, [key]: value});
  }
  const updateByEvent = (event) => {
    updateValue(event.currentTarget.name, event.currentTarget.value);
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
        <Select name="wood" label="Wood:" options={props.woods} selected={props.state.wood} onChange={updateByEvent} />
        <Select name="stripes" label="Number of Stripes:" options={[0,1,2]} selected={props.state.stripes} onChange={updateByEvent} />
        {props.state.stripes >= 1 &&
          <Select name="stripeWood" label="Stripe Wood:" options={props.woods} selected={props.state.stripeWood} onChange={updateByEvent} />
        }
      </fieldset>
      <fieldset>
        <legend>Mat Options:</legend>
        <input type="checkbox" name="mat" id="mat" onChange={toggleMat} checked={props.state.mat}/>
        <label htmlFor="mat">Add Mat</label>
        { props.state.mat &&
          <div>
            <Select name="matColor" label="Mat Color:" options={props.matColors} selected={props.state.matColor} onChange={updateByEvent} />
            <NumberField name="matOpeningWidth" label="Matted Object Width:" value={props.state.matOpeningWidth} setValue={updateValue} allowDecimal={true} />
            <NumberField name="matOpeningHeight" label="Matted Object Height:" value={props.state.matOpeningHeight} setValue={updateValue} allowDecimal={true} />
          </div>
        }
      </fieldset>
    </form>
  );
};

export default FrameDesignerForm;
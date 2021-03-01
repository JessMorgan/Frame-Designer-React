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
  const woodChoices = Object.entries(props.woods).map(w => w[0]);
  return(
    <form className="wwbjFrameDesigner">
      <fieldset>
        <legend>Frame Dimensions:</legend>
        <div className="form-grid">
          <NumberField name="width" label="Width:" value={props.state.width} setValue={updateValue} allowDecimal={true} min="6" max="36" />
          <NumberField name="height" label="Height:" value={props.state.height} setValue={updateValue} allowDecimal={true} min="4" max="24" />
          <NumberField name="thickness" label="Frame Thickness:" value={props.state.thickness} setValue={updateValue} allowDecimal={true} min="0.5" max="6" />
        </div>
      </fieldset>
      <fieldset>
        <legend>Frame Style:</legend>
        <div className="form-grid">
          {/* wood radios */}
          <Select name="wood" label="Wood:" options={woodChoices} selected={props.state.wood} onChange={updateByEvent} />
          <Select name="stripes" label="Number of Stripes:" options={[0,1,1.5,2]} selected={props.state.stripes} onChange={updateByEvent} />
          {props.state.stripes >= 1 &&
            <Select name="stripeWood" label="Stripe Wood:" options={woodChoices} selected={props.state.stripeWood} onChange={updateByEvent} />
          }
          <Select name="profile" label="Profile:" options={props.profileOptions} selected={props.state.profile} onChange={updateByEvent} />
          <Select name="glazing" label="Glazing:" options={["Glass","Acrylic","None"]} selected={props.state.glazing} onChange={updateByEvent} />
        </div>
      </fieldset>
      <fieldset>
        <legend>Mat Options:</legend>
        <div className="form-grid">
          <div className="checkbox">
            <input type="checkbox" name="mat" id="mat" onChange={toggleMat} checked={props.state.mat}/>
            <label htmlFor="mat">Add Mat</label>
          </div>
          { props.state.mat &&
            <div className="contents">
              <Select name="matColor" label="Mat Color:" options={Object.entries(props.matColors).map(entry => entry[0])} selected={props.state.matColor} onChange={updateByEvent} />
              <NumberField name="matOpeningWidth" label="Matted Object Width:" value={props.state.matOpeningWidth} setValue={updateValue} allowDecimal={true} max="34" />
              <NumberField name="matOpeningHeight" label="Matted Object Height:" value={props.state.matOpeningHeight} setValue={updateValue} allowDecimal={true} max="22" />
            </div>
          }
        </div>
      </fieldset>
    </form>
  );
};

export default FrameDesignerForm;
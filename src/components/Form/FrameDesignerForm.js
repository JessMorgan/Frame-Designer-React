import React from 'react';
import NumberField from './NumberField';
import Section from './Section';
import Select from './Select';

const FrameDesignerForm = props => {
  const updateValue = (key, value) => {
    props.update({...props.state, [key]: value});
  }
  const updateByEvent = (event) => {
    updateValue(event.currentTarget.name, event.currentTarget.value);
  }
  const updateArt = (event) => {
    let name = event.currentTarget.value;
    if (name == 'None') {
      props.update({...props.state, 'artName': name, 'art': {width:0, height:0, url:'', filename:''}});
    } else if (name == 'Web Address') {
      props.update({...props.state, 'artName': name, 'art': {url:'', ...props.state.art, filename:''}});
    } else if (name == 'Upload Your Own') {
      props.update({...props.state, 'artName': name, 'art': {url:'', ...props.state.art, filename:''}});
    } else {
      props.update({...props.state, 'artName': name, 'art': {url:'', ...props.artChoices[name]}});
    }
  }
  const updateArtPropertyByEvent = (event) => {
    updateArtProperty(event.currentTarget.name, event.currentTarget.value);
  }
  const updateArtProperty = (key, value) => {
    let tokens = key.split('-');
    props.update({...props.state,
      'art':{...props.state.art,
        [tokens[tokens.length - 1]]: value}});
  }
  const updateUserArt = (event) => {
    props.update({...props.state,
      'art':{...props.state.art,
        url: URL.createObjectURL(event.target.files[0])}});
  }
  const toggleMat = () => {
    props.update({...props.state, 'mat': !props.state.mat});
  }
  const woodChoices = Object.entries(props.woods).map(w => w[0]);
  return(
    <form className="wwbjFrameDesigner">
      <Section legend="App Settings:">
        <Select name="art" label="Art (for preview):" options={['None','Web Address','Upload Your Own'].concat(Object.keys(props.artChoices).filter(key => key != 'default'))} selected={props.state.artName} onChange={updateArt} />
        { props.state.artName != 'None' &&
          <div className="contents">
            <NumberField name="art-width" label="Art Width:" value={props.state.art.width} setValue={updateArtProperty} allowDecimal={true} max="36" />
            <NumberField name="art-height" label="Art Height:" value={props.state.art.height} setValue={updateArtProperty} allowDecimal={true} max="24" />
          </div>
        }
        { props.state.artName == 'Web Address' &&
          <div className="contents">
            <label htmlFor="art-url">Web Address:</label>
            <input type="text"
              id="art-url"
              name="art-url"
              value={props.state.art.url}
              onChange={updateArtPropertyByEvent} />
          </div>
        }
        { props.state.artName == 'Upload Your Own' &&
          <div className="contents">
            <label htmlFor="artUpload">Choose a file:</label>
            <input type="file"
              id="artUpload"
              name="artUpload"
              onChange={updateUserArt} />
          </div>
        }
      </Section>
      <Section legend="Frame Dimensions (in inches):">
        <NumberField name="width" label="Width:" value={props.state.width} setValue={updateValue} allowDecimal={true} min="6" max="36" />
        <NumberField name="height" label="Height:" value={props.state.height} setValue={updateValue} allowDecimal={true} min="4" max="24" />
        <NumberField name="thickness" label="Frame Thickness:" value={props.state.thickness} setValue={updateValue} allowDecimal={true} min="0.5" max="6" />
      </Section>
      <Section legend="Frame Style:">
        {/* wood radios */}
        <Select name="wood" label="Wood:" options={woodChoices} selected={props.state.wood} onChange={updateByEvent} />
        <Select name="stripes" label="Number of Stripes:" options={[0,1,1.5,2]} selected={props.state.stripes} onChange={updateByEvent} />
        {props.state.stripes >= 1 &&
          <Select name="stripeWood" label="Stripe Wood:" options={woodChoices} selected={props.state.stripeWood} onChange={updateByEvent} />
        }
        <Select name="profile" label="Profile:" options={props.profileOptions} selected={props.state.profile} onChange={updateByEvent} />
        <Select name="glazing" label="Glazing:" options={["Glass","Acrylic","None"]} selected={props.state.glazing} onChange={updateByEvent} />
        <Select name="finish" label="Finish:" options={["Matte","Satin","Semi-Gloss"]} selected={props.state.finish} onChange={updateByEvent} />
      </Section>
      <Section legend="Mat Options:">
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
      </Section>
    </form>
  );
};

export default FrameDesignerForm;
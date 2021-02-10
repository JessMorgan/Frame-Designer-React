import * as React from 'react'
import * as ReactDOM from 'react-dom'
import FrameDesignerForm from './components/Form/FrameDesignerForm';
import Preview from './components/Preview';


const App = () => {
  const [state, setState] = React.useState({
    'width': 7,
    'height': 5,
    'thickness': 1,
    'wood': 'walnut',
    'stripes': 1,
    'stripeWood': 'maple',
    'profile': 'rectangular',
    'glazing': 'glass',
    'mat': true,
    'matColor': 'blue',
    'matOpeningWidth': 5,
    'matOpeningHeight': 3
  });
  return (
    <div className="App">
      <FrameDesignerForm state={state} update={setState}/>
      <Preview state={state}/>
    </div>
  );
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);

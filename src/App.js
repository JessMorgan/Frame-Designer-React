import * as React from 'react'
import * as ReactDOM from 'react-dom'
import FrameDesignerForm from './components/Form/FrameDesignerForm';
import Preview from './components/Preview';


const App = () => {
  React.useEffect(() => {
    fetch('/woods.txt')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(woods => {setWoodChoices(woods);})
      .catch(error => console.log(`Error fetching wood choices: ${error}`));
    fetch('/mat-colors.txt')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(colors => {setMatColors(Object.entries(colors))})
      .catch(error => console.log(`Error fetching mat colors: ${error}`));
  }, []);
  const [woodChoices, setWoodChoices] = React.useState([]);
  const [matColors, setMatColors] = React.useState([[]]);
  const [state, setState] = React.useState({
    'width': 7,
    'height': 5,
    'thickness': 1,
    'wood': 'Walnut',
    'stripes': 1,
    'stripeWood': 'Maple',
    'profile': 'rectangular',
    'glazing': 'glass',
    'mat': true,
    'matColor': '#080',
    'matOpeningWidth': 5,
    'matOpeningHeight': 3
  });
  return (
    <div className="App">
      <FrameDesignerForm state={state} update={setState} woods={woodChoices} matColors={matColors}/>
      <Preview state={state}/>
    </div>
  );
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import FrameDesignerForm from './components/Form/FrameDesignerForm';
import OrderButton from './components/OrderButton';
import Preview from './components/Preview';
import Price from './components/Price';


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
      .then(colors => {setMatColors(colors)})
      .catch(error => console.log(`Error fetching mat colors: ${error}`));
    fetch('/profiles.txt')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(profiles => {setProfileOptions(profiles);})
      .catch(error => console.log(`Error fetching profile options: ${error}`));
  }, []);
  const [woodChoices, setWoodChoices] = React.useState({});
  const [matColors, setMatColors] = React.useState({});
  const [profileOptions, setProfileOptions] = React.useState([]);
  const [state, setState] = React.useState({
    'width': 7,
    'height': 5,
    'thickness': 1,
    'wood': 'Walnut',
    'stripes': 1,
    'stripeWood': 'Maple',
    'profile': 'Rectangular',
    'glazing': 'Glass',
    'mat': true,
    'matColor': 'Blue',
    'matOpeningWidth': 5,
    'matOpeningHeight': 3
  });
  return (
    <div className="App">
      <FrameDesignerForm state={state} update={setState} woods={woodChoices} matColors={matColors} profileOptions={profileOptions}/>
      <Price state={state}/>
      <p><OrderButton state={state}/></p>
      <Preview state={state} woods={woodChoices} matColors={matColors}/>
    </div>
  );
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);

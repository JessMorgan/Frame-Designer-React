import React from 'react';

const TO = "WoodworkingByJess@gmail.com"
const SUBJECT = encodeURIComponent("Frame Order")
const TEXT = `Hi Jess,
I used your frame designer and came up with something I like.  Let's work together to make this happen!

Here are the details:
`

const verbalize = (state) => {
  let text = `Size: ${state.width}x${state.height}
Thickness: ${state.thickness}
Wood: ${state.wood}
Stripes: ${state.stripes}`
  if (Number(state.stripes)) {
    text += ` (${state.stripeWood})`
  }
  text += `
Profile: ${state.profile}
Glazing: ${state.glazing}
`
  if (state.mat) {
    text += `Mat: ${state.matOpeningWidth}x${state.matOpeningHeight}, ${state.matColor}`
  }
  return text;
}

const OrderButton = ({state}) => {
  const generateMailtoLink = () => {
    return `mailto:${TO}?subject=${SUBJECT}&body=${encodeURIComponent(TEXT + verbalize(state))}`;
  }

console.log(generateMailtoLink());
  return (
      <a className="order" target="_blank" href={generateMailtoLink()}>Initiate purchase of (or ask questions about) this frame</a>
    );
};

export default OrderButton;
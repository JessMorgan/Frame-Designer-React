import React from 'react';

const Background = ({extents, pixelWidth, woodChoices, wood}) => {
  if (woodChoices[wood] === undefined) {
    return null;
  }
  const width = woodChoices[wood].width;
  const height = woodChoices[wood].height;
  const woodUrl = "/woods/" + wood + ".jpg";
  let images = [];
  for (let x = 0; x < extents[0]; x += width - pixelWidth) {
    for (let y = 0; y < extents[1]; y += height - pixelWidth) {
      const key = "x" + x + "y" + y;
      images.push(<image key={key} href={woodUrl} x = {x} y = {y} width = {width} height = {height} preserveAspectRatio="none" />);
    }
  }
  return (<g id="background">{images}</g>);
}

const Stripes = ({extents, woodChoices, wood, stripes}) => {
  return null;
};

const Miters = ({extents, state, strokeWidth}) => {
  return (
    <g id="miters" fill="none" stroke="black" strokeWidth={strokeWidth}>
      <rect x="0" y="0" width={extents[0]} height={extents[1]}/>
      <line x1="0" y1="0" x2={state.thickness} y2={state.thickness} />
      <line x1="0" y1={extents[1]} x2={state.thickness} y2={extents[1] - state.thickness} />
      <line x1={extents[0]} y1="0" x2={extents[0] - state.thickness} y2={state.thickness} />
      <line x1={extents[0]} y1={extents[1]} x2={extents[0] - state.thickness} y2={extents[1] - state.thickness} />
    </g>
  );
}

const Artwork = () => {
  return null;
}

const Profile = () => {
  return null;
}

const Mat = ({extents, state, strokeWidth, matColors}) => {
  const matDepth = 1/8;
  const openingDimensions = {
    "x": (extents[0] - state.matOpeningWidth)/2,
    "y": (extents[1] - state.matOpeningHeight)/2,
    "width": state.matOpeningWidth,
    "height": state.matOpeningHeight
  };
  openingDimensions.right = openingDimensions.x + state.matOpeningWidth;
  openingDimensions.bottom = openingDimensions.y + state.matOpeningHeight;

  const innerOpening = {
    "x": openingDimensions.x + matDepth,
    "y": openingDimensions.y + matDepth,
    "right": openingDimensions.right - matDepth,
    "bottom": openingDimensions.bottom - matDepth,
    "width": openingDimensions.width - 2 * matDepth,
    "height": openingDimensions.height - 2 * matDepth
  };

  return (
    <g id="mat" stroke="black" strokeWidth={strokeWidth}>
      <rect x={state.thickness} y={state.thickness} width={state.width} height={state.height} fill={matColors[state.matColor]} />
      <rect x={openingDimensions.x} y={openingDimensions.y} width={openingDimensions.width} height={openingDimensions.height} fill="white" />
      <rect x={innerOpening.x} y={innerOpening.y} width={innerOpening.width} height={innerOpening.height} fill="none" />
      <line x1={openingDimensions.x} y1={openingDimensions.y} x2={innerOpening.x} y2={innerOpening.y} />
      <line x1={openingDimensions.x} y1={openingDimensions.bottom} x2={innerOpening.x} y2={innerOpening.bottom} />
      <line x1={openingDimensions.right} y1={openingDimensions.y} x2={innerOpening.right} y2={innerOpening.y} />
      <line x1={openingDimensions.right} y1={openingDimensions.bottom} x2={innerOpening.right} y2={innerOpening.bottom} />
    </g>
  );
}

const Preview = ({state, woods, matColors}) => {
  const extents = [Number(state.width) + 2 * Number(state.thickness), Number(state.height) + 2 * Number(state.thickness)];
  const svgWidth = 400;
  const svgHeight = Math.round(extents[1] / extents[0] * svgWidth);
  const viewBox = "0 0 " + extents[0] + " " + extents[1];
  const strokeWidth = extents[0]/svgWidth;

  return(
    <svg version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg" width={svgWidth} height={svgHeight} viewBox={viewBox}>
      <Background extents = {extents} pixelWidth = {strokeWidth} woodChoices = {woods} wood = {state.wood} />
      <Stripes extents = {extents} woodChoices = {woods} wood = {state.stripeWood} stripes = {state.stripes} />
      <Profile/>
      <Mat extents = {extents} state = {state} strokeWidth = {strokeWidth} matColors={matColors} />
      <Artwork />
      <Miters extents = {extents} state = {state} strokeWidth = {strokeWidth} />
    </svg>
  );
};

export default Preview;
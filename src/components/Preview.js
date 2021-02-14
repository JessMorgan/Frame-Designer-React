import React from 'react';

const Background = ({extents, woodChoices, wood}) => {
  if (woodChoices[wood] === undefined) {
    return null;
  }
  const width = woodChoices[wood].width;
  const height = woodChoices[wood].height;
  const woodUrl = "/woods/" + wood + ".jpg";
  let images = [];
  for (let x = 0; x < extents[0]; x += width) {
    for (let y = 0; y < extents[1]; y += height) {
      const key = "x" + x + "y" + y;
      images.push(<image key={key} href={woodUrl} x = {x} y = {y} width = {width} height = {height} />);
    }
  }
  return (<g id="background">{images}</g>);
}

const Preview = ({state, woods, matColors}) => {
  const extents = [Number(state.width) + 2 * Number(state.thickness), Number(state.height) + 2 * Number(state.thickness)];
  const svgWidth = 400;
  const svgHeight = Math.round(extents[1] / extents[0] * svgWidth);
  const viewBox = "0 0 " + extents[0] + " " + extents[1];
  const strokeWidth = extents[0]/svgWidth;

  return(
    <svg version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg" width={svgWidth} height={svgHeight} viewBox={viewBox}>
      <Background extents = {extents} woodChoices = {woods} wood = {state.wood} />
      <rect x="0" y="0" width={extents[0]} height={extents[1]} fill="none" stroke="black" strokeWidth={strokeWidth} />
      <rect x={state.thickness} y={state.thickness} width={Number(state.width)} height={Number(state.height)} fill="none" stroke="black" strokeWidth={strokeWidth}/>
    </svg>
  );
};

export default Preview;
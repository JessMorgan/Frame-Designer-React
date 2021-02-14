import React from 'react';

const Background = ({extents, pixelWidth, woodChoices, wood, clipPath}) => {
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
  return (<g id={clipPath ? "stripe" : "frame"} clipPath={clipPath}>{images}</g>);
}

const Stripes = ({extents, thickness, pixelWidth, woodChoices, wood, stripes}) => {
  if (stripes === "0") {
    return null;
  }
  return (
    <g>
      <StripeClipPath extents={extents} thickness={thickness} woodChoices={woodChoices} wood={wood} stripes={stripes}/>
      <Background extents={extents} pixelWidth={pixelWidth} woodChoices={woodChoices} wood={wood} clipPath="url(#stripeClip)" />
    </g>
  );
};

const StripeClipPath = ({extents, thickness, woodChoices, wood, stripes}) => {
  if (stripes == "1") {
    // Stripe 50%-75% from outer edge
    const outerMargin = thickness / 2;
    const innerMargin = thickness * 3 / 4;
    const points = [
      [outerMargin, outerMargin, extents[0] - outerMargin, innerMargin],
      [outerMargin, extents[1] - innerMargin, extents[0] - outerMargin, extents[1] - outerMargin],
      [outerMargin, outerMargin, innerMargin, extents[1] - outerMargin],
      [extents[0] - innerMargin, outerMargin, extents[0] - outerMargin, extents[1] - outerMargin]
    ];
    const rects = points.map((r, index) => <rect key={index} x={r[0]} y={r[1]} width={r[2]-r[0]} height={r[3]-r[1]}/>);
    return (
      <clipPath id="stripeClip">
        {rects}
      </clipPath>
    );
  } else {
    // 2
    // Stripes 33%-50% & 66%-75% from outer edge
    return (
      <clipPath id="stripeClip">
      </clipPath>
    );
  }
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
      <Stripes extents = {extents} thickness = {state.thickness} pixelWidth = {strokeWidth} woodChoices = {woods} wood = {state.stripeWood} stripes = {state.stripes} />
      <Profile/>
      <Mat extents = {extents} state = {state} strokeWidth = {strokeWidth} matColors={matColors} />
      <Artwork />
      <Miters extents = {extents} state = {state} strokeWidth = {strokeWidth} />
    </svg>
  );
};

export default Preview;
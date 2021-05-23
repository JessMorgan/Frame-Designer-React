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
    const startDepth = thickness / 2;
    const endDepth = thickness * 3 / 4;
    const rects = generateStripe(extents, startDepth, endDepth);
    return (
      <clipPath id="stripeClip">
        {rects}
      </clipPath>
    );
  } else if (stripes == "1.5") {
    // Stripes 33%-50% & 66%-100% from outer edge
    const depths = [
      [thickness / 3, thickness / 2],
      [thickness * 2 / 3, thickness]
    ];
    let rects = generateStripe(extents, depths[0][0], depths[0][1]).concat(
      generateStripe(extents, depths[1][0], depths[1][1]));
    return (
      <clipPath id="stripeClip">
        {rects}
      </clipPath>
    );
  } else if (stripes == "2") {
    // Stripes 33%-50% & 66%-75% from outer edge
    const depths = [
      [thickness / 3, thickness / 2],
      [thickness * 2 / 3, thickness * 3 / 4]
    ];
    let rects = generateStripe(extents, depths[0][0], depths[0][1]).concat(
      generateStripe(extents, depths[1][0], depths[1][1]));
    return (
      <clipPath id="stripeClip">
        {rects}
      </clipPath>
    );
  }
};

const generateStripe = (extents, startDepth, endDepth) => {
  const points = [
      [startDepth, startDepth, extents[0] - startDepth, endDepth],
      [startDepth, extents[1] - endDepth, extents[0] - startDepth, extents[1] - startDepth],
      [startDepth, startDepth, endDepth, extents[1] - startDepth],
      [extents[0] - endDepth, startDepth, extents[0] - startDepth, extents[1] - startDepth]
    ];
  return rects = points.map((r, index) => <rect key={index} x={r[0]} y={r[1]} width={r[2]-r[0]} height={r[3]-r[1]}/>);

}

const Miters = ({extents, state, strokeWidth}) => {
  return (
    <g id="miters" fill="none" stroke="#333" strokeWidth={strokeWidth}>
      <rect x="0" y="0" width={extents[0]} height={extents[1]}/>
      <line x1="0" y1="0" x2={state.thickness} y2={state.thickness} />
      <line x1="0" y1={extents[1]} x2={state.thickness} y2={extents[1] - state.thickness} />
      <line x1={extents[0]} y1="0" x2={extents[0] - state.thickness} y2={state.thickness} />
      <line x1={extents[0]} y1={extents[1]} x2={extents[0] - state.thickness} y2={extents[1] - state.thickness} />
    </g>
  );
}

const Profile = ({extents, thickness, profile}) => {
  switch(profile) {
    case 'Ogee':
      return <ProfileOgee extents = {extents} thickness = {thickness} />;
    case 'Bead':
      return <ProfileBead extents = {extents} thickness = {thickness} />;
    case 'Molding':
      return <ProfileMolding extents = {extents} thickness = {thickness} />;
    default:
      return null;
  }
}

const ProfileOgee = ({extents, thickness, profile}) => {
  const stops = [
    {
      "offset":0,
      "color":"black"
    },
    {
      "offset":.25,
      "color":"#532",
      "opacity":"0"
    },
    {
      "offset":.6,
      "color":"#532",
      "opacity":"0"
    },
    {
      "offset":.75,
      "color":"black"
    },
    {
      "offset":1,
      "color":"#532",
      "opacity":"0"
    }
  ]
  return (
    <g id="profile-ogee">
      <Gradient name="ogee" stops={stops} />
      {generateProfileEdges(extents, thickness, 0.5, "ogee")}
    </g>
  );
}

const ProfileBead = ({extents, thickness, profile}) => {
  return null;
  // const stops = [
  //   {
  //     "offset":0,
  //     "color":"black"
  //   },
  //   {
  //     "offset":.05,
  //     "color":"#532",
  //     "opacity":"0"
  //   },
  //   {
  //     "offset":.1,
  //     "color":"black"
  //   },
  //   {
  //     "offset":.5,
  //     "color":"#532",
  //     "opacity":"0"
  //   },
  //   {
  //     "offset":.8,
  //     "color":"black"
  //   },
  //   {
  //     "offset":1,
  //     "color":"#532",
  //     "opacity":"0"
  //   }
  // ]
  const stops = [
    {
      "offset":0,
      "color":"black"
    },
    {
      "offset":.05,
      "color":"#532",
      "opacity":"0"
    },
    {
      "offset":.1,
      "color":"#853"
    },
    {
      "offset":.5,
      "color":"#532",
      "opacity":"0"
    },
    {
      "offset":.8,
      "color":"black"
    },
    {
      "offset":1,
      "color":"#532",
      "opacity":"0"
    }
  ]
  return (
    <g id="profile-bead">
      <Gradient name="bead" stops={stops} />
      {generateProfileEdges(extents, thickness, 0.75, "bead")}
    </g>
  );
}

const ProfileMolding = ({extents, thickness, profile}) => {
  return null;
}

const Gradient = ({name, stops}) => {
  const stopsSvg = stops.map(stop => <stop offset={stop.offset} stopColor={stop.color} stopOpacity={stop.opacity}/>);
  return (
    <defs>
      <linearGradient id={name + "_l"}>{stopsSvg}</linearGradient>
      <linearGradient id={name + "_t"} href={"#" + name + "_l"} x1="0" x2="0" y1="0" y2="1"/>
      <linearGradient id={name + "_r"} href={"#" + name + "_l"} x1="1" x2="0" y1="0" y2="0"/>
      <linearGradient id={name + "_b"} href={"#" + name + "_r"} x1="0" x2="0" y1="1" y2="0"/>
    </defs>
  );
}

const generateProfileEdges = (extents, thickness, profileWidth, gradientName) => {
  const corners = [
    [thickness, thickness],
    [extents[0] - thickness, thickness],
    [extents[0] - thickness, extents[1] - thickness],
    [thickness, extents[1] - thickness]
  ];
  const left = `${corners[3][0]},${corners[3][1]}
    ${corners[3][0] - profileWidth},${corners[3][1] + profileWidth}
    ${corners[0][0] - profileWidth},${corners[0][1] - profileWidth}
    ${corners[0][0]},${corners[0][1]}`;
  const top = `${corners[0][0]},${corners[0][1]}
    ${corners[0][0] - profileWidth},${corners[0][1] - profileWidth}
    ${corners[1][0] + profileWidth},${corners[1][1] - profileWidth}
    ${corners[1][0]},${corners[1][1]}`;
  const right = `${corners[1][0]},${corners[1][1]}
    ${corners[1][0] + profileWidth},${corners[1][1] - profileWidth}
    ${corners[2][0] + profileWidth},${corners[2][1] + profileWidth}
    ${corners[2][0]},${corners[2][1]}`;
  const bottom = `${corners[2][0]},${corners[2][1]}
    ${corners[2][0] + profileWidth},${corners[2][1] + profileWidth}
    ${corners[3][0] - profileWidth},${corners[3][1] + profileWidth}
    ${corners[3][0]},${corners[3][1]}`;
  return [
    <polygon points={left} fill={"url(#" + gradientName + "_l)"} stroke = "none"/>,
    <polygon points={top} fill={"url(#" + gradientName + "_t)"} stroke = "none"/>,
    <polygon points={right} fill={"url(#" + gradientName + "_r)"} stroke = "none"/>,
    <polygon points={bottom} fill={"url(#" + gradientName + "_b)"} stroke = "none"/>
  ];
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

  const frameOpening = {
    "x": state.thickness,
    "y": state.thickness,
    "width": state.width,
    "height": state.height
  };

  const innerOpening = {
    "x": openingDimensions.x + matDepth,
    "y": openingDimensions.y + matDepth,
    "right": openingDimensions.right - matDepth,
    "bottom": openingDimensions.bottom - matDepth,
    "width": openingDimensions.width - 2 * matDepth,
    "height": openingDimensions.height - 2 * matDepth
  };

  if (!state.mat) {
    return (
      <g id="contents">
        <rect x={frameOpening.x} y={frameOpening.y} width={frameOpening.width} height={frameOpening.height} fill="white" stroke="none" />
        <Artwork art={state.art} extents={extents} bounds={frameOpening}/>
      </g>
    );
  }

  return (
    <g id="contents" stroke="#666" strokeWidth={strokeWidth}>
      <rect x={frameOpening.x} y={frameOpening.y} width={frameOpening.width} height={frameOpening.height} fill={matColors[state.matColor]} stroke="#333" />
      <rect x={openingDimensions.x} y={openingDimensions.y} width={openingDimensions.width} height={openingDimensions.height} fill="white" />
      <rect x={innerOpening.x} y={innerOpening.y} width={innerOpening.width} height={innerOpening.height} fill="none" />
      <line x1={openingDimensions.x} y1={openingDimensions.y} x2={innerOpening.x} y2={innerOpening.y} />
      <line x1={openingDimensions.x} y1={openingDimensions.bottom} x2={innerOpening.x} y2={innerOpening.bottom} />
      <line x1={openingDimensions.right} y1={openingDimensions.y} x2={innerOpening.right} y2={innerOpening.y} />
      <line x1={openingDimensions.right} y1={openingDimensions.bottom} x2={innerOpening.right} y2={innerOpening.bottom} />
      <Artwork art={state.art} extents={extents} bounds={innerOpening}/>
    </g>
  );
}

const Artwork = ({art, extents, bounds}) => {
  if (!art || !art.width || !art.height || (!art.filename && !art.url)) {
    return (<></>);
  }

  const link = art.filename ? `/art/${art.filename}` : art.url ? art.url : '';
  const center = [extents[0] / 2, extents[1] / 2];
  const imageExtents = {
    "x": center[0] - (art.width / 2),
    "y": center[1] - (art.height / 2),
    "width": art.width,
    "height": art.height,
    "right": center[0] + (art.width / 2),
    "bottom": center[1] + (art.height / 2)
  };

  return (
    <g id="art">
      <clipPath id="artClipPath">
        <rect x={bounds.x} y={bounds.y} width={bounds.width} height={bounds.height}/>
      </clipPath>
      <image href={link} x={imageExtents.x} y={imageExtents.y} width={imageExtents.width} height={imageExtents.height} clipPath="url(#artClipPath)"/>
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
      <Profile extents = {extents} thickness = {state.thickness} profile = {state.profile} />
      <Mat extents = {extents} state = {state} strokeWidth = {strokeWidth} matColors={matColors} />
      <Miters extents = {extents} state = {state} strokeWidth = {strokeWidth} />
    </svg>
  );
};

export default Preview;
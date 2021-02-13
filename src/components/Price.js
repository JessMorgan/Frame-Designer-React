import React from 'react';

const calculatePrice = (prices, width, height, thickness, stripes, profile, glazing, mat) => {
  let results = {};
  results.woodPrice = calculateWoodPrice(prices.wood, prices.woodThickness, width, height, thickness);
  results.stripeExtra = calculateStripePrice(prices.stripe, results.woodPrice, stripes);
  results.profileExtra = calculateProfilePrice(prices['profile'+profile], results.woodPrice);
  results.glassPrice = calculateGlassPrice(prices.glass, glazing, width, height);
  results.matPrice = calculateMatPrice(prices.mat, mat, width, height);
  results.total = results.woodPrice + results.stripeExtra + results.profileExtra + results.glassPrice + results.matPrice;
  return results;
}

const calculateWoodPrice = (price, thicknessMultiplier, width, height, thickness) => {
  const verticalInches = height + thickness * 2;
  const horizontalInches = width + thickness * 2;

  const basePrice = (verticalInches + horizontalInches) * price;

  const thicknessCost = Math.max(0, (thickness - 0.75)) * thicknessMultiplier * basePrice;

  return basePrice + thicknessCost;
}

const calculateStripePrice = (stripePrice, stripes, woodPrice) => {
  return stripePrice * stripes * woodPrice;
}

const calculateProfilePrice = (profilePrice, woodPrice) => {
  return profilePrice * woodPrice;
}

const calculateGlassPrice = (price, glazing, width, height) => {
  if (glazing == 'No Glass') {
    return 0;
  }
  return width * height * price;
}

const calculateMatPrice = (price, mat, width, height) => {
  if (!mat) {
    return 0;
  }
  return width * height * price;
}

const Price = props => {
  React.useEffect(() => {
    fetch('/price.txt')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(prices => {setPrices(prices);})
      .catch(error => console.log(`Error fetching price list: ${error}`));
  }, []);
  const [prices, setPrices] = React.useState({});
  const results = calculatePrice(prices,
    Number(props.state.width),
    Number(props.state.height),
    Number(props.state.thickness),
    Number(props.state.stripes),
    props.state.profile,
    props.state.glazing,
    props.state.mat)
  return(
    <div>
      <ul>
        <li>Wood: {results.woodPrice}</li>
        <li>Stripes: {results.stripeExtra}</li>
        <li>Profile: {results.profileExtra}</li>
        <li>Glass: {results.glassPrice}</li>
        <li>Mat: {results.matPrice}</li>
        <li>Total: {results.total}</li>
      </ul>
    </div>
  );
};

export default Price;
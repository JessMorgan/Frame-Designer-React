import React from 'react';
import NumberFormat from 'react-number-format';

const Money = ({value}) => {
  return (
    isNaN(value) ?
      <span>-calculating/errored-</span>
      : <NumberFormat value={value} displayType='text' decimalScale={2} fixedDecimalScale={true} thousandSeparator={true} prefix={'$'} />
  );
}

const calculatePrice = (prices, wood, width, height, thickness, stripes, profile, glazing, finish, mat) => {
  let results = {};
  const woodBasePrice = prices["wood" + wood] ? prices["wood" + wood] : prices.wood;
  results.woodPrice = calculateWoodPrice(woodBasePrice, prices.woodThickness, width, height, thickness);
  results.stripeExtra = calculateStripePrice(prices.stripe, results.woodPrice, stripes);
  results.profileExtra = calculateProfilePrice(prices['profile'+profile], results.woodPrice);
  results.glassPrice = calculateGlassPrice(prices, prices.glassMin, glazing, width, height);
  results.finishPrice = calculateFinishPrice(prices, results.woodPrice, finish);
  results.matPrice = calculateMatPrice(prices.mat, prices.matMin, mat, width, height);
  results.shipping = calculateShipping(prices, width, height, thickness, glazing);
  results.subtotal = results.woodPrice + results.stripeExtra + results.profileExtra + results.glassPrice + results.finishPrice + results.matPrice;
  results.total = results.subtotal + results.shipping;
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

const calculateGlassPrice = (prices, minPrice, glazing, width, height) => {
  if (glazing === 'None') {
    return 0;
  }
  return Math.max(minPrice, width * height * prices["glazing" + glazing]);
}

const calculateFinishPrice = (prices, woodPrice, finish) => {
  return prices["finish" + finish] * woodPrice;
}

const calculateMatPrice = (price, minPrice, mat, width, height) => {
  if (!mat) {
    return 0;
  }
  return Math.max(minPrice, width * height * price);
}

const calculateShipping = (prices, width, height, thickness, glazing) => {
  const linearInches = height + width + thickness * 4;
  const maxShippingInches = 36 + 24 + 2*4;
  const minShippingInches = 6 + 4 + 0.5*4;
  const shippingPerInch = (prices.shippingMax - prices.shippingMin) / (maxShippingInches - minShippingInches);
  let shipping = prices.shippingMin + shippingPerInch * (linearInches - minShippingInches);
  if (shipping < prices.shippingMin) {
    shipping = prices.shippingMin;
  }
  if (glazing === "Glass") {
    shipping *= prices.shippingGlassFactor;
  } else if (glazing === "Acrylic") {
    shipping *= prices.shippingAcrylicFactor;
  }
  return shipping;
}

const Price = ({state}) => {
  React.useEffect(() => {
    fetch('price.txt')
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
    state.wood,
    Number(state.width),
    Number(state.height),
    Number(state.thickness),
    Number(state.stripes),
    state.profile,
    state.glazing,
    state.finish,
    state.mat)
  return(
    <div>
      <dl>
        { /*
        <li>Wood: <Money value={results.woodPrice}/></li>
        <li>Stripes: <Money value={results.stripeExtra}/></li>
        <li>Profile: <Money value={results.profileExtra}/></li>
        <li>Glass: <Money value={results.glassPrice}/></li>
        <li>Mat: <Money value={results.matPrice}/></li>
        */ }
        <dt>Local Pickup Price:</dt>
        <dd><Money value={results.subtotal}/></dd>
        <dt>Shipping:</dt>
        <dd><Money value={results.shipping}/></dd>
        <dt>Shipped Total:</dt>
        <dd><Money value={results.total}/></dd>
      </dl>
    </div>
  );
};

export default Price;
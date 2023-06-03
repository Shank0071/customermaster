

const products = {
  };

const initial = {
    4: 0,
    4.5: 0,
    5: 0,
    5.5: 0,
    6: 0,
    6.5: 0,
    7: 0,
    7.5: 0,
    8: 0,
    8.5: 0,
    9: 0,
    9.5: 0,
    10: 0,
    10.5: 0,
    11: 0,
    11.5: 0,
  };

const initialState = {
    4: 0,
    4.5: 0,
    5: 0,
    5.5: 0,
    6: 0,
    6.5: 0,
    7: 0,
    7.5: 0,
    8: 0,
    8.5: 0,
    9: 0,
    9.5: 0,
    10: 0,
    10.5: 0,
    11: 0,
    11.5: 0,
  };

const totalCalculator = (arr) => {
    let sum = 0;
    arr.map((p) => {
      return (sum += p);
    });
    return sum;
  };





export { products, initial, initialState, totalCalculator }

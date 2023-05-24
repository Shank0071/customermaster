import React, { useState, useReducer } from "react";
import Sizes from "./Sizes";
import "./OrderSheet.css";

const products = {
  skPlainMugappu: 70,
  skKeelArumbuMugappu: 80,
  sk2SideArumbuMugappu: 90,
  skOttuMuthuMugappu: 85,
  skLineSalangai: 150,
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

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_VALUES":
      return { ...state, ...action.payload };
    case "RESET":
      return initial;
    default:
      return state;
  }
};

const OrderSheet = () => {
  const [orders, setOrders] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [seal, setSeal] = useState("");
  const [touch, setTouch] = useState("");
  const [totWeights, setTotWeights] = useState([]);
  const [viewTable, setViewTable] = useState(false);
  const [pieces, setPieces] = useState([]);

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

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch({ type: "UPDATE_VALUES", payload: { [name]: value } });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newOrder = {
      id: orders.length + 1,
      customerName,
      product,
      touch,
      seal,
      quantity,
      orderDate,
      4: state[4],
      4.5: state[4.5],
      5: state[5],
      5.5: state[5.5],
      6: state[6],
      6.5: state[6.5],
      7: state[7],
      7.5: state[7.5],
      8: state[8],
      8.5: state[8.5],
      9: state[9],
      9.5: state[9.5],
      10: state[10],
      10.5: state[10.5],
      11: state[11],
      11.5: state[11.5],
    };

    let index = 4;
    let weight = 0;
    let pics = 0;

    for (let i = 4; i < 20; i++) {
      console.log("indd", index);
      weight +=
        (products[newOrder["product"]] / 10) * (+newOrder[index] * index);
      pics += +newOrder[index];
      index += 0.5;
    }

    newOrder.weight = weight;
    newOrder.pieces = pics;
    setPieces([...pieces, pics]);
    console.log(pieces);
    setTotWeights([...totWeights, weight]);
    console.log(totWeights);
    setOrders([...orders, newOrder]);
    // Reset form fields
    // setCustomerName('');
    setProduct("");
    // setQuantity('');
    // setOrderDate('');
    // setTouch("");
    // setSeal("");
    dispatch({ type: "RESET", payload: initialState });
  };

  const handlePrint = () => {
    window.print();
    setCustomerName("");
    setProduct("");
    setQuantity("");
    setOrderDate("");
    setTouch("");
    setSeal("");
  };

  const totalCalculator = (arr) => {
    let sum = 0;
    arr.map((p) => {
      return (sum += p);
    });
    return sum;
  };

  const isColumnZero = (columnName) => {
    return orders.every((row) => row[columnName] === 0);
  };

  console.log(isColumnZero("4"));

  return (
    <div>
      {!viewTable && (
        <div>
          <h1>Order Sheet</h1>
          <form onSubmit={handleSubmit}>
            <div className="topview">
              <div>
                <div>
                  <label htmlFor="order-date">Order Date:</label>
                  <input
                    type="date"
                    id="order-date"
                    value={orderDate}
                    onChange={(e) => setOrderDate(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="customer-name">Customer Name:</label>
                  <input
                    type="text"
                    id="customer-name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="product">Product:</label>
                  <select
                    id="product"
                    name="product"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    required
                  >
                    <option value="">Select a product</option>
                    <option value="skPlainMugappu">SK Plain Mugappu</option>
                    <option value="skKeelArumbuMugappu">
                      SK Keel Arumbu Mugappu
                    </option>
                    <option value="sk2SideArumbuMugappu">
                      SK 2-side Arumbu Mugappu
                    </option>
                    <option value="skOttuMuthuMugappu">
                      SK Ottu Muthu Mugappu
                    </option>
                    <option value="skLineSalangai">SK Line Salangai</option>
                  </select>
                </div>
              </div>

              <div>
                <div>
                  <label htmlFor="seal">Seal:</label>
                  <input
                    type="text"
                    id="seal"
                    value={seal}
                    onChange={(e) => setSeal(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="touch">Touch:</label>
                  <input
                    type="text"
                    id="touch"
                    value={touch}
                    onChange={(e) => setTouch(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="sizes">
              {[
                4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11,
                11.5,
              ].map((s) => (
                <Sizes
                  size={s}
                  key={s}
                  name={`${s}`}
                  value={state[s]}
                  handleChange={handleChange}
                />
              ))}
            </div>

            <button type="submit">Place Order</button>
          </form>

          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Weight</th>
                {[
                  4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11,
                  11.5,
                ].map((s) => (
                  <th key={s}>{s}</th>
                ))}
                <th>Total Wt.</th>
                <th>Total Pcs.</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.product}</td>
                  <td>{products[`${order.product}`]}</td>
                  {[
                    4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5,
                    11, 11.5,
                  ].map((s) => (
                    <td key={s}>{order[s]}</td>
                  ))}
                  <td>{order.weight}</td>
                  <td>{order.pieces}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn" onClick={() => setViewTable((prev) => !prev)}>
            View Table
          </button>
        </div>
      )}

      {viewTable && (
        <div>
          <h1>Customer Name: {customerName}</h1>
          <div className="order_summary">
            <h3>Seal: {seal}</h3>
            <h3>Touch: {touch}</h3>
            <h3>Order Date: {orderDate}</h3>
          </div>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Weight</th>
                {[
                  4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11,
                  11.5,
                ].map((s) => !isColumnZero("" + s) && <th key={s}>{s}</th>)}
                <th>Total Wt.</th>
                <th>Total Pcs.</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.product}</td>
                  <td>{products[`${order.product}`]}</td>
                  {[
                    4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5,
                    11, 11.5,
                  ].map(
                    (s) => !isColumnZero("" + s) && <td key={s}>{order[s]}</td>
                  )}
                  <td>{order.weight}</td>
                  <td>{order.pieces}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="weightPieceInfo">
            <h3>Weight: {totalCalculator(totWeights)}</h3>
            <h3>Pieces: {totalCalculator(pieces)}</h3>
          </div>
          <button className="btn" onClick={() => setViewTable((prev) => !prev)}>
            View Order Sheet
          </button>
          <button className="btn" onClick={handlePrint}>
            Print
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderSheet;

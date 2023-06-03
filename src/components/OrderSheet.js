import React, { useState, useReducer, useRef, useEffect } from "react";
import Sizes from "./Sizes";
import Table from "./Table";
import OrderTable from "./OrderTable";
import AddProductForm from "./forms/AddProductForm";
import { collection, addDoc } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase/firebase";
import {
  products,
  initialState,
  initial,
  totalCalculator,
} from "../constants/constants";
import "./OrderSheet.css";

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

const addDocument = async (newDocumentData, collectionName) => {
  try {
    const collectionRef = collection(db, collectionName);

    await addDoc(collectionRef, newDocumentData);

    alert("Document added successfully!");
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

const OrderSheet = () => {
  const pdctRef = useRef("");
  const wtRef = useRef(0);
  const pdctTamilRef = useRef("");
  const [products1, setProducts1] = useState([]);

  const [value, loading, error] = useCollection(collection(db, "products"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  useEffect(() => {
    if (loading) {
      console.log("loading...");
    } else if (error) {
      console.log("error");
    } else if (value) {
      console.log(value);
      let results = [];
      value.docs.map((doc) => {
        console.log(doc.data().name);
        products[doc.data().name] = [doc.data().weight, doc.data().tamilName];
        results.push({
          name: doc.data().name,
          tamilName: doc.data().tamilName,
          weight: doc.data().weight,
        });
        return results;
      });
      setProducts1(results);

      // console.log(results)
    }
  }, [loading, value, error]);

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
  const [productFormView, setProductFormView] = useState(false);

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
      weight +=
        (products[newOrder["product"]][0] / 10) * (+newOrder[index] * index);
      pics += +newOrder[index];
      index += 0.5;
    }

    newOrder.weight = Number(weight).toFixed(2);
    newOrder.pieces = pics;
    setPieces([...pieces, pics]);
    console.log(pieces);
    setTotWeights([...totWeights, weight]);
    console.log(totWeights);
    setOrders([...orders, newOrder]);
    setProduct("");
    dispatch({ type: "RESET", payload: initialState });
    console.log("orders ", orders);
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

  const handleProductForm = (e) => {
    e.preventDefault();
    addDocument(
      {
        name: pdctRef.current.value,
        tamilName: pdctTamilRef.current.value,
        weight: +wtRef.current.value,
      },
      "products"
    );
    setProductFormView((prev) => !prev);
  };

  const handleClickProduct = () => {
    setProductFormView((prev) => !prev);
  };

  const isColumnZero = (columnName) => {
    return orders.every((row) => row[columnName] === 0);
  };

  return (
    <div>
      {productFormView && (
        <AddProductForm
          handleProductForm={handleProductForm}
          pdctRef={pdctRef}
          pdctTamilRef={pdctTamilRef}
          wtRef={wtRef}
          addDocument={addDocument}
          handleClickProduct={handleClickProduct}
        />
      )}

      {!viewTable && value && (
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
                    {products1.map((p) => (
                      <option key={p.name} value={`${p.name}`}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="topview_right">
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

                <div>
                  <button
                    onClick={() => setProductFormView((prev) => !prev)}
                    className="btn topview_btn"
                  >
                    Add Product
                  </button>
                  {/* <button
                    onClick={() => setProductFormView((prev) => !prev)}
                    className="btn topview_btn"
                  >
                    Add Customer
                  </button> */}
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

          <Table orders={orders} products={products} />
          <button className="btn" onClick={() => setViewTable((prev) => !prev)}>
            View Table
          </button>
        </div>
      )}

      {viewTable && value && (
        <div>
          <h1>Customer Name: {customerName}</h1>
          <div className="order_summary">
            <h3>Seal: {seal}</h3>
            <h3>Touch: {touch}</h3>
            <h3>Order Date: {orderDate}</h3>
          </div>
          <OrderTable
            orders={orders}
            isColumnZero={isColumnZero}
            products={products}
          />
          <div className="weightPieceInfo">
            <h3>Weight: {totalCalculator(totWeights).toFixed(2)}</h3>
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

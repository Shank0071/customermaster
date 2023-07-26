import React, { useState } from "react";
import { db } from "../../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";

import "./UpdateDocumentById.css";

const UpdateDocumentById = ({ handleClickEditProduct, products }) => {
  const [newProductName, setNewProductName] = useState("");
  const [newTamilName, setNewTamilName] = useState("");
  const [newWeight, setNewWeight] = useState(0);
  const [product, setProduct] = useState("");

  console.log(product);

  const handleUpdate = async (documentId) => {
    try {
      // Get the reference to the document by its ID
      const userRef = doc(db, "products", documentId);

      // Update the document with the new data
      await updateDoc(userRef, {
        name: newProductName,
        tamilName: newTamilName,
        weight: newWeight,
      });

      alert("Document updated successfully!");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <div className="edit">
      <form className="editForm">
        <h1 className="cancel" onClick={handleClickEditProduct}>
          x
        </h1>
        <div className="editForm-group">
          <label htmlFor="product">Product:</label>
          <select
            id="product"
            name="product"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            required
          >
            <option value="">Select a product</option>
            {products.map((p) => (
              <option key={p.name} value={`${p.id}`}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <input
          type="text"
          placeholder="New Product"
          value={newProductName}
          onChange={(e) => setNewProductName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="New Tamil Name"
          value={newTamilName}
          onChange={(e) => setNewTamilName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="New Weight"
          value={newWeight}
          onChange={(e) => setNewWeight(e.target.value)}
          required
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            handleUpdate(product);
          }}
          className="btn"
        >
          Update Document
        </button>
      </form>
    </div>
  );
};

export default UpdateDocumentById;

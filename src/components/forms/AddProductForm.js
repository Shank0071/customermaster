import "./AddProductForm.css";

export default function AddProductForm({handleProductForm, pdctRef, pdctTamilRef ,wtRef, handleClickProduct}) {
 

  return (
    <div className="product_div">
      <form onSubmit={handleProductForm} className="product_form">
        <h1 className="cancel" onClick={handleClickProduct}>x</h1>
        <div className="product_form_div">
          <label>
            <span>Add Product:</span>
            <input type="text" ref={pdctRef} required />
          </label>
          <label>
            <span>Add Product (Tamil):</span>
            <input type="text" ref={pdctTamilRef} required />
          </label>
          <label>
            <span>Add Weight:</span>
            <input type="number" ref={wtRef} required />
          </label>
        </div>
        <button type="submit" className="btn">
          Add Product
        </button>
      </form>
    </div>
  );
}

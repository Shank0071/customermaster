import { useState } from "react";
import { db } from "../firebase/firebase";
import { collection, addDoc } from 'firebase/firestore';
import "./NewCustomerForm.css";



export default function NewCustomerForm() {
    const [name, setName] = useState("");
    const [gst, setGst] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [cell1, setCell1] = useState("");
    const [cell2, setCell2] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");

    const collectionRef = collection(db, 'customers');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, gst, address1, address2, phone, cell2)
        addDoc(collectionRef, {
            customerName: name,
            GST: gst,
            address1: address1,
            address2: address2,
            cell1: cell1,
            cell2: cell2,
            phone: phone,
            city: city,
            state: state

          })
            .then((docRef) => {
              console.log('Document written with ID: ', docRef.id);
              setAddress1("");
              setAddress2("");
              setName("");
              setGst("");
              setCell1("");
              setCell2("");
              setPhone("");
              setCity("");
              setState("");
              alert("Successfully added the man")
            })
            .catch((error) => {
              console.error('Error adding document: ', error);
            });
          
        
    }








  return (
    <div className="customer__form">
        <h1>Customer Info:</h1>
        <form onSubmit={handleSubmit}>
            <label>
                <span>Name:</span>
                <input type="text" onChange={(e) => setName(e.target.value)} value={name} required/>
            </label>
            <label>
                <span>GST:</span>
                <input type="text" onChange={(e) => setGst(e.target.value)} value={gst} required/>
            </label>
            <label>
                <span>Address1:</span>
                <textarea cols="30" rows="10" onChange={(e) => setAddress1(e.target.value)} value={address1} required></textarea>
            </label>
            <label>
                <span>Address2:</span>
                <textarea cols="30" rows="10" onChange={(e) => setAddress2(e.target.value)} value={address2}></textarea>
            </label>
            <label>
                <span>Cell1:</span>
                <input type="text" onChange={(e) => setCell1(e.target.value)} value={cell1} required/>
            </label>
            <label>
                <span>Cell2:</span>
                <input type="text" onChange={(e) => setCell2(e.target.value)} value={cell2} required/>
            </label>
            <label>
                <span>Phone:</span>
                <input type="text" onChange={(e) => {setPhone(e.target.value)}} value={phone}/>
            </label>
            <label>
                <span>City:</span>
                <input type="text" onChange={(e) => {setCity(e.target.value)}} value={city} required/>
            </label>
            <label>
                <span>State:</span>
                <input type="text" onChange={(e) => {setState(e.target.value)}} value={state} required/>
            </label>
            <button>Submit</button>
        </form>
    </div>
  )
}

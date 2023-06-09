import "./Sizes.css"


export default function Sizes({ size, name, value, handleChange }) {
  return (
    <div className="nums">
        <label htmlFor="quantity">{ size }</label>
        <input
            type="number"
            name={name}
            value={value}
            onChange={handleChange}
            min="0"
            required
        />
    </div>
  )
}

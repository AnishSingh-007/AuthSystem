import "./input.css"

export default function Input({
label,
type="text",
value,
onChange,
placeholder,
required
}){

return(

<div className="input-group">

<label>{label}</label>

<input
type={type}
value={value}
onChange={onChange}
placeholder={placeholder}
required={required}
/>

</div>

)

}
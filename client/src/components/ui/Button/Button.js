import "./button.css"
import clsx from "clsx"

export default function Button({
  children,
  onClick,
  type="button",
  variant="primary",
  disabled=false
}){

return(

<button
type={type}
className={clsx("btn",`btn-${variant}`)}
onClick={onClick}
disabled={disabled}
>
{children}
</button>

)

}
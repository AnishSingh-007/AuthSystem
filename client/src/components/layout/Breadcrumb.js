import { useLocation } from "react-router-dom"

export default function Breadcrumb() {

    const location = useLocation()

    const parts = location.pathname.split("/").filter(Boolean)

    return (

        <div className="breadcrumb">

            {parts.map((p, i) => (
                <span key={i}>{p} / </span>
            ))}

        </div>

    )

}
export default function GlobalLoader() {

    return (

        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(255,255,255,.7)"
        }}>

            <div className="loader" />

        </div>

    )

}
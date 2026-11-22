import { useState } from "react"
import { verify2FA } from "../../api/authApi"
import { Input, Button, Card } from "../../components/ui"

export default function TwoFactorVerify() {

    const [token, setToken] = useState("")

    const submit = async (e) => {

        e.preventDefault()

        await verify2FA({ token })

        window.location.href = "/dashboard"

    }

    return (

        <Card>

            <h2>Two Factor Authentication</h2>

            <form onSubmit={submit}>

                <Input
                    label="Enter OTP"
                    value={token}
                    onChange={e => setToken(e.target.value)}
                    required
                />

                <Button type="submit">Verify</Button>

            </form>

        </Card>

    )
}
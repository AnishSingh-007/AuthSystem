import { useEffect, useState } from "react"
import MainLayout from "../../components/layout/MainLayout"
import { getRecoveryCodes } from "../../api/securityApi"
import { Card } from "../../components/ui"

export default function RecoveryCodes() {

    const [codes, setCodes] = useState([])

    useEffect(() => {

        getRecoveryCodes().then(res => setCodes(res.data))

    }, [])

    return (

        <MainLayout>

            <h2>Recovery Codes</h2>

            <Card>

                <p>Use these codes if you lose access to your authenticator.</p>

                <ul>

                    {codes.map((c, i) => (
                        <li key={i}>{c}</li>
                    ))}

                </ul>

            </Card>

        </MainLayout>

    )

}
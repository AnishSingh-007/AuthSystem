import { useEffect, useState } from "react"
import MainLayout from "../../components/layout/MainLayout"
import { Card } from "../../components/ui"
import api from "../../api/axiosClient"

export default function SecurityCenter() {

    const [stats, setStats] = useState({})

    useEffect(() => {

        api.get("/security/overview")
            .then(res => setStats(res.data))

    }, [])

    return (

        <MainLayout>

            <h2>Security Center</h2>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: "20px"
            }}>

                <Card>
                    <h4>Active Sessions</h4>
                    <p>{stats.sessions}</p>
                </Card>

                <Card>
                    <h4>Trusted Devices</h4>
                    <p>{stats.devices}</p>
                </Card>

                <Card>
                    <h4>Security Alerts</h4>
                    <p>{stats.alerts}</p>
                </Card>

            </div>

        </MainLayout>

    )

}
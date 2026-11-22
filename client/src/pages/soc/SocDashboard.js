import { useEffect, useState } from "react"
import MainLayout from "../../components/layout/MainLayout"
import { getSocOverview } from "../../api/socApi"
import { Card } from "../../components/ui"

export default function SocDashboard() {

    const [data, setData] = useState({})

    useEffect(() => {
        getSocOverview().then(res => setData(res.data))
    }, [])

    return (

        <MainLayout>

            <h2>Security Operations Center</h2>

            <div className="soc-grid">

                <Card>
                    <h4>Failed Logins (24h)</h4>
                    <p>{data.failedLogins}</p>
                </Card>

                <Card>
                    <h4>Suspicious Devices</h4>
                    <p>{data.suspiciousDevices}</p>
                </Card>

                <Card>
                    <h4>Blocked IPs</h4>
                    <p>{data.blockedIPs}</p>
                </Card>

                <Card>
                    <h4>Active Sessions</h4>
                    <p>{data.sessions}</p>
                </Card>

            </div>

        </MainLayout>

    )

}
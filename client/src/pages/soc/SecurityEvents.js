import { useEffect, useState } from "react"
import MainLayout from "../../components/layout/MainLayout"
import { getSecurityEvents } from "../../api/socApi"
import { Table, Card } from "../../components/ui"

export default function SecurityEvents() {

    const [data, setData] = useState([])

    useEffect(() => {
        getSecurityEvents().then(res => setData(res.data))
    }, [])

    const columns = [

        { key: "event", label: "Event" },
        { key: "severity", label: "Severity" },
        { key: "ip", label: "IP" },
        { key: "createdAt", label: "Time" }

    ]

    return (

        <MainLayout>

            <h2>Security Events</h2>

            <Card>

                <Table columns={columns} data={data} />

            </Card>

        </MainLayout>

    )

}
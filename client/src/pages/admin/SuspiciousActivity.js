import { useEffect, useState } from "react"
import MainLayout from "../../components/layout/MainLayout"
import { getSuspiciousActivity } from "../../api/adminApi"
import { Table, Card } from "../../components/ui"

export default function SuspiciousActivity() {

    const [data, setData] = useState([])

    useEffect(() => {
        getSuspiciousActivity().then(res => setData(res.data))
    }, [])

    const columns = [

        { key: "ip", label: "IP" },
        { key: "userAgent", label: "Device" },
        { key: "riskScore", label: "Risk" },
        { key: "createdAt", label: "Date" }

    ]

    return (

        <MainLayout>

            <h2>Suspicious Activity</h2>

            <Card>

                <Table columns={columns} data={data} />

            </Card>

        </MainLayout>

    )

}
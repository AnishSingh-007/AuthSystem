import { useEffect, useState } from "react"
import MainLayout from "../../components/layout/MainLayout"
import { getLoginHistory } from "../../api/securityApi"
import { Table, Card } from "../../components/ui"

export default function LoginHistory() {

    const [logs, setLogs] = useState([])

    useEffect(() => {

        getLoginHistory().then(res => setLogs(res.data))

    }, [])

    const columns = [

        { key: "ip", label: "IP Address" },
        { key: "userAgent", label: "Device" },
        { key: "createdAt", label: "Date" },
        { key: "action", label: "Status" }

    ]

    return (

        <MainLayout>

            <h2>Login History</h2>

            <Card>

                <Table columns={columns} data={logs} />

            </Card>

        </MainLayout>

    )

}
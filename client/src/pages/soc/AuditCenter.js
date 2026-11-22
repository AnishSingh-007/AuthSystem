import { useEffect, useState } from "react"
import MainLayout from "../../components/layout/MainLayout"
import { getAuditLogs } from "../../api/socApi"
import { Table, Card } from "../../components/ui"

export default function AuditCenter() {

    const [logs, setLogs] = useState([])

    useEffect(() => {
        getAuditLogs().then(res => setLogs(res.data))
    }, [])

    const columns = [

        { key: "user", label: "User", render: (l) => l.user?.email },

        { key: "action", label: "Action" },

        { key: "ip", label: "IP" },

        { key: "createdAt", label: "Date" }

    ]

    return (

        <MainLayout>

            <h2>Audit Center</h2>

            <Card>

                <Table columns={columns} data={logs} />

            </Card>

        </MainLayout>

    )

}
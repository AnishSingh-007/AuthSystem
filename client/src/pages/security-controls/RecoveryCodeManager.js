import { useEffect, useState } from "react"
import MainLayout from "../../components/layout/MainLayout"
import { getRecoveryCodeStats } from "../../api/securityControlApi"
import { Table, Card } from "../../components/ui"

export default function RecoveryCodeManager() {

    const [data, setData] = useState([])

    useEffect(() => {
        getRecoveryCodeStats().then(res => setData(res.data))
    }, [])

    const columns = [

        { key: "user", label: "User", render: (r) => r.user?.email },

        { key: "codeUsed", label: "Code Used" },

        { key: "usedAt", label: "Date" }

    ]

    return (

        <MainLayout>

            <h2>Recovery Code Usage</h2>

            <Card>

                <Table columns={columns} data={data} />

            </Card>

        </MainLayout>

    )

}
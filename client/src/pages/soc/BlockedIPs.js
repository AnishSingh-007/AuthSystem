import { useEffect, useState } from "react"
import MainLayout from "../../components/layout/MainLayout"
import { getBlockedIPs } from "../../api/socApi"
import { Table, Card } from "../../components/ui"

export default function BlockedIPs() {

    const [ips, setIps] = useState([])

    useEffect(() => {
        getBlockedIPs().then(res => setIps(res.data))
    }, [])

    const columns = [

        { key: "ip", label: "IP Address" },
        { key: "reason", label: "Reason" },
        { key: "createdAt", label: "Blocked Date" }

    ]

    return (

        <MainLayout>

            <h2>Blocked IPs</h2>

            <Card>

                <Table columns={columns} data={ips} />

            </Card>

        </MainLayout>

    )

}
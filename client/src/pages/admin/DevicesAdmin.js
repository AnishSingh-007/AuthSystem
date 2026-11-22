import { useEffect, useState } from "react"
import MainLayout from "../../components/layout/MainLayout"
import { getAllDevices } from "../../api/adminApi"
import { Table, Card } from "../../components/ui"

export default function DevicesAdmin() {

    const [devices, setDevices] = useState([])

    useEffect(() => {
        getAllDevices().then(res => setDevices(res.data))
    }, [])

    const columns = [

        { key: "ip", label: "IP" },
        { key: "userAgent", label: "Device" },
        { key: "user", label: "User", render: (d) => d.user?.email },
        { key: "lastUsed", label: "Last Used" }

    ]

    return (

        <MainLayout>

            <h2>Device Monitoring</h2>

            <Card>

                <Table columns={columns} data={devices} />

            </Card>

        </MainLayout>

    )

}
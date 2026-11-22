import { useEffect, useState } from "react"
import MainLayout from "../../components/layout/MainLayout"
import { getDevices } from "../../api/securityApi"
import { Table, Card } from "../../components/ui"

export default function Devices() {

    const [devices, setDevices] = useState([])

    useEffect(() => {

        getDevices().then(res => setDevices(res.data))

    }, [])

    const columns = [

        { key: "ip", label: "IP" },
        { key: "userAgent", label: "Device" },
        { key: "lastUsed", label: "Last Used" },
        { key: "isTrusted", label: "Trusted" }

    ]

    return (

        <MainLayout>

            <h2>Devices</h2>

            <Card>

                <Table columns={columns} data={devices} />

            </Card>

        </MainLayout>

    )

}
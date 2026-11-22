import { useEffect, useState } from "react"
import MainLayout from "../../components/layout/MainLayout"
import { getTrustedDevices, trustDevice } from "../../api/sessionApi"
import { Table, Button, Card } from "../../components/ui"

export default function TrustedDevices() {

    const [devices, setDevices] = useState([])

    useEffect(() => {
        load()
    }, [])

    const load = async () => {
        const res = await getTrustedDevices()
        setDevices(res.data)
    }

    const trust = async (id) => {

        await trustDevice(id)

        load()

    }

    const columns = [

        { key: "ip", label: "IP" },

        { key: "userAgent", label: "Device" },

        { key: "isTrusted", label: "Trusted" },

        {
            key: "action",
            label: "Trust",
            render: (row) => (
                <Button
                    onClick={() => trust(row._id)}
                >
                    Trust Device
                </Button>
            )
        }

    ]

    return (

        <MainLayout>

            <h2>Trusted Devices</h2>

            <Card>

                <Table columns={columns} data={devices} />

            </Card>

        </MainLayout>

    )

}
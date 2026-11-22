import { useEffect, useState } from "react"
import MainLayout from "../../components/layout/MainLayout"
import { getTrustedDevices, revokeDevice } from "../../api/sessionApi"
import { Table, Button, Card } from "../../components/ui"
import { toast } from "react-toastify"

export default function DeviceManager() {

    const [devices, setDevices] = useState([])

    useEffect(() => {
        load()
    }, [])

    const load = async () => {
        const res = await getTrustedDevices()
        setDevices(res.data)
    }

    const removeDevice = async (id) => {

        await revokeDevice(id)

        toast.success("Device revoked")

        load()

    }

    const columns = [

        { key: "ip", label: "IP" },

        { key: "userAgent", label: "Device" },

        { key: "deviceFingerprint", label: "Fingerprint" },

        { key: "lastUsed", label: "Last Used" },

        {
            key: "action",
            label: "Action",
            render: (row) => (
                <Button
                    variant="danger"
                    onClick={() => removeDevice(row._id)}
                >
                    Remove
                </Button>
            )
        }

    ]

    return (

        <MainLayout>

            <h2>Device Manager</h2>

            <Card>

                <Table columns={columns} data={devices} />

            </Card>

        </MainLayout>

    )

}
import { useEffect, useState } from "react"
import MainLayout from "../../components/layout/MainLayout"
import { getSessions, revokeSession } from "../../api/securityApi"
import { Table, Button, Card } from "../../components/ui"
import { toast } from "react-toastify"

export default function Sessions() {

    const [sessions, setSessions] = useState([])

    useEffect(() => {
        loadSessions()
    }, [])

    const loadSessions = async () => {
        const res = await getSessions()
        setSessions(res.data)
    }

    const logoutDevice = async (id) => {

        await revokeSession(id)

        toast.success("Session revoked")

        loadSessions()

    }

    const columns = [

        { key: "ip", label: "IP Address" },
        { key: "userAgent", label: "Device" },
        { key: "lastActive", label: "Last Active" },

        {
            key: "action",
            label: "Action",
            render: (row) => (
                <Button
                    variant="danger"
                    onClick={() => logoutDevice(row._id)}
                >
                    Logout
                </Button>
            )
        }

    ]

    return (

        <MainLayout>

            <h2>Active Sessions</h2>

            <Card>

                <Table columns={columns} data={sessions} />

            </Card>

        </MainLayout>

    )

}
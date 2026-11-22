import { useEffect, useState } from "react"
import MainLayout from "../../components/layout/MainLayout"
import { getActiveSessions, revokeSession } from "../../api/sessionApi"
import { Table, Button, Card } from "../../components/ui"
import { toast } from "react-toastify"

export default function SessionManager() {

    const [sessions, setSessions] = useState([])

    useEffect(() => {
        load()
    }, [])

    const load = async () => {
        const res = await getActiveSessions()
        setSessions(res.data)
    }

    const logoutSession = async (id) => {

        await revokeSession(id)

        toast.success("Session revoked")

        load()

    }

    const columns = [

        { key: "ip", label: "IP Address" },

        { key: "userAgent", label: "Device" },

        { key: "deviceFingerprint", label: "Fingerprint" },

        { key: "lastActive", label: "Last Active" },

        { key: "trustLevel", label: "Trust Level" },

        {
            key: "action",
            label: "Action",
            render: (row) => (
                <Button
                    variant="danger"
                    onClick={() => logoutSession(row._id)}
                >
                    Logout
                </Button>
            )
        }

    ]

    return (

        <MainLayout>

            <h2>Session Manager</h2>

            <Card>

                <Table columns={columns} data={sessions} />

            </Card>

        </MainLayout>

    )

}
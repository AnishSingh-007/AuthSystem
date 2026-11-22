import { useEffect, useState } from "react"
import MainLayout from "../../components/layout/MainLayout"
import { getDeletedUsers, restoreUser } from "../../api/adminApi"
import { Table, Button, Card } from "../../components/ui"

export default function DeletedUsers() {

    const [users, setUsers] = useState([])

    useEffect(() => {
        load()
    }, [])

    const load = async () => {
        const res = await getDeletedUsers()
        setUsers(res.data)
    }

    const restore = async (id) => {
        await restoreUser(id)
        load()
    }

    const columns = [

        { key: "email", label: "Email" },
        { key: "deletedAt", label: "Deleted Date" },

        {
            key: "action",
            label: "Restore",
            render: (row) => (
                <Button
                    onClick={() => restore(row._id)}
                >
                    Restore
                </Button>
            )
        }

    ]

    return (

        <MainLayout>

            <h2>Deleted Users</h2>

            <Card>

                <Table columns={columns} data={users} />

            </Card>

        </MainLayout>

    )

}
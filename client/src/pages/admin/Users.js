import { useEffect, useState } from "react"
import MainLayout from "../../components/layout/MainLayout"
import { getUsers, deleteUser } from "../../api/adminApi"
import { Table, Button, Card } from "../../components/ui"
import { toast } from "react-toastify"

export default function Users() {

    const [users, setUsers] = useState([])

    useEffect(() => {
        loadUsers()
    }, [])

    const loadUsers = async () => {
        const res = await getUsers()
        setUsers(res.data)
    }

    const removeUser = async (id) => {

        await deleteUser(id)

        toast.success("User deleted")

        loadUsers()

    }

    const columns = [

        { key: "email", label: "Email" },
        { key: "roles", label: "Roles", render: (u) => u.roles.join(", ") },
        { key: "twoFactorEnabled", label: "2FA" },

        {
            key: "action",
            label: "Action",
            render: (row) => (
                <Button
                    variant="danger"
                    onClick={() => removeUser(row._id)}
                >
                    Delete
                </Button>
            )
        }

    ]

    return (

        <MainLayout>

            <h2>User Management</h2>

            <Card>

                <Table columns={columns} data={users} />

            </Card>

        </MainLayout>

    )

}
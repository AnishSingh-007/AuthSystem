import { useEffect, useState } from "react"
import MainLayout from "../../components/layout/MainLayout"
import { getUsers, updateRoles } from "../../api/adminApi"
import { Table, Button, Card } from "../../components/ui"

export default function Roles() {

    const [users, setUsers] = useState([])

    useEffect(() => {
        getUsers().then(res => setUsers(res.data))
    }, [])

    const changeRole = async (id) => {

        await updateRoles(id, {
            roles: ["admin"]
        })

    }

    const columns = [

        { key: "email", label: "Email" },
        { key: "roles", label: "Roles", render: (u) => u.roles.join(", ") },

        {
            key: "action",
            label: "Make Admin",
            render: (row) => (
                <Button
                    onClick={() => changeRole(row._id)}
                >
                    Grant Admin
                </Button>
            )
        }

    ]

    return (

        <MainLayout>

            <h2>Role Management</h2>

            <Card>

                <Table columns={columns} data={users} />

            </Card>

        </MainLayout>

    )

}
import { useEffect, useState } from "react"
import MainLayout from "../../components/layout/MainLayout"
import { getIPRules, addIPRule, deleteIPRule } from "../../api/securityControlApi"
import { Table, Button, Card, Input } from "../../components/ui"

export default function IPControl() {

    const [rules, setRules] = useState([])
    const [ip, setIP] = useState("")
    const [type, setType] = useState("deny")

    useEffect(() => {
        load()
    }, [])

    const load = async () => {
        const res = await getIPRules()
        setRules(res.data)
    }

    const add = async () => {
        await addIPRule({ ip, type })
        setIP("")
        load()
    }

    const remove = async (id) => {
        await deleteIPRule(id)
        load()
    }

    const columns = [

        { key: "ip", label: "IP Address" },
        { key: "type", label: "Rule Type" },
        { key: "description", label: "Description" },

        {
            key: "action",
            label: "Remove",
            render: (row) => (
                <Button
                    variant="danger"
                    onClick={() => remove(row._id)}
                >
                    Delete
                </Button>
            )
        }

    ]

    return (

        <MainLayout>

            <h2>IP Access Control</h2>

            <Card>

                <div style={{ display: "flex", gap: "10px" }}>

                    <Input
                        placeholder="IP Address"
                        value={ip}
                        onChange={e => setIP(e.target.value)}
                    />

                    <select
                        value={type}
                        onChange={e => setType(e.target.value)}
                    >

                        <option value="deny">Deny</option>
                        <option value="allow">Allow</option>

                    </select>

                    <Button onClick={add}>Add Rule</Button>

                </div>

            </Card>

            <Card>

                <Table columns={columns} data={rules} />

            </Card>

        </MainLayout>

    )

}
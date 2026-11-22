import { useEffect, useState } from "react"
import MainLayout from "../../components/layout/MainLayout"
import { getThrottleStats } from "../../api/securityControlApi"
import { Table, Card } from "../../components/ui"

export default function LoginThrottleMonitor() {

    const [data, setData] = useState([])

    useEffect(() => {
        getThrottleStats().then(res => setData(res.data))
    }, [])

    const columns = [

        { key: "user", label: "User", render: (r) => r.user?.email },

        { key: "attempts", label: "Attempts" },

        { key: "windowStart", label: "Window Start" }

    ]

    return (

        <MainLayout>

            <h2>Login Throttle Monitor</h2>

            <Card>

                <Table columns={columns} data={data} />

            </Card>

        </MainLayout>

    )

}
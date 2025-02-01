import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"

export const Dashboard = () => {
    return <div>
        <div ><Appbar /></div> <Balance amount={1000} /> <Users /></div>
}
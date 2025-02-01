import { useEffect, useState } from "react";
import { Button } from "./Button.jsx";
import { UserName } from "./UserName.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export function Users() {
    const [users, setUsers] = useState([]);
    const [filters, setFilters] = useState();
    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filters, {
            headers: {
                authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then(response => {
            setUsers(response.data.user)
        });
    }, [filters]);
    return <div className="mx-2">
        <div className="mt-6 text-lg font-bold">
            Users
        </div>
        <div className="my-2">
            <input onChange={e => {
                setFilters(e.target.value);
            }} type="text" placeholder="seach users.." className="w-full border rounded px-2 py-1 shadow border-slate-200"></input>
        </div>
        <div>
            {users.map(user => <User key={user._id} user={user} />)}
        </div>
    </div>
}

function User({ user }) {
    const navigate = useNavigate();
    return <div className="flex justify-between">
        <UserName user={user} />
        <div className="flex flex-col h-full justify-center"><Button onClick={e => {
            navigate('/send?id=' + user._id + "&name=" + user.firstName);
        }} label={"Send Money"} /></div>
    </div>
}
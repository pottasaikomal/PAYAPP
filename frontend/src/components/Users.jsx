import { useState } from "react";
import { Button } from "./Button.jsx";
import { UserName } from "./UserName.jsx";
export function Users() {
    const [users, setUsers] = useState([{
        firstName: "Sai Komal",
        lastName: "Potta",
        _id: 1
    }
    ]);
    return <div className="mx-2">
        <div className="mt-6 text-lg font-bold">
            Users
        </div>
        <div className="my-2">
            <input type="text" placeholder="seach users.." className="w-full border rounded px-2 py-1 shadow border-slate-200"></input>
        </div>
        <div>
            {users.map(user => <User user={user} />)}
        </div>
    </div>
}

function User({ user }) {
    return <div className="flex justify-between">
        <UserName user = {user} />
        <div className="flex flex-col h-full justify-center"><Button label={"Send Money"} /></div>
    </div>
}
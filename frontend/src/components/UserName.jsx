export function UserName({user}) {
    return <div className="flex">
        <div className="flex justify-center rounded-full w-12 h-12 bg-slate-200 mt-1 mr-2">
            <div className="flex flex-col justify-center h-full text-xl ">
                {user.firstName[0]}
            </div>
        </div>
        <div className="flex flex-col justify-center h-ful">
            <div>
                {user.firstName} {user.lastName}
            </div>
        </div>
    </div>
}
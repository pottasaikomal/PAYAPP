export function Balance({amount}){
    return <div className="flex py-2">
        <div className="font-bold text-lg px-2">Your Balance</div>
        <div className="font-semibold ml-4 text-lg">Rs. {amount}</div>
    </div>
}
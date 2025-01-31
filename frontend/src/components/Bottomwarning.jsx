import { Link } from "react-router-dom";
export function Bottomwarning({label, buttonText, to}){
    return <div className="py-2 flex justify-center text-sm">
        <div>{label}</div>
        <Link className="pointer underline cursor-pointer pl-1" to={to}>{buttonText}</Link>
    </div>
}
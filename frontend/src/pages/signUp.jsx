import { useState } from "react"
import { Bottomwarning } from "../components/Bottomwarning"
import { Button } from "../components/Button"
import { InputBox } from "../components/Inputbox"
import axios from "axios"
import { useNavigate } from "react-router-dom"


export const Signup = () => {
    const navigate = useNavigate();
    const [userName, setUsername] = useState("");
    const [firstName, setFirstname] = useState("");
    const [password, setPassword] = useState("");
    const [lastName, setLastname] = useState("");
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-90 text-center p-2 h-max px-4">
                <div className="font-bold text-4xl pt-6"> SignUp </div>
                <div className="text-slate-500 text-md pt-1 px-4 pb-4"> Enter your information to create an account </div>
                <InputBox onChange={e => {
                    setFirstname(e.target.value)
                }} label={"First Name"} placeholder={"Komal"} />
                <InputBox onChange={e => {
                    setLastname(e.target.value)
                }} label={"Last Name"} placeholder={"Potta"} />
                <InputBox onChange={e => {
                    setUsername(e.target.value)
                }} label={"Email"} placeholder={"komal@gmail.com"} />
                <InputBox onChange={e => {
                    setPassword(e.target.value)
                }} label={"Password"} placeholder={"12345"} />
                <div className="pt-4">
                    <Button label={"Sign Up"} onClick={async () => {
                        const response = await axios.post("http://localhost:3000/api/v1/user/signUp", {
                            userName,
                            firstName,
                            lastName,
                            password
                        });
                        localStorage.setItem("token", response.data.token);
                        navigate('/dashboard');
                    }} />
                </div>
                <Bottomwarning label={"Already signed up?"} buttonText={"Sign in"} to={"/signIn"} />
            </div>
        </div>
    </div>

}
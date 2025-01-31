import { Bottomwarning } from "../components/Bottomwarning"
import { Button } from "../components/Button"
import { InputBox } from "../components/Inputbox"

export const Signup = () => {
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
        <div className="font-bold text-4xl pt-6"> SignUp </div>
        <div className="text-slate-500 text-md pt-1 px-4 pb-4"> Enter your information to create an account </div>
        <InputBox label={"First Name"} placeholder={"Komal"} />
        <InputBox label={"Last Name"} placeholder={"Potta"} />
        <InputBox label={"User Name"} placeholder={"komal@gmail.com"} />
        <InputBox label={"Password"} placeholder={"12345"} />
        <div className="pt-4">
            <Button label={"Sign Up"} />
        </div>
        <Bottomwarning label={"Already signed up?"} buttonText={"Sign in"} to={"/signIn"} />
        </div>
    </div>

}
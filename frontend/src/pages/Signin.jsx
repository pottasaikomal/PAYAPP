import { Bottomwarning } from "../components/Bottomwarning"
import { Button } from "../components/Button"
import { InputBox } from "../components/Inputbox"

export const Signin = () => {
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <div className="font-bold text-4xl pt-6"> SignIn </div>
                <div className="text-slate-500 text-md pt-1 px-4 pb-4"> Enter your credentials to access your account </div>
                <InputBox label={"Email"} placeholder={"komal@gmail.com"} />
                <InputBox label={"Password"} placeholder={"12345"} />
                <div className="pt-4">
                    <Button label={"Sign In"} />
                </div>
                <Bottomwarning label={`Don't have an account?`} buttonText={"Sign Up"} to={"/signup" }/>
            </div>
        </div>
    </div>

}
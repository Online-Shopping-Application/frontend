import { PiDetective } from "react-icons/pi";

const AuthSpinner = () => {
    return (
        <div className="w-[100vw] h-[100vh] flex justify-center items-center">
            <div className="w-80 h-80 flex justify-center items-center relative">
                <div className="absolute w-full h-full inset-0 border-8 border-green-300 border-t-green-700 rounded-full animate-spin"></div>
                <h1 className="">
                    <PiDetective className="w-40 h-40 text-green-700" />
                </h1>
            </div>
        </div>
    )
}

export default AuthSpinner;
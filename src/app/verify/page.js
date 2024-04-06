import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

const page = () => {
    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
            <h1 className="text-2xl font-bold text-center mb-4">Verify your email</h1>
            <p className="text-center mb-6">
                Enter the 8 digit code you have received at
                <span className="font-semibold"> anu***@gmail.com</span>
            </p>
            <h6>Code</h6>
            <div className="flex justify-between space-x-2 mb-6">
                <Input className="w-10" />
                <Input className="w-10" />
                <Input className="w-10" />
                <Input className="w-10" />
                <Input className="w-10" />
                <Input className="w-10" />
                <Input className="w-10" />
                <Input className="w-10" />
            </div>
            <Link href={"/interest"}><Button className="w-full">Verify</Button></Link>
        </div>
    )
}

export default page
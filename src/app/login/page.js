"use client"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link'
import { useState } from "react"
import showToast from '../../utils/toast'
import { useAppDispatch, useAppStore } from "@/lib/hooks"
import { AppService } from "@/service/app.service"
import { useRouter } from 'next/navigation';
import { setAuthenticated } from "@/redux/reducer"
import { setLocalStorage } from "@/storage/LocalStorage"
import isAuth from "../isAuth"



const Login = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const [formData, setFormData] = useState({
        email: '',
        password: '',

    });
    const [formErrors, setFormErrors] = useState({
        email: '',
        password: '',
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };


    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const validationErrors = validateForm();
            if (Object.values(validationErrors).some((error) => error !== '')) {
                setFormErrors(validationErrors);
                showToast('Please fill in all fields', 'error');
                return;
            }
            const res = await AppService.login(JSON.stringify(formData))
            if (!res?.success) {
                showToast(res.message, "error");
            }
            else {
                showToast(res.message, "success");
                dispatch(setAuthenticated(true))
                setLocalStorage("token", res?.token)
                router.push("/interest")
            }
        }
        catch (error) {
            console.log(error);
        }

    };
    const validateForm = () => {
        const errors = {
            email: formData.email.trim() === '' ? 'Email cannot be empty' : '',
            password: formData.password.trim() === '' ? 'Password cannot be empty' : '',
        };
        return errors;
    };

    return (
        <div className="flex justify-center items-center h-[70vh]">
            <Card className="w-[400px]">
                <CardHeader className="flex justify-center items-center">
                    <CardTitle className="font-bold text-2xl mb-2">Login</CardTitle>
                    <CardDescription className=" text-black  font-semibold text-base ">Welcome back to ECOMMERCE</CardDescription>
                    <CardDescription className="text-black font-normal text-sm">the next gen bussiness marketplace</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input id="name" placeholder="Enter Name" name="email" value={formData.email} onChange={handleInputChange} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" placeholder="Enter Password" type="password" name="password" value={formData.password} onChange={handleInputChange} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Button onClick={handleSubmit}>Login</Button>
                            </div>
                        </div>
                    </form>
                    <div className="h-[2px] w-[350px] bg-gray-100 mt-4">

                    </div>
                    <div className="flex justify-center mt-4">
                        <h6 className="text-xs">Dont have an Account? <Link href="/signup" className="font-bold">SIGNUP</Link></h6>
                    </div>
                </CardContent>
            </Card>
        </div>

    )
}

export default Login
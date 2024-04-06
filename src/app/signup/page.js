"use client"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
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



const Signup = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: "",
        email: '',
        password: '',

    });
    const [formErrors, setFormErrors] = useState({
        name: "",
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
            const res = await AppService.signup(JSON.stringify(formData))
       
            if (!res?.success) {
                showToast(res.message, "error");
            }
            else {
                showToast(res.message, "success");
                dispatch(setAuthenticated(true))
                setLocalStorage("token", res?.token)
                router.push("/verify")
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
            name: formData.name.trim() === '' ? 'Name cannot be empty' : '',
        };
        return errors;
    };

    return (
        <div className="flex justify-center items-center h-[70vh]">
            <Card className="w-[400px]">
                <CardHeader className="flex justify-center items-center gap-5">
                    <CardTitle className="">Create Your Account</CardTitle>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" placeholder="Enter Name" name="name" value={formData.name} onChange={handleInputChange} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" placeholder="Enter Email" name="email" value={formData.email} onChange={handleInputChange} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" placeholder="Enter Password" type="password" name="password" value={formData.password} onChange={handleInputChange} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Button onClick={handleSubmit}>Create Account</Button>
                            </div>
                        </div>
                    </form>
                    <div className="flex justify-center mt-8">
                        <h6 className="text-xs">Have an Account? <Link href={"/login"} className="text-xs font-bold cursor-pointer">LOGIN</Link></h6>
                    </div>
                </CardContent>

            </Card>
        </div>

    )
}

export default Signup
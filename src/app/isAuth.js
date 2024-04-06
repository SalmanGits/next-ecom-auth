
"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import { getLocalStorage } from "@/storage/LocalStorage";


export default function isAuth(Component) {
    return function IsAuth(props) {
        const isAuthenticated = useAppSelector((state) => state.app.isAuthenticated)
        const { token } = getLocalStorage("token")
        useEffect(() => {
            if (!isAuthenticated && !token) {
                return redirect("/login");
            }
        }, []);

        return <Component {...props} />;
    };
}
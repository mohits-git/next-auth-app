"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = useState({ email: "", password: "", username: "" })
    const [buttonDisable, setButtonDisable] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            router.push('/login')
        } catch (error) {
            console.log("Signup Failed", error.message);
            toast.error(error.message);
        } finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.username.length > 0 && user.password.length > 0) {
            setButtonDisable(false);
        } else {
            setButtonDisable(true);
        }
    }, [user]);

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1 className="font-bold text-2xl mb-1">SignUp</h1>
                <p className="text-sm text-gray-400 mb-4">{loading ? "Processing" : ""}</p>
                <hr />
                <label htmlFor="username" className="mb-1 font-semibold">Username</label>
                <input
                    type="text"
                    id="username"
                    placeholder="username"
                    className="text-black mb-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                />
                <label htmlFor="email" className="mb-1 font-semibold">Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="email"
                    className="text-black mb-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                <label htmlFor="password" className="mb-1 font-semibold">Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder="password"
                    className="text-black mb-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
                <button className="text-lg p-1 px-4 my-2 border border-white bg-black rounded-lg hover:bg-gray-950 focus:outline-none focus:outline-gray-400"
                    disabled={buttonDisable}
                    onClick={onSignup}
                >
                    {buttonDisable ? "Enter Details" : "Sign Up"}
                </button>
                <Link href={'/login'} className="mt-2 hover:underline hover:text-blue-400">Visit Login Page</Link>
            </div>
        </>
    )
}

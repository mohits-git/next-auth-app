"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
    const [user, setUser] = useState({ email: "", password: "" })
    const onLogin = async () => {

    }
    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1 className="font-bold text-2xl mb-4">Login</h1>
                <hr />
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
                <button 
                    className="text-lg p-1 px-4 my-2 border border-white bg-black rounded-lg hover:bg-gray-950 focus:outline-none focus:outline-gray-400"
                    onClick={onLogin}
                >Log In</button>
                <Link href={'/signup'} className="mt-2 hover:underline hover:text-blue-400">Visit Signup Page</Link>
            </div>
        </>
    )
}


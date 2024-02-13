"use client";

import axios from "axios";
import { errorToJSON } from "next/dist/server/render";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmail() {
    const [token, setToken] = useState('');
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const [type, setType] = useState("VERIFY");


    useEffect(() => {
        const urlToken = window.location.search.split('=')[1];
        setToken(urlToken || "");
    }, [token])

    useEffect(() => {
        const verifyUserEmail = async () => {
            setError(false);
            try {
                await axios.post('/api/users/verifyemail', { token });
                setVerified(true);
            } catch (error: any) {
                setError(true);
                console.log(error.response.data);
            }
        }
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token])

    return (
        <div className="flex flex-col justify-center items-center min-h-screen py-2">
            <h1 className="text-4xl font-bold">Verify Your Email Here</h1>
            <h2 className="py-2 px-4 rounded-lg mt-2 bg-blue-400 text-white">{token ? `${token}` : "no token"}</h2>

            {verified && (
                <div className="flex flex-col">
                    <h2 className="text-2xl mt-2">Email Verified</h2>
                    <Link href={'/login'} className="p-3 bg-gray-400 rounded-lg mt-1 text-center text-xl">Login</Link>
                </div>
            )}

            {error && (
                <div>
                    <h2 className="text-2xl text-red-500">Error While Verifying</h2>
                </div>
            )}

        </div>
    )
}

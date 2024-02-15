"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function VerifyEmail() {
    const router = useRouter();
    const [token, setToken] = useState('');
    const [newPass, setNewPass] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const urlToken = window.location.search.split('=')[1];
        setToken(urlToken || "");
    }, [token])

    const submitReset = async () => {
        setError(false);
        setLoading(true);
        if (!newPass) return;

        try {
            await axios.post('/api/users/resetpassword', { token, newPass });
            await axios.get('/api/users/logout');
            router.push('/login');
        } catch (error: any) {
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen py-2">
            <h1 className="text-4xl font-bold">Reset Your Password Here</h1>
            <h2 className="py-2 px-4 rounded-lg mt-2 bg-blue-400 text-white">{token ? `${token}` : "no token"}</h2>

            <input type="password" placeholder="new-password" className="mt-2 p-2 px-3 bg-black border-2 border-white rounded-lg"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
            />

            <button className="p-2 px-2 mt-2 border-2 border-white rounded-lg hover:bg-gray-800 active:bg-gray-700"
                onClick={submitReset}
                disabled={loading}
            >
                {loading ? "Please wait..." : "Reset Password"}
            </button>
            {error && (
                <div>
                    <h2 className="text-2xl text-red-500">Error While Verifying</h2>
                </div>
            )}

        </div>
    )
}


'use client';

import axios from "axios";
import { useState } from "react";

export default function UserProfile({ params }: { params: { id: string } }) {
    const [emailSent, setEmailSent] = useState(false);
    const [sending, setSending] = useState(false);
    const sendResetEmail = async () => {
        try {
            setSending(true);
            await axios.get('/api/users/sendresetmail')
            setEmailSent(true);
        } catch (error: any) {
            console.log(error);
            throw new Error(error.message);
        } finally {
            setSending(false);
        }
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen py-2 relative">
                <h1 className="font-bold text-2xl mb-4">Profile</h1>
                <hr />
                <h2 className="text-4xl">Hello!! <span className="font-semibold bg-sky-100 text-black rounded-md px-2">{params.id}</span></h2>
                <button
                    className="bg-black border-2 border-slate-300 p-2 px-3 mt-4 rounded-lg text-lg shadow-lg shadow-white/50 hover:bg-gray-900 active:bg-gray-800"
                    onClick={sendResetEmail}
                    disabled={emailSent || sending}
                >
                    {sending ? "Sending, Wait...": "Reset Password"}
                </button>
                {emailSent && (
                    <h3 className="text-base text-gray-400 mt-2">Email to Reset Password has been sent to your emailId.</h3>
                )}
            </div>
        </>

    )
}

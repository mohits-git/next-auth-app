'use client';

import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();
    const logout = async () => {
        try {
            const res = await axios.get('/api/users/logout');
            toast.success('Logout successfull');
            router.push('/login');
        }
        catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    }
    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1 className="font-bold text-2xl mb-4">Profile</h1>
                <hr />
                <h2>Profile Page</h2>
                <button className="mt-4 text-xl p-2 px-2 bg-black border-2 border-gray-400 rounded-lg hover:bg-gray-800"
                    onClick={() => logout()}
                >LOGOUT</button>
            </div>
        </>
    )
}

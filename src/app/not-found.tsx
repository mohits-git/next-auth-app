import Link from "next/link";

export default function NotFound() {
    return (
        <>
            <div className="flex flex-col justify-center items-center w-full h-[100vh]">
                <h1 className="text-3xl font-bold">Upsy-daisy</h1>
                <h2 className="text-2xl font-bold mt-2">404</h2>
                <p className="mt-2 text-gray-400">Couldn&apos;t find the page you&apos;re looking for :(</p>
                <Link className="mt-2 text-blue-400 hover:underline" href={"/"}>Return Back Home</Link>
            </div>
        </>
    )
}

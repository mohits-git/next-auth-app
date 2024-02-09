export default function UserProfile({ params } : { params: { id: string }}) {

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1 className="font-bold text-2xl mb-4">Profile</h1>
                <hr />
                <h2 className="text-4xl">Hello!! <span className="font-semibold bg-sky-100 text-black rounded-md px-2">{params.id}</span></h2>
            </div>
        </>

    )
}

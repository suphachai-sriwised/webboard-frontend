"use client";

export default function LoginPage() {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(event)
        const formData = new FormData(event.currentTarget);
        const username = formData.get('username') as string;
        console.log('Username:', username);
        let access_token = ''
        const result = await fetch('http://localhost:3001/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({ username }),
        });
        if (result.status !== 200) {
            window.location.reload();
        }else{
            access_token = (await result.json()).access_token || '';
            localStorage.setItem('access_token', access_token);
            // Decode JWT and save payload
            const payload = JSON.parse(atob(access_token.split('.')[1]));
            localStorage.setItem('user', JSON.stringify(payload));
            window.location.href = '/posts';
        }

    };

    return (
        <div className="flex flex-row items-center bg-gray-800 p-4 w-full h-screen">
            <div className="flex items-center justify-center h-screen w-full bg-[#243831]">
                <div className="p-8 rounded-lg w-full max-w-sm">
                    <h1 className="text-start text-2xl font-bold mb-6">Sign in</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            className="text-[#A0AFBA] placeholder-[#A0AFBA] w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                            required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#49A569] text-white py-2 rounded transition-colors hover:opacity-80 font-semibold"
                        >
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
            <img className="grow h-screen" src="signin-logo.svg" alt="WebBoard Logo"/>
        </div>
    
    );
}
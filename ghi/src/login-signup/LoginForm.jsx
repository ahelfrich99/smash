import useToken from "@galvanize-inc/jwtdown-for-react";
import { useState } from "react";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useToken();

    const BannerAlert = () => {
        return (
            <div className="alert alert-info mt-3 mb-3" role="alert">
                <i className="bi bi-info-circle-fill"></i> Log in with username and password.
            </div>
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(`username: ${username} password: ${password}`);
        try {
            await login(username, password);
            console.log("Logged in successfully!");
            e.target.reset();
        } catch (error) {
            console.error("Error during login", error);
        }
    };

    return (
        <div className="relative flex h-full w-full">
            <div className="h-screen w-1/2 bg-white">
            <div className="mx-auto flex h-full w-2/3 flex-col justify-center text-black xl:w-1/2">
                <BannerAlert />
                <div>
                <p className="text-4xl">Login</p>
                <p>please login to continue</p>
                </div>
                <div className="my-6">
                <button className="flex w-full justify-center rounded-3xl border-none bg-white p-1 text-black hover:bg-gray-200 sm:p-2">
                    <img
                    src="https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg"
                    className="mr-2 w-6 object-fill"
                    />
                    Sign in with Spotify
                </button>
                </div>
                <div>
                <fieldset className="border-t border-solid border-gray-600">
                    <legend className="mx-auto px-2 text-center text-sm">
                    Or login via our secure system
                    </legend>
                </fieldset>
                </div>
                <div className="mt-10">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                    <label className="mb-2.5 block font-extrabold" htmlFor="email">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
                        placeholder="pnappl, meimei, ..."
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    </div>
                    <div className="mt-4">
                    <label className="mb-2.5 block font-extrabold" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    </div>
                    <div className="mt-4 flex w-full flex-col justify-between sm:flex-row">
                    {/* Remember me */}
                    <div>
                        <input type="checkbox" id="remember" />
                        <label htmlFor="remember" className="mx-2 text-sm">
                        Remember me
                        </label>
                    </div>
                    {/* Forgot password */}
                    <div>
                        <a href="#" className="text-sm hover:text-gray-200">
                        Forgot password
                        </a>
                    </div>
                    </div>
                    <div className="my-10">
                    <button
                        className="w-full rounded-full bg-blue-600 p-3 hover:bg-blue-800"
                        type="submit"
                    >
                        Login
                    </button>
                    </div>
                </form>
                </div>
            </div>
            </div>
            <div className="h-screen w-1/2 bg-blue-600">
            <img
                src="https://cdn.discordapp.com/attachments/1054958023698825266/1111058735599734844/Ando_Katsuhiro_Otomo_style_Futurism_style_a_quaint_flying_food__dbee15aa-b403-4be5-9e09-afc3907042cb-1.png"
                className="h-full w-full object-cover"
            />
            </div>
        </div>
    );
};

export default LoginForm;

import useToken from "@galvanize-inc/jwtdown-for-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useToken();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);

            navigate("/mock");
        } catch (error) {
            console.log("Login failed", error)
        }
        e.target.reset();
    };

    return (
        <div class="relative flex h-full w-full">
            <div class="h-screen w-1/2 bg-white">
            <div class="mx-auto flex h-full w-2/3 flex-col justify-center text-black xl:w-1/2">
                <div>
                <p class="text-4xl">Login</p>
                <p>please login to continue</p>
                </div>
                <div class="my-6">
                <button class="flex w-full justify-center rounded-3xl border-none bg-white p-1 text-black hover:bg-gray-200 sm:p-2">
                    <img
                    src="https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg"
                    class="mr-2 w-6 object-fill"
                    />
                    Sign in with Spotify
                </button>
                </div>
                <div>
                <fieldset class="border-t border-solid border-gray-600">
                    <legend class="mx-auto px-2 text-center text-sm">
                    Or login via our secure system
                    </legend>
                </fieldset>
                </div>
                <div class="mt-10">
                <form onSubmit={handleSubmit}>
                    <div>
                    <label class="mb-2.5 block font-extrabold" for="email">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        class="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow placeholder:opacity-30"
                        placeholder="pnappl, torifu, ..."
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    </div>
                    <div class="mt-4">
                    <label class="mb-2.5 block font-extrabold" for="password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        class="inline-block w-full rounded-full bg-white p-2.5 leading-none text-black placeholder-indigo-900 shadow"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    </div>
                    <div class="mt-4 flex w-full flex-col justify-between sm:flex-row">
                    {/* Remember me */}
                    <div>
                        <input type="checkbox" id="remember" />
                        <label for="remember" class="mx-2 text-sm">
                        Remember me
                        </label>
                    </div>
                    {/* Forgot password */}
                    <div>
                        <a href="#" class="text-sm hover:text-gray-200">
                        Forgot password
                        </a>
                    </div>
                    </div>
                    <div class="my-10">
                    <button
                        class="w-full rounded-full bg-blue-600 p-3 hover:bg-blue-800"
                        type="submit"
                    >
                        Login
                    </button>
                    </div>
                </form>
                </div>
            </div>
            </div>
            <div class="h-screen w-1/2 bg-blue-600">
            <img
                src="https://cdn.discordapp.com/attachments/1054958023698825266/1111058735599734844/Ando_Katsuhiro_Otomo_style_Futurism_style_a_quaint_flying_food__dbee15aa-b403-4be5-9e09-afc3907042cb-1.png"
                class="h-full w-full object-cover"
            />
            </div>
        </div>
    );
};

export default LoginForm;

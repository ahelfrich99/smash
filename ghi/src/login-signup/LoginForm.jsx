import useToken from "@galvanize-inc/jwtdown-for-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./login.css"

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useToken();
    const navigate = useNavigate();

    const BannerAlert = () => {
        return (
            <div className="banner" role="alert">
                <i className="bi bi-info-circle-fill" style={{ marginLeft: "5px", color: "#f36a5d", fontSize: "20px" }}></i> <strong className="banner-text">
                    Log in with <strong className="banner-text2">username</strong> and <strong className="banner-text3">password</strong>.
                </strong>
            </div>
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
            navigate("/home");
        } catch (error) {
            console.error("Error during login", error);
        }
    };

    return (
        <div className="login-body">
            <div className="login-body2">
            <div className="mx-auto flex h-full w-2/3 flex-col justify-center text-black xl:w-1/2">
                <BannerAlert />
                <div>
                <p className="login-body3-text">Login</p>
                <p className="login-body3-text2">please login to continue</p>
                </div>
                <div className="my-6">
                <button className="login-body2-button">
                    <img
                    src="https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg"
                    className="mr-2 w-6 object-fill"
                    alt=""
                    />
                    Sign in with Spotify
                </button>
                </div>
                <div>
                <fieldset className="login-border">
                    <legend className="login-border-text">
                    Or login via our secure system
                    </legend>
                </fieldset>
                </div>
                <div className="mt-10">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                    <label className="username" htmlFor="email">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="username-input"
                        placeholder="pnappl, meimei, ..."
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    </div>
                    <div className="mt-4">
                    <label className="password" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="password-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    </div>
                    <div className="mt-4 flex w-full flex-col justify-between sm:flex-row">
                    <div className="check-remem">
                        <input type="checkbox" id="remember" className="checkbox" />
                        <label htmlFor="remember" className="remember">
                        Remember me
                        </label>
                    </div>
                    </div>
                    <div className="login-button2">
                    <button
                        className="login-button2-1"
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
                alt=""
            />
            </div>
        </div>
    );
};

export default LoginForm;

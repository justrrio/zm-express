import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isError, isSuccess, isLoading, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (user || isSuccess) {
            console.log("isSuccess:", isSuccess, "user:", user);
            navigate("/dashboard");
        }
        dispatch(reset());
    }, [user, isSuccess, dispatch, navigate]); // dependencies

    const Auth = (e) => {
        e.preventDefault();
        dispatch(LoginUser({ email, password }));
    };
    return (
        <section className="hero has-background-grey-lighter is-fullheight is-fullwidth">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-4">
                            <form onSubmit={Auth} className='box'>
                                {isError && <p className='has-text-centered' style={{ color: "red" }}>{message}</p>}
                                <h1 className='title'>Login</h1>
                                <div className="field">
                                    <label className="label">Email</label>
                                    <div className="control">
                                        <input type="text" className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Masukkan email...' />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Password</label>
                                    <div className="control">
                                        <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Masukkan password...' />
                                    </div>
                                </div>
                                <div className="field">
                                    <button type='submit' className="button is-success is-fullwidth">{isLoading ? 'Loading...' : 'Login'}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login
import React from 'react'

function SignUp() {
    return (
        <section className="hero has-background-grey-lighter is-fullheight is-fullwidth">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-4">
                            <form className='box'>
                                <h1 className='title'>Sign Up</h1>
                                <div className="field">
                                    <label className="label">Nama</label>
                                    <div className="control">
                                        <input type="text" className="input" placeholder='Masukkan nama...' />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Email</label>
                                    <div className="control">
                                        <input type="text" className="input" placeholder='Masukkan email...' />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Password</label>
                                    <div className="control">
                                        <input type="password" className="input" placeholder='Masukkan password...' />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Konfirmasi Password</label>
                                    <div className="control">
                                        <input type="password" className="input" placeholder='Masukkan konfirmasi password...' />
                                    </div>
                                </div>
                                <div className="field">
                                    <button className="button is-success is-fullwidth">Sign Up</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignUp
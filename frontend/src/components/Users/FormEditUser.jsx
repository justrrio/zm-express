import React from 'react'

function FormEditUser() {
    return (
        <div>
            <h1 className='title'>Users</h1>
            <h2 className='subtitle'>Edit User</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form>
                            <div className="field">
                                <label className="label">Nama</label>
                                <div className="control">
                                    <input type="text" className="input" placeholder='Masukkan Nama...' />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Email</label>
                                <div className="control">
                                    <input type="text" className="input" placeholder='Masukkan Email...' />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Password</label>
                                <div className="control">
                                    <input type="password" className="input" placeholder='Masukkan Password...' />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Konfirmasi Password</label>
                                <div className="control">
                                    <input type="password" className="input" placeholder='Masukkan Konfirmasi Password...' />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Role</label>
                                <div className="control">
                                    <div className="select is-full-width">
                                        <select>
                                            <option value="Admin">Admin</option>
                                            <option value="Agen">Agen</option>
                                            <option value="Warehouse">Warehouse</option>
                                            <option value="Customer">Customer</option>
                                            <option value="Kurir">Kurir</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <button className="button is-success">Ubah</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormEditUser
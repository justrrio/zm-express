import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormTambahUser = () => {
    const [namaUser, setNamaUser] = useState("");
    const [emailUser, setEmailUser] = useState("");
    const [passwordUser, setPasswordUser] = useState("");
    const [konfirmasiPasswordUser, setKonfirmasiPasswordUser] = useState("");
    const [noTlpUser, setNoTlpUser] = useState("");
    const [roleUser, setRoleUser] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    // Simpan data user
    const saveUser = async (e) => {
        e.preventDefault();
        console.log("namaUser:", namaUser);
        try {
            await axios.post("http://localhost:5000/users", {
                namaUser: namaUser,
                emailUser: emailUser,
                passwordUser: passwordUser,
                konfirmasiPasswordUser: konfirmasiPasswordUser,
                noTlpUser: noTlpUser,
                roleUser: roleUser,
            });
            navigate("/users");
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.errorMessage || error.response.data.message);
            }
        }
    };
    return (
        <div>
            <h1 className='title'>Users</h1>
            <h2 className='subtitle'>Tambah User</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={saveUser}>
                            {message && (
                                <p className="has-text-centered" style={{ color: "red" }}>{message}</p>
                            )}
                            <div className="field">
                                <label className="label">Nama</label>
                                <div className="control">
                                    <input type="text" value={namaUser} onChange={(e) => setNamaUser(e.target.value)} className="input" placeholder='Masukkan nama...' />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Email</label>
                                <div className="control">
                                    <input type="text" value={emailUser} onChange={(e) => setEmailUser(e.target.value)} className="input" placeholder='Masukkan email...' />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Password</label>
                                <div className="control">
                                    <input type="password" value={passwordUser} onChange={(e) => setPasswordUser(e.target.value)} className="input" placeholder='Masukkan password...' />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Konfirmasi Password</label>
                                <div className="control">
                                    <input type="password" value={konfirmasiPasswordUser} onChange={(e) => setKonfirmasiPasswordUser(e.target.value)} className="input" placeholder='Masukkan konfimasi password...' />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">No. Telepon</label>
                                <div className="control">
                                    <input type="text" value={noTlpUser} onChange={(e) => setNoTlpUser(e.target.value)} className="input" placeholder='Masukkan no telepon...' />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Role</label>
                                <div className="control">
                                    <div className="select is-full-width">
                                        <select value={roleUser} onChange={(e) => setRoleUser(e.target.value)}>
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
                                    <button type="submit" className="button is-success">Simpan</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormTambahUser
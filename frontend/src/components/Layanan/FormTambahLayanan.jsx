import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormTambahLayanan = () => {
    const [namaLayanan, setNamaLayanan] = useState("");
    const [hargaLayanan, setHargaLayanan] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    // Simpan data layanan
    const saveLayanan = async (e) => {
        e.preventDefault();
        console.log("namaLayanan:", namaLayanan);
        try {
            await axios.post("http://localhost:5000/layanan", {
                namaLayanan: namaLayanan,
                hargaLayanan: hargaLayanan,
            });
            navigate("/layanan");
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.errorMessage || error.response.data.message);
            }
        }
    };
    return (
        <div>
            <h1 className='title'>Layanan</h1>
            <h2 className='subtitle'>Tambah Layanan</h2>

            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={saveLayanan}>
                            {message && (
                                <p className="has-text-centered" style={{ color: "red" }}>{message}</p>
                            )}
                            <div className="field">
                                <label className="label">Nama</label>
                                <div className="control">
                                    <input type="text" value={namaLayanan} onChange={(e) => setNamaLayanan(e.target.value)} className="input" placeholder='Masukkan nama...' />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Harga</label>
                                <div className="control">
                                    <input type="number" value={hargaLayanan} onChange={(e) => setHargaLayanan(e.target.value)} className='input' placeholder='Masukkan harga...' />
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

export default FormTambahLayanan
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FormTambahAgen() {
    const [namaAgen, setNamaAgen] = useState("");
    const [idProvinsiAgen, setProvinsiAgen] = useState("");
    const [idKabupatenKotaAgen, setKabupatenKotaAgen] = useState("");
    const [alamatAgen, setAlamatAgen] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    // Ambil data provinsi dan kabupaten/kota
    const [provinsi, setProvinsi] = useState([]);
    const [kabupaten_kota, setKabupatenKota] = useState([]);

    useEffect(() => {
        getProvinsi();
        getKabupatenKota();
    }, []);

    const getProvinsi = async () => {
        const response = await axios.get("http://localhost:5000/provinsi");
        setProvinsi(response.data);
    };
    const getKabupatenKota = async () => {
        const response = await axios.get("http://localhost:5000/kabupaten-kota");
        setKabupatenKota(response.data);
    };

    // Simpan data agen
    const saveAgen = async (e) => {
        e.preventDefault();
        console.log("Provinsi Agen:", idProvinsiAgen);
        console.log("Kabupaten/Kota Agen:", idKabupatenKotaAgen);
        try {
            await axios.post("http://localhost:5000/agen", {
                namaAgen: namaAgen,
                idProvinsiAgen: idProvinsiAgen,
                idKabupatenKotaAgen: idKabupatenKotaAgen,
                alamatAgen: alamatAgen,
            });
            navigate("/agen");
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.errorMessage);
            }
        }
    };

    return (
        <div>
            <h1 className='title'>Agen</h1>
            <h2 className='subtitle'>Tambah Agen</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={saveAgen}>
                            {message && (
                                <p className="has-text-centered" style={{ color: "red" }}>{message}</p>
                            )}
                            <div className="field">
                                <label className="label">Nama Tempat</label>
                                <div className="control">
                                    <input type="text" value={namaAgen} onChange={(e) => setNamaAgen(e.target.value)} className="input" placeholder='Masukkan nama tempat...' />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Provinsi</label>
                                <div className="control">
                                    <div className="select is-full-width">
                                        <select onChange={(e) => setProvinsiAgen(e.target.value)}>
                                            {provinsi.map((provinsi, index) => (
                                                <option key={provinsi.id_provinsi} value={provinsi.id_provinsi}>
                                                    {provinsi.nama_provinsi}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Kabupaten/Kota</label>
                                <div className="control">
                                    <div className="select is-full-width">
                                        <select onChange={(e) => setKabupatenKotaAgen(e.target.value)}>
                                            {kabupaten_kota.map((kabupaten_kota, index) => (
                                                <option key={kabupaten_kota.id_kabupaten_kota} value={kabupaten_kota.id_kabupaten_kota}>
                                                    {kabupaten_kota.nama_kabupaten_kota}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Alamat</label>
                                <div className="control">
                                    <input type="text" value={alamatAgen} onChange={(e) => setAlamatAgen(e.target.value)} className="input" placeholder='Masukkan alamat_agen agen...' />
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

export default FormTambahAgen
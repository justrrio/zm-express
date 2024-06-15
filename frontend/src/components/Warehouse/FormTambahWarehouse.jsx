import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FormTambahWarehouse() {
    const [namaWarehouse, setNamaWarehouse] = useState("");
    const [idProvinsiWarehouse, setProvinsiWarehouse] = useState("");
    const [idKabupatenKotaWarehouse, setKabupatenKotaWarehouse] = useState("");
    const [alamatWarehouse, setAlamatWarehouse] = useState("");
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

    // Simpan data warehouse
    const saveWarehouse = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/warehouse", {
                namaWarehouse: namaWarehouse,
                idProvinsiWarehouse: idProvinsiWarehouse,
                idKabupatenKotaWarehouse: idKabupatenKotaWarehouse,
                alamatWarehouse: alamatWarehouse,
            });
            navigate("/warehouse");
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.errorMessage);
            }
        }
    };
    return (
        <div>
            <h1 className='title'>Warehouse</h1>
            <h2 className='subtitle'>Tambah Warehouse</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={saveWarehouse}>
                            {message && (
                                <p className="has-text-centered" style={{ color: "red" }}>{message}</p>
                            )}
                            <div className="field">
                                <label className="label">Nama</label>
                                <div className="control">
                                    <input type="text" value={namaWarehouse} onChange={(e) => setNamaWarehouse(e.target.value)} className="input" placeholder='Masukkan nama tempat...' />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Provinsi</label>
                                <div className="control">
                                    <div className="select is-full-width">
                                        <select onChange={(e) => setProvinsiWarehouse(e.target.value)}>
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
                                        <select onChange={(e) => setKabupatenKotaWarehouse(e.target.value)}>
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
                                    <input type="text" value={alamatWarehouse} onChange={(e) => setAlamatWarehouse(e.target.value)} className="input" placeholder='Masukkan alamat warehouse...' />
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

export default FormTambahWarehouse
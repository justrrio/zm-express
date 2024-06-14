import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ListAgen = () => {
    const [agen, setAgen] = useState([]);

    useEffect(() => {
        getAgen();
    }, []);

    const getAgen = async () => {
        const response = await axios.get("http://localhost:5000/agen");
        console.log("satu:", response.data);
        setAgen(response.data);
    };

    const deleteAgen = async (uuid_agen) => {
        await axios.delete(`http://localhost:5000/agen/${uuid_agen}`);
        getAgen();
    };
    return (
        <div>
            <h1 className='title'>Agen</h1>
            <h2 className='subtitle'>List Tempat Agen</h2>
            <Link to="/agen/add" className="button is-primary mb-2">
                Tambah Agen
            </Link>
            <table className='table is-striped is-fullwidth'>
                <thead className='has-text-grey-darker'>
                    <tr>
                        <th>No.</th>
                        <th>Nama</th>
                        <th>Provinsi</th>
                        <th>Kabupaten/Kota</th>
                        <th>Alamat</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {agen.map((agen, index) => (
                        <tr key={agen.uuid_agen}>
                            <td>{index + 1}</td>
                            <td>{agen.nama_agen}</td>
                            <td>{agen.provinsi_agen}</td>
                            <td>{agen.kabupaten_kota_agen}</td>
                            <td>{agen.alamat_agen}</td>
                            <td>
                                <Link
                                    to={`/agen/edit/${agen.uuid_agen}`}
                                    className="button is-small is-info mr-2"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => deleteAgen(agen.uuid_agen)}
                                    className="button is-small is-danger"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ListAgen
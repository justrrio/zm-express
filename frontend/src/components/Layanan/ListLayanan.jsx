import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ListLayanan = () => {
    const [layanan, setLayanan] = useState([]);

    useEffect(() => {
        getLayanan();
    }, []);

    const getLayanan = async () => {
        const response = await axios.get("http://localhost:5000/layanan");
        console.log("satu:", response.data);

        setLayanan(response.data);
    };

    const deleteLayanan = async (id_layanan) => {
        await axios.delete(`http://localhost:5000/layanan/${id_layanan}`);
        getLayanan();
    };
    return (
        <div>
            <h1 className='title'>Layanan</h1>
            <h2 className='subtitle'>List Layanan</h2>
            <Link to="/layanan/add" className="button is-primary mb-2">
                Tambah Layanan
            </Link>
            <table className='table is-striped is-fullwidth'>
                <thead className='has-text-grey-darker'>
                    <tr>
                        <th>No.</th>
                        <th>Layanan</th>
                        <th>Harga</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {layanan.map((layanan, index) => (
                        <tr key={layanan.id_layanan}>
                            <td>{index + 1}</td>
                            <td>{layanan.nama_layanan}</td>
                            <td>{layanan.harga_layanan}</td>
                            <td>
                                <Link
                                    to={`/layanan/edit/${layanan.id_layanan}`}
                                    className="button is-small is-info mr-2"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => deleteLayanan(layanan.id_layanan)}
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

export default ListLayanan
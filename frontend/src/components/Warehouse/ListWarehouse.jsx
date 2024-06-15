import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ListWarehouse() {
    const [warehouse, setwarehouse] = useState([]);

    useEffect(() => {
        getWarehouse();
    }, []);

    const getWarehouse = async () => {
        const response = await axios.get("http://localhost:5000/warehouse");
        console.log("RESPONSE Warehouse:", response);
        setwarehouse(response.data);
    };

    const deleteWarehouse = async (uuid_warehouse) => {
        await axios.delete(`http://localhost:5000/warehouse/${uuid_warehouse}`);
        getWarehouse();
    };
    return (
        <div>
            <h1 className='title'>Warehouse</h1>
            <h2 className='subtitle'>List Tempat Warehouse</h2>
            <Link to="/warehouse/add" className="button is-primary mb-2">
                Tambah Warehouse
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
                    {warehouse.map((warehouse, index) => (
                        <tr key={warehouse.uuid_warehouse}>
                            <td>{index + 1}</td>
                            <td>{warehouse.nama_warehouse}</td>
                            <td>{warehouse.provinsi_warehouse}</td>
                            <td>{warehouse.kabupaten_kota_warehouse}</td>
                            <td>{warehouse.alamat_warehouse}</td>
                            <td>
                                <Link
                                    to={`/warehouse/edit/${warehouse.uuid_warehouse}`}
                                    className="button is-small is-info mr-2"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => deleteWarehouse(warehouse.uuid_warehouse)}
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

export default ListWarehouse
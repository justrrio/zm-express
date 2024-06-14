import React from 'react'

function FormTambahAgen() {
    return (
        <div>
            <h1 className='title'>Agen</h1>
            <h2 className='subtitle'>Tambah Agen</h2>
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
                                <label className="label">Provinsi</label>
                                <div className="control">
                                    <div className="select is-full-width">
                                        <select>
                                            <option value="Provinsi_1">Provinsi 1</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Kabupaten/Kota</label>
                                <div className="control">
                                    <div className="select is-full-width">
                                        <select>
                                            <option value="Kota_1">Kota 1</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Alamat</label>
                                <div className="control">
                                    <input type="text" className="input" placeholder='Masukkan alamat agen...' />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <button className="button is-success">Simpan</button>
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
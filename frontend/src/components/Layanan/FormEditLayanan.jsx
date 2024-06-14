import React from 'react'

function FormEditLayanan() {
    return (
        <div>
            <h1 className='title'>Layanan</h1>
            <h2 className='subtitle'>Edit Layanan</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form>
                            <div className="field">
                                <label className="label">Nama</label>
                                <div className="control">
                                    <input type="text" className="input" placeholder='Masukkan nama...' />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Harga</label>
                                <div className="control">
                                    <input type="number" className='input' placeholder='Masukkan harga...' />
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

export default FormEditLayanan
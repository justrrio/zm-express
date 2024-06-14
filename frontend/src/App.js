import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './components/Login';
import SignUp from './components/SignUp';

import Users from './pages/Users/Users';
import TambahUser from './pages/Users/TambahUser';
import EditUser from './pages/Users/EditUser';

import Layanan from './pages/Layanan/Layanan';
import TambahLayanan from './pages/Layanan/TambahLayanan';
import EditLayanan from './pages/Layanan/EditLayanan';

import Agen from './pages/Agen/Agen';
import TambahAgen from './pages/Agen/TambahAgen';
import EditAgen from './pages/Agen/EditAgen';

import Warehouse from './pages/Warehouse/Warehouse';
import TambahWarehouse from './pages/Warehouse/TambahWarehouse';
import EditWarehouse from './pages/Warehouse/EditWarehouse';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Jika url mengarah ke path, maka munculkan page yang telah diset. */}
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/dashboard' element={<Dashboard />} />

          <Route path='/users' element={<Users />} />
          <Route path='/users/add' element={<TambahUser />} />
          <Route path='/users/edit/:id' element={<EditUser />} />

          <Route path='/layanan' element={<Layanan />} />
          <Route path='/layanan/add' element={<TambahLayanan />} />
          <Route path='/layanan/edit/:id' element={<EditLayanan />} />

          <Route path='/agen' element={<Agen />} />
          <Route path='/agen/add' element={<TambahAgen />} />
          <Route path='/agen/edit/:id' element={<EditAgen />} />

          <Route path='/warehouse' element={<Warehouse />} />
          <Route path='/warehouse/add' element={<TambahWarehouse />} />
          <Route path='/warehouse/edit/:id' element={<EditWarehouse />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

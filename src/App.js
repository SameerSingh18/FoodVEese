import { Routes, Route, Outlet } from 'react-router-dom';
import Home from "./pages/Home";
import Navbar from './components/Navbar';
import RecipeDetail from './pages/RecipeDetail';
import Favorites from './pages/Favorites';

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <div className='bg-black'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='recipes/:id' element={<RecipeDetail />} />
          <Route path='favorites' element={<Favorites />} />  {/* <-- Yahan add karo */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;

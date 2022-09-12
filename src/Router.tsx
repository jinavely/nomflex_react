import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import NotFound from './components/NotFound';
import Home from './Routes/Home';
import Search from './Routes/Search';
import Tv from './Routes/Tv';

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/search" element={<Search />} />
        <Route path="/tvs" element={<Tv />}>
          <Route path="/tvs/:category/:movieId" element={<Home />} />
        </Route>
        <Route path="/" element={<Home />}>
          <Route path="/movies/:category/:movieId" element={<Home />} />
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

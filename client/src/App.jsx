import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PostView from './pages/PostView';
import PostForm from './pages/PostForm';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<PostView />} />
          <Route path="/create" element={<PostForm />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";

import Layout from './components/Layout.jsx';
import Index from './components/Index.jsx';
import Therapists from './components/Therapists.jsx';
import Clients from './components/Clients.jsx';

import 'bootstrap/dist/css/bootstrap.css';

import './main.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Layout />}>
                  <Route index element={<Index />}/>
                  <Route path="therapists" element={<Therapists/>}/>
                  <Route path="clients" element={<Clients />}/>
              </Route>
          </Routes>
    </BrowserRouter>
  </StrictMode>,
)

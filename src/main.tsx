import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router"
import Home from '@/pages/home/home.tsx'
import Detail from '@/pages/detail/detail.tsx'
import Orders from '@/pages/orders/orders'
import Layout from '@/layouts/root-layout'
import QueryProvider from '@/contexts/react-query'
import Auth from './pages/login/auth-tabs'
import { Toaster } from './components/ui/sonner'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <QueryProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/diseño/:id' element={<Detail />} />
          <Route path='/pedidos' element={<Orders />} />
          <Route path='/ingresar' element={<Auth />} />
        </Route>
      </Routes>
      <Toaster richColors position="top-center" />
    </QueryProvider>
  </BrowserRouter >,
)



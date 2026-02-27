import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import CadastroOng from "./pages/CadastroOng";
import RecuperarSenha from "./pages/RecuperarSenha";
import OngsParceiras from "./pages/OngsParceiras";
import SobreOProjeto from "./pages/SobreOProjeto";
import ComoFunciona from "./pages/ComoFunciona";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    {/* A CORREÇÃO ESTÁ AQUI */}
    <TooltipProvider delayDuration={200}>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/cadastro-ong" element={<CadastroOng />} />
          <Route path="/recuperar-senha" element={<RecuperarSenha />} />
          <Route path="/ongs-parceiras" element={<OngsParceiras />} />
          <Route path="/sobre-o-projeto" element={<SobreOProjeto />} />
          <Route path="/como-funciona" element={<ComoFunciona />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthCard, { AuthCardContent } from "@/components/ui/auth-card";
import { CardTitle } from "@/components/ui/card";
import { Mail, Lock, Building2, FileText, Phone, MapPin, Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CadastroOng() {
  const [nomeDaOng, setNomeDaOng] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [telefone, setTelefone] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [areaDeAtuacao, setAreaDeAtuacao] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Erro de Validação",
        description: "As senhas não coincidem.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // 1. LIMPEZA E VALIDAÇÃO DO CNPJ COM A BRASILAPI
      // Remove caracteres não numéricos do CNPJ para a consulta
      const cleanedCnpj = cnpj.replace(/\D/g, "");

      try {
        // Consulta a API externa para validar o CNPJ
        await axios.get(`https://brasilapi.com.br/api/cnpj/v1/${cleanedCnpj}`);
        // Se a requisição for bem-sucedida (status 200), o código continua.
      } catch (cnpjError) {
        // Se a API retornar um erro (ex: 404), significa que o CNPJ não foi encontrado.
        toast({
          title: "Erro de Validação",
          description: "CNPJ inválido ou não encontrado. Verifique o número digitado.",
          variant: "destructive",
        });
        // Interrompe a execução do cadastro
        return;
      }

      // 2. PROSSEGUE COM O CADASTRO NO SEU SISTEMA (se o CNPJ for válido)
      const ongData = {
        nomeDaOng,
        cnpj, // Salva o CNPJ original com a formatação
        telefone,
        logradouro,
        cidade,
        estado,
        areaDeAtuacao,
        email,
        password,
      };

      await axios.post("http://localhost:3001/ongs", ongData);

      toast({
        title: "Sucesso!",
        description: "ONG cadastrada com sucesso. Você será redirecionado.",
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {
      // Trata erros que possam vir do SEU backend
      let errorMessage = "Não foi possível cadastrar a ONG. Tente novamente.";
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.message || errorMessage;
      }
      toast({
        title: "Erro no Cadastro",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      // Garante que o estado de loading seja desativado ao final, independentemente de sucesso ou erro
      setIsLoading(false);
    }
  };

  return (
    <AuthCard>
      <CardTitle className="text-2xl font-bold text-center text-primary">
        Cadastro de ONG
      </CardTitle>
      
      <AuthCardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* O seu JSX (a parte visual do formulário) não precisa de nenhuma alteração */}
          <div className="space-y-2">
            <Label htmlFor="nomeDaOng">Nome da ONG</Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input id="nomeDaOng" type="text" placeholder="Insira o nome da organização..." value={nomeDaOng} onChange={(e) => setNomeDaOng(e.target.value)} className="pl-10" required disabled={isLoading} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cnpj">CNPJ</Label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input id="cnpj" type="text" placeholder="00.000.000/0000-00" value={cnpj} onChange={(e) => setCnpj(e.target.value)} className="pl-10" required disabled={isLoading} />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="areaDeAtuacao">Área de Atuação</Label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input id="areaDeAtuacao" type="text" placeholder="Ex: Saúde, Educação, Meio Ambiente..." value={areaDeAtuacao} onChange={(e) => setAreaDeAtuacao(e.target.value)} className="pl-10" required disabled={isLoading} />
            </div>
          </div>

           <div className="space-y-2">
            <Label htmlFor="telefone">Telefone de Contato</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input id="telefone" type="tel" placeholder="(00) 00000-0000" value={telefone} onChange={(e) => setTelefone(e.target.value)} className="pl-10" required disabled={isLoading} />
            </div>
          </div>

           <div className="space-y-2">
            <Label htmlFor="logradouro">Endereço</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input id="logradouro" type="text" placeholder="Rua, Avenida, etc..." value={logradouro} onChange={(e) => setLogradouro(e.target.value)} className="pl-10" required disabled={isLoading} />
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="space-y-2 w-full">
              <Label htmlFor="cidade">Cidade</Label>
              <Input id="cidade" type="text" placeholder="Sua cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} required disabled={isLoading} />
            </div>
            <div className="space-y-2 w-1/3">
              <Label htmlFor="estado">Estado</Label>
              <Input id="estado" type="text" placeholder="UF" maxLength={2} value={estado} onChange={(e) => setEstado(e.target.value)} required disabled={isLoading} />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email de Acesso</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input id="email" type="email" placeholder="Insira o email de acesso..." value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" required disabled={isLoading} />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input id="password" type="password" placeholder="Crie uma senha forte..." value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10" required disabled={isLoading} />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar Senha</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input id="confirmPassword" type="password" placeholder="Confirme sua senha..." value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="pl-10" required disabled={isLoading} />
            </div>
          </div>
          
          <Button type="submit" className="w-full bg-primary hover:bg-primary-hover" disabled={isLoading}>
            {isLoading ? "Validando CNPJ e cadastrando..." : "Cadastrar ONG"}
          </Button>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Já tem uma conta?{" "}
              <Link to="/login" className="text-primary hover:text-primary-hover transition-colors">
                Entrar
              </Link>
            </p>
          </div>
        </form>
      </AuthCardContent>
    </AuthCard>
  );
}
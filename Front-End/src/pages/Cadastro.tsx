import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthCard, { AuthCardContent } from "@/components/ui/auth-card";
import { CardTitle } from "@/components/ui/card";
import { Mail, Lock, User, Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Cadastro() {
  const [fullName, setFullName] = useState("");
  const [areaOfExpertise, setAreaOfExpertise] = useState("");
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

    setIsLoading(true); // Inicia o loading

    try {
      const userData = {
        fullName,
        areaOfExpertise,
        email,
        password,
      };

  await axios.post("http://localhost:3001/users", userData);

      toast({
        title: "Sucesso!",
        description: "Conta criada com sucesso. Você será redirecionado.",
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {
      let errorMessage = "Não foi possível criar a conta. Tente novamente mais tarde.";
      
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.message || errorMessage;
      }
      
      toast({
        title: "Erro no Cadastro",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false); // Finaliza o loading, independente de sucesso ou erro
    }
  };

  return (
    <AuthCard>
      <CardTitle className="text-2xl font-bold text-center text-primary">
        Cadastre-se
      </CardTitle>
      
      <AuthCardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
           <div className="space-y-2">
            <Label htmlFor="fullName">Nome Completo</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="fullName"
                type="text"
                placeholder="Insira seu nome completo..."
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="pl-10"
                required
                disabled={isLoading} // Desabilita durante o loading
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="areaOfExpertise">Sua Área de Atuação</Label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="areaOfExpertise"
                type="text"
                placeholder="Ex: Tecnologia, Marketing, etc."
                value={areaOfExpertise}
                onChange={(e) => setAreaOfExpertise(e.target.value)}
                className="pl-10"
                required
                disabled={isLoading} // Desabilita durante o loading
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="email"
                type="email"
                placeholder="Insira seu email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
                disabled={isLoading} // Desabilita durante o loading
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="password"
                type="password"
                placeholder="Insira sua senha..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
                disabled={isLoading} // Desabilita durante o loading
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar Senha</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirme sua senha..."
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10"
                required
                disabled={isLoading} // Desabilita durante o loading
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full bg-primary hover:bg-primary-hover" disabled={isLoading}>
            {isLoading ? "Criando conta..." : "Criar Conta"}
          </Button>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Já tenho uma conta{" "}
              <Link 
                to="/login" 
                className="text-primary hover:text-primary-hover transition-colors"
              >
                Entrar
              </Link>
            </p>
          </div>
        </form>
      </AuthCardContent>
    </AuthCard>
  );
}
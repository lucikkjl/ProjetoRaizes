import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { Search, Cog, Heart } from "lucide-react";

export default function ComoFunciona() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  const steps = [
    {
      icon: Search,
      title: "Diagnóstico com as ONGs",
      description: "Realizamos um mapeamento detalhado das necessidades educacionais de cada ONG parceira, identificando áreas de conhecimento prioritárias e perfil ideal de voluntários."
    },
    {
      icon: Cog,
      title: "Desenvolvimento da Solução",
      description: "Nossa plataforma conecta professores voluntários às ONGs com base em suas especialidades, disponibilidade e localização, criando matches perfeitos para maximizar o impacto."
    },
    {
      icon: Heart,
      title: "Aplicação e Impacto Social",
      description: "Acompanhamos todo o processo de voluntariado, desde o primeiro contato até a implementação dos projetos educacionais, medindo e celebrando os resultados alcançados."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* O Header foi adicionado aqui */}
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Como Funciona?
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Nosso processo é simples e eficaz: conectamos conhecimento a quem mais precisa 
            através de uma metodologia testada e orientada por resultados.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <Card key={index} className="shadow-card hover:shadow-hover transition-shadow duration-300 relative">
                <CardContent className="p-8 text-center space-y-6">
                  {/* Número do passo */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  
                  {/* Ícone */}
                  <div className="w-20 h-20 mx-auto bg-accent rounded-full flex items-center justify-center mt-4">
                    <IconComponent className="w-10 h-10 text-primary" />
                  </div>
                  
                  {/* Título */}
                  <h3 className="text-xl font-bold text-primary">
                    {step.title}
                  </h3>
                  
                  {/* Descrição */}
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Seção de processo detalhado */}
        <div className="mt-20 bg-gradient-card rounded-lg p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-primary">
                Um processo pensado para gerar resultados
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">
                    <strong>Cadastro simples:</strong> Voluntários se registram informando suas especialidades e disponibilidade.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">
                    <strong>Matching inteligente:</strong> Nossa plataforma sugere as melhores oportunidades baseadas no perfil.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">
                    <strong>Acompanhamento contínuo:</strong> Suporte durante todo o processo de voluntariado.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">
                    <strong>Impacto mensurável:</strong> Relatórios de progresso e feedback constante.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=400&fit=crop" 
                alt="Pessoas colaborando em um projeto"
                className="max-w-full h-auto rounded-lg shadow-card"
              />
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="bg-primary text-primary-foreground rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">
              Pronto para fazer a diferença?
            </h2>
            <p className="text-lg opacity-90 mb-6">
              Junte-se a centenas de professores que já estão transformando vidas através da educação.
            </p>
            <button 
              onClick={() => navigate("/ongs-parceiras")}
              className="bg-background text-foreground px-8 py-3 rounded-md font-semibold hover:bg-background/90 transition-colors"
            >
              Ver Oportunidades
            </button>
          </div>
        </div>
      </main>
      
      <Footer variant="complete" />
    </div>
  );
}
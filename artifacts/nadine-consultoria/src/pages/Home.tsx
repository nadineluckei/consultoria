import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronRight, BarChart3, Target, Briefcase, Zap, LineChart, MessageSquare, Linkedin, Mail, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import nadinePng from '@assets/Gemini_Generated_Image_fn0u0kfn0u0kfn0u_1782330999024.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Sobre', id: 'sobre' },
    { name: 'Metodologia', id: 'metodologia' },
    { name: 'Serviços', id: 'servicos' },
    { name: 'Roadmap', id: 'roadmap' },
    { name: 'Insights', id: 'insights' },
    { name: 'Cases', id: 'cases' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/90 backdrop-blur-md border-b border-border shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className="text-xl md:text-2xl font-serif font-bold tracking-tight cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          Nadine Strategy.
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button key={link.id} onClick={() => scrollTo(link.id)} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {link.name}
            </button>
          ))}
          <Button onClick={() => scrollTo('contato')} className="rounded-none px-6">
            Solicite um diagnóstico
          </Button>
        </div>

        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background border-b border-border py-4 px-6 flex flex-col gap-4 shadow-lg">
          {navLinks.map((link) => (
            <button key={link.id} onClick={() => scrollTo(link.id)} className="text-left text-lg font-medium py-2">
              {link.name}
            </button>
          ))}
          <Button onClick={() => scrollTo('contato')} className="mt-4 rounded-none w-full">
            Solicite um diagnóstico
          </Button>
        </div>
      )}
    </nav>
  );
};

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    className={className}
  >
    {children}
  </motion.div>
);

const Home = () => {
  const { toast } = useToast();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, 100]);

  const [formData, setFormData] = useState({ name: "", company: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Erro ao enviar");
      toast({
        title: "Solicitação enviada com sucesso",
        description: "Entrarei em contato em breve.",
      });
      setFormData({ name: "", company: "", email: "", message: "" });
    } catch {
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente ou entre em contato diretamente por email.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
      <Navbar />

      {/* 1. Hero Section */}
      <section className="relative pt-40 pb-20 md:pt-52 md:pb-32 px-6 md:px-12 flex items-center min-h-[90vh]">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-muted/50 via-background to-background"></div>
        <div className="container mx-auto max-w-5xl">
          <motion.div style={{ opacity, y }} className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium leading-[1.1] tracking-tight mb-8">
              Transformo dados e tecnologia em <span className="italic text-muted-foreground">planos estratégicos de crescimento</span> claros e executáveis.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl font-light leading-relaxed">
              Consultoria estratégica fracionada para empresas que precisam estruturar, profissionalizar e acelerar seu motor de marketing e vendas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-none h-14 px-8 text-base" onClick={() => document.getElementById('contato')?.scrollIntoView({behavior: 'smooth'})}>
                Solicite um diagnóstico <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="rounded-none h-14 px-8 text-base border-primary/20 hover:bg-muted" onClick={() => document.getElementById('metodologia')?.scrollIntoView({behavior: 'smooth'})}>
                Conheça a Metodologia
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Sobre a Consultora */}
      <section id="sobre" className="py-24 md:py-32 bg-primary text-primary-foreground px-6 md:px-12">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <h2 className="text-4xl md:text-5xl font-serif mb-8">Estratégia executiva, não agência.</h2>
              <p className="text-lg text-primary-foreground/80 mb-6 font-light leading-relaxed">
                Atuo como uma parceira estratégica de negócios, operando internamente para construir fundações sólidas de crescimento. Não vendo pacotes de posts ou campanhas isoladas — construo motores de receita.
              </p>
              <p className="text-lg text-primary-foreground/80 mb-10 font-light leading-relaxed">
                Com profunda expertise B2B e B2C, metodologias validadas e visão analítica, preencho a lacuna entre a visão do CEO e a execução tática do time.
              </p>
              
              <div className="flex flex-wrap gap-3 mb-10">
                {['Marketing Digital', 'Branding', 'Growth', 'Business Intelligence', 'CRM', 'Automação', 'SEO', 'Mídia Paga', 'Analytics', 'Vendas B2B', 'E-commerce'].map(skill => (
                  <span key={skill} className="text-sm border border-primary-foreground/20 px-4 py-2 rounded-full text-primary-foreground/90">
                    {skill}
                  </span>
                ))}
              </div>

              <a href="https://linkedin.com/in/nadineluckei" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary-foreground hover:opacity-80 transition-opacity font-medium border-b border-primary-foreground pb-1">
                <Linkedin className="h-5 w-5" /> Conecte-se no LinkedIn
              </a>
            </FadeIn>
            <FadeIn delay={0.2} className="relative">
              <div className="aspect-[4/5] bg-muted/10 relative overflow-hidden">
                <img 
                  src={nadinePng}
                  alt="Nadine Luckei - Consultoria Estratégica" 
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-background/5 border border-primary-foreground/10 -z-10" />
              <div className="absolute -top-6 -right-6 w-32 h-32 border border-primary-foreground/20 -z-10" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 3. Metodologia em 5 Etapas */}
      <section id="metodologia" className="py-24 md:py-32 px-6 md:px-12 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <FadeIn>
            <div className="mb-16">
              <span className="text-sm font-bold tracking-widest uppercase text-muted-foreground mb-4 block">O Processo</span>
              <h2 className="text-4xl md:text-5xl font-serif">Metodologia em 5 etapas.</h2>
            </div>
          </FadeIn>

          <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-1 relative before:absolute before:inset-0 before:ml-5 md:before:ml-8 before:-translate-x-px md:before:mx-auto before:md:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            {[
              { 
                num: "01", 
                title: "Kickoff e Entrevistas", 
                desc: "Definição do objetivo do projeto de consultoria. Alinhamento com CEO, comercial, marketing, atendimento e produto. Mapeamento de dores, desafios, oportunidades e concorrentes.",
                icon: <Target className="w-5 h-5" />
              },
              { 
                num: "02", 
                title: "Imersão Analítica", 
                desc: "Análise profunda de marca, site, CRM, funil de vendas, campanhas ativas, conteúdo, dados históricos, processo comercial e stack tecnológico.",
                icon: <BarChart3 className="w-5 h-5" />
              },
              { 
                num: "03", 
                title: "Desenho da Estratégia", 
                desc: "Definição do posicionamento de mercado, arquitetura de marca, estratégia de marketing e modelo de vendas baseado em dados.",
                icon: <LineChart className="w-5 h-5" />
              },
              { 
                num: "04", 
                title: "Roadmap Executivo", 
                desc: "Planejamento tático em 3 horizontes: 90 dias (quick wins), 6 meses (projetos estruturantes) e 12 meses (crescimento e novos mercados).",
                icon: <Zap className="w-5 h-5" />
              },
              { 
                num: "05", 
                title: "Workshop de Alinhamento", 
                desc: "1 dia de imersão presencial ou 2 workshops virtuais de 4h para apresentar a estratégia, garantir buy-in da equipe e iniciar a execução.",
                icon: <MessageSquare className="w-5 h-5" />
              }
            ].map((step, idx) => (
              <FadeIn key={idx} delay={idx * 0.1} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-primary bg-background text-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  {step.icon}
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-none bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-sm font-bold text-muted-foreground">Fase {step.num}</span>
                    <div className="h-px bg-border flex-1"></div>
                  </div>
                  <h3 className="text-xl font-serif font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Serviços */}
      <section id="servicos" className="py-24 md:py-32 px-6 md:px-12">
        <div className="container mx-auto max-w-6xl">
          <FadeIn className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Modelos de atuação.</h2>
            <p className="text-lg text-muted-foreground font-light">
              Soluções modulares para diferentes momentos de maturidade do seu negócio, desde o diagnóstico inicial até o acompanhamento executivo contínuo.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Diagnóstico Operacional",
                duration: "Curto Prazo",
                desc: "Identifico os principais gaps na sua operação com base em uma dor ou objetivo específico — entregando clareza e prioridades acionáveis.",
                items: ["Sessão estratégica focada no seu desafio", "Mapeamento dos gaps por área impactada", "Análise de causa raiz dos gargalos", "Quick wins e prioridades identificadas", "Recomendações com próximos passos claros"]
              },
              {
                title: "Planejamento Estratégico",
                duration: "Médio Prazo",
                desc: "A construção do motor de crescimento com um plano tático claro para os próximos 12 meses.",
                items: ["Análise de mercado e posicionamento", "Estratégia de SEO, Mídia e Conteúdo", "Automação de Marketing", "Estratégia comercial (Pipeline, SLAs)", "Roadmap executivo 12 meses (OKRs)"],
                featured: true
              },
              {
                title: "Consultoria Fracionada",
                duration: "Constante",
                desc: "Atuação como consultora estratégica part-time para garantir a execução do roadmap.",
                items: ["Reuniões executivas mensais", "Acompanhamento rigoroso de KPIs", "Revisão e ajuste de roadmap", "Apoio estratégico ao time interno", "Análise de tendências e inovação"]
              }
            ].map((service, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <Card className={`h-full rounded-none border ${service.featured ? 'border-primary shadow-lg relative' : 'border-border shadow-sm'} bg-card transition-transform hover:-translate-y-1`}>
                  {service.featured && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
                  )}
                  <CardContent className="p-8">
                    <div className="text-sm font-bold tracking-wider text-muted-foreground uppercase mb-2">{service.duration}</div>
                    <h3 className="text-2xl font-serif font-medium mb-4">{service.title}</h3>
                    <p className="text-muted-foreground mb-8 text-sm leading-relaxed">{service.desc}</p>
                    
                    <ul className="space-y-4">
                      {service.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                          <span className="text-foreground/90">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Roadmap Visual */}
      <section id="roadmap" className="py-24 md:py-32 px-6 md:px-12 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-5xl">
          <FadeIn className="mb-16 md:mb-24">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">O Horizonte de Crescimento.</h2>
            <p className="text-lg text-primary-foreground/80 max-w-2xl font-light">
              Estratégia sem execução é apenas teoria. Nosso roadmap é desenhado para gerar valor no curto prazo enquanto constrói as fundações do longo prazo.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-0 border-t border-b border-primary-foreground/20">
            {[
              { time: "90 Dias", title: "Quick Wins & Fundações", desc: "Ações de impacto imediato para gerar caixa e estruturação básica de dados e CRM. Arrumando a casa." },
              { time: "6 Meses", title: "Projetos Estruturantes", desc: "Lançamento de novas campanhas, automações complexas, alinhamento fino entre marketing e vendas (Smarketing)." },
              { time: "12 Meses", title: "Escala & Novos Mercados", desc: "Otimização de canais, maturidade tecnológica, testes em novos segmentos e consolidação do motor de receita." }
            ].map((phase, idx) => (
              <FadeIn key={idx} delay={idx * 0.15} className={`p-8 md:p-12 ${idx !== 2 ? 'md:border-r border-primary-foreground/20' : ''} relative group`}>
                <div className="text-6xl font-serif font-light text-primary-foreground/20 mb-6 group-hover:text-primary-foreground/40 transition-colors">{phase.time}</div>
                <h3 className="text-xl font-semibold mb-4">{phase.title}</h3>
                <p className="text-primary-foreground/70 text-sm leading-relaxed">{phase.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Insights & Tendências */}
      <section id="insights" className="py-24 md:py-32 px-6 md:px-12 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <FadeIn className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-serif mb-6">Inteligência de Mercado.</h2>
              <p className="text-lg text-muted-foreground font-light">
                Insights, tendências e a visão da consultoria sobre o futuro do crescimento B2B e estratégia corporativa.
              </p>
            </div>
            <Button variant="outline" className="rounded-none self-start md:self-auto">Ver todos os artigos</Button>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                category: "Tecnologia",
                title: "O impacto da IA Generativa na qualificação de leads B2B",
                desc: "Como empresas maduras estão utilizando IA não para gerar volume, mas para aumentar a precisão do ICP."
              },
              {
                category: "Vendas B2B",
                title: "A morte do funil tradicional e a ascensão dos ecossistemas de receita",
                desc: "Por que separar marketing e vendas em silos está custando caro para empresas de médio porte."
              },
              {
                category: "Estratégia",
                title: "Benchmarks 2024: Onde os CEOs estão alocando orçamento de Growth",
                desc: "Dados consolidados sobre investimentos em tecnologia vs. pessoas no cenário atual de negócios."
              }
            ].map((post, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <div className="group cursor-pointer">
                  <div className="h-48 bg-card border border-border mb-6 p-6 flex items-end group-hover:border-primary transition-colors">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{post.category}</span>
                  </div>
                  <h3 className="text-xl font-serif font-medium mb-3 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">{post.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Cases */}
      <section id="cases" className="py-24 md:py-32 px-6 md:px-12">
        <div className="container mx-auto max-w-6xl">
          <FadeIn className="mb-16">
            <span className="text-sm font-bold tracking-widest uppercase text-muted-foreground mb-4 block">Resultados</span>
            <h2 className="text-4xl md:text-5xl font-serif">Impacto Estratégico.</h2>
          </FadeIn>

          <div className="space-y-0">
            {[
              {
                segment: "Holding B2B",
                area: "Estruturação Comercial e Previsibilidade de Receita",
                desc: "Atuação na transformação de operações comerciais e de marketing, conectando posicionamento, geração de demanda, processos e inteligência de mercado para criar crescimento mais previsível e escalável.",
                metrics: [
                  { value: "+43,98%", label: "Aumento na aquisição de clientes por meio da otimização do funil, copy estratégica e alinhamento entre marketing e vendas." },
                  { value: "72 oportunidades", label: "Geradas em um único mês para negócios com tickets de alto valor, após reestruturação do topo do funil e segmentação de ICP." }
                ]
              },
              {
                segment: "E-COMMERCE / INFOPRODUTO",
                area: "Aumento da Performance Orgânica",
                desc: "Construção de ativos digitais de longo prazo por meio de SEO, conteúdo e automação, transformando marketing em um ativo estratégico para geração contínua de demanda.",
                metrics: [
                  { value: "1ª posição", label: "No Google para palavras-chave estratégicas em mercados altamente competitivos." },
                  { value: "+23 keywords", label: "Posicionadas no topo dos resultados de busca, fortalecendo autoridade e aquisição orgânica." }
                ]
              },
              {
                segment: "STARTUP B2B",
                area: "Redução no CAC e aumento do alcance em Social",
                desc: "Diagnóstico do comportamento do público e reformulação da estratégia de aquisição e conteúdo, integrando mídia paga e comunicação orgânica para aumentar eficiência e relevância da marca.",
                metrics: [
                  { value: "92%", label: "Redução no custo de aquisição de clientes (CAC) em campanhas de mídia paga, por meio da otimização da segmentação, mensagens e jornada do usuário." },
                  { value: "3,5 mil compartilhamentos", label: "Por publicação — transformação da estratégia de conteúdo em ativo de engajamento, ampliando alcance orgânico e conexão com o público-alvo." }
                ]
              },
              {
                segment: "Eventos e Brand Experience",
                area: "Geração de Demanda de Alto Ticket",
                desc: "Desenvolvimento de estratégias de aquisição e relacionamento com decisores de grandes empresas, aproximando marcas de oportunidades comerciais complexas e ciclos de venda consultivos.",
                metrics: [
                  { value: "32 empresas", label: "Qualificadas em campanha B2B direcionada a diretores e gerentes de marketing." },
                  { value: "Grandes marcas", label: "Participação em oportunidades comerciais envolvendo Prudential, Claro, O Boticário e Casio." }
                ]
              },
              {
                segment: "Empresa de Tecnologia",
                area: "Inteligência e Governança Comercial",
                desc: "Estruturação da área de Inteligência de Mercado e Sales Operations para apoiar decisões estratégicas, integração de dados e escalabilidade das operações de crescimento.",
                metrics: [
                  { value: "Visão integrada", label: "Criação de dashboards, processos e fluxos entre Marketing, Vendas e Estratégia." },
                  { value: "Escala global", label: "Estruturação de processos para operações em diferentes mercados e segmentos." }
                ]
              }
            ].map((item, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <div className="grid md:grid-cols-12 gap-8 border-t border-border py-12">
                  <div className="md:col-span-3">
                    <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider block mb-1">{item.segment}</span>
                    <h3 className="text-lg font-serif font-medium leading-snug">{item.area}</h3>
                  </div>
                  <div className="md:col-span-5">
                    <p className="text-muted-foreground leading-relaxed text-sm">{item.desc}</p>
                  </div>
                  <div className="md:col-span-4 border-l border-border pl-8 space-y-6">
                    {item.metrics.map((m, i) => (
                      <div key={i}>
                        <div className="text-3xl font-light text-primary mb-1">{m.value}</div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{m.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA / Contato */}
      <section id="contato" className="py-24 md:py-32 px-6 md:px-12 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="grid md:grid-cols-2 gap-16">
            <FadeIn>
              <h2 className="text-4xl md:text-6xl font-serif mb-6">Pronto para o próximo nível?</h2>
              <p className="text-xl text-primary-foreground/80 font-light mb-12 max-w-md">
                Solicite uma Análise de Gaps. Identifico os principais gargalos da sua operação com base na sua dor ou objetivo específico — e entrego clareza sobre onde agir primeiro.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-foreground/10 rounded-none flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm text-primary-foreground/60">Email direto</div>
                    <div className="text-lg font-medium">luckeitolotti@gmail.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-foreground/10 rounded-none flex items-center justify-center">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm text-primary-foreground/60">Disponibilidade</div>
                    <div className="text-lg font-medium">Aceitando novos projetos para Q3</div>
                  </div>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <div className="bg-background text-foreground p-8 md:p-10 shadow-xl">
                <h3 className="text-2xl font-serif font-medium mb-6">Solicitar Análise de Gaps</h3>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Nome completo</label>
                    <Input id="name" required value={formData.name} onChange={e => setFormData(f => ({...f, name: e.target.value}))} className="rounded-none border-border focus-visible:ring-primary h-12" placeholder="Ex: João Silva" />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium mb-2">Empresa</label>
                    <Input id="company" value={formData.company} onChange={e => setFormData(f => ({...f, company: e.target.value}))} className="rounded-none border-border focus-visible:ring-primary h-12" placeholder="Nome da sua empresa" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email corporativo</label>
                    <Input id="email" type="email" required value={formData.email} onChange={e => setFormData(f => ({...f, email: e.target.value}))} className="rounded-none border-border focus-visible:ring-primary h-12" placeholder="joao@empresa.com.br" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">Breve contexto do seu desafio atual</label>
                    <Textarea id="message" required value={formData.message} onChange={e => setFormData(f => ({...f, message: e.target.value}))} className="rounded-none border-border focus-visible:ring-primary min-h-[120px] resize-none" placeholder="Qual o principal gargalo de crescimento hoje?" />
                  </div>
                  <Button type="submit" disabled={submitting} className="w-full rounded-none h-14 text-base mt-2">
                    {submitting ? "Enviando..." : "Enviar Solicitação"}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Suas informações são tratadas com total confidencialidade.
                  </p>
                </form>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background py-12 px-6 border-t border-border">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xl font-serif font-bold tracking-tight">Nadine Strategy.</div>
          <div className="text-sm text-muted-foreground flex flex-col md:flex-row items-center gap-4">
            <span>© {new Date().getFullYear()} Nadine Luckei Consultoria. Todos os direitos reservados.</span>
            <span className="hidden md:inline">•</span>
            <a href="https://linkedin.com/in/nadineluckei" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

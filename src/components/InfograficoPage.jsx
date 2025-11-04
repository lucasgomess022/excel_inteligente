import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import { Cpu, FileSpreadsheet, Bot, Target, TrendingUp, CheckCircle, ChevronDown, ArrowRight, ArrowLeft, BrainCircuit, Sparkles, Lightbulb, ListChecks, Copy, Download } from 'lucide-react';

import { Button } from "@/components/ui/button";
import manualProfessorPDF from '/manual-professor-novo.pdf';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";

// Importando as logos
import logoFaculdade from '../assets/logo-faculdade.png';
import logoPrograma from '../assets/logo-programa.jpg';

// --- Componente de Card com Animação ---
const AnimatedCard = ({ children, className }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-lg hover:shadow-purple-500/20 hover:border-purple-500/50 transition-all duration-300 ${className}`}
        >
            {children}
        </motion.div>
    );
};

// --- Componente de Acordeão ---
const AccordionItem = ({ title, icon: Icon, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-gray-700 rounded-lg overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-5 text-left bg-gray-800 hover:bg-gray-700/70 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <Icon className="w-6 h-6 text-blue-400" />
                    <span className="font-semibold text-lg text-gray-100">{title}</span>
                </div>
                <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}
                />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="bg-gray-900/50"
                    >
                        <div className="p-5 border-t border-gray-700 text-gray-300">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// --- Componente de Tooltip para Palavras-chave ---
const Keyword = ({ word, tip }) => (
    <TooltipProvider delayDuration={100}>
        <Tooltip>
            <TooltipTrigger asChild>
                <span className="font-bold text-blue-400 border-b-2 border-blue-400/50 cursor-pointer">{word}</span>
            </TooltipTrigger>
            <TooltipContent className="bg-gray-900 text-white border-gray-700">
                <p>{tip}</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
);

export default function InfograficoPage() {
    // --- Dados ---
    const focoAluno = [
        { title: "Análise de Dados Simplificada", content: "O site demonstra como a IA pode fazer o trabalho pesado de cálculo, permitindo que você se concentre na interpretação dos resultados financeiros." },
        { title: "Preparação para o Mercado", content: "Aprenda a usar ferramentas de IA que são cada vez mais comuns no mercado de trabalho, ganhando uma vantagem competitiva." },
        { title: "Entendimento Conceitual", content: "Veja na prática como conceitos financeiros complexos se traduzem em números e gráficos, facilitando o entendimento." },
        { title: "Foco na Decisão", content: "Em vez de gastar tempo com fórmulas, o site te ensina a usar os dados para tomar decisões financeiras informadas." },
    ];
    const intervencaoProfessor = [
        { title: "Organizar Dados", content: "O professor orienta na estruturação e organização dos dados brutos, garantindo que a planilha esteja pronta para ser processada pela IA." },
        { title: "Validar Planilha", content: "Auxilia na verificação da integridade e correção dos dados, ensinando a importância da qualidade da informação." },
        { title: "Ensinar a Escrever Prompts", content: "Capacita os alunos a formular prompts claros e eficazes para a IA, extraindo o máximo de insights." },
        { title: "Interpretar Resultados", content: "Guia a análise crítica dos resultados gerados pela IA, promovendo a compreensão e a tomada de decisão baseada em dados." },
    ];

    const competenciasTrabalhadas = [
        { title: "Interpretação de Gráficos", content: "Desenvolvimento da capacidade de ler e compreender visualizações de dados geradas pela IA." },
        { title: "Análise Crítica", content: "Estímulo ao questionamento e avaliação dos insights fornecidos pela IA, evitando a aceitação passiva." },
        { title: "Comunicação Técnica", content: "Habilidade de expressar e discutir os resultados da análise de forma clara e profissional." },
        { title: "Noções de Finanças", content: "Reforço de conceitos financeiros através da aplicação prática em cenários simulados." },
    ];

    const beneficiosAbordagem = [
        { title: "Maior Engajamento", content: "A abordagem prática e o uso de IA tornam o aprendizado mais dinâmico e interessante para os alunos." },
        { title: "Foco na Interpretação", content: "Permite que os alunos se concentrem na análise e interpretação dos dados, em vez de se perderem em detalhes técnicos de fórmulas." },
        { title: "Acesso Universal", content: "Não depende de software pago, democratizando o acesso ao conhecimento e às ferramentas de análise." },
        { title: "Preparação para o Mercado", content: "Desenvolve habilidades essenciais para o mercado de trabalho, como análise crítica, comunicação e uso de ferramentas de IA." },
    ];

    const passos = [
        { title: "Passo 1: Estruturar Dados na Planilha", description: "O professor orienta a criação de planilhas com dados relevantes (ex: despesas de empresas fictícias) para a análise.", icon: FileSpreadsheet },
        { title: "Passo 2: Exportar em CSV ou XLSX", description: "Os alunos aprendem a exportar os dados da planilha para formatos compatíveis com ferramentas de IA, como CSV ou XLSX.", icon: ArrowRight },
        { title: "Passo 3: Subir na IA com Prompt Claro", description: "Utilização de plataformas de IA (Manus, ChatGPT, etc.) para analisar os dados, com prompts bem elaborados para obter resultados específicos.", icon: BrainCircuit },
        { title: "Passo 4: Receber Planilha Pronta", description: "A IA retorna uma planilha com fórmulas aplicadas, gráficos gerados e um resumo executivo, otimizando o tempo de trabalho.", icon: CheckCircle },
        { title: "Passo 5: Interpretar Juntos", description: "Professor e alunos analisam e interpretam os resultados da IA, discutindo os insights e aprofundando o conhecimento.", icon: Lightbulb },
    ];
    
    const chartData = [
        { name: 'Antes', Confiança: 35, Habilidade: 25 },
        { name: 'Depois', Confiança: 85, Habilidade: 75 },
    ];
    
    const [currentStep, setCurrentStep] = useState(0);

    const nextStep = () => setCurrentStep(prev => (prev + 1) % passos.length);
    const prevStep = () => setCurrentStep(prev => (prev - 1 + passos.length) % passos.length);

    // Função para baixar CSV
    const downloadCSV = () => {
        const csvContent = `Empresa,2022,2023,2024
TechSolutions Ltda,150000,180000,220000
InnovaServ S.A.,95000,110000,125000
GlobalTrade Inc.,300000,285000,310000`;
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'exemplo-empresas.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Função para baixar XLSX (simulado como CSV com extensão .xlsx)
    const downloadXLSX = () => {
        const csvContent = `Empresa,2022,2023,2024
TechSolutions Ltda,150000,180000,220000
InnovaServ S.A.,95000,110000,125000
GlobalTrade Inc.,300000,285000,310000`;
        
        const blob = new Blob([csvContent], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'exemplo-empresas.xlsx');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Função para copiar prompt
    const copyPrompt = () => {
        const promptText = `Analise esta planilha de despesas empresariais e me ajude com o seguinte:

1. Calcule o crescimento percentual de cada empresa entre 2022 e 2024
2. Identifique qual empresa teve o maior crescimento absoluto
3. Crie fórmulas para calcular a média de gastos por empresa
4. Gere um gráfico de barras comparando as despesas por ano
5. Forneça um resumo executivo com insights sobre as tendências

Por favor, retorne uma planilha com as fórmulas aplicadas e um relatório com suas análises.`;

        navigator.clipboard.writeText(promptText).then(() => {
            alert('Prompt copiado para a área de transferência!');
        }).catch(err => {
            console.error('Erro ao copiar prompt: ', err);
        });
    };

    return (
        <div className="min-h-screen bg-gray-950 text-gray-200 overflow-x-hidden">
            {/* Rodapé com logos no topo */}
            <header className="bg-white py-4 px-4 shadow-sm">
                <div className="container mx-auto flex justify-between items-center">
                    <img 
                        src={logoFaculdade} 
                        alt="Logo da Faculdade" 
                        className="h-12 md:h-16 object-contain"
                    />
                    <img 
                        src={logoPrograma} 
                        alt="Logo do Programa" 
                        className="h-12 md:h-16 object-contain"
                    />
                </div>
            </header>

            <div className="absolute top-0 left-0 w-full h-full bg-grid-gray-700/[0.2] [mask-image:linear-gradient(to_bottom,white_5%,transparent_100%)]"></div>
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] bg-purple-600/20 rounded-full filter blur-3xl animate-blob"></div>
                <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-blue-600/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-[5%] left-[20%] w-[300px] h-[300px] bg-green-600/20 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
            </div>

            <main className="relative z-10 container mx-auto px-4 py-12 md:py-20 space-y-20 md:space-y-28">
                
                {/* --- Cabeçalho --- */}
                <header className="text-center space-y-4">
                        <motion.h1 
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, type: 'spring' }}
                            className="text-4xl md:text-6xl font-black text-gradient"
                        >
                            Excel Inteligente — Intervenção pedagógica com IA
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto"
                        >
                            Como transformar o ensino de planilhas em cursos técnicos usando exportação para IA.
                        </motion.p>
                </header>

                {/* --- Seções: Contexto e Solução --- */}
                <div className="grid md:grid-cols-2 gap-8">
                    <AnimatedCard>
                        <div className="p-8">
                            <div className="flex items-center gap-4 mb-4">
                                <Cpu className="w-10 h-10 text-purple-400 glow-icon"/>
                                <h2 className="text-2xl font-bold text-white">O Contexto</h2>
                            </div>
                                <p className="text-gray-300">
                                    Muitos alunos de cursos técnicos enfrentam dificuldades com fórmulas e softwares pagos. A IA surge como uma aliada acessível, que pode ser usada tanto no ensino técnico quanto no fundamental e médio. Ela apoia o professor na criação de atividades interativas e personalizadas, ampliando a compreensão e o interesse do aluno sem substituir o papel docente.
                                </p>
                        </div>
                    </AnimatedCard>
                    <AnimatedCard>
                        <div className="p-8">
                                <div className="flex items-center gap-4 mb-4">
                                    <Bot className="w-10 h-10 text-green-400 glow-icon"/>
                                    <h2 className="text-2xl font-bold text-white">A Oportunidade: IA como Parceira</h2>
                                </div>
                                <p className="text-gray-300">
                                    A Inteligência Artificial torna o ensino mais dinâmico, permitindo que professores e alunos analisem dados e compreendam conceitos matemáticos e financeiros de forma prática. Em vez de focar na memorização de fórmulas, a IA estimula a interpretação, o raciocínio e a aplicação real do conhecimento — tornando o aprendizado mais acessível e envolvente.
                                </p>
                        </div>
                    </AnimatedCard>
                </div>

                    {/* --- Foco no Aluno (Novo) ---
                <section>
                    <h2 className="text-3xl font-bold text-center mb-10">O Foco é em Você, Aluno!</h2>
                    <div className="max-w-4xl mx-auto space-y-4">
                        {focoAluno.map((foco, i) => (
                            <AccordionItem key={i} title={foco.title} icon={Sparkles}>
                                <p>{foco.content}</p>
                            </AccordionItem>
                        ))}
                    </div>
                </section>

                {/* --- Intervenção do Professor ---
                    <section>
                        <h2 className="text-3xl font-bold text-center mb-10">A Intervenção do Professor</h2>
                        <div className="max-w-4xl mx-auto space-y-4">
                            {intervencaoProfessor.map((item, i) => (
                                <AccordionItem key={i} title={item.title} icon={Target}>
                                    <p>{item.content}</p>
                                </AccordionItem>
                            ))}
                        </div>
                    </section>

                    {/* --- Seção: Competências Trabalhadas --- */}
                    <section>
                        <h2 className="text-3xl font-bold text-center mb-10">Competências Trabalhadas</h2>
                        <div className="max-w-4xl mx-auto space-y-4">
                            {competenciasTrabalhadas.map((item, i) => (
                                <AccordionItem key={i} title={item.title} icon={CheckCircle}>
                                    <p>{item.content}</p>
                                </AccordionItem>
                            ))}
                        </div>
                    </section>

                {/* --- Fluxo de Ensino (Passo a Passo) --- */}
                <section>
                     <h2 className="text-3xl font-bold text-center mb-10">Fluxo de Ensino (Passo a Passo)</h2>
                     <AnimatedCard className="max-w-4xl mx-auto">
                        <div className="p-8 md:p-12">
                            <div className="flex items-center justify-between mb-8">
                                <Button variant="outline" size="icon" onClick={prevStep} className="bg-gray-700 border-gray-600 hover:bg-gray-600">
                                    <ArrowLeft className="w-5 h-5"/>
                                </Button>
                                <div className="flex-1 mx-4">
                                    <div className="flex justify-between mb-2">
                                        {passos.map((_, index) => (
                                            <div key={index} className={`w-3 h-3 rounded-full transition-colors duration-300 ${currentStep >= index ? 'bg-blue-400' : 'bg-gray-600'}`}></div>
                                        ))}
                                    </div>
                                    <div className="bg-gray-600 rounded-full h-1.5">
                                        <motion.div 
                                          className="bg-blue-400 h-1.5 rounded-full"
                                          animate={{ width: `${(currentStep / (passos.length - 1)) * 100}%` }}
                                          transition={{ duration: 0.5, ease: 'easeInOut' }}
                                        />
                                    </div>
                                </div>
                                <Button variant="outline" size="icon" onClick={nextStep} className="bg-gray-700 border-gray-600 hover:bg-gray-600">
                                    <ArrowRight className="w-5 h-5"/>
                                </Button>
                            </div>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentStep}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                    className="text-center"
                                >
                                    <div className="flex justify-center mb-4">
                                        {React.createElement(passos[currentStep].icon, { className: "w-12 h-12 text-blue-400" })}
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{passos[currentStep].title}</h3>
                                    <p className="text-gray-300 max-w-lg mx-auto">{passos[currentStep].description}</p>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                     </AnimatedCard>
                </section>

                {/* --- Exemplo Prático --- */}
                <section>
                    <h2 className="text-3xl font-bold text-center mb-10">Exemplo Prático</h2>
                    <AnimatedCard className="max-w-4xl mx-auto">
                        <div className="p-8">
                            <h3 className="text-xl font-bold mb-4 text-center">Despesas de Empresas Fictícias (3 anos)</h3>
                            <div className="overflow-x-auto mb-6">
                                <table className="w-full border-collapse border border-gray-600 text-sm">
                                    <thead>
                                        <tr className="bg-gray-700">
                                            <th className="border border-gray-600 p-3 text-left">Empresa</th>
                                            <th className="border border-gray-600 p-3 text-center">2022</th>
                                            <th className="border border-gray-600 p-3 text-center">2023</th>
                                            <th className="border border-gray-600 p-3 text-center">2024</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="border border-gray-600 p-3">TechSolutions Ltda</td>
                                            <td className="border border-gray-600 p-3 text-center">R$ 150.000</td>
                                            <td className="border border-gray-600 p-3 text-center">R$ 180.000</td>
                                            <td className="border border-gray-600 p-3 text-center">R$ 220.000</td>
                                        </tr>
                                        <tr className="bg-gray-800/50">
                                            <td className="border border-gray-600 p-3">InnovaServ S.A.</td>
                                            <td className="border border-gray-600 p-3 text-center">R$ 95.000</td>
                                            <td className="border border-gray-600 p-3 text-center">R$ 110.000</td>
                                            <td className="border border-gray-600 p-3 text-center">R$ 125.000</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-600 p-3">GlobalTrade Inc.</td>
                                            <td className="border border-gray-600 p-3 text-center">R$ 300.000</td>
                                            <td className="border border-gray-600 p-3 text-center">R$ 285.000</td>
                                            <td className="border border-gray-600 p-3 text-center">R$ 310.000</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="text-center">
                                <Button onClick={downloadCSV} className="bg-green-600 hover:bg-green-700 text-white mr-4">
                                    <Download className="w-4 h-4 mr-2" />
                                    Baixar Planilha CSV
                                </Button>
                                <Button onClick={downloadXLSX} className="bg-blue-600 hover:bg-blue-700 text-white">
                                    <Download className="w-4 h-4 mr-2" />
                                    Baixar Planilha XLSX
                                </Button>
                            </div>
                            <div className="mt-6 p-4 bg-gray-800/50 rounded-lg">
                                <h4 className="font-semibold mb-2">Instruções para usar na IA:</h4>
                                <p className="text-gray-300 text-sm">
                                    1. Baixe a planilha de exemplo<br/>
                                    2. Acesse uma ferramenta de IA (Manus, ChatGPT, Claude, etc.)<br/>
                                    3. Faça upload da planilha<br/>
                                    4. Use o prompt sugerido na próxima seção
                                </p>
                            </div>
                        </div>
                    </AnimatedCard>
                </section>

                {/* --- Prompt Sugerido para IA --- */}
                <section>
                    <h2 className="text-3xl font-bold text-center mb-10">Prompt Sugerido para IA</h2>
                    <AnimatedCard className="max-w-4xl mx-auto">
                        <div className="p-8">
                            <div className="bg-gray-800/70 p-6 rounded-lg mb-4 font-mono text-sm">
                                <p className="text-gray-300 leading-relaxed">
                                    "Analise esta planilha de despesas empresariais e me ajude com o seguinte:<br/><br/>
                                    1. Calcule o crescimento percentual de cada empresa entre 2022 e 2024<br/>
                                    2. Identifique qual empresa teve o maior crescimento absoluto<br/>
                                    3. Crie fórmulas para calcular a média de gastos por empresa<br/>
                                    4. Gere um gráfico de barras comparando as despesas por ano<br/>
                                    5. Forneça um resumo executivo com insights sobre as tendências<br/><br/>
                                    Por favor, retorne uma planilha com as fórmulas aplicadas e um relatório com suas análises."
                                </p>
                            </div>
                            <div className="text-center">
                                <Button onClick={copyPrompt} className="bg-purple-600 hover:bg-purple-700 text-white">
                                    <Copy className="w-4 h-4 mr-2" />
                                    Copiar Prompt
                                </Button>
                            </div>
                        </div>
                    </AnimatedCard>
                </section>

                {/* --- O que Esperar do Retorno da IA --- */}
                <section>
                    <h2 className="text-3xl font-bold text-center mb-10">O que Esperar do Retorno da IA</h2>
                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        <AnimatedCard>
                            <div className="p-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <CheckCircle className="w-6 h-6 text-green-400" />
                                    <h3 className="font-semibold">Fórmulas Ativas</h3>
                                </div>
                                <p className="text-gray-300 text-sm">Planilha com fórmulas funcionais para cálculos automáticos de crescimento, médias e totais.</p>
                            </div>
                        </AnimatedCard>
                        <AnimatedCard>
                            <div className="p-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <TrendingUp className="w-6 h-6 text-blue-400" />
                                    <h3 className="font-semibold">Gráficos Claros</h3>
                                </div>
                                <p className="text-gray-300 text-sm">Visualizações profissionais que facilitam a interpretação dos dados e tendências.</p>
                            </div>
                        </AnimatedCard>
                        <AnimatedCard>
                            <div className="p-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <FileSpreadsheet className="w-6 h-6 text-yellow-400" />
                                    <h3 className="font-semibold">Resumo Útil</h3>
                                </div>
                                <p className="text-gray-300 text-sm">Relatório executivo com análises e interpretações dos dados processados.</p>
                            </div>
                        </AnimatedCard>
                        <AnimatedCard>
                            <div className="p-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <Lightbulb className="w-6 h-6 text-orange-400" />
                                    <h3 className="font-semibold">Insights Automáticos</h3>
                                </div>
                                <p className="text-gray-300 text-sm">Descobertas e padrões identificados automaticamente pela IA para discussão em aula.</p>
                            </div>
                        </AnimatedCard>
                    </div>
                </section>

                {/* --- Benefícios --- */}
                     <section>
                        <h2 className="text-3xl font-bold text-center mb-10">Benefícios da Abordagem</h2>
                        <div className="max-w-4xl mx-auto space-y-4">
                            {beneficiosAbordagem.map((ben, i) => (
                                <AccordionItem key={i} title={ben.title} icon={TrendingUp}>
                                    <p>{ben.content}</p>
                                </AccordionItem>
                            ))}
                        </div>
                    </section>

                {/* --- Gráfico --- */}
                <section>
                    <h2 className="text-3xl font-bold text-center mb-10">Impacto Esperado na Aprendizagem</h2>
                    <AnimatedCard className="max-w-4xl mx-auto">
                        <div className="p-8 h-96">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                                    <XAxis dataKey="name" stroke="#a0aec0" />
                                    <YAxis stroke="#a0aec0" unit="%" />
                                    <RechartsTooltip contentStyle={{ backgroundColor: '#2d3748', border: '1px solid #4a5568', borderRadius: '8px' }} />
                                    <Legend />
                                    <Bar dataKey="Confiança" fill="#60a5fa" />
                                    <Bar dataKey="Habilidade" fill="#34d399" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </AnimatedCard>
                </section>

                {/* --- Conclusão --- */}
                <section className="text-center">
                    <AnimatedCard className="max-w-4xl mx-auto">
                        <div className="p-8 md:p-12">
                            <div className="flex justify-center mb-6">
                                <CheckCircle className="w-16 h-16 text-green-400" />
                            </div>
                            <h2 className="text-3xl font-bold mb-4">Transforme o Ensino de Planilhas</h2>
                            <p className="text-gray-300 text-lg mb-6">
                                Esta abordagem pedagógica com IA não apenas facilita o aprendizado de planilhas, mas também prepara os alunos para os desafios do mercado de trabalho moderno, focando em análise crítica e interpretação de dados.
                            </p>
<a href={manualProfessorPDF} target="_blank" rel="noopener noreferrer">
	                                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-lg">
	                                    Baixar Manual do Professor
	                                </Button>
	                            </a>
                        </div>
                    </AnimatedCard>
                </section>
            </main>

           {/* --- Rodapé --- */}
<footer className="bg-gray-900/50 text-gray-400 text-center py-8 px-4 border-t border-gray-700">
                <div className="container mx-auto">
                    <p className="mb-2">Acadêmicos: Ana Carolina Barichello, Anna Caroline R. da Luz, Lucas José G. da Silva e Adriana S. Pereira.</p>
                    <p className="mb-2">Orientação: Profª. Dra. Rosangela Ferreira Prestes e Prof. Dr. João Carlos Krause.</p>
                    <p>Programa Amanhã</p>
                </div>
            </footer>
        </div>
    );
}


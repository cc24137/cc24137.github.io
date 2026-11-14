import React, { useEffect, useState } from 'react';
import './App.css';

// simulation
import SaltMountain from './SaltMountain';

// images
import hachiware from './assets/hachiwarePortfolio.png';
import chiikawaFriends from './assets/chiikawaFriends.png';
import ado from './assets/adoPortfolio.png';
import splatoonPattern from './assets/splatoonPattern.jpg';
import splatoonBanner from './assets/s3Banner.png';
import pibicFoto from './assets/pibicFoto.jpg'
import obiFoto from './assets/obiFoto.jpg'
import oniaFoto from './assets/oniaFoto.jpg'
import cotucaFoto from './assets/cotucaFoto.jpg'

const devicon = (path) =>
    `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${path}`;


const criarCapaProjeto = (sigla, legenda, corTema) => {
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="640" viewBox="0 0 1200 640">
            <defs>
                <linearGradient id="fundo" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#172036" />
                    <stop offset="100%" stop-color="#0c1326" />
                </linearGradient>
                <radialGradient id="brilho">
                    <stop offset="0%" stop-color="${corTema}" stop-opacity=".35" />
                    <stop offset="100%" stop-color="${corTema}" stop-opacity="0" />
                </radialGradient>
            </defs>
            <rect width="1200" height="640" fill="url(#fundo)" />
            <circle cx="945" cy="280" r="420" fill="url(#brilho)" />
            <g stroke="${corTema}" stroke-width="3" stroke-opacity=".35" fill="none">
                <path d="M680 410 L770 290 L855 346 L957 205 L1050 277" />
                <path d="M690 510 L800 455 L917 495 L1080 382" />
                <circle cx="770" cy="290" r="12" />
                <circle cx="855" cy="346" r="12" />
                <circle cx="957" cy="205" r="12" />
                <circle cx="917" cy="495" r="12" />
            </g>
            <rect x="76" y="95" width="70" height="7" rx="3" fill="${corTema}" />
            <text x="76" y="335" font-family="Arial, sans-serif" font-size="102"
                  font-weight="800" fill="#f8fafc">${sigla}</text>
            <text x="81" y="397" font-family="Arial, sans-serif" font-size="28"
                  letter-spacing="3" fill="${corTema}">${legenda}</text>
        </svg>`;

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

function App() {

    const [simulacaoAtiva, setSimulacaoAtiva] = useState(() => {
        const preferenciaSalva = localStorage.getItem('simulacao-sal');

        if (preferenciaSalva === null) {
            return true;
        }

        return preferenciaSalva === 'true';
    });

    useEffect(() => {
        localStorage.setItem('simulacao-sal', simulacaoAtiva);
    }, [simulacaoAtiva]);

    const [categoriaAtiva, setCategoriaAtiva] = useState('frontend');
    const [projetoAngular, setProjetoAngular] = useState(0);

    useEffect(() => {
        const animatedElements = document.querySelectorAll('[data-reveal]');
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            animatedElements.forEach((element) => element.classList.add('is-visible'));
            return undefined;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    entry.target.classList.toggle('is-visible', entry.isIntersecting);
                });
            },
            {
                threshold: 0.18,
                rootMargin: '0px 0px -8% 0px',
            }
        );

        animatedElements.forEach((element) => observer.observe(element));

        return () => observer.disconnect();
    }, []);

    const habilidadesData = {
        frontend: [
            { nome: 'React', icone: devicon('react/react-original.svg') },
            { nome: 'HTML5', icone: devicon('html5/html5-original.svg') },
            { nome: 'CSS3', icone: devicon('css3/css3-original.svg') },
            { nome: 'Flutter', icone: devicon('flutter/flutter-original.svg') },
            { nome: 'Android', icone: devicon('android/android-original.svg') },
            { nome: 'iOS', icone: devicon('apple/apple-original.svg'), invert: true },
        ],
        backend: [
            { nome: 'Node.js', icone: devicon('nodejs/nodejs-original.svg') },
            { nome: 'Express.js', icone: devicon('express/express-original.svg'), invert: true },
            { nome: 'ASP.NET Core', icone: devicon('dotnetcore/dotnetcore-original.svg') },
            { nome: 'Spring Boot', icone: devicon('spring/spring-original.svg') },
            { nome: 'JPA', icone: devicon('hibernate/hibernate-original.svg') },
            { nome: 'Jest', icone: devicon('jest/jest-plain.svg') },
        ],
        linguagens: [
            { nome: 'Python', icone: devicon('python/python-original.svg') },
            { nome: 'Java', icone: devicon('java/java-original.svg') },
            { nome: 'C#', icone: devicon('csharp/csharp-original.svg') },
            { nome: 'C', icone: devicon('c/c-original.svg') },
            { nome: 'C++', icone: devicon('cplusplus/cplusplus-original.svg') },
            { nome: 'JavaScript', icone: devicon('javascript/javascript-original.svg') },
            { nome: 'TypeScript', icone: devicon('typescript/typescript-original.svg') },
            { nome: 'Kotlin', icone: devicon('kotlin/kotlin-original.svg') },
            { nome: 'Swift', icone: devicon('swift/swift-original.svg') },
            { nome: 'Dart', icone: devicon('dart/dart-original.svg') },
        ],
        bancos: [
            { nome: 'SQL Server', icone: devicon('microsoftsqlserver/microsoftsqlserver-original.svg') },
            { nome: 'MySQL', icone: devicon('mysql/mysql-original.svg') },
            { nome: 'MongoDB', icone: devicon('mongodb/mongodb-original.svg') },
        ],
        apiIot: [
            { nome: 'REST API', fallback: 'API' },
            { nome: 'MQTT', fallback: 'MQTT' },
            { nome: 'Arduino', icone: devicon('arduino/arduino-original.svg') },
            { nome: 'ESP32', fallback: 'ESP' },
        ],
        cloud: [
            { nome: 'AWS', icone: devicon('amazonwebservices/amazonwebservices-plain-wordmark.svg') },
            { nome: 'Kubernetes', icone: devicon('kubernetes/kubernetes-original.svg') },
            { nome: 'Terraform', icone: devicon('terraform/terraform-original.svg') },
        ],
        versionamento: [
            { nome: 'Git', icone: devicon('git/git-original.svg') },
            { nome: 'GitHub', icone: devicon('github/github-original.svg'), invert: true },
        ],
        design: [
            { nome: 'Figma', icone: devicon('figma/figma-original.svg') },
        ],
        ferramentas: [
            { nome: 'VS Code', icone: devicon('vscode/vscode-original.svg') },
            { nome: 'Visual Studio 2022', icone: devicon('visualstudio/visualstudio-original.svg') },
            { nome: 'IntelliJ IDEA', icone: devicon('intellij/intellij-original.svg') },
            { nome: 'Android Studio', icone: devicon('androidstudio/androidstudio-original.svg') },
            { nome: 'Xcode', icone: devicon('xcode/xcode-original.svg') },
            { nome: 'Unity', icone: devicon('unity/unity-original.svg'), invert: true },
            { nome: 'Godot', icone: devicon('godot/godot-original.svg') },
            { nome: 'Zed', fallback: 'Z' },
            { nome: 'Arduino IDE', icone: devicon('arduino/arduino-original.svg') },
            { nome: 'SSMS', fallback: 'SQL' },
            { nome: 'DBeaver', fallback: 'DB' },
            { nome: 'Insomnia', icone: devicon('insomnia/insomnia-original.svg') },
            { nome: 'Supabase', icone: devicon('supabase/supabase-original.svg') },
        ],
    };

    const categorias = [
        { id: 'frontend', nome: 'Front-end' },
        { id: 'backend', nome: 'Back-end' },
        { id: 'linguagens', nome: 'Linguagens' },
        { id: 'bancos', nome: 'Bancos de Dados' },
        { id: 'apiIot', nome: 'APIs e IoT' },
        { id: 'cloud', nome: 'Cloud e DevOps' },
        { id: 'versionamento', nome: 'Versionamento' },
        { id: 'design', nome: 'Design' },
        { id: 'ferramentas', nome: 'Ferramentas e IDEs' },
    ];

    const projetosData = [
        {
            id: 1,
            titulo: 'FOCA',
            codigo: 'PRJ.01',
            categoria: 'IA / VISÃO COMPUTACIONAL',
            descricao:
                'Plataforma de IA que utiliza análise de imagens para estimar o engajamento de estudantes em sala de aula e gerar feedbacks aos professores. Atuei no treinamento e na integração dos modelos de detecção facial, além do gerenciamento de APIs e bancos de dados SQL.',
            corTema: '#5cc8ff',
            tags: ['React', 'Node.js', 'Python', 'SQL', 'Visão Computacional'],
            imagem: 'https://opengraph.githubassets.com/1/cc24137/FOCA',
            linkLive: null,
            linkGithub: 'https://github.com/cc24137/FOCA',
        },
        {
            id: 2,
            titulo: 'Detecção de Fraudes Transacionais',
            codigo: 'PRJ.02',
            categoria: 'IA / MACHINE LEARNING',
            descricao:
                'Projeto de aprendizado de máquina voltado à identificação de transações fraudulentas. Inclui tratamento de dados, engenharia de atributos, experimentação e treinamento de modelos supervisionados, avaliação por métricas de lucro e integração do modelo a uma API.',
            corTema: '#f9a66c',
            tags: ['Python', 'Scikit-learn', 'FastAPI', 'SQL', 'Machine Learning'],
            imagem: criarCapaProjeto('FRAUD', 'TRANSACTION DETECTION', '#f9a66c'),
            linkLive: null,
            linkGithub: null, // Não informado no currículo.
        },
        {
            id: 3,
            titulo: 'Caixeiro Viajante com Coleta e Entrega',
            codigo: 'PRJ.03',
            categoria: 'OTIMIZAÇÃO / METAHEURÍSTICAS',
            descricao:
                'Estudo do Problema do Caixeiro Viajante com restrições de coleta e entrega (PDTSP). Modelei o problema em Python, implementei as metaheurísticas Iterated Local Search (ILS) e Biased Random-Key Genetic Algorithm (BRKGA) e comparei seus resultados com gráficos Time-to-Target.',
            corTema: '#a78bfa',
            tags: ['Python', 'ILS', 'BRKGA', 'Otimização', 'Time-to-Target'],
            imagem: criarCapaProjeto('PDTSP', 'COMBINATORIAL OPTIMIZATION', '#a78bfa'),
            linkLive: null,
            linkGithub: null, // Não informado no currículo.
        },
        {
            id: 4,
            titulo: 'Sistema de Medição de Velocidade IoT',
            codigo: 'PRJ.04',
            categoria: 'IOT / SISTEMAS EMBARCADOS',
            descricao:
                'Aplicação web integrada a um ESP32 e a um sensor infravermelho para medir a velocidade de um carrinho. Utiliza uma API REST assíncrona em MicroPython com Microdot para comunicar e exibir os resultados, unindo hardware e interface web.',
            corTema: '#35d0ba',
            tags: ['ESP32', 'MicroPython', 'Microdot', 'REST API', 'JavaScript', 'HTML', 'CSS'],
            imagem: 'https://opengraph.githubassets.com/1/cc24137/ProjetoHotWheelsESP32',
            linkLive: null,
            linkGithub: 'https://github.com/cc24137/ProjetoHotWheelsESP32',
        },
        {
            id: 5,
            titulo: 'Meownagement',
            codigo: 'PRJ.05',
            categoria: 'MOBILE / FINTECH',
            descricao:
                'Aplicativo mobile gamificado para gestão de finanças pessoais, combinando controle de despesas com recompensas e colecionáveis digitais. Trabalhei na modelagem do banco de dados, no desenvolvimento de telas em Flutter e na integração de APIs REST com o backend em C#.',
            corTema: '#ff8bbd',
            tags: ['Flutter', 'Dart', 'C#', '.NET Core', 'REST API', 'SQL'],
            imagem: 'https://opengraph.githubassets.com/1/cc24139/Meownagement',
            linkLive: null,
            linkGithub: 'https://github.com/cc24139/Meownagement',
        },
    ];

    const eventosData = [
        {
            tag: 'Pesquisa',
            titulo: 'PIBIC-EM / CNPq',
            descricao:
                'Pesquisa em Machine Learning para predição de evasão escolar, apresentada no XXXIII Congresso de Iniciação Científica da UNICAMP e na Mostra de Projetos do COTUCA.',
            imagem: pibicFoto,
        },
        {
            tag: 'Olimpíada',
            titulo: 'ONIA 2025 — Ouro Nacional',
            descricao:
                'Medalha de ouro nacional na Olimpíada Nacional de Inteligência Artificial.',
            imagem: oniaFoto,
        },
        {
            tag: 'Olimpíada',
            titulo: 'OBI 2024 — Menção Honrosa',
            descricao:
                'Menção honrosa na Olimpíada Brasileira de Informática, reforçando minha base em lógica e resolução de problemas.',
            imagem: obiFoto,
        },
        {
            tag: 'Exposição',
            titulo: 'COTUCA Aberto 2024–2026',
            descricao:
                'Atuação como voluntário e expositor de projetos, apresentando sistemas embarcados, desenvolvimento de jogos e conceitos de software aos visitantes.',
            imagem: cotucaFoto,
        },
    ];

    return (
        <div className="portfolio-container">
            <section className="hero-section">
                <div className="hero-content">
                    <div className="hero-text" data-reveal="left">
                        <p className="greeting">Olá, eu sou</p>
                        <h1 className="name">Júlio Pacheco Stein</h1>
                        <h2 className="subtitle">Engenharia de Software Full-Stack • IA e Machine Learning</h2>

                        <p className="description">
                            Estudante de Informática no COTUCA (UNICAMP), com experiência em desenvolvimento
                            full-stack, inteligência artificial, visão computacional e sistemas embarcados.
                        </p>

                        <div className="button-group">
                            <a
                              href="/JulioSteinCurriculo.pdf"
                              download
                              className="btn-primary hero-button"
                            >
                              Baixar Currículo
                            </a>
                            <a className="btn-secondary hero-button" href="https://github.com/cc24137">
                                Github
                            </a>
                            <a className="btn-secondary hero-button" href="https://www.linkedin.com/in/juliopstein/">
                                LinkedIn
                            </a>
                        </div>
                    </div>

                    <div className="hero-image-container" data-reveal="right" style={{ '--reveal-delay': '120ms' }}>
                        <img src={ado} alt="Ilustração de apresentação" className="hero-image" />
                    </div>
                </div>
            </section>

            <section className="about-section">
                <div className="about-simulation-background" aria-hidden="true">
                    {simulacaoAtiva && <SaltMountain />}
                </div>

                <div className="about-background-shade" aria-hidden="true" />

                <button
                    className={`simulation-toggle ${simulacaoAtiva ? 'active' : ''}`}
                    type="button"
                    onClick={() => setSimulacaoAtiva((estadoAtual) => !estadoAtual)}
                    aria-pressed={simulacaoAtiva}
                    aria-label={
                        simulacaoAtiva
                            ? 'Desligar simulação'
                            : 'Ligar simulação'
                    }
                >
                    <span className="simulation-toggle-label">
                        Simulação
                    </span>

                    <span className="simulation-switch">
                        <span className="simulation-switch-circle" />
                    </span>
                </button>

                <div className="about-content">
                    <div className="about-text-side" data-reveal="left">
                        <h2 className="section-title">Sobre Mim</h2>

                        <div className="quote-container">
                            <blockquote className="concept-quote">
                                "Like tiny grains of salt gathering to form the sea<br />
                                Build mountains through repentant enlightenment<br />
                                Building a mountain of salt is perhaps the fastest way to reach the heavens"
                            </blockquote>
                        </div>

                        <p className="about-description">
                            Assim como o <i>Phenomena Extinguishing Mantra</i>, em{' '}
                            <i>Regressor&apos;s Tale Of Cultivation</i>, descreve a jornada da cultivação,
                            enxergo minha trajetória profissional como o acúmulo de pequenos grãos. Cada erro
                            superado, cada linha de código aprendida e cada projeto concluído se empilham,
                            formando a montanha da minha vida e formação.
                        </p>

                        <p className="about-description">
                            Sou movido pela curiosidade e pelo desejo de aprofundar meus conhecimentos em
                            back-end, infraestrutura de software, inteligência artificial e machine learning,
                            sempre buscando transformar aprendizado em soluções para problemas reais.
                        </p>
                    </div>

                    <div className="about-nav-side" data-reveal="right" style={{ '--reveal-delay': '100ms' }}>
                        <div className="nav-container">
                            <p className="nav-kicker">EXPLORE</p>
                            <p className="nav-title">Navegar pelo portfólio</p>

                            <div className="section-links">
                                <a href="#eventos" className="btn-link">Eventos</a>
                                <a href="#habilidades" className="btn-link">Habilidades</a>
                                <a href="#projetos" className="btn-link">Projetos</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="eventos" className="eventos-section">
                <h2 className="eventos-title" data-reveal="up">Eventos e Competições</h2>

                <div className="eventos-grid">
                    {eventosData.map((evento, index) => (
                        <article
                            className="evento-card"
                            key={evento.titulo}
                            data-reveal="up"
                            style={{ '--reveal-delay': `${index * 90}ms` }}
                        >
                            <img src={evento.imagem} alt="" className="evento-img" />
                            <div
                                className="evento-content"
                                style={{ backgroundImage: `url(${splatoonPattern})` }}
                            >
                                <div className="evento-content-overlay">
                                    <span className="evento-tag">{evento.tag}</span>
                                    <h3 className="evento-card-title">{evento.titulo}</h3>
                                    <p className="evento-desc">{evento.descricao}</p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section id="habilidades" className="skills-section">
                <h2 className="skills-title" data-reveal="up">Habilidades e Tecnologias</h2>
                <p className="skills-subtitle" data-reveal="up" style={{ '--reveal-delay': '80ms' }}>
                    Tecnologias e ferramentas que utilizo em desenvolvimento, estudos e projetos.
                </p>

                <div className="skills-container">
                    <div className="skills-categories" aria-label="Categorias de habilidades" data-reveal="left">
                        {categorias.map((cat) => (
                            <button
                                key={cat.id}
                                className={`category-btn ${categoriaAtiva === cat.id ? 'active' : ''}`}
                                onClick={() => setCategoriaAtiva(cat.id)}
                                style={{ backgroundImage: `url(${splatoonBanner})` }}
                                type="button"
                            >
                                <div className="category-btn-overlay">
                                    <span>{cat.nome}</span>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div
                        className="skills-display"
                        data-reveal="right"
                        style={{ '--reveal-delay': '100ms' }}
                    >
                        {habilidadesData[categoriaAtiva].map((skill) => (
                            <div key={skill.nome} className="skill-card">
                                {skill.icone ? (
                                    <img
                                        src={skill.icone}
                                        alt=""
                                        className={`skill-icon ${skill.invert ? 'skill-icon-invert' : ''}`}
                                    />
                                ) : (
                                    <span className="skill-icon-fallback" aria-hidden="true">
                                        {skill.fallback}
                                    </span>
                                )}
                                <span className="skill-name">{skill.nome}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="projetos" className="angular-section">
                <div className="projects-heading" data-reveal="up">
                    <h2 className="angular-main-title">Projetos e Trabalhos</h2>
                    <p className="projects-intro">
                        Uma seleção de projetos que representam minhas principais áreas de interesse e atuação.
                    </p>
                </div>

                <div className="angular-container">
                    <div className="angular-menu" data-reveal="left">
                        {projetosData.map((proj, idx) => {
                            const isSelected = projetoAngular === idx;
                            return (
                                <button
                                    key={proj.id}
                                    className={`angular-item ${isSelected ? 'active' : ''}`}
                                    style={{ '--accent-color': proj.corTema }}
                                    onClick={() => setProjetoAngular(idx)}
                                    type="button"
                                >
                                    <span className="item-code"></span>
                                    <span className="item-title">{proj.titulo}</span>
                                    <span className="item-arrow">→</span>
                                </button>
                            );
                        })}
                    </div>

                    <div
                        className="angular-display"
                        data-reveal="right"
                        style={{
                            '--active-accent': projetosData[projetoAngular].corTema,
                            '--reveal-delay': '100ms',
                        }}
                    >
                        <div className="display-image-wrapper">
                            <img
                                src={projetosData[projetoAngular].imagem}
                                alt={`Preview do projeto ${projetosData[projetoAngular].titulo}`}
                            />
                            <div className="display-overlay-badge">
                                {projetosData[projetoAngular].categoria}
                            </div>
                        </div>

                        <div className="display-content">
                            <h3 className="display-title">{projetosData[projetoAngular].titulo}</h3>
                            <p className="display-desc">{projetosData[projetoAngular].descricao}</p>

                            <div className="display-tags">
                                {projetosData[projetoAngular].tags.map((tag) => (
                                    <span key={tag} className="angular-tag">{tag}</span>
                                ))}
                            </div>

                            {(projetosData[projetoAngular].linkLive ||
                                projetosData[projetoAngular].linkGithub) && (
                                <div className="display-actions">
                                    {projetosData[projetoAngular].linkLive && (
                                        <a
                                            href={projetosData[projetoAngular].linkLive}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="angular-btn btn-action"
                                        >
                                            ACESSAR PROJETO
                                        </a>
                                    )}
                                    {projetosData[projetoAngular].linkGithub && (
                                        <a
                                            href={projetosData[projetoAngular].linkGithub}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="angular-btn btn-outline"
                                        >
                                            REPOSITÓRIO
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default App;

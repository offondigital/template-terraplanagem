// script.min.js - JavaScript otimizado e minificado

document.addEventListener('DOMContentLoaded',()=>{
    // Menu mobile
    const t=document.getElementById('menuToggle'),m=document.getElementById('mobileMenu'),h=document.getElementById('header');
    if(t&&m){
        t.addEventListener('click',e=>{
            e.stopPropagation();
            t.classList.toggle('active');
            m.classList.toggle('active');
            document.body.style.overflow=m.classList.contains('active')?'hidden':'';
        });
        m.querySelectorAll('a').forEach(l=>{
            l.addEventListener('click',()=>{
                t.classList.remove('active');
                m.classList.remove('active');
                document.body.style.overflow='';
            });
        });
        document.addEventListener('click',e=>{
            if(!h.contains(e.target)&&m.classList.contains('active')){
                t.classList.remove('active');
                m.classList.remove('active');
                document.body.style.overflow='';
            }
        });
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
        a.addEventListener('click',function(e){
            e.preventDefault();
            const target=document.querySelector(this.getAttribute('href'));
            if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
        });
    });

    // Header scroll
    window.addEventListener('scroll',()=>{
        h.style.background=window.scrollY>50?'rgba(255,255,255,0.98)':'white';
        h.style.backdropFilter=window.scrollY>50?'blur(10px)':'none';
    });

    // Carregar serviços dinamicamente (lazy loading)
    const loadServices=()=>{
        const grid=document.getElementById('servicesGrid');
        if(!grid) return;
        
        const services=[
            {icon:'tree',title:'Destacamento de Eucalipto',desc:'Remoção profissional de eucaliptos com maquinário especializado.',img:'destacamento-eucalipto.webp'},
            {icon:'mountain',title:'Curva de Níveis',desc:'Implementação de curvas de nível para conservação do solo.',img:'curva-niveis.webp'},
            {icon:'water',title:'Abertura de Açudes',desc:'Construção de reservatórios de água para irrigação.',img:'abertura-acudes.webp'},
            {icon:'road',title:'Estradas Rurais',desc:'Abertura e manutenção de estradas vicinais.',img:'estradas-rurais.webp'},
            {icon:'piggy-bank',title:'Aviário e Chiqueirão',desc:'Preparo de terreno para construções.',img:'aviario-chiqueirao.webp'},
            {icon:'hard-hat',title:'Serviços Complementares',desc:'Aterramento, nivelamento e perfuração.',img:'servicos-complementares.webp'}
        ];

        grid.innerHTML=services.map(s=>`
            <div class="service-card">
                <div class="service-icon"><i class="fas fa-${s.icon}"></i></div>
                <div class="service-image">
                    <img class="lazy" data-src="https://raw.githubusercontent.com/offondigital/terraplanagem-imagens/main/${s.img}" alt="${s.title}" width="400" height="225" loading="lazy">
                </div>
                <h3>${s.title}</h3>
                <p>${s.desc}</p>
                <a href="https://wa.me/555496968164?text=Olá!%20Orçamento%20${encodeURIComponent(s.title)}" class="btn btn-primary" target="_blank"><i class="fab fa-whatsapp"></i> Orçamento</a>
            </div>
        `).join('');

        // Lazy load images
        const observer=new IntersectionObserver(entries=>{
            entries.forEach(e=>{
                if(e.isIntersecting){
                    const img=e.target;
                    img.src=img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        },{rootMargin:'50px'});

        document.querySelectorAll('.lazy').forEach(img=>observer.observe(img));
    };

    // Carregar serviços apenas quando a seção estiver visível
    const servicesSection=document.getElementById('servicos');
    if(servicesSection){
        const observer=new IntersectionObserver(entries=>{
            entries.forEach(e=>{
                if(e.isIntersecting){
                    loadServices();
                    observer.unobserve(servicesSection);
                }
            });
        },{threshold:0.1});
        observer.observe(servicesSection);
    }

    // Resize handler
    window.addEventListener('resize',()=>{
        if(window.innerWidth>768&&m?.classList.contains('active')){
            t?.classList.remove('active');
            m?.classList.remove('active');
            document.body.style.overflow='';
        }
    });
});

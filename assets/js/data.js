/* ============================================
   SITE DATA — edit content here only
   ============================================ */
   const AUTOPLAY_MS = 3500;
   const RESUME_AFTER_CLICK_MS = 8000;
   const PAUSE_ON_HOVER = false;
   
   const imgs = (name, labels) => labels.map((label, i) => ({
     src: `assets/img/projects/${name}/${name}-${i + 1}.png`,
     label
   }));
   
   const GITHUB_BASE = 'https://github.com/3mmar3bdalkber';
   
   const PROJECTS = [
    {
      id: 1,
      title: 'Global Asthma Burden Analysis',
      cats: ['bi', 'ml'],
      catName: 'Data Warehouse · BI · ML',
      date: 'Jul 2026',
      short: 'Integrated 300K+ records across 204 countries and 34 years (1990–2023) into a SQL Server warehouse, with 16 dashboards and a bilingual AI chatbot.',
      full: 'An end-to-end healthcare analytics platform: a centralized SQL Server data warehouse feeding Power BI, Tableau, Excel and Python dashboards, plus an AI-powered bilingual (Arabic/English) chatbot and an asthma-risk prediction model.',
      features: [
        '300K+ records, 204 countries, 34 years (1990–2023) in a centralized SQL Server data warehouse',
        'Normalized ERD, schema and stored procedures',
        '16 interactive dashboards: 7 Power BI, 7 Tableau, 2 Excel',
        '7 Python visualizations (Pandas, Matplotlib, Seaborn, Plotly) on prevalence, mortality, DALYs and incidence',
        'Bilingual chatbot answering questions about global asthma trends',
        'AsthmAI: asthma-risk prediction from patient-level data using XGBoost'
      ],
      tech: ['SQL Server', 'Power BI', 'Tableau', 'Excel', 'Python', 'XGBoost'],
      github: 'https://github.com/3mmar3bdalkber/Global-Asthma-Burden',
      images: imgs('asthma', ['Power BI Dashboard', 'Tableau Dashboard', 'Python Visuals', 'SQL Server ERD'])
    },
    {
      id: 2,
      title: 'Bank Marketing Analysis',
      cats: ['bi'],
      catName: 'Business Intelligence',
      date: 'Jun 2026',
      short: 'Interactive Excel dashboard analyzing 4,521 bank marketing contacts to predict term deposit subscriptions.',
      full: 'An interactive Excel dashboard built to understand which customers subscribe to term deposits, using DAX calculated columns and measures to surface the highest-converting segments.',
      features: [
        'Analyzed 4,521 bank marketing contacts',
        'DAX calculated columns: Age Group, Balance Category, Month sorting',
        'Key measures: Total Contacts, Subscribed, Conversion Rate',
        'Identified the top 3 customer segments with the highest conversion potential',
        'Modeled subscription rate of 11.7%'
      ],
      tech: ['Excel', 'DAX', 'Power Query', 'KPI Tracking'],
      github: 'https://github.com/3mmar3bdalkber/bank-marketing-analysis',
      images: imgs('bank', ['Excel Dashboard', 'Customer Segments'])
    }
  ];
   
   const SKILLS = [
     ['Languages', 'Python (Pandas, NumPy)|SQL|PHP|JavaScript|C++|C#|Java'],
     ['BI & Analytics', 'Microsoft Excel|Tableau|Power BI|DAX|KPI Tracking|Power Query'],
     ['Machine Learning', 'Scikit-learn|Logistic Regression|ROC-AUC Evaluation|Feature Engineering|Supervised/Unsupervised'],
     ['Databases & Tools', 'MySQL|SQL Server|Oracle|Git|GitHub|Postman|Laravel'],
     ['Concepts', 'OOP|Data Structures|Design Patterns|Data Cleaning|ETL|Reporting|Prompt Engineering'],
     ['Soft Skills', 'Teamwork|Leadership|Communication|Presentation|Analytical Thinking|Problem-Solving']
   ];
   
   const TIMELINE = [
    { 
      date: 'Jun 2026 – Sep 2026', title: 'Data Analyst', org: 'Consolidated Contractors Company (CCC) | Madinaty, New Cairo', text: 'Managed workforce data and maintained records for workers, CHs, supervisors, and engineers. Maintained data accuracy and supported daily operational reporting using Microsoft Excel.' 
    },
    { date: 'Mar 2026 – May 2026', title: 'Data Science Intern', org: 'GCI World | Tokyo University', text: 'Python, SQL and core ML workflows; built and evaluated 8+ models with Scikit-learn (ROC-AUC, accuracy); time series analysis.' },
    { date: 'Nov 2025 – May 2026', title: 'Data Analyst Specialist', org: 'Digital Egypt Pioneers Initiative (DEPI), R4', text: '9-month Junior Data Analyst program: cleaned 7+ datasets with Power Query, built interactive dashboards, completed a capstone project.' },
    { date: 'Aug 2024 – May 2025', title: 'Web Development Trainee', org: 'ITI | Information Technology Institute', text: 'Built 2 database-driven web apps with MySQL and Laravel, improving data handling for 500+ product records.' },
    { date: 'Aug 2024 – Present', title: 'Batch (20) Leader', org: 'Faculty of Computers and Information, Minia University', text: 'Communication between students and instructors; supporting classmates with technical and study-related issues.' }
  ];
   const CERTS = [
     { icon: 'DA', title: 'Data Analytics Specialist, R4', org: 'DEPI', year: 'Jul 2026' },
     { icon: 'EN', title: 'Business English', org: 'DEPI', year: 'Jul 2026' },
     { icon: 'DS', title: 'Data Science', org: 'GCI World / Tokyo University', year: 'Aug 2026' },
     { icon: 'AI', title: 'Generative AI', org: 'CIB', year: 'Aug 2026' },
     { icon: 'FS', title: 'Full Stack Using PHP', org: 'ITI', year: 'Aug 2025' },
     { icon: 'FL', title: 'Freelancing Skills Workshop', org: 'YAT', year: 'Feb 2026' }
   ];
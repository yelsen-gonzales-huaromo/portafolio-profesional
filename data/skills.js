// Skills Data — based on Yelsen's CV
// Structure:
//   overall: overall expertise %
//   focus: short paragraph describing main professional focus
//   categories: 4 main categories (Frontend / Backend / Database / Cloud-DevOps)
//     each with: label, icon, color, level% and top 3 representative skills (each with level)
//   others: additional techs displayed in the bottom row

const skillsData = {
    overall: 88,
    focus: "Desarrollo de aplicaciones empresariales y arquitecturas escalables con .NET 9, Spring Boot y Laravel. Especializado en Cloud (AWS/Azure), bases de datos y CI/CD.",

    categories: [
        {
            key: 'frontend',
            label: 'Frontend',
            icon: 'fas fa-display',
            color: '#22d3ee',
            level: 82,
            skills: [
                { name: 'React',       level: 85, icon: 'fab fa-react',    color: '#61dafb' },
                { name: 'Angular',     level: 80, icon: 'fab fa-angular',  color: '#dd0031' },
                { name: 'Tailwind CSS',level: 88, icon: 'fab fa-css3-alt', color: '#06b6d4' }
            ]
        },
        {
            key: 'backend',
            label: 'Backend',
            icon: 'fas fa-server',
            color: '#84cc16',
            level: 92,
            skills: [
                { name: '.NET',       level: 95, icon: 'fab fa-microsoft', color: '#512bd4' },
                { name: 'Spring Boot',level: 88, icon: 'fab fa-java',      color: '#6db33f' },
                { name: 'Laravel',    level: 92, icon: 'fab fa-laravel',   color: '#ff2d20' }
            ]
        },
        {
            key: 'database',
            label: 'Bases de Datos',
            icon: 'fas fa-database',
            color: '#a855f7',
            level: 88,
            skills: [
                { name: 'SQL Server', level: 92, icon: 'fas fa-database', color: '#cc2927' },
                { name: 'PostgreSQL', level: 88, icon: 'fas fa-database', color: '#336791' },
                { name: 'MySQL',      level: 90, icon: 'fas fa-database', color: '#4479a1' }
            ]
        },
        {
            key: 'cloud',
            label: 'Cloud / DevOps',
            icon: 'fas fa-cloud',
            color: '#f59e0b',
            level: 85,
            skills: [
                { name: 'AWS',    level: 88, icon: 'fab fa-aws',    color: '#ff9900' },
                { name: 'Azure',  level: 82, icon: 'fab fa-microsoft', color: '#0078d4' },
                { name: 'Docker', level: 88, icon: 'fab fa-docker', color: '#0db7ed' }
            ]
        }
    ],

    others: [
        { name: 'TypeScript',     icon: 'fas fa-code',           color: '#3178c6' },
        { name: 'Node.js',        icon: 'fab fa-node-js',        color: '#84cc16' },
        { name: 'GitHub Actions', icon: 'fab fa-github',         color: '#ffffff' },
        { name: 'Vercel',         icon: 'fas fa-triangle-cust',  color: '#ffffff' },
        { name: 'GitFlow',        icon: 'fas fa-code-branch',    color: '#f1502f' },
        { name: 'Swagger',        icon: 'fas fa-file-code',      color: '#85ea2d' },
        { name: 'Postman',        icon: 'fas fa-paper-plane',    color: '#ff6c37' },
        { name: 'Jira',           icon: 'fab fa-jira',           color: '#0052cc' }
    ]
};

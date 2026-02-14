/* ============================================
   CONFIGURATION FILE
   Site-wide constants, colors, and settings
   ============================================ */

const CONFIG = {
    
    // ============================================
    // SITE INFORMATION
    // ============================================
    site: {
        name: 'OPTICOM LABORATORY',
        tagline: 'Excellent Laboratory',
        description: 'Optical Communication System Laboratory at Telkom University',
        university: 'Telkom University',
        location: 'TULT Building, Bandung, Indonesia'
    },

    // ============================================
    // COLOR SCHEME
    // ============================================
    colors: {
        primaryBlue: '#0000FF',
        darkBlue: '#0000CC',
        lightBlue: '#4169E1',
        textDark: '#1f2937',
        textLight: '#6b7280',
        bgLight: '#f8f9ff',
        white: '#ffffff'
    },

    // ============================================
    // SOCIAL MEDIA LINKS
    // ============================================
    social: {
        youtube: 'https://www.youtube.com/@OpticommLaboratoryTel-U/videos',
        linkedin: 'https://www.linkedin.com/company/optical-communication-laboratory/',
        line: 'https://line.me/R/ti/p/@wth3637e?from=page&liff.referrer=https%3A%2F%2Fopticomlab.com%2F&searchId=wth3637e',
        instagram: 'https://www.instagram.com/opticommlaboratory/'
    },

    // ============================================
    // CONTACT INFORMATION
    // ============================================
    contact: {
        address: 'Telkom University Landmark Tower (TULT)',
        addressLink: 'https://www.google.com/maps/place/Telkom+University+Landmark+Tower+(TULT)/@-6.969282,107.628157,16z/data=!4m6!3m5!1s0x2e68e9bc3974981d:0x613eec0feec9fcf7!8m2!3d-6.969282!4d107.628157!16s%2Fg%2F11fnh7dtf9?hl=id&entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3MUgBUAM%3D',
        phone: '08123456789',
        email: 'opticomlab@telkomuniversity.ac.id'
    },

    // ============================================
    // PAGES CONFIGURATION
    // ============================================
    pages: {
        // Main Pages
        about: {
            id: 'about-section',
            file: 'pages/about.html',
            title: 'About Us'
        },
        modules: {
            id: 'modules-section',
            file: 'pages/modules.html',
            title: 'Our Modules'
        },
        teams: {
            id: 'teams-section',
            file: 'pages/teams.html',
            title: 'Our Teams'
        },
        activities: {
            id: 'activities-section',
            file: 'pages/activities.html',
            title: 'Our Activity'
        },
        contact: {
            id: 'contact-section',
            file: 'pages/contact.html',
            title: 'Contact Us'
        },

        // Module Detail Pages
        module1: {
            id: 'module1-section',
            file: 'pages/module1.html',
            title: 'Module 1'
        },
        module2: {
            id: 'module2-section',
            file: 'pages/module2.html',
            title: 'Module 2'
        },
        module3: {
            id: 'module3-section',
            file: 'pages/module3.html',
            title: 'Module 3'
        },

        // Optical Toolbox & Calculators
        Opticaltoolbox: {
            id: 'Opticaltoolbox-section',
            file: 'pages/Opticaltoolbox.html',
            title: 'Optical Toolbox'
        },
        NACalculator: {
            id: 'NACalculator-section',
            file: 'pages/NACalculator.html',
            title: 'Numerical Aperture Calculator'
        },
        VDCalculator: {
            id: 'VDCalculator-section',
            file: 'pages/VDCalculator.html',
            title: 'V-Number & Dispersion Calculator'
        },
        UCCalculator: {
            id: 'UCCalculator-section',
            file: 'pages/UCCalculator.html',
            title: 'Unit Converter (dBm ⇌ mW)'
        },
        LPBCalculator: {
            id: 'LPBCalculator-section',
            file: 'pages/LPBCalculator.html',
            title: 'Link Power Budget Calculator'
        },

        // Academic Pages
        tugaspendahuluan: {
            id: 'tugaspendahuluan-section',
            file: 'pages/tugaspendahuluan.html',
            title: 'Tugas Pendahuluan'
        },
        komplain: {
            id: 'komplain-section',
            file: 'pages/komplain-nilai.html',
            title: 'Komplain Nilai'
        },
        videopembelajaran: {
            id: 'videopembelajaran-section',
            file: 'pages/Videopembelajaran.html',
            title: 'Video Pembelajaran'
        },
        jadwal: {
            id: 'jadwal-section',
            file: 'pages/jadwal.html',
            title: 'Jadwal Praktikum'
        },
        tatatertib: {
            id: 'tatatertib-section',
            file: 'pages/tata tertib.html',
            title: 'Tata Tertib Praktikum'
        }
    },

    // ============================================
    // COMPONENTS CONFIGURATION
    // ============================================
    components: {
        loader: {
            id: 'loader-container',
            file: 'components/loader.html'
        },
        header: {
            id: 'header-container',
            file: 'components/header.html'
        },
        footer: {
            id: 'footer-container',
            file: 'components/footer.html'
        }
    },

    // ============================================
    // ANIMATION SETTINGS
    // ============================================
    animation: {
        pageTransitionDuration: 300, // milliseconds
        loaderDuration: 1000, // milliseconds
        scrollDuration: 400 // milliseconds
    },

    // ============================================
    // MODULE VIDEOS
    // ============================================
    videos: {
        module1: 'https://www.youtube.com/watch?v=HY9podlmS1s&t=1s',
        module2: 'https://www.youtube.com/watch?v=zKu5Sm9NfuI',
        module3: 'https://www.youtube.com/watch?v=YSRyOwXrXOc&t=1s'
    },

    // ============================================
    // TEAM MEMBERS DATA
    // ============================================
    team: {
        // Praktikum Team
        praktikum: [
            { name: 'Dean Syhallah', role: 'Asisten', photo: 'Fotodean.jpg', instagram: 'https://www.instagram.com/deandesannn/' },
            { name: 'Nurmayzarah', role: 'Asisten', photo: 'sa.png', instagram: 'https://www.instagram.com/myzarahh/' },
            { name: 'Chandra Daulay', role: 'Asisten', photo: 'candra.png', instagram: 'https://www.instagram.com/chandra_dly/' },
            { name: 'Faiza Murni', role: 'Asisten', photo: 'Faiza.png', instagram: 'https://www.instagram.com/c.estzaa/' },
            { name: 'Bhama Aryo', role: 'Asisten', photo: 'binturong.jpg', instagram: 'https://www.instagram.com/bhama_aryo/' },
            { name: 'Vania Khalishah A', role: 'Asisten', photo: 'capibara.jpg', instagram: 'https://www.instagram.com/vaniakhalis/' },
            { name: 'Josephine Monica', role: 'Asisten', photo: 'binturong.jpg', instagram: 'https://www.instagram.com/josephinemncaa/' },
            { name: 'Mhd Arafa', role: 'Asisten', photo: 'Rapa.jpg', instagram: 'https://www.instagram.com/rfandk/' },
            { name: 'Yassar Ahmad Alif', role: 'Asisten', photo: 'Lipp.jpg', instagram: 'https://www.instagram.com/ycxhx__/' }
        ],

        // Research Team
        research: [
            { name: 'Rayhan Hafizan', role: 'Asisten', photo: 'Rayhanfoto.jpg', instagram: 'https://www.instagram.com/hannzz_zn/' },
            { name: 'AGUS', role: 'Asisten', photo: 'Riskags.jpg', instagram: 'https://www.instagram.com/_rrjrubyjane/' },
            { name: 'Devin K', role: 'Asisten', photo: 'Devin.jpg', instagram: null }
        ]
    },

    // ============================================
    // RECRUITMENT STATUS
    // ============================================
    recruitment: {
        status: 'EXPIRED', // 'OPEN' or 'EXPIRED'
        message: '⚠️ Open Recruitment\n\nStatus: EXPIRED\n\nThe recruitment period has ended. Please stay tuned for the next recruitment announcement!'
    }
};

// ============================================
// EXPORT CONFIGURATION
// ============================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;

}

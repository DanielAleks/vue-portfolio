    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #0a0a0a;
            color: #ffffff;
            overflow-x: hidden;
            line-height: 1.6;
        }

        .background-animation {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            background: linear-gradient(135deg, #2c8878ff 0%, #635DFE 25%, #0B87F6 50%, #42ffc3ff 75%, #4facfe 100%);
            background-size: 400% 400%;
            animation: gradientShift 15s ease infinite;
        }

        .background-animation::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
                        radial-gradient(circle at 40% 40%, rgba(120, 200, 255, 0.2) 0%, transparent 50%);
            animation: float 20s ease-in-out infinite;
        }

        .background-animation::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
        }

        @keyframes gradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }

        @keyframes float {
            0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
            33% { transform: translate(30px, -30px) rotate(120deg); }
            66% { transform: translate(-20px, 20px) rotate(240deg); }
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
            position: relative;
            z-index: 1;
        }

        header {
            padding: 2rem 0;
            position: relative;
        }

        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            backdrop-filter: blur(20px);
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 20px;
            padding: 1rem 2rem;
            transition: all 0.3s ease;
        }

        nav:hover {
            background: rgba(255, 255, 255, 0.15);
            transform: translateY(-2px);
        }

        .logo {
            font-size: 1.8rem;
            font-weight: 700;
            background: linear-gradient(45deg, #2a7af1ff, #60a5ffff, #3f62ffff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .nav-links {
            display: flex;
            gap: 2rem;
            list-style: none;
        }

        .nav-links a {
            color: rgba(255, 255, 255, 0.8);
            text-decoration: none;
            transition: all 0.3s ease;
            position: relative;
            padding: 0.5rem 1rem;
            border-radius: 10px;
        }

        .nav-links a::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
            border-radius: 10px;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .nav-links a:hover {
            color: #ffffff;
            transform: translateY(-2px);
        }

        .nav-links a:hover::before {
            opacity: 1;
        }

        .hero {
            padding: 8rem 0;
            text-align: center;
            position: relative;
        }

        .hero h1 {
            font-size: clamp(3rem, 8vw, 6rem);
            font-weight: 800;
            margin-bottom: 1rem;
            background: linear-gradient(135deg, #0033ccff 0%, #005effff 25%, #639ef8ff 50%, #1b95ffff 75%, #0230aeff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: textShine 3s ease-in-out infinite;
        }

        @keyframes textShine {
            0%, 100% { filter: brightness(1); }
            50% { filter: brightness(1.2); }
        }

        .hero .subtitle {
            font-size: clamp(1.2rem, 3vw, 2rem);
            margin-bottom: 0.5rem;
            color: rgba(255, 255, 255, 0.9);
            font-weight: 300;
        }

        .hero .description {
            font-size: 1.2rem;
            color: rgba(255, 255, 255, 0.7);
            margin-bottom: 3rem;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }

        .cta-buttons {
            display: flex;
            gap: 2rem;
            justify-content: center;
            flex-wrap: wrap;
        }

        .btn {
            padding: 1rem 2rem;
            border: none;
            border-radius: 50px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .btn-primary {
            background: linear-gradient(135deg, rgba(86, 137, 232, 1), #234abfff);
            color: white;
            box-shadow: 0 10px 30px rgba(24, 65, 250, 0.4);
        }

        .btn-secondary {
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border: 2px solid rgba(255, 255, 255, 0.3);
            backdrop-filter: blur(10px);
        }

        .btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
        }

        .btn-primary:hover {
            box-shadow: 0 15px 40px rgba(30, 70, 246, 0.6);
        }

        .experience-section {
            padding: 6rem 0;
            position: relative;
        }

        .section-title {
            text-align: center;
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 4rem;
            background: linear-gradient(135deg, #458af3ff, #789cfdff, #1070ffff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .experience-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
            margin-bottom: 4rem;
        }

        .experience-card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 2rem;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .experience-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
            transition: left 0.5s ease;
        }

        .experience-card:hover::before {
            left: 100%;
        }

        .experience-card:hover {
            transform: translateY(-10px);
            background: rgba(255, 255, 255, 0.08);
            border-color: rgba(255, 255, 255, 0.2);
        }

        .experience-card h3 {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: #4facfe;
        }

        .experience-card .company {
            color: #f093fb;
            font-weight: 500;
            margin-bottom: 1rem;
        }

        .experience-card p {
            color: rgba(255, 255, 255, 0.8);
            line-height: 1.6;
        }

        .skills-section {
            padding: 4rem 0;
            text-align: center;
        }

        .skills-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            justify-content: center;
            margin-top: 2rem;
        }

        .skill-tag {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 35px;
            padding: 0.8rem 1.5rem;
            color: rgba(255, 255, 255, 0.9);
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .skill-tag > img {
            object-fit: contain;
            height: 40px;
            width: 40px;
        }

        .skill-tag:hover {
            background: rgba(255, 255, 255, 0.15);
            transform: translateY(-2px);
            color: #ffffff;
        }

        .floating-elements {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            overflow: hidden;
        }

        .floating-element {
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            animation: float-up 15s linear infinite;
        }

        .profile-section {
            margin-bottom: 40px;
        }

        .name {
            font-size: 2.5rem;
            font-weight: 700;
            color: #2c3e50;
            margin-bottom: 10px;
            letter-spacing: -1px;
        }

        .title {
            font-size: 1.2rem;
            color: #7f8c8d;
            margin-bottom: 30px;
            font-weight: 300;
        }

        .contact-info {
            display: flex;
            flex-direction: column;
            gap: 25px;
            align-items: center;
        }

        .contact-item {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 15px 25px;
            background: rgba(102, 126, 234, 0.1);
            border-radius: 12px;
            transition: all 0.3s ease;
            width: 100%;
            max-width: 350px;
        }

        .contact-item:hover {
            background: rgba(102, 126, 234, 0.2);
            transform: scale(1.02);
        }

        .contact-icon {
            width: 24px;
            height: 24px;
            fill: #667eea;
            flex-shrink: 0;
        }

        .contact-details {
            text-align: left;
            flex: 1;
        }

        .contact-label {
            font-size: 0.91rem;
            color: #7f8c8d;
            font-weight: 500;
            margin-bottom: 2px;
        }

        .contact-value {
            font-size: 1.1rem;
            color: #2c3e50;
            font-weight: 600;
            word-wrap: break-word;
            }

        .contact-value a {
            color: #667eea;
            text-decoration: none;
            transition: color 0.3s ease;
        }

        .contact-value a:hover {
            color: #5a67d8;
        }

        .email-value {
            font-size: 1.1rem;
            color: #2c3e50;
            font-weight: 600;
            word-wrap: break-word;
        }

        .email-value a {
            color: #667eea;
            text-decoration: none;
            transition: color 0.3s ease;
        }

        .email-value a:hover {
            color: #5a67d8;
        }


        .contact-container {
            background: white;
            padding: 2rem;
            width: 50%;
            border-radius: 15px;
            margin-left: 25%;
            margin-bottom: 10rem;
        }

        .go-to-site {
            position: absolute; 
            right: 2rem; 
            top: 2rem;
        }

        .hyperlink {
            color: #9cbfffff;
            font-weight: 600;
        }
        .hyperlink:hover {
            color: #77a4f8ff;
        }
        @media (orientation: portrait) {
        .contact-container {
            background: white;
            padding: 2rem;
            width: 90%;
            border-radius: 15px;
            margin-left: 5%;
            margin-bottom: 10rem;
        }
        .email-value {
            max-width: 180px;
        }
        .go-to-site {
            position: relative;
            margin-bottom: 4rem;
            margin-left: 2rem;
        }
        }

        @media (max-width: 600px) {
            .container {
                padding: 40px 30px;
            }
            
            .name {
                font-size: 2rem;
            }
            
            .contact-item {
                padding: 12px 20px;
            }
        }

        @keyframes float-up {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }

        @media (max-width: 768px) {
            .nav-links {
                display: none;
            }
            
            .hero {
                padding: 4rem 0;
            }
            
            .cta-buttons {
                flex-direction: column;
                align-items: center;
            }
            
            .container {
                padding: 0 1rem;
            }
        }
    </style>
    <template>
    <div class="background-animation"></div>
    <div class="floating-elements" id="floatingElements"></div>
    
    <div class="container">
        <header>
            <nav>
                <div class="logo">DA - (509)-599-9171</div>
                <ul class="nav-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#experience">Experience</a></li>
                    <li><a href="#skills">Skills</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
        </header>

        <section class="hero" id="home">
            <h1>Daniel Aleksandrov</h1>
            <p class="subtitle">Front End Developer</p>
            <p class="description">
                Born and raised in Spokane, Washington after my family migrated from Ukraine. I developed a strong passion for technology early on. In Spokane, I learned to create modern, creative websites using HTML, CSS, and JavaScript. With Five years of professional experience as a Frontend Developer at a leading tech company, I am now eager to explore new opportunities, and expanding my expertise into backend development.
            </p>
            <div class="cta-buttons">
                <a href="#experience" class="btn btn-primary">View My Work</a>
                <a href="#contact" class="btn btn-secondary">Get In Touch</a>
            </div>
        </section>

        <section class="experience-section" id="experience">
            <h2 class="section-title">Professional Experience</h2>
            <div class="experience-grid">
                <div class="experience-card">
                    <h3>Web Development using Hugo</h3>
                    <div class="go-to-site"> 
                        <a href="https://aislabs.com" target="_blank" class="btn btn-primary">Go To Site</a>
                    </div>
                    <div class="company">AIS Marketing Website</div>
                    <p>Led the development and management of <a href="aislabs.com" class="hyperlink">aislabs.com</a>, redesigning the website from a blog-like site, to a more modern simplistic design that showcased AI innovations. Was responsible for having weekly Q&A's to improve and refine our marketing website and our other project: AIS Project Central.</p>
                    <!-- <q-carousel
                        swipeable
                        animated
                        v-model="slide"
                        thumbnails
                        infinite
                        autoplay
                        :vertical="isMobile ? false : true"
                        height="500px"
                        >
                        <q-carousel-slide :name="4" img-src="src/assets/images/aislabs/AboutAIS.png" />
                         <q-carousel-slide :name="2" img-src="src/assets/images/aislabs/ResourcesPage.png" />
                        <q-carousel-slide :name="3" img-src="src/assets/images/aislabs/UseCases.png" />
                        <q-carousel-slide :name="1" img-src="src/assets/images/aislabs/HomePageCropped.png" />
                    </q-carousel> -->
                </div>
            <div class="experience-card relative">
                    <h3>Frontend Vue.js with Backend-collaboration</h3>
                    <div class="go-to-site"> 
                        <a href="http://aislabs.com/about-ais/innovation/projectcentral/" target="_blank" class="btn btn-primary">Go To Site</a>
                    </div>

                    <div class="company">AIS Project Central</div>
                    <p>Built the frontend UI using Vue.js and Quasar, while collaborating with a Laravel backend developer as we integrated the GraphQL queries and CRUD mutations for Project Central. Unfortunately, this is a private resource, therefore I can only show a preview of Project Central.</p>
                   <!-- <q-carousel
                        swipeable
                        animated
                        v-model="slide"
                        thumbnails
                        infinite
                        autoplay
                        height="500px"
                        :vertical="isMobile ? false : true"
                        >
                        <q-carousel-slide :name="4" img-src="https://awsdaleksandrovstorage.s3.us-east-2.amazonaws.com/AboutAIS.png" />
                         <q-carousel-slide :name="2" img-src="src/assets/images/project-central/light/AdminImplementationOpen.png" />
                        <q-carousel-slide :name="3" img-src="src/assets/images/project-central/light/CreateAdminGuideline.png" />
                        <q-carousel-slide :name="1" img-src="src/assets/images/project-central/light/SowBuilderView.png" />
                    </q-carousel> -->
                </div>
                </div>
        </section>

        <section class="skills-section" id="skills">
            <div>
                <h2 class="section-title">Professional IT Skills</h2>
                <p>Technologies and tools I used in a professional context (with my former employer: AISLabs).</p>
                <div class="skills-grid">
                    <span class="skill-tag"><img src="src/assets/images/icons/html.png" alt="HTML5" />HTML5</span>
                    <span class="skill-tag"><img src="src/assets/images/icons/css.png" alt="CSS3" />CSS3</span>
                    <span class="skill-tag"><img src="src/assets/images/icons/javaScript.png" alt="JavaScript" />JavaScript</span>
                    <span class="skill-tag"><img src="src/assets/images/icons/typeScript.png" alt="TypeScript" />TypeScript</span>
                    <span class="skill-tag"><img src="src/assets/images/icons/vue.png" alt="Vue.js" />Vue.js</span>
                    <span class="skill-tag"><img src="src/assets/images/icons/quasar.png" alt="Quasar" />Quasar</span>
                    <span class="skill-tag"><img src="src/assets/images/icons/cypress.png" alt="Cypress" />Cypress</span>
                    <span class="skill-tag"><img src="src/assets/images/icons/tailwind.png" alt="Tailwind" />Tailwind</span>
                    <span class="skill-tag"><img src="src/assets/images/icons/bootstrap.png" alt="Bootstrap" />Bootstrap</span>
                    <span class="skill-tag"><img src="src/assets/images/icons/hugo.png" alt="Hugo" />Hugo</span>
                    <span class="skill-tag"><img src="src/assets/images/icons/scss.png" alt="Scss" />Scss</span>
                    <span class="skill-tag"><img src="src/assets/images/icons/git.png" alt="Git" />Git</span>
                    <span class="skill-tag"><img src="src/assets/images/icons/aws.png" alt="AWS" />AWS</span>
                    <span class="skill-tag"><img src="src/assets/images/icons/mongodb.png" alt="MongoDB" />MongoDB</span>
                    <span class="skill-tag"><img src="src/assets/images/icons/php-logo.png" alt="PHP" />PHP</span>
                    <span class="skill-tag"><img src="src/assets/images/icons/laravel.png" alt="Laravel" />Laravel</span>
                    <span class="skill-tag"><img src="src/assets/images/icons/yarn.png" alt="NPM/Yarn" />NPM/Yarn</span>
                </div>

                <hr style="border: 1px solid rgba(255,255,255,.2); margin-top: 3rem; margin-bottom: 3rem"/>
                
                <h2 class="section-title">Other Technologies</h2>
                <p>Technologies that I've used in personal projects (outside of my professional work).</p>
                <div class="skills-grid">
                    <span class="skill-tag"><img src="src/assets/images/icons/react.png" alt="React" />React</span>
                    <span class="skill-tag"><img src="src/assets/images/icons/angular.png" alt="Angular" />Angular</span>
                    <span class="skill-tag"><img src="src/assets/images/icons/redux.png" alt="Redux" />Redux</span>
                    <span class="skill-tag"><img src="src/assets/images/icons/figma.png" alt="Figma" />Figma</span>
                    <span class="skill-tag"><img src="src/assets/images/icons/google-analytics.png" alt="Google Analytics" />Google Analytics</span>
                    <span class="skill-tag"><img src="src/assets/images/icons/netlify.png" alt="Netlify" />Netlify</span>
                </div>
            </div>
        </section>

        <section class="contact-container" id="contact">
        <div class="profile-section">
            <p class="name">Get in touch</p>
        </div>

        <div class="contact-info">
            <div class="contact-item">
                <svg class="contact-icon" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <div class="contact-details">
                    <div class="contact-label">Phone</div>
                    <div class="contact-value">
                        <a href="tel:+15095999171">(509) 599-9171</a>
                    </div>
                </div>
            </div>

            <div class="contact-item">
                <svg class="contact-icon" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <div class="contact-details">
                    <div class="contact-label">Email</div>
                    <div class="email-value" >
                        <a href="mailto:daniel.aleksandrov73@gmail.com">daniel.aleksandrov73@gmail.com</a>
                    </div>
                </div>
            </div>
    </div>
        </section>

        
        </div>
</template>

    <script>
import { onMounted, defineComponent, ref } from "vue";
// import {AWS} from "aws-sdk"
// 

export default defineComponent({
    name: "MyPortfolio",
    setup() {
        onMounted(() => {
            document.getElementById("loading__container").style.display = "none";
        });

        // doesnt work AI
        // const s3 = new AWS.S3();
        // const url = s3.getSignedUrl('getObject', {
        // Bucket: 'awsdaleksandrovstorage',
        // Key: 'AboutAIS.png',
        // Expires: 3600 // 1 hour
        // });

        // Add CSS animation for fadeInUp
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);

        const slide = ref(1);

        return {
            isMobile: window.innerWidth <= 768,
            slide,
        };
    }
})
    </script>
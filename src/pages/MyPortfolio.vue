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
            background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%);
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
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4);
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
            background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%);
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
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
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
            box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6);
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
            background: linear-gradient(135deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .experience-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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
            border-radius: 25px;
            padding: 0.8rem 1.5rem;
            color: rgba(255, 255, 255, 0.9);
            transition: all 0.3s ease;
            cursor: pointer;
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
                <div class="logo">DA</div>
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
            <p class="description">5 years of professional experience crafting exceptional digital experiences. Currently expanding into backend development to become a full-stack powerhouse.</p>
            <div class="cta-buttons">
                <a href="#experience" class="btn btn-primary">View My Work</a>
                <a href="#contact" class="btn btn-secondary">Get In Touch</a>
            </div>
        </section>

        <section class="experience-section" id="experience">
            <h2 class="section-title">Professional Experience</h2>
            <div class="experience-grid">
                <div class="experience-card">
                    <h3>Frontend Developer</h3>
                    <div class="company">AISLabs</div>
                    <p>Led the development and management of aislabs.com, creating a cutting-edge web presence that showcased AI innovations. Architected and maintained Project Central, a comprehensive application that streamlined project management workflows for the entire organization.</p>
                </div>
                <div class="experience-card">
                    <h3>Full-Stack Journey</h3>
                    <div class="company">Current Focus</div>
                    <p>Actively expanding my skill set into backend development, exploring server-side technologies, databases, and API design. Building upon my solid frontend foundation to become a versatile full-stack developer.</p>
                </div>
            </div>
        </section>

        <section class="skills-section" id="skills">
            <h2 class="section-title">Technical Skills</h2>
            <div class="skills-grid">
                <span class="skill-tag">JavaScript</span>
                <span class="skill-tag">React</span>
                <span class="skill-tag">HTML5</span>
                <span class="skill-tag">CSS3</span>
                <span class="skill-tag">TypeScript</span>
                <span class="skill-tag">Vue.js</span>
                <span class="skill-tag">Node.js</span>
                <span class="skill-tag">Express.js</span>
                <span class="skill-tag">MongoDB</span>
                <span class="skill-tag">PostgreSQL</span>
                <span class="skill-tag">Git</span>
                <span class="skill-tag">Webpack</span>
                <span class="skill-tag">Docker</span>
                <span class="skill-tag">AWS</span>
            </div>
        </section>
    </div>
</template>

    <script>
import { onMounted, defineComponent } from "vue";

export default defineComponent({
    name: "MyPortfolio",
    setup() {
        onMounted(() => {
            document.getElementById("loading__container").style.display = "none";
        });
   
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
    }
})
    </script>
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let stars: Array<{x: number, y: number, r: number, base: number, phase: number, speed: number, hue: number}> = [];
    let animationFrameId: number;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const count = Math.min(300, Math.floor((canvas.width * canvas.height) / 4000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.3,
        base: Math.random() * 0.5 + 0.3,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.015 + 0.004,
        hue: Math.random() < 0.85 ? 0 : Math.random() < 0.5 ? 1 : 2,
      }));
    }

    const colors = ["255,255,255", "245,214,123", "139,164,255"];

    function draw(t: number) {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        const tw = s.base + Math.sin(t * s.speed * 0.06 + s.phase) * 0.35;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colors[s.hue]},${Math.max(0.05, tw)})`;
        ctx.fill();
      }
      animationFrameId = requestAnimationFrame(draw);
    }

    window.addEventListener("resize", resize);
    resize();
    animationFrameId = requestAnimationFrame(draw);

    // Reveal on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12 }
    );

    document
      .querySelectorAll(".section, .glass-card, .t-item")
      .forEach((el) => {
        el.classList.add("reveal");
        observer.observe(el);
      });

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <canvas id="stars" ref={canvasRef}></canvas>
      <div className="aurora"></div>
      <div className="shooting-stars"><span></span><span></span><span></span></div>

      <nav className="nav">
        <a href="#home" className="logo">Benin<span>✦</span>S</a>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#education">Education</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <header className="hero" id="home">
        <p className="hero-eyebrow">✦ Welcome to my universe ✦</p>
        <h1>Benin&nbsp;S</h1>
        <p className="hero-title">Mechanical Engineer <span className="dot">·</span> CAD/CAE Specialist <span className="dot">·</span> Python Developer</p>
        <p className="hero-sub">Bridging precision engineering on the ground with creative code among the stars — from nuclear plant surveying to Python-powered projects.</p>
        <div className="hero-cta">
          <a className="btn primary" href="#projects">Explore Projects</a>
          <a className="btn ghost" href="#contact">Get in Touch</a>
        </div>
        <div className="scroll-hint">⌄</div>
      </header>

      <main>
        <section id="about" className="section">
          <h2 className="section-title"><span>01</span> About Me</h2>
          <div className="about-grid">
            <p className="about-text">
              Mechanical Engineering graduate with hands-on site execution experience in nuclear infrastructure,
              plant surveying, and automotive service management. Skilled in equipment alignment, erection plate
              modification, and shop-floor workflow optimization. Proficient in CAD/CAE tools including PTC Creo,
              SolidWorks, and ANSYS Mechanical, with certified foundational training in Non-Destructive Testing
              (NDT) and CNC machining — and a passion for building things with Python, from games to voice assistants.
            </p>
            <div className="about-cards">
              <div className="glass-card stat"><strong>B.E.</strong><span>Mechanical Engineering<br/>Anna University · CGPA 7.88</span></div>
              <div className="glass-card stat"><strong>📍</strong><span>Kanyakumari,<br/>Tamil Nadu, India</span></div>
              <div className="glass-card stat"><strong>NDT</strong><span>Certified — LPT, MPT,<br/>RT & UT</span></div>
              <div className="glass-card stat"><strong>3+</strong><span>Python projects<br/>on GitHub</span></div>
            </div>
          </div>
        </section>

        <section id="skills" className="section">
          <h2 className="section-title"><span>02</span> Constellation of Skills</h2>
          <div className="skills-grid">
            <div className="glass-card skill-card">
              <h3>🛰️ Design &amp; Simulation</h3>
              <div className="tags"><i>SolidWorks</i><i>PTC Creo Parametric</i><i>ANSYS Mechanical</i><i>Autodesk Inventor</i><i>Revit MEP</i><i>Tecnomatix</i><i>Fusion 360</i></div>
            </div>
            <div className="glass-card skill-card">
              <h3>⚙️ Manufacturing &amp; Quality</h3>
              <div className="tags"><i>NDT (LPT, MPT, RT, UT)</i><i>CNC/VMC G&amp;M Codes</i><i>Six Sigma (DMAIC)</i><i>Quality Control &amp; Inspection</i></div>
            </div>
            <div className="glass-card skill-card">
              <h3>📐 Survey &amp; Field Tools</h3>
              <div className="tags"><i>Leica Total Station TS-06</i><i>Precision Equipment Alignment</i><i>Bolt Alignment</i></div>
            </div>
            <div className="glass-card skill-card">
              <h3>🐍 Programming &amp; Tools</h3>
              <div className="tags"><i>Python</i><i>Data Analysis</i><i>Matplotlib</i><i>Tkinter</i><i>Pygame</i><i>VS Code</i><i>MS Office Suite</i></div>
            </div>
          </div>
        </section>

        <section id="experience" className="section">
          <h2 className="section-title"><span>03</span> Journey Through Time</h2>
          <div className="timeline">
            <div className="t-item">
              <div className="t-dot"></div>
              <div className="glass-card t-card">
                <span className="t-date">Feb 2025 – Jun 2026</span>
                <h3>Assistant Surveyor – Mechanical Dept.</h3>
                <h4>L&amp;T Heavy Civil Infrastructure (via RK Engineering) · Tirunelveli</h4>
                <ul>
                  <li>Supported mechanical survey &amp; alignment for Turbine Building construction at the Kudankulam Nuclear Power Plant project.</li>
                  <li>Executed precision bolt alignment, base plate verification, and erection plate modifications using Leica Total Station (TS-06).</li>
                  <li>Verified structural and mechanical tolerances against engineering drawings with senior engineering teams.</li>
                </ul>
              </div>
            </div>
            <div className="t-item">
              <div className="t-dot"></div>
              <div className="glass-card t-card">
                <span className="t-date">Aug 2024 – Nov 2024</span>
                <h3>Service Advisor</h3>
                <h4>Marikar Motors Ltd. (Honda Authorized Service Centre) · Kanyakumari</h4>
                <ul>
                  <li>Managed daily shop floor operations and vehicle intake, improving turnaround times and service efficiency.</li>
                  <li>Diagnosed automotive issues and coordinated maintenance workflows between customers and technicians.</li>
                  <li>Supervised quality control procedures and final inspections before vehicle handover.</li>
                </ul>
              </div>
            </div>
            <div className="t-item">
              <div className="t-dot"></div>
              <div className="glass-card t-card">
                <span className="t-date">Jul 2023</span>
                <h3>In-Plant Trainee</h3>
                <h4>Aavin Milk Union Ltd. (KDCMPUL) · Nagercoil</h4>
                <ul>
                  <li>Studied operations and maintenance of industrial boilers, chillers, and centrifugal separators.</li>
                  <li>Analyzed thermodynamic cycles and workflows of boilers, plate heat exchangers, and separators.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="section">
          <h2 className="section-title"><span>04</span> Projects Among the Stars</h2>

          <h3 className="sub-heading">💻 GitHub Projects</h3>
          <div className="projects-grid">
            <a className="glass-card project" href="https://anti-theft-detector-1086287792789.asia-southeast1.run.app/" target="_blank" rel="noreferrer">
              <div className="p-icon">🛡️</div>
              <h3>Anti-Theft Detector</h3>
              <p>AI-powered security scanner using heuristic inference to detect malicious URLs, phishing, and malware.</p>
              <div className="tags"><i>React</i><i>AI Studio</i></div>
              <span className="p-link">View Live App →</span>
            </a>
            
            <a className="glass-card project" href="https://github.com/Benin07/Anti-Theft-Detector" target="_blank" rel="noreferrer">
              <div className="p-icon">🐙</div>
              <h3>Anti-Theft Detector (Code)</h3>
              <p>Source code for the advanced Anti-Theft AI model incorporating SafeWeb High-Security Protocols.</p>
              <div className="tags"><i>TypeScript</i><i>Node.js</i></div>
              <span className="p-link">View on GitHub →</span>
            </a>

            <a className="glass-card project" href="https://lifeless-detector.ai.studio/" target="_blank" rel="noreferrer">
              <div className="p-icon">🔍</div>
              <h3>Lifeless Detector</h3>
              <p>An AI-powered web application to detect lifelessness or inactivity, built with Google AI Studio.</p>
              <div className="tags"><i>AI Studio</i><i>Web App</i></div>
              <span className="p-link">View Project →</span>
            </a>
            <a className="glass-card project" href="https://github.com/Benin07/Arcade-Pygame-Project" target="_blank" rel="noreferrer">
              <div className="p-icon">👾</div>
              <h3>Space Invaders</h3>
              <p>Classic arcade shooter game — pilot your ship, blast alien invaders, and chase the high score under a pixel starfield.</p>
              <div className="tags"><i>Python</i><i>Pygame</i></div>
              <span className="p-link">View on GitHub →</span>
            </a>
            <a className="glass-card project" href="https://github.com/Benin07/HI-Res-Music-Player-Classic" target="_blank" rel="noreferrer">
              <div className="p-icon">🎵</div>
              <h3>Hi-Res Music Player</h3>
              <p>A desktop music player with a clean GUI for high-resolution audio playback and playlist management.</p>
              <div className="tags"><i>Python</i><i>Tkinter</i></div>
              <span className="p-link">View on GitHub →</span>
            </a>
            <a className="glass-card project" href="https://github.com/Benin07/Strife-Personal-Voice-Assistant" target="_blank" rel="noreferrer">
              <div className="p-icon">🎙️</div>
              <h3>AI Voice Assistant</h3>
              <p>A voice-controlled assistant that listens, understands, and responds — built on speech recognition and synthesis.</p>
              <div className="tags"><i>Python</i><i>PyAudio</i><i>Web Speech API</i></div>
              <span className="p-link">View on GitHub →</span>
            </a>
          </div>

          <h3 className="sub-heading">🔩 Academic Projects</h3>
          <div className="projects-grid two">
            <div className="glass-card project">
              <div className="p-icon">🦾</div>
              <h3>Arduino-Based Robotic Arm</h3>
              <p>Final Year Project · Jan – Feb 2024. Automated robotic arm controlled via Arduino UNO and HC-05 Bluetooth, with ultrasonic sensors for obstacle detection and automated object handling.</p>
              <div className="tags"><i>Arduino UNO</i><i>HC-05 Bluetooth</i><i>Ultrasonic Sensors</i></div>
            </div>
            <div className="glass-card project">
              <div className="p-icon">🧲</div>
              <h3>Electromagnetic Solenoid Engine</h3>
              <p>Pre-Final Year Project · Feb – May 2023. Functional solenoid engine prototype reaching up to 300 RPM, converting linear electromagnetic force into rotary motion.</p>
              <div className="tags"><i>Electromagnetics</i><i>Mechanical Linkages</i><i>Prototyping</i></div>
            </div>
          </div>
        </section>

        <section id="education" className="section">
          <h2 className="section-title"><span>05</span> Education &amp; Certifications</h2>
          <div className="edu-grid">
            <div className="glass-card edu-card">
              <h3>🎓 Education</h3>
              <div className="edu-item">
                <strong>B.E. Mechanical Engineering</strong>
                <span>Rohini College of Engineering and Technology, Anna University · 2020 – 2024</span>
                <em>CGPA 7.88 / 10.0 (First Class)</em>
              </div>
              <div className="edu-item">
                <strong>HSC – Maths &amp; Biology</strong>
                <span>Scott Christian School for Boys, Nagercoil · 2018 – 2020</span>
              </div>
              <div className="edu-item">
                <strong>SSLC – General Studies</strong>
                <span>Fatima Convent Matric High School, Ramapuram · 2006 – 2018</span>
              </div>
            </div>
            <div className="glass-card edu-card">
              <h3>📜 Certifications &amp; Trainings</h3>
              <ul className="cert-list">
                <li>NDT Training (LPT, MPT, RT, UT) — Techie Training &amp; Inspections (Oct 2023)</li>
                <li>Automation in Manufacturing — NPTEL, IIT Guwahati (Jul – Oct 2023)</li>
                <li>CNC &amp; VMC Programming (G &amp; M Codes) — Imaya Inspection Technology (2022)</li>
                <li>SolidWorks Advanced · Autodesk Inventor · Revit MEP · Six Sigma Basics</li>
                <li>Machine Learning using Python — Simplilearn / Infosys Springboard</li>
              </ul>
              <h3 style={{marginTop: '1.5rem'}}>🌐 Languages</h3>
              <div className="tags"><i>English (Professional)</i><i>Tamil (Native)</i><i>Hindi (Elementary)</i></div>
            </div>
          </div>
        </section>

        <section id="contact" className="section contact">
          <h2 className="section-title"><span>06</span> Let's Connect</h2>
          <p className="contact-lead">Whether it's engineering, code, or a constellation of both — I'd love to hear from you.</p>
          <div className="contact-links">
            <a className="btn primary" href="mailto:benin5500b@gmail.com">✉️ benin5500b@gmail.com</a>
            <a className="btn ghost" href="tel:+919489824594">📞 +91 94898 24594</a>
            <a className="btn ghost" href="https://linkedin.com/in/benin-s-840840269" target="_blank" rel="noreferrer">💼 LinkedIn</a>
            <a className="btn ghost" href="https://github.com/Benin07" target="_blank" rel="noreferrer">🐙 GitHub</a>
          </div>
        </section>
      </main>

      <footer>
        <p>✦ Crafted under a starry night sky · © 2026 Benin S ✦</p>
      </footer>
    </>
  );
}


    (function() {
      const canvas = document.getElementById('gridCanvas');
      const ctx = canvas.getContext('2d');
      let width, height;
      let nodes = [];
      const NODE_COUNT = 60;
      const CONNECTION_DIST = 150;
      let mouseX = null, mouseY = null;

      function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }
      window.addEventListener('resize', resize);
      resize();

      class Node {
        constructor() {
          this.x = Math.random() * width;
          this.y = Math.random() * height;
          this.vx = (Math.random() - 0.5) * 0.3;
          this.vy = (Math.random() - 0.5) * 0.3;
          this.radius = Math.random() * 2 + 1.5;
          this.opacity = Math.random() * 0.4 + 0.2;
        }
        update() {
          this.x += this.vx;
          this.y += this.vy;
          if (this.x < 0 || this.x > width) this.vx *= -1;
          if (this.y < 0 || this.y > height) this.vy *= -1;
        }
        draw() {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 229, 255, ${this.opacity})`;
          ctx.fill();
        }
      }

      function initNodes() {
        nodes = [];
        for (let i = 0; i < NODE_COUNT; i++) {
          nodes.push(new Node());
        }
      }
      initNodes();

      function drawConnections() {
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < CONNECTION_DIST) {
              let opacity = 0.06 * (1 - dist / CONNECTION_DIST);
              if (mouseX !== null && mouseY !== null) {
                const mx = (nodes[i].x + nodes[j].x) / 2 - mouseX;
                const my = (nodes[i].y + nodes[j].y) / 2 - mouseY;
                const mDist = Math.sqrt(mx * mx + my * my);
                if (mDist < 150) {
                  opacity = 0.15 * (1 - dist / CONNECTION_DIST) * (1 - mDist / 150);
                }
              }
              ctx.beginPath();
              ctx.moveTo(nodes[i].x, nodes[i].y);
              ctx.lineTo(nodes[j].x, nodes[j].y);
              const gradient = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
              gradient.addColorStop(0, `rgba(0, 229, 255, ${opacity})`);
              gradient.addColorStop(1, `rgba(123, 97, 255, ${opacity})`);
              ctx.strokeStyle = gradient;
              ctx.lineWidth = 0.6;
              ctx.stroke();
            }
          }
        }
      }

      window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      });
      window.addEventListener('mouseleave', () => {
        mouseX = null;
        mouseY = null;
      });

      function animate() {
        ctx.clearRect(0, 0, width, height);
        nodes.forEach(node => {
          node.update();
          node.draw();
        });
        drawConnections();
        requestAnimationFrame(animate);
      }
      animate();

      window.addEventListener('resize', () => {
        resize();
        initNodes();
      });
    })();
    document.addEventListener("DOMContentLoaded", function () {
      emailjs.init("cFw8ODiKR_DQidjrQ");

      const contactForm = document.getElementById("contact-form");

      contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        emailjs.sendForm("service_4qwe7tn", "template_zkyrab4", contactForm)
          .then(() => {
            alert("Message Sent!");
            contactForm.reset();
          })
          .catch((err) => {
            console.log(err);
            alert("Message send nahi hua. Console me error check karo.");
          });
      });
    });
    
    document.addEventListener('DOMContentLoaded', function() {
      const faders = document.querySelectorAll('.fade-up:not(.visible)');
      const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.12 });
      faders.forEach(el => obs.observe(el));
    });
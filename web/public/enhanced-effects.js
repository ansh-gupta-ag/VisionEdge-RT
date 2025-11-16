// Enhanced visual effects for the app

// Add ripple effect on button clicks
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple-effect');
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add stat value animation when they update
    const statValues = document.querySelectorAll('.stat-value');
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList' || mutation.type === 'characterData') {
                const target = mutation.target.nodeType === 3 ? mutation.target.parentElement : mutation.target;
                if (target && target.classList.contains('stat-value')) {
                    target.style.animation = 'none';
                    setTimeout(() => {
                        target.style.animation = 'statPop 0.3s ease-out';
                    }, 10);
                }
            }
        });
    });
    
    statValues.forEach(stat => {
        observer.observe(stat, { 
            childList: true, 
            characterData: true, 
            subtree: true 
        });
    });
    
    // Add glow effect to video container when processing
    const videoContainer = document.querySelector('.video-container');
    if (videoContainer) {
        setInterval(() => {
            const canvas = document.getElementById('outputCanvas');
            if (canvas && canvas.width > 0) {
                videoContainer.classList.add('processing-glow');
            } else {
                videoContainer.classList.remove('processing-glow');
            }
        }, 100);
    }
    
    // Add mouse trail effect
    let mouseTrail = [];
    const maxTrailLength = 20;
    
    document.addEventListener('mousemove', (e) => {
        mouseTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
        
        if (mouseTrail.length > maxTrailLength) {
            mouseTrail.shift();
        }
        
        // Create trail element
        const trail = document.createElement('div');
        trail.className = 'mouse-trail';
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
        document.body.appendChild(trail);
        
        setTimeout(() => trail.remove(), 500);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes statPop {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
    
    .processing-glow {
        animation: processingPulse 1s ease-in-out infinite !important;
    }
    
    @keyframes processingPulse {
        0%, 100% {
            box-shadow: 0 15px 50px rgba(0, 0, 0, 0.5),
                        0 0 30px rgba(0, 255, 136, 0.3);
        }
        50% {
            box-shadow: 0 15px 50px rgba(0, 0, 0, 0.5),
                        0 0 60px rgba(0, 255, 136, 0.6);
        }
    }
    
    .mouse-trail {
        position: fixed;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.8), transparent);
        pointer-events: none;
        transform: translate(-50%, -50%);
        animation: trailFade 0.5s ease-out forwards;
        z-index: 9999;
    }
    
    @keyframes trailFade {
        to {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
        }
    }
    
    button {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', function() {
    // Initialize VANTA.NET background effect with improved settings
    VANTA.NET({
        el: "#background",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x00bfff,
        backgroundColor: 0x050510,
        points: 15.00,
        maxDistance: 28.00,
        spacing: 16.00,
        showDots: false
    });

    // Add shimmer effect to logo text
    const logoText = document.querySelector('.logo h1');
    logoText.style.backgroundSize = '200% auto';

    // Animate social icons with delay and improved animation
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach((icon, index) => {
        icon.style.opacity = 0;
        icon.style.transform = 'translateY(30px) scale(0.8)';
        setTimeout(() => {
            icon.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            icon.style.opacity = 1;
            icon.style.transform = 'translateY(0) scale(1)';
        }, 1000 + (index * 150));
    });
    
    // Add subtle hover effect to the card
    const card = document.querySelector('.card');
    const handleMouseMove = (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        card.style.transform = `perspective(1000px) rotateX(${(y - 0.5) * 5}deg) rotateY(${(x - 0.5) * -5}deg)`;
    };
    
    const handleMouseLeave = () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    };
    
    // Only apply the effect on desktop
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);
    }
    
    // Update the contact popup functionality with the modified elements
    const contactBtn = document.getElementById('contactBtn');
    const contactPopup = document.getElementById('contactPopup');
    const closePopup = document.getElementById('closePopup');
    const contactNumbers = document.querySelectorAll('.contact-number');

    // Set animation delay for contact numbers
    contactNumbers.forEach((number, index) => {
        number.style.setProperty('--i', index + 1);
    });

    contactBtn.addEventListener('click', () => {
        contactPopup.classList.add('active');
        
        // Reset animations
        contactNumbers.forEach(number => {
            number.style.animation = 'none';
            void number.offsetWidth; // Trigger reflow
            number.style.animation = 'slideUp 0.5s forwards';
            number.style.animationDelay = `${parseFloat(number.style.getPropertyValue('--i')) * 0.1}s`;
        });
    });

    closePopup.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event from bubbling up
        contactPopup.classList.remove('active');
    });

    // Make sure clicking on the contact numbers doesn't close the popup
    contactNumbers.forEach(number => {
        number.addEventListener('click', (e) => {
            // Allow the default behavior (making the call) but prevent popup from closing
            e.stopPropagation();
        });
    });

    // Close popup when clicking outside the popup content
    contactPopup.addEventListener('click', (e) => {
        if (e.target === contactPopup) {
            contactPopup.classList.remove('active');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && contactPopup.classList.contains('active')) {
            contactPopup.classList.remove('active');
        }
    });
    
    // Check for mobile devices and adjust animations accordingly
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // Disable 3D effect on mobile
        document.removeEventListener('mousemove', handleMouseMove);
        
        // Optimize animations for mobile
        document.querySelectorAll('.social-icon').forEach(icon => {
            icon.style.transition = 'all 0.3s ease';
        });
    }
}); 
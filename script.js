// ===== スムーススクロール =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('#navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== ナビゲーションのスクロール効果 =====
let lastScroll = 0;
const navbar = document.querySelector('#navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // スクロールダウン時にヘッダーを隠す
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
});

// ===== スクロールアニメーション =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 各セクションにフェードイン効果を適用
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.menu-card, .info-card, .about-text, .about-image');
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(section);
    });
});

// ===== レスポンシブメニュー（モバイル用） =====
const createMobileMenu = () => {
    if (window.innerWidth <= 768) {
        const navMenu = document.querySelector('.nav-menu');
        const navContainer = document.querySelector('.nav-container');
        
        // ハンバーガーメニューボタンを作成
        if (!document.querySelector('.mobile-menu-toggle')) {
            const menuToggle = document.createElement('button');
            menuToggle.className = 'mobile-menu-toggle';
            menuToggle.innerHTML = '☰';
            menuToggle.setAttribute('aria-label', 'メニューを開く');
            
            navContainer.appendChild(menuToggle);
            
            menuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                menuToggle.textContent = navMenu.classList.contains('active') ? '×' : '☰';
            });
            
            // メニュー項目クリック時にメニューを閉じる
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    menuToggle.textContent = '☰';
                });
            });
        }
    }
};

// ページロード時とリサイズ時にモバイルメニューを作成
window.addEventListener('load', createMobileMenu);
window.addEventListener('resize', createMobileMenu);

// ===== ページロード時のヒーローアニメーション =====
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.animation = 'fadeInUp 1.2s ease-out';
});

// ===== スムーズな画像読み込み =====
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
});

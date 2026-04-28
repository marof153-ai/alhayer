document.addEventListener("DOMContentLoaded", function() {

    // --- 1. تأثير السقوط الفخم للعنوان الرئيسي (Drop Effect) ---
    const mainTitle = document.querySelector('h1');
    if (mainTitle) {
        const originalText = mainTitle.innerText;
        mainTitle.innerHTML = originalText;
        mainTitle.style.opacity = "0";
        mainTitle.style.transform = "translateY(-100px)";

        setTimeout(() => {
            mainTitle.style.transition = "all 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
            mainTitle.style.opacity = "1";
            mainTitle.style.transform = "translateY(0)";
        }, 150);
    }

    // --- 2. القائمة الجانبية الذكية (Mobile Menu) ---
    const menuBtn = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');

    if (menuBtn && navLinks) {
        menuBtn.onclick = function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            // تأثير تعتيم الجسم عند فتح القائمة
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'initial';
            document.body.style.backgroundColor = navLinks.classList.contains('active') ? "rgba(0,0,0,0.1)" : "white";
        };
    }

    // --- 3. ذكاء الـ Navbar عند التمرير (Chameleon Effect) ---
    const nav = document.querySelector('.main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            nav.classList.add('nav-scrolled');
            nav.style.height = "70px";
            nav.style.boxShadow = "0 10px 30px rgba(0,0,0,0.08)";
            nav.style.background = "rgba(255, 255, 255, 0.95)";
        } else {
            nav.classList.remove('nav-scrolled');
            nav.style.height = "85px";
            nav.style.boxShadow = "none";
            nav.style.background = "white";
        }
    });

    // --- 4. عداد الأرقام الاحترافي (Stats Counter) ---
    const counters = document.querySelectorAll('.counter-num');
    const speed = 200;

    const startCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText.replace('+', ''); // تنظيف النص
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target + "+";
                }
            };
            updateCount();
        });
    };

    // --- 5. مراقب التمرير (Intersection Observer) لظهور العناصر ---
    const observerOptions = { threshold: 0.15 };
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                // إذا كان القسم هو قسم الإحصائيات، ابدأ العداد
                if (entry.target.classList.contains('stats-section')) {
                    startCounters();
                }
                revealObserver.unobserve(entry.target); // تشغيل الحركة مرة واحدة فقط
            }
        });
    }, observerOptions);

    // ربط المراقب بالأقسام وبطاقات الأخبار
    document.querySelectorAll('section, .news-card, .service-card').forEach(el => {
        revealObserver.observe(el);
    });

    // --- 6. تحكم بطاقات المشاريع (Project Cards) ---
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function(e) {
            const overlay = this.querySelector('.project-overlay');
            if (e.target.tagName === 'P' && overlay.classList.contains('expand-mobile')) {
                return; // السماح بالتمرير داخل النص الطويل
            }
            overlay.classList.toggle('expand-mobile');
        });
    });
});

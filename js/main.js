// 修改加载动画
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            document.body.classList.add('loaded');
        }, 500);
    }
});

// 添加滚动动画
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 监听所有需要动画的元素
document.addEventListener('DOMContentLoaded', () => {
    // 监听项目图片
    const projectImages = document.querySelectorAll('.project-grid img');
    projectImages.forEach(img => observer.observe(img));

    // 监听页脚部分
    const footerSections = document.querySelectorAll('.footer-section');
    footerSections.forEach(section => observer.observe(section));
});

// 动态加载图片画廊
const projectImages = [
    'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&h=600',  // 游戏控制器
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600',  // 游戏设备
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600'   // 游戏场景
];

const projectGrid = document.querySelector('.project-grid');
if (projectGrid) {
    projectImages.forEach(image => {
        const img = document.createElement('img');
        img.src = image;
        img.alt = 'Project Image';
        projectGrid.appendChild(img);
    });
}

// 修改二维码内容
const qrCodeImg = document.querySelector('.qr-code img');
qrCodeImg.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=TLCreativeWarfare"; 

// 添加顶部标题滚动动画
let lastScrollTop = 0;
let isScrolling;

// 添加滚动监听
window.addEventListener('scroll', () => {
    const header = document.querySelector('.main-header');
    const currentScroll = window.pageYOffset;
    
    // 向下滚动时隐藏
    if (currentScroll > lastScrollTop) {
        header.style.transform = 'translateY(-100%)';
        header.style.opacity = '0';
    } 
    // 向上滚动时显示
    else {
        header.style.transform = 'translateY(0)';
        header.style.opacity = '1';
    }
    
    lastScrollTop = currentScroll;
    
    // 清除之前的定时器
    clearTimeout(isScrolling);
    
    // 设置新的定时器
    isScrolling = setTimeout(() => {
        // 停止滚动后显示标题
        header.style.transform = 'translateY(0)';
        header.style.opacity = '1';
    }, 150);  // 150ms 后触发
}); 
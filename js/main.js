// 页面加载完成后移除加载动画
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    loader.style.opacity = '0';
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500);
});

// 视差滚动效果
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// 动态加载图片画廊
const galleryImages = [
    'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=600',
    'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800&h=600',
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600'
];

const galleryGrid = document.querySelector('.gallery-grid');
galleryImages.forEach(image => {
    const img = document.createElement('img');
    img.src = image;
    img.alt = 'Gallery Image';
    galleryGrid.appendChild(img);
});

// 修改二维码内容
const qrCodeImg = document.querySelector('.qr-code img');
qrCodeImg.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=TLCreativeWarfare"; 
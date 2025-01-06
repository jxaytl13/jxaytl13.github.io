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
    'image1.jpg',
    'image2.jpg',
    'image3.jpg',
    // 添加更多图片
];

const galleryGrid = document.querySelector('.gallery-grid');
galleryImages.forEach(image => {
    const img = document.createElement('img');
    img.src = `images/${image}`;
    img.alt = 'Gallery Image';
    galleryGrid.appendChild(img);
});

// 角色卡片数据
const characters = [
    {
        name: 'Character 1',
        image: 'character1.jpg',
        description: '角色描述...'
    },
    // 添加更多角色
];

// 动态加载角色卡片
const characterCards = document.querySelector('.character-cards');
characters.forEach(character => {
    const card = document.createElement('div');
    card.className = 'character-card';
    card.innerHTML = `
        <img src="images/${character.image}" alt="${character.name}">
        <h3>${character.name}</h3>
        <p>${character.description}</p>
    `;
    characterCards.appendChild(card);
}); 
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

// 角色卡片数据
const characters = [
    {
        name: '山姆·波特·布里吉斯',
        image: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=400&h=600',
        description: '主人公，一位快递员，在这个破碎的世界中承担着重要使命...'
    },
    {
        name: '弗拉吉米尔',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600',
        description: '神秘的角色，掌握着关于死亡搁浅现象的重要信息...'
    },
    {
        name: '心人',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600',
        description: '一个具有特殊能力的角色，能够感知BT的存在...'
    }
];

// 动态加载角色卡片
const characterCards = document.querySelector('.character-cards');
characters.forEach(character => {
    const card = document.createElement('div');
    card.className = 'character-card';
    card.innerHTML = `
        <img src="${character.image}" alt="${character.name}">
        <h3>${character.name}</h3>
        <p>${character.description}</p>
    `;
    characterCards.appendChild(card);
}); 
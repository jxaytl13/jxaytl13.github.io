// 滚动动画
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

// 创建观察者
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // 调试：打印每个被观察元素的信息
        console.log('Observed entry:', {
            target: entry.target,
            isIntersecting: entry.isIntersecting,
            intersectionRatio: entry.intersectionRatio
        });
        
        // 无论向上还是向下滚动，只要元素进入视口就添加动画
        entry.target.classList.toggle('is-visible', entry.isIntersecting);
    });
}, observerOptions);

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
    // 观察所有需要动画的元素
    document.querySelectorAll('.fade-in-section, .hero-content p, .project-description, .project-link, .footer-section, .project-grid img, .project-item, .about-me, .about-me-avatar, .about-me-title, .about-me-description, .about-me-quote, .about-me-social, .project-content h2, .hero-content h1, .hero-section .fade-in-section, .hero-content-title').forEach(item => {
        observer.observe(item);
    });
});

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

// 标题栏滚动效果
let lastScrollTop = 0;
let isScrolling;

window.addEventListener('scroll', () => {
    const header = document.querySelector('.main-header');
    const currentScroll = window.pageYOffset;
    
    // 向下滚动时隐藏
    if (currentScroll > lastScrollTop && currentScroll > 50) {
        header.style.transform = 'translateY(-100%)';
    } 
    // 向上滚动时显示
    else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = currentScroll;
    
    // 清除之前的定时器
    clearTimeout(isScrolling);
    
    // 设置新的定时器
    isScrolling = setTimeout(() => {
        // 停止滚动一段时间后显示标题栏
        header.style.transform = 'translateY(0)';
    }, 150);
});

// 添加微信弹窗控制
function showWeChatQR() {
    const popup = document.getElementById('wechatPopup');
    if (popup) {
        popup.classList.add('active');
        // 阻止页面滚动
        document.body.style.overflow = 'hidden';
    }
}

function closePopup() {
    const popup = document.getElementById('wechatPopup');
    if (popup) {
        popup.classList.remove('active');
        // 恢复页面滚动
        document.body.style.overflow = '';
    }
}

// 点击遮罩层关闭弹窗
document.getElementById('wechatPopup').addEventListener('click', (e) => {
    if (e.target.id === 'wechatPopup') {
        closePopup();
    }
});

// ESC 键关闭弹窗
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePopup();
    }
});

// 添加复制微信号功能
function copyWeChatID() {
    const wechatID = document.querySelector('.wechat-value').textContent;
    navigator.clipboard.writeText(wechatID).then(() => {
        const copyBtn = document.querySelector('.copy-btn');
        copyBtn.textContent = '已复制';
        copyBtn.classList.add('copied');
        
        // 2秒后恢复按钮状态
        setTimeout(() => {
            copyBtn.textContent = '点击复制';
            copyBtn.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('复制失败:', err);
    });
}

// 更新导航状态
window.addEventListener('scroll', () => {
    const home = document.querySelector('#home');
    const project = document.querySelector('#project');
    const about = document.querySelector('#about');
    const scrollPosition = window.scrollY;

    // 清除所有激活状态
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // 根据滚动位置激活对应导航
    if (scrollPosition < project.offsetTop - 200) {
        document.querySelector('a[href="#home"]').classList.add('active');
    } else if (scrollPosition < about.offsetTop - 200) {
        document.querySelector('a[href="#project"]').classList.add('active');
    } else {
        document.querySelector('a[href="#about"]').classList.add('active');
    }
});

// 使用防抖优化滚动事件
function debounce(func, wait) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            func.apply(context, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 绑定滚动事件（使用防抖）
const debouncedUpdate = debounce(updateActiveNavLink, 10);

// 确保在页面加载和滚动时都更新导航状态
document.addEventListener('DOMContentLoaded', () => {
    // 初始更新
    updateActiveNavLink();
    
    // 绑定滚动事件
    window.addEventListener('scroll', debouncedUpdate);
    
    // 添加调试信息
    console.log('Event listeners attached');
});

// 使用 requestAnimationFrame 优化滚动事件
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            updateActiveNavLink();
            ticking = false;
        });
        ticking = true;
    }
});

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
    updateActiveNavLink();
});

// 添加平滑滚动
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// 文档页面导航交互
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.docs-nav a');
    const sections = document.querySelectorAll('.docs-section');
    
    // 点击导航链接时滚动到对应部分
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 滚动时更新导航状态
    function updateNavigation() {
        const fromTop = window.scrollY + 150;

        sections.forEach(section => {
            const id = section.getAttribute('id');
            const link = document.querySelector(`.docs-nav a[href="#${id}"]`);
            
            if (
                section.offsetTop <= fromTop &&
                section.offsetTop + section.offsetHeight > fromTop
            ) {
                link?.classList.add('active');
            } else {
                link?.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', () => {
        requestAnimationFrame(updateNavigation);
    });
    
    // 初始化导航状态
    updateNavigation();
});

// 文档导航链接活跃状态切换和平滑滚动逻辑
document.addEventListener('DOMContentLoaded', function() {
    // 文档导航链接活跃状态切换
    const navLinks = document.querySelectorAll('.docs-nav a');
    const currentUrl = window.location.href;

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // 移除所有链接的活跃状态
            navLinks.forEach(l => l.classList.remove('active'));
            
            // 为点击的链接添加活跃状态
            this.classList.add('active');
        });

        // 如果链接对应当前页面的锚点，自动设置为活跃状态
        if (currentUrl.includes(link.getAttribute('href'))) {
            link.classList.add('active');
        }
    });

    // 平滑滚动到锚点
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// 文档语言切换功能
function initLanguageSwitch() {
    const langBtns = document.querySelectorAll('.lang-btn');
    if (!langBtns.length) return;

    const pageName = window.location.pathname.split('/').pop().replace('.html', '');
    const pageContent = docContent[pageName];
    if (!pageContent) return;

    function updateContent(lang) {
        console.log('Switching to language:', lang); // 调试日志
        const content = pageContent[lang];
        if (!content) return;

        // 更新导航文本
        document.querySelectorAll('.docs-nav a').forEach(link => {
            const sectionId = link.getAttribute('href').substring(1);
            if (content[sectionId]) {
                link.textContent = content[sectionId].title;
            }
        });

        // 更新内容
        document.querySelectorAll('.docs-section').forEach(section => {
            const sectionId = section.getAttribute('id');
            if (content[sectionId]) {
                const titleEl = section.querySelector('h2');
                if (titleEl) {
                    titleEl.textContent = content[sectionId].title;
                }

                const contentContainer = section.querySelector('div') || section;
                const contentHtml = content[sectionId].content;
                if (contentContainer) {
                    // 保留标题，替换内容
                    const titleHtml = section.querySelector('h2')?.outerHTML || '';
                    contentContainer.innerHTML = titleHtml + contentHtml;
                }
            }
        });

        // 更新按钮状态
        langBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // 存储语言偏好
        localStorage.setItem('preferred-language', lang);
    }

    // 添加点击事件
    langBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = btn.dataset.lang;
            console.log('Language button clicked:', lang); // 调试日志
            updateContent(lang);
        });
    });

    // 初始化语言
    const preferredLang = localStorage.getItem('preferred-language') || 'en';
    console.log('Initial language:', preferredLang); // 调试日志
    updateContent(preferredLang);
}

// 文档页面语言切换
function initDocLanguageSwitch() {
    const langBtns = document.querySelectorAll('.lang-btn');
    if (!langBtns.length) return;

    const currentLang = window.location.pathname.includes('-zh') ? 'zh' : 'en';
    const baseFileName = window.location.pathname.split('/').pop().replace('-zh.html', '.html').replace('.html', '');

    langBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetLang = btn.dataset.lang;
            let targetUrl;

            if (targetLang === 'zh' && !window.location.pathname.includes('-zh.html')) {
                targetUrl = baseFileName + '-zh.html';
            } else if (targetLang === 'en' && window.location.pathname.includes('-zh.html')) {
                targetUrl = baseFileName + '.html';
            }

            if (targetUrl) {
                window.location.href = targetUrl;
            }
        });
    });

    // 初始化按钮状态
    langBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });
}

// 在页面加载完成后初始化语言切换功能
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded'); // 调试日志
    initLanguageSwitch();
    
    // 如果是文档页面，额外初始化文档语言切换
    if (document.querySelector('.docs-sidebar .language-switch')) {
        initDocLanguageSwitch();
    }
});

const docContent = {
    'hierarchy-vision-plus': {
        en: {
            overview: {
                title: 'Overview',
                content: 'Hierarchy Vision Plus is a powerful Unity editor extension that enhances your scene hierarchy management by displaying component icons next to GameObjects. This visual aid makes it easier to identify and organize objects in your scenes.'
            },
            features: {
                title: 'Features',
                content: '<ul><li>Component icon display in hierarchy</li><li>Easy hotkey toggle functionality</li><li>Customizable icon settings</li><li>Performance optimized</li><li>Unity 2019.4 and above support</li></ul>'
            },
            installation: {
                title: 'Installation',
                content: '<ol><li>Open Unity Package Manager</li><li>Click the + button in the top-left corner</li><li>Select "Add package from git URL"</li><li>Enter the package URL</li><li>Click Add</li></ol>'
            },
            usage: {
                title: 'Usage',
                content: '<p>After installation, the component icons will automatically appear in your hierarchy window. You can toggle the visibility using the following hotkey:</p><ul><li>Windows: Ctrl + Shift + H</li><li>macOS: Cmd + Shift + H</li></ul>'
            },
            configuration: {
                title: 'Configuration',
                content: '<p>You can customize the extension through the preferences window:</p><ol><li>Go to Edit > Preferences</li><li>Select Hierarchy Vision Plus tab</li><li>Adjust settings to your needs</li></ol>'
            }
        },
        zh: {
            overview: {
                title: '概述',
                content: 'Hierarchy Vision Plus 是一个强大的 Unity 编辑器扩展，通过在场景层级视图中显示组件图标来增强场景管理。这种可视化辅助功能使得识别和组织场景对象变得更加容易。'
            },
            features: {
                title: '功能特点',
                content: '<ul><li>层级视图中显示组件图标</li><li>便捷的快捷键切换功能</li><li>可自定义的图标设置</li><li>性能优化</li><li>支持 Unity 2019.4 及以上版本</li></ul>'
            },
            installation: {
                title: '安装说明',
                content: '<ol><li>打开 Unity Package Manager</li><li>点击左上角的 + 按钮</li><li>选择 "Add package from git URL"</li><li>输入包的 URL</li><li>点击添加</li></ol>'
            },
            usage: {
                title: '使用方法',
                content: '<p>安装后，组件图标将自动显示在层级视图中。您可以使用以下快捷键切换显示状态：</p><ul><li>Windows：Ctrl + Shift + H</li><li>macOS：Cmd + Shift + H</li></ul>'
            },
            configuration: {
                title: '配置选项',
                content: '<p>您可以通过偏好设置窗口自定义扩展：</p><ol><li>转到 Edit > Preferences</li><li>选择 Hierarchy Vision Plus 选项卡</li><li>根据需要调整设置</li></ol>'
            }
        }
    },
    'ui-list-animator': {
        en: {
            overview: {
                title: 'Overview',
                content: 'UI List Animator is a versatile Unity package that brings life to your UI elements with smooth, professional-grade animations. Perfect for game menus, item lists, and any UI that needs dynamic transitions.'
            },
            features: {
                title: 'Features',
                content: '<ul><li>Pre-built animation presets</li><li>Customizable animation parameters</li><li>Event-driven animation system</li><li>Performance optimized</li><li>Easy integration with existing UI</li></ul>'
            },
            installation: {
                title: 'Installation',
                content: '<ol><li>Open Unity Package Manager</li><li>Click the + button in the top-left corner</li><li>Select "Add package from git URL"</li><li>Enter the package URL</li><li>Click Add</li></ol>'
            },
            'quick-start': {
                title: 'Quick Start',
                content: '<p>To add animations to your UI list:</p><ol><li>Add UIListAnimator component to your list container</li><li>Configure animation settings in the inspector</li><li>Call Animate() method to trigger animations</li></ol>'
            },
            'animation-types': {
                title: 'Animation Types',
                content: '<ul><li>Fade In/Out</li><li>Scale Up/Down</li><li>Slide In/Out</li><li>Bounce</li><li>Custom animations</li></ul>'
            }
        },
        zh: {
            overview: {
                title: '概述',
                content: 'UI List Animator 是一个多功能的 Unity 包，通过流畅的专业级动画为您的 UI 元素注入生命力。非常适合游戏菜单、物品列表和任何需要动态过渡的 UI。'
            },
            features: {
                title: '功能特点',
                content: '<ul><li>预置动画模板</li><li>可自定义的动画参数</li><li>事件驱动的动画系统</li><li>性能优化</li><li>易于与现有 UI 集成</li></ul>'
            },
            installation: {
                title: '安装说明',
                content: '<ol><li>打开 Unity Package Manager</li><li>点击左上角的 + 按钮</li><li>选择 "Add package from git URL"</li><li>输入包的 URL</li><li>点击添加</li></ol>'
            },
            'quick-start': {
                title: '快速开始',
                content: '<p>为 UI 列表添加动画：</p><ol><li>将 UIListAnimator 组件添加到列表容器</li><li>在检查器中配置动画设置</li><li>调用 Animate() 方法触发动画</li></ol>'
            },
            'animation-types': {
                title: '动画类型',
                content: '<ul><li>淡入/淡出</li><li>缩放</li><li>滑动</li><li>弹跳</li><li>自定义动画</li></ul>'
            }
        }
    }
};
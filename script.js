// 页面管理
let currentPage = 0;
const pages = ['cover', 'introduction', 'details', 'rsvp', 'gallery', 'ending'];
const totalPages = pages.length;

// 页面切换函数
function showPage(pageIndex) {
    // 隐藏所有页面
    pages.forEach((pageId, index) => {
        const page = document.getElementById(pageId);
        if (page) {
            page.classList.remove('active');
        }
        
        // 更新页面指示器
        const indicator = document.querySelector(`.indicator-dot[data-page="${index}"]`);
        if (indicator) {
            indicator.classList.toggle('active', index === pageIndex);
        }
    });
    
    // 显示当前页面
    const currentPageElement = document.getElementById(pages[pageIndex]);
    if (currentPageElement) {
        currentPageElement.classList.add('active');
    }
    
    currentPage = pageIndex;
    
    // 如果切换到相册页面，重新加载照片
    if (pageIndex === 4) { // 相册页面索引
        setTimeout(() => {
            loadGalleryPhotos();
        }, 300);
    }
}

// 下一页
function nextPage() {
    if (currentPage < totalPages - 1) {
        showPage(currentPage + 1);
    }
}

// 上一页
function prevPage() {
    if (currentPage > 0) {
        showPage(currentPage - 1);
    }
}

// 跳转到指定页面
function goToPage(pageName) {
    const pageIndex = pages.indexOf(pageName);
    if (pageIndex !== -1) {
        showPage(pageIndex);
    }
}

// 音乐控制
let musicPlaying = false;
let backgroundMusic = null;

function toggleMusic() {
    const musicBtn = document.getElementById('musicBtn');
    
    if (!musicPlaying) {
        // 播放背景音乐文件
        playBackgroundMusic();
        musicBtn.classList.add('playing');
        musicBtn.textContent = '🎵';
        musicPlaying = true;
    } else {
        stopBackgroundMusic();
        musicBtn.classList.remove('playing');
        musicBtn.textContent = '🔇';
        musicPlaying = false;
    }
}

// 播放背景音乐文件
function playBackgroundMusic() {
    try {
        // 创建音频元素
        backgroundMusic = new Audio('res/happy.mp3');
        backgroundMusic.loop = true; // 循环播放
        backgroundMusic.volume = 0.3; // 设置音量为30%
        
        // 播放音乐
        backgroundMusic.play().then(() => {
            console.log('背景音乐开始播放');
        }).catch(error => {
            console.log('播放音乐失败:', error);
            // 如果自动播放失败，提示用户点击播放
            alert('请点击音乐按钮开始播放背景音乐');
        });
        
    } catch (error) {
        console.log('无法播放背景音乐:', error);
        alert('音乐文件加载失败，请检查文件路径');
    }
}

// 停止背景音乐
function stopBackgroundMusic() {
    if (backgroundMusic) {
        try {
            backgroundMusic.pause();
            backgroundMusic.currentTime = 0; // 重置播放位置
            backgroundMusic = null;
            console.log('背景音乐已停止');
        } catch (error) {
            console.log('停止音乐时出错:', error);
        }
    }
}

// 地图导航功能
function openMap() {
    // 这里可以集成真实的地图API，比如高德地图或百度地图
    const address = "[详细地址]"; // 替换为实际地址
    const mapUrl = `https://uri.amap.com/marker?position=116.397428,39.90923&name=生日宴会&src=myapp`; // 示例地址
    
    // 尝试打开地图应用
    if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
        // iOS设备
        window.location.href = `maps://maps.google.com/maps?q=${encodeURIComponent(address)}`;
    } else if (navigator.userAgent.match(/Android/i)) {
        // Android设备
        window.location.href = `geo:0,0?q=${encodeURIComponent(address)}`;
    } else {
        // 其他设备，打开网页版地图
        window.open(mapUrl, '_blank');
    }
}

// RSVP表单处理
function handleRSVPSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const rsvpData = {
        name: formData.get('name'),
        guests: formData.get('guests'),
        attendance: formData.get('attendance'),
        blessing: formData.get('blessing')
    };
    
    // 验证表单
    if (!rsvpData.name || !rsvpData.guests || !rsvpData.attendance) {
        alert('请填写所有必填项');
        return;
    }
    
    // 这里可以发送数据到服务器
    console.log('RSVP数据:', rsvpData);
    
    // 显示成功消息
    alert('感谢您的回复！我们会尽快与您联系确认。');
    
    // 重置表单
    event.target.reset();
}

// 页面指示器点击事件
function setupPageIndicators() {
    const indicators = document.querySelectorAll('.indicator-dot');
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showPage(index);
        });
    });
}

// 键盘导航
function setupKeyboardNavigation() {
    document.addEventListener('keydown', (event) => {
        switch(event.key) {
            case 'ArrowRight':
            case ' ':
                event.preventDefault();
                nextPage();
                break;
            case 'ArrowLeft':
                event.preventDefault();
                prevPage();
                break;
            case 'Escape':
                // 返回封面页
                showPage(0);
                break;
        }
    });
}

// 触摸滑动支持
let touchStartX = 0;
let touchEndX = 0;

function setupTouchNavigation() {
    document.addEventListener('touchstart', (event) => {
        touchStartX = event.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', (event) => {
        touchEndX = event.changedTouches[0].screenX;
        handleSwipe();
    });
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // 向左滑动，下一页
            nextPage();
        } else {
            // 向右滑动，上一页
            prevPage();
        }
    }
}

// 滚动到顶部
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 页面切换时滚动到顶部
function showPageWithScroll(pageIndex) {
    showPage(pageIndex);
    scrollToTop();
}

// 重写页面切换函数以包含滚动
const originalNextPage = nextPage;
const originalPrevPage = prevPage;

nextPage = function() {
    originalNextPage();
    scrollToTop();
};

prevPage = function() {
    originalPrevPage();
    scrollToTop();
};

// 添加页面切换动画
function addPageTransitions() {
    const style = document.createElement('style');
    style.textContent = `
        .page {
            transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
        }
        
        .page:not(.active) {
            opacity: 0;
            transform: translateX(100%);
        }
        
        .page.active {
            opacity: 1;
            transform: translateX(0);
        }
    `;
    document.head.appendChild(style);
}

// 添加加载动画
function addLoadingAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        .loading {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #1a1a2e;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        }
        
        .loading-spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(255, 215, 0, 0.3);
            border-top: 3px solid #ffd700;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

// 显示加载动画
function showLoading() {
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading';
    loadingDiv.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loadingDiv);
    
    // 2秒后隐藏加载动画
    setTimeout(() => {
        loadingDiv.remove();
    }, 2000);
}

// 初始化应用
function initApp() {
    // 显示加载动画
    showLoading();
    
    // 初始化照片功能
    initPhotoList();
    
    // 设置事件监听器
    setupPageIndicators();
    setupKeyboardNavigation();
    setupTouchNavigation();
    
    // 设置RSVP表单
    const rsvpForm = document.getElementById('rsvpForm');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', handleRSVPSubmit);
    }
    
    // 添加页面过渡效果
    addPageTransitions();
    
    // 显示第一页
    setTimeout(() => {
        showPage(0);
        // 加载相册照片
        loadGalleryPhotos();
        // 开始照片轮播
        startPhotoRotation();
    }, 1000);
    
    // 添加一些交互效果
    addInteractiveEffects();
}

// 照片管理
let photoList = [];
let currentPhotoIndex = 0;
let photoRotationInterval = null;

// 初始化照片列表
function initPhotoList() {
    // 排除1.jpg（用作主照片），其他照片随机排序
    const allPhotos = [];
    for (let i = 2; i <= 21; i++) {
        allPhotos.push(`image/${i}.jpg`);
    }
    
    // 随机打乱数组
    photoList = shuffleArray(allPhotos);
    console.log('照片列表初始化完成:', photoList);
}

// 随机打乱数组
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// 加载相册照片
function loadGalleryPhotos() {
    const photoGrid = document.getElementById('photoGrid');
    if (!photoGrid) return;
    
    // 清空现有内容
    photoGrid.innerHTML = '';
    
    // 显示前6张照片
    const photosToShow = photoList.slice(0, 6);
    
    photosToShow.forEach((photoPath, index) => {
        const photoItem = document.createElement('div');
        photoItem.className = 'photo-item';
        
        // 添加随机动画类
        const animations = ['fade-in', 'slide-in', 'zoom-in'];
        const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
        photoItem.classList.add(randomAnimation);
        
        photoItem.innerHTML = `
            <img src="${photoPath}" alt="美好回忆" loading="lazy">
            <div class="photo-overlay">
                <p>美好时光 ${index + 1}</p>
            </div>
        `;
        
        // 添加点击事件
        photoItem.addEventListener('click', function() {
            showPhotoModal(photoPath, index);
        });
        
        photoGrid.appendChild(photoItem);
        
        // 延迟添加动画效果
        setTimeout(() => {
            photoItem.style.opacity = '1';
        }, index * 100);
    });
}

// 显示照片大图模态框
function showPhotoModal(photoPath, index) {
    const modal = document.createElement('div');
    modal.className = 'photo-modal';
    modal.innerHTML = `
        <div class="modal-backdrop" onclick="closePhotoModal()"></div>
        <div class="modal-content">
            <button class="modal-close" onclick="closePhotoModal()">&times;</button>
            <img src="${photoPath}" alt="美好回忆" class="modal-image">
            <div class="modal-info">
                <p>美好时光 ${index + 1}</p>
                <div class="modal-nav">
                    <button onclick="previousPhoto()" class="nav-btn">← 上一张</button>
                    <button onclick="nextPhoto()" class="nav-btn">下一张 →</button>
                </div>
            </div>
        </div>
    `;
    
    // 添加模态框样式
    const style = document.createElement('style');
    style.textContent = `
        .photo-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .modal-backdrop {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
        }
        
        .modal-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
            background: white;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }
        
        .modal-image {
            width: 100%;
            height: auto;
            max-height: 70vh;
            object-fit: contain;
        }
        
        .modal-close {
            position: absolute;
            top: 10px;
            right: 15px;
            background: rgba(0, 0, 0, 0.5);
            color: white;
            border: none;
            font-size: 2rem;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            z-index: 10001;
        }
        
        .modal-info {
            padding: 1rem;
            text-align: center;
            background: #f8f9fa;
        }
        
        .modal-nav {
            margin-top: 1rem;
            display: flex;
            gap: 1rem;
            justify-content: center;
        }
        
        .modal-nav .nav-btn {
            padding: 0.5rem 1rem;
            background: #ffd700;
            color: #333;
            border: none;
            border-radius: 20px;
            cursor: pointer;
            font-weight: 600;
        }
        
        .modal-nav .nav-btn:hover {
            background: #ffed4e;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(modal);
    
    // 存储当前照片信息
    window.currentModalPhoto = { path: photoPath, index: index };
}

// 关闭照片模态框
function closePhotoModal() {
    const modal = document.querySelector('.photo-modal');
    if (modal) {
        modal.remove();
    }
}

// 上一张照片
function previousPhoto() {
    if (!window.currentModalPhoto) return;
    
    let newIndex = window.currentModalPhoto.index - 1;
    if (newIndex < 0) newIndex = photoList.length - 1;
    
    const newPhotoPath = photoList[newIndex];
    window.currentModalPhoto = { path: newPhotoPath, index: newIndex };
    
    // 更新模态框中的图片
    const modalImage = document.querySelector('.modal-image');
    const modalInfo = document.querySelector('.modal-info p');
    
    if (modalImage) modalImage.src = newPhotoPath;
    if (modalInfo) modalInfo.textContent = `美好时光 ${newIndex + 1}`;
}

// 下一张照片
function nextPhoto() {
    if (!window.currentModalPhoto) return;
    
    let newIndex = window.currentModalPhoto.index + 1;
    if (newIndex >= photoList.length) newIndex = 0;
    
    const newPhotoPath = photoList[newIndex];
    window.currentModalPhoto = { path: newPhotoPath, index: newIndex };
    
    // 更新模态框中的图片
    const modalImage = document.querySelector('.modal-image');
    const modalInfo = document.querySelector('.modal-info p');
    
    if (modalImage) modalImage.src = newPhotoPath;
    if (modalInfo) modalInfo.textContent = `美好时光 ${newIndex + 1}`;
}

// 开始照片轮播
function startPhotoRotation() {
    if (photoRotationInterval) return;
    
    photoRotationInterval = setInterval(() => {
        rotatePhotos();
    }, 5000); // 每5秒轮播一次
}

// 停止照片轮播
function stopPhotoRotation() {
    if (photoRotationInterval) {
        clearInterval(photoRotationInterval);
        photoRotationInterval = null;
    }
}

// 轮播照片
function rotatePhotos() {
    const photoGrid = document.getElementById('photoGrid');
    if (!photoGrid) return;
    
    // 随机选择一张新照片替换现有照片
    const currentPhotos = Array.from(photoGrid.querySelectorAll('.photo-item img'));
    if (currentPhotos.length === 0) return;
    
    const randomPhoto = currentPhotos[Math.floor(Math.random() * currentPhotos.length)];
    const newPhotoPath = photoList[Math.floor(Math.random() * photoList.length)];
    
    // 添加淡出效果
    randomPhoto.style.opacity = '0';
    
    setTimeout(() => {
        randomPhoto.src = newPhotoPath;
        randomPhoto.style.opacity = '1';
    }, 300);
}

// 添加交互效果
function addInteractiveEffects() {
    // 为按钮添加点击效果
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initApp);

// 防止页面刷新时丢失状态
window.addEventListener('beforeunload', () => {
    if (backgroundMusic) {
        stopBackgroundMusic();
    }
});

// 导出函数供HTML调用
window.nextPage = nextPage;
window.prevPage = prevPage;
window.goToPage = goToPage;
window.toggleMusic = toggleMusic;
window.openMap = openMap;
window.closePhotoModal = closePhotoModal;
window.previousPhoto = previousPhoto;
window.nextPhoto = nextPhoto;

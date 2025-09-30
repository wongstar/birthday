// 微信相关功能脚本

// 微信分享配置
function initWechatShare() {
    // 注意：这里需要从微信公众平台获取真实的配置信息
    // 对于测试，可以使用微信开发者工具或临时链接
    
    if (typeof wx !== 'undefined') {
        // 微信JS-SDK配置
        wx.config({
            debug: false, // 生产环境设为false
            appId: 'your_app_id', // 必填，公众号的唯一标识
            timestamp: 'timestamp', // 必填，生成签名的时间戳
            nonceStr: 'nonceStr', // 必填，生成签名的随机串
            signature: 'signature', // 必填，签名
            jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'onMenuShareQZone',
                'chooseImage',
                'previewImage',
                'uploadImage',
                'downloadImage',
                'getLocation',
                'openLocation'
            ]
        });

        wx.ready(function() {
            console.log('微信JS-SDK准备就绪');
            
            // 分享到朋友圈
            wx.onMenuShareTimeline({
                title: '甲子华章 - 60岁生日邀请函',
                link: window.location.href,
                imgUrl: 'https://your-domain.com/share-image.jpg', // 分享图片
                success: function() {
                    console.log('分享到朋友圈成功');
                },
                cancel: function() {
                    console.log('取消分享到朋友圈');
                }
            });

            // 分享给朋友
            wx.onMenuShareAppMessage({
                title: '甲子华章 - 60岁生日邀请函',
                desc: '诚挚邀请您出席生日宴，共庆六十华章',
                link: window.location.href,
                imgUrl: 'https://your-domain.com/share-image.jpg',
                success: function() {
                    console.log('分享给朋友成功');
                },
                cancel: function() {
                    console.log('取消分享给朋友');
                }
            });

            // 分享到QQ
            wx.onMenuShareQQ({
                title: '甲子华章 - 60岁生日邀请函',
                desc: '诚挚邀请您出席生日宴，共庆六十华章',
                link: window.location.href,
                imgUrl: 'https://your-domain.com/share-image.jpg',
                success: function() {
                    console.log('分享到QQ成功');
                }
            });

            // 分享到微博
            wx.onMenuShareWeibo({
                title: '甲子华章 - 60岁生日邀请函',
                desc: '诚挚邀请您出席生日宴，共庆六十华章',
                link: window.location.href,
                imgUrl: 'https://your-domain.com/share-image.jpg',
                success: function() {
                    console.log('分享到微博成功');
                }
            });
        });

        wx.error(function(res) {
            console.log('微信JS-SDK错误:', res);
        });
    }
}

// 微信分享功能
function shareToWechat() {
    if (typeof wx !== 'undefined') {
        // 如果微信JS-SDK已加载，使用微信分享
        wx.showMenuItems({
            menuList: ['menuItem:share:appMessage', 'menuItem:share:timeline']
        });
    } else {
        // 降级处理：显示分享提示
        showShareTip();
    }
}

// 显示分享提示
function showShareTip() {
    const shareTip = document.getElementById('shareTip');
    if (shareTip) {
        shareTip.style.display = 'block';
        setTimeout(() => {
            shareTip.style.display = 'none';
        }, 3000);
    }
}

// 微信地图导航
function openWechatMap() {
    const address = "横峰县兴安大道政府东（世纪城左边）"; // 葛源传说地址
    
    if (typeof wx !== 'undefined') {
        // 使用微信内置地图
        wx.getLocation({
            type: 'gcj02', // 返回可以用于微信地图的坐标
            success: function(res) {
                const latitude = res.latitude; // 纬度
                const longitude = res.longitude; // 经度
                
                wx.openLocation({
                    latitude: latitude,
                    longitude: longitude,
                    name: '[宴会厅或餐厅名称]',
                    address: address,
                    scale: 16,
                    infoUrl: ''
                });
            },
            fail: function() {
                // 如果获取位置失败，使用通用地图链接
                openGeneralMap();
            }
        });
    } else {
        // 降级处理：使用通用地图
        openGeneralMap();
    }
}

// 通用地图导航
function openGeneralMap() {
    const address = "横峰县兴安大道政府东（世纪城左边）";
    const mapUrl = `https://uri.amap.com/marker?position=117.608,28.417&name=葛源传说&src=myapp`;
    
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

// 微信联系功能
function openWechatContact() {
    // 这里可以集成微信客服功能
    // 或者显示微信号让用户手动添加
    
    const contactInfo = {
        wechatId: 'zhangxiaoming2025', // 张小明微信号
        phone: '138-0013-8000' // 张小明电话
    };
    
    // 显示联系方式
    const contactModal = document.createElement('div');
    contactModal.className = 'contact-modal';
    contactModal.innerHTML = `
        <div class="modal-content">
            <h3>联系方式</h3>
            <p>微信号：${contactInfo.wechatId}</p>
            <p>电话：${contactInfo.phone}</p>
            <div class="modal-actions">
                <button onclick="copyWechatId('${contactInfo.wechatId}')">复制微信号</button>
                <button onclick="callPhone('${contactInfo.phone}')">拨打电话</button>
                <button onclick="closeContactModal()">关闭</button>
            </div>
        </div>
    `;
    
    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .contact-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        
        .modal-content {
            background: white;
            padding: 2rem;
            border-radius: 15px;
            text-align: center;
            max-width: 300px;
            width: 90%;
        }
        
        .modal-content h3 {
            color: #ffd700;
            margin-bottom: 1rem;
        }
        
        .modal-content p {
            margin: 0.5rem 0;
            color: #333;
        }
        
        .modal-actions {
            margin-top: 1.5rem;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        
        .modal-actions button {
            padding: 0.8rem;
            border: none;
            border-radius: 8px;
            background: #ffd700;
            color: #333;
            font-weight: 600;
            cursor: pointer;
        }
        
        .modal-actions button:hover {
            background: #ffed4e;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(contactModal);
}

// 复制微信号
function copyWechatId(wechatId) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(wechatId).then(() => {
            alert('微信号已复制到剪贴板');
        });
    } else {
        // 降级处理
        const textArea = document.createElement('textarea');
        textArea.value = wechatId;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('微信号已复制到剪贴板');
    }
}

// 拨打电话
function callPhone(phone) {
    window.location.href = `tel:${phone}`;
}

// 关闭联系弹窗
function closeContactModal() {
    const modal = document.querySelector('.contact-modal');
    if (modal) {
        modal.remove();
    }
}

// 检测是否在微信浏览器中
function isWechatBrowser() {
    const ua = navigator.userAgent.toLowerCase();
    return ua.indexOf('micromessenger') !== -1;
}

// 微信浏览器优化
function optimizeForWechat() {
    if (isWechatBrowser()) {
        // 隐藏分享提示（在微信中不需要）
        const shareTip = document.getElementById('shareTip');
        if (shareTip) {
            shareTip.style.display = 'none';
        }
        
        // 添加微信特有的样式
        const style = document.createElement('style');
        style.textContent = `
            /* 微信浏览器优化 */
            body {
                -webkit-user-select: none;
                -webkit-touch-callout: none;
                -webkit-tap-highlight-color: transparent;
            }
            
            /* 防止微信浏览器缩放 */
            .page {
                touch-action: pan-y;
            }
            
            /* 优化按钮点击效果 */
            button {
                -webkit-tap-highlight-color: rgba(255, 215, 0, 0.3);
            }
        `;
        document.head.appendChild(style);
    }
}

// 微信分享提示样式
function addShareTipStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .share-tip {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: none;
            justify-content: center;
            align-items: flex-start;
            padding-top: 20%;
            z-index: 9999;
            color: white;
            text-align: center;
        }
        
        .share-arrow {
            position: absolute;
            top: 20px;
            right: 20px;
            width: 0;
            height: 0;
            border-left: 20px solid transparent;
            border-right: 20px solid transparent;
            border-bottom: 30px solid #ffd700;
            animation: bounce 1s infinite;
        }
        
        .share-tip p {
            font-size: 1.2rem;
            margin-top: 50px;
        }
    `;
    document.head.appendChild(style);
}

// 音乐控制（微信版本）
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
            if (isWechatBrowser()) {
                // 在微信中显示更友好的提示
                showWechatMusicTip();
            } else {
                alert('请点击音乐按钮开始播放背景音乐');
            }
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

// 显示微信音乐提示
function showWechatMusicTip() {
    const tip = document.createElement('div');
    tip.className = 'wechat-music-tip';
    tip.innerHTML = `
        <div class="tip-content">
            <p>🎵 点击右上角音乐按钮开始播放</p>
        </div>
    `;
    
    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .wechat-music-tip {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            z-index: 10000;
            text-align: center;
        }
        
        .wechat-music-tip p {
            margin: 0;
            font-size: 1rem;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(tip);
    
    // 3秒后自动隐藏
    setTimeout(() => {
        tip.remove();
    }, 3000);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 添加分享提示样式
    addShareTipStyles();
    
    // 微信浏览器优化
    optimizeForWechat();
    
    // 初始化微信分享（需要配置）
    // initWechatShare();
    
    // 如果是微信浏览器，显示分享提示
    if (isWechatBrowser()) {
        setTimeout(() => {
            showShareTip();
        }, 2000);
    }
});

// 导出函数供HTML调用
window.shareToWechat = shareToWechat;
window.openWechatMap = openWechatMap;
window.openWechatContact = openWechatContact;
window.copyWechatId = copyWechatId;
window.callPhone = callPhone;
window.closeContactModal = closeContactModal;
window.toggleMusic = toggleMusic;

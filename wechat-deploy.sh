#!/bin/bash

# 微信公众号H5邀请函部署脚本
echo "🎉 微信公众号H5邀请函部署脚本"
echo "================================"

# 检查必要文件
check_files() {
    echo "📋 检查项目文件..."
    
    required_files=("wechat-deploy.html" "styles.css" "script.js" "wechat-script.js")
    for file in "${required_files[@]}"; do
        if [ ! -f "$file" ]; then
            echo "❌ 缺少必要文件: $file"
            exit 1
        fi
    done
    
    # 检查资源文件夹
    if [ ! -d "res" ] || [ ! -f "res/happy.mp3" ]; then
        echo "❌ 缺少音乐文件: res/happy.mp3"
        exit 1
    fi
    
    if [ ! -d "image" ] || [ ! -f "image/1.jpg" ]; then
        echo "❌ 缺少照片文件: image/1.jpg"
        exit 1
    fi
    
    echo "✅ 所有必要文件检查完成"
}

# 创建部署包
create_deploy_package() {
    echo "📦 创建微信公众号部署包..."
    
    # 创建部署目录
    rm -rf wechat-deploy
    mkdir -p wechat-deploy
    
    # 复制主要文件
    cp wechat-deploy.html wechat-deploy/index.html
    cp styles.css wechat-deploy/
    cp script.js wechat-deploy/
    cp wechat-script.js wechat-deploy/
    
    # 复制资源文件
    cp -r res wechat-deploy/
    cp -r image wechat-deploy/
    
    # 创建 .gitignore
    cat > wechat-deploy/.gitignore << EOF
# 部署文件
node_modules/
.git/
.DS_Store
*.log
EOF

    # 创建 README
    cat > wechat-deploy/README.md << EOF
# 60岁生日H5邀请函 - 微信公众号版本

## 功能特点
- 响应式设计，完美适配手机端
- 微信浏览器优化
- 背景音乐播放
- 动态照片展示
- RSVP回复表单
- 一键地图导航
- 微信分享功能

## 使用方法
1. 将文件上传到Web服务器
2. 在微信公众号中添加菜单链接
3. 访问H5链接即可使用

## 文件说明
- index.html: 主页面文件
- styles.css: 样式文件
- script.js: 主要功能脚本
- wechat-script.js: 微信功能脚本
- res/happy.mp3: 背景音乐
- image/: 照片文件夹

## 自定义
请根据实际情况修改以下内容：
- 寿星姓名
- 生日日期
- 宴会地点
- 联系人信息
EOF

    echo "✅ 微信公众号部署包创建完成"
    echo "📁 部署文件位于 wechat-deploy/ 目录"
}

# 显示部署选项
show_deployment_options() {
    echo ""
    echo "🚀 部署选项"
    echo "============"
    echo ""
    echo "1. GitHub Pages (推荐 - 完全免费)"
    echo "   - 将 wechat-deploy/ 目录上传到GitHub仓库"
    echo "   - 启用GitHub Pages功能"
    echo "   - 获得访问链接: https://你的用户名.github.io/仓库名"
    echo ""
    echo "2. Netlify (功能丰富)"
    echo "   - 访问 https://netlify.com"
    echo "   - 拖拽 wechat-deploy/ 目录到部署区域"
    echo "   - 获得访问链接: https://随机名称.netlify.app"
    echo ""
    echo "3. 腾讯云静态网站托管 (国内访问快)"
    echo "   - 登录腾讯云控制台"
    echo "   - 开通对象存储COS服务"
    echo "   - 上传 wechat-deploy/ 目录中的文件"
    echo ""
    echo "4. 其他Web服务器"
    echo "   - 将 wechat-deploy/ 目录上传到任何Web服务器"
    echo "   - 确保支持HTTPS协议"
    echo ""
}

# 显示微信公众号配置
show_wechat_config() {
    echo ""
    echo "📱 微信公众号配置"
    echo "=================="
    echo ""
    echo "1. 登录微信公众平台: https://mp.weixin.qq.com"
    echo "2. 进入 '自定义菜单'"
    echo "3. 添加菜单项:"
    echo "   - 菜单名称: 生日邀请函"
    echo "   - 菜单内容: 跳转网页"
    echo "   - 网页地址: [您的H5链接]"
    echo ""
    echo "4. 保存并发布菜单"
    echo ""
    echo "💡 提示: 建议先在浏览器中测试H5链接，确保功能正常"
    echo ""
}

# 显示测试建议
show_testing_tips() {
    echo ""
    echo "🧪 测试建议"
    echo "============"
    echo ""
    echo "1. 在微信中测试:"
    echo "   - 扫描二维码或直接访问链接"
    echo "   - 测试所有页面切换"
    echo "   - 测试音乐播放功能"
    echo "   - 测试照片展示和点击"
    echo "   - 测试表单提交"
    echo ""
    echo "2. 在不同设备上测试:"
    echo "   - iPhone/Android手机"
    echo "   - 不同屏幕尺寸"
    echo "   - 不同微信版本"
    echo ""
    echo "3. 检查功能:"
    echo "   - 照片是否正确显示"
    echo "   - 音乐是否能正常播放"
    echo "   - 表单是否能正常提交"
    echo "   - 地图导航是否正常"
    echo ""
}

# 主函数
main() {
    check_files
    create_deploy_package
    show_deployment_options
    show_wechat_config
    show_testing_tips
    
    echo ""
    echo "🎉 部署准备完成！"
    echo "📁 部署文件位于 wechat-deploy/ 目录"
    echo "📖 请按照上述说明进行部署"
    echo ""
    echo "🔗 部署完成后，将H5链接添加到微信公众号菜单中即可使用！"
}

# 运行主函数
main

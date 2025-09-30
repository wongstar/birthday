#!/bin/bash

# H5邀请函自动部署脚本
# 支持 GitHub Pages, Netlify, Vercel 等平台

echo "🎉 60岁生日H5邀请函部署脚本"
echo "================================"

# 检查必要文件
check_files() {
    echo "📋 检查项目文件..."
    
    required_files=("index.html" "styles.css" "script.js")
    for file in "${required_files[@]}"; do
        if [ ! -f "$file" ]; then
            echo "❌ 缺少必要文件: $file"
            exit 1
        fi
    done
    
    echo "✅ 所有必要文件检查完成"
}

# 创建部署包
create_deploy_package() {
    echo "📦 创建部署包..."
    
    # 创建部署目录
    mkdir -p deploy
    
    # 复制文件到部署目录
    cp index.html deploy/
    cp styles.css deploy/
    cp script.js deploy/
    cp wechat-optimized.html deploy/
    cp wechat-script.js deploy/
    cp README.md deploy/
    
    # 创建 .gitignore
    cat > deploy/.gitignore << EOF
# 部署文件
node_modules/
.git/
.DS_Store
*.log
EOF

    echo "✅ 部署包创建完成"
}

# GitHub Pages 部署
deploy_github() {
    echo "🚀 部署到 GitHub Pages..."
    
    if [ ! -d ".git" ]; then
        echo "📝 初始化 Git 仓库..."
        git init
    fi
    
    # 添加文件
    git add .
    git commit -m "Deploy 60岁生日H5邀请函"
    
    # 检查是否已设置远程仓库
    if ! git remote | grep -q origin; then
        echo "⚠️  请先设置 GitHub 远程仓库:"
        echo "   git remote add origin https://github.com/你的用户名/仓库名.git"
        echo "   git branch -M main"
        echo "   git push -u origin main"
        return 1
    fi
    
    # 推送到 GitHub
    git push origin main
    
    echo "✅ GitHub Pages 部署完成"
    echo "🌐 访问地址: https://你的用户名.github.io/仓库名"
}

# 创建 Netlify 部署配置
create_netlify_config() {
    echo "📝 创建 Netlify 配置..."
    
    cat > deploy/netlify.toml << EOF
[build]
  publish = "."
  command = "echo 'No build step required'"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
EOF

    echo "✅ Netlify 配置创建完成"
}

# 创建 Vercel 部署配置
create_vercel_config() {
    echo "📝 创建 Vercel 配置..."
    
    cat > deploy/vercel.json << EOF
{
  "version": 2,
  "name": "birthday-invitation",
  "builds": [
    {
      "src": "index.html",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
EOF

    echo "✅ Vercel 配置创建完成"
}

# 显示部署说明
show_deployment_guide() {
    echo ""
    echo "📖 部署说明"
    echo "============"
    echo ""
    echo "1. GitHub Pages (推荐):"
    echo "   - 将 deploy/ 目录中的文件上传到 GitHub 仓库"
    echo "   - 在仓库设置中启用 GitHub Pages"
    echo "   - 访问: https://你的用户名.github.io/仓库名"
    echo ""
    echo "2. Netlify:"
    echo "   - 访问 https://netlify.com"
    echo "   - 拖拽 deploy/ 目录到部署区域"
    echo "   - 或连接 GitHub 仓库自动部署"
    echo ""
    echo "3. Vercel:"
    echo "   - 访问 https://vercel.com"
    echo "   - 导入 GitHub 仓库或上传 deploy/ 目录"
    echo "   - 自动部署完成"
    echo ""
    echo "4. 腾讯云静态网站托管:"
    echo "   - 登录腾讯云控制台"
    echo "   - 开通对象存储 COS 服务"
    echo "   - 上传 deploy/ 目录中的文件"
    echo "   - 开启静态网站功能"
    echo ""
    echo "5. 微信公众号集成:"
    echo "   - 使用 wechat-optimized.html 作为主文件"
    echo "   - 在公众号菜单中添加 H5 链接"
    echo "   - 配置微信 JS-SDK 分享功能"
    echo ""
}

# 主函数
main() {
    check_files
    create_deploy_package
    create_netlify_config
    create_vercel_config
    show_deployment_guide
    
    echo ""
    echo "🎉 部署准备完成！"
    echo "📁 部署文件位于 deploy/ 目录"
    echo "📖 请查看上方的部署说明进行部署"
}

# 运行主函数
main

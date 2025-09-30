# H5邀请函部署指南

## 方案一：GitHub Pages（推荐）

### 步骤1：创建GitHub仓库
1. 访问 [GitHub.com](https://github.com) 并注册账号
2. 点击 "New repository" 创建新仓库
3. 仓库名建议：`birthday-invitation` 或 `60-birthday-h5`
4. 选择 "Public"（公开仓库才能使用免费Pages）
5. 勾选 "Add a README file"
6. 点击 "Create repository"

### 步骤2：上传文件
1. 在仓库页面点击 "uploading an existing file"
2. 将项目中的所有文件拖拽上传：
   - index.html
   - styles.css
   - script.js
   - README.md
3. 在底部填写提交信息："Initial commit - 60岁生日H5邀请函"
4. 点击 "Commit changes"

### 步骤3：启用GitHub Pages
1. 在仓库页面点击 "Settings" 标签
2. 滚动到 "Pages" 部分
3. 在 "Source" 下选择 "Deploy from a branch"
4. 选择 "main" 分支和 "/ (root)" 文件夹
5. 点击 "Save"
6. 等待几分钟，GitHub会生成一个网址：`https://你的用户名.github.io/仓库名`

### 步骤4：获取访问链接
- 访问地址：`https://你的用户名.github.io/仓库名`
- 例如：`https://zhangsan.github.io/birthday-invitation`

## 方案二：使用Netlify

### 步骤1：准备文件
1. 将项目文件打包成ZIP文件
2. 确保所有文件在根目录下

### 步骤2：部署到Netlify
1. 访问 [Netlify.com](https://netlify.com)
2. 点击 "Sign up" 注册账号（可用GitHub账号登录）
3. 点击 "Add new site" → "Deploy manually"
4. 将ZIP文件拖拽到上传区域
5. 等待部署完成
6. 获得访问链接：`https://随机名称.netlify.app`

### 步骤3：自定义域名（可选）
1. 在Netlify控制台点击 "Domain settings"
2. 可以修改为自定义域名

## 方案三：使用Vercel

### 步骤1：准备项目
1. 确保项目文件完整

### 步骤2：部署
1. 访问 [Vercel.com](https://vercel.com)
2. 用GitHub账号登录
3. 点击 "New Project"
4. 选择GitHub仓库或直接上传文件
5. 点击 "Deploy"
6. 获得访问链接：`https://项目名.vercel.app`

## 方案四：使用腾讯云静态网站托管

### 步骤1：注册腾讯云
1. 访问 [腾讯云](https://cloud.tencent.com)
2. 注册并实名认证

### 步骤2：开通静态网站托管
1. 进入 "对象存储 COS" 服务
2. 创建存储桶
3. 开启静态网站功能
4. 上传项目文件
5. 获得访问链接

## 微信公众号集成

### 方法1：直接链接
1. 将部署后的H5链接添加到公众号菜单
2. 在公众号后台 → 自定义菜单 → 添加菜单项
3. 选择 "跳转网页" → 输入H5链接

### 方法2：文章内嵌
1. 在公众号文章中添加H5链接
2. 用户点击链接跳转到H5页面

### 方法3：二维码分享
1. 生成H5链接的二维码
2. 在公众号文章或菜单中展示二维码

## 优化建议

### 1. 添加微信分享功能
在 `index.html` 的 `<head>` 部分添加：

```html
<!-- 微信分享配置 -->
<script src="https://res.wx.qq.com/open/js/jweixin-1.6.0.js"></script>
<script>
wx.config({
    // 需要从微信公众平台获取
    appId: 'your_app_id',
    timestamp: 'timestamp',
    nonceStr: 'nonceStr',
    signature: 'signature',
    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
});

wx.ready(function() {
    // 分享到朋友圈
    wx.onMenuShareTimeline({
        title: '甲子华章 - 60岁生日邀请函',
        link: window.location.href,
        imgUrl: '分享图片URL'
    });
    
    // 分享给朋友
    wx.onMenuShareAppMessage({
        title: '甲子华章 - 60岁生日邀请函',
        desc: '诚挚邀请您出席生日宴',
        link: window.location.href,
        imgUrl: '分享图片URL'
    });
});
</script>
```

### 2. 添加统计功能
使用百度统计或Google Analytics：

```html
<!-- 百度统计 -->
<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?your_id";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
</script>
```

### 3. 移动端优化
- 确保所有按钮大小适合手指点击
- 优化字体大小和间距
- 测试不同设备的显示效果

## 常见问题

### Q: 为什么音乐无法播放？
A: 现代浏览器要求用户交互后才能播放音频，这是安全策略。用户需要先点击音乐按钮。

### Q: 如何修改分享时的标题和描述？
A: 在HTML的 `<head>` 部分添加：
```html
<meta property="og:title" content="甲子华章 - 60岁生日邀请函">
<meta property="og:description" content="诚挚邀请您出席生日宴">
<meta property="og:image" content="分享图片URL">
```

### Q: 如何收集RSVP数据？
A: 可以集成表单处理服务，如：
- Formspree
- Netlify Forms
- 自建后端API

## 推荐方案

**对于个人使用**：推荐 GitHub Pages，完全免费且稳定
**对于商业使用**：推荐 Netlify 或 Vercel，功能更丰富
**对于国内用户**：推荐腾讯云静态网站托管，访问速度更快

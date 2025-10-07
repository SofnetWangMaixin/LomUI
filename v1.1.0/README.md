# LomUI 2.0.0

LomUI 是一款轻量级、模块化的现代UI框架，专为快速构建美观、响应式的Web界面而设计。

## 特性

- **轻量级**：核心体积小，加载迅速
- **模块化**：组件化设计，按需使用
- **响应式**：适配各种屏幕尺寸
- **易于扩展**：清晰的API设计，便于二次开发
- **现代化**：支持现代浏览器，采用最新的Web标准
- **无依赖**：不依赖任何第三方库

## 快速开始

### 安装

通过npm安装：

```bash
npm install lomui
```

或者直接在HTML中引入：

```html
<link rel="stylesheet" href="path/to/lomui.min.css">
<script src="path/to/lomui.min.js"></script>
```

### 初始化

在使用之前，需要先初始化LomUI：

```javascript
// 初始化LomUI框架
LomUI.init();
```

## 使用示例

### 按钮组件

```javascript
// 创建一个按钮
const btn = LomUI.button.create({
  text: '点击我',
  type: 'primary',
  size: 'lg',
  onClick: function() {
    console.log('按钮被点击了');
  }
});

// 添加到页面
document.body.appendChild(btn);
```

也可以直接在HTML中使用：

```html
<button class="lomui-button lomui-button--primary">主按钮</button>
```

### 弹窗组件

```javascript
// 显示消息弹窗
LomUI.popup.msg('这是一条提示消息');

// 显示确认弹窗
LomUI.popup.confirm({
  title: '确认操作',
  content: '您确定要执行此操作吗？',
  onConfirm: function() {
    LomUI.popup.success('操作成功');
  },
  onCancel: function() {
    LomUI.popup.info('操作已取消');
  }
});
```

### 输入框组件

```javascript
// 创建输入框
const input = LomUI.input.create({
  placeholder: '请输入用户名',
  value: 'admin',
  onInput: function(value) {
    console.log('输入内容:', value);
  }
});

// 添加到页面
document.body.appendChild(input);
```

### 选择框组件

```javascript
// 创建选择框
const select = LomUI.select.create({
  options: [
    { value: '1', label: '选项一' },
    { value: '2', label: '选项二' },
    { value: '3', label: '选项三' }
  ],
  value: '2',
  onChange: function(value) {
    console.log('选择的值:', value);
  }
});

// 添加到页面
document.body.appendChild(select);
```

### 导航组件

```javascript
// 创建导航
const nav = LomUI.nav.create({
  type: 'horizontal', // 水平导航
  items: [
    { id: '1', text: '首页', href: '#' },
    { id: '2', text: '产品', href: '#' },
    { id: '3', text: '服务', href: '#' }
  ],
  activeIndex: 0,
  onItemClick: function(item) {
    console.log('点击了导航项:', item);
  }
});

// 添加到页面
document.body.appendChild(nav);
```

### Tab组件

```javascript
// 创建Tab组件
const tab = LomUI.tab.create({
  tabs: [
    { id: '1', title: 'Tab 1', content: 'Tab 1 内容' },
    { id: '2', title: 'Tab 2', content: 'Tab 2 内容' },
    { id: '3', title: 'Tab 3', content: 'Tab 3 内容' }
  ],
  activeIndex: 0,
  onTabChange: function(index) {
    console.log('切换到Tab:', index);
  }
});

// 添加到页面
document.body.appendChild(tab);
```

## 开发指南

### 安装依赖

```bash
npm install
```

### 开发模式

启动开发服务器：

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 生成文档

```bash
npm run docs
```

## 浏览器兼容性

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)
- IE 11

## 许可证

LomUI 使用 MIT 许可证。详情请查看 [LICENSE](LICENSE) 文件。
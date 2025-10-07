# LomUI 框架文档

![LomUI Logo](https://placeholder.pics/svg/300x100/5D4037/FFFFFF/LomUI)

## 框架介绍

LomUI 是一个轻量级、现代化的前端UI框架，提供了丰富的UI组件和便捷的JavaScript API，帮助开发者快速构建美观、响应式的Web界面。

## 快速开始

### 安装

将框架文件复制到您的项目中，并在HTML文件中引入相关资源：

```html
<!-- 引入CSS文件 -->
<link rel="stylesheet" href="css/public.css">
<link rel="stylesheet" href="css/Popup.css">

<!-- 引入JavaScript文件 -->
<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript" src="js/public.js"></script>
<script type="text/javascript" src="js/Popup.js"></script>
```

### 初始化

框架会在页面加载完成后自动初始化，您也可以手动调用初始化方法：

```javascript
document.addEventListener('DOMContentLoaded', function() {
    LomUI.init();
});
```

## CSS 组件

### 按钮 (Button)

```html
<!-- 基础按钮 -->
<button class="lomui-btn">默认按钮</button>

<!-- 尺寸变体 -->
<button class="lomui-btn lomui-btn--lg">大型按钮</button>
<button class="lomui-btn lomui-btn--sm">小型按钮</button>
<button class="lomui-btn lomui-btn--xs">迷你按钮</button>

<!-- 状态变体 -->
<button class="lomui-btn lomui-btn--disabled">禁用按钮</button>

<!-- 形状变体 -->
<button class="lomui-btn lomui-btn--radius">圆角按钮</button>

<!-- 布局变体 -->
<button class="lomui-btn lomui-btn--fluid">流体按钮</button>
```

### 输入框 (Input)

```html
<!-- 基础输入框 -->
<input type="text" placeholder="请输入内容" class="lomui-input">

<!-- 密码框 -->
<input type="password" placeholder="请输入密码" class="lomui-input lomui-input--password">
```

### 选择框 (Select)

```html
<div class="lomui-select">
    <p class="lomui-select__title">请选择</p>
    <select class="lomui-select__select">
        <option>选项1</option>
        <option>选项2</option>
        <option>选项3</option>
    </select>
</div>
```

### 标题 (Title)

```html
<fieldset class="lomui-title">
    <legend class="lomui-title__legend">
        <a name="section">标题文本</a>
    </legend>
</fieldset>
```

### 导航 (Navigation)

```html
<!-- 横向导航 -->
<ul class="lomui-nav lomui-nav--fluid">
    <li class="lomui-nav__item">首页</li>
    <li class="lomui-nav__item">产品</li>
    <li class="lomui-nav__item">关于我们</li>
</ul>

<!-- 垂直导航 -->
<ul class="lomui-nav lomui-nav--vertical">
    <li class="lomui-nav__item">首页</li>
    <li class="lomui-nav__item">产品</li>
    <li class="lomui-nav__item">关于我们</li>
</ul>

<!-- 激活状态 -->
<li class="lomui-nav__item lomui-nav__item--active">当前激活项</li>
```

### Tab选项卡

```html
<ul class="lomui-tab">
    <li class="lomui-tab__title lomui-tab__title--active">标签1</li>
    <li class="lomui-tab__title">标签2</li>
    <li class="lomui-tab__title">标签3</li>
</ul>
```

## JavaScript API

### 核心对象：LomUI

#### LomUI.error(text)

输出错误信息并抛出异常。

**参数：**
- `text` (string): 错误信息文本

#### LomUI.addClickEffect(selector, duration)

为元素添加点击缩放效果。

**参数：**
- `selector` (string|Element): CSS选择器或DOM元素
- `duration` (number, 可选): 动画持续时间（毫秒），默认200ms

#### LomUI.init()

初始化LomUI框架。

#### LomUI.utils

提供一系列工具方法：
- `isString(value)`: 检查是否为字符串
- `isObject(value)`: 检查是否为对象
- `isElement(value)`: 检查是否为DOM元素
- `addClass(element, className)`: 为元素添加类名
- `removeClass(element, className)`: 移除元素类名
- `hasClass(element, className)`: 检查元素是否包含类名
- `toggleClass(element, className)`: 切换元素类名

### 弹窗模块：LomUI.popup

#### LomUI.popup.msg(options)

显示消息弹窗。

**参数：**
- `options` (string|object): 弹窗内容或配置对象

**配置项：**
- `content` (string): 弹窗内容文本
- `type` (string): 弹窗类型 ('info', 'success', 'error', 'warning')
- `duration` (number): 弹窗显示时长（毫秒），默认3000ms
- `width` (string): 弹窗宽度，默认'auto'
- `onShow` (function): 弹窗显示后的回调函数
- `onClose` (function): 弹窗关闭后的回调函数

**返回值：**
- `string`: 弹窗唯一ID，可用于手动关闭弹窗

#### 快捷方法

```javascript
// 显示信息弹窗
LomUI.popup.info('这是一条信息提示');

// 显示成功弹窗
LomUI.popup.success('操作成功！');

// 显示错误弹窗
LomUI.popup.error('操作失败！');

// 显示警告弹窗
LomUI.popup.warning('警告信息');
```

#### LomUI.popup.close(id)

手动关闭指定ID的弹窗。

**参数：**
- `id` (string): 弹窗ID

**返回值：**
- `boolean`: 是否成功关闭

#### LomUI.popup.closeAll()

关闭所有弹窗。

## 高级用法示例

### 自定义弹窗

```javascript
// 创建一个自定义配置的弹窗
const popupId = LomUI.popup.msg({
    content: '这是一个自定义配置的弹窗',
    type: 'success',
    duration: 5000,
    width: '400px',
    onShow: function() {
        console.log('弹窗已显示');
    },
    onClose: function() {
        console.log('弹窗已关闭');
    }
});

// 2秒后手动关闭弹窗
setTimeout(function() {
    LomUI.popup.close(popupId);
}, 2000);
```

## 框架优化内容

### 1. CSS 优化

- **引入CSS变量**：统一管理颜色、尺寸等，便于主题定制
- **采用BEM命名规范**：`.block__element--modifier` 格式，提高代码可维护性
- **减少代码冗余**：合并相似样式，提高代码复用性
- **添加响应式设计**：适配不同屏幕尺寸
- **优化动画效果**：使用更平滑的过渡曲线
- **添加焦点样式**：增强可访问性

### 2. JavaScript 优化

- **模块化设计**：使用IIFE封装，避免全局污染
- **统一API**：提供一致、简洁的接口
- **参数验证**：增强代码健壮性
- **事件委托**：提高性能
- **类型检查**：提供完善的类型检查工具
- **兼容性处理**：保留旧版API的向后兼容

### 3. 功能增强

- **多种弹窗类型**：支持info、success、error、warning四种类型
- **回调函数**：支持弹窗显示和关闭的回调
- **更灵活的配置**：支持更多自定义选项
- **弹窗管理**：支持手动关闭指定弹窗或所有弹窗

## 浏览器兼容性

- Chrome (推荐)
- Firefox
- Safari
- Edge
- IE 11 (部分功能可能受限)

## 版权信息

- Author: 王迈新
- Copyright (c) 2024, www.iorouter.online. All Rights Reserved.

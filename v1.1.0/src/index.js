/**
 * LomUI v2.0.0
 * A modern, lightweight UI framework
 * @author 王迈新
 * @copyright (c) 2024, www.iorouter.online. All Rights Reserved.
 */

// 引入样式
import './styles/index.scss';

// 引入核心模块
import core from './core';
import Popup from './components/popup';
import Button from './components/button';
import Input from './components/input';
import Select from './components/select';
import Nav from './components/nav';
import Tab from './components/tab';
import utils from './utils';

// 合并所有模块
const LomUI = {
  ...core,
  popup: Popup,
  button: Button,
  input: Input,
  select: Select,
  nav: Nav,
  tab: Tab,
  utils: utils
};

// 自动初始化
document.addEventListener('DOMContentLoaded', () => {
  LomUI.init();
});

// 导出框架
export default LomUI;

// 为了向后兼容，挂载到全局
window.LomUI = LomUI;
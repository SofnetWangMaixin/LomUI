/**
 * 按钮组件
 * 提供按钮的相关功能和交互
 */

import utils from '../utils';

// 按钮尺寸类型
const BUTTON_SIZES = ['lg', 'sm', 'xs'];

// 按钮形状类型
const BUTTON_SHAPES = ['radius'];

// 按钮布局类型
const BUTTON_LAYOUTS = ['fluid'];

class ButtonManager {
  constructor() {
    // 按钮点击效果的默认持续时间
    this.defaultEffectDuration = 200;
  }
  
  /**
   * 为按钮添加点击效果
   * @param {Element|string} element - DOM元素或选择器
   * @param {number} duration - 效果持续时间（毫秒）
   */
  addClickEffect(element, duration = this.defaultEffectDuration) {
    const btn = utils.isElement(element) ? element : document.querySelector(element);
    
    if (!btn) {
      console.warn(`[LomUI] Button element not found: ${element}`);
      return;
    }
    
    // 检查是否已经有点击效果
    if (btn.hasAttribute('data-click-effect')) return;
    
    btn.setAttribute('data-click-effect', 'true');
    
    btn.addEventListener('click', function(e) {
      // 创建点击效果元素
      const effect = document.createElement('span');
      effect.classList.add('lomui-btn__click-effect');
      
      // 设置效果位置
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      effect.style.left = `${x}px`;
      effect.style.top = `${y}px`;
      
      this.appendChild(effect);
      
      // 动画结束后移除效果元素
      setTimeout(() => {
        if (effect.parentNode) {
          effect.parentNode.removeChild(effect);
        }
      }, duration);
    });
  }
  
  /**
   * 创建按钮
   * @param {Object} options - 按钮配置
   * @returns {Element} - 按钮元素
   */
  create(options = {}) {
    // 合并默认配置
    const settings = utils.merge({
      type: 'button',
      content: 'Button',
      className: '',
      size: '',
      shape: '',
      layout: '',
      disabled: false,
      onClick: null
    }, options);
    
    // 创建按钮元素
    const button = document.createElement('button');
    button.type = settings.type;
    button.textContent = settings.content;
    button.classList.add('lomui-btn');
    
    // 添加自定义类名
    if (settings.className) {
      const classNames = settings.className.split(' ');
      classNames.forEach(className => {
        button.classList.add(className);
      });
    }
    
    // 添加尺寸类名
    if (BUTTON_SIZES.includes(settings.size)) {
      button.classList.add(`lomui-btn--${settings.size}`);
    }
    
    // 添加形状类名
    if (BUTTON_SHAPES.includes(settings.shape)) {
      button.classList.add(`lomui-btn--${settings.shape}`);
    }
    
    // 添加布局类名
    if (BUTTON_LAYOUTS.includes(settings.layout)) {
      button.classList.add(`lomui-btn--${settings.layout}`);
    }
    
    // 设置禁用状态
    if (settings.disabled) {
      button.disabled = true;
      button.classList.add('lomui-btn--disabled');
    }
    
    // 添加点击事件
    if (utils.isFunction(settings.onClick)) {
      button.addEventListener('click', settings.onClick);
    }
    
    // 添加点击效果
    this.addClickEffect(button);
    
    return button;
  }
  
  /**
   * 设置按钮禁用状态
   * @param {Element|string} element - DOM元素或选择器
   * @param {boolean} disabled - 是否禁用
   */
  setDisabled(element, disabled = true) {
    const btn = utils.isElement(element) ? element : document.querySelector(element);
    
    if (!btn) {
      console.warn(`[LomUI] Button element not found: ${element}`);
      return;
    }
    
    btn.disabled = disabled;
    
    if (disabled) {
      btn.classList.add('lomui-btn--disabled');
    } else {
      btn.classList.remove('lomui-btn--disabled');
    }
  }
  
  /**
   * 设置按钮文本
   * @param {Element|string} element - DOM元素或选择器
   * @param {string} text - 按钮文本
   */
  setText(element, text) {
    const btn = utils.isElement(element) ? element : document.querySelector(element);
    
    if (!btn) {
      console.warn(`[LomUI] Button element not found: ${element}`);
      return;
    }
    
    btn.textContent = text;
  }
  
  /**
   * 初始化页面上的所有按钮
   */
  initAllButtons() {
    const buttons = document.querySelectorAll('.lomui-btn');
    
    buttons.forEach(button => {
      this.addClickEffect(button);
    });
  }
}

// 创建按钮管理器实例
const buttonManager = new ButtonManager();

// 定义按钮组件
const Button = {
  /**
   * 为按钮添加点击效果
   * @param {Element|string} element - DOM元素或选择器
   * @param {number} duration - 效果持续时间（毫秒）
   */
  addClickEffect(element, duration) {
    buttonManager.addClickEffect(element, duration);
  },
  
  /**
   * 创建按钮
   * @param {Object} options - 按钮配置
   * @returns {Element} - 按钮元素
   */
  create(options) {
    return buttonManager.create(options);
  },
  
  /**
   * 设置按钮禁用状态
   * @param {Element|string} element - DOM元素或选择器
   * @param {boolean} disabled - 是否禁用
   */
  setDisabled(element, disabled) {
    buttonManager.setDisabled(element, disabled);
  },
  
  /**
   * 设置按钮文本
   * @param {Element|string} element - DOM元素或选择器
   * @param {string} text - 按钮文本
   */
  setText(element, text) {
    buttonManager.setText(element, text);
  },
  
  /**
   * 初始化页面上的所有按钮
   */
  initAll() {
    buttonManager.initAllButtons();
  },
  
  /**
   * 获取按钮管理器
   * @returns {ButtonManager} - 按钮管理器实例
   */
  getManager() {
    return buttonManager;
  }
};

export default Button;
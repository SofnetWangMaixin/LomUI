/**
 * 输入框组件
 * 提供输入框的相关功能和交互
 */

import utils from '../utils';

class InputManager {
  constructor() {
    // 输入框默认配置
    this.defaults = {
      type: 'text',
      placeholder: '',
      value: '',
      className: '',
      disabled: false,
      readOnly: false,
      maxLength: null,
      onInput: null,
      onChange: null,
      onFocus: null,
      onBlur: null
    };
  }
  
  /**
   * 创建输入框
   * @param {Object} options - 输入框配置
   * @returns {Element} - 输入框元素
   */
  create(options = {}) {
    // 合并默认配置
    const settings = utils.merge({}, this.defaults, options);
    
    // 创建输入框元素
    const input = document.createElement('input');
    input.type = settings.type;
    input.placeholder = settings.placeholder;
    input.value = settings.value;
    input.classList.add('lomui-input');
    
    // 添加自定义类名
    if (settings.className) {
      const classNames = settings.className.split(' ');
      classNames.forEach(className => {
        input.classList.add(className);
      });
    }
    
    // 设置属性
    if (settings.disabled) {
      input.disabled = true;
    }
    
    if (settings.readOnly) {
      input.readOnly = true;
    }
    
    if (settings.maxLength !== null) {
      input.maxLength = settings.maxLength;
    }
    
    // 添加事件监听器
    if (utils.isFunction(settings.onInput)) {
      input.addEventListener('input', settings.onInput);
    }
    
    if (utils.isFunction(settings.onChange)) {
      input.addEventListener('change', settings.onChange);
    }
    
    if (utils.isFunction(settings.onFocus)) {
      input.addEventListener('focus', settings.onFocus);
    }
    
    if (utils.isFunction(settings.onBlur)) {
      input.addEventListener('blur', settings.onBlur);
    }
    
    return input;
  }
  
  /**
   * 获取输入框的值
   * @param {Element|string} element - DOM元素或选择器
   * @returns {string} - 输入框的值
   */
  getValue(element) {
    const input = utils.isElement(element) ? element : document.querySelector(element);
    
    if (!input) {
      console.warn(`[LomUI] Input element not found: ${element}`);
      return '';
    }
    
    return input.value;
  }
  
  /**
   * 设置输入框的值
   * @param {Element|string} element - DOM元素或选择器
   * @param {string} value - 要设置的值
   */
  setValue(element, value) {
    const input = utils.isElement(element) ? element : document.querySelector(element);
    
    if (!input) {
      console.warn(`[LomUI] Input element not found: ${element}`);
      return;
    }
    
    input.value = value;
    
    // 触发change事件
    const event = new Event('change', { bubbles: true });
    input.dispatchEvent(event);
  }
  
  /**
   * 清空输入框
   * @param {Element|string} element - DOM元素或选择器
   */
  clear(element) {
    this.setValue(element, '');
  }
  
  /**
   * 设置输入框禁用状态
   * @param {Element|string} element - DOM元素或选择器
   * @param {boolean} disabled - 是否禁用
   */
  setDisabled(element, disabled = true) {
    const input = utils.isElement(element) ? element : document.querySelector(element);
    
    if (!input) {
      console.warn(`[LomUI] Input element not found: ${element}`);
      return;
    }
    
    input.disabled = disabled;
  }
  
  /**
   * 设置输入框只读状态
   * @param {Element|string} element - DOM元素或选择器
   * @param {boolean} readOnly - 是否只读
   */
  setReadOnly(element, readOnly = true) {
    const input = utils.isElement(element) ? element : document.querySelector(element);
    
    if (!input) {
      console.warn(`[LomUI] Input element not found: ${element}`);
      return;
    }
    
    input.readOnly = readOnly;
  }
  
  /**
   * 聚焦输入框
   * @param {Element|string} element - DOM元素或选择器
   */
  focus(element) {
    const input = utils.isElement(element) ? element : document.querySelector(element);
    
    if (!input) {
      console.warn(`[LomUI] Input element not found: ${element}`);
      return;
    }
    
    input.focus();
  }
  
  /**
   * 失焦输入框
   * @param {Element|string} element - DOM元素或选择器
   */
  blur(element) {
    const input = utils.isElement(element) ? element : document.querySelector(element);
    
    if (!input) {
      console.warn(`[LomUI] Input element not found: ${element}`);
      return;
    }
    
    input.blur();
  }
  
  /**
   * 验证输入框内容
   * @param {Element|string} element - DOM元素或选择器
   * @param {Function} validator - 验证函数
   * @returns {boolean} - 验证结果
   */
  validate(element, validator) {
    if (!utils.isFunction(validator)) {
      console.warn('[LomUI] Validator must be a function');
      return false;
    }
    
    const input = utils.isElement(element) ? element : document.querySelector(element);
    
    if (!input) {
      console.warn(`[LomUI] Input element not found: ${element}`);
      return false;
    }
    
    return validator(input.value);
  }
}

// 创建输入框管理器实例
const inputManager = new InputManager();

// 定义输入框组件
const Input = {
  /**
   * 创建输入框
   * @param {Object} options - 输入框配置
   * @returns {Element} - 输入框元素
   */
  create(options) {
    return inputManager.create(options);
  },
  
  /**
   * 获取输入框的值
   * @param {Element|string} element - DOM元素或选择器
   * @returns {string} - 输入框的值
   */
  getValue(element) {
    return inputManager.getValue(element);
  },
  
  /**
   * 设置输入框的值
   * @param {Element|string} element - DOM元素或选择器
   * @param {string} value - 要设置的值
   */
  setValue(element, value) {
    inputManager.setValue(element, value);
  },
  
  /**
   * 清空输入框
   * @param {Element|string} element - DOM元素或选择器
   */
  clear(element) {
    inputManager.clear(element);
  },
  
  /**
   * 设置输入框禁用状态
   * @param {Element|string} element - DOM元素或选择器
   * @param {boolean} disabled - 是否禁用
   */
  setDisabled(element, disabled) {
    inputManager.setDisabled(element, disabled);
  },
  
  /**
   * 设置输入框只读状态
   * @param {Element|string} element - DOM元素或选择器
   * @param {boolean} readOnly - 是否只读
   */
  setReadOnly(element, readOnly) {
    inputManager.setReadOnly(element, readOnly);
  },
  
  /**
   * 聚焦输入框
   * @param {Element|string} element - DOM元素或选择器
   */
  focus(element) {
    inputManager.focus(element);
  },
  
  /**
   * 失焦输入框
   * @param {Element|string} element - DOM元素或选择器
   */
  blur(element) {
    inputManager.blur(element);
  },
  
  /**
   * 验证输入框内容
   * @param {Element|string} element - DOM元素或选择器
   * @param {Function} validator - 验证函数
   * @returns {boolean} - 验证结果
   */
  validate(element, validator) {
    return inputManager.validate(element, validator);
  },
  
  /**
   * 获取输入框管理器
   * @returns {InputManager} - 输入框管理器实例
   */
  getManager() {
    return inputManager;
  }
};

export default Input;
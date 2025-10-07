/**
 * 选择框组件
 * 提供选择框的相关功能和交互
 */

import utils from '../utils';

class SelectManager {
  constructor() {
    // 选择框默认配置
    this.defaults = {
      title: '',
      options: [],
      value: '',
      className: '',
      disabled: false,
      onChange: null
    };
  }
  
  /**
   * 创建选择框
   * @param {Object} options - 选择框配置
   * @returns {Element} - 选择框容器元素
   */
  create(options = {}) {
    // 合并默认配置
    const settings = utils.merge({}, this.defaults, options);
    
    // 创建选择框容器
    const container = document.createElement('div');
    container.classList.add('lomui-select');
    
    // 添加自定义类名
    if (settings.className) {
      const classNames = settings.className.split(' ');
      classNames.forEach(className => {
        container.classList.add(className);
      });
    }
    
    // 添加标题
    if (settings.title) {
      const titleElement = document.createElement('p');
      titleElement.classList.add('lomui-select__title');
      titleElement.textContent = settings.title;
      container.appendChild(titleElement);
    }
    
    // 创建select元素
    const selectElement = document.createElement('select');
    selectElement.classList.add('lomui-select__select');
    
    // 设置禁用状态
    if (settings.disabled) {
      selectElement.disabled = true;
    }
    
    // 添加选项
    if (utils.isArray(settings.options)) {
      settings.options.forEach(option => {
        const optionElement = document.createElement('option');
        
        // 处理对象格式的选项
        if (utils.isObject(option)) {
          optionElement.value = option.value || '';
          optionElement.textContent = option.label || '';
          
          if (option.selected) {
            optionElement.selected = true;
          }
          
          if (option.disabled) {
            optionElement.disabled = true;
          }
        } else {
          // 处理字符串格式的选项
          optionElement.value = option;
          optionElement.textContent = option;
        }
        
        selectElement.appendChild(optionElement);
      });
    }
    
    // 设置默认值
    if (settings.value) {
      selectElement.value = settings.value;
    }
    
    // 添加change事件
    if (utils.isFunction(settings.onChange)) {
      selectElement.addEventListener('change', function(e) {
        settings.onChange.call(this, e, this.value);
      });
    }
    
    // 将select元素添加到容器
    container.appendChild(selectElement);
    
    return container;
  }
  
  /**
   * 获取选择框的值
   * @param {Element|string} element - DOM元素或选择器
   * @returns {string} - 选择框的值
   */
  getValue(element) {
    // 找到select元素
    const select = this._getSelectElement(element);
    
    if (!select) {
      return '';
    }
    
    return select.value;
  }
  
  /**
   * 设置选择框的值
   * @param {Element|string} element - DOM元素或选择器
   * @param {string} value - 要设置的值
   */
  setValue(element, value) {
    const select = this._getSelectElement(element);
    
    if (!select) {
      return;
    }
    
    select.value = value;
    
    // 触发change事件
    const event = new Event('change', { bubbles: true });
    select.dispatchEvent(event);
  }
  
  /**
   * 添加选项
   * @param {Element|string} element - DOM元素或选择器
   * @param {Object|string} option - 要添加的选项
   */
  addOption(element, option) {
    const select = this._getSelectElement(element);
    
    if (!select) {
      return;
    }
    
    const optionElement = document.createElement('option');
    
    if (utils.isObject(option)) {
      optionElement.value = option.value || '';
      optionElement.textContent = option.label || '';
      
      if (option.selected) {
        optionElement.selected = true;
      }
      
      if (option.disabled) {
        optionElement.disabled = true;
      }
    } else {
      optionElement.value = option;
      optionElement.textContent = option;
    }
    
    select.appendChild(optionElement);
  }
  
  /**
   * 移除选项
   * @param {Element|string} element - DOM元素或选择器
   * @param {string} value - 要移除的选项的值
   */
  removeOption(element, value) {
    const select = this._getSelectElement(element);
    
    if (!select) {
      return;
    }
    
    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].value === value) {
        select.remove(i);
        return;
      }
    }
  }
  
  /**
   * 清空所有选项
   * @param {Element|string} element - DOM元素或选择器
   */
  clearOptions(element) {
    const select = this._getSelectElement(element);
    
    if (!select) {
      return;
    }
    
    select.innerHTML = '';
  }
  
  /**
   * 设置选择框禁用状态
   * @param {Element|string} element - DOM元素或选择器
   * @param {boolean} disabled - 是否禁用
   */
  setDisabled(element, disabled = true) {
    const select = this._getSelectElement(element);
    
    if (!select) {
      return;
    }
    
    select.disabled = disabled;
  }
  
  /**
   * 获取选择框的所有选项
   * @param {Element|string} element - DOM元素或选择器
   * @returns {Array} - 选项数组
   */
  getOptions(element) {
    const select = this._getSelectElement(element);
    
    if (!select) {
      return [];
    }
    
    const options = [];
    
    for (let i = 0; i < select.options.length; i++) {
      const option = select.options[i];
      options.push({
        value: option.value,
        label: option.textContent,
        selected: option.selected,
        disabled: option.disabled
      });
    }
    
    return options;
  }
  
  /**
   * 内部方法：获取select元素
   * @param {Element|string} element - DOM元素或选择器
   * @returns {HTMLSelectElement|null}
   * @private
   */
  _getSelectElement(element) {
    let select;
    
    if (utils.isElement(element)) {
      // 如果是选择框容器，查找内部的select元素
      if (element.classList.contains('lomui-select')) {
        select = element.querySelector('.lomui-select__select');
      } else {
        // 如果是select元素，直接使用
        select = element;
      }
    } else {
      // 尝试直接查找select元素
      select = document.querySelector(`${element} .lomui-select__select`);
      
      // 如果没找到，尝试查找选择器对应的元素
      if (!select) {
        select = document.querySelector(element);
      }
    }
    
    if (!select || !(select instanceof HTMLSelectElement)) {
      console.warn(`[LomUI] Select element not found: ${element}`);
      return null;
    }
    
    return select;
  }
}

// 创建选择框管理器实例
const selectManager = new SelectManager();

// 定义选择框组件
const Select = {
  /**
   * 创建选择框
   * @param {Object} options - 选择框配置
   * @returns {Element} - 选择框容器元素
   */
  create(options) {
    return selectManager.create(options);
  },
  
  /**
   * 获取选择框的值
   * @param {Element|string} element - DOM元素或选择器
   * @returns {string} - 选择框的值
   */
  getValue(element) {
    return selectManager.getValue(element);
  },
  
  /**
   * 设置选择框的值
   * @param {Element|string} element - DOM元素或选择器
   * @param {string} value - 要设置的值
   */
  setValue(element, value) {
    selectManager.setValue(element, value);
  },
  
  /**
   * 添加选项
   * @param {Element|string} element - DOM元素或选择器
   * @param {Object|string} option - 要添加的选项
   */
  addOption(element, option) {
    selectManager.addOption(element, option);
  },
  
  /**
   * 移除选项
   * @param {Element|string} element - DOM元素或选择器
   * @param {string} value - 要移除的选项的值
   */
  removeOption(element, value) {
    selectManager.removeOption(element, value);
  },
  
  /**
   * 清空所有选项
   * @param {Element|string} element - DOM元素或选择器
   */
  clearOptions(element) {
    selectManager.clearOptions(element);
  },
  
  /**
   * 设置选择框禁用状态
   * @param {Element|string} element - DOM元素或选择器
   * @param {boolean} disabled - 是否禁用
   */
  setDisabled(element, disabled) {
    selectManager.setDisabled(element, disabled);
  },
  
  /**
   * 获取选择框的所有选项
   * @param {Element|string} element - DOM元素或选择器
   * @returns {Array} - 选项数组
   */
  getOptions(element) {
    return selectManager.getOptions(element);
  },
  
  /**
   * 获取选择框管理器
   * @returns {SelectManager} - 选择框管理器实例
   */
  getManager() {
    return selectManager;
  }
};

export default Select;
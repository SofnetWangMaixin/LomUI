/**
 * LomUI工具模块
 * 提供一系列实用工具方法
 */

const utils = {
  /**
   * 检查是否为字符串
   * @param {*} value - 要检查的值
   * @returns {boolean}
   */
  isString(value) {
    return typeof value === 'string';
  },
  
  /**
   * 检查是否为对象
   * @param {*} value - 要检查的值
   * @returns {boolean}
   */
  isObject(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  },
  
  /**
   * 检查是否为数组
   * @param {*} value - 要检查的值
   * @returns {boolean}
   */
  isArray(value) {
    return Array.isArray(value);
  },
  
  /**
   * 检查是否为函数
   * @param {*} value - 要检查的值
   * @returns {boolean}
   */
  isFunction(value) {
    return typeof value === 'function';
  },
  
  /**
   * 检查是否为DOM元素
   * @param {*} value - 要检查的值
   * @returns {boolean}
   */
  isElement(value) {
    return value instanceof Element || value instanceof HTMLDocument;
  },
  
  /**
   * 为元素添加类名
   * @param {Element} element - DOM元素
   * @param {string} className - 类名
   */
  addClass(element, className) {
    if (this.isElement(element)) {
      element.classList.add(className);
    }
  },
  
  /**
   * 移除元素类名
   * @param {Element} element - DOM元素
   * @param {string} className - 类名
   */
  removeClass(element, className) {
    if (this.isElement(element)) {
      element.classList.remove(className);
    }
  },
  
  /**
   * 检查元素是否包含类名
   * @param {Element} element - DOM元素
   * @param {string} className - 类名
   * @returns {boolean}
   */
  hasClass(element, className) {
    if (this.isElement(element)) {
      return element.classList.contains(className);
    }
    return false;
  },
  
  /**
   * 切换元素类名
   * @param {Element} element - DOM元素
   * @param {string} className - 类名
   */
  toggleClass(element, className) {
    if (this.isElement(element)) {
      element.classList.toggle(className);
    }
  },
  
  /**
   * 生成唯一ID
   * @returns {string}
   */
  generateId() {
    return 'lomui_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
  },
  
  /**
   * 合并对象
   * @param {Object} target - 目标对象
   * @param {...Object} sources - 源对象
   * @returns {Object}
   */
  merge(target, ...sources) {
    if (!this.isObject(target)) {
      target = {};
    }
    
    sources.forEach(source => {
      if (this.isObject(source)) {
        Object.keys(source).forEach(key => {
          if (this.isObject(source[key]) && this.isObject(target[key])) {
            target[key] = this.merge(target[key], source[key]);
          } else {
            target[key] = source[key];
          }
        });
      }
    });
    
    return target;
  },
  
  /**
   * 节流函数
   * @param {Function} func - 要节流的函数
   * @param {number} wait - 等待时间（毫秒）
   * @returns {Function}
   */
  throttle(func, wait) {
    let timeout = null;
    let previous = 0;
    
    return function(...args) {
      const now = Date.now();
      const remaining = wait - (now - previous);
      
      if (remaining <= 0) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        func.apply(this, args);
      } else if (!timeout) {
        timeout = setTimeout(() => {
          previous = Date.now();
          timeout = null;
          func.apply(this, args);
        }, remaining);
      }
    };
  },
  
  /**
   * 防抖函数
   * @param {Function} func - 要防抖的函数
   * @param {number} wait - 等待时间（毫秒）
   * @returns {Function}
   */
  debounce(func, wait) {
    let timeout = null;
    
    return function(...args) {
      if (timeout) {
        clearTimeout(timeout);
      }
      
      timeout = setTimeout(() => {
        func.apply(this, args);
      }, wait);
    };
  },
  
  /**
   * 遍历数组或对象
   * @param {Array|Object} collection - 要遍历的集合
   * @param {Function} iteratee - 迭代函数
   */
  each(collection, iteratee) {
    if (!iteratee || typeof iteratee !== 'function') return;
    
    if (this.isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
        if (iteratee.call(null, collection[i], i, collection) === false) break;
      }
    } else if (this.isObject(collection)) {
      for (const key in collection) {
        if (collection.hasOwnProperty(key)) {
          if (iteratee.call(null, collection[key], key, collection) === false) break;
        }
      }
    }
  },
  
  /**
   * 获取元素样式
   * @param {Element} element - DOM元素
   * @param {string} property - CSS属性名
   * @returns {string}
   */
  getStyle(element, property) {
    if (!this.isElement(element)) return '';
    
    return getComputedStyle(element)[property];
  },
  
  /**
   * 设置元素样式
   * @param {Element} element - DOM元素
   * @param {Object} styles - 样式对象
   */
  setStyle(element, styles) {
    if (!this.isElement(element) || !this.isObject(styles)) return;
    
    this.each(styles, (value, key) => {
      element.style[key] = value;
    });
  }
};

export default utils;
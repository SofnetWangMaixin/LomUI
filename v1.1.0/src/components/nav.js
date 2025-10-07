/**
 * 导航组件
 * 提供导航栏的相关功能和交互
 */

import utils from '../utils';

class NavManager {
  constructor() {
    // 导航默认配置
    this.defaults = {
      items: [],
      type: 'horizontal', // horizontal, vertical
      className: '',
      activeIndex: -1,
      onItemClick: null
    };
  }
  
  /**
   * 创建导航栏
   * @param {Object} options - 导航配置
   * @returns {Element} - 导航栏元素
   */
  create(options = {}) {
    // 合并默认配置
    const settings = utils.merge({}, this.defaults, options);
    
    // 创建导航栏元素
    const nav = document.createElement('ul');
    nav.classList.add('lomui-nav');
    
    // 添加类型类名
    if (settings.type === 'vertical') {
      nav.classList.add('lomui-nav--vertical');
    } else {
      nav.classList.add('lomui-nav--fluid');
    }
    
    // 添加自定义类名
    if (settings.className) {
      const classNames = settings.className.split(' ');
      classNames.forEach(className => {
        nav.classList.add(className);
      });
    }
    
    // 添加导航项
    if (utils.isArray(settings.items)) {
      settings.items.forEach((item, index) => {
        const li = document.createElement('li');
        li.classList.add('lomui-nav__item');
        
        // 设置激活状态
        if (index === settings.activeIndex) {
          li.classList.add('lomui-nav__item--active');
        }
        
        // 处理导航项内容
        if (utils.isObject(item)) {
          li.textContent = item.label || '';
          
          // 添加自定义属性
          if (item.id) {
            li.id = item.id;
          }
          
          if (item.data) {
            utils.each(item.data, (value, key) => {
              li.setAttribute(`data-${key}`, value);
            });
          }
        } else {
          li.textContent = item;
        }
        
        // 添加点击事件
        li.addEventListener('click', (e) => {
          // 移除其他项的激活状态
          const activeItems = nav.querySelectorAll('.lomui-nav__item--active');
          activeItems.forEach(activeItem => {
            activeItem.classList.remove('lomui-nav__item--active');
          });
          
          // 设置当前项为激活状态
          li.classList.add('lomui-nav__item--active');
          
          // 调用回调函数
          if (utils.isFunction(settings.onItemClick)) {
            settings.onItemClick.call(li, e, index, item);
          }
        });
        
        nav.appendChild(li);
      });
    }
    
    return nav;
  }
  
  /**
   * 设置导航项为激活状态
   * @param {Element|string} element - DOM元素或选择器
   * @param {number|string} indexOrId - 导航项索引或ID
   */
  setActive(element, indexOrId) {
    const nav = utils.isElement(element) ? element : document.querySelector(element);
    
    if (!nav || !nav.classList.contains('lomui-nav')) {
      console.warn(`[LomUI] Nav element not found: ${element}`);
      return;
    }
    
    const items = nav.querySelectorAll('.lomui-nav__item');
    
    // 移除所有项的激活状态
    items.forEach(item => {
      item.classList.remove('lomui-nav__item--active');
    });
    
    // 设置指定项为激活状态
    if (typeof indexOrId === 'number') {
      // 通过索引设置
      if (indexOrId >= 0 && indexOrId < items.length) {
        items[indexOrId].classList.add('lomui-nav__item--active');
      }
    } else if (typeof indexOrId === 'string') {
      // 通过ID设置
      const item = nav.querySelector(`#${indexOrId}`);
      if (item) {
        item.classList.add('lomui-nav__item--active');
      }
    }
  }
  
  /**
   * 获取当前激活的导航项索引
   * @param {Element|string} element - DOM元素或选择器
   * @returns {number} - 索引值，未找到返回-1
   */
  getActiveIndex(element) {
    const nav = utils.isElement(element) ? element : document.querySelector(element);
    
    if (!nav || !nav.classList.contains('lomui-nav')) {
      return -1;
    }
    
    const items = nav.querySelectorAll('.lomui-nav__item');
    
    for (let i = 0; i < items.length; i++) {
      if (items[i].classList.contains('lomui-nav__item--active')) {
        return i;
      }
    }
    
    return -1;
  }
  
  /**
   * 添加导航项
   * @param {Element|string} element - DOM元素或选择器
   * @param {Object|string} item - 要添加的导航项
   * @param {number} index - 添加位置的索引，默认为末尾
   */
  addItem(element, item, index = -1) {
    const nav = utils.isElement(element) ? element : document.querySelector(element);
    
    if (!nav || !nav.classList.contains('lomui-nav')) {
      console.warn(`[LomUI] Nav element not found: ${element}`);
      return;
    }
    
    const li = document.createElement('li');
    li.classList.add('lomui-nav__item');
    
    // 设置导航项内容
    if (utils.isObject(item)) {
      li.textContent = item.label || '';
      
      // 添加自定义属性
      if (item.id) {
        li.id = item.id;
      }
      
      if (item.data) {
        utils.each(item.data, (value, key) => {
          li.setAttribute(`data-${key}`, value);
        });
      }
    } else {
      li.textContent = item;
    }
    
    // 添加点击事件（复制现有项的点击事件）
    const existingItem = nav.querySelector('.lomui-nav__item');
    if (existingItem) {
      // 这里简化处理，实际项目中可能需要更复杂的事件复制逻辑
      li.addEventListener('click', function(e) {
        // 移除其他项的激活状态
        const activeItems = nav.querySelectorAll('.lomui-nav__item--active');
        activeItems.forEach(activeItem => {
          activeItem.classList.remove('lomui-nav__item--active');
        });
        
        // 设置当前项为激活状态
        this.classList.add('lomui-nav__item--active');
      });
    }
    
    // 添加到指定位置
    const items = nav.querySelectorAll('.lomui-nav__item');
    
    if (index >= 0 && index < items.length) {
      nav.insertBefore(li, items[index]);
    } else {
      nav.appendChild(li);
    }
  }
  
  /**
   * 移除导航项
   * @param {Element|string} element - DOM元素或选择器
   * @param {number|string} indexOrId - 导航项索引或ID
   */
  removeItem(element, indexOrId) {
    const nav = utils.isElement(element) ? element : document.querySelector(element);
    
    if (!nav || !nav.classList.contains('lomui-nav')) {
      console.warn(`[LomUI] Nav element not found: ${element}`);
      return;
    }
    
    let itemToRemove = null;
    const items = nav.querySelectorAll('.lomui-nav__item');
    
    if (typeof indexOrId === 'number') {
      // 通过索引移除
      if (indexOrId >= 0 && indexOrId < items.length) {
        itemToRemove = items[indexOrId];
      }
    } else if (typeof indexOrId === 'string') {
      // 通过ID移除
      itemToRemove = nav.querySelector(`#${indexOrId}`);
    }
    
    if (itemToRemove && itemToRemove.parentNode === nav) {
      nav.removeChild(itemToRemove);
    }
  }
  
  /**
   * 获取所有导航项
   * @param {Element|string} element - DOM元素或选择器
   * @returns {Array} - 导航项数组
   */
  getItems(element) {
    const nav = utils.isElement(element) ? element : document.querySelector(element);
    
    if (!nav || !nav.classList.contains('lomui-nav')) {
      return [];
    }
    
    const items = [];
    const navItems = nav.querySelectorAll('.lomui-nav__item');
    
    navItems.forEach((item, index) => {
      items.push({
        index: index,
        label: item.textContent,
        id: item.id,
        active: item.classList.contains('lomui-nav__item--active'),
        element: item
      });
    });
    
    return items;
  }
}

// 创建导航管理器实例
const navManager = new NavManager();

// 定义导航组件
const Nav = {
  /**
   * 创建导航栏
   * @param {Object} options - 导航配置
   * @returns {Element} - 导航栏元素
   */
  create(options) {
    return navManager.create(options);
  },
  
  /**
   * 设置导航项为激活状态
   * @param {Element|string} element - DOM元素或选择器
   * @param {number|string} indexOrId - 导航项索引或ID
   */
  setActive(element, indexOrId) {
    navManager.setActive(element, indexOrId);
  },
  
  /**
   * 获取当前激活的导航项索引
   * @param {Element|string} element - DOM元素或选择器
   * @returns {number} - 索引值，未找到返回-1
   */
  getActiveIndex(element) {
    return navManager.getActiveIndex(element);
  },
  
  /**
   * 添加导航项
   * @param {Element|string} element - DOM元素或选择器
   * @param {Object|string} item - 要添加的导航项
   * @param {number} index - 添加位置的索引，默认为末尾
   */
  addItem(element, item, index) {
    navManager.addItem(element, item, index);
  },
  
  /**
   * 移除导航项
   * @param {Element|string} element - DOM元素或选择器
   * @param {number|string} indexOrId - 导航项索引或ID
   */
  removeItem(element, indexOrId) {
    navManager.removeItem(element, indexOrId);
  },
  
  /**
   * 获取所有导航项
   * @param {Element|string} element - DOM元素或选择器
   * @returns {Array} - 导航项数组
   */
  getItems(element) {
    return navManager.getItems(element);
  },
  
  /**
   * 获取导航管理器
   * @returns {NavManager} - 导航管理器实例
   */
  getManager() {
    return navManager;
  }
};

export default Nav;
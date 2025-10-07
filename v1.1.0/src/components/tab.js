/**
 * Tab选项卡组件
 * 提供Tab选项卡的相关功能和交互
 */

import utils from '../utils';

class TabManager {
  constructor() {
    // Tab默认配置
    this.defaults = {
      tabs: [],
      activeIndex: 0,
      className: '',
      onTabChange: null
    };
  }
  
  /**
   * 创建Tab选项卡
   * @param {Object} options - Tab配置
   * @returns {Element} - Tab容器元素
   */
  create(options = {}) {
    // 合并默认配置
    const settings = utils.merge({}, this.defaults, options);
    
    // 创建Tab容器
    const container = document.createElement('div');
    container.classList.add('lomui-tab-container');
    
    // 添加自定义类名
    if (settings.className) {
      const classNames = settings.className.split(' ');
      classNames.forEach(className => {
        container.classList.add(className);
      });
    }
    
    // 创建Tab标题栏
    const tabList = document.createElement('ul');
    tabList.classList.add('lomui-tab');
    
    // 创建Tab内容容器
    const contentContainer = document.createElement('div');
    contentContainer.classList.add('lomui-tab__content-container');
    
    // 添加Tab项
    if (utils.isArray(settings.tabs) && settings.tabs.length > 0) {
      settings.tabs.forEach((tab, index) => {
        // 创建Tab标题
        const tabTitle = document.createElement('li');
        tabTitle.classList.add('lomui-tab__title');
        
        // 设置激活状态
        if (index === settings.activeIndex) {
          tabTitle.classList.add('lomui-tab__title--active');
        }
        
        // 处理Tab标题内容
        if (utils.isObject(tab)) {
          tabTitle.textContent = tab.title || '';
          
          // 添加自定义属性
          if (tab.id) {
            tabTitle.id = tab.id;
          }
        } else {
          tabTitle.textContent = tab;
        }
        
        // 添加点击事件
        tabTitle.addEventListener('click', (e) => {
          this._switchTab(container, index, settings.onTabChange);
        });
        
        // 添加到标题栏
        tabList.appendChild(tabTitle);
        
        // 创建Tab内容
        const tabContent = document.createElement('div');
        tabContent.classList.add('lomui-tab__content');
        
        // 设置内容可见性
        if (index === settings.activeIndex) {
          tabContent.classList.add('lomui-tab__content--active');
        }
        
        // 处理Tab内容
        if (utils.isObject(tab) && tab.content) {
          if (utils.isElement(tab.content)) {
            // 如果是DOM元素，直接添加
            tabContent.appendChild(tab.content);
          } else if (typeof tab.content === 'string') {
            // 如果是字符串，设置为innerHTML
            tabContent.innerHTML = tab.content;
          }
        }
        
        // 添加到内容容器
        contentContainer.appendChild(tabContent);
      });
    }
    
    // 将标题栏和内容容器添加到Tab容器
    container.appendChild(tabList);
    container.appendChild(contentContainer);
    
    // 存储设置到元素上，便于后续操作
    container.__tabSettings = settings;
    
    return container;
  }
  
  /**
   * 切换Tab
   * @param {Element|string} element - DOM元素或选择器
   * @param {number} index - 要切换的Tab索引
   * @param {Function} callback - 切换后的回调函数
   * @private
   */
  _switchTab(element, index, callback) {
    const container = utils.isElement(element) ? element : document.querySelector(element);
    
    if (!container || !container.classList.contains('lomui-tab-container')) {
      console.warn(`[LomUI] Tab container not found: ${element}`);
      return;
    }
    
    const tabTitles = container.querySelectorAll('.lomui-tab__title');
    const tabContents = container.querySelectorAll('.lomui-tab__content');
    
    // 验证索引
    if (index < 0 || index >= tabTitles.length) {
      console.warn(`[LomUI] Tab index out of range: ${index}`);
      return;
    }
    
    // 切换标题激活状态
    tabTitles.forEach((title, i) => {
      if (i === index) {
        title.classList.add('lomui-tab__title--active');
      } else {
        title.classList.remove('lomui-tab__title--active');
      }
    });
    
    // 切换内容可见性
    tabContents.forEach((content, i) => {
      if (i === index) {
        content.classList.add('lomui-tab__content--active');
      } else {
        content.classList.remove('lomui-tab__content--active');
      }
    });
    
    // 更新设置中的激活索引
    if (container.__tabSettings) {
      container.__tabSettings.activeIndex = index;
    }
    
    // 调用回调函数
    if (utils.isFunction(callback)) {
      callback(index, container);
    }
  }
  
  /**
   * 切换到指定索引的Tab
   * @param {Element|string} element - DOM元素或选择器
   * @param {number} index - 要切换的Tab索引
   */
  switchTo(element, index) {
    const container = utils.isElement(element) ? element : document.querySelector(element);
    
    if (!container) {
      return;
    }
    
    const onTabChange = container.__tabSettings ? container.__tabSettings.onTabChange : null;
    this._switchTab(container, index, onTabChange);
  }
  
  /**
   * 获取当前激活的Tab索引
   * @param {Element|string} element - DOM元素或选择器
   * @returns {number} - 索引值，未找到返回-1
   */
  getActiveIndex(element) {
    const container = utils.isElement(element) ? element : document.querySelector(element);
    
    if (!container || !container.classList.contains('lomui-tab-container')) {
      return -1;
    }
    
    if (container.__tabSettings) {
      return container.__tabSettings.activeIndex;
    }
    
    // 如果没有存储的设置，手动查找
    const tabTitles = container.querySelectorAll('.lomui-tab__title');
    
    for (let i = 0; i < tabTitles.length; i++) {
      if (tabTitles[i].classList.contains('lomui-tab__title--active')) {
        return i;
      }
    }
    
    return -1;
  }
  
  /**
   * 添加Tab项
   * @param {Element|string} element - DOM元素或选择器
   * @param {Object} tab - 要添加的Tab配置
   * @param {number} index - 添加位置的索引，默认为末尾
   */
  addTab(element, tab, index = -1) {
    const container = utils.isElement(element) ? element : document.querySelector(element);
    
    if (!container || !container.classList.contains('lomui-tab-container')) {
      console.warn(`[LomUI] Tab container not found: ${element}`);
      return;
    }
    
    const tabList = container.querySelector('.lomui-tab');
    const contentContainer = container.querySelector('.lomui-tab__content-container');
    
    if (!tabList || !contentContainer) {
      console.warn('[LomUI] Invalid tab container structure');
      return;
    }
    
    // 处理默认配置
    if (!utils.isObject(tab)) {
      tab = { title: tab };
    }
    
    const tabTitles = tabList.querySelectorAll('.lomui-tab__title');
    const tabContents = contentContainer.querySelectorAll('.lomui-tab__content');
    
    // 确定添加位置
    const insertIndex = (index >= 0 && index <= tabTitles.length) ? index : tabTitles.length;
    
    // 创建Tab标题
    const tabTitle = document.createElement('li');
    tabTitle.classList.add('lomui-tab__title');
    tabTitle.textContent = tab.title || '';
    
    // 添加自定义属性
    if (tab.id) {
      tabTitle.id = tab.id;
    }
    
    // 添加点击事件
    tabTitle.addEventListener('click', (e) => {
      // 找到当前Tab的索引
      const titles = Array.from(tabList.querySelectorAll('.lomui-tab__title'));
      const currentIndex = titles.indexOf(tabTitle);
      this.switchTo(container, currentIndex);
    });
    
    // 创建Tab内容
    const tabContent = document.createElement('div');
    tabContent.classList.add('lomui-tab__content');
    
    // 处理Tab内容
    if (tab.content) {
      if (utils.isElement(tab.content)) {
        tabContent.appendChild(tab.content);
      } else if (typeof tab.content === 'string') {
        tabContent.innerHTML = tab.content;
      }
    }
    
    // 添加到指定位置
    if (insertIndex < tabTitles.length) {
      tabList.insertBefore(tabTitle, tabTitles[insertIndex]);
      contentContainer.insertBefore(tabContent, tabContents[insertIndex]);
    } else {
      tabList.appendChild(tabTitle);
      contentContainer.appendChild(tabContent);
    }
    
    // 更新设置
    if (container.__tabSettings) {
      if (!utils.isArray(container.__tabSettings.tabs)) {
        container.__tabSettings.tabs = [];
      }
      
      container.__tabSettings.tabs.splice(insertIndex, 0, tab);
    }
  }
  
  /**
   * 移除Tab项
   * @param {Element|string} element - DOM元素或选择器
   * @param {number} index - 要移除的Tab索引
   */
  removeTab(element, index) {
    const container = utils.isElement(element) ? element : document.querySelector(element);
    
    if (!container || !container.classList.contains('lomui-tab-container')) {
      console.warn(`[LomUI] Tab container not found: ${element}`);
      return;
    }
    
    const tabList = container.querySelector('.lomui-tab');
    const contentContainer = container.querySelector('.lomui-tab__content-container');
    
    if (!tabList || !contentContainer) {
      console.warn('[LomUI] Invalid tab container structure');
      return;
    }
    
    const tabTitles = tabList.querySelectorAll('.lomui-tab__title');
    const tabContents = contentContainer.querySelectorAll('.lomui-tab__content');
    
    // 验证索引
    if (index < 0 || index >= tabTitles.length) {
      console.warn(`[LomUI] Tab index out of range: ${index}`);
      return;
    }
    
    // 移除标题和内容
    tabList.removeChild(tabTitles[index]);
    contentContainer.removeChild(tabContents[index]);
    
    // 更新设置
    if (container.__tabSettings && utils.isArray(container.__tabSettings.tabs)) {
      container.__tabSettings.tabs.splice(index, 1);
      
      // 如果移除的是当前激活的Tab，切换到第一个Tab
      if (container.__tabSettings.activeIndex === index) {
        if (tabTitles.length > 1) {
          // 如果还有其他Tab，切换到第一个
          this.switchTo(container, 0);
        } else {
          // 如果没有其他Tab，重置激活索引
          container.__tabSettings.activeIndex = -1;
        }
      } else if (container.__tabSettings.activeIndex > index) {
        // 如果激活索引大于移除的索引，调整激活索引
        container.__tabSettings.activeIndex--;
      }
    }
  }
  
  /**
   * 获取所有Tab项
   * @param {Element|string} element - DOM元素或选择器
   * @returns {Array} - Tab项数组
   */
  getTabs(element) {
    const container = utils.isElement(element) ? element : document.querySelector(element);
    
    if (!container || !container.classList.contains('lomui-tab-container')) {
      return [];
    }
    
    const tabs = [];
    const tabTitles = container.querySelectorAll('.lomui-tab__title');
    const tabContents = container.querySelectorAll('.lomui-tab__content');
    
    tabTitles.forEach((title, index) => {
      tabs.push({
        index: index,
        title: title.textContent,
        id: title.id,
        active: title.classList.contains('lomui-tab__title--active'),
        contentElement: tabContents[index]
      });
    });
    
    return tabs;
  }
}

// 创建Tab管理器实例
const tabManager = new TabManager();

// 定义Tab组件
const Tab = {
  /**
   * 创建Tab选项卡
   * @param {Object} options - Tab配置
   * @returns {Element} - Tab容器元素
   */
  create(options) {
    return tabManager.create(options);
  },
  
  /**
   * 切换到指定索引的Tab
   * @param {Element|string} element - DOM元素或选择器
   * @param {number} index - 要切换的Tab索引
   */
  switchTo(element, index) {
    return tabManager.switchTo(element, index);
  },
  
  /**
   * 获取当前激活的Tab索引
   * @param {Element|string} element - DOM元素或选择器
   * @returns {number} - 索引值，未找到返回-1
   */
  getActiveIndex(element) {
    return tabManager.getActiveIndex(element);
  },
  
  /**
   * 添加Tab项
   * @param {Element|string} element - DOM元素或选择器
   * @param {Object} tab - 要添加的Tab配置
   * @param {number} index - 添加位置的索引，默认为末尾
   */
  addTab(element, tab, index) {
    return tabManager.addTab(element, tab, index);
  },
  
  /**
   * 移除Tab项
   * @param {Element|string} element - DOM元素或选择器
   * @param {number} index - 要移除的Tab索引
   */
  removeTab(element, index) {
    return tabManager.removeTab(element, index);
  },
  
  /**
   * 获取所有Tab项
   * @param {Element|string} element - DOM元素或选择器
   * @returns {Array} - Tab项数组
   */
  getTabs(element) {
    return tabManager.getTabs(element);
  },
  
  /**
   * 获取Tab管理器
   * @returns {TabManager} - Tab管理器实例
   */
  getManager() {
    return tabManager;
  }
};

export default Tab;
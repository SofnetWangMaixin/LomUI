/**
 * 弹窗组件
 * 提供消息提示、成功、错误、警告等多种类型的弹窗
 */

import utils from '../utils';

// 弹窗类型
const POPUP_TYPES = ['success', 'error', 'warning', 'info'];

class PopupManager {
  constructor() {
    // 存储当前活跃的弹窗
    this.activePopups = new Map();
    // 弹窗队列
    this.queue = [];
    // 是否正在显示弹窗
    this.isShowing = false;
    // 最大同时显示的弹窗数量
    this.maxVisible = 5;
    // 弹窗默认配置
    this.defaults = {
      content: 'Message',
      type: 'info',
      duration: 3000,
      showClose: false,
      onClose: null,
      onShow: null,
      width: 'auto',
      position: 'top',
      offset: '10%'
    };
  }
  
  /**
   * 创建弹窗
   * @param {Object} options - 弹窗配置
   * @returns {string} - 弹窗ID
   */
  create(options) {
    // 合并配置
    const settings = utils.merge({}, this.defaults, options);
    
    // 验证参数
    if (!utils.isString(settings.content)) {
      throw new Error('[LomUI] Popup content must be a string');
    }
    
    // 验证弹窗类型
    if (!POPUP_TYPES.includes(settings.type)) {
      settings.type = 'info';
    }
    
    // 生成弹窗ID
    const id = utils.generateId();
    
    // 创建弹窗元素
    let popup = document.querySelector('.lomui-popup');
    
    if (!popup) {
      const div = document.createElement('div');
      div.className = 'lomui-popup';
      div.innerHTML = `
        <p class="lomui-popup__content"></p>
        <button class="lomui-popup__close">&times;</button>
      `;
      document.body.appendChild(div);
      popup = div;
    } else {
      popup = popup.cloneNode(true);
      document.body.appendChild(popup);
    }
    
    // 设置弹窗ID
    popup.id = id;
    
    // 设置宽度
    if (settings.width !== 'auto') {
      popup.style.width = settings.width;
    }
    
    // 设置内容
    const contentElement = popup.querySelector('.lomui-popup__content');
    if (contentElement) {
      contentElement.textContent = settings.content;
    }
    
    // 设置位置
    if (settings.position === 'top') {
      popup.style.top = '-10%';
    } else if (settings.position === 'bottom') {
      popup.style.top = '110%';
      popup.style.bottom = '-10%';
      popup.style.top = 'auto';
    }
    
    // 添加类型样式
    POPUP_TYPES.forEach(type => {
      popup.classList.remove(`lomui-popup--${type}`);
    });
    popup.classList.add(`lomui-popup--${settings.type}`);
    
    // 处理关闭按钮
    const closeButton = popup.querySelector('.lomui-popup__close');
    if (closeButton) {
      if (settings.showClose) {
        closeButton.style.display = 'block';
        closeButton.addEventListener('click', () => {
          this.hide(id);
        });
      } else {
        closeButton.style.display = 'none';
      }
    }
    
    // 存储弹窗设置
    this.activePopups.set(id, { element: popup, settings: settings });
    
    return id;
  }
  
  /**
   * 显示弹窗
   * @param {string} id - 弹窗ID
   * @returns {boolean} - 是否显示成功
   */
  show(id) {
    const popupData = this.activePopups.get(id);
    if (!popupData) return false;
    
    const { element, settings } = popupData;
    
    // 显示弹窗
    element.classList.add('lomui-popup--active');
    
    // 调用onShow回调
    if (utils.isFunction(settings.onShow)) {
      setTimeout(() => settings.onShow(id), 10);
    }
    
    // 设置自动关闭
    if (settings.duration > 0) {
      const timeoutId = setTimeout(() => {
        this.hide(id);
      }, settings.duration);
      
      // 存储timeoutId以便后续可能的取消
      popupData.timeoutId = timeoutId;
    }
    
    return true;
  }
  
  /**
   * 隐藏弹窗
   * @param {string} id - 弹窗ID
   * @returns {boolean} - 是否隐藏成功
   */
  hide(id) {
    const popupData = this.activePopups.get(id);
    if (!popupData) return false;
    
    const { element, settings, timeoutId } = popupData;
    
    // 清除定时器
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    // 隐藏弹窗
    element.classList.remove('lomui-popup--active');
    
    // 移除元素（延迟以等待动画完成）
    setTimeout(() => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
      
      // 调用onClose回调
      if (utils.isFunction(settings.onClose)) {
        settings.onClose(id);
      }
      
      // 从活跃弹窗列表中移除
      this.activePopups.delete(id);
      
      // 检查队列中是否有待显示的弹窗
      this.showNext();
    }, 400);
    
    return true;
  }
  
  /**
   * 显示队列中的下一个弹窗
   * @private
   */
  showNext() {
    if (this.queue.length > 0 && this.activePopups.size < this.maxVisible) {
      const nextId = this.queue.shift();
      this.show(nextId);
    }
  }
  
  /**
   * 关闭所有弹窗
   */
  closeAll() {
    for (const id of this.activePopups.keys()) {
      this.hide(id);
    }
    this.queue = [];
  }
}

// 创建弹窗管理器实例
const popupManager = new PopupManager();

// 定义弹窗组件
const Popup = {
  /**
   * 显示消息弹窗
   * @param {string|Object} options - 弹窗内容或配置对象
   * @returns {string} - 弹窗ID
   */
  msg(options) {
    // 支持字符串快捷调用
    if (utils.isString(options)) {
      options = { content: options };
    }
    
    const id = popupManager.create(options);
    
    // 如果当前活跃弹窗数量超过最大值，加入队列
    if (popupManager.activePopups.size > popupManager.maxVisible) {
      popupManager.queue.push(id);
    } else {
      popupManager.show(id);
    }
    
    return id;
  },
  
  /**
   * 显示成功弹窗
   * @param {string|Object} options - 弹窗内容或配置对象
   * @returns {string} - 弹窗ID
   */
  success(options) {
    if (utils.isString(options)) {
      options = { content: options, type: 'success' };
    } else {
      options.type = 'success';
    }
    
    return this.msg(options);
  },
  
  /**
   * 显示错误弹窗
   * @param {string|Object} options - 弹窗内容或配置对象
   * @returns {string} - 弹窗ID
   */
  error(options) {
    if (utils.isString(options)) {
      options = { content: options, type: 'error' };
    } else {
      options.type = 'error';
    }
    
    return this.msg(options);
  },
  
  /**
   * 显示警告弹窗
   * @param {string|Object} options - 弹窗内容或配置对象
   * @returns {string} - 弹窗ID
   */
  warning(options) {
    if (utils.isString(options)) {
      options = { content: options, type: 'warning' };
    } else {
      options.type = 'warning';
    }
    
    return this.msg(options);
  },
  
  /**
   * 显示信息弹窗
   * @param {string|Object} options - 弹窗内容或配置对象
   * @returns {string} - 弹窗ID
   */
  info(options) {
    if (utils.isString(options)) {
      options = { content: options, type: 'info' };
    } else {
      options.type = 'info';
    }
    
    return this.msg(options);
  },
  
  /**
   * 关闭弹窗
   * @param {string} id - 弹窗ID
   * @returns {boolean} - 是否成功关闭
   */
  close(id) {
    return popupManager.hide(id);
  },
  
  /**
   * 关闭所有弹窗
   */
  closeAll() {
    popupManager.closeAll();
  },
  
  /**
   * 获取弹窗管理器
   * @returns {PopupManager} - 弹窗管理器实例
   */
  getManager() {
    return popupManager;
  }
};

export default Popup;
/**
 * Software: [Sofnet LomUI Framework]
 * Author: 王迈新
 * Copyright (c) 2024, www.iorouter.online. All Rights Reserved.
 * Last edit time: 2024-9-28
 */

// 扩展LomUI框架，添加弹窗功能
(function() {
    'use strict';
    
    // 检查LomUI是否已定义
    if (typeof LomUI === 'undefined') {
        console.error('[LomUI] Core framework not found.');
        return;
    }
    
    // 弹窗管理对象
    const PopupManager = {
        // 存储当前活跃的弹窗
        activePopups: new Map(),
        
        // 生成唯一ID
        generateId: function() {
            return 'popup_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
        },
        
        // 创建弹窗
        create: function(options) {
            // 确保options是对象
            options = options || {};
            
            // 设置默认值
            const defaults = {
                content: 'Message',
                type: 'info', // success, error, warning, info
                duration: 3000,
                showClose: false,
                onClose: null,
                onShow: null,
                width: 'auto'
            };
            
            // 合并选项
            const settings = { ...defaults, ...options };
            
            // 验证参数
            if (typeof settings.content !== 'string') {
                throw new Error('[LomUI] Popup content must be a string');
            }
            
            // 生成弹窗ID
            const id = this.generateId();
            
            // 创建弹窗元素
            let popup = LomUI.createPopup();
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
            
            // 添加类型样式
            const types = ['success', 'error', 'warning', 'info'];
            types.forEach(type => {
                popup.classList.remove(`lomui-popup--${type}`);
            });
            if (types.includes(settings.type)) {
                popup.classList.add(`lomui-popup--${settings.type}`);
            }
            
            // 处理背景色适配
            const bodyBg = getComputedStyle(document.body).backgroundColor;
            if (bodyBg === 'rgba(0, 0, 0, 0)') {
                popup.style.backgroundColor = '#f5f5f5';
            }
            
            // 存储弹窗设置
            this.activePopups.set(id, {
                element: popup,
                settings: settings
            });
            
            return id;
        },
        
        // 显示弹窗
        show: function(id) {
            const popupData = this.activePopups.get(id);
            if (!popupData) return false;
            
            const { element, settings } = popupData;
            
            // 显示弹窗
            element.classList.add('lomui-popup--active');
            
            // 调用onShow回调
            if (typeof settings.onShow === 'function') {
                setTimeout(() => settings.onShow(), 10);
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
        },
        
        // 隐藏弹窗
        hide: function(id) {
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
                if (typeof settings.onClose === 'function') {
                    settings.onClose();
                }
                
                // 从活跃弹窗列表中移除
                this.activePopups.delete(id);
            }, 400);
            
            return true;
        },
        
        // 关闭所有弹窗
        closeAll: function() {
            for (const id of this.activePopups.keys()) {
                this.hide(id);
            }
        }
    };
    
    // 扩展LomUI对象，添加弹窗方法
    LomUI.popup = {
        /**
         * 显示消息弹窗
         * @param {string|Object} options - 弹窗内容或配置对象
         * @returns {string} - 弹窗ID
         */
        msg: function(options) {
            // 支持字符串快捷调用
            if (typeof options === 'string') {
                options = { content: options };
            }
            
            const id = PopupManager.create(options);
            PopupManager.show(id);
            return id;
        },
        
        /**
         * 显示成功弹窗
         * @param {string|Object} options - 弹窗内容或配置对象
         * @returns {string} - 弹窗ID
         */
        success: function(options) {
            if (typeof options === 'string') {
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
        error: function(options) {
            if (typeof options === 'string') {
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
        warning: function(options) {
            if (typeof options === 'string') {
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
        info: function(options) {
            if (typeof options === 'string') {
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
        close: function(id) {
            return PopupManager.hide(id);
        },
        
        /**
         * 关闭所有弹窗
         */
        closeAll: function() {
            PopupManager.closeAll();
        }
    };
    
    // 为了向后兼容，保留旧的lomyer对象
    window.lomyer = window.lomyer || {};
    window.lomyer.msg = function(content) {
        return LomUI.popup.msg(content);
    };
})();






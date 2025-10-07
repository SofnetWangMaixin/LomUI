/**
 * Software: [Sofnet LomUI Framework]
 * Author: 王迈新
 * Copyright (c) 2024, www.iorouter.online. All Rights Reserved.
 * Last edit time: 2024-9-28
 */

// 模块化设计 - LomUI核心对象
const LomUI = (function() {
    'use strict';
    
    // 私有变量和方法
    const _private = {
        // 错误处理
        error: function(message) {
            message = message || '[LomUI]Please check the parameters';
            console.error(message);
            throw new Error(message);
        },
        
        // 类型检查
        isString: function(value) {
            return typeof value === 'string';
        },
        
        isObject: function(value) {
            return value !== null && typeof value === 'object' && !Array.isArray(value);
        },
        
        isElement: function(value) {
            return value instanceof Element || value instanceof HTMLDocument;
        },
        
        // DOM操作辅助方法
        addClass: function(element, className) {
            if (_private.isElement(element)) {
                element.classList.add(className);
            }
        },
        
        removeClass: function(element, className) {
            if (_private.isElement(element)) {
                element.classList.remove(className);
            }
        },
        
        hasClass: function(element, className) {
            if (_private.isElement(element)) {
                return element.classList.contains(className);
            }
            return false;
        },
        
        toggleClass: function(element, className) {
            if (_private.isElement(element)) {
                element.classList.toggle(className);
            }
        }
    };
    
    // 公共API
    const publicAPI = {
        /**
         * 错误输出函数
         * @param {string} text - 错误信息
         */
        error: function(text) {
            _private.error(text);
        },
        
        /**
         * 创建弹窗HTML结构
         * @returns {HTMLElement} - 弹窗元素
         */
        createPopup: function() {
            // 检查是否已存在弹窗容器
            let popup = document.querySelector('.lomui-popup');
            
            if (!popup) {
                const div = document.createElement('div');
                div.className = 'lomui-popup';
                div.innerHTML = '<p class="lomui-popup__content" id="popupContent"></p>';
                document.body.appendChild(div);
                popup = div;
            }
            
            return popup;
        },
        
        /**
         * 添加元素点击缩放效果
         * @param {string|Element} selector - 选择器或DOM元素
         * @param {number} duration - 动画持续时间（毫秒）
         */
        addClickEffect: function(selector, duration = 200) {
            const element = typeof selector === 'string' ? document.querySelector(selector) : selector;
            
            if (!_private.isElement(element)) {
                _private.error(`[LomUI] Element not found for selector: ${selector}`);
                return;
            }
            
            element.addEventListener('click', function() {
                _private.addClass(this, 'active');
                setTimeout(() => {
                    _private.removeClass(this, 'active');
                }, duration);
            });
        },
        
        /**
         * 初始化UI组件
         */
        init: function() {
            // 这里可以添加全局初始化代码
            console.log('[LomUI] Framework initialized');
        },
        
        // 暴露类型检查方法
        utils: {
            isString: _private.isString,
            isObject: _private.isObject,
            isElement: _private.isElement,
            addClass: _private.addClass,
            removeClass: _private.removeClass,
            hasClass: _private.hasClass,
            toggleClass: _private.toggleClass
        }
    };
    
    return publicAPI;
})();

// 文档加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    LomUI.init();
    
    // 为示例元素添加点击效果
    LomUI.addClickEffect('#minit_input');
    LomUI.addClickEffect('#minit_btn');
});


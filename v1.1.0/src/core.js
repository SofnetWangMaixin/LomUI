/**
 * LomUI核心模块
 * 提供框架基础功能和初始化逻辑
 */

const core = {
  /**
   * 框架版本号
   * @type {string}
   */
  version: '2.0.0',
  
  /**
   * 框架是否已初始化
   * @type {boolean}
   * @private
   */
  _initialized: false,
  
  /**
   * 框架配置
   * @type {Object}
   * @private
   */
  _config: {
    debug: false
  },
  
  /**
   * 错误处理函数
   * @param {string} message - 错误信息
   * @throws {Error}
   */
  error(message) {
    message = message || '[LomUI] Please check the parameters';
    
    if (this._config.debug) {
      console.error(message);
    }
    
    throw new Error(message);
  },
  
  /**
   * 警告处理函数
   * @param {string} message - 警告信息
   */
  warn(message) {
    message = message || '[LomUI] Warning';
    
    if (this._config.debug) {
      console.warn(message);
    }
  },
  
  /**
   * 设置框架配置
   * @param {Object} config - 配置对象
   */
  configure(config) {
    if (typeof config !== 'object' || config === null) {
      this.warn('[LomUI] Configuration must be an object');
      return;
    }
    
    this._config = { ...this._config, ...config };
  },
  
  /**
   * 获取框架配置
   * @returns {Object} - 配置对象
   */
  getConfig() {
    return { ...this._config };
  },
  
  /**
   * 初始化框架
   * @returns {boolean} - 是否初始化成功
   */
  init() {
    if (this._initialized) {
      this.warn('[LomUI] Framework already initialized');
      return false;
    }
    
    // 初始化所有组件
    this._initializeComponents();
    
    this._initialized = true;
    
    if (this._config.debug) {
      console.log('[LomUI] Framework initialized successfully');
    }
    
    return true;
  },
  
  /**
   * 初始化所有组件
   * @private
   */
  _initializeComponents() {
    // 这里可以添加全局组件初始化逻辑
  },
  
  /**
   * 检查框架是否已初始化
   * @returns {boolean}
   */
  isInitialized() {
    return this._initialized;
  }
};

export default core;
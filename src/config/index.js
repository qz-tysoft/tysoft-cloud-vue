/**
 * @description 系统全局配置
 */
export default {

    /**
     * @description 开发环境的BASE_API
     */
    dev_base_api:'"http://127.0.0.1:8008/tysoft"',

    /**
     * @description 生产环境的BASE_API
     */
    pro_base_api:'"http://127.0.0.1:8008/tysoft"',

    /**
     * @description 请求超时时间，毫秒（默认2分钟）
     */
    timeout: 1200000,

    /**
     * @description token key
     */
    TokenKey: 'tysoft-cloud-token',

    /**
     * @description 记住密码状态下的token在Cookie中存储的天数，默认1天
     */
    tokenCookieExpires: 1,

    /**
     * @description 记住密码状态下的密码在Cookie中存储的天数，默认1天
     */
    passCookieExpires: 1,

}

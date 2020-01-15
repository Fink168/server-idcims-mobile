/**
 * 格式化日期 格式 yyyy-MM-dd
 * @param {Object} myTime
 */
export function formatDate(myTime) {
    let date = new Date(myTime);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = date.getDate();
    let str = (Y + M + D)
    return str;
};

/**
 * 格式化时间 格式 yyyy-MM-dd hh:mm:ss
 * @param {Object} myTime
 */
export function formatDateTime(myTime) {
    let date = new Date(myTime);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = date.getDate() + ' ';
    let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    let str = (Y + M + D + h + m + s)
    return str;
};

/**
 * 是否为空判断
 * @param {Object|String|Nunber|...} val 
 */
export function isEmpty(val) {
    if (val instanceof Array) {
        if (val.length === 0) return true
    } else if (val instanceof Object) {
        if (JSON.stringify(val) === '{}') return true
    } else {
        if (val === 'null' || val === null || val === 'undefined' || val === undefined || val === '') return true
        return false
    }
    return false
}
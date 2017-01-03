"use strict";

const crypto = require('crypto');
const util = require('util');
const _ = require('underscore');

const mod = {

  /**
   * md5加密
   * @param str
   * @returns {*}
   */
  md5(str) {
    const md5sum = crypto.createHash('md5');
    md5sum.update(str);
    str = md5sum.digest('hex');
    return str;
  },
  /**
   * [res description]
   * resJSON(0, {msg: '登录成功'});
   * @param  {[type]} status [description]
   * @param  {[type]} o      [description]
   * @return {[type]}        [description]
   */
  res(status, o) {
    let code = 0; // 状态码
    const result = {};
    if (typeof status === 'number') {
      code = status;
    }
    // 返回处理之后的状态码和数据
    return { code, data };
  }
};

_.extend(mod, util);

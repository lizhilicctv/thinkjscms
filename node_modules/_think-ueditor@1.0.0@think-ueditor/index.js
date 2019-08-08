const helper = require('think-helper');
const path = require('path');
const fs = require('fs');

const config = require('./config');

class ThinkUeditor {
  constructor(ctx) {
    this.ctx = ctx;
  }

  init() {
    const param = this.ctx.param();

    if (param.action === 'config') {
      return config;
    }

    if (param.action === 'uploadimage' || param.action === 'uploadfile' || param.action === 'uploadvideo') {
      const file = this.ctx.file('upfile');
      const filepath = file.path;
      const nameArr = file.name.split('.');
      const basename = path.basename(filepath) + '.' + nameArr[nameArr.length - 1];
      const YYYYMMDD = helper.datetime(Date.now(), 'YYYYMMDD');
      const staticPath = path.resolve(think.ROOT_PATH, 'www/static');
      const uploadPath = path.resolve(staticPath, 'upload');
      const relativePath = path.resolve(uploadPath, YYYYMMDD);

      // 文件夹不存在则创建
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath);
      }

      if (!fs.existsSync(relativePath)) {
        fs.mkdirSync(relativePath);
      }

      fs.renameSync(filepath, path.resolve(relativePath, `${basename}`));

      return {
        state: 'SUCCESS',
        url: `/static/upload/${YYYYMMDD}/${basename}`,
        title: basename,
        original: file.name
      };
    }
  }
}

module.exports = ThinkUeditor;

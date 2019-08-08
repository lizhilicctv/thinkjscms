const fileCache = require('think-cache-file');
const nunjucks = require('think-view-nunjucks');
const fileSession = require('think-session-file');
const mysql = require('think-model-mysql');
const {Console, File, DateFile} = require('think-logger3');
const path = require('path');
const isDev = think.env === 'development';

/**
 * cache adapter config
 * @type {Object}
 */
exports.cache = {
  type: 'file',
  common: {
    timeout: 24 * 60 * 60 * 1000 // millisecond
  },
  file: {
    handle: fileCache,
    cachePath: path.join(think.ROOT_PATH, 'runtime/cache'), // absoulte path is necessarily required
    pathDepth: 1,
    gcInterval: 24 * 60 * 60 * 1000 // gc interval
  }
};

/**
 * model adapter config
 * @type {Object}
 */
exports.model = {
  type: 'mysql',
  common: {
    logConnect: isDev,
    logSql: isDev,
    logger: msg => think.logger.info(msg)
  },
  mysql: {
    handle: mysql,
    database: 'nodecms',
    prefix: 'lizhili_',
    encoding: 'utf8',
    host: '127.0.0.1',
    port: '',
    user: 'root',
    password: 'root',
    dateStrings: true
  }
};

/**
 * session adapter config
 * @type {Object}
 */
exports.session = {
  type: 'file',
  common: {
    cookie: {
      name: 'thinkjs',
      timeout: 24 * 3600, //过期时间，默认为一天
      // keys: ['werwer', 'werwer'],
      // signed: true
    }
  },
  file: {
    handle: fileSession,
    sessionPath: path.join(think.ROOT_PATH, 'runtime/session')
  }
};

/**
 * view adapter config
 * @type {Object}
 */
exports.view = {
  type: 'nunjucks',
  common: {
    viewPath: path.join(think.ROOT_PATH, 'view'),
    sep: '_',
    extname: '.html'
  },
  nunjucks: {
    handle: nunjucks,
    beforeRender(env, nunjucks, config) {
      env.addFilter('utc', time => (new Date(time)).toLocaleString());
      env.addFilter('tonow', time => {
        let shi= (new Date()-time)/1000;
        let days = Math.floor(shi/86400);
        let remain = shi % 86400;
        let hours = Math.floor(remain/3600);
        remain = shi%3600;
        let mins = Math.floor(remain/60);
        let secs = Math.floor(shi%60);
      	return days+'天'+hours+'小时'+mins+'分钟'+secs+'秒';
      });
      env.addFilter('stingtoshi', str => {
        str = str.replace(/&/g, '&amp;');
				str = str.replace(/</g, '&lt;');
				str = str.replace(/>/g, '&gt;');
				str = str.replace(/"/g, '&quot;');
				str = str.replace(/'/g, '&#039;');
				return str;
      });
      env.addFilter('shitosting', str => {
        if(!str){ return ''; }
        str = str.replace(/&amp;/g, '&');
				str = str.replace(/&lt;/g, '<');
				str = str.replace(/&gt;/g, '>');
				str = str.replace(/&quot;/g, '"');
				str = str.replace(/&#039;/g, "'");
				return str;
      });
      env.addFilter('chongfu', (str,chuan) => {
				return chuan.repeat(str);
      });
    }
  }
  
};

/**
 * logger adapter config
 * @type {Object}
 */
exports.logger = {
  type: isDev ? 'console' : 'dateFile',
  console: {
    handle: Console
  },
  file: {
    handle: File,
    backups: 10, // max chunk number
    absolute: true,
    maxLogSize: 50 * 1024, // 50M
    filename: path.join(think.ROOT_PATH, 'logs/app.log')
  },
  dateFile: {
    handle: DateFile,
    level: 'ALL',
    absolute: true,
    pattern: '-yyyy-MM-dd',
    alwaysIncludePattern: true,
    filename: path.join(think.ROOT_PATH, 'logs/app.log')
  }
};

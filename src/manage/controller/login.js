const Base = require('./base.js');
const ThinkSvgCaptcha = require('./ThinkSvgCaptcha.js');
module.exports = class extends Base {
  async indexAction() {
    if (this.isPost){//判断是否发送信息给后台了，post数据过来.注意：isPost中的P是大写，js是对大小写敏感的。 
      //判断验证码是否正确
      const yzm = await this.session('yzm');
      if(this.post('coder').toLowerCase() != yzm){
        this.body='<script>alert("验证码不正确！");history.go(-1)</script>';
        return
      }
      this.session('yzm', null);
      let username = this.post('username');
      let password = think.md5(think.md5(this.post('password')).slice(0,25)+"lizhili");  //这里进行计算
      let data = await this.model('admin').where({username:username,password:password}).find();
      if (think.isEmpty(data)){//这里我直接用isEmpty居然不能用。查了下资料需要用think.isEmpty()  
        this.body='<script>alert("账号秘密错误！");history.go(-1)</script>';
        return 
      }else{ 
        //获取ip地址,并添加到数据库
        const now = Date.parse(new Date())/1000;
        const ben_ip= (this.ip).slice(7)
        await this.model('log').add({username:username, ip: ben_ip,in_time:now,up_time:now});

        await this.session('admin_name',data.username); 
        await this.session('admin_id',data.id);
           return this.redirect('/manage/index/index');
      }  
    }  
    return this.display();
  }
  async erweimaAction() {
    const defaultOptions = {
      size: 4, // size of random string
      ignoreChars: '', // filter out some characters
      noise: 5, // number of noise lines
      color: "", // default grey, true if background option is set
      background: '#ffffff', // background color of the svg image
      width: 150, // width of captcha
      height: 40, // height of captcha
      fontPath: '', // your font path
      fontSize: 50, // captcha text size
      charPreset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' // random character preset
    }
    let captcha = new ThinkSvgCaptcha(defaultOptions);
    let wo= captcha.create(); // returns an object that has the following property: {data: 'svg path data', text: 'captcha text'}
    await this.session('yzm', (wo.text).toLowerCase()); //设置验证码
    this.type = 'svg'
    this.body=wo.data
  }
  async logoutAction(){  
    await this.session('admin_name',null); 
    await this.session('admin_id',null);
    return this.redirect('/manage/index/index');
  } 
};

module.exports = class extends think.Logic {
  addAction() {
    if(this.isPost) {
      let rules = {
        username: {
          required: true,
          byteLength: {min: 2, max: 16}
        },
        phone:{
          required: true,
          mobile:true
        },
        email:{
          required:true,
          email:true,
        },
      }
      let msgs = {
        username: {
          required: '用户名为必填项',
          byteLength: '用户名长度为2-16个字符。'    
        },
        phone:{
          required: '手机号必须填写',
          mobile:'手机号格式不正确'
        },
        email:{
          required:'邮箱必须填写',
          email:'邮箱格式不正确'
        },
      }
      let flag = this.validate(rules,msgs);
      if(!flag){
        return this.fail(this.config('validateDefaultErrno') , this.validateErrors);
      }
    }
  }
};

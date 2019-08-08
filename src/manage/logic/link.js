module.exports = class extends think.Logic {
  addAction() {
    if(this.isPost) {
      let rules = {
        linkurl: {
          required: true,
          url: true
        },
      }
      let msgs = {
        linkurl: {
          required: '网站地址为必填项',
          url: '网站格式不正确'    
        }
      }
      let flag = this.validate(rules,msgs);
      if(!flag){
        return this.fail(this.config('validateDefaultErrno') , this.validateErrors);
      }
    }
  }
};

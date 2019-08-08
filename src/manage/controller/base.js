module.exports = class extends think.Controller {
  async __before() {
    if(this.ctx.controller === 'login' && (this.ctx.action === 'index' || this.ctx.action === 'erweima')){ 
      return;   //这里直接结束了
    } 
    let user_name =await this.session('admin_name');
    let user_id =await this.session('admin_id');
    if (think.isEmpty(user_name) || think.isEmpty(user_id)){  
      return this.redirect('/manage/login');  
    }else{
      //这里计算 留言和 评论数量

      let message_num= await this.model('message').where({isopen:0}).count('id');
      let comment_num= await this.model('comment').where({isopen:-1}).count('id');

      this.assign({
        user_name: user_name, 
        message_num: message_num,
        comment_num: comment_num
      }); 
    }
  }
};

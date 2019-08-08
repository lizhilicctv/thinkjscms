const Base = require('./base.js');
module.exports = class extends Base {
  async indexAction() {
    const count = await this.model("message").count('id');
    this.assign('count', count);
    //查看当前分页数
    let page =1;
    let maxpage=Math.ceil(count/10);//向上取整
    if(this.get('page')){ //获取传过来的分页值
      page=this.get('page');
    }
    let html='<div id="page">';
    for(let i=1;i<=maxpage;i++){
      if(page==i){
        html+='<a class="xuan" href="/manage/message/index?page='+i+'">'+i+'</a>';
      }else{
        html+='<a href="/manage/message/index?page='+i+'">'+i+'</a>';
      }
    }
    html+='</div>'
    this.assign('html', html);
    //这里判断搜索
    if (this.isPost){
      let key= this.post('key');
     const member=await this.model('message').where({'neirong': ['like', '%'+key+'%']}).page(page, 10).select();//默认分页，每页有10个
     this.assign('message', member);
    }else{
      //查询所有会员 
     const member=await this.model('message').page(page, 10).select();//默认分页，每页有10个
     this.assign('message', member);
    }
    return this.display();
  }
 
  async editAction() {
    if (this.isPost){//判断是否发送信息给后台了，post数据过来.注意：isPost中的P是大写，js是对大小写敏感的。 
      let data = this.post(); //这里包含所用的值
      //这里是数据规整
      data.up_time=Date.parse(new Date())/1000;
      let model = this.model('message');
      let insertId = await model.where({id:data.id}).update(data);
      if(insertId){
        let message_num= await this.model('message').where({isopen:0}).count('id');
        this.body='<script>alert("你好，修改成功了！");parent.parent.document.getElementById("lizhili_liu").innerHTML="留'+message_num+'";parent.location.reload()</script>';
        return;
      }else{
        this.body='<script>alert("修改失败了！");history.go(-1)</script>';
        return;
      }
    }  
    const data = await this.model("message").where({'id':this.get('id')}).find();
    this.assign('data', data);
    return this.display();
  }

  async ajaxAction() {
    if (this.isPost){//判断是否发送信息给后台了，post数据过来.注意：isPost中的P是大写，js是对大小写敏感的。 
      let data = this.post(); //这里包含所用的值
      if(data.type=='message_del'){
        let model = this.model('message');
        let affectedRows = await model.where({id: data.id}).delete();
        if(affectedRows){
          let message_num= await this.model('message').where({isopen:0}).count('id');
          this.success('',{num:message_num})
        }else{
          this.fail()
        }
        return;
      }
      this.fail()
    }
  }
 
};

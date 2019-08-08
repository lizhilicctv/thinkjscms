const Base = require('./base.js');
module.exports = class extends Base {
  async indexAction() {
    const count = await this.model("comment").count('id');
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
        html+='<a class="xuan" href="/manage/comment/index?page='+i+'">'+i+'</a>';
      }else{
        html+='<a href="/manage/comment/index?page='+i+'">'+i+'</a>';
      }
    }
    html+='</div>'
    this.assign('html', html);

    //这里判断搜索
    if (this.isPost){
      let key= this.post('key');
     const member=await this.model('comment').alias('c').join([
      'lizhili_member as m ON m.id=c.member_id',
      'lizhili_article as a ON a.id=c.article_id'
    ]).field('c.*,m.username,a.title').where({'content': ['like', '%'+key+'%']}).page(page, 10).select();//默认分页，每页有10个
     this.assign('comment', member);
    }else{
      //查询所有会员 
     const member=await this.model('comment').alias('c').join([
                'lizhili_member as m ON m.id=c.member_id',
                'lizhili_article as a ON a.id=c.article_id'
              ]).field('c.*,m.username,a.title').page(page, 10).select();//默认分页，每页有10个
     this.assign('comment', member);
    }
    return this.display();
  }
 
  async editAction() {
    if (this.isPost){//判断是否发送信息给后台了，post数据过来.注意：isPost中的P是大写，js是对大小写敏感的。 
      let data = this.post(); //这里包含所用的值
      //这里是数据规整
      data.up_time=Date.parse(new Date())/1000;
      let model = this.model('comment');
      let insertId = await model.where({id:data.id}).update(data);
      if(insertId){
        let comment_num= await this.model('comment').where({isopen:-1}).count('id');
        this.body='<script>alert("你好，修改成功了！");parent.parent.document.getElementById("lizhili_ping").innerHTML="评'+comment_num+'";parent.location.reload()</script>';
        return;
      }else{
        this.body='<script>alert("修改失败了！");history.go(-1)</script>';
        return;
      }
    }  
    const data = await this.model("comment").alias('c').join('lizhili_member as m ON c.member_id=m.id').field('c.*,m.username').where({'c.id':this.get('id')}).find();
    this.assign('data', data);
    return this.display();
  }

  async ajaxAction() {
    if (this.isPost){//判断是否发送信息给后台了，post数据过来.注意：isPost中的P是大写，js是对大小写敏感的。 
      let data = this.post(); //这里包含所用的值
      if(data.type=='comment_all'){
          let arr=data.id.split('-');
        for (const key in arr) {
          await this.model('comment').where({id: arr[key]}).delete();
        }
        let comment_num= await this.model('comment').where({isopen:-1}).count('id');
          this.success('',{num:comment_num})
        return;
      }
      if(data.type=='comment_del'){
        let model = this.model('comment');
        let affectedRows = await model.where({id: data.id}).delete();
        if(affectedRows){
          let comment_num= await this.model('comment').where({isopen:-1}).count('id');
          this.success('',{num:comment_num})
        }else{
          this.fail()
        }
        return;
      }
      this.fail()
    }
  }
 
};

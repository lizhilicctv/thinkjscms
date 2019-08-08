const path = require('path');
const fs = require('fs');
const Base = require('./base.js');
module.exports = class extends Base {
  async indexAction() {
    const count = await this.model("link").count('id');
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
        html+='<a class="xuan" href="/manage/link/index?page='+i+'">'+i+'</a>';
      }else{
        html+='<a href="/manage/link/index?page='+i+'">'+i+'</a>';
      }
    }
    html+='</div>'
    this.assign('html', html);

    //这里判断搜索
    if (this.isPost){
      let key= this.post('key');
     const member=await this.model('link').where({'title': ['like', '%'+key+'%']}).order('sort asc').page(page, 10).select();//默认分页，每页有10个
     this.assign('link', member);
    }else{
      //查询所有会员 
     const member=await this.model('link').order('sort asc').page(page, 10).select();//默认分页，每页有10个
     this.assign('link', member);
    }
    return this.display();
  }
 
  async addAction() {
    if (this.isPost){//判断是否发送信息给后台了，post数据过来.注意：isPost中的P是大写，js是对大小写敏感的。 
      let data = this.post(); //这里包含所用的值
      //这里是数据规整
      
      if(this.file('pic').size > 0){
        var uploadPath = think.ROOT_PATH + '/www/static/link';
        think.mkdir(uploadPath);
        let name =  (new Date()).valueOf();
        var readStream=fs.createReadStream(this.file('pic').path);
        var writeStream=fs.createWriteStream(uploadPath + '/' + name+".jpg");
        readStream.pipe(writeStream);
        data.pic='/static/link/'+name+".jpg"
      }

      data.in_time=Date.parse(new Date())/1000;
      data.up_time=Date.parse(new Date())/1000;
      let model = this.model('link');
      let insertId = await model.add(data);
      if(insertId){
        this.body='<script>alert("你好，添加成功了！");parent.location.reload()</script>';
        return;
      }else{
        this.body='<script>alert("添加失败了！");location.reload()</script>';
        return;
      }
    } 
    return this.display();
  }
  
  async editAction() {
    if (this.isPost){//判断是否发送信息给后台了，post数据过来.注意：isPost中的P是大写，js是对大小写敏感的。 
      let data = this.post(); //这里包含所用的值
      //这里是数据规整
      if(this.file('pic').size > 0){
        var uploadPath = think.ROOT_PATH + '/www/static/link';
        think.mkdir(uploadPath);
        let name =  (new Date()).valueOf();
        var readStream=fs.createReadStream(this.file('pic').path);
        var writeStream=fs.createWriteStream(uploadPath + '/' + name+".jpg");
        readStream.pipe(writeStream);
        data.pic='/static/link/'+name+".jpg"
      }
      data.up_time=Date.parse(new Date())/1000;
      let model = this.model('link');
      let insertId = await model.where({id:data.id}).update(data);
      if(insertId){
        this.body='<script>alert("你好，修改成功了！");parent.location.reload()</script>';
        return;
      }else{
        this.body='<script>alert("修改失败了！");history.go(-1)</script>';
        return;
      }
    }  
    const data = await this.model("link").where({id:this.get('id')}).find();
    this.assign('data', data);
    return this.display();
  }

  async ajaxAction() {
    if (this.isPost){//判断是否发送信息给后台了，post数据过来.注意：isPost中的P是大写，js是对大小写敏感的。 
      let data = this.post(); //这里包含所用的值
      if(data.type=='link_sort'){
          let idarr=data.id.split('-');
          let sortarr=data.sort.split('-');
        for (const key in idarr) {
          await this.model('link').where({id: idarr[key]}).update({up_time:Date.parse(new Date())/1000,sort:sortarr[key]});
        }
        this.success();
        return;
      }
      if(data.type=='link_del'){
        let model = this.model('link');
        let affectedRows = await model.where({id: data.id}).delete();
        if(affectedRows){
          this.success()
        }else{
          this.fail()
        }
        return;
      }
      this.fail()
    }
  }
  async strtoshi(str){
    str = str.replace(/&/g, '&amp;');
    str = str.replace(/</g, '&lt;');
    str = str.replace(/>/g, '&gt;');
    str = str.replace(/"/g, '&quot;');
    str = str.replace(/'/g, '&#039;');
    return str;
  }
};

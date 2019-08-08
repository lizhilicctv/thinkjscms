const path = require('path');
const fs = require('fs');
const Base = require('./base.js');
module.exports = class extends Base {
  async indexAction() {
    const count = await this.model("adposition").count('id');
    this.assign('count', count);
    //这里判断搜索
    if (this.isPost){
      let key= this.post('key');
     const adposition=await this.model('adposition').where({'ad_title': ['like', '%'+key+'%']}).order('sort asc').select();//默认分页，每页有10个
     this.assign('adposition', adposition);
    }else{
     const adposition=await this.model('adposition').order('sort asc').select();
     this.assign('adposition', adposition);
    }
    return this.display();
  }
 
  async addAction() {
    if (this.isPost){//判断是否发送信息给后台了，post数据过来.注意：isPost中的P是大写，js是对大小写敏感的。 
      let data = this.post(); //这里包含所用的值
      //这里是数据规整
      if(this.file('pic').size > 0){
        var uploadPath = think.ROOT_PATH + '/www/static/adposition';
        think.mkdir(uploadPath);
        let name =  (new Date()).valueOf();
        var readStream=fs.createReadStream(this.file('pic').path);
        var writeStream=fs.createWriteStream(uploadPath + '/' + name+".jpg");
        readStream.pipe(writeStream);
        data.pic='/static/adposition/'+name+".jpg"
      }
      data.isopen= data.isopen ? 1 : 0 ;
      data.in_time=Date.parse(new Date())/1000;
      data.up_time=Date.parse(new Date())/1000;
      let model = this.model('adposition');
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
        var uploadPath = think.ROOT_PATH + '/www/static/adposition';
        think.mkdir(uploadPath);
        let name =  (new Date()).valueOf();
        var readStream=fs.createReadStream(this.file('pic').path);
        var writeStream=fs.createWriteStream(uploadPath + '/' + name+".jpg");
        readStream.pipe(writeStream);
        data.pic='/static/adposition/'+name+".jpg"
      }
      data.isopen= data.isopen ? 1 : 0 ;
      data.up_time=Date.parse(new Date())/1000;
      let model = this.model('adposition');
      let insertId = await model.where({id:data.id}).update(data);
      if(insertId){
        this.body='<script>alert("你好，修改成功了！");parent.location.reload()</script>';
        return;
      }else{
        this.body='<script>alert("修改失败了！");location.reload()</script>';
        return;
      }
    }  
    const data = await this.model("adposition").where({id:this.get('id')}).find();
    this.assign('data', data);
    return this.display();
  }

  async ajaxAction() {
    if (this.isPost){//判断是否发送信息给后台了，post数据过来.注意：isPost中的P是大写，js是对大小写敏感的。 
      let data = this.post(); //这里包含所用的值
      if(data.type=='adposition_sort'){
          let idarr=data.id.split('-');
          let sortarr=data.sort.split('-');
        for (const key in idarr) {
          await this.model('adposition').where({id: idarr[key]}).update({up_time:Date.parse(new Date())/1000,sort:sortarr[key]});
        }
        this.success();
        return;
      }
      if(data.type=='adposition_del'){
        let model = this.model('adposition');
        let affectedRows = await model.where({id: data.id}).delete();
        if(affectedRows){
          this.success()
        }else{
          this.fail()
        }
        return;
      }
      if(data.type=='adposition_start'){
        let model = this.model('adposition');
        let affectedRows = await model.where({id: data.id}).update({isopen:1});
        if(affectedRows){
          this.success()
        }else{
          this.fail()
        }
        return;
      }
      if(data.type=='adposition_stop'){
        let model = this.model('adposition');
        let affectedRows = await model.where({id: data.id}).update({isopen: 0});
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
};

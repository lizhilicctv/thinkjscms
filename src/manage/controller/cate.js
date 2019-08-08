const Base = require('./base.js');
module.exports = class extends Base {
  async indexAction() {
    const count = await this.model("cate").count('id');
    this.assign('count', count);
    //这里判断搜索
    if (this.isPost){
      let key= this.post('key');
     const cate=await this.model('cate').where({'catename': ['like', '%'+key+'%']}).order('sort asc').select();//默认分页，每页有10个
     let shuju= await this.model('cate').getall(cate);
     this.assign('cate', shuju);
    }else{
     const cate=await this.model('cate').order('sort asc').select();
     let shuju= await this.model('cate').getall(cate);
     this.assign('cate', shuju);
    }
    return this.display();
  }
 
  async addAction() {
    if (this.isPost){//判断是否发送信息给后台了，post数据过来.注意：isPost中的P是大写，js是对大小写敏感的。 
      let data = this.post(); //这里包含所用的值
      //这里是数据规整
      if(data.editorValue){
        data.editorValue=await this.strtoshi(data.editorValue);
      }
      data.in_time=Date.parse(new Date())/1000;
      data.up_time=Date.parse(new Date())/1000;
      let model = this.model('cate');
      let insertId = await model.add(data);
      if(insertId){
        this.body='<script>alert("你好，添加成功了！");parent.location.reload()</script>';
        return;
      }else{
        this.body='<script>alert("添加失败了！");location.reload()</script>';
        return;
      }
    }  
    const cate=await this.model('cate').select();
     let shuju= await this.model('cate').getall(cate);
     this.assign('cate', shuju);

    return this.display();
  }
  
  async editAction() {
    if (this.isPost){//判断是否发送信息给后台了，post数据过来.注意：isPost中的P是大写，js是对大小写敏感的。 
      let data = this.post(); //这里包含所用的值
      //这里是数据规整
      if(data.editorValue){
        data.editorValue=await this.strtoshi(data.editorValue);
      }
      data.up_time=Date.parse(new Date())/1000;
      let model = this.model('cate');
      let insertId = await model.where({id:data.id}).update(data);
      if(insertId){
        this.body='<script>alert("你好，修改成功了！");parent.location.reload()</script>';
        return;
      }else{
        this.body='<script>alert("修改失败了！");location.reload()</script>';
        return;
      }
    }  
    const cate=await this.model('cate').select();
     let shuju= await this.model('cate').getall(cate);
     this.assign('cate', shuju);
    const data = await this.model("cate").where({id:this.get('id')}).find();
    this.assign('data', data);
    return this.display();
  }

  async ajaxAction() {
    if (this.isPost){//判断是否发送信息给后台了，post数据过来.注意：isPost中的P是大写，js是对大小写敏感的。 
      let data = this.post(); //这里包含所用的值
      if(data.type=='cate_sort'){
          let idarr=data.id.split('-');
          let sortarr=data.sort.split('-');
        for (const key in idarr) {
          await this.model('cate').where({id: idarr[key]}).update({up_time:Date.parse(new Date())/1000,sort:sortarr[key]});
        }
        this.success();
        return;
      }
      if(data.type=='cate_del'){
        let model = this.model('cate');
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

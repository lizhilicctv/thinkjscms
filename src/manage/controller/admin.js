const Base = require('./base.js');
module.exports = class extends Base {
  async indexAction() {
    const count = await this.model("admin").count('id');
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
        html+='<a class="xuan" href="/manage/admin/index?page='+i+'">'+i+'</a>';
      }else{
        html+='<a href="/manage/admin/index?page='+i+'">'+i+'</a>';
      }
    }
    html+='</div>'
    this.assign('html', html);

    //这里判断搜索
    if (this.isPost){
      let key= this.post('key');
     const member=await this.model('admin').where({'username': ['like', '%'+key+'%']}).page(page, 10).select();//默认分页，每页有10个
     this.assign('member', member);
    }else{
      //查询所有会员 
     const member=await this.model('admin').page(page, 10).select();//默认分页，每页有10个
     this.assign('member', member);
    }
    return this.display();

  }
  async logAction() {
    const count = await this.model("log").count('id');
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
        html+='<a class="xuan" href="/manage/admin/log?page='+i+'">'+i+'</a>';
      }else{
        html+='<a href="/manage/admin/log?page='+i+'">'+i+'</a>';
      }
    }
    html+='</div>'
    this.assign('html', html);

    //这里判断搜索
    if (this.isPost){
      let key= this.post('key');
     const member=await this.model('log').where({'username': ['like', '%'+key+'%']}).page(page, 10).select();//默认分页，每页有10个
     this.assign('member', member);
    }else{
      //查询所有会员 
     const member=await this.model('log').page(page, 10).order('id desc').select();//默认分页，每页有10个
     this.assign('member', member);
    }
    return this.display();
  }
  async caheAction() {
    await this.cache('name', null);
    this.body='<script>alert("清除成功了！"); location.href="/manage/index/main";</script>';
    //this.redirect('/manage/index/main');
    return
  }
  async addAction() {
    if (this.isPost){//判断是否发送信息给后台了，post数据过来.注意：isPost中的P是大写，js是对大小写敏感的。 
      let data = this.post(); //这里包含所用的值
      if(!data.password && (data.password != data.password2)){
        this.body='<script>alert("两次密码不一致！");history.go(-1)</script>';
        return
      }
      //这里是数据规整
			data.isopen=1;
      data.role=1;
      data.password = think.md5(think.md5(this.post('password')).slice(0,25)+"lizhili");
      data.in_time=Date.parse(new Date())/1000;
      data.up_time=Date.parse(new Date())/1000;
      let insertId = await this.model('admin').getadd(data);
      if(insertId){
        this.body='<script>alert("你好，添加成功了！");parent.location.reload()</script>';
        return;
      }else{
        this.body='<script>alert("添加失败了！");history.go(-1)</script>';
        return;
      }
    }  
    return this.display();
  }
  async editAction() {
    if (this.isPost){//判断是否发送信息给后台了，post数据过来.注意：isPost中的P是大写，js是对大小写敏感的。 
      let data = this.post(); //这里包含所用的值
      //这里是数据规整
      data.isopen=1;
      if(!data.password){
       delete data.password 
      }else{
        data.password = think.md5(think.md5(this.post('password')).slice(0,25)+"lizhili");
      }
      data.up_time=Date.parse(new Date())/1000;
      let model = this.model('admin');
      let affectedRows = await model.where({id: data.id}).update(data);
      if(affectedRows){
        this.body='<script>alert("你好，修改成功了！");parent.location.reload()</script>';
        return;
      }else{
        this.body='<script>alert("修改失败了！");history.go(-1)</script>';
        return;
      }
    }  
    const data = await this.model("admin").where({id:this.get('id')}).find();
    this.assign('data', data);
    return this.display();
  }
  async ajaxAction() {
    if (this.isPost){//判断是否发送信息给后台了，post数据过来.注意：isPost中的P是大写，js是对大小写敏感的。 
      let data = this.post(); //这里包含所用的值



      if(data.type=='admin_all'){
        let arr=data.id.split('-');
        for (const key in arr) {
          await this.model('admin').where({id: arr[key]}).delete();
        }
        this.success();
        return;
      }
      if(data.type=='admin_del'){
        let model = this.model('admin');
      let affectedRows = await model.where({id: data.id}).delete();
        if(affectedRows){
          this.success()
        }else{
          this.fail()
        }
        return;
      }
      if(data.type=='admin_start'){
        let model = this.model('admin');
      let affectedRows = await model.where({id: data.id}).update({isopen:1});
        if(affectedRows){
          this.success()
        }else{
          this.fail()
        }
        return;
      }
      if(data.type=='admin_stop'){
        let model = this.model('admin');
      let affectedRows = await model.where({id: data.id}).update({isopen:0});
        if(affectedRows){
          this.success()
        }else{
          this.fail()
        }
        return;
      }



     if(data.type=='admin_all'){
       let arr=data.id.split('-');
      for (const key in arr) {
        await this.model('log').where({id: arr[key]}).delete();
      }
      this.success();
      return;
		}
		if(data.type=='log_del'){
			let model = this.model('log');
     // let affectedRows = await model.where({id: data.id}).delete();
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
};

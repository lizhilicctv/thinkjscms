const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    const count = await this.model("member").where({del_time:null}).count('id');
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
        html+='<a class="xuan" href="/manage/member/index?page='+i+'">'+i+'</a>';
      }else{
        html+='<a href="/manage/member/index?page='+i+'">'+i+'</a>';
      }
    }
    html+='</div>'
    this.assign('html', html);

    //这里判断搜索
    if (this.isPost){
      let key= this.post('key');
     const member=await this.model('member').where({del_time: null}).where({'username|phone': ['like', '%'+key+'%']}).page(page, 10).select();//默认分页，每页有10个
     this.assign('member', member);
    }else{
      //查询所有会员 
     const member=await this.model('member').where({del_time: null}).page(page, 10).select();//默认分页，每页有10个
     this.assign('member', member);
    }
    return this.display();
  }
  async shanAction() {
    const count = await this.model("member").where({del_time: ['!=', null]}).count('id');
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
        html+='<a class="xuan" href="/manage/member/shan?page='+i+'">'+i+'</a>';
      }else{
        html+='<a href="/manage/member/shan?page='+i+'">'+i+'</a>';
      }
    }
    html+='</div>'
    this.assign('html', html);

    //这里判断搜索
    if (this.isPost){
      let key= this.post('key');
     const member=await this.model('member').where({del_time: ['!=', null]}).where({'username|phone': ['like', '%'+key+'%']}).page(page, 10).select();//默认分页，每页有10个
     this.assign('member', member);
    }else{
      //查询所有会员 
     const member=await this.model('member').where({del_time: ['!=', null]}).page(page, 10).select();//默认分页，每页有10个
     this.assign('member', member);
    }
    return this.display();
  }
  async addAction() {
    if (this.isPost){//判断是否发送信息给后台了，post数据过来.注意：isPost中的P是大写，js是对大小写敏感的。 
      let data = this.post(); //这里包含所用的值
      //这里是数据规整
			data.isopen=1;
      data.state= data.state ? 1 : 0 ;
      data.in_time=Date.parse(new Date())/1000;
      data.up_time=Date.parse(new Date())/1000;
      let model = this.model('member');
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
			data.isopen=1;
      data.state= data.state ? 1 : 0 ;
      data.up_time=Date.parse(new Date())/1000;
      let model = this.model('member');
      let affectedRows = await model.where({id: data.id}).update(data);
      if(affectedRows){
        this.body='<script>alert("你好，修改成功了！");parent.location.reload()</script>';
        return;
      }else{
        this.body='<script>alert("修改失败了！");history.go(-1)</script>';
        return;
      }
    }  
    const data = await this.model("member").where({id:this.get('id')}).find();
    this.assign('data', data);
    return this.display();
  }
  async passwordAction() {
    if (this.isPost){//判断是否发送信息给后台了，post数据过来.注意：isPost中的P是大写，js是对大小写敏感的。 
      let data = this.post(); //这里包含所用的值
      //这里是数据规整
      console.log(data)
      if(data.password != data.password2 ){
        this.body='<script>alert("两次密码不一致！");history.go(-1)</script>';
        return
      }
      if(!data.password){
        this.body='<script>alert("你好，修改成功了！");parent.location.reload()</script>';
         return;
      }
      let obj={
        up_time:Date.parse(new Date())/1000,
        password: think.md5(data.password)
      };
      
      let model = this.model('member');
      let affectedRows = await model.where({id: data.id}).update(obj);;
      if(affectedRows){
        this.body='<script>alert("你好，修改成功了！");parent.location.reload()</script>';
        return;
      }else{
        this.body='<script>alert("修改失败了！");location.reload()</script>';
        return;
      }
    }  
    const data = await this.model("member").where({id:this.get('id')}).find();
    this.assign('data', data);
    return this.display();
  }
  async ajaxAction() {
    if (this.isPost){//判断是否发送信息给后台了，post数据过来.注意：isPost中的P是大写，js是对大小写敏感的。 
      let data = this.post(); //这里包含所用的值
     if(data.type=='member_all'){
       let arr=data.id.split('-');
      for (const key in arr) {
        await this.model('member').where({id: arr[key]}).update({del_time:Date.parse(new Date())/1000});
      }
      this.success();
      return;
		}
		if(data.type=='member_del'){
			let model = this.model('member');
     // let affectedRows = await model.where({id: data.id}).delete();
     let affectedRows = await model.where({id: data.id}).update({del_time:Date.parse(new Date())/1000});
			if(affectedRows){
				this.success()
			}else{
				this.fail()
			}
			return;
		}
		if(data.type=='member_start'){
			let model = this.model('member');
      let affectedRows = await model.where({id: data.id}).update({isopen:1});
			if(affectedRows){
				this.success()
			}else{
				this.fail()
      }
      return;
		}
		if(data.type=='member_stop'){
      let model = this.model('member');
      let affectedRows = await model.where({id: data.id}).update({isopen: 0});
			if(affectedRows){
				this.success()
			}else{
				this.fail()
      }
      return;
		}
		if(data.type=='member_zhongdel'){
      let model = this.model('member');
      let affectedRows = await model.where({id: data.id}).delete();
			if(affectedRows){
				this.success()
			}else{
				this.fail()
      }
      return;
		}
		if(data.type=='member_huanyuan'){
      let model = this.model('member');
      let affectedRows = await model.where({id: data.id}).update({del_time: null});
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

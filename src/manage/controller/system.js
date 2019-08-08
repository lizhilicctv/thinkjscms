const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    if(this.isPost){
      let data = this.post(); //这里包含所用的值
      for (const key in data) {
        data[key] = await this.strtoshi(data[key]);
        await this.model('system').where({enname: key}).update({value:data[key]});
      }
      this.body='<script>alert("你好，修改成功了！");history.go(-1)</script>';
      return;
    }
    const system = await this.model("system").select();
    system.forEach((ele,index) => {
      if(ele.type==3){
       ele.arr=(ele.kxvalue).split(',');
      }
    });
    this.assign('system', system);
    return this.display();
  }
  async addAction() {
    if(this.isPost){
      let data = this.post(); //这里包含所用的值
      data.in_time=Date.parse(new Date())/1000;
      data.up_time=Date.parse(new Date())/1000;
      let model = this.model('system');
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
    if(this.isPost){
      let data = this.post(); //这里包含所用的值
      data.in_time=Date.parse(new Date())/1000;
      data.up_time=Date.parse(new Date())/1000;
      console.log(data);

      let model = this.model('system');
      let insertId = await model.where({id: data.id}).update(data);
      if(insertId){
        this.body='<script>alert("你好，添加成功了！");parent.location.reload()</script>';
        return;
      }else{
        this.body='<script>alert("添加失败了！");location.reload()</script>';
        return;
      }
    }
    const data = await this.model("system").where({id:this.get('id')}).find();
    this.assign('data', data);
    return this.display();
  }
  async listAction(){
    const count = await this.model("system").count('id');
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
        html+='<a class="xuan" href="/manage/system/list?page='+i+'">'+i+'</a>';
      }else{
        html+='<a href="/manage/system/list?page='+i+'">'+i+'</a>';
      }
    }
    html+='</div>'
    this.assign('html', html);

    //这里判断搜索
    if (this.isPost){
      let key= this.post('key');
     const member=await this.model('system').where({'cnname': ['like', '%'+key+'%']}).page(page, 10).order('sort asc').select();//默认分页，每页有10个
     this.assign('member', member);
    }else{
      //查询所有会员 
     const member=await this.model('system').page(page,10).order('sort asc').select();//默认分页，每页有10个
     this.assign('member', member);
    }
    return this.display();
  }
  async shanAction() {
    const count = await this.model("system").count('id');
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
     const member=await this.model('member').where({del_time: ['!=', null]}).page(page, 10).select();//默认分页，每页有10个
     this.assign('member', member);
    }
    return this.display();
  }
  async shieldAction(){
    if(this.isPost){
      let data = this.post(); //这里包含所用的值
		  let insertId = await this.model('shield').where({id: 1}).update(data);
      if(insertId){
        this.body='<script>alert("你好，修改成功了！");history.go(-1)</script>';
        return;
      }else{
        this.body='<script>alert("修改失败了！");history.go(-1)</script>';
        return;
      }
		}
		const shield=await this.model('shield').where({id: 1}).find();
    this.assign('shield', shield);
	  return this.display();
  }
  async ajaxAction() {
    if (this.isPost){//判断是否发送信息给后台了，post数据过来.注意：isPost中的P是大写，js是对大小写敏感的。 
      let data = this.post(); //这里包含所用的值
      if(data.type=='system_sort'){
          let idarr=data.id.split('-');
          let sortarr=data.sort.split('-');
        for (const key in idarr) {
          await this.model('system').where({id: idarr[key]}).update({up_time:Date.parse(new Date())/1000,sort:sortarr[key]});
        }
        this.success();
        return;
      }
      if(data.type=='system_del'){
        let model = this.model('system');
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

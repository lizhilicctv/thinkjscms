const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    return this.display();
  }
  async mainAction() {
    //登陆数量
    let count = await this.model("log").count('id');
    this.assign('count', count);
    //登陆记录
    const login_info= await this.model('log').order("id desc").find();
    this.assign('login_info', login_info);
    //统计时间内
    let now = new Date(); //当前日期
    //获取本月天数
    let getMonthDays=(new Date(now.getFullYear(), now.getMonth() + 1, 1)-new Date(now.getFullYear(), now.getMonth(), 1))/(1000 * 60 * 60 * 24);
    //今日开始时间戳和结束时间戳
		const today_start=(new Date(now.toLocaleDateString()).getTime())/1000;
		const today_end = (new Date(now.toLocaleDateString()).getTime())/1000+24*60*60-1;
		// //昨日起始时间戳和结束时间戳
		const yesterday_start=(new Date(now.toLocaleDateString()).getTime())/1000-24*60*60;
		const yesterday_end=(new Date(now.toLocaleDateString()).getTime())/1000-1;
		// //本周周起始时间戳和结束时间戳
		const thisweek_start=(new Date(now.getFullYear(), now.getMonth() ,now.getDate() - now.getDay() + 1).getTime())/1000;
		const thisweek_end=(new Date(now.getFullYear(), now.getMonth() ,now.getDate() + ( 7 - now.getDay() )).getTime())/1000;
		// //本月起始时间戳和结束时间戳
		const thismonth_start=(new Date(now.getFullYear(), now.getMonth(), 1).getTime())/1000;
		const thismonth_end=(new Date(now.getFullYear(), now.getMonth(), getMonthDays).getTime())/1000;
    //查询返回结果
    //查找资讯数组
    let zixun=[];
    zixun[0]= await this.model("article").count('id');
    zixun[1]= await this.model("article").where({up_time:['<=',today_end] , up_time : ['>',today_start]}).count('id');
    zixun[2]= await this.model("article").where({up_time:['<=',yesterday_end] , up_time : ['>',yesterday_start]}).count('id');
    zixun[3]= await this.model("article").where({up_time:['<=',thisweek_end] , up_time : ['>',thisweek_start]}).count('id');
    zixun[4]= await this.model("article").where({up_time:['<=',thismonth_end] , up_time : ['>',thismonth_start]}).count('id');
    this.assign('zixun', zixun);

    //查找留言数组
    let liu=[];
    liu[0]= await this.model("message").count('id');
    liu[1]= await this.model("message").where({up_time:['<=',today_end] , up_time : ['>',today_start]}).count('id');
    liu[2]= await this.model("message").where({up_time:['<=',yesterday_end] , up_time : ['>',yesterday_start]}).count('id');
    liu[3]= await this.model("message").where({up_time:['<=',thisweek_end] , up_time : ['>',thisweek_start]}).count('id');
    liu[4]= await this.model("message").where({up_time:['<=',thismonth_end] , up_time : ['>',thismonth_start]}).count('id');
    this.assign('liu', liu);

    //查找用户数组
    let yong=[];
    yong[0]= await this.model("member").count('id');
    yong[1]= await this.model("member").where({up_time:['<=',today_end] , up_time : ['>',today_start]}).count('id');
    yong[2]= await this.model("member").where({up_time:['<=',yesterday_end] , up_time : ['>',yesterday_start]}).count('id');
    yong[3]= await this.model("member").where({up_time:['<=',thisweek_end] , up_time : ['>',thisweek_start]}).count('id');
    yong[4]= await this.model("member").where({up_time:['<=',thismonth_end] , up_time : ['>',thismonth_start]}).count('id');
    this.assign('yong', yong);

    //查找评论数组
    let ping=[];
    ping[0]= await this.model("comment").count('id');
    ping[1]= await this.model("comment").where({up_time:['<=',today_end] , up_time : ['>',today_start]}).count('id');
    ping[2]= await this.model("comment").where({up_time:['<=',yesterday_end] , up_time : ['>',yesterday_start]}).count('id');
    ping[3]= await this.model("comment").where({up_time:['<=',thisweek_end] , up_time : ['>',thisweek_start]}).count('id');
    ping[4]= await this.model("comment").where({up_time:['<=',thismonth_end] , up_time : ['>',thismonth_start]}).count('id');
    this.assign('ping', ping);
    
    return this.display();
  }
};

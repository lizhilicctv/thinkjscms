module.exports = class extends think.Model {
    getall(data) { //这里是用递归调用，注意作用域的变化
        let arr=[];
        function all(data,fid,level){
            for (const key in data) {
                if(data[key].fid==fid){
                    data[key].level=level;
                    arr.push(data[key]);
                    all(data,data[key].id,level+1);
                }
            }
        }
        all(data,0,0)
        return arr;
    }
};


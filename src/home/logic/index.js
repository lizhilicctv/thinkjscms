module.exports = class extends think.Logic {
	indexAction() {
		let rules = {
			username: {
				required: true
			}
		}
		let flag = this.validate(rules);
		// if (!flag) {
		// 	return this.fail('validate error', this.validateErrors);
		// 	// 如果校验失败，返回
		// 	// {"errno":1000,"errmsg":"validate error","data":{"username":"username can not be blank"}}
		// }
	}
};

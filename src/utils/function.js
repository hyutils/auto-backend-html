/**
 * sessionStorage封装, 对存入的数据进行url编码
 */
const mySession = new (function () {
	// 定义sessionStorage对象
	this.store = window.sessionStorage;

	// 解码取出
	this.get = (key) => {
		const data = this.store.getItem(key);

		return JSON.parse(data);
	};

	// 编码存入
	this.set = (key, data) => {
		const encodeData = JSON.stringify(data);

		this.store.setItem(key, encodeData);
	};

	// 删除
	this.remove = (key) => {
		this.store.removeItem(key);
	};
})();

/**
 * @param key 要获取的参数名字
 * @returns 返回参数的值
 */
const getParam = (key) => {
	let objParam = {};
	if (URLSearchParams) {
		objParam = Object.fromEntries(
			new URLSearchParams(window.location.search).entries()
		);
		return objParam[key];
	}
	const reg = new RegExp(`(^|&)${key}=([^&]*)(&|$)`, 'i');
	const r = window.location.search.substr(1).match(reg);
	if (r !== null) {
		return decodeURI(r[2]);
	}
	return null;
};

export { mySession, getParam };

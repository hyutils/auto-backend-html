const baseApi = '/v2';
const API = {
	// 功能api管理
	funcApisList: `${baseApi}/funcapis`,
	funcApiInfo: `${baseApi}/funcapi`,
	funcApiEdit: `${baseApi}/funcapi`,
	funcApiDelete: `${baseApi}/funcapi`,
	funcApiAdd: `${baseApi}/funcapi`,
	funcApiBaseList: `${baseApi}/funcapi2baseapis`,
	funcApiBaseUpdate: `${baseApi}/funcapi2baseapi`,

	// 基础api
	basicApiList: `${baseApi}/baseapis`,
	basicApiInfo: `${baseApi}/baseapi`,
	basicApiEdit: `${baseApi}/baseapi`,
	basicApiDelete: `${baseApi}/baseapi`,
	basicApiAdd: `${baseApi}/baseapi`,
	basicApiBaseList: `${baseApi}/baseapi2funcapis`,
	basicApiBaseUpdate: `${baseApi}/funcapi2baseapi`,
};
export { API };

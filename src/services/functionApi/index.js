import { API } from '../index';
import apiServerice from '@/axios/axios.js';

/**
 * 获取功能api列表
 */
const funcApisList = async (data) => {
	return await apiServerice.axiosGetData(API.funcApisList, data);
};

/**
 * 获取功能api基础信息
 */
const funcApiInfo = async (id) => {
	return await apiServerice.axiosGet(`${API.funcApiInfo}/${id}`);
};

/**
 * 编辑功能api
 */
const funcApiEdit = async (id, data) => {
	return await apiServerice.axiosPost(`${API.funcApiEdit}/${id}`, data);
};

/**
 * 删除功能api
 */
const funcApiDelete = async (id) => {
	return await apiServerice.axiosDelete(`${API.funcApiDelete}/${id}`);
};

/**
 * 添加功能api
 */
const funcApiAdd = async (data) => {
	return await apiServerice.axiosPost(API.funcApiAdd, data);
};

/**
 * 获取功能api列表对应基础api
 */
const funcApiBaseList = async (id, data) => {
	return await apiServerice.axiosGetData(
		`${API.funcApiBaseList}/${id}`,
		data
	);
};

/**
 * 更新功能api关联关系
 */
const funcApiBaseUpdate = async (data) => {
	return await apiServerice.axiosPost(API.funcApiBaseUpdate, data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	funcApisList,
	funcApiInfo,
	funcApiEdit,
	funcApiDelete,
	funcApiAdd,
	funcApiBaseList,
	funcApiBaseUpdate,
};

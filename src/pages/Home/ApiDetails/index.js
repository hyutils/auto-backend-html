import React from 'react';
import { Divider } from 'antd';

import Information from './Information';
import TableList from './TableList';

import { getParam } from '@/utils/function';

import './index.less';
const ApiDetail = (props) => {
	const type = getParam('type');
	return (
		<div className="apiDetailRoot">
			<div className="infor-title">
				{type === 'basic' ? '基础API / 详情' : '功能API / 详情'}
			</div>
			<Divider />
			<Information />
			<TableList />
		</div>
	);
};
export default ApiDetail;

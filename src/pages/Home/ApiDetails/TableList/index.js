import React, { useEffect, useState } from 'react';
import { Select, Table, Divider, Tag } from 'antd';

import funcApiServer from '@/services/functionApi';
import basicApiServer from '@/services/basicApi';

import { getParam } from '@/utils/function';

import './index.less';
const TableList = () => {
	const [type, setType] = useState('function'); // 区分功能api合基本api
	const [tableData, setTableData] = useState([]);

	const funColumns = [
		{
			title: '方法',
			dataIndex: 'method',
			key: 'method',
		},
		{
			title: 'URL',
			dataIndex: 'url',
			key: 'url',
		},
		{
			title: '父级名称',
			dataIndex: 'father_name',
			key: 'father_name',
		},
		{
			title: '类型',
			dataIndex: 'type',
			render: (text) => {
				if (text === 'API') {
					return <Tag color="green">{text}</Tag>;
				} else {
					return <Tag color="red">{text}</Tag>;
				}
			},
		},
		{
			title: '创建时间',
			dataIndex: 'created_time',
			key: 'created_time',
		},
		{
			title: '操作',
			dataIndex: '',
			key: 'x',
			render: (text, record) => {
				return (
					<div>
						<span
							className="tool-text"
							onClick={() => relation(record.id, false)}
						>
							移除关联
						</span>
						<Divider type="vertical" />
						<span
							className="tool-text"
							onClick={() => relation(record.id, true)}
						>
							增加关联
						</span>
					</div>
				);
			},
		},
	];

	const basiColumns = [
		{
			title: '基础API名字',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: '描述',
			dataIndex: 'description',
			key: 'description',
		},
		{
			title: '父级名称',
			dataIndex: 'father_name',
			key: 'father_name',
		},
		{
			title: '类型',
			dataIndex: 'type',
			render: (text) => {
				if (text === 'API') {
					return <Tag color="green">{text}</Tag>;
				} else {
					return <Tag color="red">{text}</Tag>;
				}
			},
		},
		{
			title: '创建时间',
			dataIndex: 'created_time',
			key: 'created_time',
		},
		{
			title: '操作',
			dataIndex: '',
			key: 'x',
			with: 200,
			render: (text, record) => {
				return (
					<div>
						<span
							className="tool-text"
							onClick={() => relation(record.id, false)}
						>
							移除关联
						</span>
						<Divider type="vertical" />
						<span
							className="tool-text"
							onClick={() => relation(record.id, true)}
						>
							增加关联
						</span>
					</div>
				);
			},
		},
	];

	useEffect(() => {
		getTableData({});
	}, []);

	// 获取列表数据
	const getTableData = async ({ selectTpe = true }) => {
		const id = getParam('id');
		const type = getParam('type');
		setType(type);

		try {
			let res = {};
			if (type === 'function') {
				res = await funcApiServer.funcApiBaseList(id, {
					has_relation: selectTpe,
				});
			} else {
				res = await basicApiServer.basicApiBaseList(id, {
					has_relation: selectTpe,
				});
			}
			if (res.code === 10200) {
				setTableData(res?.result?.data);
			}
		} catch (err) {}
	};

	// 处理基础、功能api的关联关系
	const relation = async (id, relation_operate) => {
		const urlid = getParam('id');
		try {
			const data = {
				func_id: type === 'function' ? urlid : id,
				base_id: type === 'basic' ? urlid : id,
				relation_operate,
			};

			const res = await funcApiServer.funcApiBaseUpdate(data);
			if (res?.code === 10200) {
				getTableData({});
			}
		} catch (err) {}
	};

	return (
		<div className="tableListRoot">
			<div>
				<span>选择类型</span>
				<Select
					defaultValue="true"
					className="select-text"
					onChange={(e) => {
						getTableData({ selectTpe: e });
					}}
				>
					<Select.Option value="false">未关联</Select.Option>
					<Select.Option value="true">已关联</Select.Option>
				</Select>
			</div>
			<Table
				columns={type === 'function' ? funColumns : basiColumns}
				dataSource={tableData}
				className="table-box"
				rowKey={(record) => record?.id}
				bordered
				scroll={{ y: 600 }}
			/>
		</div>
	);
};
export default TableList;

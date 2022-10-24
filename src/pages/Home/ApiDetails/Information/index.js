import React, { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { Button, Input, message } from 'antd';

import funcApiServer from '@/services/functionApi';
import basicApiServer from '@/services/basicApi';

import editIcon from '@/assets/image/edit.svg';

import { getParam } from '@/utils/function';

import './index.less';

const Information = (props) => {
	// const { selectApi } = props;
	const [type, setType] = useState('function'); // 区分功能api合基本api
	const [apiInfor, setapiInfor] = useState();
	const [description, setDescription] = useState(''); // 描述
	const inputRef = useRef();
	const [selectApi, setSelectedApiInfo] = useState({});

	useEffect(() => {
		getInfo();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// 获取详情
	const getInfo = async () => {
		const id = getParam('id');
		const type = getParam('type');

		setType(type);
		try {
			let res = {};
			if (type === 'function') {
				res = await funcApiServer.funcApiInfo(id);
			} else {
				res = await basicApiServer.basicApiInfo(id);
			}

			if (res?.code === 10200) {
				setSelectedApiInfo(res.data);

				let info = {};
				_.forEach(_.keys(res.data), (item) => {
					const arr = {
						value: res?.data?.[item],
						edit: false,
					};
					info[item] = arr;
				});
				setapiInfor(info);
				setDescription(res?.data?.description);
			}
		} catch (err) {}
	};

	// 编辑
	const onEdit = async (objkey, value) => {
		const data = { ...selectApi, [objkey]: value };
		const id = getParam('id');
		console.log(123, data);
		try {
			let res = {};
			if (type === 'function') {
				res = await funcApiServer.funcApiEdit(id, data);
			} else {
				res = await basicApiServer.basicApiEdit(data);
			}
			if (res?.code === 10200) {
				visibleChange(objkey, false);
				getInfo();
				return message.success('编辑成功！');
			}
			message.error(res.msg);
		} catch (err) {}
	};

	// 取消
	const visibleChange = (objkey, visible) => {
		const info = _.cloneDeep(apiInfor);
		info[objkey].edit = visible;
		setapiInfor(info);
	};

	// 根据key渲染
	const ItemBox = (props) => {
		const { label, objkey } = props;
		const [inputValue, setInputValue] = useState(apiInfor?.[objkey]?.value);
		return (
			<div>
				<div className="item">
					<div>
						{label}
						{apiInfor?.[objkey]?.edit ? (
							<Input
								className="input"
								ref={inputRef}
								value={inputValue}
								onChange={(e) => {
									// changValue(objkey, e);
									setInputValue(e?.target?.value);
								}}
							/>
						) : (
							<span>{apiInfor?.[objkey]?.value}</span>
						)}
					</div>
					{apiInfor?.[objkey]?.edit ? (
						<div className="btn-box">
							<Button
								onClick={() => onEdit(objkey, inputValue)}
								type="primary"
								className="ok-btn"
							>
								确定
							</Button>
							<Button
								onClick={() => visibleChange(objkey, false)}
							>
								取消
							</Button>
						</div>
					) : (
						<img
							src={editIcon}
							alt=""
							className="hide-img show"
							onClick={() => visibleChange(objkey, true)}
						/>
					)}
				</div>
			</div>
		);
	};

	return (
		<div className="informationRoot">
			<div className="name">
				名称：{selectApi?.name}
				<Button style={{ marginLeft: 100 }}>
					{type === 'basic' ? (
						<Link to="/home/list2">返回</Link>
					) : (
						<Link to="/home/list1">返回</Link>
					)}
				</Button>
			</div>
			<div className="information-content">
				<div className="left">
					{type === 'function' ? (
						<div className="item">
							<div>
								描述：
								{apiInfor?.description?.edit ? (
									<>
										<Input.TextArea
											className="text-area"
											value={description}
											onChange={(e) => {
												setDescription(
													e?.target?.value
												);
											}}
										/>
										<div className="btn-box">
											<Button
												onClick={() =>
													onEdit(
														'description',
														description
													)
												}
												type="primary"
												className="ok-btn"
											>
												确定
											</Button>
											<Button
												onClick={() =>
													visibleChange(
														'description',
														false
													)
												}
											>
												取消
											</Button>
										</div>
									</>
								) : (
									<span>{apiInfor?.description?.value}</span>
								)}
							</div>
							{apiInfor?.description?.edit ? null : (
								<img
									src={editIcon}
									alt=""
									className="hide-img show"
									onClick={() =>
										visibleChange('description', true)
									}
								/>
							)}
						</div>
					) : (
						<React.Fragment>
							<ItemBox label="HTTP方法：" objkey="method" />
							<ItemBox label="路径：" objkey="url" />
						</React.Fragment>
					)}
				</div>
				<div className="left">
					<ItemBox label="父级名称：" objkey="father_name" />
					{type === 'function' ? (
						<ItemBox
							label="父级描述："
							objkey="father_description"
						/>
					) : (
						<ItemBox label="父级路径：" objkey="father_path" />
					)}
				</div>
				<div className="right">
					<ItemBox label="类型：" objkey="type" />
					<div className="item">
						<div>
							创建时间：
							<span>{apiInfor?.created_time?.value}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Information;

import { Button, Form, Input, Modal, message, Select } from 'antd';
import React from 'react';
import funcApiServer from '@/services/functionApi';

import './index.less';
const ModalCreate = (props) => {
	const [form] = Form.useForm();
	const { isModalOpen, handleCancel, getTableData } = props;

	const handleOK = () => {
		form.validateFields().then(async (values) => {
			try {
				const res = await funcApiServer.funcApiAdd(values);
				if (res?.code === 10200) {
					getTableData();
					handleCancel();
					return message.success('添加成功');
				}
				message.error(res?.msg);
			} catch (err) {
				message.error('失败');
			}
		});
	};
	return (
		<div>
			<Modal
				title="添加功能API"
				wrapClassName="addmodalRoot"
				visible={isModalOpen}
				footer={null}
				onCancel={() => handleCancel()}
			>
				<div className="modal-content">
					<Form form={form} initialValues={{ type: 'api' }}>
						<Form.Item
							name="name"
							label="名字"
							rules={[
								{
									required: true,
									message: '不能为空',
								},
							]}
						>
							<Input
								placeholder="请输入名字"
								autoComplete="off"
							></Input>
						</Form.Item>
						<Form.Item
							name="father_name"
							label="父级名称"
							rules={[
								{
									required: true,
									message: '不能为空',
								},
							]}
						>
							<Input
								placeholder="请输入父级名称"
								autoComplete="off"
							></Input>
						</Form.Item>
						<Form.Item
							name="type"
							label="类型"
							rules={[
								{
									required: true,
									message: '不能为空',
								},
							]}
						>
							<Select>
								<Select.Option value="api">api</Select.Option>
								<Select.Option value="page">page</Select.Option>
							</Select>
						</Form.Item>
						<Form.Item
							name="description"
							label="描述"
							rules={[
								{
									required: true,
									message: '不能为空',
								},
							]}
						>
							<Input.TextArea
								placeholder=""
								autoComplete="off"
							></Input.TextArea>
						</Form.Item>
					</Form>
				</div>
				<div className="modal-footer">
					<Button onClick={() => handleCancel()}>取消</Button>
					<Button
						type="primary"
						className="ok-btn"
						onClick={() => handleOK()}
					>
						确定
					</Button>
				</div>
			</Modal>
		</div>
	);
};
export default ModalCreate;

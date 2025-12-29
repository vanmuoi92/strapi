import React, { useState } from "react";
import { Form, Input, Button, message, Typography } from "antd";
import { apiClient } from "../../services/api";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

interface ContactFormProps {
	title?: string;
	description?: any; // Blocks type from Strapi
}

const ContactForm: React.FC<ContactFormProps> = ({ title, description }) => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);

	const onFinish = async (values: any) => {
		setLoading(true);
		try {
			// Adapt to Strapi v4/v5 data structure
			await apiClient.post("/contact-submissions", {
				data: values,
			});
			message.success("Cảm ơn bạn! Chúng tôi sẽ liên hệ lại sớm nhất.");
			form.resetFields();
		} catch (error) {
			console.error("Submission error:", error);
			message.error("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="container" style={{ padding: "60px 0" }}>
			<div style={{ maxWidth: "600px", margin: "0 auto" }}>
				{title && (
					<Title level={2} style={{ textAlign: "center" }}>
						{title}
					</Title>
				)}
				{description && (
					<div style={{ textAlign: "center", marginBottom: "40px" }}>
						{/* If description is blocks, we might need a mini-renderer or just render as text if it's simple */}
						{typeof description === "string" ? (
							<Paragraph>{description}</Paragraph>
						) : (
							<Paragraph>
								{description?.[0]?.children?.[0]?.text}
							</Paragraph>
						)}
					</div>
				)}

				<Form
					form={form}
					layout="vertical"
					onFinish={onFinish}
					size="large">
					<Form.Item
						label="Họ và tên"
						name="name"
						rules={[
							{ required: true, message: "Vui lòng nhập tên!" },
						]}>
						<Input placeholder="Nguyễn Văn A" />
					</Form.Item>

					<Form.Item
						label="Email"
						name="email"
						rules={[
							{ required: true, message: "Vui lòng nhập email!" },
							{ type: "email", message: "Email không hợp lệ!" },
						]}>
						<Input placeholder="example@gmail.com" />
					</Form.Item>

					<Form.Item
						label="Số điện thoại"
						name="phone"
						rules={[
							{
								required: true,
								message: "Vui lòng nhập số điện thoại!",
							},
						]}>
						<Input placeholder="090xxxxxxx" />
					</Form.Item>

					<Form.Item
						label="Lời nhắn"
						name="message"
						rules={[
							{
								required: true,
								message: "Vui lòng nhập lời nhắn!",
							},
						]}>
						<TextArea rows={4} placeholder="Tôi muốn hỏi về..." />
					</Form.Item>

					<Form.Item style={{ textAlign: "center" }}>
						<Button
							type="primary"
							htmlType="submit"
							loading={loading}
							style={{ minWidth: "200px" }}>
							Gửi liên hệ
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};

export default ContactForm;

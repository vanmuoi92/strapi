import { Form, Input, Button, message, Spin } from "antd";
import { useState } from "react";
import { useContact } from "@/hooks/useGlobal";
import { RichTextBlock } from "@/components/Blocks";
import styles from "./pages.module.scss";

const Contact: React.FC = () => {
	const [form] = Form.useForm();
	const { data: contact, isLoading } = useContact();
	const [submitting, setSubmitting] = useState(false);

	const onFinish = async (values: any) => {
		setSubmitting(true);
		try {
			console.log("Form values:", values);
			message.success(
				"Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm.",
			);
			form.resetFields();
		} catch (error) {
			message.error("Có lỗi xảy ra. Vui lòng thử lại.");
		} finally {
			setSubmitting(false);
		}
	};

	if (isLoading) {
		return (
			<div style={{ textAlign: "center", padding: "40px" }}>
				<Spin />
			</div>
		);
	}

	return (
		<div className={styles.page}>
			<h1 style={{ marginBottom: 32, fontSize: 32, textAlign: "center" }}>
				Liên hệ với chúng tôi
			</h1>

			<div
				style={{
					display: "grid",
					gridTemplateColumns: "1fr 1fr",
					gap: 32,
					marginBottom: 40,
				}}>
				<div className={styles.infoBox}>
					<h3>Thông tin liên hệ</h3>
					{contact && contact.Title ? (
						<>
							<h4>{contact.Title}</h4>
							{contact.description &&
							Array.isArray(contact.description) ? (
								<div>
									{contact.description.map(
										(block: any, idx: number) => (
											<RichTextBlock
												key={idx}
												body={
													block.children?.[0]?.text ||
													""
												}
											/>
										),
									)}
								</div>
							) : contact.description ? (
								<div
									dangerouslySetInnerHTML={{
										__html: contact.description,
									}}
								/>
							) : null}
							{contact.Banner && (
								<img
									src={`http://localhost:1337${contact.Banner.url}`}
									alt={
										contact.Banner.alternativeText ||
										"Banner"
									}
									style={{
										marginTop: 16,
										maxWidth: "100%",
										borderRadius: 8,
									}}
								/>
							)}
						</>
					) : (
						<>
							<p>
								<strong>Email:</strong>{" "}
								<a href="mailto:info@nimokart.com">
									info@nimokart.com
								</a>
							</p>
							<p>
								<strong>Điện thoại:</strong>{" "}
								<a href="tel:+84123456789">
									+84 (0) 123 456 789
								</a>
							</p>
							<p>
								<strong>Địa chỉ:</strong> 123 Đường ABC, TP HCM
							</p>
						</>
					)}
				</div>

				<div className={styles.form}>
					<h3>Gửi tin nhắn</h3>
					<Form form={form} layout="vertical" onFinish={onFinish}>
						<Form.Item
							label="Tên của bạn"
							name="name"
							rules={[
								{
									required: true,
									message: "Vui lòng nhập tên",
								},
							]}>
							<Input placeholder="Nhập tên của bạn" />
						</Form.Item>

						<Form.Item
							label="Email"
							name="email"
							rules={[
								{
									required: true,
									message: "Vui lòng nhập email",
								},
								{
									type: "email",
									message: "Email không hợp lệ",
								},
							]}>
							<Input placeholder="Nhập email của bạn" />
						</Form.Item>

						<Form.Item
							label="Tiêu đề"
							name="subject"
							rules={[
								{
									required: true,
									message: "Vui lòng nhập tiêu đề",
								},
							]}>
							<Input placeholder="Nhập tiêu đề" />
						</Form.Item>

						<Form.Item
							label="Nội dung"
							name="message"
							rules={[
								{
									required: true,
									message: "Vui lòng nhập nội dung",
								},
							]}>
							<Input.TextArea
								rows={5}
								placeholder="Nhập nội dung tin nhắn"
							/>
						</Form.Item>

						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								block
								loading={submitting}>
								Gửi tin nhắn
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		</div>
	);
};

export default Contact;

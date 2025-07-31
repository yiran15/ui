import { UpdateApi } from "@/services/api";
import type { Api } from "@/types/api/api";
import { useRequest } from "ahooks";
import { App, Form, Input } from "antd";
import { useEffect } from "react";
import ModalComponent from "../base/Modal";

interface UpdatePolicyComponentProps {
  open: boolean;
  onCancel: () => void;
  refresh: () => void;
  data: Api;
}

const UpdatePolicyComponent = ({
  open,
  onCancel,
  refresh,
  data,
}: UpdatePolicyComponentProps) => {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  useEffect(() => {
    if (!open) {
      return;
    }
    form.setFieldsValue({
      id: data.id,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      name: data.name,
      path: data.path,
      method: data.method,
      description: data.description,
    });
  }, [data, open]);

  const { run: upRun, loading: upLoad } = useRequest(UpdateApi, {
    manual: true,
    debounceMaxWait: 500,
    onSuccess: () => {
      message.success("修改成功");
      refresh();
      handleCancle();
    },
    onError: (error) => {
      message.error(error.message);
    },
  });
  const handleCancle = () => {
    onCancel();
  };
  const handleOk = () => {
    form.validateFields().then((values) => {
      upRun(values.id, { description: values.description });
    });
  };
  return (
    <ModalComponent
      closable={false}
      title="修改API"
      open={open}
      handleOk={handleOk}
      handleCancel={handleCancle}
      confirmLoading={upLoad}
    >
      <Form
        form={form}
        size="large"
        labelAlign="left"
        layout="horizontal"
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 20 }}
      >
        <Form.Item rules={[{ required: true }]} name={"id"} label="ID">
          <Input disabled />
        </Form.Item>
        <Form.Item rules={[{ required: true }]} name={"name"} label="名称">
          <Input disabled />
        </Form.Item>
        <Form.Item rules={[{ required: true }]} name={"method"} label="方法">
          <Input disabled />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "请输入描述" }]}
          name={"description"}
          label="描述"
        >
          <Input />
        </Form.Item>
      </Form>
    </ModalComponent>
  );
};

export default UpdatePolicyComponent;

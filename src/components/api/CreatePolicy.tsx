import { CreateApi } from "@/services/api";
import { useRequest } from "ahooks";
import { App, Form, Input, Select } from "antd";
import ModalComponent from "../base/Modal";

interface CreateApiComponentProps {
  open: boolean;
  onCancel: () => void;
  refresh: () => void;
}
const CreateApiComponent = ({
  open,
  onCancel,
  refresh,
}: CreateApiComponentProps) => {
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const handleCancle = () => {
    form.resetFields();
    onCancel();
  };

  const { run: createRun, loading: createLoad } = useRequest(CreateApi, {
    manual: true,
    onSuccess: () => {
      message.success("创建成功");
      refresh();
      handleCancle();
    },
  });
  const handleOk = () => {
    form.validateFields().then((values) => {
      createRun(values);
    });
  };
  return (
    <ModalComponent
      open={open}
      handleOk={handleOk}
      handleCancel={handleCancle}
      confirmLoading={createLoad}
      title="创建角色"
      closable={false}
    >
      <Form
        form={form}
        layout="vertical"
        size={"large"}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          name="name"
          label="策略名称"
          rules={[
            {
              required: true,
              message: "输入名称",
            },
            {
              pattern: /^[a-zA-Z0-9]+$/,
              message: "名称只能包含字母、数字",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="path"
          label="路径"
          rules={[
            {
              required: true,
              message: "输入路径",
            },
            {
              pattern: /^[*a-zA-Z0-9/]+$/,
              message: "路径只能包含字母、数字、/",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="method"
          label="方法"
          rules={[{ required: true, message: "请输入角色名称" }]}
        >
          <Select
            options={[
              { value: "GET", label: "GET" },
              { value: "POST", label: "POST" },
              { value: "PUT", label: "PUT" },
              { value: "DELETE", label: "DELETE" },
              { value: "PATCH", label: "PATCH" },
              { value: "*", label: "*" },
            ]}
          />
        </Form.Item>
        <Form.Item
          name="description"
          label="策略描述"
          rules={[{ required: true, message: "请输入角色描述" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </ModalComponent>
  );
};

export default CreateApiComponent;

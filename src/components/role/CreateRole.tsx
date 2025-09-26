import { MessageInstance } from "antd/es/message/interface";
import { Col, Form, Input, Row, Tag } from "antd";
import ModalComponent from "../base/Modal";
import TransferComponent from "../base/Transfer";
import { useEffect, useState } from "react";
import { GetApiList } from "@/services/api";
import { useRequest } from "ahooks";
import { CreateRole } from "@/services/role";
import { ApiColumns } from "@/types/api/api.tsx";

interface CreateRoleModalProps {
  open: boolean;
  message: MessageInstance;
  onClose: () => void;
  refreshRoleList: () => void;
}

export default function CreateRoleComponent({
  open,
  message,
  onClose,
  refreshRoleList,
}: CreateRoleModalProps) {
  const [form] = Form.useForm();
  const { run: createRun, loading: createLoading } = useRequest(CreateRole, {
    manual: true,
    onSuccess: () => {
      message.success("创建成功");
      onClose();
      refreshRoleList();
    },
  });

  const handleOk = () => {
    form.validateFields().then((values) => {
      const data = {
        name: values.name,
        description: values.description,
        apis: targetKeys.map((id) => Number(id)),
      };
      createRun(data);
    });
  };

  const [targetKeys, setTargetKeys] = useState<React.Key[]>([]);
  const { run: policyRun, data: apiData } = useRequest(GetApiList, {
    manual: true,
  });

  useEffect(() => {
    if (open) {
      policyRun({ page: 0, pageSize: 0 });
    }
  }, [open]);
  return (
    <ModalComponent
      title="创建角色"
      className="min-w-3/4"
      open={open}
      handleCancel={() => {
        onClose();
        form.resetFields();
      }}
      handleOk={handleOk}
      closable={false}
      confirmLoading={createLoading}
    >
      <div>
        <div className="font-bold text-12 mb-4">基础信息</div>
        <Form form={form} size="middle">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="角色名称"
                rules={[{ required: true, message: "请输入角色名称" }]}
                name="name"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="角色描述"
                rules={[{ required: true, message: "请输入角色描述" }]}
                name="description"
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <div>
        <div className="font-bold text-12 mb-4">角色信息</div>
        <TransferComponent
          extraHeight={530}
          titles={[
            <Tag color="blue">未关联API</Tag>,
            <Tag color="green">已关联API</Tag>,
          ]}
          dataSource={(apiData?.list || []).map((item) => ({
            ...item,
            key: item.id,
          }))}
          filterOption={(input, item) => item.name.includes(input)}
          columns={ApiColumns()}
          targetKeys={targetKeys}
          setTargetKeys={setTargetKeys}
        />
      </div>
    </ModalComponent>
  );
}

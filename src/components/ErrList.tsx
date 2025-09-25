import React, { useMemo } from "react";
import { Modal, List, Alert, Typography } from "antd";

export interface ErrorItem {
  error: string;
  requestId?: string;
}

interface ErrorModalProps {
  errors: ErrorItem[];
  onClose: () => void;
}
const { Text } = Typography;

const ErrorModal: React.FC<ErrorModalProps> = ({ errors, onClose }) => {
  const copyableErrorText = useMemo(() => {
    if (errors.length === 0) {
      return "";
    }
    const jsonString = JSON.stringify(errors, null, 2);
    return `技术诊断信息 (请将此内容完整提供给开发者):\n\`\`\`json\n${jsonString}\n\`\`\``;
  }, [errors]);
  return (
    <Modal
      title={
        <div>
          <span>Error List ({errors.length})</span>
          <div className="flex justify-between items-center mt-2">
            <Text copyable={{ text: "qinquanliuxiang@qq.com" }}>
              报告错误信息, 复制邮箱
            </Text>
            <Text copyable={{ text: copyableErrorText }}>复制错误</Text>
          </div>
        </div>
      }
      open={errors.length > 0}
      onCancel={onClose}
      footer={null}
      destroyOnClose
      width={600}
      maskClosable={false}
      styles={{
        body: {
          maxHeight: "60vh",
          overflowY: "auto",
        },
      }}
    >
      {errors.length > 0 && (
        <List
          dataSource={errors}
          renderItem={(item) => (
            <List.Item>
              <Alert
                className="w-full"
                message={`error: ${item.error}`}
                description={
                  item.requestId ? `RequestId: ${item.requestId}` : undefined
                }
                type="error"
                showIcon
              />
            </List.Item>
          )}
        />
      )}
    </Modal>
  );
};

export default ErrorModal;

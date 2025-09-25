import React from "react";
import { Modal, List, Alert } from "antd";

export interface ErrorItem {
  error: string;
  requestId?: string;
}

interface ErrorModalProps {
  errors: ErrorItem[];
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ errors, onClose }) => {
  return (
    <Modal
      title="错误提示"
      open={errors.length > 0}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      {errors.length > 0 && (
        <List
          dataSource={errors}
          renderItem={(item) => (
            <List.Item>
              <Alert
                message={item.error}
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

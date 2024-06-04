import React from 'react';
import { Modal, Button } from 'antd';

interface ConfirmModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  message: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  visible,
  onCancel,
  onConfirm,
  message,
}) => {
  return (
    <Modal
      title="Confirmation"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="confirm" type="primary" onClick={onConfirm}>
          Confirm
        </Button>,
      ]}
    >
      <p>{message}</p>
    </Modal>
  );
};

export default ConfirmModal;

import { notification } from "antd";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

type NotificationType = "success" | "info" | "warning" | "error";

const openNotificationWithIcon = (
  type: NotificationType,
  message: string,
  description: string
) => {
  notification[type]({
    message,
    description,
    icon:
      type === "success" ? (
        <CheckCircleOutlined style={{ color: "#52c41a" }} />
      ) : type === "info" ? (
        <InfoCircleOutlined style={{ color: "#1890ff" }} />
      ) : type === "warning" ? (
        <ExclamationCircleOutlined style={{ color: "#faad14" }} />
      ) : (
        <CloseCircleOutlined style={{ color: "#f5222d" }} />
      ),
  });
};

const Notification = {
  success: (message: string, description: string) =>
    openNotificationWithIcon("success", message, description),
  info: (message: string, description: string) =>
    openNotificationWithIcon("info", message, description),
  warning: (message: string, description: string) =>
    openNotificationWithIcon("warning", message, description),
  error: (message: string, description: string) =>
    openNotificationWithIcon("error", message, description),
};

export default Notification;

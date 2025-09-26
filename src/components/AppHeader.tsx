import { useContext } from "react";
import { GlobalContext } from "@/components/ThemeProvider";
import {
  Avatar,
  Button,
  Dropdown,
  Space,
  Spin,
  Divider,
  Typography,
} from "antd";
import {
  MailOutlined,
  PoweroffOutlined,
  UserOutlined,
} from "@ant-design/icons";
import ThemeToggle from "./ThemeToggle";
import { UserLogout } from "@/services/user";
import { useRequest } from "ahooks";
import { UserInfoResponse } from "@/types/user/user";
import Logo from "@/assets/logo.png";
interface AppHeaderProps {
  background: string;
  userData: UserInfoResponse | undefined;
  userLoad: boolean;
}
export default function AppHeader({
  background,
  userData,
  userLoad,
}: AppHeaderProps) {
  const { theme } = useContext(GlobalContext);
  const { run: logoutRun } = useRequest(UserLogout, {
    manual: true,
    onSuccess: () => {
      window.location.href = "/login";
      localStorage.removeItem("token");
    },
  });

  const dropdownContent = () => {
    const isDark = theme === "dark";
    const menuBg = isDark ? "#23232a" : "#fff";
    const menuFont = isDark ? "#fff" : "#222";
    const menuBorder = isDark ? "#303030" : "#e5e7eb";
    const roleBg = isDark ? "#243a5a" : "#e3f2fd";
    const roleColor = isDark ? "#90caf9" : "#1976d2";
    return (
      <div
        className="min-w-[300px] p-0 shadow-lg rounded-lg overflow-hidden"
        style={{
          background: menuBg,
          color: menuFont,
          border: `1px solid ${menuBorder}`,
        }}
      >
        {/* 用户基本信息区域 */}
        <div
          className="p-4"
          style={{
            background: isDark
              ? "linear-gradient(135deg, #23232a 0%, #243a5a 100%)"
              : "linear-gradient(135deg, #e3f2fd 0%, #fff 100%)",
          }}
        >
          <div className="flex items-start gap-4">
            <Avatar
              size={64}
              src={userData?.avatar}
              icon={!userData?.avatar && <UserOutlined />}
              style={{
                border: `2px solid ${menuBorder}`,
                background: isDark ? "#18181c" : "#fff",
                color: menuFont,
              }}
            />
            <div className="flex-1">
              <Typography.Title
                level={5}
                className="!mb-1"
                style={{ color: isDark ? "#fff" : "#1976d2" }}
              >
                {userData?.nickName || userData?.name || "未知用户"}
              </Typography.Title>
              <div className="flex flex-wrap gap-2">
                {userData?.roles?.map((role) => (
                  <span
                    key={role.name}
                    style={{
                      background: roleBg,
                      color: roleColor,
                      border: `1px solid ${menuBorder}`,
                      borderRadius: "999px",
                      padding: "2px 8px",
                      fontSize: "12px",
                    }}
                  >
                    {role.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 用户详细信息区域 */}
        <div className="px-4 py-3">
          <div className="flex items-center gap-3" style={{ color: menuFont }}>
            <UserOutlined style={{ color: isDark ? "#bbb" : "#1976d2" }} />
            <span className="flex-1 truncate">
              {userData?.name || "未设置"}
            </span>
          </div>
          <div
            className="flex items-center gap-3 mt-2"
            style={{ color: menuFont }}
          >
            <MailOutlined style={{ color: isDark ? "#bbb" : "#1976d2" }} />
            <span className="flex-1 truncate">
              {userData?.email || "未设置"}
            </span>
          </div>
        </div>

        <Divider style={{ margin: "4px 0", borderColor: menuBorder }} />

        {/* 快捷操作和底部操作区域并排排列 */}
        <div className="p-3 flex gap-2">
          <Button
            type="link"
            icon={
              <UserOutlined style={{ color: isDark ? "#fff" : "#1976d2" }} />
            }
            onClick={() => window.open("/user/info", "_blank")}
            className="h-9 flex-1 text-left"
            style={{ color: menuFont }}
          >
            编辑个人信息
          </Button>
          <Button
            danger
            type="link"
            icon={
              <PoweroffOutlined
                style={{ color: isDark ? "#fff" : "#d32f2f" }}
              />
            }
            onClick={() => logoutRun()}
            className="h-9 flex-1"
            style={{ color: isDark ? "#fff" : "#d32f2f" }}
          >
            退出登录
          </Button>
        </div>
      </div>
    );
  };

  // 主题色定义
  const isDark = theme === "dark";
  const headerBg = isDark ? background || "#18181c" : "#fff";
  const borderColor = isDark ? "#303030" : "#f0f0f0";
  const fontColor = isDark ? "#fff" : "#222";

  return (
    <div
      className={`flex items-center justify-between px-3 h-18 transition-colors duration-300 ${
        isDark ? "bg-[#18181c]" : "bg-white"
      }`}
      style={{
        backgroundColor: headerBg,
        borderBottom: `1px solid ${borderColor}`,
        color: fontColor,
      }}
    >
      <div>
        <img src={Logo} width={130} />
      </div>

      <Space size="middle" className="flex items-center gap-4">
        <ThemeToggle />
        {userLoad ? (
          <Spin size="small" />
        ) : (
          <Dropdown
            dropdownRender={dropdownContent}
            trigger={["click"]}
            placement="bottomRight"
          >
            <Avatar
              style={{
                cursor: "pointer",
                background: isDark ? "#222" : "#eee",
                color: fontColor,
              }}
              src={userData?.avatar}
              icon={!userData?.avatar && <UserOutlined />}
            />
          </Dropdown>
        )}
      </Space>
    </div>
  );
}

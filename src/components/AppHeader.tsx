import { useContext } from "react";
import { GlobalContext } from "@/components/ThemeProvider";
import {
  App,
  Avatar,
  Button,
  Card,
  Divider,
  Dropdown,
  MenuProps,
  Space,
  Spin,
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
import { useNavigate } from "react-router-dom";
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
  const { message } = App.useApp();
  const navigate = useNavigate();
  const { theme } = useContext(GlobalContext);
  const { run: logoutRun } = useRequest(UserLogout, {
    manual: true,
    onSuccess: () => {
      window.location.href = "/login";
      localStorage.removeItem("token");
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  const items: MenuProps["items"] = [
    {
      key: "profile",
      label: (
        <Card loading={userLoad}>
          <div className="flex flex-wrap gap-y-3">
            <div className="w-full">
              <p
                className="font-medium m-0"
                style={{ color: theme === "dark" ? "#fff" : "#1890ff" }}
              >
                {userData?.nickName || userData?.name || "未知用户"}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {userData?.roles &&
                userData?.roles.map((role) => {
                  return (
                    <span
                      key={role.name}
                      className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                    >
                      {role.name}
                    </span>
                  );
                })}
            </div>
          </div>

          <Divider className="my-3" style={{ margin: "8px 0" }} />

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <UserOutlined className="opacity-60" />
              <span className="opacity-90">{userData?.name || ""}</span>
            </div>
            <div className="flex items-center gap-2">
              <MailOutlined className="opacity-60" />
              <span className="opacity-90">{userData?.email || ""}</span>
            </div>
          </div>
        </Card>
      ),
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "setting",
      label: (
        <div className="w-full text-left hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors focus:outline-none">
          <Button
            type="link"
            style={{ color: "#1890ff" }}
            onClick={() => navigate("/user/info")}
            icon={<UserOutlined />}
          >
            个人信息
          </Button>
        </div>
      ),
    },
    {
      key: "logout",
      label: (
        <div className="w-full text-left hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors focus:outline-none">
          <Button
            type="link"
            style={{ color: "#ff4d4f" }}
            onClick={() => logoutRun()}
            icon={<PoweroffOutlined />}
          >
            退出登录
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div
      className="flex items-center justify-between px-3 h-18"
      style={{
        backgroundColor: theme === "dark" ? background : "#fff",
        borderBottom:
          theme === "dark" ? "1px solid #303030" : "1px solid #f0f0f0",
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
          <Dropdown menu={{ items }} trigger={["click"]}>
            <Avatar
              style={{ cursor: "pointer" }}
              src={userData?.avatar}
              icon={!userData?.avatar && <UserOutlined />}
            />
          </Dropdown>
        )}
      </Space>
    </div>
  );
}

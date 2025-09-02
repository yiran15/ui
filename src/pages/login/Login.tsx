import { UserLogin } from "@/services/user";
import { useRequest } from "ahooks";
import {
  App,
  Button,
  Card,
  Checkbox,
  Divider,
  Form,
  Input,
  Typography,
} from "antd";
import { useNavigate } from "react-router-dom";
import bgImage from "@/assets/login.png";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import KeycloakSvg from "@/assets/keycloak.svg?react";
import FeiShuSvg from "@/assets/feishu.svg?react";
import { GetOAuth2Provider } from "@/services/oauth2";
import { useState } from "react";
const { Title } = Typography;
const LoginPage = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const from = searchParams.get("from");
  const [oauth2Providers, setOauth2Providers] = useState<string[]>([]);
  const { loading: oauth2Loading } = useRequest(GetOAuth2Provider, {
    onSuccess: (res) => {
      console.log(res);
      setOauth2Providers(res);
    },
  });

  const { run: loginRun, loading: loginLoading } = useRequest(UserLogin, {
    manual: true,
    onError: (error) => {
      if (error.message === "object not found") {
        message.error("用户不存在");
      } else {
        message.error(error.message);
      }
    },
    onSuccess: (res) => {
      console.log(res);
      localStorage.setItem("token", res?.token);
      navigate(from ? decodeURIComponent(from) : "/", { replace: true });
    },
  });
  // 登录处理逻辑
  const onFinish = (values: { email: string; password: string }) => {
    loginRun(values);
  };

  // 飞书 SSO 登录处理逻辑 (待实现)
  const handleFeishuLogin = () => {
    // 在这里添加飞书 SSO 的重定向或其他逻辑
    message.info("飞书登录功能待实现");
    // window.location.href = 'YOUR_FEISHU_SSO_URL';
  };

  // Keycloak SSO 登录处理逻辑 (待实现)
  const handleKeycloakLogin = () => {
    // 在这里添加 Keycloak SSO 的重定向或其他逻辑
    message.info("Keycloak 登录功能待实现");
    // window.location.href = 'YOUR_KEYCLOAK_SSO_URL';
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="flex items-center justify-center min-h-screen from-indigo-500 via-purple-500 to-pink-500"
    >
      <Card
        className="max-w-lg p-8 w-full"
        style={{
          borderRadius: "12px",
          boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Title level={2} className="text-center text-gray-800 mb-8 font-bold">
          登录
        </Title>

        <Form
          name="login"
          size="large"
          onFinish={onFinish}
          initialValues={{ remember: true }}
          wrapperCol={{ span: 18, offset: 3 }}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "请输入用户名!" }]}
            required={false}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="请输入用户名"
              className="focus:ring-indigo-500 focus:border-indigo-500"
              style={{ borderRadius: "8px" }}
            />
          </Form.Item>

          <Form.Item
            required={false}
            name="password"
            rules={[
              { required: true, message: "请输入密码!" },
              { message: "密码长度不能小于8位", min: 8 },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="请输入密码"
              className="focus:ring-indigo-500 focus:border-indigo-500"
              style={{ borderRadius: "8px" }}
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>记住我</Checkbox>
          </Form.Item>

          <Form.Item className="mt-6">
            <div>
              <Button
                block
                type="primary"
                htmlType="submit"
                loading={loginLoading}
              >
                登录
              </Button>
            </div>
          </Form.Item>
        </Form>
        {/* SSO 登录区域 */}
        <Divider>其他登录方式</Divider>
        <div className="flex justify-center gap-4">
          <Button
            icon={<FeiShuSvg width="24" height="24" />}
            onClick={handleFeishuLogin}
            style={{ display: "flex", alignItems: "center" }}
          >
            飞书登录
          </Button>
          <Button
            icon={<KeycloakSvg width="20" height="20" />}
            onClick={handleKeycloakLogin}
            style={{ display: "flex", alignItems: "center" }}
          >
            Keycloak 登录
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;

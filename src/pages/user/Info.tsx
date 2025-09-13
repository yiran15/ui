import LoadingComponent from "@/components/base/Loading";
import { UserInfo, UserUpdateBySelf } from "@/services/user";
import { UserUpdateRequest, UserUpPwdRequest } from "@/types/user/user";
import { useRequest } from "ahooks";
import {
  App,
  Button,
  Card,
  Form,
  Input,
  Modal,
  Avatar,
  theme,
  Tag,
} from "antd";
import { useEffect, useRef, useState } from "react";
import { UserOutlined, LockOutlined, EditOutlined } from "@ant-design/icons";
const InfoPage = () => {
  const { token } = theme.useToken();
  const { message, modal } = App.useApp();
  const [form] = Form.useForm();
  const [pwdForm] = Form.useForm();
  const [showPwdModal, setShowPwdModal] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // 获取用户信息
  const {
    data: userInfo,
    loading,
    refresh,
  } = useRequest(UserInfo, {
    onSuccess: (data) => {
      form.setFieldsValue(data);
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  const { run: upRun, loading: upLoad } = useRequest(UserUpdateBySelf, {
    manual: true,
    debounceWait: 500,
    onSuccess: () => {
      message.success("修改成功");
      refresh();
      form.resetFields();
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  const handlePwdOk = () => {
    pwdForm.resetFields();
    setShowPwdModal(false);
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const { run: upPwdRun, loading: upPwdLoad } = useRequest(UserUpdateBySelf, {
    manual: true,
    onSuccess: () => {
      message.success("修改成功");
      // 设置新定时器并保存引用
      timerRef.current = setTimeout(() => {
        handlePwdOk();
      }, 1000);
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  const onFinish = (values: UserUpdateRequest) => {
    upRun(values);
  };

  const onPwdFinish = (values: UserUpPwdRequest) => {
    if (!userInfo?.id) {
      message.error("用户ID不存在");
      return;
    }
    upPwdRun({
      id: userInfo?.id,
      oldPassword: values.oldPassword,
      password: values.newPassword,
    });
  };

  // 清理 setTimeout
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  if (loading) {
    return <LoadingComponent loading />;
  }

  return (
    <div
      className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700"
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        background: `linear-gradient(120deg, ${token.colorBgContainer} 0%, ${token.colorBgLayout} 100%)`,
      }}
    >
      <Card className="w-full max-w-6xl h-auto mx-auto rounded-2xl shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg flex flex-col justify-center">
        {/* 顶部个人信息区域 */}
        <div
          className="p-8 pb-32 relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${token.colorPrimary}, ${token.colorPrimaryActive})`,
            borderTopLeftRadius: "1rem",
            borderTopRightRadius: "1rem",
          }}
        >
          {/* 装饰背景 */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 50%, white 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative z-10 flex items-center gap-8">
            <div className="relative group">
              <Avatar
                src={userInfo?.avatar}
                size={96}
                icon={!userInfo?.avatar && <UserOutlined />}
                className="border-4 border-white/30 shadow-xl transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-3">
                {userInfo?.nickName || userInfo?.name || "未设置昵称"}
              </h1>
              <div className="flex flex-wrap gap-2">
                {userInfo?.roles?.map((role) => (
                  <Tag
                    key={role.name}
                    className="border-0 bg-white/20 text-white px-3 py-1 rounded-full text-sm"
                  >
                    {role.name}
                  </Tag>
                ))}
              </div>
            </div>

            <Button
              type="default"
              ghost
              icon={<LockOutlined />}
              onClick={() => setShowPwdModal(true)}
              className="border-white/60 text-white hover:text-blue-500 hover:border-white hover:bg-white transition-colors duration-300"
            >
              修改密码
            </Button>
          </div>
        </div>

        {/* 主要内容区域 */}
        <div className="px-8 -mt-24 pb-8">
          <Card className="shadow-lg rounded-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 基本信息展示 */}
              <div className="space-y-6">
                <h2 className="text-lg font-medium mb-6 flex items-center gap-2">
                  <UserOutlined className="text-gray-400" />
                  基本信息
                </h2>
                <div className="space-y-4">
                  {[
                    { label: "ID", value: userInfo?.id },
                    { label: "用户名", value: userInfo?.name },
                    { label: "邮箱", value: userInfo?.email },
                    {
                      label: "角色",
                      value: userInfo?.roles?.length
                        ? userInfo.roles.map((role) => role.name).join("、")
                        : "无角色",
                    },
                    {
                      label: "状态",
                      value: (
                        <Tag
                          color={userInfo?.status === 1 ? "success" : "error"}
                          className="border-0 ml-0"
                        >
                          {userInfo?.status === 1 ? "正常" : "禁用"}
                        </Tag>
                      ),
                    },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center">
                      <span className="text-gray-500 dark:text-gray-400 w-24">
                        {label}
                      </span>
                      <span className="flex-1 font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 编辑表单 */}
              <div className="space-y-6">
                <h2 className="text-lg font-medium mb-6 flex items-center gap-2">
                  <EditOutlined className="text-gray-400" />
                  修改信息
                </h2>
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={onFinish}
                  className="space-y-4"
                >
                  <Form.Item
                    label="头像链接"
                    name="avatar"
                    rules={[
                      { type: "url", message: "请输入有效的图片链接" },
                      { required: true, message: "请输入头像链接" },
                    ]}
                  >
                    <Input
                      placeholder="输入新头像URL"
                      allowClear
                      className="rounded-lg"
                    />
                  </Form.Item>

                  <Form.Item
                    label="昵称"
                    name="nickName"
                    rules={[{ required: true, message: "请输入昵称" }]}
                  >
                    <Input
                      placeholder="请输入昵称"
                      allowClear
                      className="rounded-lg"
                    />
                  </Form.Item>

                  <Form.Item
                    label="手机号"
                    name="mobile"
                    rules={[
                      { required: true, message: "请输入手机号" },
                      { pattern: /^1[3-9]\d{9}$/, message: "手机号格式不正确" },
                    ]}
                  >
                    <Input
                      placeholder="请输入手机号"
                      allowClear
                      className="rounded-lg"
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      onClick={() => {
                        modal.confirm({
                          title: "确认修改个人信息？",
                          okText: "确认",
                          okType: "primary",
                          cancelText: "取消",
                          onOk: () => form.submit(),
                        });
                      }}
                      loading={upLoad}
                      block
                      size="large"
                      className="rounded-lg"
                    >
                      保存修改
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </Card>
        </div>
      </Card>

      {/* 密码修改弹窗 */}
      <Modal
        title="修改密码"
        open={showPwdModal}
        onCancel={() => setShowPwdModal(false)}
        footer={null}
        confirmLoading={upPwdLoad}
        destroyOnClose
        centered
        styles={{
          header: {
            borderBottom: `1px solid ${token.colorBorderSecondary}`,
            padding: "16px 24px",
          },
          body: {
            padding: "24px",
          },
        }}
      >
        <Form
          form={pwdForm}
          layout="vertical"
          onFinish={onPwdFinish}
          className="space-y-4"
        >
          <Form.Item
            label="原密码"
            name="oldPassword"
            rules={[
              { required: true, message: "请输入原密码" },
              { min: 8, message: "密码至少8位" },
            ]}
          >
            <Input.Password
              placeholder="请输入原密码"
              className="rounded-lg hover:border-blue-400"
            />
          </Form.Item>

          <Form.Item
            label="新密码"
            name="newPassword"
            rules={[
              { required: true, message: "请输入新密码" },
              { min: 8, message: "密码至少8位" },
            ]}
          >
            <Input.Password
              placeholder="请输入新密码"
              className="rounded-lg hover:border-blue-400"
            />
          </Form.Item>

          <Form.Item
            label="确认新密码"
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "请确认新密码" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("两次输入的密码不一致"));
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="请确认新密码"
              className="rounded-lg hover:border-blue-400"
            />
          </Form.Item>

          <div className="flex justify-end gap-4 pt-4">
            <Button onClick={() => setShowPwdModal(false)}>取消</Button>
            <Button type="primary" htmlType="submit" loading={upPwdLoad}>
              确认修改
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default InfoPage;

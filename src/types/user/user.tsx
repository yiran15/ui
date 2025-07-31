import { Button, Switch, TableColumnsType, Tooltip, Typography } from "antd";
import React from "react";
import { UserListResponseItem, UserUpdateRequest } from "@/types/user/user";
import { HookAPI } from "antd/es/modal/useModal";
import { CopyOutlined } from "@ant-design/icons";
import { MessageInstance } from "antd/es/message/interface";

interface GetUserColumnProps {
  message: MessageInstance;
  updateUserLoad: boolean;
  updateUserRun: (data: UserUpdateRequest) => void;
  delUserLoad: boolean;
  delUserRun: (id: string) => void;
  editUserOpen: (id: string) => void;
  modal: HookAPI;
  setRestUserPWDState: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      id: string;
      password: string;
      name: string;
    }>
  >;
}

export function GetUserColumn(props: GetUserColumnProps) {
  const {
    message,
    updateUserLoad,
    updateUserRun,
    delUserLoad,
    delUserRun,
    editUserOpen,
    modal,
    setRestUserPWDState,
  } = props;
  return [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (a: UserListResponseItem, b: UserListResponseItem) =>
        Number(a.id) - Number(b.id),
    },
    {
      title: "名称",
      dataIndex: "name",
      ellipsis: true,
      sorter: (a: UserListResponseItem, b: UserListResponseItem) =>
        a.name.localeCompare(b.name),
      render: (name: string) => {
        return (
          <Tooltip title={name} placement="topLeft">
            <span>{name}</span>
          </Tooltip>
        );
      },
    },
    {
      title: "昵称",
      dataIndex: "nickName",
      sorter: (a: UserListResponseItem, b: UserListResponseItem) =>
        a.nickName.localeCompare(b.nickName),
    },
    { title: "部门", dataIndex: "department" },
    {
      title: "邮箱",
      dataIndex: "email",
      sorter: (a: UserListResponseItem, b: UserListResponseItem) =>
        a.email.localeCompare(b.email),
      render: (email: string) => {
        if (!email) return "";
        return (
          <Typography.Text
            copyable={{
              icon: [
                <CopyOutlined
                  key="copy-icon"
                  style={{
                    fontSize: "11px",
                    height: "14px",
                    lineHeight: "14px",
                    verticalAlign: "middle",
                  }}
                />,
                <CopyOutlined
                  style={{
                    fontSize: "11px",
                    height: "14px",
                    lineHeight: "14px",
                    verticalAlign: "middle",
                  }}
                  key="copied-icon"
                />,
              ],

              text: email,
              tooltips: ["点击复制邮箱", "复制成功"],
            }}
          >
            {email}
          </Typography.Text>
        );
      },
    },
    {
      title: "手机号",
      dataIndex: "mobile",
      width: "8%",
    },
    {
      title: "状态",
      dataIndex: "status",
      width: "8%",
      render: (status: number, record: UserListResponseItem) => {
        return (
          <Switch
            checked={status === 1}
            checkedChildren="正常"
            unCheckedChildren="禁用"
            loading={updateUserLoad}
            onChange={(checked) => {
              if (Number(record.id) === 1) {
                message.error("操作失败");
                return;
              }
              const newStatus = checked ? 1 : 2;
              updateUserRun({
                id: record.id,
                status: newStatus,
              });
            }}
          />
        );
      },
    },
    {
      title: "操作",
      dataIndex: "action",
      width: "10%",
      render: (_: string, record: UserListResponseItem) => {
        return (
          <div className="flex justify-center gap-3">
            <Button
              style={{ padding: "0" }}
              type="link"
              onClick={() => {
                editUserOpen(record.id);
              }}
            >
              修改
            </Button>
            <Button
              style={{ padding: "0" }}
              type="link"
              onClick={() => {
                setRestUserPWDState({
                  open: true,
                  id: record.id,
                  password: "",
                  name: record.name,
                });
              }}
              disabled={record.status === 2}
            >
              重置
            </Button>
            <Button
              style={{ padding: "0" }}
              type="link"
              danger
              loading={delUserLoad}
              onClick={() => {
                modal.confirm({
                  title: "删除用户",
                  content: "确定删除该用户吗？",
                  okText: "确定",
                  cancelText: "取消",
                  onOk: () => {
                    if (record.name === "admin" || record.id === "1") {
                      message.error("删除失败");
                      return;
                    }
                    delUserRun(record.id);
                  },
                });
              }}
            >
              删除
            </Button>
          </div>
        );
      },
    },
  ];
}

interface DataType {
  id: string;
  name: string;
  description: string;
}

export function Rolecolumns(): TableColumnsType<DataType> {
  return [
    {
      dataIndex: "id",
      title: "ID",
      width: "20%",
    },
    {
      dataIndex: "name",
      title: "Name",
      width: "30%",
    },
    {
      dataIndex: "description",
      title: "Description",
      ellipsis: true,
      width: "50%",
      render: (text: string) => (
        <Tooltip placement="topLeft" title={text}>
          <span>{text}</span>
        </Tooltip>
      ),
    },
  ];
}

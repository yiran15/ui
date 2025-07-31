import { Tooltip } from "antd";
import { Button } from "antd";
import { RoleItem } from "./role";
import { MessageInstance } from "antd/es/message/interface";
import { HookAPI } from "antd/es/modal/useModal";

interface RoleColumnsProps {
  modal: HookAPI;
  message: MessageInstance;
  delRun: (id: string) => void;
  setRoleId: (id: string) => void;
  setEditOpen: (editRole: boolean) => void;
  delLoad: boolean;
}

export function GetRolecolumns({
  modal,
  delRun,
  setEditOpen,
  setRoleId,
  delLoad,
  message,
}: RoleColumnsProps) {
  return [
    {
      title: "角色ID",
      dataIndex: "id",
      sorter: (a: RoleItem, b: RoleItem) => Number(a.id) - Number(b.id),
    },
    {
      title: "角色名称",
      dataIndex: "name",
      sorter: (a: RoleItem, b: RoleItem) => a.name.localeCompare(b.name),
    },
    {
      title: "角色描述",
      dataIndex: "description",
      ellipsis: true,
      width: "50%",
      render: (text: string) => (
        <Tooltip title={text} placement="topLeft">
          <span>{text}</span>
        </Tooltip>
      ),
    },
    {
      title: "操作",
      width: "10%",
      render: (_: unknown, record: RoleItem) => (
        <div className="flex justify-center">
          <Button
            type="link"
            onClick={() => {
              setEditOpen(true);
              setRoleId(record.id);
            }}
          >
            修改
          </Button>
          <Button
            type="link"
            danger
            loading={delLoad}
            onClick={() => {
              modal.confirm({
                title: "确认删除角色",
                content: `确定要删除角色 ${record.name} 吗？`,
                okText: "确定",
                cancelText: "取消",
                okType: "danger",
                onOk: () => {
                  if (record.name === "admin" || record.id === "1") {
                    message.error("删除失败");
                    return;
                  }
                  delRun(record.id);
                },
              });
            }}
          >
            删除
          </Button>
        </div>
      ),
    },
  ];
}

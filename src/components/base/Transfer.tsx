import { useAutoTableScrollY } from "@/hooks/useAutoTableScrollY";
import { Table, Transfer } from "antd";
import type {
  GetProp,
  TableColumnsType,
  TableProps,
  TransferProps,
} from "antd";
import { ReactNode } from "react";
export interface MyTransferProps<T> {
  // 资源列表
  dataSource: T[];
  // 搜索过滤
  filterOption: (input: string, item: T) => boolean;
  // 列表
  columns: TableColumnsType<T>;
  titles?: ReactNode[];
  targetKeys: React.Key[] | undefined;
  setTargetKeys: (keys: React.Key[]) => void;
  extraHeight?: number;
}

type TransferItem = GetProp<TransferProps, "dataSource">[number];
type TableRowSelection<T extends object> = TableProps<T>["rowSelection"];

export default function TransferComponent<T>(props: MyTransferProps<T>) {
  const {
    filterOption,
    dataSource,
    columns,
    titles,
    targetKeys,
    setTargetKeys,
    extraHeight,
  } = props;
  const onChange: TableTransferProps<T>["onChange"] = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  return (
    <>
      <TableTransfer
        extraHeight={extraHeight}
        dataSource={dataSource}
        targetKeys={targetKeys}
        showSearch
        showSelectAll={false}
        onChange={onChange}
        filterOption={filterOption}
        leftColumns={columns}
        rightColumns={columns}
        titles={titles}
        locale={{
          itemUnit: "项",
          itemsUnit: "项",
          notFoundContent: "无数据",
          searchPlaceholder: "请输入搜索内容",
        }}
      />
    </>
  );
}

interface TableTransferProps<T> extends TransferProps<TransferItem> {
  dataSource: T[];
  leftColumns: TableColumnsType<T>;
  rightColumns: TableColumnsType<T>;
  extraHeight?: number;
}

function TableTransfer<T>(props: TableTransferProps<T>) {
  const { leftColumns, rightColumns, extraHeight, ...restProps } = props;
  const { scrollY, tableRef } = useAutoTableScrollY({
    extraHeight: extraHeight,
  });
  return (
    <Transfer style={{ width: "100%" }} {...restProps}>
      {({
        direction,
        onItemSelect,
        onItemSelectAll,
        filteredItems,
        selectedKeys: listSelectedKeys,
        disabled: listDisabled,
      }) => {
        const columns = direction === "left" ? leftColumns : rightColumns;
        const rowSelection: TableRowSelection<TransferItem> = {
          getCheckboxProps: () => ({ disabled: listDisabled }),
          onChange(selectedRowKeys) {
            onItemSelectAll(selectedRowKeys, "replace");
          },
          selectedRowKeys: listSelectedKeys,
        };

        return (
          <div ref={tableRef}>
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={filteredItems}
              pagination={false}
              scroll={{ y: scrollY }}
              size="small"
              rowKey="key"
              style={{ pointerEvents: listDisabled ? "none" : undefined }}
              onRow={({ key, disabled: itemDisabled }) => ({
                onClick: () => {
                  if (itemDisabled || listDisabled) {
                    return;
                  }
                  onItemSelect(key, !listSelectedKeys.includes(key));
                },
              })}
            />
          </div>
        );
      }}
    </Transfer>
  );
}

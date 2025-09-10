import { useParams } from "@/hooks/useParams";
import { Button } from "antd";
import { useEffect } from "react";

export default function Test() {
  console.log("渲染");
  const { getParam, setParams, replaceParams, removeParam, clearParams } = useParams();
  const page = getParam("page");
  const pageSize = getParam("pageSize");
  useEffect(() => {
    console.log("useEffect");
    console.log("page or pageSize changed:", page, pageSize);
  }, [page, pageSize]);
  return (
    <div className="flex gap-4">
      <Button type="primary" onClick={() => setParams({ page: "1", pageSize: "10" })}>
      setParams 1 10
      </Button>
      <Button
        type="primary"
        onClick={() => setParams({ page: "2", pageSize: "20" })}
      >
      setParams 2 20
      </Button>
      <Button type="primary" onClick={() => replaceParams({ page: "3", pageSize: "30" })}>
      replaceParams 3 30
      </Button>
      <Button type="primary" onClick={() => removeParam("page")}>
      removeParam page
      </Button>
      <Button type="primary" onClick={() => clearParams()}>
      clearParams
      </Button>
    </div>
  );
}

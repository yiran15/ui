import { GetOAuth2Provider } from "@/services/oauth2";
import { useRequest } from "ahooks";
import { Button, Divider } from "antd";
import FeiShuSvg from "@/assets/feishu.svg?react";
import KeycloakSvg from "@/assets/keycloak.svg?react";

export default function OAuthComponent() {
  const { data } = useRequest(GetOAuth2Provider);
  const oauthLogin = (provider: "feishu" | "keycloak") =>
    `/api/v1/oauth2/login?provider=${provider}`;
  const handleLogin = (provider: "feishu" | "keycloak") => {
    window.location.href = oauthLogin(provider);
  };

  const getOAuth2Provider = (data: string[]) => {
    return data.map((item) => {
      switch (item) {
        case "feishu":
          return (
            <Button
              key={item}
              icon={<FeiShuSvg width="24" height="24" />}
              onClick={() => handleLogin(item)}
              style={{ display: "flex", alignItems: "center" }}
            >
              飞书登录
            </Button>
          );
        case "keycloak":
          return (
            <Button
              key={item}
              icon={<KeycloakSvg width="24" height="24" />}
              onClick={() => handleLogin(item)}
              style={{ display: "flex", alignItems: "center" }}
            >
              Keycloak 登录
            </Button>
          );
        default:
          return null;
      }
    });
  };
  return (
    <>
      {data && data.length > 0 && (
        <>
          <Divider>其他登录方式</Divider>
          <div className="flex justify-center gap-4 mb-2">
            {getOAuth2Provider(data)}
          </div>
        </>
      )}
    </>
  );
}

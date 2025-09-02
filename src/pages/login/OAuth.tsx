import { useParams } from "@/hooks/useParams";
import { OAuthLogin } from "@/services/oauth2";
import { useRequest } from "ahooks";
import { useEffect } from "react";

export default function OAuthPage() {
  // TODO OAuth
  const { getParam } = useParams();
  const state = getParam("state");
  const code = getParam("code");
  const { run, data } = useRequest(OAuthLogin, {
    manual: true,
  });

  useEffect(() => {
    console.log(state, code);
    if (state && code) {
      run(code, state);
    }
  }, [state, code, run]);

  return <>{data && JSON.stringify(data)}</>;
}

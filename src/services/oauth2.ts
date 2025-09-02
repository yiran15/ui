import { OAuthLoginRequest } from "@/types/user/user";
import { get } from "./http";

export function GetOAuth2Provider(): Promise<string[]> {
  return get("/api/v1/oauth2/provider");
}

export function OAuthLogin(
  code: string,
  state: string
): Promise<OAuthLoginRequest> {
  return get(`/api/v1/oauth2/callback?code=${code}&state=${state}`);
}

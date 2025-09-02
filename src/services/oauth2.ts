import { get } from "./http";

export function GetOAuth2Provider(): Promise<string[]> {
  return get("/api/v1/oauth2/provider");
}

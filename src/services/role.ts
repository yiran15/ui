import {
  RoleItem,
  RoleListRequest,
  RoleListResponse,
  RoleCreateRequest,
  RoleUpdateRequest,
} from "@/types/role/role";
import { del, get, post, put } from "@/services/http";
import { ApiResponse } from "@/types";

export function ListRole(params: RoleListRequest): Promise<RoleListResponse> {
  return get<RoleListResponse>("/api/v1/role", params);
}

export function QueryRole(id: string): Promise<RoleItem> {
  return get<RoleItem>(`/api/v1/role/${id}`);
}

export function CreateRole(data: RoleCreateRequest): Promise<ApiResponse> {
  return post<ApiResponse>(`/api/v1/role`, data);
}

export function DeleteRole(id: string): Promise<ApiResponse> {
  return del<ApiResponse>(`/api/v1/role/${id}`);
}

export function UpdateRole(
  id: string,
  data: RoleUpdateRequest
): Promise<ApiResponse> {
  return put<ApiResponse>(`/api/v1/role/${id}`, data);
}

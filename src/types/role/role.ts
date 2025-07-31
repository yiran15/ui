import { Api } from "../api/api";

export interface RoleListRequest {
  page: number;
  pageSize: number;
  name?: string;
}

export interface RoleListResponse {
  total: number;
  page: number;
  pageSize: number;
  list: RoleItem[];
}

export interface RoleItem {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  apis: Api[];
}

export interface RoleCreateRequest {
  name: string;
  description: string;
  apis: number[];
}

export interface RoleUpdateRequest {
  description: string;
  apis: number[];
}

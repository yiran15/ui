# yiran-ui

## 简介

前端项目

基于 react + typescript + antd + vite

[后端](https://github.com/yiran15/api-server)

## 功能

- 用户管理: 增删改查
![用户管理](docs/img/user.png)

- 角色管理: 增删改查
![角色管理](docs/img/role.png)

- 接口权限管理: 增删改查
![接口权限管理](docs/img/api.png)

## 启动

静态文件服务器使用的是 `Caddy` 使用 `docker compose` 启动, 可以自动完成证书的申请和配置。

- `conf` 目录存储 `Caddy` 配置文件, 按需修改其中的主机名。
- `site` 存放的是编译之后的静态资源。

```bash
# 编译部署
make deploy

# 启动 docker compose
make up
```

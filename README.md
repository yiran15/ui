# yiran-ui

## 简介

前端项目

基于 react + typescript + antd + vite 构建的前端项目，[后端地址](https://github.com/yiran15/api-server)

## 功能

### 用户管理

![用户管理](docs/img/user.png)

### 角色管理

![角色管理](docs/img/role.png)

### 接口权限管理

![接口权限管理](docs/img/api.png)

### OAuth2 登录

支持 OAuth2 登录，目前支持飞书、keycloak。

![OAuth2 登录](docs/img/oauth2-1.png)
![OAuth2 登录](docs/img/oauth2-feishu.png)

## 快速开始

### 配置

项目启动使用 nginx 来处理静态文件，后端使用 `docker compose` 启动。

- `server_name` 需要根据实际情况修改。
- `proxy_pass` 需要根据实际情况修改。
- `ssl_certificate` 和 `ssl_certificate_key` 需要根据实际情况修改。

```nginx
server {
  listen 80;
  server_name qqlx.net;

  location / {
    return 301 https://qqlx.net$request_uri;
  }
}

server {
  listen 443 ssl;
  server_name qqlx.net;

  ssl_protocols       TLSv1.2 TLSv1.3;
  ssl_ciphers         ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
  ssl_certificate     /etc/nginx/cert/qqlx.pem;
  ssl_certificate_key /etc/nginx/cert/qqlx.key;
  ssl_session_cache   shared:SSL:10m;
  ssl_session_timeout 10m;
  proxy_set_header        Host $host;
  proxy_set_header        X-Real-IP $remote_addr;
  proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header        X-Forwarded-Proto $scheme;
  proxy_read_timeout      600s;
  proxy_send_timeout      600s;

  # 静态资源根目录
  location / {
    root /data/html/apiserver/;
    index index.html;
    try_files $uri /index.html; # 支持前端路由
  }

  location ~ /swagger/* {
    proxy_pass http://localhost:8080;
  }

  location ~* \.(?:js|css|ico|gif|jpg|jpeg|png|svg|woff2?|ttf|eot)$ {
    root /data/html/apiserver/;
    access_log off;
    # 协商缓存（让浏览器带 If-Modified-Since / If-None-Match）
    etag on;
    add_header Cache-Control "no-cache";   # 告诉浏览器每次要去服务器确认
  }

  # 使用同样的域名变量
  location /api {
    proxy_pass http://localhost:8080;
  }
}
```

### 启动

```bash
# 编译部署
make deploy
```

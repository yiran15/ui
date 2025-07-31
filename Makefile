.PHONY: build clean deploy

# 构建项目
build:
	@echo "Installing dependencies..."
	yarn install
	@echo "Building project..."
	yarn build
	@echo "Copying dist to target directory..."
	mkdir -p /data/html/apiserver
	cp -a /root/yiran/ui/dist/* /data/html/apiserver/
	@echo "Removing dist directory..."
	rm -fr dist/

# 清理 site 目录
clean:
	rm -rf site/*
	mkdir -p site

# 构建并拷贝到 site 目录
deploy: clean build
	cp -r dist/* site/

# 启动 Docker Compose 项目
up:
	docker compose up -d

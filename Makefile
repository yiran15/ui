.PHONY: deploy

# 构建项目
deploy:
	@echo "Installing dependencies..."
	yarn install
	@echo "Building project..."
	yarn build
	@echo "Copying dist to target directory..."
	mkdir -p /data/html/apiserver
	cp -a $(CURDIR)/dist/* /data/html/apiserver/
	@echo "Removing dist directory..."
	rm -fr dist/

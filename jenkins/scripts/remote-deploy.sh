#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
DEPLOY_DIR="$SCRIPT_DIR/deploy"

# 创建部署目录
mkdir -p $DEPLOY_DIR

# 复制文件到部署目录
cp $SCRIPT_DIR/docker-compose.deploy.yml $DEPLOY_DIR/
cp $SCRIPT_DIR/.env $DEPLOY_DIR/

# 确保 .env 中有必需的变量
if ! grep -q "BETTER_AUTH_SECRET" $DEPLOY_DIR/.env; then
    echo "BETTER_AUTH_SECRET=paperclip-dev-secret" >> $DEPLOY_DIR/.env
fi

# 如果有镜像 tar 包，加载它
if [ -f $SCRIPT_DIR/image.tar.gz ]; then
    echo "Loading Docker image..."
    gunzip -c $SCRIPT_DIR/image.tar.gz | docker load

    # 获取加载的镜像名称并重新打标签为 latest
    LOADED_IMAGE=$(docker images --format "{{.Repository}}:{{.Tag}}" | head -1)
    if [ -n "$LOADED_IMAGE" ]; then
        echo "Tagging $LOADED_IMAGE as paperclip:latest"
        docker tag $LOADED_IMAGE paperclip:latest
    fi
fi

# 如果有多个镜像 tar 包（分离模式），分别加载
for tar_file in $SCRIPT_DIR/*.tar.gz; do
    if [ -f "$tar_file" ] && [ "$tar_file" != "$SCRIPT_DIR/image.tar.gz" ]; then
        echo "Loading image from $tar_file..."
        gunzip -c "$tar_file" | docker load
    fi
done

# 进入部署目录
cd $DEPLOY_DIR

# 显示 .env 内容（调试用）
echo "=== .env content ==="
cat .env
echo "===================="

# 确定部署模式 profile
DEPLOY_PROFILE=${DEPLOY_MODE:-combined}

# 执行部署
echo "Starting deployment (mode: $DEPLOY_PROFILE)..."
docker compose -f docker-compose.deploy.yml --profile $DEPLOY_PROFILE ${AI_PROFILES} --env-file .env up -d

echo "Deployment completed!"

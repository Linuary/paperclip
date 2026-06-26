#!/bin/bash
set -e

DEPLOY_DIR="/opt/app"

# 创建部署目录（需要 sudo）
sudo mkdir -p $DEPLOY_DIR
sudo chown $(whoami):$(whoami) $DEPLOY_DIR

# 复制文件到部署目录
cp /tmp/docker-compose.deploy.yml $DEPLOY_DIR/
cp /tmp/.env $DEPLOY_DIR/

# 如果有镜像 tar 包，加载它
if [ -f /tmp/image.tar.gz ]; then
    echo "Loading Docker image..."
    gunzip -c /tmp/image.tar.gz | docker load
fi

# 进入部署目录
cd $DEPLOY_DIR

# 执行部署
echo "Starting deployment..."
docker compose -f docker-compose.deploy.yml --profile combined ${AI_PROFILES} --env-file .env up -d

echo "Deployment completed!"

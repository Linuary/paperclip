#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
DEPLOY_DIR="$SCRIPT_DIR/deploy"

# 创建部署目录
mkdir -p $DEPLOY_DIR

# 复制文件到部署目录
cp $SCRIPT_DIR/docker-compose.deploy.yml $DEPLOY_DIR/

# 合并 .env 文件（如果已存在则合并，否则直接复制）
if [ -f $DEPLOY_DIR/.env ]; then
    echo "Merging .env files..."
    # 保存旧的 .env
    cp $DEPLOY_DIR/.env $DEPLOY_DIR/.env.old
    # 复制新的 .env
    cp $SCRIPT_DIR/.env $DEPLOY_DIR/.env.new
    # 合并：新的优先，旧的补充
    # 先读取旧的，再用新的覆盖
    declare -A env_vars
    while IFS='=' read -r key value; do
        if [[ -n "$key" && ! "$key" =~ ^# ]]; then
            env_vars["$key"]="$value"
        fi
    done < $DEPLOY_DIR/.env.old
    while IFS='=' read -r key value; do
        if [[ -n "$key" && ! "$key" =~ ^# ]]; then
            env_vars["$key"]="$value"
        fi
    done < $DEPLOY_DIR/.env.new
    # 写入合并后的 .env
    > $DEPLOY_DIR/.env
    for key in "${!env_vars[@]}"; do
        echo "$key=${env_vars[$key]}" >> $DEPLOY_DIR/.env
    done
    rm -f $DEPLOY_DIR/.env.old $DEPLOY_DIR/.env.new
else
    cp $SCRIPT_DIR/.env $DEPLOY_DIR/.env
fi

# 确保 .env 中有 BETTER_AUTH_SECRET
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

# 进入部署目录
cd $DEPLOY_DIR

# 执行部署
echo "Starting deployment..."
docker compose -f docker-compose.deploy.yml --profile combined ${AI_PROFILES} --env-file .env up -d

echo "Deployment completed!"

# Jenkins 通用构建部署平台

## 目录结构

```
jenkins/
├── Jenkinsfile                    # 通用 Pipeline（支持任意项目）
├── README.md                      # 本文件
├── Dockerfile.frontend            # Paperclip 前端镜像（nginx）
├── Dockerfile.backend             # Paperclip 后端镜像（API）
└── docker/
    ├── docker-compose.deploy.yml  # 部署编排（合并/分离两种模式）
    ├── nginx.conf                 # 前端 nginx 配置
    └── env/                       # 各环境配置模板
        ├── local.env
        ├── dev.env
        ├── test.env
        ├── demo.env
        ├── staging.env
        └── prod.env
```

## 快速开始

### 1. Jenkins 配置

1. 安装插件：Git, Docker Pipeline, SSH Agent
2. 创建 Credentials：
   - `ssh-deploy-key`：远程服务器 SSH 私钥
   - `docker-registry-auth`：镜像仓库认证（可选）
   - `github-credentials`：GitHub 认证（可选，私有仓库需要）
3. 敏感环境变量通过 `SECRET_VARS` 参数传入，Jenkins 会自动遮蔽
4. 创建 Pipeline Job，指向本 `Jenkinsfile`

### 2. Paperclip 部署示例

| 参数 | 值 |
|------|-----|
| GIT_URL | https://github.com/Linuary/paperclip.git |
| BRANCH | dev-custom |
| PROJECT_TYPE | node-docker |
| DOCKERFILE | Dockerfile |
| IMAGE_NAME | paperclip |
| ACTION | build+deploy |
| TARGET_ENV | local |
| DEPLOY_METHOD | docker-compose |
| TARGET_HOST | 47.236.51.128 |
| TARGET_USER | root |
| TARGET_PORT | 22 |
| PUSH_REGISTRY | false |
| ENV_VARS | PORT=8088 |
| SECRET_VARS | DATABASE_URL=postgres://user:pass@47.236.51.128:5432/paperclip（从 Jenkins Credentials 获取） |

### 3. 服务器信息

- 目标主机：`47.236.51.128`
- PostgreSQL：`47.236.51.128:5432`（凭据通过 Jenkins Credentials 管理）
- Redis：`47.236.51.128:7001`（凭据通过 Jenkins Credentials 管理）

## 支持的项目类型

| 类型 | 说明 |
|------|------|
| node-docker | Node.js + Docker |
| java-maven | Java Maven |
| java-gradle | Java Gradle |
| python | Python |
| go | Go |
| custom | 自定义命令 |

## 部署方式

- **Docker Compose**：单机部署，支持合并/分离模式
- **Kubernetes**：集群部署，使用 kubectl

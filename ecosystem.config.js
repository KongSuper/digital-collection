/**
 * PM2 进程管理配置
 * PM2 是 Node.js 应用的守护进程工具——应用崩溃了自动重启，
 * 服务器重启后自动启动，还能看日志和性能监控。
 *
 * 使用方法：
 * 1. npm install -g pm2
 * 2. pm2 start ecosystem.config.js
 * 3. pm2 save     （保存进程列表，服务器重启后自动恢复）
 * 4. pm2 startup  （设置开机自启）
 */
module.exports = {
  apps: [
    {
      name: 'digital-collection',
      script: 'node_modules/.bin/next',
      args: 'start',
      // 部署目录（根据实际 VPS 路径修改）
      cwd: '/var/www/digital-collection',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};

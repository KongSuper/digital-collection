@echo off
chcp 65001 >nul
title 数字收藏馆

cd /d "%~dp0"

if not exist "node_modules" (
    echo [1/2] 检测到未安装依赖，正在安装...
    call npm install
    echo.
)

echo [2/2] 启动开发服务器...
echo 浏览器打开 http://localhost:3000
echo 按 Ctrl+C 停止
echo.
call npm run dev
pause

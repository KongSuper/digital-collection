@echo off
title 数字收藏馆

cd /d "G:\Blog"

if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)

echo Starting dev server...
echo Open http://localhost:3000
echo Press Ctrl+C to stop
npm run dev
pause

@echo off
chcp 65001 >nul
echo ========================================
echo  Paperclip Frontend - Stopping...
echo ========================================
echo.

REM Kill the frontend dev server process on port 5173
for /f "tokens=5" %%a in ('netstat -ano ^| findstr "LISTENING" ^| findstr ":5173 "') do (
    echo Found frontend process PID: %%a
    taskkill /F /PID %%a >nul 2>&1
    if not errorlevel 1 (
        echo [OK] Frontend process %%a terminated
    ) else (
        echo [SKIP] Could not terminate PID %%a
    )
)

echo.
echo ========================================
echo  Paperclip Frontend - Stopped
echo ========================================
pause

@echo off
REM Script para compilar Zaro Instrucciones para producción

echo.
echo ========================================
echo  Zaro Instrucciones - Build
echo ========================================
echo.

REM Navegar a la carpeta del proyecto
cd /d "%~dp0"

REM Verificar si node_modules existe
if not exist "node_modules" (
    echo Instalando dependencias...
    call npm install
    echo.
)

echo Compilando para producción...
echo.
call npm run build

echo.
echo ========================================
echo Compilación completada!
echo Los archivos están en la carpeta 'dist/'
echo ========================================
echo.

pause

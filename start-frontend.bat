@echo off
echo ====================================
echo  INICIANDO FRONTEND - EXPO GO
echo ====================================
echo.
echo IMPORTANTE: Certifique-se de que:
echo 1. Backend esta rodando (use start-project.bat primeiro)
echo 2. Expo Go esta atualizado (versao 2.33.21+)
echo 3. Celular e PC na mesma rede Wi-Fi
echo.
echo Iniciando frontend...
echo.
cd frontend
npx expo start
echo.
pause

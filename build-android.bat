@echo off
echo ====================================
echo  BUILD ANDROID NATIVO - VERSAO 1.9.10
echo ====================================
echo.
echo Limpando caches antigos...
echo.
cd frontend
if exist android\.gradle rmdir /s /q android\.gradle
if exist android\build rmdir /s /q android\build
if exist android\app\build rmdir /s /q android\app\build
echo.
echo Fazendo clean do Gradle...
echo.
cd android
gradlew clean
cd ..
echo.
echo Fazendo prebuild clean...
echo.
npx expo prebuild --clean
echo.
echo Iniciando build nativo do Android...
echo.
npx expo run:android
echo.
pause

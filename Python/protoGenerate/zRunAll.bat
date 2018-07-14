@echo off
python runAllProtoc.py
set result=%ERRORLEVEL%

echo.
echo.
echo.
echo.
echo.
echo.

If %result% == 1 (
  echo ----------------------ERROR
) Else (
  echo SUCCESS
)

echo.
echo.
echo.
echo.
echo.
echo.

pause
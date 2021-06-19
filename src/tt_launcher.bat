@ECHO OFF
setlocal enabledelayedexpansion 
set launcher_version=v04
COLOR 0b
TITLE TT Launcher %launcher_version%
ECHO ============================
ECHO   TRANSPORT TYCOON SERVERS
ECHO ============================

set server_name[1]=Server #1 (OneSync)
set server_endpoint[1]=w8r4q4
set server_name[2]=Server #2
set server_endpoint[2]=2epova
set server_name[3]=Server #3
set server_endpoint[3]=2epovd
set server_name[4]=Server #4
set server_endpoint[4]=wdrypd
set server_name[5]=Server #5 (Beta)
set server_endpoint[5]=njyvop
set server_name[6]=Server #6
set server_endpoint[6]=2r4588
set server_name[7]=Server #7
set server_endpoint[7]=npl5oy
set server_name[8]=Server #8
set server_endpoint[8]=2vzlde
set server_name[9]=Server #9
set server_endpoint[9]=wmapod
set server_name[10]=Server #A
set server_endpoint[10]=wxjpge
set server_name[11]=-
set server_endpoint[11]=-
set server_name[12]=LITE Transportation
set server_endpoint[12]=dgpvx3

for /l %%n in (1,1,12) do ( 
   echo %%n - !server_name[%%n]!
)

ECHO ============================

:select.ask
set found=0
set /p "selected=## Select server: "

for /l %%n in (1,1,12) do ( 
   if %selected%==%%n (
       echo ## fivem://connect/cfx.re/join/!server_endpoint[%selected%]!
       explorer.exe "fivem://connect/cfx.re/join/!server_endpoint[%selected%]!"
       echo ## Joining !server_name[%selected%]!, launcher exitting...
       set found=1
   )
)
if %found%==1 (
    @REM pause
    timeout 10
    @REM timeout /t 5 /nobreak
) ELSE (
    echo ## Invalid server, try again
    goto :select.ask
)
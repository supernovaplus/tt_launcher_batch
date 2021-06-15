const fs = require("fs");

fs.copyFile("tt_launcher.bat", "build/tt_launcher.bat", (err, res) => {
    if(err){
        throw err;
    }
})

fs.writeFileSync("build/index.html", `

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>gasdgasdhsd</title>
</head>
<body>
    gasdgasdg ${Date.now()}
</body>
</html>

`);
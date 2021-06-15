const fs = require("fs");

const launcher_data = fs.readFileSync("src/tt_launcher.bat", "utf-8");
if(!launcher_data) throw new Error("no launcher data");

let launcher_version_string = launcher_data.match(/set launcher_version=(v[0-9]+)/g)?.[0];
if(!launcher_version_string) throw new Error("no launcher version found");
launcher_version_string = launcher_version_string.split("=")[1];

let template = fs.readFileSync("src/front.html", "utf-8");
if(!template || typeof template !== "string") throw new Error("Invalid string");
template = template
.replace(/%%title%%/g, `TT Launcher ${launcher_version_string}`)
.replace("%%bat_code%%", launcher_data);

fs.writeFileSync("build/tt_launcher.bat", launcher_data);
fs.writeFileSync("build/index.html", template);

fs.copyFileSync("src/style.css", "build/style.css");
fs.copyFileSync("src/code.jpg", "build/code.jpg");
const fs = require("fs");

const build_folder = "./build/";
const src_folder = "./src/";

try{
    fs.mkdirSync(build_folder);
}catch(err){};

fs.readdirSync(build_folder).forEach(file => fs.unlinkSync(build_folder + file));

const launcher_text = fs.readFileSync("src/tt_launcher.bat", "utf-8");
if(!launcher_text) throw new Error("no launcher data found #1");

let launcher_version_string = launcher_text.match(/set launcher_version=(v[0-9]+)/g)[0];
if(!launcher_version_string) throw new Error("no launcher version found #2");
launcher_version_string = launcher_version_string.split("=")[1];

let html = fs.readFileSync(src_folder + "front.html", "utf-8");
if(!html || typeof html !== "string") throw new Error("no launcher version found #3");
html = html
.replace(/%%title%%/g, `TT Launcher ${launcher_version_string}`)
.replace(/%%bat_code%%/g, launcher_text);

const servers_list_regex1 = /set server_name\[[0-9]+\]=(.*)\r\nset server_endpoint\[[0-9]+\]=(.*)/g;
const servers_list_regex2 = /set server_name\[[0-9]+\]=(.*)\r\nset server_endpoint\[[0-9]+\]=(.*)/;

let servers_list_match = (Array.from(html.match(servers_list_regex1)) || []);
if(!servers_list_match) throw new Error("no servers matched #1");

servers_list_match = (servers_list_match.map(el => servers_list_regex2.exec(el)) || []).map(el => el[1])
if(!servers_list_match) throw new Error("no servers matched #2");

html = html
.replace(/%%servers_list%%/g, servers_list_match.map((server, index) => `${index + 1} - ${server}`).join("<br>\n") + "<br>");

fs.writeFileSync(build_folder + "tt_launcher.bat", launcher_text);
fs.writeFileSync(build_folder + "index.html", html);

// fs.copyFileSync("src/style.css", build_folder + "style.css");
// fs.copyFileSync("src/code.jpg", build_folder + "code.jpg");
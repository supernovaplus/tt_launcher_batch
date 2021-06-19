const fs = require("fs");

const build_folder = "build/";
const src_folder = "src/";

fs.readdirSync(build_folder).map(file => fs.unlinkSync(build_folder + file));

const launcher_data = fs.readFileSync("src/tt_launcher.bat", "utf-8");
if(!launcher_data) throw new Error("no launcher data");

let launcher_version_string = launcher_data.match(/set launcher_version=(v[0-9]+)/g)[0];
if(!launcher_version_string) throw new Error("no launcher version found");
launcher_version_string = launcher_version_string.split("=")[1];

let template = fs.readFileSync(src_folder + "front.html", "utf-8");
if(!template || typeof template !== "string") throw new Error("Invalid string");
template = template
.replace(/%%title%%/g, `TT Launcher ${launcher_version_string}`)
.replace(/%%bat_code%%/g, launcher_data);

// const servers_list_regex = /set server_name\[.?\]\=(.*)\nset server_endpoint\[.*\]\=(.*)/g;
// const servers_list = launcher_data.match(servers_list_regex)//.map(el=>server_id_regex.exec(el))
// console.log(launcher_data)
// console.log(servers_list)

const servers_list_regex1 = /set server_name\[[0-9]+\]=(.*)\r\nset server_endpoint\[[0-9]+\]=(.*)/g;
const servers_list_regex2 = /set server_name\[[0-9]+\]=(.*)\r\nset server_endpoint\[[0-9]+\]=(.*)/;

let servers_list_match = (Array.from(template.match(servers_list_regex1)) || []);
if(!servers_list_match) throw new Error("no servers match #1");

servers_list_match = (servers_list_match.map(el => servers_list_regex2.exec(el)) || []).map(el => el[1])
if(!servers_list_match) throw new Error("no servers match #2");

// 1 - Server #1 (OneSync)<br>
// 2 - Server #2<br>

template = template
.replace(/%%servers_list%%/g, servers_list_match.map((server, index) => `${index + 1} - ${server}`).join("<br>") + "<br>");

fs.writeFileSync(build_folder + "tt_launcher.bat", launcher_data);

fs.writeFileSync(build_folder + "index.html", template);

// fs.copyFileSync("src/style.css", build_folder + "style.css");
// fs.copyFileSync("src/code.jpg", build_folder + "code.jpg");
import http from "node:http";
import fs from "node:fs";
const out = process.argv[2];
for (const [port, name] of [[4101, "business"], [4102, "recruitment"]]) {
  http.createServer((req, res) => {
    let size = 0; let body = "";
    req.on("data", (c) => { size += c.length; if (body.length < 4000) body += c; });
    req.on("end", () => {
      fs.appendFileSync(out, `${name} <- ${req.headers["content-type"]?.split(";")[0]} secret=${req.headers["x-webhook-secret"]} bytes=${size} type=${(body.match(/"type":"(\w+)"|name="type"\r\n\r\n(\w+)/) || []).slice(1).find(Boolean)}\n`);
      res.writeHead(200).end("ok");
    });
  }).listen(port);
}

import { html } from "@elysiajs/html";
import { v4 as uuidv4 } from "uuid";

import { Elysia } from "elysia";
import MainPage from "./components/mainpage";

const app = new Elysia()
  .use(html())
  .get("/", ({ html }) => (
    <BaseHtml>
      <body class="m-5">
        <MainPage />
      </body>
    </BaseHtml>
  ))
  .post("/render", async ({ body, set }) => {
    const { code } = body as any;
    console.log("code", code);

    // save code to input file
    Bun.write("input.dot", code);

    const uuid = uuidv4();

    const proc = Bun.spawnSync([
      "dot",
      "-Tsvg",
      "input.dot",
      "-o",
      `./images/${uuid}.svg`,
    ]);
    // Feed in the code
    if (proc.exitCode !== 0) {
      const message = proc.stderr.toString();
      console.log("error", message);

      set.headers["HX-Retarget"] = "#error";
      return <div class="text-red-500">{message}</div>;
    } else {
      return (
        <div>
          <div id="error"></div>
          <img onerror="this.style.display='none'" src={`/image/${uuid}`} />
        </div>
      );
    }
  })
  .get("/styles.css", () => Bun.file("./tailwind-gen/styles.css"))
  .get("/spinner", () => Bun.file("./90-ring.svg"))
  .get("/image/:id", (req) => {
    const id = req.params.id;
    return Bun.file(`./images/${id}.svg`);
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);

const BaseHtml = ({ children }: any) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dot Language Visualizer</title>
  <script src="https://unpkg.com/htmx.org@1.9.6" integrity="sha384-FhXw7b6AlE/jyjlZH5iHa/tTe9EpJ1Y55RjcgPbjeWMskSxZt1v9qkxLJWNJaGni" crossorigin="anonymous"></script>
  <link href="/styles.css" rel="stylesheet">
</head>

${children}
`;

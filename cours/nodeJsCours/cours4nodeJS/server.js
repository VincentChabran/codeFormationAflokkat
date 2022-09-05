const { createServer } = require("http");
const findMyWay = require("find-my-way");

const router = findMyWay();

// crée un lien
router.get("/", (request, responce) => {
    responce.end('<h1>Bonjour Aflokkat </h1><a href="/hello">Version anglaise</a>');
});

// crée un 2eme lien
router.get("/hello", (request, responce) => {
    responce.end('<h1>Hello Aflokkat </h1><a href="/">Version francaise</a>');
});

// crée un 3eme lien
router.get("/*", (request, response) => {
    response.statusCode = 404;
    response.end("<h1> Error 404 : Page Introuvable");
});

const server = createServer();

server.on("request", (request, responce) => {
    router.lookup(request, responce);

    // if (request.url === "/") {
    //     responce.end('<h1>Bonjour Aflokkat </h1><a href="/hello">Version anglaise</a>');
    // } else if (request.url === "/hello") {
    //     responce.end('<h1>Hello Aflokkat </h1><a href="/">Version Francaise</a>');
    // } else {
    //     responce.statusCode = 404;
    //     responce.end("<h1> Page introuveable</h1>");
    // }

    // responce.setHeader("Content-Type", "text/html");
    // responce.end("<h1>Bonjour Aflokkat </h1>");
});

server.listen(3000);

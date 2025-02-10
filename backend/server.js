const app = require("./app")
const http = require("http");
const PORT = process.env.PORT || 3000;

const server = http.createServer(app); //wraps express app around the http server



server.listen(PORT, (error) => {
    if (error) {
        console.log("Error running the  Server: " + error);
    }
    else console.log("Server is live on the port: " + `http://localhost:` + PORT);
})
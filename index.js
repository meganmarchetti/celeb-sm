const express = require('express');
const app = express();
const port = "3400";
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");

app.get("/", (request, response) => {
    response.render("home.ejs");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

app.get("/:qn", (request, response) => {
    const q = request.params["qn"];
    response.render(""+q+".ejs");
});

app.get("/:cn", (request, response) => {
    const c = request.params["cn"];
    response.render(""+c+".ejs");
});
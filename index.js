const { request, response } = require('express');
const express = require('express');
const app = express();
const port = process.env.PORT || 3400;
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");

var session = require('express-session');
app.use(session({
  secret: 'qwertyuiop',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.get("/", (request, response) => {
    let session_username = "";
    let punctuation = "";
    let invalid_login = false;
    const url = request.url;
    var params = new URLSearchParams(url);

    if(request.session && request.session.username){
        session_username = request.session.username;
        punctuation = ",";
    }
    response.render("sign.ejs", {user: session_username, punctuation: punctuation, invalid_login: invalid_login});
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

app.post("/signup", (request, response) => {
    const valid_user = [
        {"name": "ketti", "password": "ketti"}, 
        {"name": "betty", "password": "white"}
    ];
	const user = request.body.username;
    const pass = request.body.password;

    const found_user = valid_user.find (login => {
		return login.name == user && login.password == pass;
	});

	if (found_user) {
		request.session.username = user;
		response.redirect("/home");
	} else {
		request.session.destroy(() => {
			console.log("user reset");
		});
		response.redirect("/?reason=invalid_user");
	}
});

app.get("/home", (request, response) => {
    if (request.session && request.session.username) {
        response.render("home.ejs", {user: request.session.username});
    }
    else {
        response.redirect("/");
    }
});



app.get("/sign", (request, response) => {
    if ( request.session && request.session.username ) {
		response.render("sign.ejs", {user: request.session.username});
	} else {
		response.redirect("/");
    }
});

app.get("/:qn", (request, response) => {
    const q = request.params["qn"];
    if (request.session && request.session.username) {
        response.render(""+q+".ejs", {user: request.session.username});
    }
    else {
        response.redirect("/");
    }
});

app.get("/:cn", (request, response) => {
    const c = request.params["cn"];
    if (request.session && request.session.username) {
        response.render(""+c+".ejs", {user: request.session.username});
    }
    else {
        response.redirect("/");
    }
});


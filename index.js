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
    // const url = request.url;
    invalid_login = request.query.reason || null;

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
        request.session.soulmate = "N/A";
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
        response.render("home.ejs", {user: request.session.username, smate: request.session.soulmate});
    }
    else {
        response.redirect("/");
    }
});



app.get("/sign", (request, response) => {
    if ( request.session && request.session.username ) {
		response.render("sign.ejs", {user: request.session.username, smate: request.session.soulmate});
	} else {
		response.redirect("/");
    }
});

app.get("/:qn", (request, response) => {
    const q = request.params["qn"];
    if (request.session && request.session.username) {
        response.render(""+q+".ejs", {user: request.session.username, smate: request.session.soulmate});
    }
    else {
        response.redirect("/");
    }
});

app.get("/:cn", (request, response) => {
    const c = request.params["cn"];
    if (request.session && request.session.username) {
        // if (c == "c1"){
        //     request.session.soulmate = "Betty White";
        // }
        // else if (c == "c2"){
        //     request.session.soulmate = "The Rock";
        // }
        // else if (c == "c3"){
        //     request.session.soulmate = "Snoop Dogg";
        // }
        // else if (c == "c4"){
        //     request.session.soulmate = "Danny Devito";
        // }
        // else if (c == "c5"){
        //     request.session.soulmate = "Tony the Tiger";
        // }
        // else if (c == "c6"){
        //     request.session.soulmate = "Lady Gaga, specifically wearing the meat dress";
        // }
        // else if (c == "c7"){
        //     request.session.soulmate = "Siri";
        // }
        // else if (c == "c8"){
        //     request.session.soulmate = "Jake from State Farm";
        // }
        // console.log(request.session.soulmate);
        response.render(""+c+".ejs", {user: request.session.username, smate: request.session.soulmate });
    }
    else {
        response.redirect("/");
    }
});


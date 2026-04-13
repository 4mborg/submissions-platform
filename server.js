import express from "express";
import { engine } from "express-handlebars";
import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// TODO: .env configurations

// configrations
const PORT = process.env.PORT || 3000;
const IS_PRODUCTION = (process.env.PRODUCTION) || false;

// express application
const app = express();

// use the express-handlebars template engine
/**
 * Use the Handlebars template engine. It will be necessary for
 * us to display information to users based on factors which should
 * not be exposed to the frontend. As such we need a server-side
 * rendering engine and Handlebars provides everything we'll need
 * to accomplish this and preserve out ability to just write HTML,
 * at least as much as possible.
 */
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "views"))

/**
 * Use `static` directory to serve up files which the templates will rely
 * on. Usually images, css, and javascript.
 * 
 * Since our project does not rely on frontend frameworks, these are essentially
 * the source code for the frontend, when it's not being dynamically generated
 * by the handlebars template engine.
 */
app.use(express.static("static"));

/**
 * In production environments, we're behind at least one reverse proxy. in
 * order for our session and rate limiting to work properly we must rely
 * on headers passed on to us by these reverse proxy servers.
 */
if(IS_PRODUCTION)
{
    app.set("trust proxy", true);
}

// TODO: session, rate limiting.

// TODO: api | (login, onboarding, admin, judge, jam participant)

// TODO: views | onboarding (user creation, user dashboard)

// TODO: views | admin user (user mangagement, role management, jam management)

// TODO: views | judge user (view jam entry, submit judgment, review/edit judgment)

// TODO: views | jam participant (upload jam entry, describe jam entry, view entry status)

// show the home view
app.get("/", (req, res) =>
{
    res.render("home");
});

// listen on the configured port
app.listen(PORT, () =>
{
    console.log(`Server listening on port ${PORT}`)
});

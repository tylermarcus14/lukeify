import * as fs from 'fs';
import * as path from 'path';

const bodyParser        = require('body-parser');
const express           = require('express');
const config            = require('../config.json');
import {CommandService} from "./services/CommandService";
const app               = express();

const commandService = new CommandService();

/**
 * Environment variable declaration
 */
if (!process.env.NODE_ENV) {

    // Array of acceptable enviromments.
    let environs = ["--dev", "--prod"];

    if (environs.includes(process.argv[2])) {
        // strip the leading two characters off the environment string and pass it into the NODE_ENV proeprty.
        process.env.NODE_ENV = process.argv[2].substr(2);
    } else {
        // Ensure at least one environment variable is set before running the application.
        throw Error("No environment variable set");
    }
}

/**
 * Server setup.
 */
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../../client/public/lukeify')));
app.enable('trust proxy');

/**
 * Gets recent tweets from the stored cached/tweets.json file.
 *
 * @return {express.Response}
 */
app.get('/api/tweets', (req, res) => {
    fs.readFile(path.join(__dirname, '../cached/tweets.json'), 'utf8', (err, data) => {
        if (err) return res.status(500).end();
        return res.status(200).json(JSON.parse(data));
    });
});

/**
 * Gets recent instas from the stored cached/instas.json file.
 *
 * @return {express.Response}
 */
app.get('/api/instas', (req, res) => {
    fs.readFile(path.join(__dirname, '../cached/instas.json'), 'utf8', (err, data) => {
        if (err) return res.status(500).end();
        return res.status(200).json(JSON.parse(data));
    });
});

/**
 * For a given command, return the response, and log the data associated with it.
 *
 * @return {express.Response}
 */
app.post('/api/terminal/command', async (req, res) => {
    try {
        const response = await commandService.execute(req);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            error: process.env.NODE_ENV === "dev" ? e.message : "something went wrong"
        });
    }
});

/**
 * Retrieve the initial terminal configuration of the application.
 *
 * @return {express.Response}
 */
app.get('/api/terminal', (req, res) => {
    try {
        const response = commandService.initialTerminalConfiguration();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            error: process.env.NODE_ENV === "dev" ? e.message : "something went wrong"
        });
    }

});

/**
 * Wildcard route for any routes not previously matched.
 *
 * @returns {express.Response}
 */
app.get('*', (req, res) => {
    const pathToIndex = path.join(__dirname, '../../client/public/lukeify/index.html');
    try {
        fs.accessSync(pathToIndex);
        return res.sendFile(pathToIndex);
    } catch (e) {
        return res.send("index.html could not be found ¯\\_(ツ)_/¯ ")
    }
});

/**
 * Start the server.
 */
app.listen(3000, config.hostname);

import * as fs from 'fs';
import * as path from 'path';

const bodyParser    = require('body-parser');
const express       = require('express');
const config        = require('../config.json');
const mailer        = require('./services/Mailer');
const CommandService= require('./services/CommandService');
const app           = express();
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
app.use(express.static(path.join(__dirname, '../../angular/public/lukeify')));

/**
 * Gets recent tweets from the stored tweets.json file.
 *
 * @return {express.Response}
 */
app.get('/api/tweets', (req, res) => {
    fs.readFile(path.join(__dirname, '../tweets.json'), 'utf8', (err, data) => {
        if (err) return res.status(500).end();

        return res.status(200).json(JSON.parse(data));
    });
});

/**
 * Gets recent instas from the stored instas.json file.
 *
 * @return {express.Response}
 */
app.get('/api/instas', (req, res) => {
    fs.readFile(path.join(__dirname, '../instas.json'), 'utf8', (err, data) => {
        if (err) return res.status(500).end();

        return res.status(200).json(JSON.parse(data));
    });
});

/**
 * For a given command, return the response, and log the data associated with it.
 *
 * @return {express.Response}
 */
app.post('/api/command', (req, res) => {
    try {
        const response = CommandService.execute(req);
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
app.get('/api/initialterminalconfiguration', (req, res) => {
    try {
        const response = CommandService.initialTerminalConfiguration();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            error: process.env.NODE_ENV === "dev" ? e.message : "something went wrong"
        });
    }

});

/**
 * @return {express.Response}
 */
app.post('/api/getintouch', async (req, res) => {
    try {
        await mailer.sendMail(req.body.name, req.body.email, req.body.message);
        return res.status(200).json({ "sent": true });
    } catch (e) {
        return res.status(500).json({ "sent": false });
    }
});

/**
 * Wildcard route for any routes not previously matched.
 *
 * @returns {express.Response}
 */
app.get('*', (req, res) => {
    const pathToIndex = path.join(__dirname, '../../angular/public/lukeify/index.html');
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
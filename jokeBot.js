//        INITIAL VARIABLES and IMPORTS

require('dotenv').config()

// Import the discord.js module

const Discord = require('discord.js');

// Create an instance of a Discord client

const client = new Discord.Client();

// Joke API Url / Endpoint - FREE API no need for .env here

const apiURL = "https://v2.jokeapi.dev/joke/Any?type=single"


// importing fetch from node-fetch npm-package to allow us to fetch the api within node environment using fetch keyword.

const fetch = require('node-fetch');

//          FUNCTIONALITY FOR THE BOT


/**
 * The ready event is vital, it means that only _after_ this will the bot start reacting to information
 * received from Discord */


// Create an event listener for ready status

client.on('ready', () => {
  console.log('I am ready!');
});

// Create an event listener for messages

client.on('message', message => {
    // If the message is "tell me a joke" command
    const lowercaseMsg = lowercaseFirstLetter(message.content);
    if (lowercaseMsg === 'tell me a joke') {
        getJoke(message);
        
  }
});

// function for turning the first letter of the first word of a string to lowercase

// this is to capture mobile messages on the discord server which usually auto caps on the first word

function lowercaseFirstLetter(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

// fetching joke data from API and sending to the Discord Server

async function getJoke(message) {

        const response = await fetch(apiURL)
            .then(res => res.json())

            .catch(error => {
         message.channel.send("Error fetching a joke, sorry " + message.author.username + " 😢");
    })
         
    message.channel.send(response.joke);
    message.reply("yw u little pendu 😁");
    
    }
       

// Log our bot in using the token from https://discord.com/developers/applications

client.login(process.env.TOKEN);


const express = require('express');
const axios = require('axios');

const app = express();
const port = 3030;

const apiKey = '6627a6eb4aa007f40980009dcb129eb4';
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather';
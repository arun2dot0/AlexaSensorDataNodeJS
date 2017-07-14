/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = 'amazon skill id '; //amzn1.ask.skill.uuid

const languageStrings = {
    'en': {
        translation: {
            SKILL_NAME: 'pebble',
            GET_FACT_MESSAGE: "Okay I got the Readings: ",
            HELP_MESSAGE: 'You can say tell me get readings or get average readings... What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'Goodbye!',
        },
    },
};

var metric = require('./metric.js');

const handlers = {
    'LaunchRequest': function () {
       this.emit(':tellWithCard', 'Get Readings', this.t('SKILL_NAME'));
    },
     'GetMetric': function () {
        var self = this;
            metric.getMetricData( 'current',function ( result){
                self.emit(':tell', result);
            });
     },
     'GetMetricAverage': function () {
        var self = this;
            metric.getMetricData( 'average',function ( result){
                self.emit(':tell', 'Here are the Average readings ...'+result);
            });
     },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'Unhandled': function () {
        this.emit(':ask', this.t('HELP_MESSAGE'), this.t('HELP_MESSAGE'));
    }
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

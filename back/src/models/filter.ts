const Filter = require("bad-words"),
  filter = new Filter();

const removeWords = [
  "hell",
  "hells",
  "piss",
  "knob",
  "damn",
  "sadist",
  "screwing",
  "shit",
  "sh1t",
  "ass",
  "poop",
  "crap",
];

filter.removeWords(...removeWords);

module.exports = filter;

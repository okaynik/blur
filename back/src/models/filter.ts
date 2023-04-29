const Filter = require("bad-words"),
  filter = new Filter();

const removeWords = [
  "hell",
  "hells",
  "sadist",
  "piss",
  "knob",
  "damn",
  "sadist",
  "screwing",
  "shit",
  "sh1t",
  "ass",
  "poop",
];

filter.removeWords(...removeWords);

module.exports = filter;

const { test, expect, it } = require('@jest/globals');
var utils  = require('course-utilities');
const { describe } = require('yargs');
var Greet = utils.load('./hello.js', 'Greet');


test('output generic greeting', () => {
  expect(Greet()).toBe("Hello there!");
});

test('output specific greeting', () => {
  expect(Greet("Elizabeth")).toBe("Hello, Elizabeth");
});

test('output shouted greeting', () => {
  expect(Greet("JOSE")).toBe("HELLO JOSE!");
});

test('output two greetings', () => {
  expect(Greet(['Jose','Pep'])).toBe("Hello, Jose, Pep");
});

test('output multiple greetings', () => {
  expect(Greet(['Alex','Arsene','Jose','Zidane'])).toBe("Hello, Alex, Arsene, Jose, Zidane");
});
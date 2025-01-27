const core = require('@actions/core');
const github = require('@actions/github');

const { DOMParser, XMLSerializer } = require('xmldom');
const xpath = require('xpath');

const fs = require('fs');


async function run() {
  try {

    // const name = core.getInput('name');
    // const greeting = core.getInput('greeting');


    // core.info(`Hello, ${name}!`);
    // core.info(`My boy: ${greeting}`);

    let filePath = './pom.xml'

    let path = '/project/version'
    let replacement = '1.0.0'

    const xml = fs.readFileSync(filePath, 'utf8');
    const doc = new DOMParser().parseFromString(xml);

    const nodes = xpath.select(path, doc);


    if (nodes.length === 0) {
      throw new Error(`No nodes found for expression: ${xPathExpression}`);
    }

    nodes.forEach((node) => {
      node.textContent = replacement;
    });


    const serialized = new XMLSerializer().serializeToString(doc);
    fs.writeFileSync(filePath, serialized);


    const xml2 = fs.readFileSync(filePath, 'utf8');
    core.info(`Updated XML: ${xml2}`);
    // const context = github.context;
    // core.info(`Event: ${context.eventName}`);


    // core.setOutput('done', `${name}`);
  } catch (error) {
    core.setFailed(`Error: ${error.message}`);
  }
}

run();
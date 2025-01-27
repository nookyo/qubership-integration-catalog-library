const core = require('@actions/core');
const github = require('@actions/github');
const { XMLParser, XMLBuilder } = require('fast-xml-parser');
const fs = require('fs')


async function run() {
  try {

    const name = core.getInput('name');
    const greeting = core.getInput('greeting');


    core.info(`Hello, ${name}!`);
    core.info(`My boy: ${greeting}`);

    let filePath = './pom.xml'

    const data = fs.readFileSync(filePath, 'utf8');
    core.info(`Contenst =\n${data}`)

    const result = new XMLParser().parse(data)
    core.info(`parse data:\n${result}`)

    const context = github.context;
    core.info(`Event: ${context.eventName}`);


    core.setOutput('done', `${name}`);
  } catch (error) {
    core.setFailed(`Error: ${error.message}`);
  }
}

run();
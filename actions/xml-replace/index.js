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

   const sections =  result.root.section;

   const sectionName = 'version'

   const section = Array.isArray(sections)
   ? sections.find(s => s.name === sectionName)
   : sections.name === sectionName
   ? sections
   : null;
   console.log(`Значение секции "${section}`);

    const context = github.context;
    core.info(`Event: ${context.eventName}`);


    core.setOutput('done', `${name}`);
  } catch (error) {
    core.setFailed(`Error: ${error.message}`);
  }
}

run();
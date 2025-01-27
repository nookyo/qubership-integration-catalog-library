const core = require('@actions/core');
const github = require('@actions/github');
const { DOMParser, XMLSerializer } = require('xmldom');
const xpath = require('xpath');
const fs = require('fs');
const { execSync } = require('child_process');



async function updateXml(filePath, path, newValue) {

  const select = xpath.useNamespaces({
    p: 'http://maven.apache.org/POM/4.0.0'
  });

  const xml = fs.readFileSync(filePath, 'utf8');
  core.info(`Original XML: ${xml}`);

  const doc = new DOMParser().parseFromString(xml);

  const nodes = select(xpathExpression, doc);

  if (nodes.length === 0) {
    throw new Error(`No nodes found for expression: ${xpathExpression}`);
  }

  nodes.forEach((node) => {
    node.textContent = newValue;
  });

  const serialized = new XMLSerializer().serializeToString(doc);
  fs.writeFileSync(filePath, serialized);

  const updatedXml = fs.readFileSync(filePath, 'utf8');
  core.info(`Updated XML: ${updatedXml}`);
}



async function run() {
  try {

    // const filePath = core.getInput('filePath');
    // const path = core.getInput('path');
    // const newValue = core.getInput('newValue');
    const commit = core.getInput('commit', { trimWhitespace: true }) === 'true';
    // const email = core.getInput('email');
    // const user = core.getInput('user');

    const filePath = './pom.xml';
    const path = '//p:project/p:properties/p:revision';
    const newValue = '1.0.0';


    await updateXml(filePath, path, newValue);
    await commitAndPush(filePath, commitMessage);
    if(commit){
      core.info(`Committing and pushing changes to the repository: ${commit}`);
    }


    // core.setOutput('done', `${name}`);
  } catch (error) {
    core.setFailed(`Error: ${error.message}`);
  }
}

run();
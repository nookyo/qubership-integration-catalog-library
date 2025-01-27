const core = require('@actions/core');
const github = require('@actions/github');
const { DOMParser, XMLSerializer } = require('xmldom');
const xpath = require('xpath');
const fs = require('fs');




async function updateXml(filePath, path, newValue) {

  const select = xpath.useNamespaces({
    p: 'http://maven.apache.org/POM/4.0.0'
  });

  const xml = fs.readFileSync(filePath, 'utf8');

  const doc = new DOMParser().parseFromString(xml);

  const nodes = select(path, doc);

  if (nodes.length === 0) {
    throw new Error(`No nodes found for expression: ${path}`);
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

    const filePath = core.getInput('filePath') || 'pom.xml';
    const path = core.getInput('path')|| '//p:project/p:properties/p:revision';
    const newValue = core.getInput('newValue');

    // const filePath = 'pom.xml';
    // const path = '//p:project/p:properties/p:revision';
    // const newValue = '1.0.1';

    await updateXml(filePath, path, newValue);


  } catch (error) {
    core.setFailed(`Error: ${error.message}`);
  }
}

run();
// A literal string

const generateThisString = () => 'Name: Jane, Github: janehub';
console.log(generateThisString());

// Using Template literals to display same output, now we can put whatever input

const templateLiteral = (userName, githubName) => `Name: ${userName}, Github: ${githubName}`;
console.log(templateLiteral('Jane','janehub'));

//======================================================
// Multi-line Template literals, since a multi command, the function uses return and {}

const multiLiteral = (userName, githubName) => {
    return `
      Name: ${userName}
      GitHub: ${githubName}
    `;
};

console.log(multiLiteral('Jane','janehub'));

//======================================================
//ACTUAL EXAMPLE

const fs = require('fs');

const profileDataArgs = process.argv.slice(2);

const [name, github] = profileDataArgs;

const generatePage = (userName, githubName) => {
    return `
  <!DOCTYPE html> 
  <html lang="en"> 
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Portfolio Demo</title>
  </head>

  <body>
    <h1>${name}</h1>
    <h2><a href="https://github.com/${github}">Github</a></h2>
  </body>
  </html>
  `;
};

fs.writeFile('index.html', generatePage(name, github), err => {
    if (err) throw new Error(err);
  
    console.log('Portfolio complete! Check out index.html to see the output!');
  });
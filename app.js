// const fs = require('fs'); -NO LONGER NEEDED SINCE IT WAS MOVED TO GENERATE-SITE.JS
const { writeFile, copyFile } = require('./utils/generate-site.js')
const generatePage = require('./src/page-template.js')

const inquirer = require('inquirer');  // the package that allows us to use questionaire in the terminal

const promptUser = () => {
    return inquirer.prompt([
            {
                type:'input',
                name:'name',
                message:'What is your name? (Required)',
                validate: nameInput => {
                    if (nameInput) {
                      return true;
                    } else {
                      console.log('Please enter your name!');
                      return false;
                    }
                  }
            },

            {
                type: 'input',
                name: 'github',
                message: 'Enter your GitHub Username'
            },

            {
                type: 'confirm',
                name: 'confirmAbout',
                message: 'Would you like to enter some information about yourself for an "About" section?',
                default: true
            },

            {
                type: 'input',
                name: 'about',
                message: 'Provide some information about yourself:',
                when: ({ confirmAbout }) => {
                  if (confirmAbout) {
                    return true;
                  } else {
                    return false;
                  }
                }
            },
        ])
}


const promptProject = portfolioData => { //function accepting info from promptUser as a parameter, also adding project info below when returned below

    // If there's no 'projects' array property, create one
     if (!portfolioData.projects) {
        portfolioData.projects = [];
    }
  

    console.log(`
  =================
  Add a New Project
  =================
  `);

    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your project? (Required)',
        validate: projectInput => {
            if (projectInput) {
              return true;
            } else {
              console.log('Please enter your name!');
              return false;
            }
          }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project (Required)',
        validate: descriptionInput => {
            if (descriptionInput) {
              return true;
            } else {
              console.log('Please enter your name!');
              return false;
            }
          }
      },
      {
        type: 'checkbox',
        name: 'languages',
        message: 'What did you build this project with? (Check all that apply)',
        choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
      },
      {
        type: 'input',
        name: 'link',
        message: 'Enter the GitHub link to your project. (Required)',
        validate: linkInput => {
            if (linkInput) {
              return true;
            } else {
              console.log('Please enter your name!');
              return false;
            }
          }
      },
      {
        type: 'confirm',
        name: 'feature',
        message: 'Would you like to feature this project?',
        default: false
      },
      {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'Would you like to enter another project?',
        default: false
      }
    ]).then(returnedData => {
        portfolioData.projects.push(returnedData);
        if (returnedData.confirmAddProject) {
            return promptProject(portfolioData);
          } else {
            return portfolioData;
          }
      })
    
};



// in this order because we want promptUser first then promptProject question once the first have been answered, in sequence order
// promptUser()
//     // .then(answers => console.log(answers)) -- THIS IS BAD FOR MY CODE
//     .then(promptProject)

//     .then(portfolioProjectData => {
//         console.log(portfolioProjectData);

//         const pageHTML = generatePage(portfolioProjectData);

//         fs.writeFile('./dist/index.html', pageHTML, err => {
//             if (err) throw new Error(err);

//         console.log('Page created! Check out index.html in this directory to see it!');
//         });

//         fs.copyFile('./src/style.css', './dist/style.css', err => {
//           if (err) {
//             console.log(err);
//             return;
//           }
//           console.log('Style sheet copied successfully!');
//         });
//     }  
//     );

// =======================
// using PROMISES instead of call back functions above

    promptUser() // after promptUser is complete, go to promptProject below
    .then(promptProject)

    .then(portfolioProjectData => { //data is now in parameter from promptProject, because of then
      return generatePage(portfolioProjectData) //requiring the HTML content from page-template with our data, which will return the finished HTML template code into PAGEHTML

    })
      .then(pageHTML => { //passing PAGEHTML into newly created writeFile(), which returns a promise from GENERATE-SITE.js
        return writeFile(pageHTML)
      })  

      .then(writeFileResponse => { // Upon a successful file creation, we take the writeFileResponse object provided by the writeFile() function's resolve() execution to log it, and then we return copyFile(), to provide the css file. 
        console.log(writeFileResponse);
        return copyFile();
      })
      .then(copyFileResponse => {
        console.log(copyFileResponse)
      })
      .catch(err =>{ //catch our errors
        console.log(err)
      })

      

        // fs.writeFile('./dist/index.html', pageHTML, err => {
        //     if (err) throw new Error(err);

        // console.log('Page created! Check out index.html in this directory to see it!');
        // });

        // fs.copyFile('./src/style.css', './dist/style.css', err => {
        //   if (err) {
        //     console.log(err);
        //     return;
        //   }
        //   console.log('Style sheet copied successfully!');
        // });
    
    // );


    










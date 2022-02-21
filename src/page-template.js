// create the ABOUT section, IF USER WANTS THE ABOUT SECTION, IT WILL GENERATE AND BE CALLED IN THE HTML, under the MAIN section in this case

const generateAbout = aboutText => {
  if (!aboutText) {
    return '';
  }

  return `
    <section class="my-3" id="about">
      <h2 class="text-dark bg-primary p-2 display-inline-block">About Me</h2>
      <p>${aboutText}</p>
    </section>
  `;
};

//WHERE OUR PROJECTS ARE BEING GENERATED, split into featured and non featured projects

const generateProjects = projectsArr => {
  // get array of just featured projects
  const featuredProjects = projectsArr.filter(project => {
    if (project.feature) {
      return true;
    } else {
      return false;
    }
  });

  // get array of all non-featured projects
  const nonFeaturedProjects = projectsArr.filter(project => {
    if (!project.feature) {
      return true;
    } else {
      return false;
    }
  });

  const featuredProjectHtmlArr = featuredProjects.map(({ name, description, languages, link }) => {
    return `
      <div class="col-12 mb-2 bg-dark text-light p-3 flex-column">
        <h3 class="portfolio-item-title text-light">${name}</h3>
        <h5 class="portfolio-languages">
          Built With:
          ${languages.join(', ')}
        </h5>
        <p>${description}</p>
        <a href="${link}" class="btn mt-auto"><i class="fab fa-github mr-2"></i>View Project on GitHub</a>
      </div>
    `;
  });

  const nonFeaturedProjectHtmlArr = nonFeaturedProjects.map(
    ({ name, description, languages, link }) => {
      return `
        <div class="col-12 col-md-6 mb-2 bg-dark text-light p-3 flex-column">
          <h3 class="portfolio-item-title text-light">${name}</h3>
          <h5 class="portfolio-languages">
            Built With:
            ${languages.join(', ')}
          </h5>
          <p>${description}</p>
          <a href="${link}" class="btn mt-auto"><i class="fab fa-github mr-2"></i>View Project on GitHub</a>
        </div>
      `;
    }
  );
    // this puts all the projects above into the one big section of the HTML, entering as a string
  return `
    <section class="my-3" id="portfolio">
      <h2 class="text-dark bg-primary p-2 display-inline-block">Work</h2>
      <div class="flex-row justify-space-between">
      ${featuredProjectHtmlArr.join('')}
      ${nonFeaturedProjectHtmlArr.join('')}
      </div>
    </section>
  `;
};

// PUTTING MAP AND FILTER TOGETHER
// const generateProjects = projectsArr => {
//   return `
//     <section class="my-3" id="portfolio">
//       <h2 class="text-dark bg-primary p-2 display-inline-block">Work</h2>
//       <div class="flex-row justify-space-between">
//       ${projectsArr
//         .filter(({ feature }) => feature)
//         .map(({ name, description, languages, link }) => {
//           return `
//           <div class="col-12 mb-2 bg-dark text-light p-3">
//             <h3 class="portfolio-item-title text-light">${name}</h3>
//             <h5 class="portfolio-languages">
//               Built With:
//               ${languages.join(', ')}
//             </h5>
//             <p>${description}</p>
//             <a href="${link}" class="btn"><i class="fab fa-github mr-2"></i>View Project on GitHub</a>
//           </div>
//         `;
//         })
//         .join('')}

//       ${projectsArr
//         .filter(({ feature }) => !feature)
//         .map(({ name, description, languages, link }) => {
//           return `
//           <div class="col-12 col-md-6 mb-2 bg-dark text-light p-3 flex-column">
//             <h3 class="portfolio-item-title text-light">${name}</h3>
//             <h5 class="portfolio-languages">
//               Built With:
//               ${languages.join(', ')}
//             </h5>
//             <p>${description}</p>
//             <a href="${link}" class="btn mt-auto"><i class="fab fa-github mr-2"></i>View Project on GitHub</a>
//           </div>
//         `;
//         })
//         .join('')}
//       </div>
//     </section>
//   `;
// };





module.exports = templateData => {
  console.log(templateData);

    // destructure projects and about data from templateData based on their property key names
  const { projects, about, ...header } = templateData;
  //projects is the array of projects with their info, about is the specific section if we declared it yes or no in the questionaire, header puts everything else that isn't in the projects array into the header object
    

    return `
    <!DOCTYPE html> 
    <html lang="en"> 
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <link rel="stylesheet" href="style.css">
      <title>Portfolio Demo</title>
    </head>
  
    <body>
    <header>
      <div class="container flex-row justify-space-between align-center py-3">
        <h1 class="page-title text-secondary bg-dark py-2 px-3">${header.name}</h1>
        <nav class="flex-row">
          <a class="ml-2 my-1 px-2 py-1 bg-secondary text-dark" href="https://github.com/${
            header.github
          }">GitHub</a>
        </nav>
      </div>
    </header>
    
    <main class="container my-5"> 
          ${generateAbout(about)}
          ${generateProjects(projects)}
    </main>
    <footer class="container text-center py-3">
      <h3 class="text-dark">&copy; ${new Date().getFullYear()} by ${header.name}</h3>
    </footer>
  </body>
    </html>
    `;
} 



// OLD PAGE-TEMPLATE

// const htmlLiteral = (name, github) => {
//   return `
//   <!DOCTYPE html> 
//   <html lang="en"> 
//   <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <meta http-equiv="X-UA-Compatible" content="ie=edge">
//     <title>Portfolio Demo</title>
//   </head>

//   <body>
//     <h1>${name}</h1>
//     <h2><a href="https://github.com/${github}">Github</a></h2>
//   </body>
//   </html>
//   `;
// } 

// module.exports = htmlLiteral;
// var commandLineArgs = process.argv;

// console.log(commandLineArgs);

//first two arrays will be info, from info 3 (2), 

// var profileDataArgs = process.argv.slice(2, process.argv.length);
// // slice is for anything past the 2 arrays of info, which would be the node info
// console.log(profileDataArgs);

//LESSON 1

const fs = require('fs');

const generatePage = require('./src/page-template.js');

const profileDataArgs = process.argv.slice(2);
// console.log(profileDataArgs);
// //This

// const printProfileData = profileDataArr => {
//     for (let i=0; i < profileDataArr.length; i++){
//         console.log(profileDataArr[i]);
//     }

//     console.log('==============')
//     //is the same as this
//     profileDataArr.forEach((profileItem) =>
//         console.log(profileItem)
//     )
// }

// printProfileData(profileDataArgs)

//LESSON 2

const [name, github] = profileDataArgs;



// console.log(name,github)
// console.log(generatePage(name, github));



//3 arguements to generate file. 1- write file name, 2 - data that will write in file. 3- err arguement if failed or console if success
fs.writeFile('./index.html', generatePage(name,github), err =>  {
    if (err) throw err;

    console.log('Portfolio complete! Check out index.html to see the output!')
})


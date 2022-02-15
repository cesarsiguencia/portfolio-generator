// var commandLineArgs = process.argv;

// console.log(commandLineArgs);

//first two arrays will be info, from info 3 (2), 

// var profileDataArgs = process.argv.slice(2, process.argv.length);
// // slice is for anything past the 2 arrays of info, which would be the node info
// console.log(profileDataArgs);



const profileDataArgs = process.argv.slice(2, process.argv.length);
console.log(profileDataArgs);
//This

const printProfileData = profileDataArr => {
    for (let i=0; i < profileDataArr.length; i++){
        console.log(profileDataArr[i]);
    }

    console.log('==============')
    //is the same as this
    profileDataArr.forEach((profileItem) =>
        console.log(profileItem)
    )
}



printProfileData(profileDataArgs)


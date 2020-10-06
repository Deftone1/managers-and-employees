const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const teamMembers = [];

function init() {
    console.log("Please build your team.");
    inquirer.prompt([{
        type: 'input',
        name: 'managerName',
        message: "What is your manager's name?"
    },
    {
        type: 'input',
        name: 'managerId',
        message: "What is your manager's ID number?"
    },
    {
        type: 'input',
        name: 'managerEmail',
        message: "What is your manager's e-mail address?"
    },
    {
        type: 'input',
        name: 'managerOfficeNumber',
        message: "What is your manager's office number?"
    }

    ]).then(response => {
        console.log("Manager answers:", response)
        const managerIs = new Manager(response.managerName, response.managerId, response.managerEmail, response.managerOfficeNumber);
        teamMembers.push(managerIs)
        
        buildTeam();
    }).catch(err => {
        console.log("Please enter a valid response", err)
    })

};

function buildTeam() {
    inquirer.prompt([{
        type: 'list',
        name: 'memberType',
        message: "What type of team members would you like to add?",
        choices: [
            "Engineer",
            "Intern",
            "I do not want to add any more members"
        ]
    }]).then(response => {
        console.log(response)
        if (response.memberType === "Engineer") {
            engineerResponse();
        } else if (response.memberType === "Intern") {
            // create function for intern
        } else {
            fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
        }

    })

}

function engineerResponse() {
    inquirer.prompt([{
        type: 'input',
        name: 'engineerResponse',
        message: "What is your engineer's name?"
    },
    {
        type: 'input',
        name: 'engineerId',
        message: "What is your engineer's ID number?"
    },
    {
        type: 'input',
        name: 'engineerEmail',
        message: "What is your engineer's e-mail address?"
    },
    {
        type: 'input',
        name: 'engineerGithub',
        message: "What is your engineer's GitHub account?"

    },
    {
        type: 'list',
        name: 'memberType',
        message: "What type of team members would you like to add?",
        choices: [
            "Engineer",
            "Intern",
            "I do not want to add any more members"
        ]
    }

    ]).then(response => {
        console.log("Engineer answers:", response)
        const engineerIs = new Engineer(response.engineerName, response.engineerId, response.engineerEmail, response.engineerGithub);
        teamMembers.push(engineerIs)
        if (response.memberType === "Engineer") {
            engineerResponse();
        } else if (response.memberType === "Intern") {
            // create function for intern
        } else {
            fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
        }

    })
};


init();




// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

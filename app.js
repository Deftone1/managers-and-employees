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

// Main initializing function starting with manager prompt
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
// Build Team Function
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
            internResponse();
        } else {
            fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
        }

    })

}
// Main function for the Engineer's questions and responses
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

// Main function for the Intern's questions and responses
function internResponse() {
    inquirer.prompt([{
        type: 'input',
        name: 'internResponse',
        message: "What is your intern's name?"
    },
    {
        type: 'input',
        name: 'internId',
        message: "What is your intern's ID number?"
    },
    {
        type: 'input',
        name: 'engineerEmail',
        message: "What is your engineer's e-mail address?"
    },
    {
        type: 'input',
        name: 'internGithub',
        message: "What is your intern's GitHub account?"

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
        console.log("Intern answers:", response)
        const internIs = new Intern(response.internName, response.internId, response.internEmail, response.internGithub);
        teamMembers.push(internIs)
        if (response.memberType === "Engineer") {
            engineerResponse();
        } else if (response.memberType === "Intern") {
            internResponse();
        } else {
            fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
        }

    })
};


init();





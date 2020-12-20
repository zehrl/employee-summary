const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const promptNextAction = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "Select an action: ",
            choices: ["Add Engineer", "Add Intern", "Build Team Website"],
            name: "employeeType"
        }
    ])
        .then(responses => {
            switch (responses.employeeType) {
                case "Add Engineer":
                    constructEngineer()
                    break
                case "Add Intern":
                    constructIntern()
                    break
                case "Build Team Website":
                    // buildWebsite()
                    break
                default:
                    break
            }

        })
}

// Manager prompts
const constructManager = () => {
    const promptTitle = `Manager Information`
    console.log("\n", promptTitle)
    console.log(`-`.repeat(promptTitle.length))

    inquirer.prompt([
        // prompt for name
        {
            type: "input",
            message: "Name: ",
            name: "name"
        },
        // prompt for id
        {
            type: "input",
            message: "ID: ",
            name: "id"
        },
        // prompt for email
        {
            type: "input",
            message: "Email: ",
            name: "email"
        },
        // prompt for office number
        {
            type: "input",
            message: "Office Number: ",
            name: "officeNumber"
        }
    ])
        .then(responses => {
            const manager = new Manager(
                responses.name,
                responses.id,
                responses.email,
                responses.officeNumber
            )

            console.log(`\n${manager.name} has been added to the Team!\n`)

            // THEN callback prompt to add intern/engineer/build website
            promptNextAction()
        })
}

// Engineer prompts
const constructEngineer = () => {
    const promptTitle = `Engineer Information`
    console.log("\n", promptTitle)
    console.log(`-`.repeat(promptTitle.length))

    inquirer.prompt([
        // prompt for name
        {
            type: "input",
            message: "Name: ",
            name: "name"
        },
        // prompt for id
        {
            type: "input",
            message: "ID: ",
            name: "id"
        },
        // prompt for email
        {
            type: "input",
            message: "Email: ",
            name: "email"
        },
        // prompt for github username
        {
            type: "input",
            message: "Github Username: ",
            name: "githubUsername"
        }
    ])
        .then(responses => {
            const engineer = new Engineer(
                responses.name,
                responses.id,
                responses.email,
                responses.githubUsername
            )

            console.log(`\n${engineer.name} has been added to the Team!\n`)

            // THEN callback prompt to add intern/engineer/build website
            promptNextAction()
        })
}

// Intern prompts
const constructIntern = () => {
    const promptTitle = `Intern Information`
    console.log("\n", promptTitle)
    console.log(`-`.repeat(promptTitle.length))

    inquirer.prompt([
        // prompt for name
        {
            type: "input",
            message: "Name: ",
            name: "name"
        },
        // prompt for id
        {
            type: "input",
            message: "ID: ",
            name: "id"
        },
        // prompt for email
        {
            type: "input",
            message: "Email: ",
            name: "email"
        },
        // prompt for school
        {
            type: "input",
            message: "Intern's School: ",
            name: "school"
        }
    ])
        .then(responses => {
            const intern = new Intern(
                responses.name,
                responses.id,
                responses.email,
                responses.school
            )

            console.log(`\n${intern.name} has been added to the Team!\n`)

            // THEN callback prompt to add intern/engineer/build website
            promptNextAction()
        })
}

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

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

// Function Calls
console.clear()
constructManager()
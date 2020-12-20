const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const team = []

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
                    console.log(team)
                    buildWebsite()
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

            // add team member to team array
            team.push(manager)

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

            // add team member to team array
            team.push(engineer)

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

            // add team member to team array
            team.push(intern)

            console.log(`\n${intern.name} has been added to the Team!\n`)

            // THEN callback prompt to add intern/engineer/build website
            promptNextAction()
        })
}

const buildWebsite = () => {
    const websiteHTML = render(team)

    fs.writeFile(outputPath, websiteHTML, (error)=>{
        error ? console.log(error) : console.log(`Website html file generated succesfully here: \n${outputPath}`)
    })
}

// Function Calls
console.clear()
constructManager()
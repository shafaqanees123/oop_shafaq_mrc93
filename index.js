#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class Student {
    name;
    constructor(n) {
        this.name = n;
    }
}
class Person {
    students = [];
    addStudent(obj) {
        this.students.push(obj);
    }
}
const persons = new Person();
const programStart = async (persons) => {
    console.log(chalk.magenta(` 
                        ╦ ╦╔═╗╦  ╔═╗╔═╗╔╦╗╔═╗
                        ║║║║╣ ║  ║  ║ ║║║║║╣ 
                        ╚╩╝╚═╝╩═╝╚═╝╚═╝╩ ╩╚═╝
                    `));
    do {
        const ans = await inquirer.prompt({
            name: "select",
            type: "list",
            message: chalk.yellowBright("\n Whom would you like to interact with?..>>"),
            choices: ["Staff", "Student", "Exit"],
        });
        if (ans.select == "Staff") {
            console.log(chalk.greenBright(`\n You approach the staff room.Please feel free to ask any question.! \n`));
        }
        else if (ans.select == "Student") {
            const ans = await inquirer.prompt({
                name: "student",
                type: "input",
                message: chalk.yellowBright("\n Enter the Name of Student\n"),
            });
            const student = persons.students.find((val) => val.name == ans.student);
            if (!student) {
                const name = new Student(ans.student);
                persons.addStudent(name);
                console.log(chalk.greenBright(`Hello  ${name.name}`));
                console.log(chalk.magentaBright("\nNew Student Added\n"));
                console.log(chalk.redBright(`
                           CURRENT STUDENTS LIST
                        `));
                console.log(persons.students);
            }
            else {
                console.log(`Hello ${student.name}`);
                console.log(chalk.blueBright(`
                            EXISTING STUDENTS LIST
                        `));
                console.log(persons.students);
            }
        }
        else if (ans.select == "Exit") {
            console.log("\n Program Exit \n");
            process.exit();
        }
    } while (true);
};
programStart(persons);

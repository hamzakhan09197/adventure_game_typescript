import inquirer from 'inquirer';
import chalk from 'chalk';
import { createSpinner } from 'nanospinner';
import showBanner from 'node-banner';

let time = (time = 2000) => new Promise((r) => (setTimeout(r, time)));


async function myBanner() {
    showBanner('ADVENTURE GAME')
}

class Player {
    name: string
    health: number = 100
    constructor(name: string) {
        this.name = name

    }
}


class Opponet {
    name: string[]
    health: number = 100
    constructor(name: string[]) {
        this.name = name

    }
}



async function player1(): Promise<string> {
    let { player } = await inquirer.prompt([
        {
            name: "player",
            type: "input",
            message: chalk.blueBright.bold.italic("Enter Your name"),
            default : "Hamza"
        }
    ]);
    return player
}

async function opponet1(): Promise<string[]> {
    let { opponet } = await inquirer.prompt([
        {
            name: "opponet",
            type: "list",
            message: chalk.blueBright.bold.italic("Select your Opponet"),
            choices: [`Skeleton`, `Warrior `, `Zombie  `, `Assassin`]
        }
    ])
    return opponet
}

async function objFuntion() {
    await myBanner()
    await time(1000)


    let player = await player1();
    let opponet = await opponet1();

    let play = new Player(player)
    let opo = new Opponet(opponet)

    console.log(chalk.bgGray.whiteBright("\nINSTRUCTIONS :"));
    console.log(`${chalk.redBright.bold.italic(`=)`)} You can damage enemy Upto 50 Helth`);
    console.log(`${chalk.redBright.bold.italic(`=)`)} enemy can damage you Upto 50 Helth`);
    let spiner = createSpinner('Loading Game').start();
    await time(2000);
    spiner.success({ text: "Game Loaded Sucessfully" });
    console.log(chalk.blueBright.blue.bold("\n=====================================\n"));
    console.log(`${chalk.red(play.name)} Helth is: ${chalk.red(play.health)} `);
    console.log(chalk.blueBright.blue.bold("-------------------------------------"));
    console.log(`${chalk.red(opo.name)} Helth is: ${chalk.red(opo.health)} `)
    console.log(chalk.blueBright.blue.bold("\n=====================================\n"));
    console.log(chalk.whiteBright(chalk.yellowBright(`\n\n<<<<<<  ${chalk.blueBright(`${opo.name} Has Appeared`)}  >>>>>>\n`)))



    while (opo.health > 0 && play.health > 0) {
        let { choice } = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "What would you wanat to do",
                choices: ['Attack', 'Drink Health Potion', 'Run']
            }
        ])


        if (choice === 'Attack') {

            let playerDamage: number = Math.floor(Math.random() * 20)
            let enemyDamage: number = Math.floor(Math.random() * 20)
            play.health -= playerDamage;
            opo.health -= enemyDamage;


            console.log(`\n`);
            console.log(chalk.whiteBright(`___________${chalk.bgRgb(0, 55, 0).whiteBright(`/|${play.name}|*`)}${chalk.bgRgb(55, 0, 0).whiteBright(`*|${opo.name}|\\`)}___________`));
            if (opo.health < 0) {
                console.log(chalk.bgRgb(0, 55, 0)(`You win`));

            } else if (play.health < 0) {
                console.log(chalk.bgRgb(55, 0, 0)(`You lose`));
            }

            console.log(`${chalk.redBright.bold.italic(">>>")} You strike the ${opo.name} for ${opo.health}`);
            console.log(`${chalk.redBright.bold.italic(">>>")} ${opo.name} damaged you for ${play.health}`);


            console.log(chalk.blueBright.blue.bold("\n=====================================\n"));
            console.log(`${chalk.red(play.name)} Helth is: ${chalk.red(play.health)} `);
            console.log(chalk.blueBright.blue.bold("-------------------------------------"));
            console.log(`${chalk.red(opo.name)} Helth is: ${chalk.red(opo.health)} `)
            console.log(chalk.blueBright.blue.bold("\n=====================================\n"));
            console.log(chalk.whiteBright(chalk.yellowBright(`\n\n<<<<<<  ${chalk.blueBright(`${opo.name} Has Appeared`)}  >>>>>>\n`)))

            if (opo.health < 0) {

                console.log(`${chalk.red('>>>')} Warrior was defeated !!! \n${chalk.red('>>>')} You have ${play.health} Helth left:`);
                break;


            }
            if (play.health < 0) {
                console.log(`${chalk.red('>>>')}${play.name} was defeated !!! \n${chalk.red('>>>')} ${opo.name} ${opo.health} Helth is left:`);
                break;
            }



        }

        let healthPotionAmount = 30
        let healthPotionAvalible = 3
        
        if (choice === 'Drink Health Potion')
            if (play.health < 50) {
                spiner.success({ text: "Healed Sucessfully" });

                play.health += healthPotionAmount
                healthPotionAvalible--;

                console.log(`\n`);
                console.log(chalk.greenBright(`=======================================================`));

                console.log(`${chalk.redBright(`>>>`)} You drink a helth potion! healing yourself for ${chalk.red(healthPotionAmount)}`)
                console.log(`${chalk.redBright(`>>>`)} You now have  ${chalk.red(play.health)} Health`)
                console.log(`${chalk.redBright(`>>>`)} You have  ${chalk.red(healthPotionAvalible)} health potions left`)

                console.log(chalk.greenBright(`=======================================================`));
                console.log(`\n`);
            } else {
                spiner.error({text: `Sorry you can't drink health potion your health is greater than 50.`});
                console.log(`\n`);


            }




        if (choice === 'Run') {
            break;
        }
    }
    console.log(`\n`);

    console.log(chalk.blueBright(`==============================================================`));
    console.log(`\t      ${chalk.redBright.bold.italic(`Thanks For Playing !!!!!!`)}`);
    console.log(chalk.blueBright(`==============================================================`));
}
await objFuntion();
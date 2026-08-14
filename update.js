import { execSync, exec } from 'child_process';
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const askQuestion = (query) => new Promise((resolve) => rl.question(query, resolve));

function runCommand(command, description) {
    console.log(`\n${description}...`);
    try {
        execSync(command, { stdio: 'inherit' });
        console.log(`${description} : Terminé !`);
    } catch (error) {
        console.error(`\nErreur lors de : ${description}`);
        process.exit(1);
    }
}

async function main() {
    console.log("==========================================");
    console.log("Récupération du projet et création de la branch de travail");
    console.log("==========================================");

    runCommand("git checkout main", "Basculement sur la branche main");
    runCommand("git pull origin main", "Mise à jour du code depuis GitHub");

    runCommand("npm install", "Installation des nouveaux packages npm");

    let branchName = "";
    while (!branchName.trim()) {
        branchName = await askQuestion("\nNom de votre branche de travail : ");
    }

    const cleanBranch = branchName.trim().replace(/\s+/g, '-');

    runCommand(`git checkout -b ${cleanBranch}`, `Création de la branche '${cleanBranch}'`);

    console.log("\nVous êtes prêt à coder sur votre nouvelle branche !");
    rl.close();
}

main();
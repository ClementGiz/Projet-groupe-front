import { execSync, exec } from 'child_process';
import readline from 'readline';

const GITHUB_REPO_URL = "https://github.com/ClementGiz/Projet-groupe-front";

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

function getCurrentBranch() {
    try {
        return execSync('git branch --show-current').toString().trim();
    } catch (e) {
        return null;
    }
}

async function main() {
    console.log("==========================================");
    console.log(" Envoi des modifications sur GitHub");
    console.log("==========================================");

    const currentBranch = getCurrentBranch();
    if (!currentBranch || currentBranch === 'main') {
        console.log("Vous êtes sur la branche 'main'. Créez une branche de tâche avant de push !");
        process.exit(1);
    }

    console.log(` Branche actuelle : ${currentBranch}`);

    const checkBuild = await askQuestion("\nVoulez-vous tester le build (npm run build) ? (o/n) : ");
    if (['o', 'oui', 'y', 'yes'].includes(checkBuild.toLowerCase())) {
        runCommand("npm run build", "Test de compilation du projet");
    }

    console.log("\n------------------------------------------");
    runCommand("git add .", "Ajout des fichiers modifiés");

    let message = "";
    while (!message.trim()) {
        message = await askQuestion("\n Message de commit : ");
    }

    const safeMessage = message.replace(/"/g, '\\"');
    runCommand(`git commit -m "${safeMessage}"`, "Envoi du commit");

    runCommand(`git push --set-upstream origin ${currentBranch}`, `Push sur origin/${currentBranch}`);

    const askPR = await askQuestion("\n Ouvrir GitHub pour créer la Pull Request sur 'main' ? (o/n) : ");
    if (['o', 'oui', 'y', 'yes'].includes(askPR.toLowerCase())) {
        const prUrl = `${GITHUB_REPO_URL}/compare/main...${currentBranch}?expand=1`;
        const startCmd = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
        execSync(`${startCmd} ${prUrl}`);
    }

    console.log("\n Code envoyé avec succès !");
    rl.close();
}

main();
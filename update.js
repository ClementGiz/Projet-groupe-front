import { execSync } from 'child_process';
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
        throw error; // On propage l'erreur pour pouvoir l'attraper dans le bloc merge si besoin
    }
}

async function main() {
    console.log("==========================================");
    console.log(" Script de mise à jour du projet React    ");
    console.log("==========================================");

    try {
        const securite = (await askQuestion("Avez-vous des fichiers non commit sur votre branche de travail ? (o/n) : ")).trim().toLowerCase();
        if (['o', 'oui', 'y', 'yes'].includes(securite)) {
            runCommand("git stash", "Mise en réserve des fichiers non commit");
        }

        runCommand("git checkout main", "Basculement sur la branche main");
        runCommand("git pull origin main", "Récupération du dernier code");

        runCommand("npm install", "Mise à jour des packages npm");

        const creation = (await askQuestion("\nVoulez-vous créer une NOUVELLE branche de travail ? (o/n) : ")).trim().toLowerCase();
        let name = "";
        while (!name.trim()) {
            name = await askQuestion("Quel est le nom de la branche sur laquelle vous voulez travailler ? ");
        }
        const cleanBranch = name.trim().replace(/\s+/g, '-');

        if (['o', 'oui', 'y', 'yes'].includes(creation)) {
            runCommand(`git checkout -b ${cleanBranch}`, `Création de la branche '${cleanBranch}'`);
        } else {
            runCommand(`git checkout ${cleanBranch}`, "Retour sur la branche de travail");
            try {
                runCommand("git merge main", "Intégration des mises à jour à la branche de travail");
                console.log("\nLa fusion des branches s'est déroulée sans soucis !");

                if (['o', 'oui', 'y', 'yes'].includes(securite)) {
                    runCommand("git stash pop", "Restauration des modifications locales");
                }
            } catch (mergeError) {
                console.log("ATTENTION : DES CONFLITS SONT DÉTECTÉS !");
                console.log("1. Ouvrez votre IDE pour régler les conflits dans les fichiers en rouge.");
                console.log("2. Une fois réglé, faites : git add . puis git commit");
                console.log("3. Si vous aviez des modifications en réserve, récupérez-les avec : git stash pop");
                rl.close();
                process.exit(1);
            }
        }

        console.log("\n Tout est à jour et prêt pour continuer !");
    } catch (globalError) {
        process.exit(1);
    } finally {
        rl.close();
    }
}

main();
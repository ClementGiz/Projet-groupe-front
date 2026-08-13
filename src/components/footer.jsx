function Footer() {
    return (
        <footer className="bg-gray-900 text-white mt-auto">
            <div className="max-w-7xl mx-auto px-6 py-10">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Présentation */}
                    <div>
                        <h2 className="text-xl font-bold mb-3">
                            MonProjet
                        </h2>
                        <p className="text-gray-400">
                            Une plateforme simple et moderne.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="font-semibold mb-3">
                            Navigation
                        </h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>Accueil</li>
                            <li>Connexion</li>
                            <li>Inscription</li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold mb-3">
                            Contact:
                        </h3>
                        <p className="text-gray-400">
                          monprojet@campus-eni.fr
                        </p>
                    </div>

                </div>

                <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
                    © 2026 EniEcole. Tous droits réservés.
                </div>

            </div>
        </footer>
    );
}

export default Footer;
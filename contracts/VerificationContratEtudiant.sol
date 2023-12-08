// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract VerifierContratEtudiant {
    
    // Structure pour représenter un étudiant
    struct Etudiant {
        bool b2Francais;
        bool b2Anglais;
        uint8 moyenne;
        bool stageValide;
        bool diplomeObtenu;
    }

    // Mapping pour stocker les informations des étudiants par adresse
    mapping(address => Etudiant) public etudiants;


    // Fonction pour ajouter les détails d'un étudiant
    function ajouterEtudiant(
        bool _b2Francais,
        bool _b2Anglais,
        uint8 _moyenne,
        bool _stageValide
    ) external {
        etudiants[msg.sender] = Etudiant({
            b2Francais: _b2Francais,
            b2Anglais: _b2Anglais,
            moyenne: _moyenne,
            stageValide: _stageValide,
            diplomeObtenu: false
        });
    }

    // Fonction pour vérifier si un étudiant a obtenu son diplôme
    function verifierDiploma() public view returns (bool) {
        Etudiant storage etudiantActuel = etudiants[msg.sender];
        return etudiantActuel.b2Francais &&
            etudiantActuel.b2Anglais &&
            etudiantActuel.moyenne > 10 &&
            etudiantActuel.stageValide &&
            !etudiantActuel.diplomeObtenu;
    }

    // Fonction pour marquer qu'un étudiant a obtenu son diplôme
    function marquerDiplomeObtenu() external {
        require(verifierDiploma(), "Conditions pour obtenir le diplome non remplies.");
        etudiants[msg.sender].diplomeObtenu = true;
    }
}

pragma solidity ^0.8.0;

contract DiplomeVerifier {
    string public nomEtudiant;
    uint8 public noteFrancais;
    uint8 public noteAnglais;
    uint8 public moyenne;

    constructor(string memory _nomEtudiant, uint8 _noteFrancais, uint8 _noteAnglais, uint8 _moyenne) {
        nomEtudiant = _nomEtudiant;
        noteFrancais = _noteFrancais;
        noteAnglais = _noteAnglais;
        moyenne = _moyenne;
    }

    function verifierDiplome() public view returns (bool) {
        // Vérifie si les notes en français et en anglais sont supérieures ou égales à B2
        if (noteFrancais >= 12 && noteAnglais >= 12) {
            // Vérifie si la moyenne est supérieure à 10
            if (moyenne > 10) {
                return true; // L'étudiant réussit son diplôme
            }
        }
        return false; // L'étudiant ne réussit pas son diplôme
    }
}
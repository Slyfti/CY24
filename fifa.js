/* ------------------------------------------------------------  */
/* On charge la fonction ajouterOnClick au chargement de la page */
/* ------------------------------------------------------------  */
document.body.onload = function() {
  creerJoueurs();
  afficherJoueurs();
  creerEquipeVide(nombreDefenseur,nombreMilieu,nombreAttaquant);
  updateForm();
  ajouterOnClick();
}



let nombreDefenseur =4;
let nombreMilieu = 4;
let nombreAttaquant =2;

/* ------------------------------------------------------------  */
let selection = document.getElementsByClassName("selection")[0];
let compo = document.getElementById("compo");


function ajouterOnClick() {
  let cartes = document.getElementsByClassName("carte");
  let overlay = document.getElementsByClassName("overlay");
  for (let i = 0;i<cartes.length;i++){
    cartes[i].addEventListener('click',positionner);
    cartes[i].addEventListener('dragstart',drag);
    cartes[i].addEventListener('dragover',allowDrop);
    cartes[i].addEventListener('drop',drop);
    cartes[i].addEventListener("dragend",dropAnnule);

    


  }
}



// Liste des joueurs masculins
var joueursH = [
  'Dante',
  'Ronaldo',
  'alisson',
  'brunoFernandes',
  'bukayoSaka',
  'GabrielMartinelli',
  'jackGrealish',
  'joaoCancelo',
  'johnatanClauss',
  'judeBellingham',
  'kevinDeBruyne',
  'kylianMbappe',
  'lucaHermandez',
  'martinOdegaard',
  'olivierGiroud',
  'philFoden',
  'robertLewandowski',
  'theoHermandez',
  'tonyKroos',
  'virgilVanDijk',
  'Pessi'
]

// Liste des joueurs féminins
var joueursF = [
  'alexGreenwood',
  'alexiaPutellas',
  'alexMorgan',
  'bethMead',
  'carolineHansen',
  'debinha',
  'DzseniferMarozsan',
  'eugenieLeSommer',
  'jackieGroenen',
  'jordanNobbs',
  'kenzaDali',
  'kimLittle',
  'leahWilliamson',
  'liaWalti',
  'lucyBronze',
  'mapiLeon',
  'maryEarps',
  'millieTurner',
  'onaBatlle',
  'pernilleHarder',
  'samKerr',
  'sandraPanos',
  'Pessie'
]

// Liste des joueurs féminins
var joueursA = [
  'pingouin'
]

function creerCarte(nom,categorie) {
  let carte = document.createElement("div");
  carte.className = "carte";
  carte.dataset.value =categorie;
  carte.name = nom;
  carte.draggable = true;
  let overlay = document.createElement("div");
  overlay.className = "overlay";
  let joueur = document.createElement("img");
  joueur.src = "imgJoueurs/"+nom+".png";
  joueur.className = "joueur";
  carte.style.display = "none";
  overlay.prepend(joueur);
  carte.prepend(overlay);
  
  
  return carte;
}

function creerJoueurs() {
  let carte;
  selection.innerHTML = "";
  for (let i=0;i<joueursH.length;i++) {
    carte = creerCarte(joueursH[i],"homme");
    selection.prepend(carte);
  }
  
  for (let i=0;i<joueursF.length;i++) {
    carte = creerCarte(joueursF[i],"femme");
    selection.prepend(carte);
  }

  for (let i=0;i<joueursA.length;i++) {
    carte = creerCarte(joueursA[i],"animal");
    selection.prepend(carte);
  }
}





function creerCarteVide() {
  let categorie = document.getElementById("categorie").value;

  carte = document.createElement("div");
  carte.className = "carte vide";
  carte.draggable = true;
  let overlay = document.createElement("div");
  overlay.className = "overlay";
  let joueur = document.createElement("img");
  joueur.src = "img/empty.png";
  joueur.className = "joueur";
  overlay.appendChild(joueur);
  carte.appendChild(overlay);
  return carte;
}

function creerPosition(lettreRole) {
  position = document.createElement("div");
  position.className = "position";
  position.dataset.value =lettreRole;
  position.appendChild(creerCarteVide());
  return position;
}

function creerEquipeVide(def,mil,att) {
  let equipe = document.getElementsByClassName("equipe")[0];
  equipe.innerHTML = "";
  let divA = document.createElement("div");
  let divM = document.createElement("div");
  let divD = document.createElement("div");
  let divG = document.createElement("div");
  
  for (let i=0;i<def;i++) {
    divD.appendChild(creerPosition("D"));
  }
  for (let i=0;i<mil;i++) {
    divM.appendChild(creerPosition("M"));
  }
  for (let i=0;i<att;i++) {
    divA.appendChild(creerPosition("A"));
  }

  // Gardien
  divG.appendChild(creerPosition("G"));

  equipe.appendChild(divA);
  equipe.appendChild(divM);
  equipe.appendChild(divD);
  equipe.appendChild(divG);
  ajouterOnClick();
}



function selectionner(e) {
  
  let carte = e.currentTarget;
  
  if (carte.classList.contains("carte")) {
    let ancienneCarte = document.getElementById("carte_clique");
    if (ancienneCarte) ancienneCarte.id = ""

    if (carte.id == "carte_clique") {
      carte.id = ""
    } else {
      carte.id = "carte_clique"
    }
  }
}

function positionner(e) {

  let carte_clique = document.getElementById("carte_clique");
  let equipe = document.getElementsByClassName("equipe")[0];
  let selection = document.getElementsByClassName("selection")[0];
  let categorie = document.getElementById("categorie").value;
  let carte = e.currentTarget;


  if (carte_clique == null) {
    selectionner(e);
    // Si on clique deux fois sur une carte de l'équipe, alors on la vire
  } else if (carte.isEqualNode(carte_clique) && equipe.contains(carte_clique)) { 
    carte_clique.dataset.value = categorie;
    carte.dataset.value = categorie;

    carte.id = "";
    if (carte.classList.contains("vide")) {
      carte.parentNode.removeChild(carte)
    } else {
      selection.prepend(carte); // Si on vire une carte vide, on la supprime
      selection.removeChild(selection.lastChild);
    } 
     // Sinon on interchange les deux cartes
  } else {
    carte_clique.dataset.value = categorie;
    carte.dataset.value = categorie;
    
    let selection = carte_clique.parentNode;
    let divClick = carte.parentNode;
    carte.id = "";
    carte_clique.id = "";
    if (selection == divClick) {
      selectionner(e);
    } else {
      divClick.removeChild(carte);
      carte_clique.classList.contains("vide") ? divClick.appendChild(carte_clique)  :  divClick.prepend(carte_clique);
      // Si l'ancienne carte n'est pas une carte vide, alors on peux échanger les deux cartes
      carte.classList.contains("vide") ? selection.appendChild(carte) : selection.prepend(carte) ;
    }
    
    
  }
  let positions = document.getElementsByClassName("position");
  for (let i=0;i<positions.length;i++) {
    if (positions[i].children.length==0) positions[i].appendChild(creerCarteVide());
  }
  ajouterOnClick();
  updateForm();

}


// FONCTIONS QUI PERMETTENT LE DRAG AND DROP : https://www.w3schools.com/html/html5_draganddrop.asp
function drag(e) {
  carte_clique = document.getElementById("carte_clique");
  if (carte_clique !=null) carte_clique.id = "";
  e.currentTarget.id = "carte_clique";
}

function drop(e) {
  carte_clique = document.getElementById("carte_clique");
  positionner(e);
}

function allowDrop(e) {
  e.preventDefault();
}

function dropAnnule(e) {
  carte_clique = document.getElementById("carte_clique");
  if (carte_clique !=null) carte_clique.id = "";

}

//



function miseAJourCompo() {
  let compo = document.getElementById("compo");
  listeInfo = compo.value.split(",");
  nombreDefenseur = listeInfo[0];
  nombreMilieu = listeInfo[1];
  nombreAttaquant = listeInfo[2];
}





function afficherJoueurs() {
  // creerEquipeVide(nombreDefenseur,nombreMilieu,nombreAttaquant);
  let carte;
  let joueur;
  let overlay;
  let categorie = document.getElementById("categorie").value;
  console.log(categorie)
  let joueurs = selection.children;
  // selection.innerHTML = "";
  for (let i=0;i<joueurs.length;i++) {
    joueurs[i].dataset.value == categorie ? joueurs[i].style.display = "flex": joueurs[i].style.display = "none";
  }
  ajouterOnClick();
  
  
}

function reinitialiser() {
  creerJoueurs();
  miseAJourCompo();
  afficherJoueurs();
  creerEquipeVide(nombreDefenseur,nombreMilieu,nombreAttaquant);
}


function ajouterCarteForm(infos,nom_carte,role) {
  let info = document.createElement("input");
  info.name = role;
  info.value = nom_carte;
  info.type = "hidden";
  info.required = true;
  infos.appendChild(info);
}

function ajouterInputVide(infos) {
  let info = document.createElement("input");
  info.style.display = "none";
  info.dataset.value = "empty"; // Affichera une image si on arrive quand même à passer outre la protection
  info.name = 0;
  info.type = "text"; // Obligé de mettre text pour le required fasse effet
  infos.appendChild(info);
  info.required = true;
}

function updateForm() {
  infos.innerHTML ="";
  let k=0;

  
  let equipe = document.getElementsByClassName("equipe")[0];
  let roleDivList = equipe.children;
  for (let i=0;i < roleDivList.length;i++) {
    let positionList = roleDivList[i].children;
    for (let j=0;j < positionList.length;j++) {
      let position = positionList[j];
      let role = position.dataset.value;
      let nom_carte = position.firstChild.name;
      if (nom_carte !=null) {
        ajouterCarteForm(infos,nom_carte,role);
        k++;
      } else {
        ajouterInputVide(infos);
      }
    }
  }
  return k;
}

function envoyer() {
  let menu = document.getElementById("menu");
  console.log(updateForm());
  if (updateForm() ==11) {
    menu.submit();
  }
}

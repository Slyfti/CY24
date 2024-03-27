/* ------------------------------------------------------------  */
/* On charge la fonction au chargement de la page */
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


// Ajoute les attributs on click sur les éléments 
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

// Liste des joueurs ???
var joueursA = [
  'pingouin',
  'kangourou',
  'chien'
]

var joueursNice = [

  'mendy',
  'guessand',
  'bekaBeka',
  'bard',
  'perraud',
  'claude-maurice',
  'sanson',
  'diop',
  'todibo',
  'thuram',
  'laborde'


]

// Crée une carte en fonction de son nom (nom de l'image = nom du joueur), et de sa catégorie (femme, homme etc..)
function creerCarte(nom,categorie) {
  let carte = document.createElement("div");
  carte.className = "carte";
  carte.dataset.value =categorie;
  carte.name = nom;
  carte.draggable = true;
  let overlay = document.createElement("div");
  overlay.className = "overlay";
  let joueur = document.createElement("img");
  joueur.src = "content/imgJoueurs/"+nom+".png";
  joueur.className = "joueur";
  carte.style.display = "none";
  overlay.prepend(joueur);
  carte.prepend(overlay);
  
  
  return carte;
}

// Crée les joueurs au chargement de la page
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

  for (let i=0;i<joueursNice.length;i++) {
    carte = creerCarte(joueursNice[i],"nice");
    selection.prepend(carte);
  }

  
}




// Crée une carte vide (carte violette avec logo)
function creerCarteVide() {
  let categorie = document.getElementById("categorie").value;

  carte = document.createElement("div");
  carte.className = "carte vide";
  carte.draggable = true;
  let overlay = document.createElement("div");
  overlay.className = "overlay";
  let joueur = document.createElement("img");
  joueur.src = "content/img/empty.png";
  joueur.className = "joueur";
  overlay.appendChild(joueur);
  carte.appendChild(overlay);
  return carte;
}

// Crée une position avec le rôle attribué
function creerPosition(lettreRole) {
  position = document.createElement("div");
  position.className = "position";
  position.dataset.value =lettreRole;
  position.appendChild(creerCarteVide());
  return position;
}

// Crée une équipe vide en fonction de la composition passée (supprime la précédente si elle existait)
function creerEquipeVide(def,mil,att) {
  let equipe = document.getElementsByClassName("equipe")[0];
  equipe.innerHTML = "";
  let divA = document.createElement("div");
  let divM = document.createElement("div");
  let divD = document.createElement("div");
  let divG = document.createElement("div");
  
  for (let i=0;i<def;i++) { // Défenseurs
    divD.appendChild(creerPosition("D"));
  }
  for (let i=0;i<mil;i++) { // Millieux
    divM.appendChild(creerPosition("M"));
  }
  for (let i=0;i<att;i++) { // Attaquants
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


// Met un id carte_clique sur la carte passé et enlève l'ancien id carte_clique, 
function selectionner(carte) {
  
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

// Echange les positions de deux cartes, (gère le cas carte vide : mettre la carte à la fin de la div parent)
function echanger(carte1,carte2) {
  let div1 = carte2.parentNode;
  let div2 = carte1.parentNode;
  carte1.id = "";
  carte2.id = "";
  if (div1 == div2) {
    selectionner(carte1);
  } else {
    div2.removeChild(carte1);
    carte2.classList.contains("vide") ? div2.appendChild(carte2)  :  div2.prepend(carte2);
    // Si l'ancienne carte n'est pas une carte vide, alors on peux échanger les deux cartes
    carte1.classList.contains("vide") ? div1.appendChild(carte1) : div1.prepend(carte1);
  }

} 


// Vire une carte de l'équipe (et la remet dans la selection si elle n'est pas vide)
function virerCarte(carte) {
  carte.id = "";
    if (carte.classList.contains("vide")) {
      carte.parentNode.removeChild(carte) // Si on vire une carte vide, on la supprime
    } else {
      selection.prepend(carte); // Sinon, on l'enleve de l'équipe et on la remet dans la selection
      selection.removeChild(selection.lastChild); // On enlève la carte vide qui était auparavant dans la selection (elle est forcémment en dernier)
    } 
}


function positionner(e) {

  let carte_clique = document.getElementById("carte_clique");
  let equipe = document.getElementsByClassName("equipe")[0];
  let selection = document.getElementsByClassName("selection")[0];
  let categorie = document.getElementById("categorie").value;
  let carte = e.currentTarget;


  // Si on ctrl + click sur un joueur de la sélection
  if (e.ctrlKey && carte.parentNode == selection) {
    let premiereCarteVide = document.querySelector(".vide");
    selectionner(premiereCarteVide);
    premiereCarteVide.dataset.value = categorie;
    carte.dataset.value = categorie;
    
    echanger(carte,premiereCarteVide);
    let carte_clique = document.getElementById("carte_clique");
    if (carte_clique =! null) carte_clique.id = "";
  
  } else if (carte_clique == null) { // Si il n'y a pas déjà une carte de cliqué, alors on selectionne la carte actuelle
    selectionner(carte);


  // Si on clique deux fois sur une carte de l'équipe, alors on la vire
  } else if (carte.isEqualNode(carte_clique) && equipe.contains(carte_clique)) { 
    carte_clique.dataset.value = categorie;
    carte.dataset.value = categorie;
    virerCarte(carte);
     
  } else { // Sinon on interchange les deux cartes
    carte_clique.dataset.value = categorie;
    carte.dataset.value = categorie;
    echanger(carte,carte_clique);
  }
  


  // Remet des cartes vides dans l'équipe si il vient à en manquer (par exemple si on supprime une carte)
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
  if  (document.getElementById("carte_clique")!= null) document.getElementById("carte_clique").id = "";
  let categorie = document.getElementById("categorie").value;
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
  if (updateForm() ==11) {
    menu.submit();
  }
}

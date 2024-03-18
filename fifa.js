





function ajouterOnClick() {
  let cartes = document.getElementsByClassName("carte");
  let positions = document.querySelectorAll('.carte');
  for (let i = 0;i<cartes.length;i++){
    cartes[i].addEventListener('click',positionner);
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


function creerCarteVide() {
  carte = document.createElement("div");
  carte.className = "carte vide";
  overlay = document.createElement("div");
  overlay.className = "overlay";
  joueur = document.createElement("img");
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

}



function selectionner(e) {
  
  let carte = e.target.parentNode;
  
  if (carte.className == "carte") {
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
  let carte = e.target.parentNode;
  if (carte_clique == null) {
    selectionner(e);
  } else if (carte.isEqualNode(carte_clique) && equipe.contains(carte_clique)) { 
    carte.id = "";
    selection.appendChild(carte);
  } else {
    let selection = carte_clique.parentNode;
    let divClick = carte.parentNode;
    carte.id = "";
    carte_clique.id = "";
    if (selection == divClick) {
      selectionner(e);
    } else {
      divClick.removeChild(carte);
      divClick.appendChild(carte_clique);
      // Si l'ancienne carte n'est pas une carte vide, alors on peux échanger les deux cartes
      if (!carte.classList.contains("vide")) selection.appendChild(carte);
    }
    
    
  
  }
  let positions = document.getElementsByClassName("position");
  for (let i=0;i<positions.length;i++) {
    if (positions[i].children.length==0) positions[i].appendChild(creerCarteVide());
  }
  ajouterOnClick();
  updateForm();

}

let nombreDefenseur =4;
let nombreMilieu = 4;
let nombreAttaquant =2;

function miseAJourCompo() {
  let compo = document.getElementById("compo");
  listeInfo = compo.value.split(",");
  nombreDefenseur = listeInfo[0];
  nombreMilieu = listeInfo[1];
  nombreAttaquant = listeInfo[2];
  creerEquipeVide(nombreDefenseur,nombreMilieu,nombreAttaquant);
  afficherJoueurs();

}

/* ------------------------------------------------------------  */
/* On charge la fonction ajouterOnClick au chargement de la page */
/* ------------------------------------------------------------  */
document.body.onload = function() {
  afficherJoueurs();
  creerEquipeVide(nombreDefenseur,nombreMilieu,nombreAttaquant);
}

/* ------------------------------------------------------------  */

let selection = document.getElementById("joueursH");


function afficherJoueurs() {
  let carte;
  let joueur;
  let overlay;
  let categorie = document.getElementById("categorie").value;
  selection.innerHTML = "";
  switch (categorie) {
    case "joueursH":
      for (let i=0;i<joueursH.length;i++) {
        carte = document.createElement("div");
        carte.className = "carte";
        carte.dataset.value =joueursH[i];
        overlay = document.createElement("div");
        overlay.className = "overlay";
        joueur = document.createElement("img");
        joueur.src = "imgJoueurs/"+joueursH[i]+".png";
        joueur.className = "joueur";
        overlay.appendChild(joueur);
        carte.appendChild(overlay)
    
        selection.appendChild(carte);
        selection.id = categorie;
        
      }      
      break;

    case "joueursF":
      for (let i=0;i<joueursF.length;i++) {
        carte = document.createElement("div");
        carte.className = "carte";
        carte.dataset.value = joueursF[i];
        overlay = document.createElement("div");
        overlay.className = "overlay";
        joueur = document.createElement("img");
        joueur.src = "imgJoueurs/"+joueursF[i]+".png";
        joueur.className = "joueur";
        
        overlay.appendChild(joueur);
        carte.appendChild(overlay)
    
        selection.appendChild(carte);
        selection.id = categorie;
        
      }   
      break;
  }
  ajouterOnClick();
  
  
}

function reinitialiser() {
  miseAJourCompo();
  afficherJoueurs();
  creerEquipeVide(4,4,2);
}


function ajouterCarteForm(infos,nom_carte,role) {
  console.log(nom_carte)
  let info = document.createElement("input");
  info.name = role;
  info.value = nom_carte;
  info.type = "hidden";
  infos.appendChild(info);
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
      let nom_carte = position.firstChild.dataset.value;
      if (nom_carte !=null) {
        ajouterCarteForm(infos,nom_carte,role);
        k++;
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

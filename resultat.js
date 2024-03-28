valParam = new Array();
let nomParam = new Array();
let dict = {};
/* On enlève le ? */
url = decodeURIComponent(window.location.search.slice(1,window.location.search.length)).replace( /\+/g, ' ' ); // decodeUrlComponent permet de mettre des caractères UTF 8 dans le lien
/* récupérer les différents paramètres séparés par un & */
listParam = url.split("&");
for(i=0;i<listParam.length;i++){
    laListe = listParam[i].split("=");
    nomParam[i] = laListe[0];
    valParam[i] = laListe[1]
    if (nomParam[i].length !=1 ) dict[nomParam[i]] = valParam[i]; // On ne prends pas en compte les joueurs
}

compo = dict["compo"] // Cherche le paramètre s'appelant compo
listCompo = compo.split(",");
def = listCompo[0]; 
mil = listCompo[1]; 
att = listCompo[2];

// Joueurs = paramètres de 0 à 11
listeJoueurs = valParam.slice(0,11);

// Crée une équipe
function creerEquipe(def,mil,att) {
    let equipe = document.getElementsByClassName("equipe")[0];
    equipe.innerHTML = "";
    let divA = document.createElement("div");
    let divM = document.createElement("div");
    let divD = document.createElement("div");
    let divG = document.createElement("div");
    let k=0;
    
    // L'ORDRE DES BOUCLES EST PRIMORDIAL, IL EST DE HAUT EN BAS POUR RECONSTRUIRE L'EQUIPE
    let position;
    for (let i=0;i<att;i++) {
        position = document.createElement("div");
        position.className = "position";
        position.dataset.value ="A";
        position.appendChild(creerCarte(k));
        divA.appendChild(position);
        k++;
    }

    for (let i=0;i<mil;i++) {
    position = document.createElement("div");
    position.className = "position";
    position.dataset.value ="M";
    position.appendChild(creerCarte(k));
    divM.appendChild(position);
    k++;

    }
    
    for (let i=0;i<def;i++) {
      position = document.createElement("div");
      position.className = "position";
      position.dataset.value ="D";
      position.appendChild(creerCarte(k));
      divD.appendChild(position)
      k++;
    }
    // Gardien
    position = document.createElement("div");
    position.className = "position";
    position.dataset.value ="G";
    position.appendChild(creerCarte(k));
    divG.appendChild(position);
  
    equipe.appendChild(divA);
    equipe.appendChild(divM);
    equipe.appendChild(divD);
    equipe.appendChild(divG);
  
}

// Crée une carte
function creerCarte(k) {
    carte = document.createElement("div");
    carte.className = "carte vide";
    overlay = document.createElement("div");
    overlay.className = "overlay";
    joueur = document.createElement("img");
    if (listeJoueurs[k].name == "empty") {
        joueur.src = "content/img/empty.png";
    } else {
        joueur.src = "content/imgJoueurs/"+listeJoueurs[k]+".png";
    }
    joueur.className = "joueur";
    overlay.appendChild(joueur);
    carte.appendChild(overlay);
    return carte;
}


// Permet de mettre le lien du site dans le presse papier
function partager() {
    let partage = document.getElementById("partage");
    let url = window.location.href;
    navigator.clipboard.writeText(url);
    partage.innerText = "LIEN COPIÉ !";
}

creerEquipe(def,mil,att);
if (dict["nom_equipe"]) document.getElementById("nom_equipe").innerText = "ÉQUIPE : "+ dict["nom_equipe"].toUpperCase(); // Nom d'équipe personnalisé
if (dict["compo"]) document.getElementById("compo").innerText = "COMPOSITION : " + dict["compo"].replaceAll(",","-"); // Composition personnalisé
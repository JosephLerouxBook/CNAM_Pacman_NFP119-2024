/* 
    Voir le readme.md pour une description complete des differentes 
    fonctionnalitées et des descriptions de fonction.
    Voir le CR.pdf pour une description du projet, des bugs rencontrer etc...
*/
// global variable for the project

// default initial width and heigth for the target  <=== faux, le css annonce 30px (L31), surement utile pour les bonus
var TARGET_WIDTH = 40;
var TARGET_HEIGHT = 40;

// chrono management
// value of time in tenth of seconds
var time = 0;
// timer variable 
var chronoTimer = null;
var intervalId; //necessaire a la gestion du chronomètre

// YOUR NAME HERE : Joseph Leroux

// YOUR CODE BELOW


//main
document.addEventListener("DOMContentLoaded", function() { //lance le code apres le chargement de la page, sinon rien.
    buttonOneTarget = document.getElementById("create"); //Cible le bouton "create"
    buttonOneTarget.addEventListener('click', onClickButtonOneTarget); //Ajoute un EventListener onclick au bouton "create".
    buttonStart = document.getElementById("start"); //Cible le bouton "start"
    buttonStart.addEventListener('click', function(){onClickButtonStart()}); //Ajoute un EventListener onclick au bouton "start".  
    
    WinAlertBoxCreator();
    ErrAlertBoxCreator("","", "none");
});



/*               *\

Gestion d'une cible 

\*               */

//Fonction gerant le bouton "Une cible" quand cliquer.
function onClickButtonOneTarget(){
    var target = document.querySelectorAll(".target") //recupere toute les cibles de la page pour verification
    if (target.length == 0){ //Gestion ne pas afficher + de 1 cible.
        targetCreator(); //lance la création d'une cible.
    } else {
        console.log("ERROR : 1 seul cible a la fois."); //message d'erreur dans la console lorsque plus de 1 cible
    }
}

//Fonction de creation des cibles
function targetCreator(){
    console.log("ici?");
    var zoneDeJeu = document.getElementById("terrain"); //cible la zone de jeu
    var target = document.createElement("div");  //crée un element de type div
    var positionX = Math.random() * (zoneDeJeu.offsetWidth - 30);//generation aléatoire de la position X /!\ 30 = diametre de la cible
    var positionY = Math.random() * (zoneDeJeu.offsetHeight - 30);//generation aléatoire de la position X /!\ 30 = diametre de la cible

    //Modifie les attributs css de la cible.
    target.style.left = positionX + "px"; //ajout des position X generer aléatoirement plus haut.
    target.style.top = positionY + "px"; //ajout des position Y generer aléatoirement plus haut.
    target.setAttribute('class', "target");//ajoute a la div l'attribut class="target"
    target.style.opacity = 1; //ajoute de l'opacité a la cible (Pourquoi .target as opacity = 0 && .target.on.hit aussi????????????)
    zoneDeJeu.appendChild(target);//ajoute la cible a la page.

    //Application des evenements a la cible crée 
    target.addEventListener('click', onClickTarget);//ecoute sur l'eventListener onclick de la cible : lance onClickTarget()
    target.addEventListener('mouseenter', function(event) { //Ecoute l'evenement mouseenter
        target.classList.add("on"); //et ajoute "on" a la classe pour quelle devienne "target on"
    });
    target.addEventListener('mouseleave', function(event) {//Ecoute l'evenement mouseleave 
        target.classList.remove("on"); //et retire "on" a la classe pour quelle redevienne "target"
    });
}


//Fonction faisant disparaitre la cible une fois cliquer.
function onClickTarget(){
    var target = document.querySelectorAll(".target");
    if (target.length != 0){
        for (var i = 0; i < target.length; i++) {
            //target[i].setAttribute('class', 'target on hit'); 
            removeElementWithDelay(target[i], 300); //le z-index de .target.on.hit fait rien, on vas pas y toucher... 
        }
    }
}


//Fonction permettant d'attendre le $delay avant de remove l'element. (utiliser pour le onClickTarget)
function removeElementWithDelay(element, delay) {
    element.setAttribute('class', 'target on hit'); //Change la classe de l'element passer (la cible) en "target on hit"
    setTimeout(() => { //Ajoute un delais avant de lancer le contenu
        element.remove(); //Supprime l'element (la cible) apres la fin du setTimeout.
    }, delay);
}



/*            *\

Gestion du temps

\*            */

//Fonction mettant a jour le timer
function updateTimer(buttonTime){
    currentTime = Date.now() //recupere le temps en milisec maintenant
    chronoTimer = currentTime - buttonTime;  //fait la difference entre le temps initial et le temps recup a l'instant pour avoir le temps durant lequel le chronometre a fonctionner
    //converti les valeurs en Int arrondis.
    var totalSeconds = Math.floor(chronoTimer / 1000);
    var minutes = Math.floor(totalSeconds / 60);
    var milisecond = Math.floor((chronoTimer % 1000) / 10); // =>Useless
    var tenth = Math.floor((chronoTimer % 1000)/100)  

    //Ajoute les 0 manquant : 
    totalSeconds = totalSeconds < 10 ? '0'+totalSeconds : totalSeconds;
    minutes = minutes < 10 ? '0'+minutes :  minutes;

    //rempli les span associé.
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = totalSeconds;
    document.getElementById("tenth").textContent = tenth;
}


//arrete le jeu et le timer.
function stopTimer(){
    clearInterval(intervalId);
}



/*                                                   *\

Gestion des cibles multiples apres cliquer sur demarrer

\*                                                   */ 
function onClickButtonStart(){
    var inputvalue = document.getElementById("nbtargets"); //Cible la partie <input> de l'utilisateur
    var nbrtarget = inputvalue.value; //Recupere la valeur entree par l'utilisateur et la stocke  dans nbrtarget
    if (nbrtarget == 0){
        ErrAlertBoxCreator('Attention !', 'Le nombre de cible ne peut pas etre égale a 0... ', '')
        return;
    }
    var targetRemaining  = document.getElementById("remaining"); //Cible la partie "cible restante" de la page
    targetRemaining.innerHTML = nbrtarget; //Remplis la partie "cible restante" avec la valeur de l'input

    //Gestion de la rejouabilité : supprime les target si il y en as.
    var target = document.querySelectorAll(".target");
    if (target.length != 0){ 
        for (var i = 0; i < target.length; i++) {
            target[i].remove();
        }
    }

    //Gestion du temps 
    if(intervalId){stopTimer();} // Arrete le chronometre si il est en cours
    time = Date.now(); //recupere la date actuelle
    intervalId = setInterval(function(){updateTimer(time);}, 10); //update le timer tout les 0,01sec
    
    //Lancement de la création des cibles
    multipleTargetCreator(nbrtarget); 
}


function multipleTargetCreator(nbrtarget){
    var zoneDeJeu = document.getElementById("terrain"); //Cible le terrain
    var i = 1; //Index pour les div des cibles
    while(nbrtarget != 0){ //tourne tant que le nombre rentrer par l'utilisateur n'atteind pas 0
        var target = document.createElement("div");  //création de la div de cible
        var targetId = "target" + i; // Création de l'id de la cible
        var positionX = Math.random() * (zoneDeJeu.offsetWidth - 30);//generation aléatoire de la position X /!\ 30 = diametre de la cible, pas 40
        var positionY = Math.random() * (zoneDeJeu.offsetHeight - 30);//generation aléatoire de la position X /!\ 30 = diametre de la cible, pas 40
        var targetRemaining = document.getElementById("remaining"); //recuperation du nombre de cible restante sur le terrain pour Evenement onclick

        //ajout attributs a la cible
        target.setAttribute('class', "target"); //Ajoute l'attribut class="target" a la cible
        target.setAttribute('id', targetId);    //Ajoute l'id de la cible generer plus haut.

        //Modifie les attributs css de la cible.
        target.style.left = positionX + "px"; //applique la position X generer aléatoirement plus haut
        target.style.top = positionY + "px"; //applique la position Y generer aléatoirement plus haut
        target.style.opacity = 1; //ajoute de l'opacité a la cible (Pourquoi .target as opacity = 0 && .target.on.hit aussi????????????)
    
        zoneDeJeu.appendChild(target);//ajoute la cible a la page.

        //Application des evenements aux cible crée
        target.addEventListener('click', function(event){ //evenement Onclick
            if (event.target.classList.contains("target")) { //verifie que le clique a eu lieu sur un element contenant "target" 
                var cibleClique = event.target;
                if (!event.target.classList.contains("hit")) { //verifie que la cible n'ai pas deja été toucher. (etant donner qu'on lui ajoute "on hit" dans removeElementWithDelay())
                    targetRemaining.innerHTML = targetRemaining.innerHTML -1 ; //decrémente "cible restante"
                }
                if (targetRemaining.innerHTML == 0){ //verifie si le joueur a detruit toute les cibles
                    win(); //Lance la séquence de victoire
                }
                removeElementWithDelay(cibleClique, 300); // lance la fonction enlevant la cible de la page.
            }
        }); 
        target.addEventListener('mouseenter', function(event){ // Verifie l'evenement ou la souris rentre sur la cible
            if (event.target.classList.contains("target")) { // Verifie que l'endroit ou est rentrer la souris est bien une "target" 
                var cibleClique = event.target; //stock la cible concerner a l'instant
                cibleClique.classList.add("on"); // Ajoute le "on" de "target on"
            }
        }); 
        target.addEventListener('mouseleave', function(event){ // verifie l'evenement ou la souris sort de la cible
            if (event.target.classList.contains("target")) { // Verifie que l'endroit d'ou etais sorti la souris est bien une "target"
                var cibleClique = event.target; //stock la cible concerner a l'instant
                cibleClique.classList.remove("on"); //retire le "on" de "target on"
            }
        }); 
        nbrtarget--; //Decremente la condition de boucle (input de l'utilisateur)
        i++; //Increment l'index des id des cibles
    }
    
}




/*  *\

Autres

\*  */ 

function win(){
    var minute = document.getElementById("minutes").textContent; //recupere les minutes
    var seconds = document.getElementById("seconds").textContent; //recupere les seconds
    var tenth = document.getElementById("tenth").textContent; //recupere les dixiemes
    var winnerSentence = "Vous avez gagnez ! vous avez detruit toute les cibles en \n "+minute+"min "+seconds+ "sec " + tenth+"dizaine"; //création d'une phrase de victoire
    stopTimer(); //Arretes le timer
   //alert(winnerSentence); //lance le message alert avec la phrase de victoire
   document.getElementById("AlertMinute").innerHTML = minute;
   document.getElementById("AlertSecond").innerHTML = seconds;
   document.getElementById("AlertTenth").innerHTML = tenth;
    showMyAlert(1);
}

//MyAlerts
function WinAlertBoxCreator(){
    var alertbox = document.createElement('div');
    alertbox.innerHTML = '<h2 id="alertHeader">Bravo !</h2><p id="alertMessage">Vous avez gagner en : <span id="AlertMinute"></span>\' <span id="AlertSecond"></span>\'\' <span id="AlertTenth"></span> !<br>Félicitation !</p><button onclick="closeMyAlert()" id="alertButton">Fermer</button>';
    alertbox.id = 'WinningAlertBox'
    alertbox.className = 'myAlertBox';
    alertbox.style.display = 'none';
    document.body.appendChild(alertbox);
}

function ErrAlertBoxCreator(header, msg, displaystate){
    var alertbox = document.createElement('div');
    alertbox.innerHTML = '<h2 id="alertHeaderErr">'+header+'</h2><p id="alertMessageErr">'+msg+'</p><button onclick="closeMyAlert()" id="alertButtonErr">J\'ai compris</button>';
    alertbox.id = 'ErrAlertBox'
    alertbox.className = 'myAlertBox';
    alertbox.style.display = displaystate;
    document.body.appendChild(alertbox);
}


//affiche l'alerte
function showMyAlert(nbr) {
    if (nbr == 1){ 
        var elements = document.getElementById('WinningAlertBox');
        elements.style.display = '';
    }
    if (nbr == 2){
        var elements = document.getElementById('ErrAlertBox');
        elements.style.display = '';
    }
}

//Cache l'alert
function closeMyAlert() {
    var elements = document.getElementsByClassName('myAlertBox');
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = 'none';
    }
}
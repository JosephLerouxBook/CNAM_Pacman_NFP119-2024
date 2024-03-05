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
    var zoneDeJeu = document.getElementById("terrain"); //cible la zone de jeu
    var target = document.createElement("div");  //crée un element de type div
    
    var positionX = Math.random() * (zoneDeJeu.offsetWidth - 30);//generation aléatoire de la position X /!\ 30 = diametre de la cible
    var positionY = Math.random() * (zoneDeJeu.offsetHeight - 30);//generation aléatoire de la position X /!\ 30 = diametre de la cible

    
    //Modifie les attributs css de la cible.
    target.style.left = positionX + "px"; //ajout des position X generer aléatoirement plus haut.
    target.style.top = positionY + "px"; //ajout des position Y generer aléatoirement plus haut.
    target.setAttribute('class', "target");//ajoute a la div l'attribut class="target"

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
    var targetRemaining  = document.getElementById("remaining"); //Cible la partie "cible restante" de la page
    targetRemaining.innerHTML = nbrtarget; //Remplis la partie "cible restante" avec la valeur de l'input

    //Gestion de la rejouabilité : supprime les target si il y en as.
    var target = document.querySelectorAll(".target");
    if (target.length != 0){ 
        for (var i = 0; i < target.length; i++) {
            target[i].remove();
        }
    }
    if(intervalId){stopTimer();} // Arrete le chronometre si il est en cours
    time = Date.now(); //recupere la date actuelle
    intervalId = setInterval(function(){updateTimer(time);}, 10); //update le timer tout les 0,01sec

    multipleTargetCreator(nbrtarget); //création des cibles
}


function multipleTargetCreator(nbrtarget){
    var zoneDeJeu = document.getElementById("terrain");
    var i = 1;
    while(nbrtarget != 0){

        var target = document.createElement("div"); 
        target.setAttribute('class', "target");//vue dans le CSS : target = class
        var targetId = "target" + i;
        target.setAttribute('id', targetId);
        targetRemaining = document.getElementById("remaining");
        
        var positionX = Math.random() * (zoneDeJeu.offsetWidth - 30);//generation aléatoire de la position X /!\ 30 = diametre de la cible
        var positionY = Math.random() * (zoneDeJeu.offsetHeight - 30);//generation aléatoire de la position X /!\ 30 = diametre de la cible
    
        //Modifie les attributs css de la cible.
        target.style.left = positionX + "px";
        target.style.top = positionY + "px";
        target.style.opacity = 1;
    
        zoneDeJeu.appendChild(target);//ajoute la cible a la page.
        target.addEventListener('click', function(event){
            if (event.target.classList.contains("target")) {
                var cibleClique = event.target;
                //cibleClique.setAttribute('class', 'target on hit'); //target.on.hit fait disparaitre les div trop vite pour qu'on vois le changement de couleur.
                if (!event.target.classList.contains("hit")) {
                    targetRemaining.innerHTML = targetRemaining.innerHTML -1 ;
                }
                removeElementWithDelay(cibleClique, 300);
                console.log(targetRemaining.innerHTML);
                if (targetRemaining.innerHTML == 0){
                    stopTimer();
                    win();
                }
            }
        }); 
        target.addEventListener('mouseenter', function(event){
            if (event.target.classList.contains("target")) {
                var cibleClique = event.target;
                cibleClique.classList.add("on");
            }
        }); 
        target.addEventListener('mouseleave', function(event){
            if (event.target.classList.contains("target")) {
                var cibleClique = event.target;
                cibleClique.classList.remove("on");
            }
        }); 
        nbrtarget--;
        i++;
    }
    
}


/*  *\

Autres

\*  */ 
function win(){
    var minute = document.getElementById("minutes").textContent;
    var seconds = document.getElementById("seconds").textContent;
    var tenth = document.getElementById("tenth").textContent;
    var finalTime = minute + "' " + seconds + "'' " + tenth;
    var winnerSentence = "Vous avez gagnez ! vous avez detruit toute les cibles en \n "+minute+"min "+seconds+ "sec " + tenth+"dizaine";
    alert(winnerSentence);
}
/* 
    Voir le readme.md pour une description complete des differentes 
    fonctionnalitées et des descriptions de fonction.
    Voir le CR.pdf pour une description du projet, des bugs rencontrer etc...
*/


// global variable for the project

// default initial width and heigth for the target  <=== faux, le css annonce 30px (L31), j'ai loupé un truc ici
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
    buttonOneTarget = document.getElementById("create"); //Cible le bouton crée
    buttonOneTarget.addEventListener('click', onClickButtonOneTarget); //Ajoute un EventListener au bouton crée.


    buttonStart = document.getElementById("start"); //Cible le bouton démarrer
    buttonStart.addEventListener('click', function(){onClickButtonStart()}); //Ajoute un EventListener au bouton démarrer.   

    console.log("ERROR : Partie deja en cours.")

});


/*               *\

Gestion d'une cible 

\*               */
//Fonction gerant le bouton "Une cible" quand cliquer.
function onClickButtonOneTarget(){
    var target = document.querySelectorAll(".target") //recupere toute les cibles de la page pour verification
    //console.log(target);
    if (target.length == 0){ //Gestion ne pas afficher + de 1 cible.
        targetCreator(); //crée une cible.
    } else {
        console.log("ERROR : 1 seul cible a la fois."); //message d'erreur dans la console.
    }
}

//Fonction de creation des cibles
function targetCreator(){
    var zoneDeJeu = document.getElementById("terrain");
    var target = document.createElement("div"); 
    var positionX = Math.random() * (zoneDeJeu.offsetWidth - 30);//generation aléatoire de la position X /!\ 30 = diametre de la cible
    var positionY = Math.random() * (zoneDeJeu.offsetHeight - 30);//generation aléatoire de la position X /!\ 30 = diametre de la cible

    target.setAttribute('class', "target");//vue dans le CSS : targer = class
    //Modifie les attributs css de la cible.
    target.style.left = positionX + "px";
    target.style.top = positionY + "px";
    target.style.opacity = 1;
    var clicked = false;

    zoneDeJeu.appendChild(target);//ajoute la cible a la page.
    target.addEventListener('click', function(){ //ajoute l'eventListener au la cible crée
        onClickTarget();
        clicked = true;
    });
    target.addEventListener('mouseenter', function(event) {
        target.classList.add("on");
    });
    target.addEventListener('mouseleave', function(event) {
        if (clicked == false){
            target.classList.remove("on");
        }
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
    element.setAttribute('class', 'target on hit');
    setTimeout(() => {
        element.remove();
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
    var milisecond = Math.floor((chronoTimer % 1000) / 10);// =>Useless
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
    //console.log(intervalId);
    clearInterval(intervalId);
}


/*                                                   *\

Gestion des cibles multiples apres cliquer sur demarrer

\*                                                   */ 
function onClickButtonStart(){
    var inputvalue = document.getElementById("nbtargets");
    var nbrtarget = inputvalue.value;
    var targetRemaining  = document.getElementById("remaining");
    targetRemaining.innerHTML = nbrtarget;
    //Gestion de la rejouabilité : supprime les target si il y en as.
    var target = document.querySelectorAll(".target");
    if (target.length != 0){ 
        for (var i = 0; i < target.length; i++) {
            target[i].remove();
        }
    }

    multipleTargetCreator(nbrtarget);
    //Reinitialise le chronometre
    if(intervalId){
        clearInterval(intervalId);
    }
    time = Date.now();
    intervalId = setInterval(function(){updateTimer(time);}, 10); //update le timer tout les 0,01sec
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
    alert (winnerSentence);
}
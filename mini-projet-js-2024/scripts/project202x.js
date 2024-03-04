/* si vous comprenez mon code, c'est super, 
aumoin l'un d'entre nous le comprend.

Voir le readme.md pour une description complete des differentes 
fonctionnalitées et des descriptions de fonction.

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

var areWePlayin = false;
var intervalId;
// YOUR NAME HERE : Joseph Leroux

// YOUR CODE BELOW

//main
document.addEventListener("DOMContentLoaded", function() { //lance le code apres le chargement de la page, sinon rien.
    buttonOneTarget = document.getElementById("create"); //Cible le bouton crée
    buttonOneTarget.addEventListener('click', onClickButtonOneTarget); //Ajoute un EventListener au bouton crée.

    if (areWePlayin == false) {
        time = Date.now();
        buttonStart = document.getElementById("start"); //Cible le bouton démarrer
        buttonStart.addEventListener('click', function(){onClickButtonStart()}); //Ajoute un EventListener au bouton démarrer.   
    } else {
        console.log("ERROR : We playin' mate. Chill.")
    }
});


/*               *\

Gestion d'une cible 

\*               */
//Fonction gerant le bouton "Une cible" quand cliquer.
function onClickButtonOneTarget(){
    var target = document.querySelectorAll(".target") //recupere toute les cibles de la page pour verification
    console.log(target);
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

    zoneDeJeu.appendChild(target);//ajoute la cible a la page.
    target.addEventListener('click', onClickTarget); //ajoute l'eventListener au la cible crée
    target.addEventListener('mouseenter', function(event) {
        target.classList.add("on");
    });
    target.addEventListener('mouseleave', function(event) {
        target.classList.remove("on");
    });
}

//Fonction faisant disparaitre la cible une fois cliquer.
function onClickTarget(){
    var target = document.querySelectorAll(".target");
    if (target.length != 0){
        for (var i = 0; i < target.length; i++) {
            target[i].setAttribute('class', 'target.on.hit'); //target[i].style.opacity=0; si on veut garder l'effet fondu. Mettre le OnHit le fait passer offscreen direct, c'est moche.
            removeElementWithDelay(target[i], 700); 
        }
    }
}

//Fonction permettant d'attendre le $delay avant de remove l'element. (utiliser pour le onClickTarget)
function removeElementWithDelay(element, delay) {
    setTimeout(() => {
        element.remove();
    }, delay);
}


/*            *\

Gestion du temps

\*            */
//Fonction mettant a jour le timer
function updateTimer(buttontime){
    currentTime = Date.now() //recupere le temps en milisec maintenant
    chronoTimer = currentTime - buttontime;  //fait la difference entre le temps initial et le temps recup a l'instant pour avoir le temps durant lequel le chronometre a fonctionner
    //converti les valeurs en Int arrondis.
    var totalSeconds = Math.floor(chronoTimer / 1000);
    var minutes = Math.floor(totalSeconds / 60);
    var milisecond = Math.floor((chronoTimer % 1000) / 10);
    //var tenth = Math.floor(chronoTimer / 100)   =>Useless

    //Ajoute les 0 manquant : 
    totalSeconds = totalSeconds < 10 ? '0'+totalSeconds : totalSeconds;
    minutes = minutes < 10 ? '0'+minutes :  minutes;

    //rempli les span associé.
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = totalSeconds;
    document.getElementById("tenth").textContent = milisecond;
}


//arrete le jeu et le timer.
function stopTimer(){
    clearInterval(intervalId);
    var minute = document.getElementById("minutes").textContent;
    var seconds = document.getElementById("seconds").textContent;
    var tenth = document.getElementById("tenth").textContent;
    var finalTime = minute + "' " + seconds + "'' " + tenth;
    var winnerSentence = "Vous avez gagnez ! vous avez detruit toute les cibles (ouai, je peux pas vous dire combien de cible vue que ce ne sont pas des variables globales 👍) "+minute+"min "+seconds+ "sec " + tenth+"dizaine";
    alert (winnerSentence);
}

/*                                                   *\

Gestion des cibles multiples apres cliquer sur demarrer

\*                                                   */ 
function onClickButtonStart(){
    var inputvalue = document.getElementById("nbtargets");
    var nbrtarget = inputvalue.value;
    var targetRemaining  = document.getElementById("remaining");
    
    if (areWePlayin==false){
        areWePlayin = true;
        targetRemaining.innerHTML = nbrtarget;
        multipleTargetCreator(nbrtarget);
        var buttontime = Date.now();
        intervalId = setInterval(function(){updateTimer(buttontime)}, 10); //update le timer tout les 0,01sec
        areWePlayin = 0;
    }else {
        console.log("ERROR : Fok of mate, we are playin here")
    }

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
        zoneDeJeu.addEventListener('click', function(event){
            if (event.target.classList.contains("target")) {
                var cibleClique = event.target;
                cibleClique.setAttribute('class', 'target.on.hit'); //target[i].style.opacity=0; si on veut garder l'effet fondu. Mettre le OnHit le fait passer offscreen direct, c'est moche.
                targetRemaining.innerHTML = targetRemaining.innerHTML -1 ;
                removeElementWithDelay(cibleClique, 700);
                if (targetRemaining.innerHTML == 0){
                    stopTimer();
                }
            }
        }); 
        nbrtarget--;
        i++;
    }
    
}


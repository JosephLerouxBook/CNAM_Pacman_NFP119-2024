/*

Voir le readme.md pour une description complete des differentes 
fonctionnalitées et des descriptions de fonction.

*/


// global variable for the project

// default initial width and heigth for the target
var TARGET_WIDTH = 40;
var TARGET_HEIGHT = 40;

// chrono management
// value of time in tenth of seconds
var time = 0;
// timer variable 
var chronoTimer = null;


// YOUR NAME HERE : Joseph Leroux

// YOUR CODE BELOW

//main
document.addEventListener("DOMContentLoaded", function() { //lance le code apres le chargement de la page, sinon rien.
    buttonOneTarget = document.getElementById("create"); //Cible le bouton crée
    buttonOneTarget.addEventListener('click', onClickButtonOneTarget); //Ajoute un EventListener au bouton crée.
    time = Date.now();
    console.log(time);
    setInterval(updateTimer, 10);
});


/*

Gestion d'une cible 

*/
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

}

//Fonction faisant disparaitre la cible une fois cliquer.
function onClickTarget(){
    var target = document.querySelectorAll(".target");
    if (target.length != 0){
        for (var i = 0; i < target.length; i++) {
            target[i].style.opacity=0;
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


/*

Gestion du temps

*/
//Fonction mettant a jour le timer
function updateTimer(){
    currentTime = Date.now() //recupere le temps en milisec maintenant
    chronoTimer = currentTime - time;  //fait la difference entre le temps initial et le temps recup a l'instant pour avoir le temps durant lequel le chronometre a fonctionner
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
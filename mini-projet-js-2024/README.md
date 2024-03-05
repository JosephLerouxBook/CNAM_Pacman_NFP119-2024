# Partie JS
## Introduction
Afin de finaliser cette partie de mon cursus, il nous as été demander de réaliser un petit jeu type "Ball trap" ou "Aim booster". <br>Le but est simple : un terrain, des cibles qui se genere sur ce terrain, il faut cliquer sur les cibles afin de finir le jeu. <br>
Nous allons passer ici en revu les differentes fonction de façon général (le detail ligne par ligne etant directement dans le code).<br>
__A savoir__ Un compte rendu du projet est disponible dans le fichier CR.pdf.<br> C'est la bas que vous trouverez un detail des etapes du projets, des phases réaliser et des bugs rencontrer.

## Fonctions 

### Principal
<ins>"main"</ins> <br>
Partie du code se lançant apres le chargement COMPLET de l'html. Sinon les recuperation d'éléments ne fonctionnes pas correctement.

### Gestion de l'entrainement avec 1 cible
<ins>onClickButtonOneTarget();</ins><br>
Fonction de gestion du bouton "Une cible". Elle n'as pour but uniquement de verifier si il existe d'autre cible sur le terrain et evidemment, lance la fonction targetCreator();<br>

<ins>targetCreator();</ins> <br>
Crée une cible sur le terrain. Pour ce faire, elle recupere le terrain et y ajouter une div avec la classe 'target'. Cette div est modifier afin d'afficher la cible. Notamment sur la generation aléatoire de la position et l'opacité.<br>
C'est a ce moment aussi que nous ajoutons des evenements a l'element crée. Nous verifierons le clique et le passage de la souris dessus. Alors que mouseenter et mouseleave sont gerer directement dans targetCreator(); j'ai preferer gerer le clique dans une fonction onClickTarget();<br>
<br>
<ins>onClickTarget();</ins><br>
Fonction appeler par targetCreator(); lorsque la cible est cliquer. Elle n'as pour but que de nettoyer le terrain en enlevant la cible crée precedemment lorsque l'on clique dessus. Pour ce faire, appel removeElementWithDelay(); 

### Gestion du jeu avec le nombre de cible demander

<ins>onClickButtonStart();</ins><br>
Gere ce qui doit etre executer lors du clique sur le bouton "commencer". Il vas recuperer le nombre de cibles desirer par l'utilisateur rentrer precedemment dans le <input> puis vas remplir le nombre de cible restante sur le terrain.<br>
Il vide le terrain si necessaire. <br>
Il reinitialise le chronometre.<br>

<ins>multipleTargetCreator();</ins><br>
S'occupe de la création des differentes cibles. Comme pour une cible unique, juste cette fonction recuperer le nombre de cible en parametre et boucle jusqua ce qu'elles soit crée.<br>
C'est ici que les evenements lié a cibles son generer.<br>

### Gestion du temps // Chronomètre

<ins>removeElementWithDelay();</ins><br>
Fonction appliquant un delay avant l'application de la classe hit.on.target. Cette dernière modifiant directement la position et l'opacité de la cible, impossible de l'appliquer directement, un delais est necessaire. Elle attribue donc la classe puis attend le delay demander avant de remove l'element.<br>

<ins>updateTimer();</ins><br>
Generes un ensemble de variable de temporalité lié a la difference entre le lancement du timer (stocker dans la variable globale ChronoTimer) et la valeur de Date.now() au debut de la fonction. <br>
Ainsi est generer le chronomètre. <br>
Il est ensuite appliquer au id associé dans l'html. (minutes, seconds, tenth).

<ins>stopTimer();</ins><br>
Recupere l'ID de l'interval de temps crée lors de l'appuie du boutton demarrer afin d'y mettre fin. Arretant ainsi le chronomètre.<br>

### Autres fonctions

<ins>win();</ins><br>
Fonction lançant les resultat de la partie suite a la victoire.<br>
Affiche un message a l'utilisateur avec son temps.


## Bugs rencontrés
-	Les dizieme de seconde été enfait les milieme, ce qui affichais constamment 2 digit au compteur. <br>
-   Les 0 n’était pas ajouter au compteur devant les chiffre des nombres inferieur a 10.<br>
-	Target on hit ne s’applique pas correctement <br>
    -	La modification par le css est instantannée, passant le z-index en meme temps que l’opacity=0. De ce fait, la cible n’est pas degrader vers la couleur  du background color de target on hit. <br>
-	Chronometre qui deconne si on appuis sur le bouton demarrer a la suite. <br>
-	Impossible de relancer le jeu si la parti est en cours<br>
-	Multi clique sur une seul cible.<br>
-	Le css ne s’applique pas en id mais en classe. <br>

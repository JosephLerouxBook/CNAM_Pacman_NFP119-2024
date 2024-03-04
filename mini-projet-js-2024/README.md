# Partie JS
## Introduction
Afin de finaliser cette partie de mon cursus, il nous as été demander de réaliser un petit jeu type "Ball trap" ou "Aim booster". Le but est simple : un terrain, des cibles qui se genere sur ce terrain, il faut cliquer sur les cibles afin de finir le jeu.
Nous allons passer ici en revu les differentes fonction de façon général (le detail ligne par ligne etant directement dans le code).

## Fonctions 

### Principal
"main"
Partie du code se lançant apres le chargement COMPLET de l'html. Sinon les recuperation d'éléments ne fonctionnes pas correctement.

### Gestion de l'entrainement avec 1 cible
onClickButtonOneTarget();
Fonction de gestion du bouton "Une cible". Elle n'as pour but uniquement de verifier si il existe d'autre cible sur le terrain et evidemment, lance la fonction targetCreator();

targetCreator();
Crée une cible sur le terrain. Pour ce faire, elle recupere le terrain et y ajouter une div avec la classe 'target'. Cette div est modifier afin d'afficher la cible. Notamment sur la generation aléatoire de la position et l'opacité.
C'est a ce moment aussi que nous ajoutons des evenements a l'element crée. Nous verifierons le clique et le passage de la souris dessus. Alors que mouseenter et mouseleave sont gerer directement dans targetCreator(); j'ai preferer gerer le clique dans une fonction onClickTarget();

onClickTarget();
Fonction appeler par targetCreator(); lorsque la cible est cliquer. Elle n'as pour but que de nettoyer le terrain en enlevant la cible crée precedemment lorsque l'on clique dessus. Pour ce faire, appel removeElementWithDelay(); 

### Gestion du jeu avec le nombre de cible demander

onClickButtonStart();
Gere ce qui doit etre executer lors du clique sur le bouton "commencer". Il vas recuperer le nombre de cibles desirer par l'utilisateur rentrer precedemment dans le <input> puis vas remplir le nombre de cible restante sur le terrain.
Il vide le terrain si necessaire. 
Il reinitialise le chronometre.

multipleTargetCreator();

### Gestion du temps // Chronomètre

removeElementWithDelay();
Fonction appliquant un delay avant l'application de la classe hit.on.target. Cette dernière modifiant directement la position et l'opacité de la cible, impossible de l'appliquer directement, un delais est necessaire. Elle attribue donc la classe puis attend le delay demander avant de remove l'element.

updateTimer();


stopTimer();




### Fonction supplémentaire 


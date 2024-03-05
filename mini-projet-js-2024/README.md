# Partie JS
## Introduction
Afin de finaliser cette partie de mon cursus, il nous as été demander de réaliser un petit jeu type "Ball trap" ou "Aim booster". Le but est simple : un terrain, des cibles qui se genere sur ce terrain, il faut cliquer sur les cibles afin de finir le jeu. <br>
Nous allons passer ici en revu les differentes fonction de façon général (le detail ligne par ligne etant directement dans le code).<br>

## Fonctions 

### Principal
"main" <br>
Partie du code se lançant apres le chargement COMPLET de l'html. Sinon les recuperation d'éléments ne fonctionnes pas correctement.

### Gestion de l'entrainement avec 1 cible
<ins>onClickButtonOneTarget();</ins><br>
Fonction de gestion du bouton "Une cible". Elle n'as pour but uniquement de verifier si il existe d'autre cible sur le terrain et evidemment, lance la fonction targetCreator();<br>

targetCreator();
Crée une cible sur le terrain. Pour ce faire, elle recupere le terrain et y ajouter une div avec la classe 'target'. Cette div est modifier afin d'afficher la cible. Notamment sur la generation aléatoire de la position et l'opacité.<br>
C'est a ce moment aussi que nous ajoutons des evenements a l'element crée. Nous verifierons le clique et le passage de la souris dessus. Alors que mouseenter et mouseleave sont gerer directement dans targetCreator(); j'ai preferer gerer le clique dans une fonction onClickTarget();<br>
<br>
onClickTarget();<br>
Fonction appeler par targetCreator(); lorsque la cible est cliquer. Elle n'as pour but que de nettoyer le terrain en enlevant la cible crée precedemment lorsque l'on clique dessus. Pour ce faire, appel removeElementWithDelay(); 

### Gestion du jeu avec le nombre de cible demander

onClickButtonStart();<br>
Gere ce qui doit etre executer lors du clique sur le bouton "commencer". Il vas recuperer le nombre de cibles desirer par l'utilisateur rentrer precedemment dans le <input> puis vas remplir le nombre de cible restante sur le terrain.<br>
Il vide le terrain si necessaire. <br>
Il reinitialise le chronometre.<br>

multipleTargetCreator();<br>

### Gestion du temps // Chronomètre

removeElementWithDelay();<br>
Fonction appliquant un delay avant l'application de la classe hit.on.target. Cette dernière modifiant directement la position et l'opacité de la cible, impossible de l'appliquer directement, un delais est necessaire. Elle attribue donc la classe puis attend le delay demander avant de remove l'element.<br>

updateTimer();<br>


stopTimer();<br>




### Fonction supplémentaire 


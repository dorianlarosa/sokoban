// #############################################
// ##### CLASS LINK REPRESENTANT LE JOUEUR #####
// #############################################
// APPEL --> var link = new Link(map);
// GET --> var x = link.varName;
// SET --> link.varName = x;
// METHODE --> link.methode();
// ########################################

class Link {
    // ########## CONSTRUCTOR ##########
    constructor(map) {
        // VAR constructor
        this.map = map;
        // VAR link
        this.score = 0;
        this.time = 0;
        // Detection de la position de link
        for (let i=0; i<7; i++) {
            for (let j=0; j<7; j++) {
                if (this.map[i][j] === 3) {
                    // VAR position(x,y)
                    this.Y = i;
                    this.X = j;
                }
            }
        }
        // ##### Initialisation  du plateau #####
        // for(let i=0;i<7;i++){for(let j=0; j<7; j++){console.log(map[i][j]);}}
        for (let i=0; i<7; i++) {      // row
            for (let j=0; j<7; j++) {       // col
                let tile = Link.toTile(i, j);
                // document.querySelector('#r'+i+'c'+j);
                // console.log(tile);
                switch(map[i][j]){
                    case 0: // Empty
                        Link.setEmpty(tile);
                    break;
                    case 1: // Ruby
                        Link.setRuby(tile);
                    break;
                    case 2: // Hole
                        Link.setHole(tile);
                    break;
                    case 3: // Player
                        Link.setEmpty(tile);
                        Link.movePlayer(Link.toTile(this.X, this.Y));
                    break;
                    case 4: // Ruby && Hole
                        Link.setRubyHole(tile);
                    break;
                    default: console.log('initBoard/switch : Unexpected case --> '+ this.map[i][j]);
                }
            }
        }
    }
    // ########## INSTANCE METHOD ##########
    // Test d'existence du tableau
    // PARAM direction et (optionel)profondeur
    has(direction, nbr=0){
        switch(direction){
            case 'top': return (this.Y-nbr)<=0 ? false : true; break;
            case 'bottom': return (this.Y+nbr)>=6 ? false : true; break;
            case 'right': return (this.X+nbr)>=6 ? false : true; break;
            case 'left': return (this.X-nbr)<=0 ? false : true; break;
        }
    }
    // 
    can(direction) {
        // Si pas le bord de map
        if (this.has(direction)){
            let tempX = this.X;
            let tempY = this.Y;
            switch(direction){
                case 'top': tempY--; break;
                case 'bottom': tempY++; break;
                case 'right': tempX++; break;
                case 'left': tempX--; break;
            } // Test de contenu de la case n+1
            if (Link.toTile(tempX,tempY).classList.contains('ruby') ||  Link.toTile(tempX,tempY).classList.contains('ruby_hole')){
                if (!this.has(direction,1)) return false;
                else {
                    switch(direction){
                        case 'top': tempY--; break;
                        case 'bottom': tempY++; break;
                        case 'right': tempX++; break;
                        case 'left': tempX--; break;
                    } // Test de contenu de la case n+2
                    Link.toTile(tempX,tempY).classList.contains('ruby') || Link.toTile(tempX,tempY).classList.contains('ruby_hole') ? false : true;
                }
            }
            else return true;
        }
        else return false;
    }
    // 
    move(direction){
        let tempX = this.X;
        let tempY = this.Y;
        this.score++;
        document.querySelector('#score').innerHTML = this.score;
        console.log('this.can(direction)-->'+this.can(direction));
        if (this.can(direction)){
            Link.unsetPlayer(Link.toTile(tempX, tempY));
            console.log('Link.toTile(tempX, tempY)-->'+tempX+'/'+tempY);
            switch(direction){
                case 'top': tempY--; break;
                case 'bottom': tempY++; break;
                case 'right': tempX++; break;
                case 'left': tempX--; break;
            }console.log('Link.toTile(tempX, tempY)-->'+tempX+'/'+tempY);
            Link.movePlayer(Link.toTile(tempX, tempY));
            if (Link.toTile(tempX, tempY).classList.contains('ruby')) {
                Link.setEmpty(Link.toTile(tempX, tempY));
                switch(direction){
                    case 'top': tempY--; break;
                    case 'bottom': tempY++; break;
                    case 'right': tempX++; break;
                    case 'left': tempX--; break;
                }console.log('Link.toTile(tempX, tempY)-->'+tempX+'/'+tempY);
                if (Link.toTile(tempX, tempY).classList.contains('hole')) {Link.setRubyHole(Link.toTile(tempX, tempY));}
                else {Link.setRuby(Link.toTile(tempX, tempY));}
            }
            switch(direction){
                case 'top': tempY++; break;
                case 'bottom': tempY--; break;
                case 'right': tempX--; break;
                case 'left': tempX++; break;
            }console.log('Link.toTile(tempX, tempY)-->'+tempX+'/'+tempY);
            if (Link.toTile(tempX, tempY).classList.contains('ruby_hole')) {
                Link.setHole(Link.toTile(tempX, tempY));
                switch(direction){
                    case 'top': tempY--; break;
                    case 'bottom': tempY++; break;
                    case 'right': tempX++; break;
                    case 'left': tempX--; break;
                }console.log('Link.toTile(tempX, tempY)-->'+tempX+'/'+tempY);
                if (Link.toTile(tempX, tempY).classList.contains('hole')) {
                    Link.setRubyHole(Link.toTile(tempX, tempY));
                }
                else {
                    Link.setRuby(Link.toTile(tempX, tempY));
                }
            }
            switch(direction){
                case 'top': this.Y--; break;
                case 'bottom': this.Y++; break;
                case 'right': this.X++; break;
                case 'left': this.X--; break;
            }
            console.log('Link.toTile(thisX, thisY)-->'+this.X+'/'+this.Y);
        }
        else {Link.nopSound();}
    }


     // ########## STATIC METHOD ##########
    // ##### Test du style des cases du plateau #####
    static isEmpty(tile) {tile.classList.contains('empty') ? true : false;}
    static isRuby(tile) {tile.classList.contains('ruby') ? true : false;}
    static isHole(tile) {tile.classList.contains('hole') ? true : false;}
    static isRubyHole(tile) {tile.classList.contains('ruby_hole') ? true : false;}
    // ##### Modification du style des cases du plateau #####
    static setEmpty(tile) {
        if (tile.classList.contains('ruby')){tile.classList.remove('ruby');}
        if (tile.classList.contains('hole')){tile.classList.remove('hole');}
        if (tile.classList.contains('ruby_hole')){tile.classList.remove('ruby_hole');}
        if (!tile.classList.contains('empty')){tile.classList.add('empty');}
    }
    static setRuby(tile) {
        if (tile.classList.contains('empty')){tile.classList.remove('empty');}
        if (tile.classList.contains('hole')){tile.classList.remove('hole');}
        if (tile.classList.contains('ruby_hole')){tile.classList.remove('ruby_hole');}
        if (!tile.classList.contains('ruby')){tile.classList.add('ruby');}
    }
    static setHole(tile) {
        if (tile.classList.contains('empty')){tile.classList.remove('empty');}
        if (tile.classList.contains('ruby')){tile.classList.remove('ruby');}
        if (tile.classList.contains('ruby_hole')){tile.classList.remove('ruby_hole');}
        if (!tile.classList.contains('hole')){tile.classList.add('hole');}
    }
    static setRubyHole(tile) {
        if (tile.classList.contains('empty')){tile.classList.remove('empty');}
        if (tile.classList.contains('ruby')){tile.classList.remove('ruby');}
        if (tile.classList.contains('hole')){tile.classList.remove('hole');}
        if (!tile.classList.contains('ruby_hole')){tile.classList.add('ruby_hole');}
    }
    // ##### player #####
    static movePlayer(tile) {
        // Injection du node image du perso dans tile
        var imgPerso = document.createElement("img");
        imgPerso.src = "assets/img/perso_soko.png";
        imgPerso.width = "457";
        imgPerso.height = "457";
        imgPerso.id = "link";
        imgPerso.alt = "picture of Link";
        tile.appendChild(imgPerso);
    }
    static unsetPlayer(tile) {
        // Suppression de tous les noeuds enfant de tile
        if (tile.hasChildNodes()) {
        while (tile.firstChild) {tile.removeChild(tile.firstChild);}
        }
    }
    static moveRuby(tile) {
        if (!tile.classList.contains('ruby')) {tile.classList.add('ruby');}
    }
    static unsetRuby(tile) {
        if (tile.classList.contains('ruby')) {tile.classList.remove('ruby')};
    } 
    static toTile(posX, posY) {
        return document.querySelector('#r'+posY+'c'+posX);
    }
    static nopSound() {
        let mySound = new Audio("assets/audio/nope_construction.mp3");
        mySound.play();
    }
}



// #############################################
// ############### FUNCTION MAIN ###############
// #############################################
// ARRAY Données des plateaux par niveau
// lvl1
const lvl1 = [
    [0,0,0,3,0,0,0],
    [0,1,1,2,1,1,0],
    [0,2,2,1,2,2,0],
    [0,2,1,0,1,2,0],
    [0,2,2,1,2,2,0],
    [0,1,1,2,1,1,0],
    [0,0,0,0,0,0,0]
];
// lvl2
const lvl2 = [
    [0,0,0,0,0,0,0],
    [0,0,1,2,4,0,0],
    [0,4,1,2,1,1,0],
    [0,2,2,4,2,2,0],
    [0,1,1,2,1,4,0],
    [0,0,4,2,1,0,0],
    [0,0,0,0,0,0,3]
];
// lvl3
const lvl3 = [
    [0,0,0,3,0,0,0],
    [0,1,1,2,0,1,0],
    [0,0,2,1,2,0,0],
    [0,2,1,2,1,2,0],
    [0,0,2,1,2,0,0],
    [0,1,0,2,0,0,0],
    [0,0,0,0,0,0,0]
];
// VAR
var btnPlay = document.querySelector('#btnPlay');
var btnNext = document.querySelector('#btnNext');
var btnHelp = document.querySelector('#btnHelp');
var btnRestart = document.querySelector('#btnRestart');

var accueil = document.querySelector('#accueil');
var victory = document.querySelector('#victory');
var help = document.querySelector('#help');


// var currentLvl = '1';
// ########## EVENT LISTENER ##########
window.addEventListener("keydown", eventManager);
if (btnPlay) {
    btnPlay.addEventListener("click", eventManager);
}
if (btnNext) {
    btnNext.addEventListener("click", eventManager);
}
btnHelp.addEventListener("click", eventManager);
btnRestart.addEventListener("click", eventManager);
// window.addEventListener("DOMContentLoaded", initAudioPlayer);
// ########## MAIN ##########
var link = new Link(lvl1);


// ########## FUNCTION ##########
function eventManager() {

    // console.log("eventManager --> event = "+event);
    if (event.type == "keydown") {
        switch(event.key) {
            case 'ArrowUp':
                link.move('top');
            break;
            case 'ArrowRight':
                link.move('right');
            break;
            case 'ArrowLeft':
                link.move('left');
            break;
            case 'ArrowDown':
                link.move('bottom');
            break;
        }
    }
    else if (event.type == "click") {
        if (event.target.id == "btnPlay") {
            // var link = new Link(lvl1);
            console.log(accueil);
            accueil.style.display = "none";
            
            
        }
        if (event.target.id == "btnNext") {
            victory.style.display = "block";
        }
        if (event.target.id == "btnHelp") {
            help.style.display = "block";
        }
        // if (event.target.id == "btnRestart") {
        //     link.reload();
        // }
    }
    else {
        console.log('Unexpected event.type --> '+ event.type);
    }
}
// var audio 
// // var mute_btn;
// function initAudioPlayer() {
//     // console.log('var42');
//     audio = new Audio();
//     audio.src = "assets/audio/08_Knight_Academy_Theme.mp3";
//     audio.loop = true;
//     audio.play();
//     //Set object references
//     // mute_btn = document.querySelector("#mute_btn");
//     // //Add Event Handling
//     // mute_btn.addEventListener("click", mute);
//     // mute();
//     }
var epee = new Audio();
epee.src = "assets/audio/coup_depee.mp3";

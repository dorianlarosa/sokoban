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
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 7; j++) {
                if (this.map[i][j] === 3) {
                    // VAR position(x,y)
                    this.Y = i;
                    this.X = j;
                }
            }
        }
        // ##### Initialisation  du plateau #####
        for (let i = 0; i < 7; i++) { // row
            for (let j = 0; j < 7; j++) { // col
                let tile = Link.toTile(i, j);
                switch (map[i][j]) {
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
                    default:
                        console.log('initBoard/switch : Unexpected case --> ' + this.map[i][j]);
                }
            }
        }
    }
    // ########## ASSESSOR ##########
    // GETTER
    // get score(){return this.score;}
    // get time(){return this.time;}
    get posX() {
        return this.X;
    }
    get posY() {
        return this.Y;
    }
    // SETTER
    // set score(_score) {if (_score != 0){
    //     this.score++;
    //     document.querySelector('#score').innerHTML = this.score;
    // }}
    // set time(_time) {if (_time){this.time = _time;}}
    set posX(_posX) {
        if (_posX) {
            this.X = _posX;
        }
    }
    set posY(_posY) {
        if (_posY) {
            this.Y = _posY;
        }
    }
    // ########## INSTANCE METHOD ##########
    // #####  Test de bord de map #####
    // depuis position de link
    hasTop() {
        return this.Y <= 0 ? false : true;
    }
    hasBottom() {
        return this.Y >= 6 ? false : true;
    }
    hasRight() {
        return this.X >= 6 ? false : true;
    }
    hasLeft() {
        return this.X <= 0 ? false : true;
    }
    // depuis position direction n+1
    hasNextTop(posY) {
        return (posY + 1) <= 0 ? false : true;
    }
    hasNextBottom(posY) {
        return (posY - 1) >= 6 ? false : true;
    }
    hasNextRight(posX) {
        return (posX + 1) >= 6 ? false : true;
    }
    hasNextLeft(posX) {
        return (posX - 1) <= 0 ? false : true;
    }
    // ##### Test de collision #####
    canTop() {
        // Si pas le bord de map
        if (this.hasTop()) {
            // Si la case n+1 contient un rubis OR rubis&hole
            if (Link.toTile(this.X, (this.Y - 1)).classList.contains('ruby') || Link.toTile(this.X, (this.Y - 1)).classList.contains('ruby_hole')) {
                // si la case n+2 existe (bord de map)
                if (!this.hasNextTop(this.Y - 1)) {
                    return false;
                } else {
                    // Si la case n+2 contient un rubis OR rubis&hole
                    if (Link.toTile(this.X, (this.Y - 2)).classList.contains('ruby') || Link.toTile(this.X, (this.Y - 2)).classList.contains('ruby_hole')) {
                        return false;
                    } else {
                        return true;
                    }
                }
            } else {
                return true;
            }
        } else {
            return false;
        }
    }
    canBottom() {
        if (this.hasBottom()) {
            if (Link.toTile(this.X, (this.Y + 1)).classList.contains('ruby') || Link.toTile(this.X, (this.Y + 1)).classList.contains('ruby_hole')) {
                if (!this.hasNextBottom(this.Y + 1)) {
                    return false;
                } else {
                    if (Link.toTile(this.X, (this.Y + 2)).classList.contains('ruby') || Link.toTile(this.X, (this.Y + 2)).classList.contains('ruby_hole')) {
                        return false;
                    } else {
                        return true;
                    }
                }
            } else {
                return true;
            }
        } else {
            return false;
        }
    }
    canRight() {
        if (this.hasRight()) {
            if (Link.toTile((this.X + 1), this.Y).classList.contains('ruby') || Link.toTile((this.X + 1), this.Y).classList.contains('ruby_hole')) {
                if (!this.hasNextRight(this.X + 1)) {
                    return false;
                } else {
                    if (Link.toTile((this.X + 2), this.Y).classList.contains('ruby') || Link.toTile((this.X + 2), this.Y).classList.contains('ruby_hole')) {
                        return false;
                    } else {
                        return true;
                    }
                }
            } else {
                return true;
            }
        } else {
            return false;
        }
    }
    canLeft() {
        if (this.hasLeft()) {
            if (Link.toTile((this.X - 1), this.Y).classList.contains('ruby') || Link.toTile((this.X - 1), this.Y).classList.contains('ruby_hole')) {
                if (!this.hasNextLeft(this.X - 1)) {
                    return false;
                } else {
                    if (Link.toTile((this.X - 2), this.Y).classList.contains('ruby') || Link.toTile((this.X - 2), this.Y).classList.contains('ruby_hole')) {
                        return false;
                    } else {
                        return true;
                    }
                }
            } else {
                return true;
            }
        } else {
            return false;
        }
    }
    // ##### déplacement #####
    moveTop() {
        this.score++;
        document.querySelector('#score').innerHTML = this.score;
        if (this.canTop()) {
            // Disparition
            Link.unsetPlayer(Link.toTile(this.X, this.Y));
            // Réaparition 1 case plus haut
            Link.movePlayer(Link.toTile(this.X, (this.Y - 1)));
            // si n+1 contient un rubis
            if (Link.toTile(this.X, (this.Y - 1)).classList.contains('ruby')) {
                // supprime style rubis
                Link.setEmpty(Link.toTile(this.X, (this.Y - 1)));
                // si la case n+2 contient un trou
                if (Link.toTile(this.X, (this.Y - 2)).classList.contains('hole')) {
                    // Applique style rubis & trou
                    Link.setRubyHole(Link.toTile(this.X, (this.Y - 2)));
                    // play sound rubis + trou   
                } else {
                    // Applique style rubis
                    Link.setRuby(Link.toTile(this.X, (this.Y - 2)));
                }
            }
            // si n+1 contient rubis & trou
            if (Link.toTile(this.X, (this.Y - 1)).classList.contains('ruby_hole')) {
                Link.setHole(Link.toTile(this.X, (this.Y - 1)));
                // si n+2 contient trou
                if (Link.toTile(this.X, (this.Y - 2)).classList.contains('hole')) {
                    // Applique style rubis & trou
                    Link.setRubyHole(Link.toTile(this.X, (this.Y - 2)));
                } else {
                    // Applique style rubis
                    Link.setRuby(Link.toTile(this.X, (this.Y - 2)));
                }
            }
            // Sauvegarde de la nouvelle position
            this.Y--;
        } else {
            // play nop sound 
            Link.nopSound();
        }
    }
    moveBottom() {
        this.score++;
        document.querySelector('#score').innerHTML = this.score;
        if (this.canBottom()) {
            Link.unsetPlayer(Link.toTile(this.X, this.Y));
            Link.movePlayer(Link.toTile(this.X, (this.Y + 1)));
            if (Link.toTile(this.X, (this.Y + 1)).classList.contains('ruby')) {
                Link.setEmpty(Link.toTile(this.X, (this.Y + 1)));
                if (Link.toTile(this.X, (this.Y + 2)).classList.contains('hole')) {
                    Link.setRubyHole(Link.toTile(this.X, (this.Y + 2)));
                } else {
                    Link.setRuby(Link.toTile(this.X, (this.Y + 2)));
                }
            }
            if (Link.toTile(this.X, (this.Y + 1)).classList.contains('ruby_hole')) {
                Link.setHole(Link.toTile(this.X, (this.Y + 1)));
                if (Link.toTile(this.X, (this.Y + 2)).classList.contains('hole')) {
                    Link.setRubyHole(Link.toTile(this.X, (this.Y + 2)));
                } else {
                    Link.setRuby(Link.toTile(this.X, (this.Y + 2)));
                }
            }
            this.Y++;
        } else {
            Link.nopSound();
        }
    }
    moveRight() {
        this.score++;
        document.querySelector('#score').innerHTML = this.score;
        if (this.canRight()) {
            Link.unsetPlayer(Link.toTile(this.X, this.Y));
            Link.movePlayer(Link.toTile((this.X + 1), this.Y));
            if (Link.toTile((this.X + 1), this.Y).classList.contains('ruby')) {
                Link.setEmpty(Link.toTile((this.X + 1), this.Y));
                if (Link.toTile((this.X + 2), this.Y).classList.contains('hole')) {
                    Link.setRubyHole(Link.toTile((this.X + 2), this.Y));
                } else {
                    Link.setRuby(Link.toTile((this.X + 2), this.Y));
                }
            }
            if (Link.toTile((this.X + 1), this.Y).classList.contains('ruby_hole')) {
                Link.setHole(Link.toTile((this.X + 1), this.Y));
                if (Link.toTile((this.X + 2), this.Y).classList.contains('hole')) {
                    Link.setRubyHole(Link.toTile((this.X + 2), this.Y));
                } else {
                    Link.setRuby(Link.toTile((this.X + 2), this.Y));
                }
            }
            this.X++;
        } else {
            Link.nopSound();
        }
    }
    moveLeft() {
        this.score++;
        document.querySelector('#score').innerHTML = this.score;
        if (this.canLeft()) {
            Link.unsetPlayer(Link.toTile(this.X, this.Y));
            Link.movePlayer(Link.toTile((this.X - 1), this.Y));
            if (Link.toTile((this.X - 1), this.Y).classList.contains('ruby')) {
                Link.setEmpty(Link.toTile((this.X - 1), this.Y));
                if (Link.toTile((this.X - 2), this.Y).classList.contains('hole')) {
                    Link.setRubyHole(Link.toTile((this.X - 2), this.Y));
                } else {
                    Link.setRuby(Link.toTile((this.X - 2), this.Y));
                }
            }
            if (Link.toTile((this.X - 1), this.Y).classList.contains('ruby_hole')) {
                Link.setHole(Link.toTile((this.X - 1), this.Y));
                if (Link.toTile((this.X - 2), this.Y).classList.contains('hole')) {
                    Link.setRubyHole(Link.toTile((this.X - 2), this.Y));
                } else {
                    Link.setRuby(Link.toTile((this.X - 2), this.Y));
                }
            }
            this.X--;
        } else {
            Link.nopSound();
        }
    }
    // ########## STATIC METHOD ##########
    // ##### Test du style des cases du plateau #####
    static isEmpty(tile) {
        tile.classList.contains('empty') ? true : false;
    }
    static isRuby(tile) {
        tile.classList.contains('ruby') ? true : false;
    }
    static isHole(tile) {
        tile.classList.contains('hole') ? true : false;
    }
    static isRubyHole(tile) {
        tile.classList.contains('ruby_hole') ? true : false;
    }
    // ##### Modification du style des cases du plateau #####
    static setEmpty(tile) {
        if (tile.classList.contains('ruby')) {
            tile.classList.remove('ruby');
        }
        if (tile.classList.contains('hole')) {
            tile.classList.remove('hole');
        }
        if (tile.classList.contains('ruby_hole')) {
            tile.classList.remove('ruby_hole');
        }
        if (!tile.classList.contains('empty')) {
            tile.classList.add('empty');
        }
    }
    static setRuby(tile) {
        if (tile.classList.contains('empty')) {
            tile.classList.remove('empty');
        }
        if (tile.classList.contains('hole')) {
            tile.classList.remove('hole');
        }
        if (tile.classList.contains('ruby_hole')) {
            tile.classList.remove('ruby_hole');
        }
        if (!tile.classList.contains('ruby')) {
            tile.classList.add('ruby');
        }
    }
    static setHole(tile) {
        if (tile.classList.contains('empty')) {
            tile.classList.remove('empty');
        }
        if (tile.classList.contains('ruby')) {
            tile.classList.remove('ruby');
        }
        if (tile.classList.contains('ruby_hole')) {
            tile.classList.remove('ruby_hole');
        }
        if (!tile.classList.contains('hole')) {
            tile.classList.add('hole');
        }
    }
    static setRubyHole(tile) {
        if (tile.classList.contains('empty')) {
            tile.classList.remove('empty');
        }
        if (tile.classList.contains('ruby')) {
            tile.classList.remove('ruby');
        }
        if (tile.classList.contains('hole')) {
            tile.classList.remove('hole');
        }
        if (!tile.classList.contains('ruby_hole')) {
            tile.classList.add('ruby_hole');
        }
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
            while (tile.firstChild) {
                tile.removeChild(tile.firstChild);
            }
        }
    }
    static moveRuby(tile) {
        if (!tile.classList.contains('ruby')) {
            tile.classList.add('ruby');
        }
    }
    static unsetRuby(tile) {
        if (tile.classList.contains('ruby')) {
            tile.classList.remove('ruby')
        };
    }
    static toTile(posX, posY) {
        return document.querySelector('#r' + posY + 'c' + posX);
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
    [0, 0, 0, 3, 0, 0, 0],
    [0, 1, 1, 2, 1, 1, 0],
    [0, 2, 2, 1, 2, 2, 0],
    [0, 2, 1, 0, 1, 2, 0],
    [0, 2, 2, 1, 2, 2, 0],
    [0, 1, 1, 2, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0]
];
// lvl3
const lvl3 = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 2, 1, 0, 0],
    [0, 4, 1, 2, 1, 1, 0],
    [2, 2, 2, 4, 2, 2, 2],
    [0, 1, 1, 2, 1, 4, 0],
    [0, 0, 1, 2, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 3]
];
// lvl2
const lvl2 = [
    [0, 0, 0, 3, 0, 0, 0],
    [0, 1, 1, 2, 0, 1, 0],
    [0, 0, 2, 1, 2, 0, 0],
    [0, 2, 1, 2, 1, 2, 0],
    [0, 0, 2, 1, 2, 0, 0],
    [0, 1, 0, 2, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0]
];
// VAR
var btnPlay = document.querySelector('#btnPlay');
var btnNext = document.querySelector('#btnNext');
var btnHelp = document.querySelector('#btnHelp');
var btnRestart = document.querySelector('#btnRestart');
var accueil = document.querySelector('#accueil');
var victory = document.querySelector('#victory');

var btnArrowTop = document.querySelector('#arrow-top');
var btnArrowBottom = document.querySelector('#arrow-bottom');
var btnArrowLeft = document.querySelector('#arrow-left');
var btnArrowRight = document.querySelector('#arrow-right');

var help = document.querySelector('#help');
var close = document.querySelector('#close');
var blueLuciols = document.querySelectorAll(".blue-luciol");
var yellowLuciols = document.querySelectorAll(".yellow-luciol");
var choixLvl = document.querySelector('#choixLvl');
// ########## EVENT LISTENER ##########
window.addEventListener("DOMContentLoaded", initAudioPlayer);
window.addEventListener("keydown", eventManager);
window.addEventListener("keyup", eventManager);
if (btnPlay) {
    btnPlay.addEventListener("click", eventManager);
}
if (btnNext) {
    btnNext.addEventListener("click", eventManager);
}
if (close) {
    close.addEventListener("click", eventManager);
}
btnHelp.addEventListener("click", eventManager);
btnRestart.addEventListener("click", eventManager);
if (btnArrowTop) btnArrowTop.addEventListener("click", eventManager);
if (btnArrowBottom) btnArrowBottom.addEventListener("click", eventManager);
if (btnArrowLeft) btnArrowLeft.addEventListener("click", eventManager);
if (btnArrowRight) btnArrowRight.addEventListener("click", eventManager);
if (choixLvl) {
    choixLvl.addEventListener("change", eventManager);
}
// ########## MAIN ##########
var link;
if (!link) {
    link = new Link(lvl1);
}
// ########## EVENT MANAGER ##########


function eventManager() {

    if (event.type == "keyup") {
        switch (event.key) {
            case 'ArrowUp':
                verif();
                break;
            case 'ArrowRight':
                verif();
                break;
            case 'ArrowLeft':
                verif();
                break;
            case 'ArrowDown':
                verif();
                break;
        }
    } else if (event.type == "keydown") {
        switch (event.key) {
            case 'ArrowUp':
                link.moveTop();
                break;
            case 'ArrowRight':
                link.moveRight();
                break;
            case 'ArrowLeft':
                link.moveLeft();
                break;
            case 'ArrowDown':
                link.moveBottom();
                break;
        }
    } 
    
    
    else if (event.type == "click") {
        switch (event.target.id) {
            case 'arrow-top':
                link.moveTop();
                verif();
                break;
            case 'arrow-right':
                link.moveRight();
                verif();
                break;
            case 'arrow-left':
                link.moveLeft();
                verif();
                break;
            case 'arrow-bottom':
                link.moveBottom();
                verif();
                break;
            case 'btnPlay':
                accueil.style.display = "none";
                break;
            case 'close':
                help.style.display = "none";
                break;
            case 'btnNext':
                // if(typeof document.sessionStorage!='undefined'){
                //     let pastLvl = document.sessionStorage.getItem('lvl');
                //     pastLvl++;
                //     document.sessionStorage.setItem('lvl',pastLvl);
                // }
                // else {
                //     document.sessionStorage.setItem('lvl','2');
                // }
                // document.location.reload(true);
                for (let i = 0; i < 7; i++) {
                    for (let j = 0; j < 7; j++) {
                        Link.setEmpty(Link.toTile(i, j));
                    }
                }
                Link.unsetPlayer(Link.toTile(link.X, link.Y));
                for (prop in link) {
                    prop = null
                }
                if (choixLvl.selectedIndex == 0) {
                    link = new Link(lvl2);
                    document.querySelector('.level').innerHTML = "LEVEL 2";
                    choixLvl.selectedIndex++;
                } else if (choixLvl.selectedIndex == 1) {
                    link = new Link(lvl3);
                    document.querySelector('.level').innerHTML = "LEVEL 3";
                    choixLvl.selectedIndex++;
                } else if (choixLvl.selectedIndex == 2) {
                    document.location.reload(true);
                }
                victory.style.display = "none";
                break;
            case 'btnHelp':
                help.style.display = "block";
                break;
            case 'btnRestart':
                document.location.reload(true);
                accueil.style.display = "none";
                break;
            case 'btnValid':
                let rubyOnGround = 0;
                for (let i = 0; i < 7; i++) {
                    for (let j = 0; j < 7; j++) {
                        if (Link.toTile(i, j).classList.contains('ruby')) {
                            rubyOnGround++;
                        }
                    }
                }
                if (rubyOnGround == 0) {
                    victory.style.display = "flex";
                }
                break;
            case 'close':
                help.style.display = none;
                break;
        }
    } else if (event.type == "change") {
        if (event.target.id == choixLvl) {
            for (let i = 0; i < 7; i++) {
                for (let j = 0; j < 7; j++) {
                    Link.setEmpty(Link.toTile(i, j));
                }
            }
            Link.unsetPlayer(Link.toTile(link.X, link.Y));
            for (prop in link) {
                prop = null
            }
            switch (choixLvl.selectedIndex) {
                case 0:
                    link = new Link(lvl1);
                    break;
                case 1:
                    link = new Link(lvl2);
                    break;
                case 2:
                    link = new Link(lvl3);
                    break;
            }
        }
    }
}


function verif() {
    let rubyOnGround = 0;
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
            if (Link.toTile(i, j).classList.contains('ruby')) {
                rubyOnGround++;
            }
        }
    }
    if (rubyOnGround == 0) {
        victory.style.display = "flex";
    }

}

// ########## AUDIO ##########
var audio;
// var mute_btn;
function initAudioPlayer() {
    audio = new Audio();
    audio.src = "assets/audio/08_Knight_Academy_Theme.mp3";
    audio.loop = true;
    audio.play();
    //Set object references
    // mute_btn = document.querySelector("#mute_btn");
    // //Add Event Handling
    // mute_btn.addEventListener("click", mute);
    // audio.mute();
}

function enableMute() {
    audio.muted = true;
}

var epee = new Audio();
epee.src = "assets/audio/coup_depee.mp3";

$(document).ready(function () {
    animateDiv(".a");
    animateDiv(".b");
    animateDiv(".c");
    animateDiv(".d");
    animateDiv(".e");
    animateDiv(".f");
    animateDiv(".g");
    animateDiv(".h");
    animateDiv(".i");
    animateDiv(".j");
    animateDiv(".k");
    animateDiv(".l");
    animateDiv(".m");
    animateDiv(".n");
    animateDiv(".o");
});

function makeInitPosition() {

    var h = 460;
    var w = 1366;

    var posY = Math.floor(Math.random() * h);
    var posX = Math.floor(Math.random() * w);

    return [posY, posX];
}

function makeNewPosition() {

    // Get viewport dimensions (remove the dimension of the div)
    var h = $(window).height() - 50;
    var w = $(window).width() - 50;

    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);

    return [nh, nw];
}

for (i = 0; i < 7; i++) {
    placeLuciol(yellowLuciols[i]);
    placeLuciol(blueLuciols[i]);
}


function animateDiv(myclass) {
    var moveDelay = Math.floor(Math.random() * 8000 + 11000);
    var newq = makeNewPosition();
    $(myclass).animate({
        top: newq[0],
        left: newq[1]
    }, moveDelay, function () {
        animateDiv(myclass);
    });

};

function placeLuciol(myclass) {

    var initp = makeInitPosition();
    myclass.style.left = initp[0] + "px";
    myclass.style.top = initp[1] + "px";

    console.log("Faire un pas vers l'est");
}
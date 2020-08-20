timerID = xtal = ytal = ztal = auto = 0;
wie = 'Player 1';

function initieer(){
    clearTimeout(timerID);
    cel = new Array(0,0,0,0,0,0,0,0,0,0);
    aanv = new Array(); strat = verd = leeg = aanv;
    beurt = wissel = 1; wint = keren = 0;
    document.forms[0].speler1.value = xtal;
    document.forms[0].speler2.value = ytal;
    document.forms[0].remise.value = ztal;
    if (wie != 'Start') {
        for (i in cel) {
            cel[i] = 0; if (i > 0) {document.forms[0].elements[i].value = ''};
        }
    }
    document.forms[0].beurten.value = wie;
}

function zetten() {
    clearTimeout(timerID);
    if (aanv[0] > 0) {
        slag = aanv[Math.floor(Math.random() * 10) % aanv.length]
    } else if (verd[0] > 0) {
        slag = verd[Math.floor(Math.random() * 10) % verd.length];
    } else if (strat[0] > 0) {
        slag = strat[Math.floor(Math.random() * 10) % strat.length];
    } else {
        slag = leeg[Math.floor(Math.random() * 10) % leeg.length];
    }

    if (beurt == 0 && slag > 0) {document.forms[0].elements[slag].click()};
}


function win() {
    if (	cel[1] + cel[2] + cel[3] == 3 ||
        cel[4] + cel[5] + cel[6] == 3 ||
        cel[7] + cel[8] + cel[9] == 3 ||
        cel[1] + cel[4] + cel[7] == 3 ||
        cel[2] + cel[5] + cel[8] == 3 ||
        cel[3] + cel[6] + cel[9] == 3 ||
        cel[1] + cel[5] + cel[9] == 3 ||
        cel[3] + cel[5] + cel[7] == 3
    ) {

        if (confirm("Player 1: You win !!!\nDo you want to play again?"))
        {
            wint = 1;
            xtal++; wie = 'Player 1'; timerID = setTimeout('initieer()',800)
        } else {
            xtal++; wie = 'Start'; timerID = setTimeout('initieer()',800)
        };
    }
    if (	cel[1] + cel[2] + cel[3] == 30 ||
        cel[4] + cel[5] + cel[6] == 30 ||
        cel[7] + cel[8] + cel[9] == 30 ||
        cel[1] + cel[4] + cel[7] == 30 ||
        cel[2] + cel[5] + cel[8] == 30 ||
        cel[3] + cel[6] + cel[9] == 30 ||
        cel[1] + cel[5] + cel[9] == 30 ||
        cel[3] + cel[5] + cel[7] == 30
    ) {
        if (confirm(((auto == 1) ? ('Computer wins, sorry') : ('Player 2: You win !!')) + "!\nDo you want to play again?")) {
            ytal++; wie = 'Player 1'; timerID = setTimeout('initieer()',800)
        } else {
            ytal++; wie = 'Start'; timerID = setTimeout('initieer()',800)
        };
    }
}

function wisselen(beurt){
    if (wissel == 1)  {
        if (beurt == 0) {
            beurt = 1;
            wie = "Player " + 1
        }
        else {
            if (auto == 0) {beurt = 0;
                wie = "Player " + 2} else {beurt = 0; wie = "Computer";}
        }
        if (keren == 9
        ) {
            if (confirm("Remise!!!\n\nDo you want to play again?")) {
                ztal++; wie = 'Player 1'; timerID = setTimeout('initieer()',800)} else
            {ztal++; wie = 'Start'; timerID = setTimeout('initieer()',800)};
        }

    }
    else {
        beurt = beurt;
    }
    wissel = 1;
    return(beurt);
}

function wijziging(klik) {

    plek = cel[klik]; geklikt = klik;

    if (plek == 0){
        if (beurt == 0){
            xo = "O";
            plek = 10;
        } else {
            xo = "X";
            plek = 1;
        }
        cel[klik] = plek; keren++;
    }
    else {
        if (plek == 10){
            xo = "O";}
        if (plek == 1){
            xo = "X";}
        wissel = 0
    }
    return(xo);
}

function verdedig() {leeg = new Array(); verd = new Array();
    for (i = 1; i < 10; i++) { oud = cel[i]; cel[i] = 1;
        if ( (cel[1] + cel[2] + cel[3] == 3 ||
            cel[4] + cel[5] + cel[6] == 3 ||
            cel[7] + cel[8] + cel[9] == 3 ||
            cel[1] + cel[4] + cel[7] == 3 ||
            cel[2] + cel[5] + cel[8] == 3 ||
            cel[3] + cel[6] + cel[9] == 3 ||
            cel[1] + cel[5] + cel[9] == 3 ||
            cel[3] + cel[5] + cel[7] == 3) && oud == 0
        ) { verd[verd.length] = i}
        cel[i] = oud;
        if (cel[i] == 0) {
            if (keren != 1) {leeg[leeg.length] = i} else
            if (cel[5] == 0) {leeg[0] = 5; leeg[1] = 10 - geklikt} else
            if (i % 2 != 0) {leeg[leeg.length] = i}
        };
    }
}

function aanval() {aanv = new Array();
    for (i = 1; i < 10; i++) { oud = cel[i]; cel[i] = 10;
        if ( (cel[1] + cel[2] + cel[3] == 30 ||
            cel[4] + cel[5] + cel[6] == 30 ||
            cel[7] + cel[8] + cel[9] == 30 ||
            cel[1] + cel[4] + cel[7] == 30 ||
            cel[2] + cel[5] + cel[8] == 30 ||
            cel[3] + cel[6] + cel[9] == 30 ||
            cel[1] + cel[5] + cel[9] == 30 ||
            cel[3] + cel[5] + cel[7] == 30) && oud == 0
        ) { aanv[aanv.length] = i}
        cel[i] = oud;
    }
}

function strategie() {strat = new Array();
    for (i = 1; i < 10; i++) { oud = cel[i]; cel[i] = 10;
        if ( (cel[1] + cel[2] + cel[3] == 20 ||
            cel[4] + cel[5] + cel[6] == 20 ||
            cel[7] + cel[8] + cel[9] == 20 ||
            cel[1] + cel[4] + cel[7] == 20 ||
            cel[2] + cel[5] + cel[8] == 20 ||
            cel[3] + cel[6] + cel[9] == 20 ||
            cel[1] + cel[5] + cel[9] == 20 ||
            cel[3] + cel[5] + cel[7] == 20) && oud == 0
        ) {
            if (keren != 3) {strat[strat.length] = i} else if (i % 2 != 0) {strat[strat.length] = i}
        }
        cel[i] = oud;
    }
}

function wijzig(form,element){
    wijziging(element.name);
    element.value = xo;
    beurt = wisselen(beurt);
    form.beurten.value = wie;
    verdedig(); aanval(); strategie(); win();
    if (auto == 0 || wint == 1) {return} else {
        timerID = setTimeout('zetten()',600)
    }
}

initieer();

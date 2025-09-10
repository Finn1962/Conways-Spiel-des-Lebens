///////////////////////////////////////////////////////////////////////////Variablen
const aktionsFlaeche = document.getElementById("aktionsFlaeche");
const startButton = document.getElementById("startButton");
const übernehmenButton = document.getElementById("übernehmenButton");
let arrayFürNeueAktionsFlaeche = [];
const aktionsFlaecheBreite_X = 10;


///////////////////////////////////////////////////////////////////////////Funktion um das Raster zu generrieren
document.addEventListener("DOMContentLoaded", ()=> {   
    const aktionsFlaecheBreiteInPixel = aktionsFlaeche.offsetWidth;

    for (let y = 0; y < aktionsFlaecheBreite_X; y++){

        const spaltenContainer = document.createElement("div");
        aktionsFlaeche.appendChild(spaltenContainer);

        for (let x = 0; x < aktionsFlaecheBreite_X; x++){
            const zelle = document.createElement("div");
            zelle.classList.add("zelleTod");
            zelle.id = (`(${y}/${x})`);
            const zellGroesse = (aktionsFlaecheBreiteInPixel / aktionsFlaecheBreite_X);
            zelle.style.width = zellGroesse + "px";
            zelle.style.height = zellGroesse + "px";
            spaltenContainer.appendChild(zelle);
        };
    };
});


///////////////////////////////////////////////////////////////////////////Funktion um Pixel manuell zu markieren
document.addEventListener("click", function(event){

    const mausX = event.clientX;
    const mausY = event.clientY;
    const angewaehlteZelle = document.elementFromPoint(mausX, mausY);
    
    if (angewaehlteZelle.classList.contains("zelleTod")){
        angewaehlteZelle.style.backgroundColor = "yellow"; 
        angewaehlteZelle.classList.remove("zelleTod");
        angewaehlteZelle.classList.add("zelleLebendig");
    } else if (angewaehlteZelle.classList.contains("zelleLebendig")){
        angewaehlteZelle.style.backgroundColor = "grey"; 
        angewaehlteZelle.classList.remove("zelleLebendig");
        angewaehlteZelle.classList.add("zelleTod");
    }
});


///////////////////////////////////////////////////////////////////////////Funktion um Aktionsfläche zu Prüfen
startButton.addEventListener("click", ()=> {
    arrayFürNeueAktionsFlaeche = [];

    for (let x = 0; x != aktionsFlaecheBreite_X; x++){
       
        for (let y = 0; y != aktionsFlaecheBreite_X; y++){
            let lebendigeZellenAngrenzend = 0;
            angrenzendeZellenPruefen(x-1, y-1);
            angrenzendeZellenPruefen(x, y-1);
            angrenzendeZellenPruefen(x+1, y-1);
            angrenzendeZellenPruefen(x+1, y);
            angrenzendeZellenPruefen(x+1, y+1);
            angrenzendeZellenPruefen(x, y+1);
            angrenzendeZellenPruefen(x-1, y+1);
            angrenzendeZellenPruefen(x-1, y);

            function angrenzendeZellenPruefen(x, y){
                const anvisierteZelle = document.getElementById(`(${x}/${y})`);
                if (anvisierteZelle && anvisierteZelle.classList.contains("zelleLebendig")) {
                    lebendigeZellenAngrenzend++
                }
            };

            let zuPruefendeZelleLebendig = false;
            const zuPruefendeZelle = document.getElementById(`(${x}/${y})`);
            if (zuPruefendeZelle && zuPruefendeZelle.classList.contains("zelleLebendig")){
                zuPruefendeZelleLebendig = true;
            };

            if ((zuPruefendeZelleLebendig && (lebendigeZellenAngrenzend === 2 || lebendigeZellenAngrenzend === 3)) || (!zuPruefendeZelleLebendig && lebendigeZellenAngrenzend === 3)){
                arrayFürNeueAktionsFlaeche.push(1);
            } else {
                arrayFürNeueAktionsFlaeche.push(0);
            }; 
        }; 
    };
    arrayFürNeueAktionsFlaeche.push(2); //Ende Marker
});


///////////////////////////////////////////////////////////////////////////Funktion um neues Array zu übernehmen
übernehmenButton.addEventListener("click", ()=> {
    let x_Kordinate = 0;
    let y_Kordinate = 0;

    for (let positionInArray = 0; arrayFürNeueAktionsFlaeche[positionInArray] != 2 ; positionInArray++){
        
        const zuAktualisierendeZelle = document.getElementById(`(${x_Kordinate}/${y_Kordinate})`);
        
        if (arrayFürNeueAktionsFlaeche[positionInArray] == 1){
            zuAktualisierendeZelle.style.backgroundColor = "yellow"; 
            zuAktualisierendeZelle.classList.remove("zelleTod");
            zuAktualisierendeZelle.classList.add("zelleLebendig");
        } else if (arrayFürNeueAktionsFlaeche[positionInArray] == 0){
            zuAktualisierendeZelle.style.backgroundColor = "grey"; 
            zuAktualisierendeZelle.classList.remove("zelleLebendig");
            zuAktualisierendeZelle.classList.add("zelleTod");
        }

        if (y_Kordinate != aktionsFlaecheBreite_X -1){
            y_Kordinate++;
        } else {
            y_Kordinate = 0;
            x_Kordinate++;
        };
    };
});








































/*
///////////////////////////////////////////////////////////////////////////Funktion um Läuferformation zu erstellen
function pixelVorMarkieren(zelle){
    zelle.style.backgroundColor = "yellow"; 
    zelle.classList.remove("zelleTod");
    zelle.classList.add("zelleLebendig");
}
function laeuferFormation(){
    let mitte = aktionsFlaecheBreite_X / 2 -1;
    mitte = Math.ceil(mitte);
    
    const eins = document.getElementById(`(${mitte}/${mitte-1})`);
    pixelVorMarkieren(eins);
    const zwei = document.getElementById(`(${mitte+1}/${mitte})`);
    pixelVorMarkieren(zwei);
    const drei = document.getElementById(`(${mitte+1}/${mitte+1})`);
    pixelVorMarkieren(drei);
    const fier = document.getElementById(`(${mitte}/${mitte+1})`);
    pixelVorMarkieren(fier);
    const fünf = document.getElementById(`(${mitte-1}/${mitte+1})`);
    pixelVorMarkieren(fünf);
}
*/
///////////////////////////////////////////////////////////////////////////Variablen
const aktionsFlaeche = document.getElementById("aktionsFlaeche");
const startButton = document.getElementById("startButton");
let arrayFürNeueAktionsFlaeche = [];
const aktionsFlaecheBreite_X = 10;


///////////////////////////////////////////////////////////////////////////Funktion um das Raster zu generrieren
document.addEventListener("DOMContentLoaded", function() {   
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


///////////////////////////////////////////////////////////////////////////Funktion um Aktionsfläche zu Prüfen und Aktualisieren
startButton.addEventListener("click", async function aktionsFlaechePruefen() {
    
    function sleep(ms) {
       return new Promise(resolve => setTimeout(resolve, ms));
    }

    arrayFürNeueAktionsFlaeche = [];

    for (let x = 0; x != aktionsFlaecheBreite_X; x++){
       
        for (let y = 0; y != aktionsFlaecheBreite_X; y++){
            const aktuelleZelle = document.getElementById(`(${x}/${y})`);
            if (aktuelleZelle) {
                aktuelleZelle.style.backgroundColor = "green";
                await new Promise(r => setTimeout(r, 30));
                aktuelleZelle.style.backgroundColor = "grey";
            }
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
                zuPruefendeZelle.style.backgroundColor = "yellow";
                arrayFürNeueAktionsFlaeche.push(1);
            } else {
                zuPruefendeZelle.style.backgroundColor = "grey"; 
                arrayFürNeueAktionsFlaeche.push(0);
            }; 
        }; 
    };
    arrayFürNeueAktionsFlaeche.push(2); //Ende Marker


    let x_Kordinate = 0;
    let y_Kordinate = 0;
    
    for (let positionInArray = 0; arrayFürNeueAktionsFlaeche[positionInArray] != 2 ; positionInArray++){
        const zuAktualisierendeZelle = document.getElementById(`(${x_Kordinate}/${y_Kordinate})`);
        

 
        if (arrayFürNeueAktionsFlaeche[positionInArray] == 1){

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
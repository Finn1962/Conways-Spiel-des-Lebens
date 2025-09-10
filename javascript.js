const aktionsFlaecheBreite_X = 5;
const aktionsFlaeche = document.getElementById("aktionsFlaeche");

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
    laeuferFormation();
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
const startButton = document.getElementById("startButton");
let lebendigeZellenAngrenzend = 0;
let arrayFürNeueAktionsFlaeche = [];


startButton.addEventListener("click", ()=> {
    
    let X_KoordinateZuPruefendeZelle = 0;
    while (X_KoordinateZuPruefendeZelle != aktionsFlaecheBreite_X){
        let Y_KoordinateZuPruefendeZelle = 0;
        while (Y_KoordinateZuPruefendeZelle != aktionsFlaecheBreite_X){
            prüfenVonZelen(X_KoordinateZuPruefendeZelle, Y_KoordinateZuPruefendeZelle);
                if (lebendigeZellenAngrenzend == 2 || lebendigeZellenAngrenzend == 3){
                    arrayFürNeueAktionsFlaeche.push(1);
                } else {
                    arrayFürNeueAktionsFlaeche.push(0);
                };
            Y_KoordinateZuPruefendeZelle++
        };
        X_KoordinateZuPruefendeZelle++        
        arrayFürNeueAktionsFlaeche.push("x");
    };
    console.log(arrayFürNeueAktionsFlaeche);
});





function prüfenVonZelen(x, y){
    
    lebendigeZellenAngrenzend = 0;
    angrenzendeZellenPrüfen(x-1, y-1);
    angrenzendeZellenPrüfen(x, y-1);
    angrenzendeZellenPrüfen(x+1, y-1);
    angrenzendeZellenPrüfen(x+1, y);
    angrenzendeZellenPrüfen(x+1, y+1);
    angrenzendeZellenPrüfen(x, y+1);
    angrenzendeZellenPrüfen(x-1, y+1);
    angrenzendeZellenPrüfen(x-1, y);

    function angrenzendeZellenPrüfen(x, y){
        const anvisierteZelle = document.getElementById(`(${x}/${y})`);

        if (anvisierteZelle && anvisierteZelle.classList.contains("zelleLebendig")) {
		    lebendigeZellenAngrenzend++
	    }
    };
}












































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
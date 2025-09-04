const aktionsFlaecheBreite_X = 3;

document.addEventListener("DOMContentLoaded", function(){
    
    const aktionsFlaecheSpalten_y = [];

    for (let y = 0; y < aktionsFlaecheBreite_X; y++){
        
        const aktionsFlaecheZeilen_x = [];
        aktionsFlaecheSpalten_y.push(aktionsFlaecheZeilen_x);
        
        for (let x = 0; x < aktionsFlaecheBreite_X; x++){
            const zelle = document.createElement("div");
            zelle.classList.add("toteZele");
            zelle.id = ("("+x+"/"+y+")");
            aktionsFlaecheZeilen_x.push(zelle);
        };
    }
    console.log(aktionsFlaecheSpalten_y);
});





















/*
function erstellungZeichenflaeche(){
    let zeichenflaecheBreite_X = parseInt(reglerGröße.value,10);
   
    zeichenflaeche.innerHTML = ""; // Setzt das Zeichenfeld zurück


    const zeichenflaecheSpaltenLaenge_Y = [];
 
    for (let y = 0; y < zeichenflaecheBreite_X; y++) {

        const zeichenflaecheZeilenBreite_X = [];
        zeichenflaecheSpaltenLaenge_Y.push(zeichenflaecheZeilenBreite_X);

        const neueZeile = document.createElement("div");
        zeichenflaeche.appendChild(neueZeile);

        for (let x = 0; x < zeichenflaecheBreite_X; x++) {

            const pixel = document.createElement("div");
            pixel.classList.add("pixel");
            const pixelGroesse = (zeichenfleacheBreiteInPixel / zeichenflaecheBreite_X);
            pixel.style.width = pixelGroesse + "px";
            pixel.style.height = pixelGroesse + "px";
            neueZeile.appendChild(pixel);  
        }        
    }  
}
*/

document.addEventListener("DOMContentLoaded", function(){

    const aktionsFlaecheBreite_X = 3;
    const aktionsFlaeche = document.getElementById("aktionsFlaeche");
    const aktionsFlaecheBreiteInPixel = aktionsFlaeche.offsetWidth;
    

    for (let y = 0; y < aktionsFlaecheBreite_X; y++){
        const aktionsFlaecheSpalten_y = [];
        const aktionsFlaecheZeilen_x = [];
        aktionsFlaecheSpalten_y.push(aktionsFlaecheZeilen_x);
        const neueZeile = document.createElement("div");
        aktionsFlaeche.appendChild(neueZeile);
        
        for (let x = 0; x < aktionsFlaecheBreite_X; x++){
            const zelle = document.createElement("div");
            zelle.classList.add("toteZelle");
            zelle.id = ("("+y+"/"+x+")");
            zellGroesse = (aktionsFlaecheBreiteInPixel / aktionsFlaecheBreite_X);
            zelle.style.width = zellGroesse + "px";
            zelle.style.height = zellGroesse + "px";
            neueZeile.appendChild(zelle);
        };
    }
});
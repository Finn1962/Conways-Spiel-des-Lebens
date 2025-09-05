document.addEventListener("DOMContentLoaded", function(){

    const aktionsFlaecheBreite_X = 3;
    const aktionsFlaeche = document.getElementById("aktionsFlaeche");
    const aktionsFlaecheBreiteInPixel = aktionsFlaeche.offsetWidth;
    

    for (let y = 0; y < aktionsFlaecheBreite_X; y++){

  
        const spaltenContainer = document.createElement("div"); //Container für das Y-Array, damit es an die Aktionsfläche im Dom angehängt werden kann
        aktionsFlaeche.appendChild(spaltenContainer); //Der Spaltencontainer für die Y-Arrays wird an die Aktionsfläche im Dom angehängt

        for (let x = 0; x < aktionsFlaecheBreite_X; x++){
            const zelle = document.createElement("div");
            zelle.classList.add("toteZelle");
            zelle.id = ("("+y+"/"+x+")");
            zellGroesse = (aktionsFlaecheBreiteInPixel / aktionsFlaecheBreite_X);
            zelle.style.width = zellGroesse + "px";
            zelle.style.height = zellGroesse + "px";
            spaltenContainer.appendChild(zelle);
        };
    }
});
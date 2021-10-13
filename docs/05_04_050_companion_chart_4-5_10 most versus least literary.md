---
title: "Grafiek 4.5"
level: 2
---

*Het raadsel literatuur* p. 73.
De 10 romans met de hoogste (H) en laagste (L) scores voor literaire kwaliteit, clusteranalyse (**100** meest frequente woorden).
Maat: Classic Delta (de Deltascore staat aangegeven onder de horizontale as)
![Grafiek 4.5](public/4_5_0_CA_100_MFWs_Culled_0__Classic Delta.png)


### **Extra grafieken**
Net als Grafiek 4.5 in het boek zijn de extra grafieken gemaakt met het Stylo Package for R, ontwikkeld door Maciej Eder, Mike Kestemont, Jan Rybicki, en Steffen Pielström. Zie <https://github.com/computationalstylistics/stylo> voor meer informatie over Stylo.
De extra grafieken bevestigen het geschetste beeld op verschillende manieren: er is een duidelijk verschil in woordfrequenties meetbaar in de 10 boeken die door de deelnemers aan Het Nationale Lezersonderzoek het meest literair en het minst literair worden gevonden. 
Twee boeken uit de top 10, namelijk *Alsof het voorbij is* van Julian Barnes en *Norwegian wood* van Haruki Murakami lijken in het gebruik van de 100 meest frequente woorden meer op de weinig literair gevonden chicklits van Weisberger, Fforde en Mansell dan op de 8 andere romans die de hoogste literaire scores kregen.

**Grafiek 4.5.1**

De 10 romans met de hoogste (H) en laagste (L) scores voor literaire kwaliteit, analyse op hoofdcomponenten (**100** meest frequente woorden).
Maat: PCA, correlatieversie.
In deze visualisatie van een principal components analyse kunnen we zien hoe de teksten zich tot elkaar verhouden op de eerste (horizontaal afgebeelde) en tweede (verticaal afgebeelde) component. De eerste component, afgebeeld op de horizontale as, reflecteert het cluster aan gecorreleerde variabelen die samen het grootste deel van de variatie in de data verklaren. De tweede hoofdcomponent, weergegeven op de verticale as, reflecteert de grootste hoeveelheid correlerende variabelen uit de resterende variabelen (die dus niet correleren met de eerste component).
Verwijzingen naar meer uitleg over PCA zijn te vinden op p. 305-306 van *Het raadsel literatuur*.


![Grafiek 4.5.1](public/4_5_1_PCA_100_MFWs_Culled_0__PCA__corr.png)
In de grafiek hieronder zijn de woorden die opvallend vaker in de verschillende romans voorkomen aan de grafiek toegevoegd. Een voorbeeld: In *Grip* van Stephan Enter wordt het woord *zich* opvallend vaker gebruikt dan in de andere romans; in *Vijftig tinten grijs* van E.L. James valt het groter aandeel van *mijn* op.
![Grafiek 4.5.1.1](public/4_5_1_1_Loadings_PCA_100_MFWs_Culled_0__PCA__corr.png)

**Grafiek 4.5.2**

De 10 romans met de hoogste (H) en laagste (L) scores voor literaire kwaliteit, clusteranalyse (**130** meest frequente woorden).
Vanaf dit aantal MFW) zijn de 10 meest literair gevonden romans steeds bij elkaar in hetzelfde cluster te vinden. De weinig literair gewaardeerde romans van Weisberger, Fforde en Mansell lijken net iets meer op de 10 meest literaire romans dan op de andere 5 romans, van Kinsella en James. Bij 110 en 120 MFW zien we hetzelfde beeld als in Grafiek 4.5.
![Grafiek 4.5.2](public/4_5_2_CA_130_MFWs_Culled_0__Classic Delta.png)

**Grafiek 4.5.3**

De 10 romans met de hoogste (H) en laagste (L) scores voor literaire kwaliteit, bootstrap consensus tree (**100** - **1000** meest frequente woorden, increment van 100, consensus strength 0.5).
Zoals hierboven al bleek, is de uitkomst van clusteranalyses gemaakt op basis van verschillende aantallen meest frequente woorden niet altijd dezelfde. Het is nuttig om een hele reeks aan verschillende clusteranalyses te doen en daar dan een soort gemiddelde van te berekenen. Dat kan worden gedaan door in Stylo te kiezen voor een bootstrap consensus tree. In de grafiek hieronder is het resultaat gevisualiseerd van het gemiddelde van clusteranalyses gemaakt op basis van de **100** MFW tot en met de **1000** MFW met een increment van 100; dat betekend dat er in totaal tien clusteranalyses zijn gemaakt (100, 200, 300, ...., 900 en 1000 meest frequente woorden). De gekozen consensus strength is 0,5, wat betekent dat twee romans of clusters aan elkaar geclusterd worden als ze in minimaal de helft van de metingen het meest op elkaar lijken.
![Grafiek 4.5.3](public/4_5_3_BCT_100-1000_MFWs_Inc_100_Culled_0__Classic Delta.png)

**Grafiek 4.5.4**

De 10 romans met de hoogste (H) en laagste (L) scores voor literaire kwaliteit, analyse op hoofdcomponenten (**1000** meest frequente woorden).
Maat: PCA, correlatieversie.
![Grafiek 4.5.4](public/4_5_4_PCA_1000_MFWs_Culled_0__PCA__corr.png)

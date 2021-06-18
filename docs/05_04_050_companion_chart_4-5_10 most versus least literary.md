---
title: "Grafiek 4.5"
level: 2
---

De 10 romans met de hoogste en laagste scores voor literaire kwaliteit, clusteranalyse (**100** meest frequente woorden), kleurenversie van grafiek 4.5, p. N in *Het raadsel literatuur*. Maat: Classic Delta (de Deltascore staat aangegeven onder de horizontale as)
![Grafiek 4.5](public/4_5_0_CA_100_MFWs_Culled_0__Classic Delta.png)


### **Extra grafieken**
Net als Grafiek 4.5 in het boek zijn de extra grafieken gemaakt met het Stylo Package for R, ontwikkeld door Maciej Eder, Mike Kestemont, Jan Rybicki, en Steffen Pielström. Zie <https://github.com/computationalstylistics/stylo> voor meer informatie over Stylo. De extra grafieken bevestigen het geschetste beeld op verschillende manieren: er is een duidelijk verschil in woordgebruik meetbaar in de top 10 meest literaire en minst literaire romans in de ogen van de deelnemers aan Het Nationale Lezersonderzoek. Twee boeken uit de top 10, namelijk *Alsof het voorbij is* van Julian Barnes en *Norwegian wood* van Haruki Murakami lijken in het gebruik van de 100 meest frequente woorden meer op de winig literair gevonden chicklits van Weisberger, Fforde en Mansell dan op de 8 andere romans die de hoogste literaire scores kregen. [Hier nog iets meer tekst, of lager iets meer over de percentages onder de PCA en een interpretatie.]

**Grafiek 4.5.1**

De 10 romans met de hoogste en laagste scores voor literaire kwaliteit, analyse op hoofdcomponenten (**100** meest frequente woorden, MFW). Met een principal components analyse kunnen we zien hoe de teksten zich tot elkaar verhouden op de eerste (horizontaal afgebeelde) en tweede (verticaal afgebeelde) component. In de grafiek eronder zijn de woorden die opvallend vaker in de verschillende romans voorkomen aan de grafiek toegevoegd.
![Grafiek 4.5.1](public/4_5_1_PCA_100_MFWs_Culled_0__PCA__corr.png)
![Grafiek 4.5.1.1](public/4_5_1_1_Loadings_PCA_100_MFWs_Culled_0__PCA__corr.png)

**Grafiek 4.5.2**

De 10 romans met de hoogste en laagste scores voor literaire kwaliteit, clusteranalyse (**130** meest frequente woorden). Vanaf dit aantal MFW) zijn de 10 meest literair gevonden romans steeds bij elkaar in hetzelfde cluster te vinden. De weinig literair gewaardeerde romans van Weisberger, Fforde en Mansell lijken net iets meer op de 10 meest literaire romans dan op de andere 5 romans, van Kinsella en James. Bij 110 en 120 MFW zien we hetzelfde beeld als in Grafiek 4.5.
![Grafiek 4.5.2](public/4_5_2_CA_130_MFWs_Culled_0__Classic Delta.png)

**Grafiek 4.5.3**

De 10 romans met de hoogste en laagste scores voor literaire kwaliteit, bootstrap consensus tree: het gemiddelde van clusteranalyses gemaakt op basis van de **100** MFW tot en met de **1000** MFW met een increment van 100 en een consensus strength van 0,5.
![Grafiek 4.5.3](public/4_5_3_BCT_100-1000_MFWs_Inc_100_Culled_0__Classic Delta.png)

**Grafiek 4.5.4**

De 10 romans met de hoogste en laagste scores voor literaire kwaliteit, analyse op hoofdcomponenten (**1000** meest frequente woorden).
![Grafiek 4.5.4](public/4_5_4_PCA_1000_MFWs_Culled_0__PCA__corr.png)

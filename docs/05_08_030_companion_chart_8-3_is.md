---
title: "Grafiek 8.3 Vertaalde literaire romans van mannelijke auteurs en drie spannende boeken van Mankell"
level: 2
---

Kleurenversie van de grafiek op p. 195 van *Het raadsel literatuur*.


Vertaalde literaire romans van mannelijke auteurs en drie spannende boeken van Mankell, analyse op hoofdcomponenten (1000 meest frequente woorden). S: de drie spannende boeken van Henning Mankell. De twee literaire romans van zijn hand zijn gemarkeerd
door de auteursnaam in hoofdletters.
Scores voor literaire kwaliteit: H (hoog), L (laag), en M (midden). Maat: PCA, correlatieversie.

![Grafiek 8.3](public/8_3_0_PCA_1000_MFWs_Culled_0__PCA__corr.png)

### **Extra grafiek Vertaalde literaire romans van mannelijke auteurs en drie spannende boeken van Mankell**

Ook deze grafiek is gemaakt met het Stylo Package for R. Zie  Grafiek 4.5 voor meer informatie over het package en de verschillende maten.

Grafiek 8.3.1 presenteert een clusteranalyse en Grafiek 8.3.2 een bootstrap consensus tree van dezelfde vertaalde romans van mannelijke auteurs als in Grafiek 8.3. in vergelijking met Grafiek 8.2 staan romans die ook in Grafiek 8.3 voorkomen vaak op een andere plaats in de visualisatie. Dat komt omdat er nu drie romans aan zijn toegevoegd, en de meting steeds analyseert hoe de romans zich tot elkaar verhouden. Bij toevoegingen of wijzigingen verandert de samenstelling van het corpus als geheel, en veranderen de onderlinge verhoudingen daardoor ook. Dat is zichtbaar in de grafieken.


**Grafiek 8.3.1 Vertaalde literaire romans van mannelijke auteurs en drie spannende boeken van Mankell**

Clusteranalyse (**1000** meest frequente woorden). Maat: Classic Delta.
![Grafiek 8.3.1](public/8_3_1_CA_1000_MFWs_Culled_0__Classic Delta.png)

Ook in de visualisatie van deze clusteranalyse is duidelijk te zien dat boeken van dezelfde auteur gewoonlijk het meest op elkaar lijken. Vier van de vijf romans van Mankell clusteren bij elkaar - drie uit de categorie Spanning en een van zijn twee literaire romans. De vijfde, literaire roman staat iets verder weg, maar nog wel in dezelfde hoofdtak. Als we naar de Deltascores kijken (weergegeven op de horizontale as) op de plaats waar de takken zich afsplitsen is ook te zien dat de romans van Mankell iets minder ver van elkaar af staan dan de twee romans van Renate Dorrestein in Grafiek 7.7.


**Grafiek 8.3.2 Vertaalde literaire romans van mannelijke auteurs en drie spannende boeken van Mankell**

Bootstrap consensus tree (**100** - **1000** meest frequente woorden, increment van 100, consensus strength 0.5). Maat: Classic Delta.
![Grafiek 8.3.2](public/8_3_2_Consensus_100-1000_MFWs_Culled_0__Classic Delta_C_0.5.png)
Ook als we een hele serie aan clusteranalyses maken, blijft het patroon hetzelfde. De afwijkende literaire roman van Mankell sluit aan bij de twee literaire romans in het corpus van Haruki Murakami en van Charles Lewinsky. De andere literaire roman van Mankell clustert samen met de drie spannende boeken van Mankell.


**Conclusie**

Dat de roman *De Daisy Sisters* afwijkt van de andere vier romans van Mankell kan te maken hebben met een groot verschil in tijd van ontstaan: de roman werd pas recent vertaald en de vertaling verscheen in 2009, maar de originele Zweedse tekst verscheen al in 1982. Het lijkt er op dat we ook in de vertaling kunnen zien dat Mankells schrijfstijl in de loop der jaren is veranderd.  Meer over de vijf romans van Henning Mankell in *Het raadsel literatuur* op p. 188-195. Speciale aandacht voor Jonas Jonassons *De honderjarige man die uit het raam klom en verdween*, die zich in Grafiek 8.3 tussen de Mankells heeft genesteld, op p. 196-197 van *Het raadsel literatuur*.

**Hoe zijn de metingen te repliceren?**

In het R Package (zie XXX) is voor alle 401 romans een woordfrequentielijst opgenomen met de 3000 meest gebruikte woorden per tekst. VOORBEELDQUERY HIER!

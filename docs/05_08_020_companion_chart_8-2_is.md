---
title: "Grafiek 8.2 Vertaalde literaire romans van mannelijke auteurs"
level: 2
---

Kleurenversie van de grafiek op p. 190 van *Het raadsel literatuur*.


Vertaalde literaire romans van mannelijke auteurs, analyse op hoofdcomponenten (1000 meest frequente woorden).
Scores voor literaire kwaliteit: H (hoog), L (laag), en M (midden). Maat: PCA, correlatieversie.
![Grafiek 8.2](public/8_2_0_PCA_1000_MFWs_Culled_0__PCA_corr.png)

### **Extra grafieken Vertaalde literaire romans van mannelijke auteurs**

Ook deze grafiek is gemaakt met het Stylo Package for R. Zie  Grafiek 4.5 voor meer informatie over het package en de verschillende maten.

Grafiek 8.2.1 presenteert een clusteranalyse en Grafiek 8.2.2 een bootstrap consensus tree van dezelfde drie groepen vertaalde literaire romans van mannelijke auteurs als in Grafiek 8.2.


**Grafiek 8.2.1 Vertaalde literaire romans van mannelijke auteurs**

Clusteranalyse (**1000** meest frequente woorden). Maat: Classic Delta.
![Grafiek 8.2.1](public/8_2_1_CA_1000_MFWs_Culled_0__Classic Delta.png)

Ook in de visualisatie van deze clusteranalyse is duidelijk te zien dat boeken van dezelfde auteur meestal het meest op elkaar lijken. Verder zijn er geen aparte takken voor romans die de hoogste of de laagste scores kregen voor literaire kwaliteit of die tot de middengroep behoorden.


**Grafiek 8.2.2 Vertaalde literaire romans van mannelijke auteurs**

Bootstrap consensus tree (**100** - **1000** meest frequente woorden, increment van 100, consensus strength 0.5). Maat: Classic Delta.
![Grafiek 8.2.2](public/8_2_2_BCT_100-1000_MFWs_Culled_0__Classic Delta_C_0.5.png)
Ook als we een hele serie aan clusteranalyses maken, blijft het patroon hetzelfde.


**Conclusie**

Voor de vertaalde literaire romans van mannelijke auteurs zien we in de frequenties van de 1000 meest gebruikte woorden geen duidelijk verschil tussen de romans die de hoogste of de laagste scores kregen voor literaire kwaliteit of die tot de middengroep behoorden. Meer hierover in *Het raadsel literatuur* op p. 188 en verder.

**Hoe zijn de metingen te repliceren?**

In het R Package (zie XXX) is voor alle 401 romans een woordfrequentielijst opgenomen met de 3000 meest gebruikte woorden per tekst. VOORBEELDQUERY HIER!

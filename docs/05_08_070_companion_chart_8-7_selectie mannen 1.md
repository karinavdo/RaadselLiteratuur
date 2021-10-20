---
title: "Grafiek 8.7 Voskuil, Mortier, Barnes, Kinsella"
level: 2
---

Kleurenversie van de grafiek op p. 210 van *Het raadsel literatuur*.

Voskuil, *De buurman*, Mortier, *Godenslaap*, Barnes, *Alsof het voorbij is*, Kinsella, *Shopaholic en baby*, Mortier, *Sprakeloos*, Dijkshoorn, *Nooit ziek geweest*, clusteranalyse (1000 meest frequente woorden).
Analyse op hoofdcomponenten (1000 meest frequente woorden). Maat: PCA, correlatieversie.
![Grafiek 8.7](public/8_7_0_CA_1000_MFWs_Culled_0__Classic Delta.png)

### **Extra grafieken Voskuil, Mortier, Barnes, Kinsella**

Ook deze grafieken zijn gemaakt met het Stylo Package for R. Zie  Grafiek 4.5 voor meer informatie over het package en de verschillende maten.

**Grafiek 8.7.1 Voskuil, *De buurman*, Mortier, *Godenslaap*, Barnes, *Alsof het voorbij is*, Kinsella, *Shopaholic en baby*, Mortier, *Sprakeloos*, Dijkshoorn, *Nooit ziek geweest*.**

Bootstrap consensus tree (**100** - **1000** meest frequente woorden, increment van 100, consensus strength 0.5). Maat: Classic Delta.
![Grafiek 8.7.1](public/8_7_1_BCT_100-1000_MFWs_Culled_0__Classic Delta_C_0.5.png)

**Grafiek 8.7.2 Voskuil, *De buurman*, Mortier, *Godenslaap*, Barnes, *Alsof het voorbij is*, Kinsella, *Shopaholic en baby*, Mortier, *Sprakeloos*, Dijkshoorn, *Nooit ziek geweest*.**

Analyse op hoofdcomponenten (**1000** meest frequente woorden). Maat: PCA, correlatieversie.
![Grafiek 8.7.2](public/8_7_2_PCA_1000_MFWs_Culled_0__PCA__corr.png)


**Conclusie**

De extra metingen bevestigen het beeld dat er in de woordfrequenties van de Nederlandse literaire romans van mannelijke auteurs geen duidelijk verschil te vinden is tussen de romans die de hoogste of de laagste scores kregen voor literaire kwaliteit of die tot de middengroep behoorden. Meer hierover in *Het raadsel literatuur* op p. 204 en verder.

**Hoe zijn de metingen te repliceren?**

In het R Package (zie XXX) is voor alle 401 romans een woordfrequentielijst opgenomen met de 3000 meest gebruikte woorden per tekst. VOORBEELDQUERY HIER!

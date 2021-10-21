---
title: "Grafiek 11.2 Nederlandse literaire romans van mannelijke en vrouwelijke auteurs"
level: 2
---

Kleurenversie van de grafiek op p. 287 van *Het raadsel literatuur*.

Top 10 literaire kwaliteit van Nederlandse literaire romans van mannen en van vrouwen, clusteranalyse (1000 meest frequente woorden). Maat: Classic Delta.
![Grafiek 11.2](public/11_2_0_CA_726_MFWs_Culled_100__Classic Delta.png)

CORRECTIE: Deze grafiek geeft niet de clusteranalyse van de **1000 meest frequente woorden** weer, maar die van de **726 woorden die in alle 20 romans voorkomen** (dat wil zeggen: met 100 procent 'culling'). De grafiek zoals ik hem had bedoeld, staat hieronder bij de extra grafieken als Grafiek 11.2.1.

### **Extra grafieken Nederlandse literaire romans van mannelijke en vrouwelijke auteurs**

Ook deze grafieken zijn gemaakt met het Stylo Package for R. Zie  Grafiek 4.5 voor meer informatie over het package en de verschillende maten.

Grafiek 11.2.1 presenteert de grafiek zoals die in het boek had moeten staan; er zijn geen verschillen in de twee hoofdclusters, en dezelfde drie romans vormen samen een van de twee hoofdclusters. Een hele reeks van clusteranalyses geeft hetzelfde beeld, in Grafiek 11.2.2.

**Grafiek 11.2.1 Nederlandse literaire romans van mannelijke en vrouwelijke auteurs**

Clusteranalyse (**1000** meest frequente woorden). Maat: Classic Delta.
![Grafiek 11.2.1](public/11_2_1_CA_1000_MFWs_Culled_0__Classic Delta.png)

**Grafiek 8.6.1 Nederlandse literaire romans van mannelijke en vrouwelijke auteurs**

Bootstrap consensus tree (**100** - **1000** meest frequente woorden, increment van 100, consensus strength 0.5). Maat: Classic Delta.
![Grafiek 11.2.2](public/11_2_2_BCT_100-1000_MFWs_Culled_0__Classic Delta_C_0.5.png)

**Conclusie**

De extra metingen bevestigen het beeld dat er in de woordfrequenties van de Nederlandse literaire romans van mannelijke auteurs geen duidelijk verschil te vinden is tussen de romans die de hoogste of de laagste scores kregen voor literaire kwaliteit of die tot de middengroep behoorden. Meer hierover in *Het raadsel literatuur* op p. 204 en verder.

**Hoe zijn de metingen te repliceren?**

In het R Package (zie XXX) is voor alle 401 romans een woordfrequentielijst opgenomen met de 3000 meest gebruikte woorden per tekst. VOORBEELDQUERY HIER!

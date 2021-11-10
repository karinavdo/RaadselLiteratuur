---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

title:  "<b>Extra grafiek</b> Aantal boeken gelezen per categorie"

---
Interactieve grafiek ter verdieping van Grafiek 3.3 op p. 53 van *Het raadsel literatuur*.

<script src="https://d3js.org/d3.v6.min.js" defer></script>
<script src="https://d3js.org/d3-scale.v3.min.js" defer></script>
<script src="js/companion_utils_locale-nl.js" defer></script>
<script src="js/companion_utils_colors.js" defer></script>
<script src="js/companion_utils_svg2png.js" defer></script>

<script src="js/companion_chart_3-4b_genre-reading-diversity.js" defer></script>
<script src="js/companion_chart_3-4b_genre-reading-diversity-rel.js" defer></script>

<div class="chart_float" id="chart_3-4b_genre-reading-diversity"></div>

In deze grafiek proberen we te achterhalen hoe de deelnemers aan Het Nationale Lezersonderzoek hun aandacht hebben verdeeld over de vier verschillende genres uit het onderzoekscorpus. De samenstelling van het corpus is als volgt:

- 147 boeken uit de categorie Literaire roman
- 186 uit de categorie Spanning
- 41 uit Romantiek
- en 27 beschreven als Overige (meer hierover op p. 51-54 van *Het raadsel literatuur*.)

De deelnemers gaven aan welke van de in totaal 401 boeken zij hadden gelezen. In de binnenste cirkel van de grafiek zijn de respondenten verdeeld naar hun primaire voorkeur: ze worden ingedeeld in de categorie waarvan ze de meeste titels aangaven te hebben gelezen. Dus alle lezers die vooral Spanning lazen, hebben samen 88,126 keer een boek uit die categorie aangevinkt als gelezen en alle lezers die vaker een Literaire roman lazen, komen samen uit op 151.244 gelezen romans uit die categorie. Hierbij moeten we het aantal boeken uit die categorie in gedachten houden: er zitten meer boeken uit de categorie Spanning in het corpus dan uit die van de Literaire roman. In de buitenste ring staat dan per hoofdcategorie het aantal boeken dat de betreffende deelnemers lazen in de andere categorieën. Dat de groepen Romantiek en Overige niet zo zichtbaar zijn, weerspiegelt de lage aantallen daarvan in het onderzoekscorpus.

Voor lezers die vooral boeken uit de groepen Spanning en Literaire roman uit het corpus lezen, geeft de grafiek een aardig inzicht. We zien dat de groep lezers die het meeste kiest voor de Literaire roman verreweg de meeste romans las. Ongeveer één op de vier keer maken zij een uitstap in het genre Spanning, en in veel mindere mate lezen zij boeken uit het genre Romantiek of uit de verzamelgroep Overige.

Lezers die primair kiezen voor Spanning maken vaker een uitstapje naar een Literaire roman. Bijna één op de drie boeken is in hun geval niet Spanning, maar een Literaire roman.

De lezers die primair kiezen voor Romantiek of een boek uit de categorie Overige lezen samen een marginaal aantal boeken vergeleken bij de andere lezers. Hier speelt ongetwijfeld mee dat lezers die primair Romantiek lezen niet goed vertegenwoordigd zijn in de survey.

Hieronder presenteren we deze grafiek in een relatieve variant, zodat beter is te zien hoe de verdeling over categorieën is voor deze lezers. Zo kunnen we het kwadrant rechtsboven, met de Literaire roman, als volgt lezen: voor lezers die vooral boeken uit de categorie Literaire roman lezen geld dat zij naast de 100 literaire romans die zij lezen ook 29 spannende boeken, 8 uit de categorie Overige en 2 uit de categorie Romantiek lezen.

<div class="chart_float" id="chart_3-4b_genre-reading-diversity-rel"></div>

<!-- **Hoe zijn de metingen te repliceren?**
VOORBEELDQUERY HIER! -->

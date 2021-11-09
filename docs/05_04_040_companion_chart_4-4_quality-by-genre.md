---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

title:  "Grafiek 4.4 Voor de 401 boeken per categorie de gemiddelde score voor algemene kwaliteit"

---
Interactieve kleurenversie van de grafiek op p. 71 van *Het raadsel literatuur*.

<script src="https://d3js.org/d3.v6.min.js" defer></script>
<script src="https://d3js.org/d3-scale.v3.min.js" defer></script>

<script src="js/companion_utils_locale-nl.js" defer></script>
<script src="js/companion_utils_colors.js" defer></script>
<script src="js/companion_utils_svg2png.js" defer></script>
<script src="js/companion_abstraction_data_point_labeler.js" defer></script>
<script src="js/companion_abstraction_barchart.js" defer></script>

<script src="js/companion_chart_4-4_quality-by-genre.js" defer></script>

<div class="chart_float" id="chart_4-4_quality-by-genre">
  <div class="plot"></div>
</div>

Een klik op een balk in de grafiek maakt zichtbaar hoeveel van de boeken uit de geselecteerde categorie die gemiddelde score kregen.

<!-- **Hoe zijn de metingen te repliceren?**
VOORBEELDQUERY HIER! -->

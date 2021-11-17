---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

title:  "Grafiek 10.1 Gemiddelde zinslengte voor alle 401 boeken en Grafiek 10.2 Zinslengtevariatie"

---
Interactieve kleurenversie van de grafieken op p. 274 en 275 van *Het raadsel literatuur*.

Als u de muis boven een symbool in de grafiek laat rusten, wordt zichtbaar welk boek het betreft (de naam van de auteur en de titel van het boek).

<style>
path.regressionLine {
    stroke: #d85040;
    fill: none;
    stroke-width: 1.5;
    stroke-dasharray: 3,5;
  }
</style>

<script src="https://d3js.org/d3.v6.min.js" defer></script>
<script src="https://d3js.org/d3-scale.v3.min.js" defer></script>
<script src="https://unpkg.com/simple-statistics@7.7.0/dist/simple-statistics.min.js" defer></script>
<script src="js/companion_utils_locale-nl.js" defer></script>
<script src="js/companion_utils_colors.js" defer></script>
<script src="js/companion_utils_svg2png.js" defer></script>

<script src="js/companion_chart_10-1_sentence-length.js" defer></script>

<div class="chart_float" id="chart_10-1_sentence-length"></div>
<div class="chart_float" id="chart_10-2_sentence-length-variance"></div>

<!-- **Hoe zijn de metingen te repliceren?**
VOORBEELDQUERY HIER! -->

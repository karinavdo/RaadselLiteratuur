---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

title:  "Grafiek 11.4 Gemiddelde zinslengte voor de Nederlandse literaire romans en Grafiek 11.5 Zinslengtevariatie"
---
Interactieve kleurenversie van de grafieken op p. 289 en 290 van *Het raadsel literatuur*. In tegenstelling tot wat daar op p. 289 staat vermeld, zijn de 8 boekjes met apart uitgegeven langere verhalen wel meegenomen in deze grafieken (4 van vrouwelijke en 4 van mannelijke auteurs).

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

<script src="js/companion_chart_11-4_sentence-length.js" defer></script>

<div class="chart_float" id="chart_11-4_sentence-length"></div>
<div class="chart_float" id="chart_11-5_sentence-length-variance"></div>

<!-- **Hoe zijn de metingen te repliceren?**
VOORBEELDQUERY HIER! -->

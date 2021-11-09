---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

# kleur is een html kleurnaam of een code #dfdfdf (heel wit). Color picker: https://htmlcolorcodes.com/.
title:  "<b>Extra grafiek</b> Aantal gelezen boeken per jaar per leeftijdsgroep"

---
Interactieve grafiek ter verdieping van Grafiek 3.1 op p. 48 van *Het raadsel literatuur*.


<script src="https://d3js.org/d3.v6.min.js" defer></script>
<script src="https://d3js.org/d3-scale.v3.min.js" defer></script>
<script src="js/companion_chart_3-1-1_books-per-year_agegroups.js" defer></script>

<div>
  <div class="chart_float" id="chart_3-1-1_books-per-year_agegroups_mean"></div>
  <div class="chart_float" id="chart_3-1-1_books-per-year_agegroups_hist"></div>
</div>
<!-- TODO: solve below hack to clear -->
<div style="clear: both;"></div>

De linker grafiek geeft per leeftijdcategorie in een balk aan hoeveel boeken deelnemers uit die leeftijdsgroep aangaven per jaar ongeveer te lezen. De rechter grafiek presenteert dan de details voor de geselecteerde leeftijdsgroep.

<!-- **Hoe zijn de metingen te repliceren?**
VOORBEELDQUERY HIER! -->

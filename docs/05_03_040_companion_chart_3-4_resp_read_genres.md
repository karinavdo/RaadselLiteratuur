---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

title:  "Grafiek 3.3 Aantal boeken gelezen per categorie"

---
Interactieve versie van de grafiek op p. 53 van *Het raadsel literatuur*. 

<script src="https://d3js.org/d3.v6.min.js" defer></script>
<script src="https://d3js.org/d3-scale.v3.min.js" defer></script>
<script src="js/companion_utils_locale-nl.js" defer></script>
<script src="js/companion_utils_colors.js" defer></script>
<script src="js/companion_utils_svg2png.js" defer></script>


<script src="js/companion_resp_read_fiction.js" defer></script>
<script src="js/companion_resp_read_suspense.js" defer></script>
<script src="js/companion_resp_read_romantic.js" defer></script>
<script src="js/companion_resp_read_other.js" defer></script>

<div class="chart_float" id="resp_read_fiction"></div>
<div class="chart_float" id="resp_read_suspense"></div>
<div class="chart_float" id="resp_read_romantic"></div>
<div class="chart_float" id="resp_read_other"></div>

<!-- **Hoe zijn de metingen te repliceren?**
VOORBEELDQUERY HIER! -->

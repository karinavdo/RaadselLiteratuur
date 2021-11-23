---
title: "Data en R package"
---
Het boek *Het raadsel literatuur* presenteert een synthese van de onderzoeksresultaten van het project The Riddle of Literary Quality. In dat project zijn heel veel gegevens bijeen gebracht: de meningen over 401 boeken van bijna 14.000 deelnemers aan Het Nationale Lezersonderzoek (2013) en allerlei gegevens over die 401 boeken. Meer over The Riddle of Literary Quality is te vinden op de [projectwebsite](https://literaryquality.huygens.knaw.nl/), waar ook alle [publicaties](https://literaryquality.huygens.knaw.nl/?page_id=588) die eruit voortkwamen zijn verzameld.

Om het uitgevoerde onderzoek herhaalbaar en controleerbaar te maken en ook andere onderzoeksbenaderingen mogelijk te maken, zijn de data waarvan Karina van Dalen-Oskam gebruik heeft gemaakt voor het boek *Het raadsel literatuur*, voor zover ze gedeeld mogen worden, bijeengebracht in een R package. Een uitzondering hierop zijn de onderzoeksgegevens die ten grondslag liggen aan het werk van Andreas van Cranenburgh, zoals beschreven in Hoofdstuk 10. De talige diepte in (p. 261 en verder). Die vindt u op [de website van Andreas van Cranenburgh](https://andreasvc.github.io/).

R is een gratis software-omgeving waarin statistische analyses gedaan kunnen worden en de resultaten daarvan in grafieken kunnen worden  gevisualiseerd. R kan worden gedownload van de [R website](https://www.r-project.org/). Als R is geïnstalleerd, kunt u vervolgens het gewenste R package laden. Hieronder meer over data, package en hoe dat te gebruiken.

**Het R Package**

De nieuwste versie van het *litRiddle* R package is beschikbaar op CRAN (The Comprehensive R Archive Network). In R installeert u het package met de volgende opdracht:

- install.packages("litRiddle")<br>

Als u het package heeft geïnstalleerd, laadt u het als volgt:

- library(litRiddle)

Hieronder volgt meer informatie over het package. Voor uitgebreidere informatie (in het Engels) geeft u in het package de volgende opdracht:

- vignette("litRiddle")

Het package is ontwikkeld door Maciej Eder en Saskia Lensink in samenwerking met Joris van Zundert en Karina van Dalen-Oskam.

**De data**

De verzamelde gegevens zijn ondergebracht in drie verschillende tabellen: de tabel boeken (*books*), respondenten (*respondents*) en meningen (*reviews*). Elke tabel heeft een aantal kolommen met informatie. Die kolommen en veel van de informatie is in het Engels. Hieronder staan ze opgesomd, met een beschrijving van de inhoud in het Nederlands en met verwijzingen naar een uitvoeriger beschrijving in *Het raadsel literatuur*.

**Boeken (books)**

Roep na het laden van het package de tabel *boeken* aan met deze opdrachten:

- data(books)
- books

Een overzicht van de kolommen krijgt u met:

- colnames(books)

U kunt alle waarden in een kolom opvragen met bijvoorbeeld:

- levels( as.factor( books[,'short.title'] ) )

1. **short.title**  Een verkorte titel, beginnend met de naam van de auteur en gevolgd door de eerste drie woorden (geen lidwoorden) van de titel. Voorbeeld: boek 362: *Verhulst_LaatsteLiefdeVan*;
2. **author**  Achternaam en voornaam van de auteur van het boek;
3. **title**  Volledige titel van het boek;
4. **genre**  Genre van het boek (zie *Het raadsel literatuur* p. 52). Er zijn vier hoofdcategorieën onderscheiden: Literaire roman (*Fiction*), Romantiek (*Romantic*), Spanning (*Suspense*) en Overige (*Other*);
5. **book.id**  Uniek nummer ter identificatie van elk boek;
6. **riddle.code**  Uitvoeriger lijst van 13 genres, opgesteld door het onderzoeksteam ten behoeve van het vaststellen van de definitieve hoofdcategorieën;
7. **translated**  Geeft aan of het boek is vertaald of oorspronkelijk Nederlands is. Vertaald: *yes*, niet vertaald: *no*;
8. **gender.author**  Het (biologisch) geslacht van de auteur. Vrouw: *female*, man: *male*, onbekend of een gemegd duo: *unknown/multiple*;
9. **origin.author**  Het land van herkomst van de auteur, aangegeven met de standaard lettercodes;
10. **original.language** De taal waarin het boek is geschreven door de auteur, afgekort in hoofdletters;
11. **inclusion.criterion**  Uit welke categorie het het boek is geselecteerd voor opname in het onderzoekscorpus (zie *Het raadsel literatuur* p. 43-44): op grond van verkoopcijfers (* bestseller*), als boekenweekgeschenk (*boekenweekgeschenk*), op grond van uitleencijfers (*library*) en als apart uitgegeven langer verhaal (*literair juweeltje*);
12. **publication.date**  Publicatiedatum van het boek, JJJJ-MM-DD;
13. **first.print**  Jaar waarin de eerste druk in het Nederlands verscheen;
14. **publisher** Uitgeverij van het boek;
15. **english.title**  Titel van het boek in het Engels (met vertalingen van het onderzoeksteam als er geen Engelse vertaling van het boek beschikbaar was in 2013);
16. **word.count**  Totaal aantal woorden in het boek (tokens);
17. **type.count**  Aantal unieke woorden in het boek (typen);
18. **sentence.length.mean**  Gemiddelde zinslengte (in woorden);
19. **sentence.length.variance**  Standaarddeviatie van de zinslengte;
20. **paragraph.count**  Totaal aantal alinea's in het boek;
21. **sentence.count**  Totaal aantal zinnen in het boek;
22. **paragraph.length.mean**  Gemiddelde alinealengte (in woorden);
23. **raw.TTR**  Type-token-ratio, de verhouding tussen aantal woordvoorkomens en aantal unieke woorden ter indicatie van de variatie in de woordenschat. De lengte van het boek heeft invloed op de TTR en maakt het lastg om de TTR van boeken van verschillende lengte met elkaar te vergelijken;
24. **sampled.TTR**  Deze versie van TTR ondervindt minder invloed van verschil in boeklengte en heeft dus de voorkeur voor vergelijking van de omvang van de woordenschat in boeken van verschillende omvang.

**Woordfrequentietabel**

Een apart tabel bevat de woordfrequenties van alle 401 boeken.

**Respondenten (respondents)**

Roep na het laden van het package de tabel *respondenten* aan met deze opdrachten:

- data(respondents)
- respondents

Een overzicht van de kolommen krijgt u met:

- colnames(respondents)

U kunt alle waarden in een kolom opvragen met bijvoorbeeld:

- levels( as.factor( respondents[,'books.per.year'] ) )

1. **respondent.id**  Uniek nummer ter identificatie van elke (volledig anonieme) respondent;
2. **gender.resp**  Gender van de respondent zoals aangegeven door de respondent: vrouw (*female*), man (*male*), geen opgave (*NA*), (zie *Het raadsel literatuur* p. 318);
3. **age.resp**  Leeftijd van de respondent;
4. **zipcode**  Cijfers van de postcode van de respondent (zie *Het raadsel literatuur* p. 47);
5. **education**  Hoogst gevolgde opleiding (zie *Het raadsel literatuur* p. 318);
6. **books.per.year**  Aantal boeken dat de respondent aangaf ongeveer per jaar te lezen;
7. **typically.reads**  Soort boeken die de respondent aangaf te lezen: uitsluitend fictie(*only fiction*), uitsluitend non-fictie (*only non-fiction*), of beide (*both*);
8. **how.literary**  In welke mate de respondent zichtzelf als een literaire lezer beschouwt. Schaal: van 1 (niet-literaire lezer) tot en met 7 (sterk literaire lezer);
9. **s.4a1**  Antwoord op de stelling 'Ik lees graag romans die ik kan betrekken op mijn eigen leven'. Schaal van 1 (helemaal mee oneens) tot en met 5 (helemaal mee eens) en 6 (weet niet);
10. **s.4a2**  Antwoord op de stelling 'Het gaat mij vooral om het verhaal in de roman'. Schaal van 1 (helemaal mee oneens) tot en met 5 (helemaal mee eens) en 6 (weet niet);
11. **s.4a3**  Antwoord op de stelling 'De schrijfstijl is voor mij belangrijk in een boek'. Schaal van 1 (helemaal mee oneens) tot en met 5 (helemaal mee eens) en 6 (weet niet);
12. **s.4a4**  Antwoord op de stelling 'Ik ga graag op zoek naar de diepere lagen van een roman'. Schaal van 1 (helemaal mee oneens) tot en met 5 (helemaal mee eens) en 6 (weet niet);
13. **s.4a5**  Antwoord op de stelling 'Ik lees graag literatuur'. Schaal van 1 (helemaal mee oneens) tot en met 5 (helemaal mee eens) en 6 (weet niet);
14. **s.4a6**  Antwoord op de stelling 'Ik lees romans om nieuwe werelden en onbekende tijdperken te leren kennen'. Schaal van 1 (helemaal mee oneens) tot en met 5 (helemaal mee eens) en 6 (weet niet);
15. **s.4a7**  Antwoord op de stelling 'Ik lees romans vooral tijdens de vakantie'. Schaal van 1 (helemaal mee oneens) tot en met 5 (helemaal mee eens) en 6 (weet niet);
16. **s.4a8**  Antwoord op de stelling 'Ik lees in verschillende romans tegelijkertijd'. Schaal van 1 (helemaal mee oneens) tot en met 5 (helemaal mee eens) en 6 (weet niet);
17. **s.12b1**  Antwoord op de stelling 'Ik hou van waargebeurde romans'. Schaal van 1 (helemaal mee oneens) tot en met 5 (helemaal mee eens) en 6 (weet niet);
18. **s.12b2**  Antwoord op de stelling 'Ik denk graag na over de opbouw van een roman'. Schaal van 1 (helemaal mee oneens) tot en met 5 (helemaal mee eens) en 6 (weet niet);
19. **s.12b3**  Antwoord op de stelling 'De schrijfstijl in een roman is voor mij belangrijker dan het verhaal'. Schaal van 1 (helemaal mee oneens) tot en met 5 (helemaal mee eens) en 6 (weet niet);  
20. **s.12b4**  Antwoord op de stelling 'Ik wil graag meegesleept worden door een roman'. Schaal van 1 (helemaal mee oneens) tot en met 5 (helemaal mee eens) en 6 (weet niet);
21. **s.12b5**  Antwoord op de stelling 'Ik kies mijn boeken graag uit top 10-lijsten met de bestverkochte boeken'. Schaal van 1 (helemaal mee oneens) tot en met 5 (helemaal mee eens) en 6 (weet niet);
22. **s.12b6**  Antwoord op de stelling 'Ik lees romans om verstandelijk uitgedaagd te worden'. Schaal van 1 (helemaal mee oneens) tot en met 5 (helemaal mee eens) en 6 (weet niet);
23. **s.12b7**  Antwoord op de stelling 'Ik hou van romans die gemakkelijk te lezen zijn'. Schaal van 1 (helemaal mee oneens) tot en met 5 (helemaal mee eens) en 6 (weet niet);
24. **s.12b8**  Antwoord op de stelling 'Ik lees ’s avonds liever een boek dan dat ik televisie kijk'. Schaal van 1 (helemaal mee oneens) tot en met 5 (helemaal mee eens) en 6 (weet niet);
25. **remarks.survey**  Aanvullende opmerkingen van de respondent (vrij veld);
26. **date.time**  Datum en tijdstip waarop de respondent de enquête invulde, JJJJ-MM-DD UU:MM:SS;
27. **week.nr**  Week waarin de respondent de enquête invulde;
28. **day**  Dag van de week waarin de respondent de enquête invulde.

**NB In *Het raadsel literatuur* p. 315 en 318 staat de schaal van de antwoorden op de stellingen s.4a1 tot en met s.4a8 en s.12b1 tot en met s.12b8 verkeerd weergegeven als 1 (helemaal mee eens) tot en met 5 (helemaal mee oneens). In de dataset zijn de gegeven antwoorden omgescoord naar 1 (helemaal mee oneens) tot en met 5 (helemaal mee eens).**

**Meningen (reviews)**

Roep na het laden van het package de tabel *meningen* aan met deze opdrachten:

- data(reviews)
- reviews

Een overzicht van de kolommen krijgt u met:

- colnames(reviews)

U kunt alle waarden in een kolom opvragen met bijvoorbeeld:

- levels( as.factor( reviews[,'book.id'] ) )

1. **respondent.id**  Uniek nummer ter identificatie van elke deelnemer aan Het Nationale Lezersonderzoek;
2. **book.id**  Uniek nummer ter identificatie van elk boek;
3. **quality.read**  Lezersoordeel over de algemene kwaliteit van een gelezen boek (zie *Het raadsel literatuur* p. 316). Schaal: van 1 (zeer slecht) tot en met 7 (zeer goed) en 8 (weet niet);
4. **literariness.read**  Lezersoordeel over de literaire kwaliteit van een gelezen boek (zie *Het raadsel literatuur* p. 316). Schaal: van 1 (absoluut niet literair) tot en met 7 (in hoge mate literair) en 8 (weet niet);
5. **quality.notread**  Lezersoordeel over de algemene kwaliteit van een niet gelezen boek (zie *Het raadsel literatuur* p. 317). Schaal: van 1 (zeer slecht) tot en met 7 (zeer goed) en 8 (weet niet);
6. **literariness.notread**  Lezersoordeel over de literaire kwaliteit van een niet gelezen boek (zie *Het raadsel literatuur* p. 317). Schaal: van 1 (absoluut niet literair) tot en met 7 (in hoge mate literair) en 8 (weet niet);
7. **motivations**  Onderbouwing van de lezer van de gegeven score voor literaire kwaliteit aan een gelezen boek (vrij veld). Zie *Het raadsel literatuur* p. 317;
8. PM lemmatized motivations
8. **book.read**  Geeft weer of een lezer heeft aangegeven een boek te hebben gelezen (waarde *1*) of een mening te hebben over een niet gelezen boek (waarde *0*).


**Gebruik van het R Package**

Hierboven staan al heel wat aanwijzingen hoe de data in het R Package zijn te benaderen, maar het wordt natuurlijk pas echt leuk als je de informatie uit de verschillende tabellen met elkaar kunt combineren en in grafieken kunt afbeelden. In de komende weken zal op deze website bij de verschillende grafieken worden toegevoegd hoe de weergegeven informatie uit het package gehaald kan worden. Meer hierover is ook te vinden in het package zelf, met de opdracht:

- vignette("litRiddle")

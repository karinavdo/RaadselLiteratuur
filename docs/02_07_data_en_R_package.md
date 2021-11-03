---
title: "Data en R Package"
---
Het boek *Het raadsel literatuur* presenteert een synthese van de onderzoeksresultaten van het project The Riddle of Literary Quality. In dat project zijn heel veel gegevens bijeen gebracht: de meningen over 401 boeken van bijna 14.000 deelnemers aan Het Nationale Lezersonderzoek (2013) en allerlei gegevens over die 401 boeken. Meer over The Riddle of Literary Quality is te vinden op de [projectwebsite](https://literaryquality.huygens.knaw.nl/), waar ook alle [publicaties](https://literaryquality.huygens.knaw.nl/?page_id=588) die eruit voortkwamen zijn verzameld.

Om het uitgevoerde onderzoek herhaalbaar en controleerbaar te maken en ook andere onderzoeksbenaderingen mogelijk te maken, zijn alle verzamelde data, voor zover ze gedeeld mogen worden, bijeengebracht in een R Package. R is een gratis software-omgeving waarin statistische analyses gedaan kunnen worden en de resultaten daarvan in grafieken kunnen worden  gevisualiseerd. R kan worden gedownload van de [R website](https://www.r-project.org/). Als R is geïnstalleerd, kunt u vervolgens het gewenste R Package laden. Hieronder meer over data, package en hoe dat te gebruiken.

**Het R Package**

De nieuwste versie van het *litRiddle* R Package komt binnenkort beschikbaar op CRAN (The Comprehensive R Archive Network). In R installeert u het package met de volgende opdracht:

- install(litRiddle)<br>

Als u het package heeft geïnstalleerd, laadt u het als volgt:

- library(litRiddle)

Engelstalige documentatie bij het package vindt u hier: NNNNN. Een Nederlandse toelichting staat hieronder op deze webpagina.

Het package is ontwikkeld door Maciej Eder en Saskia Lensink in samenwerking met Joris van Zundert en Karina van Dalen-Oskam. Fijn als u in publicaties als volgt naar het package verwijst:

- PM Ref package

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
16. word_count
17. type_count
18. sentence_length_mean
19. sentence_length_variance
20. paragraph_count
21. sentence_count
22. paragraph_length_mean

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

**NB In *Het raadsel literatuur* p. 315 en 318 staat de schaal van de antwoorden op de stellingen s.4a1 tot en met s.4a8 en s.12b1 tot en met s.12b8 verkeerd weergegeven als Schaal van 1 (helemaal mee eens) tot en met 5 (helemaal mee oneens). In de dataset zijn de gegeven antwoorden omgescoord naar 1 (helemaal mee oneens) tot en met 5 (helemaal mee eens).**

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
8. **book.read**  Geeft weer of een lezer heeft aangegeven een boek te hebben gelezen (waarde *1*) of een mening te hebben over een niet gelezen boek (waarde *0*).

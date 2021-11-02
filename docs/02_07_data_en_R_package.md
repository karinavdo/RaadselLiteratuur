---
title: "Data en R Package"
level: 2
---
Het boek *Het raadsel literatuur* presenteert een synthese van de onderzoeksresultaten van het project The Riddle of Literary Quality. In dat project zijn heel veel gegevens bijeen gebracht: de meningen over 401 boeken van bijna 14.000 deelnemers aan Het Nationale Lezersonderzoek (2013) en allerlei gegevens over die 401 boeken. Meer over The Riddle of Literary Quality is te vinden op de [projectwebsite](https://literaryquality.huygens.knaw.nl/), waar ook alle [publicaties](https://literaryquality.huygens.knaw.nl/?page_id=588) die eruit voortkwamen zijn verzameld.

Om het uitgevoerde onderzoek herhaalbaar en controleerbaar te maken en ook andere onderzoeksbenaderingen mogelijk te maken, zijn alle verzamelde data, voor zover ze gedeeld mogen worden, bijeengebracht in een R Package. R is een gratis software-omgeving waarin statistische analyses gedaan kunnen worden en de resultaten daarvan in grafieken kunnen worden  gevisualiseerd. R kan worden gedownload van de [R website](https://www.r-project.org/). Als R is geïnstalleerd, kunt u vervolgens het gewenste R Package laden. Hieronder meer over data, package en hoe dat te gebruiken.

---
title: "Het R Package"
level: 3
---
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

1. short.title        Een verkorte titel beginnen met de naam van de auteur gevolgd door de eerste drie woorden (geen lidwoorden) van de titel. Voorbeeld: boek 362: *Verhulst_LaatsteLiefdeVan*;
2. author             Last name and first name of the author of the book;
3. title              Full title of the book;
4. genre              Genre of the book. There are four different genres: a) Fiction; b) Romantic; c) Suspense; d) Other;
5. book.id            Unique number to identify each book;
6. riddle.code        More complete list of genres of the books. Contains 13 categories --- to see which, type 'levels(books$riddle.code' in the terminal;
7. translated         'yes' if the book has been translated, 'no' if not;
8. gender.author      The gender of the author; female, male, unknown/multiple
9. origin.author      The country of origin of the author. Note that short country codes have been used instead of the full country names;
10. original.language The original language of the book. Note that short language codes have been used, instead of the full language names;
11. inclusion.criterion   In what category a book has been placed, either a) bestseller; b) boekenweekgeschenk; c) library; or d) literair juweeltje;
12. publication.date  Publication date of the book, using a YYYY-MM-DD format;
13. first.print       Year in which the first print appeared;
14. publisher         Publishers of the books;
15. english.title     Title of the book in English;
16. word_count
17. type_count
18. sentence_length_mean
19. sentence_length_variance
20. paragraph_count
21. sentence_count
22. paragraph_length_mean

**Respondenten (respondents)**

1. respondent.id      Unique number for each respondent of the survey;
2. gender.resp        Gender of the respondent; female, male, NA
3. age.resp           Age of the respondent;
4. zipcode            Zipcode of the respondent;
5. education          Education level, containing 8 levels (see which levels by typing 'levels(respondents$education)' in the terminal);
6. books.per.year     Number of books read per year by each respondent;
7. typically.reads    Typical genre of books that a respondent reads, with three levels a) Fiction; b) Non-fiction; c) both;
8. how.literary       Answer to the question 'How literary a reader do you consider yourself to be?', where respondents could fill in a number from 1 - 7, with 1 meaning 'not literary at all' and 7 meaning 'very literary';
9. s.4a1              Answer to the question: 'I like reading novels that I can relate to my own life'. Scale from 1 - 5, with 1 meaning 'completely disagree', and 5 meaning 'completely agree';
10. s.4a2             Answer to the question: 'The story of a novel is what matters most to me'. Scale from 1 - 5;
11. s.4a3             Answer to the question: 'The writing style in a book is important to me'. Scale from 1 - 5;
12. s.4a4             Answer to the question: 'I like searching for deeper layers in a novel'. Scale from 1 - 5;
13. s.4a5             Answer to the question: 'I like reading literature'.  Scale from 1 - 5;
14. s.4a6             Answer to the question: 'I read novels to discover new worlds and unknown time periods'. Scale from 1 - 5;
15. s.4a7             Answer to the question: 'I mostly read novels during my vacation'. Scale from 1 - 5;
16. s.4a8             Answer to the question: 'I usually read several novels at the same time'. Scale from 1 - 5;
17. s.12b1            Answer to the question: 'I like novels based on real events'. Scale from 1 - 5;
18. s.12b2            Answer to the question: 'I like thinking about a novel's structure'. Scale from 1 - 5;
19. s.12b3            Answer to the question: 'The writing style in a novel is of more importance to me than its story'.  Scale from 1 - 5;  
20. s.12b4            Answer to the question: 'I like to get carried away by a novel'. Scale from 1 - 5;
21. s.12b5            Answer to the question: 'I like to pick my books from the top 10 list of best sold books'. Scale from 1 - 5;
22. s.12b6            Answer to the question: 'I read novels to be challenged intellectually'. Scale from 1 - 5;
23. s.12b7            Answer to the question: 'I love novels that are easy to read'. Scale from 1 - 5;
24. s.12b8            Answer to the question: 'In the evening, I prefer to read books over watching TV'. Scale from 1 - 5;
25. remarks.survey    Any additional remarks that respondents filled in at the end of the survey;
26. date.time         Date and time of the moment a respondent filled in the survey, format in YYYY-MM-DD HH:MM:SS;
27. week.nr           Number of week in which the respondent filled in the survey;
28. day               Day of the week in which the respondent filled in the survey.

**Meningen (reviews)**

1. respondent.id          Unique number for each respondent of the survey;
2. book.id                Unique number to identify each book;
3. quality.read           Rating on the quality of a book that a respondent has read. Scale from 1 - 7, with 1 meaning 'very bad' and 7 meaning 'very good';
4. literariness.read      Rating on how literary a respondent found a book that s/he has read. Scale from 1 - 7, with 1 meaning 'not literary at all' and 7 meaning 'very literary';
5. quality.notread        Rating on the quality of a book that a respondent has not read. Scale from 1 - 7, with 1 meaning 'very bad' and 7 meaning 'very good';
6. literariness.notread   Rating on how literary a respondent found a book that s/he has not read. Scale from 1 - 7, with 1 meaning 'not literary at all' and 7 meaning 'very literary';
7. motivations            Written explanations of why a respondent gave a a certain rating to a certain book.
8. book.read     1 or 0.  1 indicates that the respondent read the book, 0 indicates the respondent did not read the book but had an opinion about the literary quality of the book.

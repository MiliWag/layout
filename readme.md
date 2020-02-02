# Brilo theme - Frontend stack


## Table of contents
- [Changelog](#changelog) 
- [Automatizace - Gulp](#automatizace---gulp) 
	- [Instalace](#instalace) 
	- [Základní použití](#základní-použití) 
	- [Use cases a další tasky](#use-cases-a-další-tasky)
- [Struktura projektu](#struktura-projektu)
	- [Složka - assets/](#složka---assets/)
	- [Složka - components/](#složka---components/)
- [HTML](#html) 
	- [HTML include](#html-include)
	- [Atributy HTML elementů](#atributy-html-elementů)
- [SCSS](#scss) 
	- [Struktura SCSS složek a souborů](#struktura-scss-složek-a-souborů)
	- [SCSS soubor komponenty](#scss-soubor-komponenty)
	- [Media Queries](#media-queries)
	- [PurgeCSS](#purgecss)
	- [Používané Wordpress třídy](#používané-wordpress-třídy)
- [JavaScript](#javascript)
	- [Struktura JS složek a souborů](#struktura-js-složek-a-souborů)
	- [JS Soubor komponenty](#js-soubor-komponenty)
- [Vertikální grid](#vertikální-grid)
- [Obrázky](#obrázky)
	- [Seznam rozměrů obrázků](#seznam-rozměrů-obrázků)
	- [Základní rozměry obrázků Wordpressu](#základní-rozměry-obrázků-wordpressu)
	- [Object fit](#object-fit)
	- [SVG](#svg)
- [Lazyloading](#lazyloading)
- [V průběhu realizace projektu](#v-průběhu-realizace-projektu)
- [Vstupní checklist](#vstupní-checklist)
- [Výstupní checklist](#výstupní-checklist)


## Changelog

### v2.0.0 (9. 1. 2020)
- Gulp 4
- Node 11
- Nunjucks

### v1.0.0 (25. 4. 2019)
První public verze


## Automatizace - Gulp
K automatizaci procesů při tvorbě FE projeku používáme Gulp.   
Počítá se tedy s naistalovaným Node.js, NPM, a Gulp-CLI. Node verze 11 a výš.

### Instalace 
Při práci doporučuji mít v editoru otevřenou složku:

	resources/layout/



V terminálu je potřeba mít otevřenou složku **resources/layout**.

Ve složce **resources/layout** stačí zavolat příkaz bez parametrů:

	npm install

>❗ Aktuálně využivané verze: Node.js (v11.15.0), Gulp.js (4.0.2). Pro tyto verze je stack otestovaný a funčkní.


### Základní použití


>Ve složce *resources/layout/* příkaz:

    gulp dev

Proces automaticky hlídá a provádí:

- CSS
	- Kompilace SCSS při změně v souboru + nakopírování do šablony
	- Minifikace CSS
	- Přidání vendor prefixů - [Autoprefixer](https://github.com/postcss/autoprefixer)
	- Konverze všech hodnot v **px** na **rem** jednotky - [pxtorem](https://github.com/cuth/postcss-pxtorem)
	- Konverze hodnot v **px** u Media Queries na jednotu **em** (pro Media Queries je rem nevhodné) 
	- Generování CSS source mapy
	- Odstraňuje nepotřebné (nepoužité) CSS pomocí [PurgeCSS](https://www.purgecss.com/)
	- Minifikace CSS pomocí [cssnano](https://cssnano.co/)
- JS
	- Kompilace JS při změně v souboru (concat + minifikace) + nakopírování do šablony
	- Generování JS source mapy
- Obrázky
	- Při změně obrázku ve složce *src* (změna, přidání, odebrání), nakopírování do složky *build* a šablony (u šablony vynechána složka **content**)
	- Minifikuje SVG při změně - [svgo](https://github.com/svg/svgo)
	- Komprimuje obrázky pomocí [Tinypng](https://tinypng.com/) a vytváří [webp variantu](https://www.npmjs.com/package/gulp-webp) (složka **content** je vyřazena z komprimace)
- Automatické obnovování stránky v prohlížeči po kompilaci - [BrowserSync](https://browsersync.io/)



### Use cases a další tasky

#### **? Potřebuju zkompilovat JS a poslat šablony**

Použij task "**gulp buildJs**", který jednou zkompiluje JavaScripty a pošle je do šablony  
nebo:  
Použij "**gulp**" , který hlídá změny v souborech kontinuálně.

#### **? Potřebuju zkopírovat/synchronizovat obrázky do šablony**

 Task "**buildImages**".
  Prvně se zkomprimují obrázky.  
 Task "**themeImages**".  
  Pošlou do šablony (kromě složky **content**, která není v šabloně potřeba).

#### **? Potřebuju udělat build pro produkci a poslat do šablony**

Použij task "**gulp buildDev**"  
Jednou zkompiluje sass, purge, minifikace, zkompiluje scripty a synchronizuje obrázky.

#### **? Potřebuju udělat CSS a poslat do šablony**

Použij task **gulp buildCss**  
Odstraní nepotřebné CSS a zminifikuje, pošle do šablony.



## Struktura projektu

Kód frontendu je ve složkách **resources/layout/** 

### Složka - layout/

	|--build/
	|  |-- images/
	|  |-- js/
	|  |-- schema/
	|  |-- style.css
	|  |-- style.css.map
	|  |-- index.html
	|  |-- atoms.html
	|  |-- 1.0_homepage.html
	|  |--...
	|  |--...
	|
	|--src/
	|  |--layouts/
	|  |  |-- atoms.njk
	|  |  |-- 1.0_homepage.njk
	|  |  |-- ...
	|  |  |-- ...
	|  |
	|  |--images/
	|  |  |-- content/
	|  |  |-- favicon/
	|  |  |-- ico/
	|  |  |-- bg/
	|  |  |-- theme/
	|  |  
	|  |-- js/
	|  |-- scss/
	|
	|-- gulpfile.js
	|-- package.json


#### build/
Obsah složky build je z většiny generovaný. Vyjímkou jsou:


##### schema/
Tato složka obashuje JSON soubory šablon strukturovaných dat pro jednotlivé stránky v projektu.

>Ostatní soubory ve složce build/ jsou generované a neměli by být upravovány ručně.

#### src/
Tato složka obsahuje (společně s **src/components/**) zdrojové soubory pro generování výsledných souborů v **build/**

#### src/layouts/

Zdrojové soubory pro generování statických HTML souborů. Obsahuje soubor pro každou stránku (layout) + soubor *atoms.njk*

Soubory layoutů jsou pojmenovávány:  

	[číslo]_[jméno-layoutu].njk  
	    1.0_homepage.njk

Číslo a jméno layoutu je určené v zadání projektu.
Desetiná hodnota v čísle slouží pro číslování alternativních variant, či stavů layoutu:

	2.0_vypis-produktu.njk
	2.1_vypis-produktu-ajax-loading.njk

	3.0_detail-clanku.njk
	3.1_detail-clanku-bez-aside.njk
	3.2_detail-clanku-dasi-varianta.njk


> Jména souboru jsou případně i v češtině. Jména vychází ze zadání projektu.

Soubor **atoms.html** má sloužit jako malá "pattern library". Slouží k definování a izolovanému zobrazení:
- tlačítek
- nadpisů 
- variant texu (velikosti, řezy, písma)
- atd.


Více k tvorbě HTML souborů najdeš v: [HTML](#html) 

#### src/images/

Obsahuje ve svých podsložkách všechny obrázkové zdroje projektu (rastrové i bitmapové).

##### content/
Tato složka obsahuje obrázky, které nejsou součátní finálního projektu. Obrázky použivané při vývoji, které budou ve finálním projektu nahrazené obrázky vybranými v administraci webu. Tato složka je vynechána z komprese obrázků a kopírování do šablony.

##### favicon/
V tuto chvíli obsahuje všechny soubory spojené s faviconou (Tedy i soubory jako site.webmanifest a browserconfig.xml). 
Všechny tyto soubory by měli být vygenerovány pomocí služby: [Real Favicon Generator](https://realfavicongenerator.net/). Jako zdroj má sloužit **čvercová** SVG ikona. Vygenerované soubory patří do tého složky, Vygenerovaný kód do **header-head.html**

> Nezapomeň v generátoru nastavit cestu k souborům na */images/favicon* pro správně vygenerovaný kód.

##### ico/
Obsahuje všechny ikony projektu (vyjma favicony). Snaž se dostáhnout stavu, kdy všechny ikony jsou ve formátu SVG.

##### bg/
Obrázky či textury, které jsou v projektu využívány jako pozadí komponent, sekcí, elementů, ...

##### theme/
Statické obrázky, které jsou součátí designu projektu a nebude možné je měnit z administrace.

>Pokud se nejdná o SVG tak u **ico**, **bg** a **theme** obrázku využij generované WebP varianty obrázku s fallbackem na klasický JPG či PNG pomocí &#60;picture&#62; tagu.


#### src/js/
Místo pro JavaScriptové soubory, jež nejsou ve složkách jednotlivých komponent. Více najdeš v: [JavaScript](#javascript) 
	

#### src/scss/
Místo pro SCSS soubory, jež nejsou ve složkách jednotlivých komponent. Více najdeš v: [SCSS](#scss) 

### Složka - components/
Obsahuje podsložky jednotlivých komponent. Každá složka reprezentuje komponentu.  
Složka obsahujue HTML, CSS a JS soubor komponenty. Všechny tři soubory nesou stejný název jako složka samotná.

Komponenta:
- Je jeden logický prvek, jež může víceméně existovat samostatně.
- Je možné jí opakovaně používat na více místech v projektu.
- Může obsahovat jiné komponenty.

> Do rozhodování, co je a co není komponenta, zapoj pogramátora

Komponenta je např. sekce stránky. V takovém případě může být položka (item) vypisovaná v sekci jako další komponenta.
Konvence pojemnování je poté: *component*-**section** a *component*-**item**.
	
	components/
	|--signpost-section/
	|  |-- signpost-section.njk
	|  |-- signpost-section.scss
	|  |-- signpost-section.js
	|
	|--signpost-item/
	   |-- signpost-item.njk
	   |-- signpost-item.scss
	   |-- signpost-item.js

Jsou možné i vyjímky jako např. složka **header**. Obsahuje: *header.html*, *header-head.html*, *header-main.html*, atd.  
Tyto vyjímky se silně nedoporučují. Jedná se o situaci, kdy je vhodně mít kód komponenty rozdělený na více souborů, ale nejedná se o více komponent.
	
	components/
	|--header/
	   |-- header.html
	   |-- header-head.html
	   |-- header-main.html
	   |-- header-main.scss
	   |-- header-main.js


> ❗ Pokud máš soubor delší než cca 300 řádků, zamysli se, jestli by nebylo vhodné rozdělit jej na více souborů.	


## HTML
### Základní pravidla:
- Validní HTML5 se správným využíváním sémantických značek.
- Nepouštět se do zbytečného zanořování a obalování elementů
- Udržovat si přehlednost kódu při letmém pohledu (Mezery mezi elementy, komentáře, atd.)

### Nunjucks
[Dokumentace nunjucks](https://mozilla.github.io/nunjucks/templating.html)
 - šablonovací systém -> HTML preprocessor -> Jazyk generující html
 - bloky, podmínky, proměné, cykly

 Pomocí Nunjucks lze stránky rozdělit na části, které lze opakovat nebo iterovat, čímž, se eliminuje duplicita kódu. Díky tomu stačí dělat úpravy nějaké části webu na jednom místě.

 > ❗ Doporučuji raději projít dokumentaci Nunjucks viz. výše, kde je všechno detailněji vysvětleno a ukázáno



#### Include
Pomocí Include lze importovat různé části webu např. header footer.
```
<body>

  {% include "header/header.njk" %}

  <main>
    ...
  </main>

  {% include "footer/footer.njk" %}

</body>
```

#### Extend
Extend je něco jako lepší include. Extend nám umožnuje definovat bloky v šabloně, do kterých lze vkládat obsah.

base-layout/base-layout.njk
```
<!DOCTYPE>
<html>
<head>
    <title>{{ title }}</title>
</head>
<body>
{% block content %}
{% endblock %}
</body>
</html>
```

layouts/1.0_homepage.njk
```
{% extends 'base-layout/base-layout.njk' %}

{% block content %}
	<h1>Obsah v bloku content</h1>
{% endblock %}
```

build/1.0_homeage.html - vygenerovaný HTML
```
<!DOCTYPE>
<html>
<head>
    <title>titulek</title>
</head>
<body>
	<h1>Obsah v bloku content</h1>
</body>
</html>
```

#### Data.json
src/data.json

Je potřeba si pro projekt připravit testovací data. Proto je připraven Json soubor, kde si můžeš připravit data pro svůj projekt, který budeš poté vypisovat do stránky.

Něco málo o JSON formátu: https://jecas.cz/json

```
{
	"Items": [
		{
			"Title": "Nadpis článku č.1",
			"Perex": "Zajimavý text k článku č.1"
		},
		{
			"Title": "Nadpis dalšího článku č.2",
			"Perex": "Zajimavý text k článku č.2"
		}
	]
}

```

#### Cykly
Tady jde Nunjuck trochu proti proudu, syntaxe cyklu je naopak. Prvně index poté pole s položkama.
```
{% for Item in Items %}
	<article class="item">
		<header>
				<h2>{{ Item.Title }}</h2>
				<p>{{ Item.Perex }}</p>
		</header>
	</article>
{% endfor %}
```

Ideálně kombinovat s includem nebo makrem
```
{% for Item in Items %}
	{% include "Item/Item.njk" %}
	{# Nebo #}
	{{ MyItem(Item.Title, Item.Perex) }}
{% endfor %}
```
#### Macro
Makra jsou importy s parametrama.

Založíme se makro
```
{% macro Item(Title, Perex) %}
		<article class="item">
				<header>
						<h2>{{ Title }}</h2>
				</header>
				<p>{{ Perex }}</p>
		</article>
{% endmacro %}
```

Na začátku si importujeme makro a můžeme makro začít používat
```
{% from "Item/Item.njk" import MyItem %}

{% for Item in Items %}
	{{ MyItem(Item.Title, Item.Perex) }}
{% endfor %}
```

### Atributy HTML elementů

U atributů je dodržována pseudo-stanovená posloupnost.

1. id
2. class
4. vše ostatní v libovolném pořadí

Viz:

	<a id="" class="" href="" title="">

Pokud element disponuje atributem, u kterého je přítomna i **data-** variace je posloupnost:
1. atribut-1
2. data-atribut-1
3. atribut-2
4. data-atribut-2:
	
	<img src="" data-src="" src="" data-srcset="" alt="">

U obrázků je typické, že atribut **alt=""** je uváděn jako poslední.

## SCSS

### Základní pravidla:

- Všechen kód pouze v EN (včetně komentářů)
- Na pojmenovávání selektorů využívat "kebab case" (**Př:** some-selector)
- SCSS psané podle konceptu [OOCSS](https://www.vzhurudolu.cz/prirucka/oocss) <- přesně popsaná pravidla
- Piš komenáře. Blok, sekce, logický element, atd. má mít řádek nad selektorem komentář se svým jménem. U  kódu, který je složitější / nejasný piš komentář popisující jeho význam (EN only)
- třídy, které slouží k manipulaci s elementy v DOMu, a jsou přidávány pomocí JS mají prefix **js-** (js-active,...)
- Ve výsledném CSS chceme všechny neprocentuální hodnty v **rem**, v kódu piš **px**, gulp zařídí konverzi. (Kromě Media Queries, které se konvertují do **em**)

### Struktura SCSS složek a souborů


	scss/
	|--elements/
	|--generic/
	|--settings/
	|--overrides/
	|--tools/
	|--utilities/
	|--overrides/
	|--vendors/
	|--wordpress/



#### elements/
Styly základních HTML elementů h1,img main etc.

#### generic/
Základní vrstva, která už generuje CSS. Normalizace, základní typografie.

#### overrides/
Přetížení stylů. Převážně třetích stran.

#### settings/
Definice, proměné, barvy.

#### tools/
Mixiny a funkce

#### utilities/
Pomocné třídy.

#### vendors/
Soubory s importama knihoven třetích tříd. Které se importují z node_modules.


### SCSS soubor komponenty
Každý SCSS soubor komponenty obsahuje styly definující vzhled a chování komponenty jakožto nezávislého prvku + její media queries.

Pokud je chování / vzhled komponenty upravován v kontextu jiné komponenty, tento kód patří do souboru té komponenty jež tu původní ovlivňuje.

> Zamysli se, zda není vhodné původní komponentě přidat univerzání modifikační třídu.


#### Pořadí kódu elementu v SCSS:
1. komentář se deskriptivním jménem bloku
2. selektor
3. vlastnosti selektoru
4. pseudo-třídy
5. pseudo-elementy
6. nestované třídy s **js-** prefixem
7. další nestované selektory

> Ideálně nestuj max 2 úrovně a pouze selektory, které nemají vlastní třídu.

> Modifikační třídy elementu nejsou nestované a jsou uváděny jako další selektor.

### Media Queries

V souboru *breakpoints.scss* jsou předdefinované rozmezí s breakpointy, které je vhodné obecně využívat. Je možné si je pro potřeby projeku upravit, či přidat další.

- Každá komponenta má ve svém SCSS souboru vlastní media queries po vzoru *breakpoint.scss*.
- Dodržuj psaní komentářů popisujících rozmezí Media Queries v **px**.
- V souboru komponenty jsou Media Queries vždy na konci souboru, seřazeny od největší **px** hranice po nejmejší.
- Media queries, které se netýkají breakpointů jsou uvedeny jako první.

### PurgeCSS
Při použtí defaultního **gulp** tasku je výsledné CSS zmenšováno pomocí PurgeCSS. Tento plugin maže nevyužité CSS. To co je využité se soudí na základě HTML a JS v *assets/build/*. Existují ale styly, které je potřeba mít v CSS i, když nejsou zrovna v buildovaném HTML. Jedná se např o celý soubor *entry-content.scss* a *typography.scss*.

Přímo v v SCSS se dá nastavi oblast, která má být ignonována při mazání nepoužitých pravidel. K tomu se využívá dvojice specifických komentářů.

	/* purgecss start ignore */

	selector{
	  some-rule: value;
	}

	/* purgecss end ignore */

### Používané Wordpress třídy
V některých případech se využívají výchozí třídy Wordpressu a WP frameworku. Při jejich využítí se šetří práce programátorovi.

Navigace:

    .current-menu-item
    .current-menu-ancestor
    .current-menu-item-parent
    .menu-item-has-children
    .sub-menu

Pro obsah vkládaný uživateli přes wysiwyg editor je obalen třídou:

    .entry-content

Zde je potřeba zajistit správné vykreslování, veškeré typografie, obrázků, galerií, tabulek, atd. bez použití **css tříd a dalších atributů**. Nejčastěji podle návrhu typografické stránky.


## JavaScript
### Základní pravidla:
- Všechen kód pouze v EN (včetně komentářů)
- Na pojmenovávání proměnných, tříd, atd. využívat "camel case" (**Př:** someVariable)
- V tuto chvíli využíváme jQuery a ES5
- Zamysli se jaké informace uživatel neuvidí, pokud selže JS
- Piš komenáře. Nad každou funkcí by mělo být její deskpritivní jméno. U kódu, který je složitější / nejasný piš komentář popisující jeho význam (EN only)

### Struktura JS složek a souborů
JS soubor má každá komponenta ve své vlastní podložce  *src/components/*. Ostatní JS se nachází v *src/js*

	src/js/




##### breakpoinst.js
JS obdoba souboru *breakpoinst.scss* pro práci s breakpointy v JS. Obecně zde platí zde stejná pravidla jako v SCSS.
Hodnoty nejsou v **px**, ale v **em** ❗.

##### cookies.js
JS spojený s cookies lištou.

##### form-validation.js
Skript pro validaci formuláře ještě na straně klienta.

##### layout.js
Prostor pro obecný JS, který není spojený s komponentou. JS komponenty patří do její složky.

##### theme.js
JS přímo spojený s šablonou, typicky využívaný spíše programátorem.

### JS soubor komponenty
Každá komponenta má JS s ní spojený, ve vlastním souboru, ve své složce.

	//Document ready
	$(function () {
	  someFunction();
	});

	//Descriptive name of the function
	function someFunction(){
	  ...
	  ...
	  ...
	  someOtherFunction();
	}

1. Volání funkcí při document ready, document load, resize, scroll
2. Jednotlivé volané funkce

V 1. pouze voláme další jednotlivé funkce. Funkce by se měla starat o jeden kontréní úkon a podle toho být pojmenována. Funkci by mělo být možné použít na více místech v kódu.


## Vertikální grid

![Vertical grid example](https://i.imgur.com/ddGeumU.png)

Pokud není řečeno jinak, v při kódování je potřeba dodržovat vertikálním grid.
Všechny elementy, především textové musí vertikální grid respektovat.

Od výšky **baseline** se odvíjí výška veškerých elementů

Výška baseline: **24px** (1.5rem)  
Proměná pro baseline: **\$baseline**

Výška elementů, velikosti mezer, odsazení, výšky řádků atd. se odvíjí od **baseline** a násobků **baseline**.

>Vyjímkou můžou být elementy, které musí dodržovat předem stanovený poměr stran jako např. některé obrázky, či video.





## Obrázky

Všechny původní nebo nezkomprimované obrázky vkládat do **src/images**, poté probíhá komprese / minifikace a obrázky se posílají do **build/images**. S obrázky v **build/images** by se nemělo manipulovat, veškerý úpravy dělat v **src/images**.

Struktura složek a obecná pravidla pro práci s obrázky najdeš v kapitole: [src/images/](#src/images/)

> ❗ Všem obrázkům, které se nahrají do administrace wordpressu, se generují varianty podle nadefinovaných rozměrů. Na toto je potřeba brát zřetel a snažit se mít co nejméně rozměrů a snažit se existující rozměry používat u více komponent (pokud možno). ❗


### Seznam rozměrů obrázků

V SW na správu projektu vytvoř ticket **Seznam rozměrů obrázků**, kde budou vypsané všechny rozměry contentových obrázků, které v projektu jsou. Nezapomínat na responsivní či 2X varianty obrázků.

U rozměrů nezapomeň vypsat k jaké komponentě se tyto rozměry vážou.

Smyslem tohoto ticketu je co nejvíce usnadnit práci programátorovi.

	Seznam rozměrů obrázků

	hp-slider
	1920x720 - největší zrobrazovaný rozměr ( když tam nebudou mít 20 odstavců textu )

	signpost-item
	"square" - 427x427, 854x854
	"landscape" - 427x320, 854x640
	"portrait" - 427x589, 854x1778

	employee-img
	150x150

	posts-item-img
	"desktop" - 200x200
	"velkej mobil" - 150x200
	"malej mobil" - 300x225

>pokud je to možné zaokrouhluj velikosti obrázků na čísla dělitelná pěti, pro lepší čitelnost a práci (100,105,110,115).

> Potřebuješ rozumné testovací obrázky pro content? Zkus [Unsplash Source](https://source.unsplash.com/)


### Základní rozměry obrázků Wordpressu
Rozměry, které jsou výchozí a přítomné.

**Náhled:** 150x150px  
Obrázek se vyřízne na 150x150px, bez ohledu na původní poměr stran.

**Střední:** 300xauto  
Obrázek má šířku 300px a výška se podle toho dopočítá - respektuje původní poměr stran.

**Velký:** 1024xauto  
Obrázek má šířku 1024px a výška se podle toho dopočítá - respektuje původní poměr stran.


### Object fit

S používáním vertikálního gridu je potřeba v některých případech zachovat určitou pěvně dannou výšku obrázku a velice dobře se to řeší pomocí CSS vlastnosti **object-fit**. Nevýhodou je nepodpora v IE11, která se ale dá vyřešit polyfilem jehož soubor najdeš: *src/js/vendor/ofi.js*

Tam kde aplikuji object fit, je pro aktivaci polyfillu potřeba u elementu **img** využít vlastnost font-family:

	img {
	  width: 100%;
	  height: 100%;
	  object-fit: cover;
	  font-family: "object-fit: cover;";
	}

Bližší návod použití polyfilu najdeš na jeho [Github stránce](https://github.com/bfred-it/object-fit-images)

### SVG

SVG soubory vkládáme do "**src/images/..**", kde budou původní a nezkomprimované soubory. Soubory se komprimují a posílají do "**build/images/**", jsou zkomprimované pomocí [svgo](https://github.com/svg/svgo)

#### Práce s svg
Pokud je možné využít SVG a je to kontextuálně výhodnější než rastr, preferovat SVG.

V HTML používat nejlépe jako img, kvůli [lazyloadingu](#lazyloading).

V případě, že potřebujeme v SVG dynamicky zasahovat do vzhledu (např. změna barvy při :hover), vložíme jej inline. 
I přesto ponecháme SVG ve složce images a do HTML jej vkládáme pomocí gulp-file-include viz [HTML](#html)

> Změny barvy svg lze hackovat filtrama. V některých případech se tak vyhneme nustnosti inline SVG, ale pozor na podporu v IE11
> https://css-tricks.com/solved-with-css-colorizing-svg-backgrounds/



## Lazyloading

Pro aktivaci lazyloadingu se používá atribut **data-\*** (data-src, data-srcset, data-sizes), použít zejména na všechny obrázky.


> Není potřeba vyplňovat src nebo srcset (případně sizes). Knihovna [lazyload](https://github.com/verlok/lazyload) neskrývá obrázky před vyhledávači. Tyto atributy jako je src, musí přesto být uvedeny. Prázdné, ale uvedeny.

    <img src="" data-src="images/fancy-image.jpg" alt="">

> Varianta s _srcset_ a _sizes_

   	<img src="" data-src="lazy.jpg" srcset="" data-srcset="img-01-400x400.jpg 400w, img-01-800x800.jpg 800w" sizes="" data-sizes="100w" alt="">

> Picture tag s breakpointy a variantou obrázků pro retinu

    <picture>
      <source media="(min-width: 1200px)" srcset="" data-srcset="img-01-1200xauto.jpg 1x, img-01-2400xauto.jpg 2x">
      <source media="(min-width: 800px)" srcset="" data-srcset="img-01-800xauto.jpg 1x, img-02-1600xauto.jpg 2x">
      <img src="" data-src="lazy.jpg" alt="">
    </picture>

>❗ Pokud je to možné, snaž se zařídit, aby ve stránce byl prostor pro obrázek ještě před jeho načtením. Nechceme, aby po načtení obrázku poskočil obsah celé stránky. Idální je mít pro uživatele zobrazený placehoder obrázku, např. ve formě jemně šedého prostoru, na ploše, kde bude obrázek vykreslen.

>Lazyloading má nastavený offset 400px, tedy pokud uživatel doscroloval na úroveň 400px před hranicí obrázku, je odpáleno stahování.

Lazyloading lze stejně použít i pro video a iframe viz [lazyload](https://github.com/verlok/lazyload).


## V průběhu realizace projektu
Commituj do repozitáře ideálně po vytvoření jednoho logického celku (sekce stránky, komponenta, atd.)

Do zprávy commitu konkrétně napiš co jsi dělal, aby na základně toho popisu bylo snadné tento commit zpětně dohledat.

Po commitu nahraj dosavadní výsledek na *brilo.work* do složky dle vzoru: 
	
	[jméno-projektu]-layout.brilo.work
	brilo-theme-layout.brilo.work

V případě že se projekt nebude u nás nasazovat a jde pouze o kodérskou práci, suffix **-layout** vynecháme.


## Vstupní Checklist
Co vše udělat hned při zahájení práce na projektu:

- [ ] Změnit jméno **theme** složky na jméno projektu (Týká se projektů, jež používají codebase BriloTheme né přimo BriloTheme produktu)
- [ ] **wordpress-header.scss** přepsat info o projektu (Týká se projektů, jež používají codebase BriloTheme né přimo BriloTheme produktu)
- [ ] Konrola grafických zdrojů:
	- [ ] Mám definované barvy projektu
	- [ ] Mám dodané zdroje ve správných formátech
	- [ ] Čvercový SVG zdroj pro **favicon**

- [ ] V index.html změnit název projektu v H1 a title
- [ ] Zamyslet se, co jsem neudělal na posledním projektu idálně, a vymyslet jak to na tomto projektu udělám lépe.

## Výstupní Checklist
Co vše je potřeba zkotrolovat před ukončením projektu. Do určté míry i předtím než uvidí dosavadní výsledek klient:

- [ ] Zkontroluj si všechny prohlížeče (Chrome, Firefox, Edge, Safari, IE11)
	- [ ] Zkontroluj ještě jednou IE11
- [ ] Jsou připravené **project notices**?
- [ ] Stránka 404
- [ ] Schema.org "šablony"
- [ ] **wordpress-header.scss** přepsané info o projektu (Týká se projektů, jež používají codebase BriloTheme né přimo BriloTheme produktu)
- [ ] V index.html pouze relevatní odkazy a spráný název projektu
- [ ] Ajax **loading** stavy pro výpis itemů a tlačítko.
- [ ] Favicona
- [ ] Před deployem použít defaultní **gulp** - PurgeCSS + cssnano
	- [ ] Projít projekt a zkontrolovat jeslti PurgeCSS nesmazal něco co neměl.
- [ ] **user-select: none;** na tlačítkách a jiných ovládacích prvcích.
- [ ] **draggable="false"**  na grafice v pozadí, obrázcích, které jsou součátstí ovládaích prvků, atd.
- [ ] ticket **"Seznam rozměrů obrázků"**
- [ ] Odstranění zbytečných console.log() z JS
- [ ] Odstranění nepoužitých komponent a kódu obecně.
- [ ] Zamyslet se, co jsem na tomto projektu neudělal ideálně, a vymyslet jak to příště udělám lépe.






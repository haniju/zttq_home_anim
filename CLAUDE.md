# ZTTQ Home Animation

## Contexte du projet

Site vitrine pour **Zététique** (consulting en agilité organisationnelle), centré sur une **animation scroll-driven** sur la page d'accueil. L'animation utilise des SVG animés (abeilles qui suivent des trajectoires, traces pointillées) dont la lecture est pilotée par le scroll utilisateur.

### Objectif en cours

Extraire et mettre au propre l'animation scroll de la home page :
- Debug et amélioration des contrôles scroll (wheel + touch)
- Ajout de style : ombres portées, animations léchées
- Nettoyage du code inutile (le site complet a des pages contact, FAQ, vision... qui ne seront pas conservées)
- Extraction des SVG inline hors des templates HTML (actuellement tout est dans les fichiers `-tpl.html`)
- Présentation sur une page web simple et autonome

## Stack technique

- **AngularJS 1.7.9** (pas Angular moderne) avec UI-Router
- **jQuery 3.5.1** + jQuery scrollTo
- **Angular Material 1.1.12**
- **Bootstrap 4.4.1** / Popper
- Pas de bundler, pas de npm : tout est en fichiers statiques avec libs vendored dans `js/libs/`
- CSS natif avec `@import` dans `base.css`, variables CSS custom
- Police custom : Cera Pro (fichiers .otf dans `images/Cera_Pro/`)

## Architecture des fichiers clés

### Moteur d'animation (le coeur du projet)
- `js/animation/home.js` : moteur scroll custom - intercepte wheel/touch, pilote `setCurrentTime()` sur les SVG, gère les steps (pauses d'animation, transitions)
- `css/chat.css` : transitions d'apparition des bulles de texte (slide-in gauche/droite)
- `css/beehavior.css` : animations CSS des abeilles (wiggle, beeOutIn, butinage, vibrations)
- `css/wiggle.css` : animation wiggle générique

### SVG animés (inline dans les templates)
- `html/home/zttq-home-section-a-tpl.html` (~1063 lignes) : section 1 - SVG avec trajectoires d'abeilles, pluie, textes animés
- `html/home/zttq-home-section-a2-tpl.html` (~734 lignes) : section 2 - SVG danse des abeilles, ruche
- `html/home/zttq-home-section-b-tpl.html` (~307 lignes) : section 3 - SVG sortie de ruche, abeilles décor
- Les SVG utilisent des `<animate>`, `<animateMotion>`, `<animateTransform>` SMIL natifs

### Structure applicative AngularJS
- `js/config.js` : variables globales (version, URLs, timeouts)
- `js/app/site.module.js` : module Angular + directive offClick + loading screen
- `js/app/site.config.js` : routes UI-Router (home, contact, proposition, vision, faq, mentions)
- `js/app/components/home/zttq-home-section.component.js` : composants des sections (appellent `animeInit1()`, `chatAnimA()`, etc.)
- `html/zttq-home-tpl.html` : assemblage des sections (splash > section-a > section-a2 > section-b > footer)

### Assets
- `images/abeilles/` : sprites d'abeilles (repos/vol, différentes tailles)
- `images/fonds/` : fonds desktop/mobile (PNG)
- `images/traces/` : fichiers SVG séparés (section.svg, section_1/2/3.svg, mobile_*)

## Comment ça marche : le moteur scroll

`animeInit1()` dans `home.js` :
1. Intercepte `wheel` et `touchmove` sur le conteneur `.zttq-premiere`
2. Convertit les deltas en un `virtualScroll` (position virtuelle dans la timeline)
3. Un `stepArray` découpe la timeline en étapes : certaines scrollent la page (`boolScroll: true`), d'autres pausent le scroll pour laisser jouer une animation SVG (`boolScroll: false`)
4. `setCurrentTime(t)` + `pauseAnimations()` pilotent chaque SVG au temps correspondant au % de scroll
5. Les bulles de texte (`.chat`) apparaissent via ajout de classe `chat-transition` quand le scroll dépasse leur `data-precentspawn`

## Points d'attention

- Les deux fichiers HTML d'entrée `index.html` et `site.html` sont quasi-identiques (index.html est une version simplifiée sans header ni sections c/d/e)
- Beaucoup de code commenté dans les fichiers (versions online/offline des libs, alternatives CSS)
- Les SVG inline contiennent des styles avec des noms de classes qui peuvent entrer en conflit (.st0, .st1... sont dupliqués entre sections)
- Le fichier `images/traces/` contient des SVG séparés qui ne semblent pas utilisés par le code actuel (potentiellement une version antérieure ou mobile)
- Typo dans le code : `data-precentspawn` (au lieu de `percentSpawn`)

## Conventions

- Langue du code : anglais pour les noms de variables/fonctions, français pour le contenu texte
- Pas de linter, pas de tests
- Commentaires en français et anglais mélangés

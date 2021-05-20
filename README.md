# README #

### Installation ###
# git clone
1. git clone https://Johandrex@bitbucket.org/Johandrex/riksintressen.git

# gå in i klonen
2. cd riksintressen

# installera node moduler i projektet
3. npm install @angular/core @angular/forms @angular/common @angular/material @angular/router @angular-devkit/build-angular tailwindcss postcss-loader postcss-scss postcss-import autoprefixer @angular-builders/custom-webpack ngx-pagination ngx-order-pipe @ng-select/ng-select

# starta applikationen
4. ng serve

### Beskrivning ###

Angular är ett modulbaserat ramverk bestående av ett flertal bibliotek med essentiella och valfria funktionaliteter som ger grogrund för ett objektorienterat tillvägagångssätt i programmeringen. Angular utgör således en form av applikationsarkitektur som gör det möjligt att förhållandevis enkelt återanvända programmets beståndsdelar och säkerställa som kan användas för en effektivare och mer flexibel utveckling. Arkitekturen är överlag moduler, komponenter, tjänster och modell-klasser. En komponent utgörs av en vy, en stilmall och en kontroll som tillsammans ger upphov till en grafisk beståndsdel i gränssnittet. En modul är en samling klasser eller komponenter. Tjänsterna hanterar information som kommuniceras mellan komponenter, API:er och övriga klasser. Modell-klasserna är i princip klasser med attribut som utgör mallar för de data-objekt som ska hanteras, vanligtvis med koppling till data på en databas. (Angular, 2021) 

Härmed presenteras därför de komponenter som utgör webbtjänstens olika delar som användaren på något vis interagerar med. 

# Navigationsmeny 

Navigationsmenyn finns längst upp på sidan som header och består av en logga och en meny. Menyn är uppbyggd med några av verktygen som användaren kan använda för att t.ex. visa en lista över riksintressen, skapa nya riksintressen eller modifiera polygoner. 

# Vänstra Sidofält (lista) 

I applikationens vänstra sidofält finns en lista över riksintressen. När användaren går in på sidan initieras listan med data från API:n. I listan kan användaren söka, sortera och filtrera på riksintressena via inbyggda Angular komponenter som nyttjades vid skapandet av listan. När användaren väljer ett riksintresse hämtas riksintresset via API:n och lagras i shared-data.services.ts. När API:n har hämtat riksintresset öppnas det upp i det högra sidofältet, där användaren har möjlighet att redigera riksintresset. 

# Högra Sidofält (Information) 

Det högra sidofältet är till för information. I sidofältet finns ett antal komponenter som visas eller döljs utifrån användaren interaktioner. När användaren först besöker webbsidan visas sidofältet med information om applikationen och hur användaren interagerar med verktygen som finns tillgängliga. Ifall användaren exempelvis väljer att trycka på ett riksintresse i listan visas istället information om det riksintresset som komponent i det högra sidofältet istället för “generell information”-komponenten. Användaren kan då välja att trycka på “redigera”, vilket öppnar en annan komponent i sidofältet som låter användaren modifiera ett riksintresse. 

# Interaktiv Karta 

Kartan som finns i webbapplikationen presenteras och skapas med JavaScript-biblioteket OpenLayers. Kartan består av de geografiska polygonerna från GeoServern som visar riksintressena. Tanken är att användaren ska kunna trycka på en polygon och då få upp information om riksintresset i det högra sidofältet. Användaren kan även rita och modifiera redan existerande polygoner, samt lägga till nya som kopplas till nya riksintressen.  
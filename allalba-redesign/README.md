# Redesign — Hotel Terme All'Alba (allalba.it)

Proposta di redesign moderno e responsive per il sito dell'Hotel Terme All'Alba,
SPA Hotel 4 stelle di Abano Terme.

## Come visualizzarla

Aprire `index.html` in un browser. La pagina è completamente autonoma
(HTML + CSS + JS in un unico file, nessuna build necessaria).

## Concept di design

- **Palette "Alba termale"**: oro dell'alba (`#c99a4b`) per gli accenti e le CTA,
  petrolio/acqua termale (`#123b46`, `#2e7787`) per le sezioni immersive,
  avorio caldo (`#faf6ef`) per i fondi chiari.
- **Tipografia**: Cormorant Garamond (titoli, eleganza classica da hotel 4 stelle)
  abbinata a Jost (testi e UI, tono contemporaneo).
- **Funzionalità**: barra "verifica disponibilità" con date validate, form preventivo
  con email precompilata verso info@allalba.it, menu mobile, navigazione con voce
  attiva, animazioni reveal allo scroll, mappa Google integrata, pulsante torna-su.

## Immagini

L'ambiente di sviluppo non poteva raggiungere allalba.it per scaricare le foto
originali, quindi ogni slot immagine ha un fallback grafico a tema (gradienti
alba/acqua) e la pagina è presentabile anche così.

Per usare le foto reali del sito attuale è sufficiente copiarle nella cartella
`img/` con questi nomi (appariranno automaticamente, senza toccare il codice):

| File | Soggetto suggerito |
|---|---|
| `img/hero-piscina-esterna.jpg` | Piscina termale esterna al tramonto/alba (hero) |
| `img/hotel-esterno.jpg` | Facciata dell'hotel / parco |
| `img/camera-superior.jpg` | Camera Superior |
| `img/junior-suite.jpg` | Junior Suite |
| `img/spa-suite.jpg` | SPA Suite (vasca di coppia / terrazza) |
| `img/family-suite.jpg` | Family Suite |
| `img/piscina-termale-interna.jpg` | Piscina termale interna |
| `img/ristorante-sala.jpg` | Sala ristorante |

## Contenuti

Testi e informazioni (camere, terme, ristorante, offerte, contatti) provengono
dai contenuti pubblici del sito attuale www.allalba.it.

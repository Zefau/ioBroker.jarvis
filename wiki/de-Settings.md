## Einführung

Mithilfe der Einstellungen kann jarvis an die eigenen Bedürfnisse angepasst werden.

Die meisten Einstellungen können direkt in jarvis vorgenommen werden. Besondere Einstellungen können manuell durchgeführt werden, siehe dazu [Experten-Einstellungen](#Experten-Einstellungen).


## Liste der möglichen Einstellungen

### Seiteneinstellungen
| Parameter | Beschreibung | Information | Typ | Standard |
| - | - | - | - | - |
| `language` | Spracheinstellung von jarvis | - | Select (`de-DE,_translated`, `en-GB,_translated`) | `() => i18n.getLanguage(true)` |
| `pageFavicon` | Favicon im Browser | base64 Wert der Grafik | Text | - |
| `pageTitle` | Titel im Browser | - | Text | `jarvis - just another remarkable vis` |
| `LastChangeBody` | Zeitformat LastChangeBody | Globales Zeitformat der LastChangeBody Komponente. Für mögliche Werte, siehe date-fns Dokumentation. | Text | `DistanceToNow` |

### Theme Einstellungen
| Parameter | Beschreibung | Information | Typ | Standard |
| - | - | - | - | - |
| `themeDarkMode` | Dark Mode | - | Switch | - |
| `themeColorPrimary` | Primäre Farbe des Themes | [Der Farbwert kann ein Wert aus der Farbpalette in der Form `HUE\|SHADE` (z. B. `blue\|700`) sein. Alternativ kann ein Hex oder RGB angegeben werden.](https://material-ui.com/customization/color/#color-palette) | Text | `blue\|700` |
| `themeColorSecondary` | Sekundäre Farbe des Themes | [Der Farbwert kann ein Wert aus der Farbpalette in der Form `HUE\|SHADE` (z. B. `pink\|500`) sein. Alternativ kann ein Hex oder RGB angegeben werden.](https://material-ui.com/customization/color/#color-palette) | Text | `pink\|500` |
| `defaultBoxIcon` | Standard Widget-Box Icon | - | Text | `home` |
| `hideTopBar` | TopBar ausblenden | - | Switch | - |
| `columnsOnSmallScreenSizes` | Spalten auf kleinem Bildschirm | Anzahl der Spalten auf Bildschirmen mit einer Breite zwischen 600-960px. | Select (`12,_translated`, `1,_translated`, `2,_translated`, `3,_translated`, `4,_translated`, `6,_translated`) | `2` |
| `columnsOnMediumScreenSizes` | Spalten auf mittleren Bildschirm | Anzahl der Spalten auf Bildschirmen mit einer Breite zwischen 960-1280px. | Select (`12,_translated`, `1,_translated`, `2,_translated`, `3,_translated`, `4,_translated`, `6,_translated`) | `2` |
| `columnsOnLargeScreenSizes` | Spalten auf großem Bildschirm | Anzahl der Spalten auf Bildschirmen mit einer Breite zwischen 1280px-1920px. | Select (`12,_translated`, `1,_translated`, `2,_translated`, `3,_translated`, `4,_translated`, `6,_translated`) | `12` |
| `columnsOnExtraLargeScreenSizes` | Spalten auf sehr großem Bildschirm | Anzahl der Spalten auf Bildschirmen mit einer Breite über 1920px. | Select (`12,_translated`, `1,_translated`, `2,_translated`, `3,_translated`, `4,_translated`, `6,_translated`) | `12` |

### Mobile Einstellungen
| Parameter | Beschreibung | Information | Typ | Standard |
| - | - | - | - | - |
| `hideQuickJumper` | Verstecke QuickJumper | - | Switch | - |


## Experten-Einstellungen
Die Einstellungen für ioBroker.jarvis erfolgen im [JSON-Format](https://de.wikipedia.org/wiki/JavaScript_Object_Notation) und finden sich im Datenpunkt `jarvis.0.settings`.

Alle oben genannten über das grafische Interface konfigurierbare Einstellungen werden von jarvis in das JSON Format übertragen und könnten daher ebenso manuell via JSON gemacht werden.

Die nachfolgenden Einstellungen sind aktuell nicht über die grafische Benutzeroberfläche einstellbar und nur über das manuelle konfigurieren des JSON möglich.


### Einstellung `theme `
Alle Einstellungen des Themes können mit der Einstellung `theme` überschrieben werden.

#### Format
```
{
   ... weitere Einstellungen ...
   "theme": {
      ... Theme Einstellungen ...
   }
}
```

Alle Theme Einstellungen sind unter [Theme-Konfigurationsvariablen](https://material-ui.com/de/customization/theming/#theme-konfigurationsvariablen) dokumentiert.


#### Beispiel
```
{
   "theme":{
      "typography":{
         "subtitle1":{
            "fontSize":12
         },
         "body1":{
            "fontWeight":500
         },
         "button":{
            "fontStyle":"italic"
         }
      }
   }
}
```

### Einstellung `translations`
Alle Übersetzungen können mit `translations` überschrieben werden.

#### Format
```
{
   ... weitere Einstellungen ...
   "translations": {
      "Sprache": {
         "Wort 1": "Übersetzung 1",
         "Wort 2": "Übersetzung 2",
         ... weitere Übersetzungen ...
      }
   }
}
```

#### Beispiel
```
{
   "translations": {
      "de": {
         "user#location": "Ort des Benutzers"
      }
   }
}
```

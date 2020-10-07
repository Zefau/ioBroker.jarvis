## Einführung

Mithilfe der Einstellungen kann jarvis an die eigenen Bedürfnisse angepasst werden.

Die meisten Einstellungen können direkt in jarvis vorgenommen werden. Besondere Einstellungen können manuell durchgeführt werden, siehe dazu [Experten-Einstellungen](#Experten-Einstellungen).


## Liste der möglichen Einstellungen
{SETTINGS}


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

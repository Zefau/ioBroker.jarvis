# Geräte

Ein Gerät stellt Element dar, welches durch einen Namen, Gewerk und seine Zustände (`States`) beschrieben ist, z. B. ist das Vitrinenlicht (Name) ein Licht (Gewerk) mit den Zuständen `power` (an/aus), `level` (bzw. `dimmer`) und ggf. einer Farbauswahl (`colorTemperature`, `rgb` / `hue`).
Mehr über die Gewerke kann [hier nachgelesen](de-Functions) werden.


# Gerätekonfiguration

Die Gerätekonfiguration kann in den jarvis Einstellungen je Gerät vorgenommen werden.

![Gerätekonfiguration](https://raw.githubusercontent.com/Zefau/ioBroker.jarvis/master/wiki/de-Gerätekonfiguration.png)


## Konfiguration der Datenpunkte / States

| Label | Information | Format |
| ----- | ----------- | ------ |
| Datenpunkt (Anzeige) (`state`) | Datenpunkt dessen State als Wert angezeigt wird | text |
| Datenpunkt Stil (`stateStyle`) | Stil des angezeigten Wertes (im JSON Format) | json |
| Anzeigevariante (`display`) | Texte die den angezeigten Wert ersetzen (im JSON Format) | json |
| Label (`label`) | - | text |
| Einheit (`unit`) | Einheit des Datenpunkts, z. B. % oder ° | json |
| Datenpunkt (Trigger) (`action`) | Datenpunkt der zum Schalten getriggert wird | text |
| Icon (`icon`) | [Material Icon (klick zur Ansicht aller Icons)](https://materialdesignicons.com/) | json |
| Icon Stil (`iconStyle`) | Stil des Icons (im JSON Format) | json |


## JSON Eingabefelder

Für alle Datenpunkte, die das Format `json` haben, können die Inhalte abhängig des Wertes des Datenpunkts definiert werden.

Die durch jarvis definierten Voreinstellungen sind durch das jeweilige Gewerk des Geräts vorgegeben und können durch die Angabe direkt im Gerät (vgl. Screenshot oben) überschrieben werden. Die [definierten Voreinstellungen können unter Gewerke](de-Functions) eingesehen werden.

### Display

Mit Display können die Werte des Datenpunkts durch einen Bezeichner bzw. ein Label ersetzt werden.
Das einfachste Beispiel für ein Licht mit an (Wert `true`) und aus (Wert `false`):
```
{
   "true": "an",
   "false": "aus"
}
```

oder für einen Staubsauger-Roboter (links der Wert aus ioBroker, rechts die Darstellung in jarvis):
```
{
   "101":"QUIET",
   "102":"BALANCED",
   "103":"TURBO",
   "104":"MAXIMUM",
   "105":"MOP",
   "106":"CUSTOM"
}
```


### Icon

Beispielsweise kann für das Vitrinenlicht für den Zustand `power` jeweils ein Icon für an und aus angezeigt werden:

Hier ist im Feld `Icon` folgendes einzutragen:
```
{
   "true": "lightbulb-on",
   "false": "lightbulb-off-outline"
}
```

Der Wert `default` kann als Fallback genutzt werden, sofern kein Operator zutrifft. Beispielsweise für `level` / `dimmer` beim Licht:
```
{
   "default": "lightbulb-on",
   "0": "lightbulb-off-outline"
}
```

Es können ebenfalls die Operatoren `<`, `<=`, `>`, `>=` und `!=` genutzt werden. Beispielsweise für `level` beim Jalousie / Rollo:
```
{
   "default":"window-shutter-open",
   ">90":"window-shutter-open",
   "<=90":"window-shutter"
}
```

oder für eine Batterie:
```
{
   ">80":"battery-high",
   "<=80":"battery-medium",
   "<=30":"battery-low",
   "<=10":"battery-outline",
   "<=5":"battery-alert-variant-outline"
}
```


### Datenpunkt / Icon Stil

Die Konfiguration des Datenpunkt und Icon Stils erfolgt mittels [CSS](https://wiki.selfhtml.org/wiki/CSS/Tutorials/Einstieg/Syntax).

Die Definition erfolgt ebenfalls in Abhängigkeit zum Wert des Datenpunkts. Beispielsweise für `power`:
```
{
   "true":{
      "color":"#090",
      "fontWeight":"bold"
   },
   "false":{
      "color":"#999"
   }
}
```
*(an wird grün und dick, aus grau dargestellt)*



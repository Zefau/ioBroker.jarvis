# Geräte

Ein Gerät stellt Element dar, welches durch einen Namen, Gewerk und seine Zustände (`States`) beschrieben ist, z. B. ist das Vitrinenlicht (Name) ein Licht (Gewerk) mit den Zuständen `power` (an/aus), `level` (bzw. `dimmer`) und ggf. einer Farbauswahl (`colorTemperature`, `rgb` / `hue`).
Mehr über die Gewerke kann [hier nachgelesen](de-Functions) werden.


# Gerätekonfiguration

Die Gerätekonfiguration kann in den jarvis Einstellungen je Gerät vorgenommen werden.

![Gerätekonfiguration](https://raw.githubusercontent.com/Zefau/ioBroker.jarvis/master/wiki/de-Gerätekonfiguration.png)


## Konfiguration der Datenpunkte / States

{DEVICE_STATES_CONFIG}


## Datenpunkt Eigenschaften

Mit den Datenpunkt Eigenschaften können die Standardwerte für die visuellen Komponenten (Body Element `bodyElement` sowie Action Element `actionElement`) überschrieben werden.

Die folgenden Eigenschaften stehen zur Verfügung:
- `on` (Standard `true`): Definiert den Wert, der beim Einschalten gesetzt werden soll. Dieser Wert wird für `SwitchAction`, `IconButtonAction` und `ButtonAction` genutzt.
- `off` (Standard `false`): Definiert den Wert, der beim Ausschalten gesetzt werden soll. Dieser Wert wird für `SwitchAction` genutzt.
- `min` (Standard `0`) / `max` (Standard `100`): Definiert den unteren und oberen möglichen Wert eines Geräts. Dieser Wertebereich wird für `LevelBody` genutzt.
- `level` (Standard `100`): Definiert das initiale Dimmlevel beim Einschalten eines Dimmers.

Die Angaben sind im JSON Format zu machen, analog der [JSON Eingabefelder](#datenpunkt-eigenschaften).
**Beispiel**
![Datenpunkt Eigenschaften](https://raw.githubusercontent.com/Zefau/ioBroker.jarvis/master/wiki/de-Devices-Properties.png)


## JSON Eingabefelder

Für alle Datenpunkte, die das Format `json` haben, können die Inhalte abhängig des Wertes des Datenpunkts definiert werden.

Die durch jarvis definierten Voreinstellungen sind durch das jeweilige Gewerk des Geräts vorgegeben und können durch die Angabe direkt im Gerät (vgl. Screenshot oben) überschrieben werden. Die [definierten Voreinstellungen können unter Gewerke](de-Functions) eingesehen werden.

Erlaubte Operatoren sind `<`, `<=`, `>`, `>=` und `!=`.

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



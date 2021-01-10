# Häufig gestellte Fragen

## Übersicht

- [General](#General)
  - [Button / Switch Size](#button--switch-size)
  - [Trotz manuell geänderter Anzeigevariante wird Wert aus Datenpunkt visualisiert - Fehler?](#trotz-manuell-geänderter-anzeigevariante-wird-wert-aus-datenpunkt-visualisiert---fehler)
  - [Alternative Anzeigewerte](#alternative-anzeigewerte)
  - [Wie konfiguriere ich ein Dropdown Feld?](#wie-konfiguriere-ich-ein-dropdown-feld)
  - [Farben mit LightHueBody bzw. LightColorBody beim hue-extended sind falsch](#farben-mit-lighthuebody-bzw-lightcolorbody-beim-hue-extended-sind-falsch)
  - [Databinding for Labels / Titles](#databinding-for-labels--titles)
  - [Verbindungsparameter / Connection parameters (Proxy, Docker)](#verbindungsparameter--connection-parameters-(proxy,-docker))
  - [Nach einem Update ist die Konfiguration verschwunden?](#nach-einem-update-ist-die-konfiguration-verschwunden)
  - [Wie kann ich Geräte und Layout direkt editieren](#wie-kann-ich-geräte-und-layout-direkt-editieren)
  - [Log Eintrag: discarded x devices due to incorrect configuration](#log-eintrag-discarded-x-devices-due-to-incorrect-configuration)
  - [Schieberegler konfigurieren](#schieberegler-konfigurieren)
  - [Buttons konfigurieren](#buttons-konfigurieren)
  - [Meine alias Geräte werden nicht importiert / My alias devices are not imported correctly](#meine-alias-geräte-werden-nicht-importiert--my-alias-devices-are-not-imported-correctly)
- [:bug: bug](#:bug:-bug)
  - [Unterstützung für relative Pfade](#unterstützung-für-relative-pfade)
- [:gem: Design / Theme](#:gem:-Design-/-Theme)
  - [Falsche Darstellung der Spalten auf dem Tablet](#falsche-darstellung-der-spalten-auf-dem-tablet)
  - [Eigene icons benutzen / How to use your own icons](#eigene-icons-benutzen--how-to-use-your-own-icons)
  - [Desktop vs. Mobil - Relative Höhe des Widgets](#desktop-vs-mobil---relative-höhe-des-widgets)
  - [Icon Stil ](#icon-stil-)
- [foreign issue](#foreign-issue)
  - [Deconz XY CIE  Farbwahl](#deconz-xy-cie--farbwahl)
- [Module AdapterStatus](#Module-AdapterStatus)
  - [Nur bestimmte Adapter auflisten oder ausschließen](#nur-bestimmte-adapter-auflisten-oder-ausschließen)
- [Module CustomHTML](#Module-CustomHTML)
  - [Desktop vs. Mobil - Relative Höhe des Widgets](#desktop-vs-mobil---relative-höhe-des-widgets)
- [Module DateTime](#Module-DateTime)
  - [DateTime module is left aligned instead of centered](#datetime-module-is-left-aligned-instead-of-centered)
- [Module DisplayImage](#Module-DisplayImage)
  - [DisplayImage == iobroker state](#displayimage-==-iobroker-state)
- [Module StateList](#Module-StateList)
  - [SwitchAction Trigger Element / Settings für eigenen Objektwert fehlt](#switchaction-trigger-element--settings-für-eigenen-objektwert-fehlt)
- [Module Weather](#Module-Weather)
  - [Sie sind kein registrierter Benutzer der daswetter.com-API ](#sie-sind-kein-registrierter-benutzer-der-daswettercom-api-)
- [wontfix](#wontfix)
  - [Unterstützung für relative Pfade](#unterstützung-für-relative-pfade)


## Fragen und Lösungen

### General

#### Button / Switch Size
[Siehe vollständige und Lösung Beschreibung im Issue](https://github.com/Zefau/ioBroker.jarvis/issues/526).

Mir ist gerade aufgefallen das die Spalten Größe unterschiedlich ist z.b. zwischen Switch und Button, kannst du das anpassen oder muss man dies auch via css lösen?

![image](https://user-images.githubusercontent.com/25475385/103238990-98830e80-494c-11eb-9955-7de4f8750bd5.png)
![image](https://user-images.githubusercontent.com/25475385/103239026-ae90cf00-494c-11eb-8546-d06ffd596fa3.png)

***


#### Trotz manuell geänderter Anzeigevariante wird Wert aus Datenpunkt visualisiert - Fehler?
[Siehe vollständige und Lösung Beschreibung im Issue](https://github.com/Zefau/ioBroker.jarvis/issues/519).

Ich hab die Wikiseite zu JSON gefunden und durch Spielerei in den Devices noch Einiges hinbekommen ;)
Eins blieb mir jedoch unklar:

Ich habe aktuell einen FensterTürKontakt, der den Battery in % rausgibt, die anderen FTKs geben nur BatteryLow=True raus. Hab mir überlegt den einen FTK aus optischen Gründen dann halt mit <=10% als "Batterie schwach" und alles >10% als "Batterie OK" darzustellen. Das funktioniert in sofern, dass der Text zwar dort steht, aber die 29(%) vom Datenpunkt stellt Jarvis dennoch dar. 
Ich hatte gehofft, durch Eintrag der Schwellen in der Anzeigevariante wird der eigentliche Wert automatisch vollständig ausgeblendet. Hab ich das falsch verstanden? Und falls ja, bekomme ich die 29(%) vom Datenpunkt hinter dem Text dann auf eine andere Art  ausgeblendet?

<img width="574" alt="Bildschirmfoto 2020-12-28 um 01 37 37" src="https://user-images.githubusercontent.com/57875762/103182944-8e5f0280-48af-11eb-8383-6b71e5e145c6.png">

<img width="964" alt="Bildschirmfoto 2020-12-28 um 01 44 41" src="https://user-images.githubusercontent.com/57875762/103182947-928b2000-48af-11eb-97d1-e1e5a2518099.png">

***


#### Alternative Anzeigewerte
[Siehe vollständige und Lösung Beschreibung im Issue](https://github.com/Zefau/ioBroker.jarvis/issues/434).

Hi,
die Werte gehen von -600 bis -100

![image](https://user-images.githubusercontent.com/22169074/101669846-be567b00-3a52-11eb-9b7c-cfbf65c34da6.png)

ist es möglich eine alternative Anzeige zu haben, also 0-100, die Werte aber die gleichen bleiben.
Habe es mit der Anzeige JSON versucht, aber scheint nicht zu greifen. Wie muss das JSON aussehen ? 

Danke dir. 
***


#### Wie konfiguriere ich ein Dropdown Feld?
[Siehe vollständige und Lösung Beschreibung im Issue](https://github.com/Zefau/ioBroker.jarvis/issues/432).

Wie kann ich einen bestimmten Text in das DropDown Feld packen dass dann einen bestimmten Wert in das ioBroker Objekt tut?
***


#### Farben mit LightHueBody bzw. LightColorBody beim hue-extended sind falsch
[Siehe vollständige und Lösung Beschreibung im Issue](https://github.com/Zefau/ioBroker.jarvis/issues/431).

Die Option `Verwenden von XY anstelle von hue (nur für nicht-Philips-Geräte)` ist zu deaktivieren, siehe https://forum.iobroker.net/post/533641.
***


#### Databinding for Labels / Titles
[Siehe vollständige und Lösung Beschreibung im Issue](https://github.com/Zefau/ioBroker.jarvis/issues/390).

In my current visualizations (VIS) i am using often the feature of databinding (from data states) instead of using static labels.

Would be very nice to have the same in jarvices

For example, instead of a static text "Lights in the house" i would like to use databinding:
{javascript.0.clement.shelly.vis.subtitle_tablet}

Then the dynamic label could be like "There are 7 from 23 lights switched on"

Would be very useful also for tabtitles. My usecase on tabs is that i want to visualize that "something is wrong" within this tab, like a error or something like this.
***


#### Verbindungsparameter / Connection parameters (Proxy, Docker)
[Siehe vollständige und Lösung Beschreibung im Issue](https://github.com/Zefau/ioBroker.jarvis/issues/349).

Die Verbindungsparameter sind an die URL mittels Raute (`#`) anzufügen und mit einem Und (`&`) voneinander zu trennen, beispielsweise:
```
http://<ioBrokerIp>:<ioBrokerWebPort>/#instance=1&socketSecure=true&socketPort=8082&socketHost=192.168.178.29&keepParams=true
```

| Parameter | Beschreibung |
| --------- |:--------- |
| `instance` | Die ioBroker.jarvis Instanz von der die Daten (Geräte, Layout und Einstellungen) genutzt werden sollen |
| `socketHost` | Socket Host, zu dem verbunden werden soll, i.d.R ioBroker IP, siehe auch https://github.com/Zefau/ioBroker.jarvis/issues/304. |
| `socketPort` | Socket Port, zu dem verbunden werden soll. In der Regel `8082` beim Einsatz des integrierten Sockets des Web-Adapters oder `8084` im Falle der Nutzung des socket.io Adapters. |
| `socketSecure` | Socket Transportverschlüsselung, die genutzt werden soll: `false` für `http://` oder `true` für `https://`. |
| `debug` | Aktiviert das ausführliche Development-Debugging in der Browser-Konsole. |
| `keepParams` | Die Parameter werden im Browser Cache gespeichert und genutzt, bis diese (manuell oder automatisch vom Browser) gelöscht werden. Mit dieser Option werden die Parameter in der URL behalten. |

_____

The connection parameters will be appended to the URL using `#` and separated via `&`, e.g.
```
http://<ioBrokerIp>:<ioBrokerWebPort>/#instance=1&socketSecure=true&socketPort=8082&socketHost=192.168.178.29&keepParams=true
```

| Parameter | Description |
| --------- |:--------- |
| `instance` | The ioBroker.jarvis instance the data (device, layout and settings) shall be retrieved from. |
| `socketHost` | Socket host the connection shall be established to, usually the ioBroker IP, see https://github.com/Zefau/ioBroker.jarvis/issues/304. |
| `socketPort` | Socket port which shall be used. Usually `8082` using the integrated Web adapter socket or `8084` in case of socket.io adapter. |
| `socketSecure` | Socket transport protocol which shall be used: `false` for `http://` or `true` for `https://`. |
| `debug` | Activates the detailed development log in the browser console. |
| `keepParams` | All parameters are saved to the browsers cache and used as long as they are manually or automatically deleted. With this option you may keep the parameters in the URL. |

***


#### Nach einem Update ist die Konfiguration verschwunden?
[Siehe vollständige und Lösung Beschreibung im Issue](https://github.com/Zefau/ioBroker.jarvis/issues/328).

Ich habe gerade auf die aktuelle Version hochgezogen und anscheinend ist jetzt meine Konfig nicht mehr vorhanden bzw. kann darauf nicht mehr zugegriffen werden.
Bekomme jetzt nur mehr den Startscreen wie beim ersten Start zu sehen

![image](https://user-images.githubusercontent.com/73381262/98462133-167b3280-21b2-11eb-9bfa-429cbaa52264.png)

in der layout.json stehen die Einstellungen noch korrekt drinn.
![image](https://user-images.githubusercontent.com/73381262/98462205-a5884a80-21b2-11eb-9fcd-807229d77913.png)
***


#### Wie kann ich Geräte und Layout direkt editieren
[Siehe vollständige und Lösung Beschreibung im Issue](https://github.com/Zefau/ioBroker.jarvis/issues/313).

Ich möchte gerne Geräte und Layout direkt per SSH und VSCODE editieren können. Wo sind die Dateien gespeichert?

![image](https://user-images.githubusercontent.com/20707078/98254265-607ad300-1f7c-11eb-8148-0cf3b02bab06.png)
***


#### Log Eintrag: discarded x devices due to incorrect configuration
[Siehe vollständige und Lösung Beschreibung im Issue](https://github.com/Zefau/ioBroker.jarvis/issues/285).

I found this entry in the log:

<img width="1264" alt="Bildschirmfoto 2020-10-31 um 10 06 31" src="https://user-images.githubusercontent.com/57875762/97775477-2fa43380-1b61-11eb-88fc-b64a1dc926cb.png">

I guess there are some old devices not configured properly, but it's quite hard to find the right device for fixing or even deleting it. I can imagine I auto-added some of my deconz-devices in Jarvis1.0.9. These were not configured quite well, so I manually deleted most of them. Is it possible these devices show up in log with "incorrect config" although already deleted?
***


#### Schieberegler konfigurieren
[Siehe vollständige und Lösung Beschreibung im Issue](https://github.com/Zefau/ioBroker.jarvis/issues/229).

Bei Rollos ist ein schieberegler 0-100% eingestellt
bei Heizung 0-35°C jeweils mit Schrittweite 1

ich würde gerne, vorallem bei der Heizung, den unteren und oberen Endwert einstellen können (z.b. 15-25°C) und die schrittweite mit 1° ist mir zu viel. ich würde es gerne auf 0,5 oder 0,1 grad einstellen.

aktuell ist meine sollraumtemperatur nämlich auf 22,5°C
***


#### Buttons konfigurieren
[Siehe vollständige und Lösung Beschreibung im Issue](https://github.com/Zefau/ioBroker.jarvis/issues/228).

Hi. Gibt es eine möglichkeit buttons zu konfigurieren?
ich benötige unter anderem auch buttons, welche anstatt true auch false senden
oder auch buttons, welche befehle per http request starten.

Und diese buttons bitte auch frei beschriftbar. aktuell habe ich bei jarvis überall die "anschalten" buttons im einsatz
auf meiner node-red visu sind die buttons direkt beschriftet, z.b. mit "Messvorgang starten" 

***


#### Meine alias Geräte werden nicht importiert / My alias devices are not imported correctly
[Siehe vollständige und Lösung Beschreibung im Issue](https://github.com/Zefau/ioBroker.jarvis/issues/222).

Please remark: States of the alias adapter will ONLY be recognized by the Importer if they are grouped in a `channel`.

Bitte beachten: Datenpunkte des Alias Adapter werden NUR vom Importer erkannt, wenn diese in einem Kanal (`channel`) gruppiert sind.
***

### :bug: bug

#### Unterstützung für relative Pfade
[Siehe vollständige und Lösung Beschreibung im Issue](https://github.com/Zefau/ioBroker.jarvis/issues/578).

*Please note that you may restore an old layout via jarvis adapter configuration directly within ioBroker

**Prerequisites / Voraussetzungen**
- [x] Which jarvis version are you running / Welche Version von jarvis nutzt du? **v2.2.0-beta.6**

**Describe the bug / Beschreibe den Fehler**
Mit dem Widget "DisplayImage" möchte ich eine Grafik anzeigen lassen (Karte von dem Xiaomi Staubsauger). Auf die Grafik kann über den relativen Pfad zugegriffen werden:
./opt/iobroker/iobroker-data/files/mihome-vacuum.admin/actualMap_0.png

Jarvis kann über den relativen Pfad die Grafik aber nicht laden, da relative Pfade nicht unterstützt wird.
Siehe auch https://forum.iobroker.net/post/553952

**Expected behavior**
Relative Pfade werden unterstützt

***

### :gem: Design / Theme

#### Falsche Darstellung der Spalten auf dem Tablet
[Siehe vollständige und Lösung Beschreibung im Issue](https://github.com/Zefau/ioBroker.jarvis/issues/359).

Hallo, habe 2 Fire 7 im Einsatz leider ist hier die Anzeige buggy- siehe Foto -bekomme es mit de Einstellungen nicht hin.

Die Spaten sollen komplette Bildbreite haben

Am PC und am iPad ist alles richtig

Vielen Dank für diesen super Adapter

![00B371A0-FA9E-48DB-BDC8-5FF96278AC18](https://user-images.githubusercontent.com/56870555/99852494-64644300-2b81-11eb-8b04-6d293e54335c.jpeg)

***


#### Eigene icons benutzen / How to use your own icons
[Siehe vollständige und Lösung Beschreibung im Issue](https://github.com/Zefau/ioBroker.jarvis/issues/348).

Um eigene Icons zu benutzen ist die Grafik mittels Base64 Image Encoder (https://www.base64-image.de/) in eine Zeichenkette umzuwandeln. Diese beginnt nach dem Konvertieren mit `data:image/jpeg;base64` (oder `data:image/png;base64`).

Diese Zeichenkette in das Icon Input-Feld einfügen.

_____

In order to use your own icons you need to convert the image to a base64 string using Base64 Image Encoder (https://www.base64-image.de/). After the conversion the string starts with `data:image/jpeg;base64` (or `data:image/png;base64`).

Paste the code into the icon input field.
***


#### Desktop vs. Mobil - Relative Höhe des Widgets
[Siehe vollständige und Lösung Beschreibung im Issue](https://github.com/Zefau/ioBroker.jarvis/issues/271).

> gerade getestet mit beta 52
mit skalieren ein/aus passiert gar nichts
das einzige was hilft ist die maximale höhe einzugeben.
das hab ich jetzt z.b. auf 600 stehen. dann wird das bild kleiner.
ist aber fast zu klein für die visu am pc, aber zu groß fürs handy.
irgendwie müsste das noch etwas dynamischer gehen

_Originally posted by @Timmes123 in https://github.com/Zefau/ioBroker.jarvis/issues/252#issuecomment-716061420_
***


#### Icon Stil 
[Siehe vollständige und Lösung Beschreibung im Issue](https://github.com/Zefau/ioBroker.jarvis/issues/211).

Make it possbile to use this json `{"<0":{"color":"#FFBF00"}}` in Icon-Stil
***

### foreign issue

#### Deconz XY CIE  Farbwahl
[Siehe vollständige und Lösung Beschreibung im Issue](https://github.com/Zefau/ioBroker.jarvis/issues/399).

Hallo ist es möglich die folgende Farbwahl via Hueslider in Jarvis zu verwirklichen ? 

![image](https://user-images.githubusercontent.com/22169074/100795664-b29a0180-341f-11eb-9f34-9c7c8091a642.png)

bisher hab ich nichts dazu gefunden. 

Danke.
***

### Module AdapterStatus

#### Nur bestimmte Adapter auflisten oder ausschließen
[Siehe vollständige und Lösung Beschreibung im Issue](https://github.com/Zefau/ioBroker.jarvis/issues/323).

Um im Modul AdapterStatus nur bestimmte Adapter zu zeigen ist der Namespace des Adapters in die `whitelist` aufzunehmen, z. B.: `hm-rpc,shelly`.

Um bestimmte Adapter auszuschließen, sind diese in der `blacklist` aufzuführen.
***

### Module CustomHTML

#### Desktop vs. Mobil - Relative Höhe des Widgets
[Siehe vollständige und Lösung Beschreibung im Issue](https://github.com/Zefau/ioBroker.jarvis/issues/271).

> gerade getestet mit beta 52
mit skalieren ein/aus passiert gar nichts
das einzige was hilft ist die maximale höhe einzugeben.
das hab ich jetzt z.b. auf 600 stehen. dann wird das bild kleiner.
ist aber fast zu klein für die visu am pc, aber zu groß fürs handy.
irgendwie müsste das noch etwas dynamischer gehen

_Originally posted by @Timmes123 in https://github.com/Zefau/ioBroker.jarvis/issues/252#issuecomment-716061420_
***

### Module DateTime

#### DateTime module is left aligned instead of centered
[Siehe vollständige und Lösung Beschreibung im Issue](https://github.com/Zefau/ioBroker.jarvis/issues/353).

**Prerequisites**
- [x] Are you on the latest stable or latest beta of jarvis?
- [x] Please note that you may restore an old layout via jarvis adapter configuration directly within ioBroker

**Versions**
- Which jarvis version are you running: 1.1.0-beta.112
- Please provide your `Support-ID` (in jarvis via Settings -> Help): 1ef8d78141f72c240535a04d4a2f3160028d19b5b1f384b464e23d2c1659d70f

**Describe the bug**
Like mentioned in the title, the text in the dateTime-widget is left aligned instead of center.

**Expected behavior**
The text should be aligned to center. If I'm right the property "display: flex" of the class jss25 is the "wrongdoer".

**Screenshots**
![grafik](https://user-images.githubusercontent.com/72187841/99495432-f0ece680-2972-11eb-881b-ddd9de696fc9.png)
![grafik](https://user-images.githubusercontent.com/72187841/99495437-f4806d80-2972-11eb-95b5-e67f8d25574d.png)


***

### Module DisplayImage

#### DisplayImage == iobroker state
[Siehe vollständige und Lösung Beschreibung im Issue](https://github.com/Zefau/ioBroker.jarvis/issues/413).

wäre ganz praktisch wenn man beim displayImage, neben base64,url, auch einen iobroker state angeben kann in welchem beispielsweise eine http url zu einem bild steht. 

z.b. handhabt der synology adapter das so, alle mpeg streams als states.

gruss
***

### Module StateList

#### SwitchAction Trigger Element / Settings für eigenen Objektwert fehlt
[Siehe vollständige und Lösung Beschreibung im Issue](https://github.com/Zefau/ioBroker.jarvis/issues/371).

Hallo,

bis vor kurzem war bei dem Trigger Element "SwitchAction" der Schraubenschlüssel daneben zu finden, siehe hier ein älterer Screenshot:
![image](https://user-images.githubusercontent.com/74955542/100078562-f26f5080-2e43-11eb-998b-d1da3b682bd4.png)

Aktuell setze ich Beta 133 ein - dort ist dieser Schlüssel weg - Die Funktion, einen eigenen Wert als Value bei ON und bei OFF in das Trigger-Objekt zu schreiben war super und würde ich benötigen. Wurde die Funktion umgebaut oder <<versteckt>> und ich finde Sie nicht mehr?

Vielen Dank & Gruß,
Robert

***

### Module Weather

#### Sie sind kein registrierter Benutzer der daswetter.com-API 
[Siehe vollständige und Lösung Beschreibung im Issue](https://github.com/Zefau/ioBroker.jarvis/issues/249).

Hab mir für die API bei wetter.com registriert.
URL hab ich und `localidad` und `affiliate_id` im Jarvis Wetter Widget eingetragen.
http://api.daswetter.com/index.php?api_lang=de&localidad=xxxxxx&affiliate_id=xxxxxx

Leider wird mir nichts angezeigt und im Log erhalte ich diese Meldung:

jarvis.0 | 2020-10-24 13:26:14.718 | error | (28077) Sie sind kein registrierter Benutzer der daswetter.com-API oder Ihr Konto wurde nicht aktiviert.

Finde bei wetter.com nichts wo ich noch zusätzlich was aktivieren kann und registriert bin ich ja sonst würde ich die URL nicht abrufen können.
Im Browser bekomm ich die XML mit dem richtigen Werten angezeigt.
***

### wontfix

#### Unterstützung für relative Pfade
[Siehe vollständige und Lösung Beschreibung im Issue](https://github.com/Zefau/ioBroker.jarvis/issues/578).

*Please note that you may restore an old layout via jarvis adapter configuration directly within ioBroker

**Prerequisites / Voraussetzungen**
- [x] Which jarvis version are you running / Welche Version von jarvis nutzt du? **v2.2.0-beta.6**

**Describe the bug / Beschreibe den Fehler**
Mit dem Widget "DisplayImage" möchte ich eine Grafik anzeigen lassen (Karte von dem Xiaomi Staubsauger). Auf die Grafik kann über den relativen Pfad zugegriffen werden:
./opt/iobroker/iobroker-data/files/mihome-vacuum.admin/actualMap_0.png

Jarvis kann über den relativen Pfad die Grafik aber nicht laden, da relative Pfade nicht unterstützt wird.
Siehe auch https://forum.iobroker.net/post/553952

**Expected behavior**
Relative Pfade werden unterstützt

***


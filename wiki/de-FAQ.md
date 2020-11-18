# Häufig gestellte Fragen

## Übersicht

- [General](#General)
  - [Verbindungsparameter / Connection parameters (Proxy, Docker)](#verbindungsparameter--connection-parameters-(proxy,-docker))
  - [Nach einem Update ist die Konfiguration verschwunden?](#nach-einem-update-ist-die-konfiguration-verschwunden)
  - [Wie kann ich Geräte und Layout direkt editieren](#wie-kann-ich-geräte-und-layout-direkt-editieren)
  - [KNX Diskussion](#knx-diskussion)
  - [Log Eintrag: discarded x devices due to incorrect configuration](#log-eintrag-discarded-x-devices-due-to-incorrect-configuration)
  - [Schieberegler konfigurieren](#schieberegler-konfigurieren)
  - [Buttons konfigurieren](#buttons-konfigurieren)
  - [Meine alias Geräte werden nicht importiert / My alias devices are not imported correctly](#meine-alias-geräte-werden-nicht-importiert--my-alias-devices-are-not-imported-correctly)
- [Design / Theme](#Design-/-Theme)
  - [Eigene icons benutzen / How to use your own icons](#eigene-icons-benutzen--how-to-use-your-own-icons)
  - [Desktop vs. Mobil - Relative Höhe des Widgets](#desktop-vs-mobil---relative-höhe-des-widgets)
  - [Icon Stil ](#icon-stil-)
- [Module AdapterStatus](#Module-AdapterStatus)
  - [Nur bestimmte Adapter auflisten oder ausschließen](#nur-bestimmte-adapter-auflisten-oder-ausschließen)
- [Module CustomHTML](#Module-CustomHTML)
  - [Desktop vs. Mobil - Relative Höhe des Widgets](#desktop-vs-mobil---relative-höhe-des-widgets)
- [Module DateTime](#Module-DateTime)
  - [DateTime module is left aligned instead of centered](#datetime-module-is-left-aligned-instead-of-centered)
- [Module Weather](#Module-Weather)
  - [Sie sind kein registrierter Benutzer der daswetter.com-API ](#sie-sind-kein-registrierter-benutzer-der-daswettercom-api-)


## Fragen und Lösungen

### General

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


#### KNX Diskussion
[Siehe vollständige und Lösung Beschreibung im Issue](https://github.com/Zefau/ioBroker.jarvis/issues/301).

Diskussion rund um KNX und die Einbindung in jarvis.
Der Start der Diskussion ist im Verlauf des Issues https://github.com/Zefau/ioBroker.jarvis/issues/231 zu finden.
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

### Design / Theme

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


# Häufig gestellte Fragen

## Übersicht

- [General](#General)
  - [Nach Update auf beta 88 Konfiguration weg ?](#nach-update-auf-beta-88-konfiguration-weg-)
  - [Wie kann ich Geräte und Layout direkt editieren](#wie-kann-ich-geräte-und-layout-direkt-editieren)
  - [Empty spaces in datapoints not allowed](#empty-spaces-in-datapoints-not-allowed)
  - [Schieberegler konfigurieren](#schieberegler-konfigurieren)
  - [Buttons konfigurieren](#buttons-konfigurieren)
  - [2 Instanzen ?](#2-instanzen-)
  - [Import devices: Display insufficient states of alias adapter correctly](#import-devices-display-insufficient-states-of-alias-adapter-correctly)
  - [Icon Stil ](#icon-stil-)
  - [Tankerkönig Widget](#tankerkönig-widget)
- [bug](#bug)
  - [Issue running two instances](#issue-running-two-instances)
  - [discarded X devices due to incorrect configuration - log entry](#discarded-x-devices-due-to-incorrect-configuration---log-entry)
  - [Geräte-Bezeichnung in Klammern und Möglichkeit Titel auszublenden](#geräte-bezeichnung-in-klammern-und-möglichkeit-titel-auszublenden)
- [Module AdapterStatus](#Module-AdapterStatus)
  - [AdapterStatus: Nur bestimmte Adapter auflisten](#adapterstatus-nur-bestimmte-adapter-auflisten)
- [Module CustomHTML](#Module-CustomHTML)
  - [Relative widget height desktop vs. mobile](#relative-widget-height-desktop-vs-mobile)
- [Module Weather](#Module-Weather)
  - [Sie sind kein registrierter Benutzer der daswetter.com-API ](#sie-sind-kein-registrierter-benutzer-der-daswettercom-api-)


## Fragen und Lösungen

### General

#### Nach Update auf beta 88 Konfiguration weg ?
Hallo,

Ich habe gerade auf die aktuelle beta 88 hochgezogen und anscheinend ist jetzt meine Konfig nicht mehr vorhanden bzw. kann darauf nicht mehr zugegriffen werden.
Bekomme jetzt nur mehr den Startscreen wie beim ersten Start zu sehen

![image](https://user-images.githubusercontent.com/73381262/98462133-167b3280-21b2-11eb-9bfa-429cbaa52264.png)

in der layout.json stehen die Einstellungen noch korrekt drinn.
![image](https://user-images.githubusercontent.com/73381262/98462205-a5884a80-21b2-11eb-9fcd-807229d77913.png)

Bitte um kurze Info und Hilfe was ich hier tun kann.

Danke 
lg
mandragora



***


#### Wie kann ich Geräte und Layout direkt editieren
Hallo,

ich möchte gerne Geräte und Layout direkt per SSH und VSCODE editieren können. Wo sind die Dateien gespeichert?

![image](https://user-images.githubusercontent.com/20707078/98254265-607ad300-1f7c-11eb-8148-0cf3b02bab06.png)

Grüße
crypted

***


#### Empty spaces in datapoints not allowed
Hi, I tried to insert snmp datapoints like "Temp HDD 1" to a device and a warning came up. I used the exact same DPs in 1.0.9 and they worked fine. Instead of re-build all DPs from the ground I successfully copied structure of NAS1 to NAS2 in codeview. I just made some slight correction for the ip of the DP in codeview and everything worked fine.

As a non programming user: is it a bug in the beta or should DPs in general not contain empty spaces and 1.0.9 did not care about that so far? I guess it is the last, right? 😆

***


#### Schieberegler konfigurieren
Bei Rollos ist ein schieberegler 0-100% eingestellt
bei Heizung 0-35°C jeweils mit Schrittweite 1

ich würde gerne, vorallem bei der Heizung, den unteren und oberen Endwert einstellen können (z.b. 15-25°C) und die schrittweite mit 1° ist mir zu viel. ich würde es gerne auf 0,5 oder 0,1 grad einstellen.

aktuell ist meine sollraumtemperatur nämlich auf 22,5°C

***


#### Buttons konfigurieren
Hi. Gibt es eine möglichkeit buttons zu konfigurieren?
ich benötige unter anderem auch buttons, welche anstatt true auch false senden
oder auch buttons, welche befehle per http request starten.

Und diese buttons bitte auch frei beschriftbar. aktuell habe ich bei jarvis überall die "anschalten" buttons im einsatz
auf meiner node-red visu sind die buttons direkt beschriftet, z.b. mit "Messvorgang starten" 


***


#### 2 Instanzen ?
hallo kann man 2 Instanzen installieren mit unterschiedlichen ports?

***


#### Import devices: Display insufficient states of alias adapter correctly
Please remark: States of the alias adapter will ONLY be recognized by the Importer if they are grouped in a `channel`.

Bitte beachten: Datenpunkte des Alias Adapter werden NUR vom Importer erkannt, wenn diese in einem Kanal (`channel`) gruppiert sind.

***


#### Icon Stil 
Make it possbile to use this json `{"<0":{"color":"#FFBF00"}}` in Icon-Stil

***


#### Tankerkönig Widget
Tankerkönig Widget ähnlich wie das Wetter Widget

Preis Anzeige + Chart

***

### bug

#### Issue running two instances
> In Safari bleibt die 2. Instanz weiterhin weiß, kein Layout oder Gerät wird angezeigt obwohl beides konfiguriert ist und auch im Layout DP so steht. Im 2. Safari Tab ist Jarvis der ersten Instanz geöffnet. Bei Refresh der Seite komme ich dann nicht wie erwartet auf die Jarvis Visa der Instanz 1 sondern zum ebenfalls weißen Screen...der 2. Instanz?
Wenn ich dann ALLE Jarvis Tab schließe und wieder über iobroker gehe öffnen sich die jeweiligen Instanzen in zwei neuen Tabs. Instanz 1 wie gewohnt, Instanz 2 mit Whitescreen. Geh ich wieder auf Command+R bekomme ich auf BEIDEN Tabs den Whitescreen.

> Auf Firefox lässt sich das ebenfalls reproduzieren, jedoch mit dem Unterschied, dass das Testgerät und Layout der Instanz 2 hier auch angezeigt wird. Mit Command+R "verliere" ich dann aber im Tab auch meine Ursprungskonfig und bekomme die Testanzeigeder Instanz 2. In der URL beider Browser steht auch immer nur IP:8082/jarvis/index.html Kommt er da beim einfachen Refresh irgendwie "durcheinander"?

> ich öffne im Tab 1 die Instanz1 und in Tab2 die Instanz2, aktualisiere ich nun Tab1, erhalte ich als Aktualisierung die Instanz2 angezeigt. Beim aktualisieren öffnet sich immer die Instanz im zuletzt geöffneten Browser Tabs. Ebenso im Safari nur eben weiterhin mit weißem Startscreen ohne Geräte und Layout... 😞 Ich hab schon Cache geleert aber leider erfolglos....


***


#### discarded X devices due to incorrect configuration - log entry
Hi Zefau,

I still found this entry in Beta63 log. 

<img width="1264" alt="Bildschirmfoto 2020-10-31 um 10 06 31" src="https://user-images.githubusercontent.com/57875762/97775477-2fa43380-1b61-11eb-88fc-b64a1dc926cb.png">

I guess there are some old devices not configured properly, but it's quite hard to find the right device for fixing or even deleting it. I can imagine I auto-added some of my deconz-devices in Jarvis1.0.9. These were not configured quite well, so I manually deleted most of them. Is it possible these devices show up in log with "incorrect config" although already deleted?

Thanks for your great adapter and keep on going


***


#### Geräte-Bezeichnung in Klammern und Möglichkeit Titel auszublenden
Hallo Zefau

Mir ist aufgefallen das mit der beta.55 bei den Bezeichnungen sich Klammern hinzugefügt haben.
![image](https://user-images.githubusercontent.com/73381262/97166248-3f003700-1785-11eb-875e-d9ac0b5b674f.png)

Meiner Meinung nach war das zuvor nicht oder irre ich mich ?

Weiter hätte ich noch eine Frage zu selbst angelegten Geräten.
Habe meinen 3D Drucker angelegt und ein paar Werte eingebunden die ich mir gerne anzeigen lassen möchte.
Nun steht hier immer der Titel vom meinem Gerät davor.
![image](https://user-images.githubusercontent.com/73381262/97166416-81297880-1785-11eb-8137-a8e60a660e69.png)

Hat man hier eine Möglichkeit die Titel auszublenden da ich ja schon den Tab mit der Bezeichnung 3D Drucker Status betitelt habe und die einzelnen Bereich halt nur mehr mit Progress - Extruder Temperature etc. betiteln möchte.
Finde sieht dann irgendwie schöner aus.

Vielleicht hab ich das auch nur übersehen und es geht ja doch.
Dann bitte um kurze Info wo ich das ausblenden könnte.

Vielen lieben Dank schon mal
lg
mandragora


***

### Module AdapterStatus

#### AdapterStatus: Nur bestimmte Adapter auflisten
Um im Modul AdapterStatus nur bestimmte Adapter zu zeigen ist der Namespace des Adapters in die `blacklist` aufzunehmen, z. B.: `hm-rpc,shelly`.

***

### Module CustomHTML

#### Relative widget height desktop vs. mobile
> gerade getestet mit beta 52
mit skalieren ein/aus passiert gar nichts
das einzige was hilft ist die maximale höhe einzugeben.
das hab ich jetzt z.b. auf 600 stehen. dann wird das bild kleiner.
ist aber fast zu klein für die visu am pc, aber zu groß fürs handy.
irgendwie müsste das noch etwas dynamischer gehen

_Originally posted by @Timmes123 in https://github.com/Zefau/ioBroker.jarvis/issues/252#issuecomment-716061420_

***

### Module Weather

#### Sie sind kein registrierter Benutzer der daswetter.com-API 
Hallo,

Habe noch ein kleines Problem mit wetter.com und Jarvis

Hab mir für die API bei wetter.com registriert.
URL hab ich und localidad und affiliate_id im Jarvis Wetter Widget eingetragen.
http://api.daswetter.com/index.php?api_lang=de&localidad=xxxxxx&affiliate_id=xxxxxx

Leider wird mir nichts angezeigt und im Log erhalte ich diese Meldung:

jarvis.0 | 2020-10-24 13:26:14.718 | error | (28077) Sie sind kein registrierter Benutzer der daswetter.com-API oder Ihr Konto wurde nicht aktiviert.

Finde bei wetter.com nichts wo ich noch zusätzlich was aktivieren kann und registriert bin ich ja sonst würde ich die URL nicht abrufen können.
Im Browser bekomm ich die XML mit dem richtigen Werten angezeigt.

Bitte um Ratschläge und Hilfe ob ich hier was falsch gemacht habe.

Vielen lieben Dank
mandragora

das Wetter 3.0.4
Jarvis 1.1.0-beta.47



***


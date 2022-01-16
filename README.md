![Logo](admin/jarvis.png)
# ioBroker.jarvis
jarvis - just another remarkable vis

![Number of Installations](https://iobroker.live/badges/jarvis-installed.svg)
![Stable Version](https://iobroker.live/badges/jarvis-stable.svg)
[![NPM Version](http://img.shields.io/npm/v/iobroker.jarvis.svg)](https://www.npmjs.com/package/iobroker.jarvis)
[![Commits since last release](https://img.shields.io/github/commits-since/Zefau/ioBroker.jarvis/latest.svg)](https://github.com/Zefau/ioBroker.jarvis/releases/latest)
[![Travis CI](https://travis-ci.com/Zefau/ioBroker.jarvis.svg?branch=master)](https://travis-ci.com/Zefau/ioBroker.jarvis)
[![Downloads](https://img.shields.io/npm/dm/iobroker.jarvis.svg)](https://www.npmjs.com/package/iobroker.jarvis)

[![NPM](https://nodei.co/npm/iobroker.jarvis.png?downloads=true)](https://nodei.co/npm/iobroker.jarvis/) 


## Anleitung / Installation / Hilfe
Siehe [Linksammlung im Wiki](https://github.com/Zefau/ioBroker.jarvis/wiki).


## Changelog

Please also see [release page](https://github.com/Zefau/ioBroker.jarvis/releases) for changelog and detailed information.


### v3.0.0

#### :star2: newly added features
**Layout**
- Add navigation drawer ([#81](https://github.com/Zefau/ioBroker.jarvis/issues/81))
- Flexible Layout: Allow Widgets to span accross columns ([#129](https://github.com/Zefau/ioBroker.jarvis/issues/129))
- add Jumper / Link functionality to quickly change view to a certain tab / widget ([#143](https://github.com/Zefau/ioBroker.jarvis/issues/143))
- Allow TopBar / TabBar to be placed on either top or bottom ([#234](https://github.com/Zefau/ioBroker.jarvis/issues/234))
- Dropdown Menü für Button in der TAB-Leiste ([#638](https://github.com/Zefau/ioBroker.jarvis/issues/638))
- Introduce tiles ([#235](https://github.com/Zefau/ioBroker.jarvis/issues/235))
- Add option to use icon as State indication ([#264](https://github.com/Zefau/ioBroker.jarvis/issues/264))
- Introduce different widget sizes ([#277](https://github.com/Zefau/ioBroker.jarvis/issues/277))
- Swipe to switch between tabs ([#19](https://github.com/Zefau/ioBroker.jarvis/issues/19))
- Automatischer Seitenwechsel nach x Minuten ([#293](https://github.com/Zefau/ioBroker.jarvis/issues/293))

**Geräte / States**
- Allow usage of Json-Format for Device Label ([#536](https://github.com/Zefau/ioBroker.jarvis/issues/536))
- Allow styling of Device body and label ([#612](https://github.com/Zefau/ioBroker.jarvis/issues/612))

**Modul Chart**
- *Anmerkung:* Das Modul `Chart` (aus v2) wurde in v3 in `HistoryGraph` umbenannt. Das neu eingeführte Modul `Chart` in v3 erlaubt den Vergleich von verschiedenen Datenpunkt-Wertern (keine historischen Werte mehr; hierfür ist nun `HistoryGraph` zu nutzen).
- Migrate from Chart.js to Apache ECharts ([#282](https://github.com/Zefau/ioBroker.jarvis/issues/282))
- Rework / dense Chart layout ([#446](https://github.com/Zefau/ioBroker.jarvis/issues/446))
- Bar graph ([#427](https://github.com/Zefau/ioBroker.jarvis/issues/427))
- add secondary y-axis ([#326](https://github.com/Zefau/ioBroker.jarvis/issues/326))

**Modul JsonTable / HtmlTable**
- add new module HtmlTable ([#676](https://github.com/Zefau/ioBroker.jarvis/issues/676)) 
  *Anmerkung:* Liest HTML Tabellen aus ioBroker (analog zu JSON-Strukturen beim Modul `JsonTable`) und stellt diese als Tabelle in jarvis dar
- Improve module JsonTable ([#679](https://github.com/Zefau/ioBroker.jarvis/issues/679)) 
  *Anmerkung:* Spalten umbenennen, Werte durch eigene Funktionen ändern, HTML nutzen, etc.

**Modul AdapterStatus**
- Allow to start / stop adapter instance
- Add Info Type from the Adapter Updates ([#346](https://github.com/Zefau/ioBroker.jarvis/issues/346))

**Modul Calendar**
- Custom colors for calendars ([#660](https://github.com/Zefau/ioBroker.jarvis/issues/660))

**Modul iFrame**
- Aktualisierung von iFrame oder Image nur wenn zugehöriger TAB aktiv ist ([#458](https://github.com/Zefau/ioBroker.jarvis/issues/458))
- Allow usage of settings parameter within URL of iFrame module ([#335](https://github.com/Zefau/ioBroker.jarvis/issues/335))

**Status / Trigger**
- ButtonAction als Taster ([#450](https://github.com/Zefau/ioBroker.jarvis/issues/450))
- ToogleMode for ButtonAction / IconButtonAction ([#408](https://github.com/Zefau/ioBroker.jarvis/issues/408))
- Allow icon as state status ([#680](https://github.com/Zefau/ioBroker.jarvis/issues/680))
- allow specific values for trigger action ([#757](https://github.com/Zefau/ioBroker.jarvis/issues/757))
- LevelBody: Einheit im Slider-Label berücksichtigen ([#1188](https://github.com/Zefau/ioBroker.jarvis/issues/1188))

**Einstellungen / Settings**
- Keep jarvis open in different tab/window while editing config ([#355](https://github.com/Zefau/ioBroker.jarvis/issues/355))
- Save / apply configuration without reloading page ([#311](https://github.com/Zefau/ioBroker.jarvis/issues/311))
- add Autocompletion of state on typing in device configuration ([#420](https://github.com/Zefau/ioBroker.jarvis/issues/420))
- Settings Button im Menü ausblenden ([#437](https://github.com/Zefau/ioBroker.jarvis/issues/437))
- Security prompt when deleting an entry ([#76](https://github.com/Zefau/ioBroker.jarvis/issues/76))
- Funktiontasten (PC) zur Bearbeitung für Jarvis ([#973](https://github.com/Zefau/ioBroker.jarvis/issues/973))

**Sonstiges**
- Importer erkennt nun mehr HomeMatic / HomeMatic IP Geräte ([#719](https://github.com/Zefau/ioBroker.jarvis/issues/719), [#1186](https://github.com/Zefau/ioBroker.jarvis/issues/1186), [#1196](https://github.com/Zefau/ioBroker.jarvis/issues/1196))
- neues Logo ([#144](https://github.com/Zefau/ioBroker.jarvis/issues/144))


#### :bug: fixed bugs
- Many many many bugs fixed, [see list of fixed bugs](https://github.com/Zefau/ioBroker.jarvis/issues?q=is%3Aissue+project%3AZefau%2FioBroker.jarvis%2F4+label%3A%22%3Abug%3A+bug%22+)


## License
The CC BY-NC-ND 4.0 License
https://creativecommons.org/licenses/by-nc-nd/4.0/

Copyright (c) 2020 - 2022 Zefau <zefau@mailbox.org>

By exercising the Licensed Rights (defined below), You accept and agree to be bound by the terms and conditions of this Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International Public License ("Public License").

To the extent this Public License may be interpreted as a contract, You are granted the Licensed Rights in consideration of Your acceptance of these terms and conditions, and the Licensor grants You such rights in consideration of benefits the Licensor receives from making the Licensed Material available under these terms and conditions.

Read full license text in [LICENSE](LICENSE)

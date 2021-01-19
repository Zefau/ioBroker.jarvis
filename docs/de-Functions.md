# Gewerke

Die Gewerke definierten den Typs eines Geräts, z. B. Licht oder Heizung. 

Grundsätzlich kann durch den Benutzer in Jarvis alles frei definiert und konfiguriert werden. Die Gewerke liefern hierzu bestimmte Voreinstellungen als Grundlage (die jedoch überschrieben werden können).

*Hinweis*: Die Spalten der unten dargestellten Tabellen sind unter [Geräte](./de-Devices#konfiguration-der-datenpunkte--states) erläutert.


# Übersicht der Gewerke
- [Rollladen / Jalousie](#gewerk-rollladen--jalousie-blind)
- [Tür](#gewerk-tür-door)
- [Lüfter](#gewerk-lüfter-fan)
- [Heizung](#gewerk-heizung-heating)
- [Haushalt](#gewerk-haushalt-household)
- [Licht](#gewerk-licht-light)
- [Ort](#gewerk-ort-location)
- [Bewegungs-/Präsenzmelder](#gewerk-bewegungs-präsenzmelder-motion)
- [Rasenmäher-Roboter](#gewerk-rasenmäher-roboter-mower)
- [Szenen](#gewerk-szenen-scenes)
- [Sensor](#gewerk-sensor-sensor)
- [Server](#gewerk-server-server)
- [Rauchmelder](#gewerk-rauchmelder-smoke)
- [Steckdose](#gewerk-steckdose-socket)
- [Lautsprecher](#gewerk-lautsprecher-speaker)
- [Schalter](#gewerk-schalter-switch)
- [Fernseher](#gewerk-fernseher-tv)
- [Benutzer](#gewerk-benutzer-user)
- [Staubsauger-Roboter](#gewerk-staubsauger-roboter-vacuum)
- [Wetter-Station](#gewerk-wetter-station-weather-station)
- [Fenster](#gewerk-fenster-window)
- [Sonstige](#gewerk-sonstige-_defaults)


<h2>Gewerk Rollladen / Jalousie (<code>blind</code>)</h2>
<h3>vordefinierte Datenpunkte</h3>
<table><tr><th>Datenpunkt Bezeichner</th><th>Datenpunkt Stil</th><th>Anzeige</th><th>Einheit</th><th>Icon</th><th>Icon Stil</th></tr>
<tr><td><code>_any</code></td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr><td><code>level</code></td><td>-</td><td>-</td><td><code>%</code></td><td><pre lang="json">{
   "default": "window-shutter-open",
   ">90": "window-shutter-open",
   "<=90": "window-shutter"
}</pre></td><td>-</td></tr>
<tr><td><code>level2</code></td><td>-</td><td>-</td><td><code>%</code></td><td><pre lang="json">{
   "default": "window-shutter-open",
   ">90": "window-shutter-open",
   "<=90": "window-shutter"
}</pre></td><td>-</td></tr>
<tr><td><code>activity</code></td><td>-</td><td><pre lang="json">{
   "true": "in Bewegung",
   "false": "keine"
}</pre></td><td>-</td><td><pre lang="json">{
   "true": "pan-vertical",
   "false": "dots-vertical"
}</pre></td><td>-</td></tr>
</table>
<h3>Beispielkonfiguration</h3>
<h4>Adapter hm-rpc</h4>
<h5>HmIP-BBL</h5>
<ul>
<li><code>level</code>
<ul>
<li>state: <code>.3.LEVEL</code></li>
<li>action: <code>.4.LEVEL</code></li>
</ul>
<li><code>level2</code>
<ul>
<li>state: <code>.3.LEVEL2</code></li>
<li>action: <code>.4.LEVEL2</code></li>
</ul>
<li><code>activity</code>
<ul>
<li>state: <code>.3.ACTIVITY_STATE</code></li>
</ul>
<li><code>stop</code>
<ul>
<li>action: <code>.4.STOP</code></li>
</ul>
</ul>
<h5>HmIP-FROLL</h5>
<ul>
<li><code>level</code>
<ul>
<li>state: <code>.3.LEVEL</code></li>
<li>action: <code>.4.LEVEL</code></li>
</ul>
<li><code>activity</code>
<ul>
<li>state: <code>.3.ACTIVITY_STATE</code></li>
</ul>
<li><code>stop</code>
<ul>
<li>action: <code>.4.STOP</code></li>
</ul>
</ul>
<h5>HmIP-BROLL</h5>
<ul>
<li><code>level</code>
<ul>
<li>state: <code>.3.LEVEL</code></li>
<li>action: <code>.4.LEVEL</code></li>
</ul>
<li><code>level2</code>
<ul>
<li>state: <code>.3.LEVEL2</code></li>
<li>action: <code>.4.LEVEL2</code></li>
</ul>
<li><code>activity</code>
<ul>
<li>state: <code>.3.ACTIVITY_STATE</code></li>
</ul>
<li><code>stop</code>
<ul>
<li>action: <code>.4.STOP</code></li>
</ul>
</ul>
<h5>HM-LC-Bl1-FM</h5>
<ul>
<li><code>level</code>
<ul>
<li>state: <code>.1.LEVEL</code></li>
<li>action: <code>.1.LEVEL</code></li>
</ul>
<li><code>activity</code>
<ul>
<li>state: <code>.1.WORKING</code></li>
</ul>
<li><code>stop</code>
<ul>
<li>action: <code>.1.STOP</code></li>
</ul>
</ul>
<h5>HM-LC-Bl1PBU-FM</h5>
<ul>
<li><code>level</code>
<ul>
<li>state: <code>.1.LEVEL</code></li>
<li>action: <code>.1.LEVEL</code></li>
</ul>
<li><code>activity</code>
<ul>
<li>state: <code>.1.WORKING</code></li>
</ul>
<li><code>stop</code>
<ul>
<li>action: <code>.1.STOP</code></li>
</ul>
</ul>
<h5>HmIPW-DRBL4</h5>
<ul>
<li><code>levelCh1</code>
<ul>
<li>state: <code>.2.LEVEL</code></li>
<li>action: <code>.2.LEVEL</code></li>
</ul>
<li><code>level2Ch1</code>
<ul>
<li>state: <code>.2.LEVEL_2</code></li>
<li>action: <code>.2.LEVEL_2</code></li>
</ul>
<li><code>activityCh1</code>
<ul>
<li>state: <code>.2.PROCESS</code></li>
</ul>
<li><code>stopCh1</code>
<ul>
<li>action: <code>.2.STOP</code></li>
</ul>
<li><code>levelCh2</code>
<ul>
<li>state: <code>.6.LEVEL</code></li>
<li>action: <code>.6.LEVEL</code></li>
</ul>
<li><code>level2Ch2</code>
<ul>
<li>state: <code>.6.LEVEL_2</code></li>
<li>action: <code>.6.LEVEL_2</code></li>
</ul>
<li><code>activityCh2</code>
<ul>
<li>state: <code>.6.PROCESS</code></li>
</ul>
<li><code>stopCh2</code>
<ul>
<li>action: <code>.6.STOP</code></li>
</ul>
<li><code>levelCh3</code>
<ul>
<li>state: <code>.10.LEVEL</code></li>
<li>action: <code>.10.LEVEL</code></li>
</ul>
<li><code>level2Ch3</code>
<ul>
<li>state: <code>.10.LEVEL_2</code></li>
<li>action: <code>.10.LEVEL_2</code></li>
</ul>
<li><code>activityCh3</code>
<ul>
<li>state: <code>.10.PROCESS</code></li>
</ul>
<li><code>stopCh3</code>
<ul>
<li>action: <code>.10.STOP</code></li>
</ul>
<li><code>levelCh4</code>
<ul>
<li>state: <code>.14.LEVEL</code></li>
<li>action: <code>.14.LEVEL</code></li>
</ul>
<li><code>level2Ch4</code>
<ul>
<li>state: <code>.14.LEVEL_2</code></li>
<li>action: <code>.14.LEVEL_2</code></li>
</ul>
<li><code>activityCh4</code>
<ul>
<li>state: <code>.14.PROCESS</code></li>
</ul>
<li><code>stopCh4</code>
<ul>
<li>action: <code>.14.STOP</code></li>
</ul>
</ul>
<h4>Adapter hmip</h4>
<h5>HmIP-BBL</h5>
<ul>
<li><code>level</code>
<ul>
<li>state: <code>.channels.1.shutterLevel</code></li>
<li>action: <code>.channels.1.shutterLevel</code></li>
</ul>
<li><code>activity</code>
<ul>
<li>state: <code>.channels.1.processing</code></li>
</ul>
<li><code>stop</code>
<ul>
<li>action: <code>.channels.1.stop</code></li>
</ul>
</ul>
<h5>HmIP-BROLL</h5>
<ul>
<li><code>level</code>
<ul>
<li>state: <code>.channels.1.shutterLevel</code></li>
<li>action: <code>.channels.1.shutterLevel</code></li>
</ul>
<li><code>activity</code>
<ul>
<li>state: <code>.channels.1.processing</code></li>
</ul>
<li><code>stop</code>
<ul>
<li>action: <code>.channels.1.stop</code></li>
</ul>
</ul>
<h4>Adapter shelly</h4>
<ul>
<li><code>level</code>
<ul>
<li>state: <code>.Shutter.Position</code></li>
<li>action: <code>.Shutter.Position</code></li>
</ul>
<li><code>activity</code>
<ul>
<li>state: <code>.Shutter.state</code></li>
<li>action: <code>.Shutter.Pause</code></li>
</ul>
</ul>

<h2>Gewerk Tür (<code>door</code>)</h2>
<h3>vordefinierte Datenpunkte</h3>
<table><tr><th>Datenpunkt Bezeichner</th><th>Datenpunkt Stil</th><th>Anzeige</th><th>Einheit</th><th>Icon</th><th>Icon Stil</th></tr>
<tr><td><code>_any</code></td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr><td><code>open</code></td><td>-</td><td><pre lang="json">{
   "0": "door#open#closed",
   "1": "door#open#opened",
   "false": "geschlossen",
   "true": "offen"
}</pre></td><td>-</td><td><pre lang="json">{
   "0": "window-closed-variant",
   "1": "window-open-variant",
   "false": "door-closed",
   "true": "door-open"
}</pre></td><td>-</td></tr>
<tr><td><code>lock</code></td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
</table>
<h3>Beispielkonfiguration</h3>
<h4>Adapter hm-rpc</h4>
<h5>HM-Sec-Key</h5>
<ul>
<li><code>error</code>
<ul>
<li>state: <code>.1.ERROR</code></li>
</ul>
<li><code>lock</code>
<ul>
<li>state: <code>.1.OPEN</code></li>
</ul>
</ul>

<h2>Gewerk Lüfter (<code>fan</code>)</h2>
<h3>vordefinierte Datenpunkte</h3>
<table><tr><th>Datenpunkt Bezeichner</th><th>Datenpunkt Stil</th><th>Anzeige</th><th>Einheit</th><th>Icon</th><th>Icon Stil</th></tr>
<tr><td><code>_any</code></td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr><td><code>power</code></td><td>-</td><td>-</td><td>-</td><td><pre lang="json">{
   "true": "fan",
   "false": "fan-off"
}</pre></td><td>-</td></tr>
</table>

<h2>Gewerk Heizung (<code>heating</code>)</h2>
<h3>vordefinierte Datenpunkte</h3>
<table><tr><th>Datenpunkt Bezeichner</th><th>Datenpunkt Stil</th><th>Anzeige</th><th>Einheit</th><th>Icon</th><th>Icon Stil</th></tr>
<tr><td><code>_any</code></td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr><td><code>temperature</code></td><td>-</td><td>-</td><td><code>°C</code></td><td><pre lang="json">"thermometer"</pre></td><td>-</td></tr>
<tr><td><code>settemperature</code></td><td>-</td><td>-</td><td><code>°C</code></td><td><pre lang="json">"thermometer-chevron-up"</pre></td><td>-</td></tr>
<tr><td><code>humidity</code></td><td>-</td><td>-</td><td><code>%</code></td><td>-</td><td>-</td></tr>
<tr><td><code>boost</code></td><td>-</td><td>-</td><td>-</td><td><pre lang="json">"radiator"</pre></td><td>-</td></tr>
<tr><td><code>boostTime</code></td><td>-</td><td>-</td><td><code>min.</code></td><td><pre lang="json">"clock-outline"</pre></td><td>-</td></tr>
<tr><td><code>boostState</code></td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr><td><code>frost</code></td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr><td><code>windowState</code></td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr><td><code>partyMode</code></td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr><td><code>modeAuto</code></td><td>-</td><td>-</td><td>-</td><td><pre lang="json">"brightness-auto"</pre></td><td>-</td></tr>
<tr><td><code>modeManu</code></td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr><td><code>modeCurrent</code></td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr><td><code>modeLowering</code></td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr><td><code>modeControl</code></td><td>-</td><td>-</td><td>-</td><td><pre lang="json">"list-status"</pre></td><td>-</td></tr>
<tr><td><code>valve</code></td><td>-</td><td>-</td><td><code>%</code></td><td><pre lang="json">"valve"</pre></td><td>-</td></tr>
<tr><td><code>valvePosition</code></td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr><td><code>valveState</code></td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
</table>
<h3>Beispielkonfiguration</h3>
<h4>Adapter hm-rpc</h4>
<h5>HmIP-STHD</h5>
<ul>
<li><code>temperature</code>
<ul>
<li>state: <code>.1.ACTUAL_TEMPERATURE</code></li>
</ul>
<li><code>setTemperature</code>
<ul>
<li>state: <code>.1.SET_POINT_TEMPERATURE</code></li>
<li>action: <code>.1.SET_POINT_TEMPERATURE</code></li>
</ul>
<li><code>humidity</code>
<ul>
<li>state: <code>.1.HUMIDITY</code></li>
</ul>
<li><code>frost</code>
<ul>
<li>state: <code>.1.FROST_PROTECTION</code></li>
</ul>
<li><code>boost</code>
<ul>
<li>state: <code>.1.BOOST_MODE</code></li>
<li>action: <code>.1.BOOST_MODE</code></li>
</ul>
<li><code>boostTime</code>
<ul>
<li>state: <code>.1.BOOST_TIME</code></li>
<li>action: <code>.1.BOOST_TIME</code></li>
</ul>
<li><code>windowState</code>
<ul>
<li>state: <code>.1.WINDOW_STATE</code></li>
</ul>
<li><code>partyMode</code>
<ul>
<li>state: <code>.1.PARTY_MODE</code></li>
<li>action: <code>.1.PARTY_MODE</code></li>
</ul>
</ul>
<h5>HmIP-eTRV-B</h5>
<ul>
<li><code>temperature</code>
<ul>
<li>state: <code>.1.ACTUAL_TEMPERATURE</code></li>
</ul>
<li><code>setTemperature</code>
<ul>
<li>state: <code>.1.SET_POINT_TEMPERATURE</code></li>
<li>action: <code>.1.SET_POINT_TEMPERATURE</code></li>
</ul>
<li><code>frost</code>
<ul>
<li>state: <code>.1.FROST_PROTECTION</code></li>
</ul>
<li><code>boost</code>
<ul>
<li>state: <code>.1.BOOST_MODE</code></li>
<li>action: <code>.1.BOOST_MODE</code></li>
</ul>
<li><code>boostTime</code>
<ul>
<li>state: <code>.1.BOOST_TIME</code></li>
<li>action: <code>.1.BOOST_TIME</code></li>
</ul>
<li><code>windowState</code>
<ul>
<li>state: <code>.1.WINDOW_STATE</code></li>
</ul>
<li><code>partyMode</code>
<ul>
<li>state: <code>.1.PARTY_MODE</code></li>
<li>action: <code>.1.PARTY_MODE</code></li>
</ul>
</ul>
<h5>HmIP-eTRV</h5>
<ul>
<li><code>temperature</code>
<ul>
<li>state: <code>.1.ACTUAL_TEMPERATURE</code></li>
</ul>
<li><code>setTemperature</code>
<ul>
<li>state: <code>.1.SET_POINT_TEMPERATURE</code></li>
<li>action: <code>.1.SET_POINT_TEMPERATURE</code></li>
</ul>
<li><code>frost</code>
<ul>
<li>state: <code>.1.FROST_PROTECTION</code></li>
</ul>
<li><code>boost</code>
<ul>
<li>state: <code>.1.BOOST_MODE</code></li>
<li>action: <code>.1.BOOST_MODE</code></li>
</ul>
<li><code>boostTime</code>
<ul>
<li>state: <code>.1.BOOST_TIME</code></li>
<li>action: <code>.1.BOOST_TIME</code></li>
</ul>
<li><code>windowState</code>
<ul>
<li>state: <code>.1.WINDOW_STATE</code></li>
</ul>
<li><code>partyMode</code>
<ul>
<li>state: <code>.1.PARTY_MODE</code></li>
<li>action: <code>.1.PARTY_MODE</code></li>
</ul>
<li><code>level</code>
<ul>
<li>state: <code>.1.LEVEL</code></li>
<li>action: <code>.1.LEVEL</code></li>
</ul>
<li><code>valve</code>
<ul>
<li>state: <code>.1.VALVE_STATE</code></li>
<li>action: <code>.1.VALVE_STATE</code></li>
</ul>
</ul>
<h5>HmIP-eTRV-2</h5>
<ul>
<li><code>temperature</code>
<ul>
<li>state: <code>.1.ACTUAL_TEMPERATURE</code></li>
</ul>
<li><code>setTemperature</code>
<ul>
<li>state: <code>.1.SET_POINT_TEMPERATURE</code></li>
<li>action: <code>.1.SET_POINT_TEMPERATURE</code></li>
</ul>
<li><code>frost</code>
<ul>
<li>state: <code>.1.FROST_PROTECTION</code></li>
</ul>
<li><code>boost</code>
<ul>
<li>state: <code>.1.BOOST_MODE</code></li>
<li>action: <code>.1.BOOST_MODE</code></li>
</ul>
<li><code>boostTime</code>
<ul>
<li>state: <code>.1.BOOST_TIME</code></li>
<li>action: <code>.1.BOOST_TIME</code></li>
</ul>
<li><code>windowState</code>
<ul>
<li>state: <code>.1.WINDOW_STATE</code></li>
</ul>
<li><code>partyMode</code>
<ul>
<li>state: <code>.1.PARTY_MODE</code></li>
<li>action: <code>.1.PARTY_MODE</code></li>
</ul>
<li><code>level</code>
<ul>
<li>state: <code>.1.LEVEL</code></li>
<li>action: <code>.1.LEVEL</code></li>
</ul>
<li><code>valve</code>
<ul>
<li>state: <code>.1.VALVE_STATE</code></li>
<li>action: <code>.1.VALVE_STATE</code></li>
</ul>
</ul>
<h5>HmIP-BWTH</h5>
<ul>
<li><code>temperature</code>
<ul>
<li>state: <code>.1.ACTUAL_TEMPERATURE</code></li>
</ul>
<li><code>setTemperature</code>
<ul>
<li>state: <code>.1.SET_POINT_TEMPERATURE</code></li>
<li>action: <code>.1.SET_POINT_TEMPERATURE</code></li>
</ul>
<li><code>humidity</code>
<ul>
<li>state: <code>.1.HUMIDITY</code></li>
</ul>
<li><code>boost</code>
<ul>
<li>state: <code>.1.BOOST_MODE</code></li>
<li>action: <code>.1.BOOST_MODE</code></li>
</ul>
</ul>
<h5>HmIP-WTH</h5>
<ul>
<li><code>temperature</code>
<ul>
<li>state: <code>.1.ACTUAL_TEMPERATURE</code></li>
</ul>
<li><code>setTemperature</code>
<ul>
<li>state: <code>.1.SET_POINT_TEMPERATURE</code></li>
<li>action: <code>.1.SET_POINT_TEMPERATURE</code></li>
</ul>
<li><code>humidity</code>
<ul>
<li>state: <code>.1.HUMIDITY</code></li>
</ul>
<li><code>boost</code>
<ul>
<li>state: <code>.1.BOOST_MODE</code></li>
<li>action: <code>.1.BOOST_MODE</code></li>
</ul>
</ul>
<h5>HmIP-WTH-2</h5>
<ul>
<li><code>temperature</code>
<ul>
<li>state: <code>.1.ACTUAL_TEMPERATURE</code></li>
</ul>
<li><code>setTemperature</code>
<ul>
<li>state: <code>.1.SET_POINT_TEMPERATURE</code></li>
<li>action: <code>.1.SET_POINT_TEMPERATURE</code></li>
</ul>
<li><code>humidity</code>
<ul>
<li>state: <code>.1.HUMIDITY</code></li>
</ul>
<li><code>boost</code>
<ul>
<li>state: <code>.1.BOOST_MODE</code></li>
<li>action: <code>.1.BOOST_MODE</code></li>
</ul>
</ul>
<h5>HM-CC-RT-DN</h5>
<ul>
<li><code>temperature</code>
<ul>
<li>state: <code>.4.ACTUAL_TEMPERATURE</code></li>
</ul>
<li><code>setTemperature</code>
<ul>
<li>state: <code>.4.SET_TEMPERATURE</code></li>
<li>action: <code>.4.SET_TEMPERATURE</code></li>
</ul>
<li><code>boost</code>
<ul>
<li>state: <code>.4.BOOST_MODE</code></li>
<li>action: <code>.4.BOOST_MODE</code></li>
</ul>
<li><code>batteryState</code>
<ul>
<li>state: <code>.4.BATTERY_STATE</code></li>
</ul>
<li><code>partyTemperature</code>
<ul>
<li>state: <code>.4.PARTY_TEMPERATURE</code></li>
</ul>
<li><code>modeAuto</code>
<ul>
<li>state: <code>.4.AUTO_MODE</code></li>
<li>action: <code>.4.AUTO_MODE</code></li>
</ul>
<li><code>modeManu</code>
<ul>
<li>state: <code>.4.MANU_MODE</code></li>
<li>action: <code>.4.MANU_MODE</code></li>
</ul>
<li><code>boostState</code>
<ul>
<li>state: <code>.4.BOOST_STATE</code></li>
<li>action: <code>.4.BOOST_STATE</code></li>
</ul>
<li><code>modeCurrent</code>
<ul>
<li>state: <code>.4.COMFORT_MODE</code></li>
<li>action: <code>.4.COMFORT_MODE</code></li>
</ul>
<li><code>modeLowering</code>
<ul>
<li>state: <code>.4.LOWERING_MODE</code></li>
<li>action: <code>.4.LOWERING_MODE</code></li>
</ul>
<li><code>modeControl</code>
<ul>
<li>state: <code>.4.CONTROL_MODE</code></li>
<li>action: <code>.4.CONTROL_MODE</code></li>
<li>display: <code>[object Object]</code></li>
</ul>
<li><code>valve</code>
<ul>
<li>state: <code>.4.VALVE_STATE</code></li>
<li>action: <code>.4.VALVE_STATE</code></li>
</ul>
</ul>
<h5>HM-TC-IT-WM-W-EU</h5>
<ul>
<li><code>temperature</code>
<ul>
<li>state: <code>.1.TEMPERATURE</code></li>
</ul>
<li><code>humidity</code>
<ul>
<li>state: <code>.1.HUMIDITY</code></li>
</ul>
<li><code>actualHumidity</code>
<ul>
<li>state: <code>.2.ACTUAL_HUMIDITY</code></li>
</ul>
<li><code>actualTemperature</code>
<ul>
<li>state: <code>.2.ACTUAL_TEMPERATURE</code></li>
</ul>
<li><code>modeAuto</code>
<ul>
<li>state: <code>.2.AUTO_MODE</code></li>
<li>action: <code>.2.AUTO_MODE</code></li>
</ul>
<li><code>batteryState</code>
<ul>
<li>state: <code>.2.BATTERY_STATE</code></li>
</ul>
<li><code>boost</code>
<ul>
<li>state: <code>.2.BOOST_MODE</code></li>
<li>action: <code>.2.BOOST_MODE</code></li>
</ul>
<li><code>boostState</code>
<ul>
<li>state: <code>.2.BOOST_STATE</code></li>
<li>action: <code>.2.BOOST_STATE</code></li>
</ul>
<li><code>modeControl</code>
<ul>
<li>state: <code>.2.CONTROL_MODE</code></li>
<li>action: <code>.2.CONTROL_MODE</code></li>
<li>display: <code>[object Object]</code></li>
</ul>
<li><code>modeCurrent</code>
<ul>
<li>state: <code>.2.COMFORT_MODE</code></li>
<li>action: <code>.2.COMFORT_MODE</code></li>
</ul>
<li><code>lowBatteryAlarmReporting</code>
<ul>
<li>state: <code>.2.LOWBAT_REPORTING</code></li>
<li>action: <code>.2.LOWBAT_REPORTING</code></li>
</ul>
<li><code>modeManu</code>
<ul>
<li>state: <code>.2.MANU_MODE</code></li>
<li>action: <code>.2.MANU_MODE</code></li>
</ul>
<li><code>partyTemperature</code>
<ul>
<li>state: <code>.2.PARTY_TEMPERATURE</code></li>
</ul>
<li><code>setTemperature</code>
<ul>
<li>state: <code>.2.SET_TEMPERATURE</code></li>
<li>action: <code>.2.SET_TEMPERATURE</code></li>
</ul>
<li><code>openWindow</code>
<ul>
<li>state: <code>.2.WINDOW_OPEN_REPORTING</code></li>
<li>action: <code>.2.WINDOW_OPEN_REPORTING</code></li>
</ul>
</ul>
<h5>HM-WDS40-TH-I</h5>
<ul>
<li><code>temperature</code>
<ul>
<li>state: <code>.1.TEMPERATURE</code></li>
</ul>
<li><code>humidity</code>
<ul>
<li>state: <code>.1.HUMIDITY</code></li>
</ul>
</ul>
<h5>HM-WDS10-TH-O</h5>
<ul>
<li><code>temperature</code>
<ul>
<li>state: <code>.1.TEMPERATURE</code></li>
</ul>
<li><code>humidity</code>
<ul>
<li>state: <code>.1.HUMIDITY</code></li>
</ul>
</ul>
<h5>HM-WDS30-OT2-SM</h5>
<ul>
<li><code>temperatureCh1</code>
<ul>
<li>state: <code>.1.TEMPERATURE</code></li>
</ul>
<li><code>lowBatteryCh1</code>
<ul>
<li>state: <code>.1.LOWBAT</code></li>
</ul>
<li><code>temperatureCh2</code>
<ul>
<li>state: <code>.2.TEMPERATURE</code></li>
</ul>
<li><code>lowBatteryCh2</code>
<ul>
<li>state: <code>.2.LOWBAT</code></li>
</ul>
<li><code>temperatureCh3</code>
<ul>
<li>state: <code>.3.TEMPERATURE</code></li>
</ul>
<li><code>lowBatteryCh3</code>
<ul>
<li>state: <code>.3.LOWBAT</code></li>
</ul>
<li><code>temperatureCh4</code>
<ul>
<li>state: <code>.4.TEMPERATURE</code></li>
</ul>
<li><code>lowBatteryCh4</code>
<ul>
<li>state: <code>.4.LOWBAT</code></li>
</ul>
<li><code>temperatureCh5</code>
<ul>
<li>state: <code>.5.TEMPERATURE</code></li>
</ul>
<li><code>lowBatteryCh5</code>
<ul>
<li>state: <code>.5.LOWBAT</code></li>
</ul>
<li><code>temperatureCh6</code>
<ul>
<li>state: <code>.6.TEMPERATURE</code></li>
</ul>
<li><code>lowBatteryCh6</code>
<ul>
<li>state: <code>.6.LOWBAT</code></li>
</ul>
</ul>
<h4>Adapter hmip</h4>
<h5>HmIP-STH</h5>
<ul>
<li><code>temperature</code>
<ul>
<li>state: <code>.channels.1.actualTemperature</code></li>
</ul>
<li><code>humidity</code>
<ul>
<li>state: <code>.channels.1.humidity</code></li>
</ul>
<li><code>setTemperature</code>
<ul>
<li>state: <code>.channels.1.setPointTemperature</code></li>
<li>action: <code>.channels.1.setPointTemperature</code></li>
</ul>
</ul>
<h5>HmIP-eTRV-B</h5>
<ul>
<li><code>temperature</code>
<ul>
<li>state: <code>.channels.1.valveActualTemperature</code></li>
</ul>
<li><code>setTemperature</code>
<ul>
<li>state: <code>.channels.1.setPointTemperature</code></li>
<li>action: <code>.channels.1.setPointTemperature</code></li>
</ul>
<li><code>valvePosition</code>
<ul>
<li>state: <code>.channels.1.valvePosition</code></li>
</ul>
<li><code>valveState</code>
<ul>
<li>state: <code>.channels.1.valveState</code></li>
</ul>
</ul>
<h5>HmIP-eTRV-2</h5>
<ul>
<li><code>temperature</code>
<ul>
<li>state: <code>.channels.1.valveActualTemperature</code></li>
</ul>
<li><code>setTemperature</code>
<ul>
<li>state: <code>.channels.1.setPointTemperature</code></li>
<li>action: <code>.channels.1.setPointTemperature</code></li>
</ul>
</ul>
<h5>HmIP-WTH-2</h5>
<ul>
<li><code>temperature</code>
<ul>
<li>state: <code>.channels.1.actualTemperature</code></li>
</ul>
<li><code>humidity</code>
<ul>
<li>state: <code>.channels.1.humidity</code></li>
</ul>
<li><code>setTemperature</code>
<ul>
<li>state: <code>.channels.1.setPointTemperature</code></li>
<li>action: <code>.channels.1.setPointTemperature</code></li>
</ul>
<li><code>vapor</code>
<ul>
<li>state: <code>.channels.1.vaporAmount</code></li>
</ul>
</ul>

<h2>Gewerk Haushalt (<code>household</code>)</h2>
<h3>vordefinierte Datenpunkte</h3>
<table><tr><th>Datenpunkt Bezeichner</th><th>Datenpunkt Stil</th><th>Anzeige</th><th>Einheit</th><th>Icon</th><th>Icon Stil</th></tr>
<tr><td><code>_any</code></td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr><td><code>power</code></td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr><td><code>consumption</code></td><td>-</td><td>-</td><td><code>W</code></td><td><pre lang="json">{
   "default": "mdi-power-plug-off-outline",
   ">0": "mdi-power-plug"
}</pre></td><td>-</td></tr>
<tr><td><code>meter</code></td><td>-</td><td>-</td><td><code>W</code></td><td><pre lang="json">{
   "default": "mdi-power-plug-off-outline",
   ">0": "mdi-power-plug"
}</pre></td><td>-</td></tr>
</table>

<h2>Gewerk Licht (<code>light</code>)</h2>
<h3>vordefinierte Datenpunkte</h3>
<table><tr><th>Datenpunkt Bezeichner</th><th>Datenpunkt Stil</th><th>Anzeige</th><th>Einheit</th><th>Icon</th><th>Icon Stil</th></tr>
<tr><td><code>_any</code></td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr><td><code>on</code></td><td>-</td><td>-</td><td>-</td><td><pre lang="json">{
   "true": "lightbulb-on",
   "false": "lightbulb-off-outline"
}</pre></td><td>-</td></tr>
<tr><td><code>power</code></td><td>-</td><td>-</td><td>-</td><td><pre lang="json">{
   "true": "lightbulb-on",
   "false": "lightbulb-off-outline"
}</pre></td><td>-</td></tr>
<tr><td><code>dimmer</code></td><td><pre lang="json">{
   "0": {
      "color": "#999"
   }
}</pre></td><td><pre lang="json">{
   "0": "aus"
}</pre></td><td><code>val => val > 0 ? \ %\ : null</code></td><td><pre lang="json">{
   "0": "lightbulb-off-outline",
   "default": "lightbulb-on"
}</pre></td><td>-</td></tr>
<tr><td><code>level</code></td><td><pre lang="json">{
   "0": {
      "color": "#999"
   }
}</pre></td><td><pre lang="json">{
   "0": "aus"
}</pre></td><td><code>val => val > 0 ? \ %\ : null</code></td><td><pre lang="json">{
   "0": "lightbulb-off-outline",
   "default": "lightbulb-on"
}</pre></td><td>-</td></tr>
<tr><td><code>ct</code></td><td>-</td><td>-</td><td><code>°K</code></td><td><pre lang="json">{
   "default": "thermometer"
}</pre></td><td>-</td></tr>
<tr><td><code>colortemperature</code></td><td>-</td><td>-</td><td><code>°K</code></td><td><pre lang="json">{
   "default": "thermometer"
}</pre></td><td>-</td></tr>
<tr><td><code>hue</code></td><td>-</td><td>-</td><td><code>°</code></td><td><pre lang="json">{
   "default": "palette"
}</pre></td><td>-</td></tr>
<tr><td><code>rgb</code></td><td>-</td><td>-</td><td>-</td><td><pre lang="json">{
   "default": "palette"
}</pre></td><td>-</td></tr>
<tr><td><code>hsv</code></td><td>-</td><td>-</td><td>-</td><td><pre lang="json">{
   "default": "palette"
}</pre></td><td>-</td></tr>
<tr><td><code>hex</code></td><td>-</td><td>-</td><td>-</td><td><pre lang="json">{
   "default": "palette"
}</pre></td><td>-</td></tr>
</table>
<h3>Beispielkonfiguration</h3>
<h4>Adapter hm-rpc</h4>
<h5>HmIP-BSM</h5>
<ul>
<li><code>power</code>
<ul>
<li>state: <code>.4.STATE</code></li>
<li>action: <code>.4.STATE</code></li>
</ul>
<li><code>powerMeter</code>
<ul>
<li>state: <code>.7.POWER</code></li>
</ul>
<li><code>powerVoltage</code>
<ul>
<li>state: <code>.7.VOLTAGE</code></li>
</ul>
<li><code>powerFrequency</code>
<ul>
<li>state: <code>.7.FREQUENCY</code></li>
</ul>
</ul>
<h5>HmIP-BSL</h5>
<ul>
<li><code>power</code>
<ul>
<li>state: <code>.4.STATE</code></li>
<li>action: <code>.4.STATE</code></li>
</ul>
<li><code>levelTop</code>
<ul>
<li>state: <code>.8.LEVEL</code></li>
<li>action: <code>.8.LEVEL</code></li>
</ul>
<li><code>colorTop</code>
<ul>
<li>state: <code>.8.COLOR</code></li>
<li>action: <code>.8.COLOR</code></li>
<li>display: <code>[object Object]</code></li>
</ul>
<li><code>levelBottom</code>
<ul>
<li>state: <code>.12.LEVEL</code></li>
<li>action: <code>.12.LEVEL</code></li>
</ul>
<li><code>colorBottom</code>
<ul>
<li>state: <code>.12.COLOR</code></li>
<li>action: <code>.12.COLOR</code></li>
<li>display: <code>[object Object]</code></li>
</ul>
</ul>
<h5>HmIP-BRC2</h5>
<ul>
<li><code>power</code>
<ul>
<li>state: <code>.3.STATE</code></li>
<li>action: <code>.4.STATE</code></li>
</ul>
</ul>
<h5>HmIP-BDT</h5>
<ul>
<li><code>level</code>
<ul>
<li>state: <code>.3.LEVEL</code></li>
<li>action: <code>.4.LEVEL</code></li>
</ul>
</ul>
<h5>HM-LC-Dim1T-FM</h5>
<ul>
<li><code>level</code>
<ul>
<li>state: <code>.1.LEVEL</code></li>
<li>action: <code>.1.LEVEL</code></li>
</ul>
<li><code>timerOff</code>
<ul>
<li>state: <code>.1.ON_TIME</code></li>
<li>action: <code>.1.ON_TIME</code></li>
</ul>
<li><code>timerOn</code>
<ul>
<li>state: <code>.1.RAMP_TIME</code></li>
<li>action: <code>.1.RAMP_TIME</code></li>
</ul>
</ul>
<h5>HM-LC-RGBW-WM</h5>
<ul>
<li><code>level</code>
<ul>
<li>state: <code>.1.LEVEL</code></li>
<li>action: <code>.1.LEVEL</code></li>
</ul>
<li><code>timerOff</code>
<ul>
<li>state: <code>.1.ON_TIME</code></li>
<li>action: <code>.1.ON_TIME</code></li>
</ul>
<li><code>timerOn</code>
<ul>
<li>state: <code>.1.RAMP_TIME</code></li>
<li>action: <code>.1.RAMP_TIME</code></li>
</ul>
<li><code>hue</code>
<ul>
<li>state: <code>.2.COLOR</code></li>
<li>action: <code>.2.COLOR</code></li>
</ul>
</ul>
<h5>HM-LC-Sw1PBU-FM</h5>
<ul>
<li><code>power</code>
<ul>
<li>state: <code>.1.STATE</code></li>
<li>action: <code>.1.STATE</code></li>
</ul>
</ul>
<h5>HM-LC-Sw1-FM</h5>
<ul>
<li><code>power</code>
<ul>
<li>state: <code>.1.STATE</code></li>
<li>action: <code>.1.STATE</code></li>
</ul>
<li><code>timerOff</code>
<ul>
<li>state: <code>.1.ON_TIME</code></li>
<li>action: <code>.1.ON_TIME</code></li>
</ul>
<li><code>activity</code>
<ul>
<li>state: <code>.1.WORKING</code></li>
<li>action: <code>.1.WORKING</code></li>
</ul>
</ul>
<h5>HM-LC-Sw1-DR</h5>
<ul>
<li><code>power</code>
<ul>
<li>state: <code>.1.STATE</code></li>
<li>action: <code>.1.STATE</code></li>
</ul>
<li><code>timerOff</code>
<ul>
<li>state: <code>.1.ON_TIME</code></li>
<li>action: <code>.1.ON_TIME</code></li>
</ul>
</ul>
<h5>HM-LC-Sw2-FM</h5>
<ul>
<li><code>power</code>
<ul>
<li>state: <code>.1.STATE</code></li>
<li>action: <code>.1.STATE</code></li>
</ul>
<li><code>timerOff</code>
<ul>
<li>state: <code>.1.ON_TIME</code></li>
<li>action: <code>.1.ON_TIME</code></li>
</ul>
<li><code>powerCh2</code>
<ul>
<li>state: <code>.2.STATE</code></li>
<li>action: <code>.2.STATE</code></li>
</ul>
<li><code>timerOffCh2</code>
<ul>
<li>state: <code>.2.ON_TIME</code></li>
<li>action: <code>.2.ON_TIME</code></li>
</ul>
</ul>
<h5>HM-LC-Sw4-DR</h5>
<ul>
<li><code>power</code>
<ul>
<li>state: <code>.1.STATE</code></li>
<li>action: <code>.1.STATE</code></li>
</ul>
<li><code>timerOff</code>
<ul>
<li>state: <code>.1.ON_TIME</code></li>
<li>action: <code>.1.ON_TIME</code></li>
</ul>
<li><code>powerCh2</code>
<ul>
<li>state: <code>.2.STATE</code></li>
<li>action: <code>.2.STATE</code></li>
</ul>
<li><code>timerOffCh2</code>
<ul>
<li>state: <code>.2.ON_TIME</code></li>
<li>action: <code>.2.ON_TIME</code></li>
</ul>
<li><code>powerCh3</code>
<ul>
<li>state: <code>.3.STATE</code></li>
<li>action: <code>.3.STATE</code></li>
</ul>
<li><code>timerOffCh3</code>
<ul>
<li>state: <code>.3.ON_TIME</code></li>
<li>action: <code>.3.ON_TIME</code></li>
</ul>
<li><code>powerCh4</code>
<ul>
<li>state: <code>.4.STATE</code></li>
<li>action: <code>.4.STATE</code></li>
</ul>
<li><code>timerOffCh4</code>
<ul>
<li>state: <code>.4.ON_TIME</code></li>
<li>action: <code>.4.ON_TIME</code></li>
</ul>
</ul>
<h5>HM-LC-Dim1TPBU-FM</h5>
<ul>
<li><code>level</code>
<ul>
<li>state: <code>.1.LEVEL</code></li>
<li>action: <code>.1.LEVEL</code></li>
</ul>
</ul>
<h5>HM-LC-Dim1T-Pl-3</h5>
<ul>
<li><code>level</code>
<ul>
<li>state: <code>.1.LEVEL</code></li>
<li>action: <code>.1.LEVEL</code></li>
</ul>
<li><code>timerOff</code>
<ul>
<li>state: <code>.1.ON_TIME</code></li>
<li>action: <code>.1.ON_TIME</code></li>
</ul>
<li><code>timerOn</code>
<ul>
<li>state: <code>.1.RAMP_TIME</code></li>
<li>action: <code>.1.RAMP_TIME</code></li>
</ul>
</ul>
<h4>Adapter hue-extended</h4>
<ul>
<li><code>power</code>
<ul>
<li>state: <code>.action.on</code></li>
<li>action: <code>.action.on</code></li>
</ul>
<li><code>level</code>
<ul>
<li>state: <code>.action.level</code></li>
<li>action: <code>.action.level</code></li>
</ul>
<li><code>colorTemperature</code>
<ul>
<li>state: <code>.action.colorTemperature</code></li>
<li>action: <code>.action.colorTemperature</code></li>
</ul>
<li><code>hue</code>
<ul>
<li>state: <code>.action.hue</code></li>
<li>action: <code>.action.hue</code></li>
</ul>
<li><code>hex</code>
<ul>
<li>state: <code>.action.hex</code></li>
<li>action: <code>.action.hex</code></li>
</ul>
</ul>
<h4>Adapter hue</h4>
<ul>
<li><code>power</code>
<ul>
<li>state: <code>.on</code></li>
<li>action: <code>.on</code></li>
</ul>
<li><code>level</code>
<ul>
<li>state: <code>.level</code></li>
<li>action: <code>.level</code></li>
</ul>
<li><code>colorTemperature</code>
<ul>
<li>state: <code>.ct</code></li>
<li>action: <code>.ct</code></li>
</ul>
<li><code>hue</code>
<ul>
<li>state: <code>.hue</code></li>
<li>action: <code>.hue</code></li>
</ul>
<li><code>reachability</code>
<ul>
<li>state: <code>.reachable</code></li>
</ul>
</ul>
<h4>Adapter mqtt</h4>
<ul>
<li><code>dimmer</code>
<ul>
<li>state: <code>.Dimmer</code></li>
<li>action: <code>.Dimmer</code></li>
</ul>
<li><code>ct</code>
<ul>
<li>state: <code>.CT</code></li>
<li>action: <code>.CT</code></li>
<li>properties: <code>[object Object]</code></li>
</ul>
<li><code>hue</code>
<ul>
<li>state: <code>.Hue</code></li>
<li>action: <code>.Hue</code></li>
</ul>
<li><code>sat</code>
<ul>
<li>state: <code>.Saturation</code></li>
<li>action: <code>.Saturation</code></li>
</ul>
</ul>
<h4>Adapter shelly</h4>
<ul>
<li><code>power</code>
<ul>
<li>state: <code>.lights.Switch</code></li>
<li>action: <code>.lights.Switch</code></li>
</ul>
<li><code>level</code>
<ul>
<li>state: <code>.lights.brightness</code></li>
<li>action: <code>.lights.brightness</code></li>
</ul>
</ul>

<h2>Gewerk Ort (<code>location</code>)</h2>
<h3>vordefinierte Datenpunkte</h3>
<table><tr><th>Datenpunkt Bezeichner</th><th>Datenpunkt Stil</th><th>Anzeige</th><th>Einheit</th><th>Icon</th><th>Icon Stil</th></tr>
<tr><td><code>_any</code></td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr><td><code>position</code></td><td>-</td><td>-</td><td>-</td><td><pre lang="json">"map-marker"</pre></td><td>-</td></tr>
<tr><td><code>presence</code></td><td>-</td><td><pre lang="json">{
   "true": "anwesend",
   "false": "abwesend"
}</pre></td><td>-</td><td><pre lang="json">{
   "true": "map-marker-radius",
   "false": "map-marker-remove-outline"
}</pre></td><td>-</td></tr>
<tr><td><code>users</code></td><td>-</td><td><pre lang="json">{
   "": "niemand anwesend"
}</pre></td><td>-</td><td><pre lang="json">{
   "": "account-group-outline",
   "default": "account-group"
}</pre></td><td>-</td></tr>
</table>

<h2>Gewerk Bewegungs-/Präsenzmelder (<code>motion</code>)</h2>
<h3>vordefinierte Datenpunkte</h3>
<table><tr><th>Datenpunkt Bezeichner</th><th>Datenpunkt Stil</th><th>Anzeige</th><th>Einheit</th><th>Icon</th><th>Icon Stil</th></tr>
<tr><td><code>_any</code></td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr><td><code>motion</code></td><td>-</td><td>-</td><td>-</td><td><pre lang="json">{
   "true": "motion-sensor",
   "false": "motion-sensor-off"
}</pre></td><td>-</td></tr>
<tr><td><code>presence</code></td><td>-</td><td>-</td><td>-</td><td><pre lang="json">{
   "true": "motion-sensor",
   "false": "motion-sensor-off"
}</pre></td><td>-</td></tr>
</table>
<h3>Beispielkonfiguration</h3>
<h4>Adapter hm-rpc</h4>
<h5>HmIP-SMI55</h5>
<ul>
<li><code>motion</code>
<ul>
<li>state: <code>.3.MOTION</code></li>
</ul>
<li><code>brightness</code>
<ul>
<li>state: <code>.3.BRIGHTNESS</code></li>
</ul>
</ul>
<h5>HmIP-SMI</h5>
<ul>
<li><code>motion</code>
<ul>
<li>state: <code>.1.MOTION</code></li>
</ul>
<li><code>illumination</code>
<ul>
<li>state: <code>.1.ILLUMINATION</code></li>
</ul>
</ul>
<h5>HmIP-SMO-A</h5>
<ul>
<li><code>motion</code>
<ul>
<li>state: <code>.1.MOTION</code></li>
</ul>
<li><code>illumination</code>
<ul>
<li>state: <code>.1.ILLUMINATION</code></li>
</ul>
</ul>
<h5>HmIP-SAM</h5>
<ul>
<li><code>motion</code>
<ul>
<li>state: <code>.1.MOTION</code></li>
</ul>
<li><code>illumination</code>
<ul>
<li>state: <code>.1.ILLUMINATION</code></li>
</ul>
</ul>
<h5>HmIP-SPI</h5>
<ul>
<li><code>presence</code>
<ul>
<li>state: <code>.1.PRESENCE_DETECTION_STATE</code></li>
</ul>
<li><code>illumination</code>
<ul>
<li>state: <code>.1.ILLUMINATION</code></li>
</ul>
</ul>
<h5>HM-PB-6-WM55</h5>
<ul>
<li><code>PRESS_LONG1</code>
<ul>
<li>state: <code>.1.PRESS_LONG</code></li>
<li>action: <code>.1.PRESS_LONG</code></li>
</ul>
<li><code>PRESS_SHORT1</code>
<ul>
<li>state: <code>.1.PRESS_SHORT</code></li>
<li>action: <code>.1.PRESS_SHORT</code></li>
</ul>
<li><code>PRESS_LONG2</code>
<ul>
<li>state: <code>.2.PRESS_LONG</code></li>
<li>action: <code>.2.PRESS_LONG</code></li>
</ul>
<li><code>PRESS_SHORT2</code>
<ul>
<li>state: <code>.2.PRESS_SHORT</code></li>
<li>action: <code>.2.PRESS_SHORT</code></li>
</ul>
<li><code>PRESS_LONG3</code>
<ul>
<li>state: <code>.3.PRESS_LONG</code></li>
<li>action: <code>.3.PRESS_LONG</code></li>
</ul>
<li><code>PRESS_SHORT3</code>
<ul>
<li>state: <code>.3.PRESS_SHORT</code></li>
<li>action: <code>.3.PRESS_SHORT</code></li>
</ul>
<li><code>PRESS_LONG4</code>
<ul>
<li>state: <code>.4.PRESS_LONG</code></li>
<li>action: <code>.4.PRESS_LONG</code></li>
</ul>
<li><code>PRESS_SHORT4</code>
<ul>
<li>state: <code>.4.PRESS_SHORT</code></li>
<li>action: <code>.4.PRESS_SHORT</code></li>
</ul>
<li><code>PRESS_LONG5</code>
<ul>
<li>state: <code>.5.PRESS_LONG</code></li>
<li>action: <code>.5.PRESS_LONG</code></li>
</ul>
<li><code>PRESS_SHORT5</code>
<ul>
<li>state: <code>.5.PRESS_SHORT</code></li>
<li>action: <code>.5.PRESS_SHORT</code></li>
</ul>
<li><code>PRESS_LONG6</code>
<ul>
<li>state: <code>.6.PRESS_LONG</code></li>
<li>action: <code>.6.PRESS_LONG</code></li>
</ul>
<li><code>PRESS_SHORT6</code>
<ul>
<li>state: <code>.6.PRESS_SHORT</code></li>
<li>action: <code>.6.PRESS_SHORT</code></li>
</ul>
</ul>
<h5>HM-Sen-MDIR-WM55</h5>
<ul>
<li><code>PRESS_LONG_BOTTOM</code>
<ul>
<li>state: <code>.1.PRESS_LONG</code></li>
<li>action: <code>.1.PRESS_LONG</code></li>
</ul>
<li><code>PRESS_SHORT_BOTTOM</code>
<ul>
<li>state: <code>.1.PRESS_SHORT</code></li>
<li>action: <code>.1.PRESS_SHORT</code></li>
</ul>
<li><code>PRESS_LONG_TOP</code>
<ul>
<li>state: <code>.2.PRESS_LONG</code></li>
<li>action: <code>.2.PRESS_LONG</code></li>
</ul>
<li><code>PRESS_SHORT_TOP</code>
<ul>
<li>state: <code>.2.PRESS_SHORT</code></li>
<li>action: <code>.2.PRESS_SHORT</code></li>
</ul>
<li><code>motion</code>
<ul>
<li>state: <code>.3.MOTION</code></li>
</ul>
<li><code>illumination</code>
<ul>
<li>state: <code>.3.ILLUMINATION</code></li>
</ul>
</ul>
<h5>HM-Sen-MDIR-O-2</h5>
<ul>
<li><code>motion</code>
<ul>
<li>state: <code>.1.MOTION</code></li>
</ul>
<li><code>brightness</code>
<ul>
<li>state: <code>.1.BRIGHTNESS</code></li>
</ul>
</ul>
<h5>HM-Sen-MDIR-O-3</h5>
<ul>
<li><code>motion</code>
<ul>
<li>state: <code>.1.MOTION</code></li>
</ul>
<li><code>brightness</code>
<ul>
<li>state: <code>.1.BRIGHTNESS</code></li>
</ul>
</ul>
<h4>Adapter hmip</h4>
<h5>HmIP-SMI</h5>
<ul>
<li><code>motion</code>
<ul>
<li>state: <code>.channels.1.motionDetected</code></li>
</ul>
<li><code>illumination</code>
<ul>
<li>state: <code>.channels.1.illumination</code></li>
</ul>
</ul>

<h2>Gewerk Rasenmäher-Roboter (<code>mower</code>)</h2>
<h3>vordefinierte Datenpunkte</h3>
<table><tr><th>Datenpunkt Bezeichner</th><th>Datenpunkt Stil</th><th>Anzeige</th><th>Einheit</th><th>Icon</th><th>Icon Stil</th></tr>
<tr><td><code>_any</code></td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
</table>

<h2>Gewerk Szenen (<code>scenes</code>)</h2>
<h3>vordefinierte Datenpunkte</h3>
<table><tr><th>Datenpunkt Bezeichner</th><th>Datenpunkt Stil</th><th>Anzeige</th><th>Einheit</th><th>Icon</th><th>Icon Stil</th></tr>
</table>

<h2>Gewerk Sensor (<code>sensor</code>)</h2>
<h3>vordefinierte Datenpunkte</h3>
<table><tr><th>Datenpunkt Bezeichner</th><th>Datenpunkt Stil</th><th>Anzeige</th><th>Einheit</th><th>Icon</th><th>Icon Stil</th></tr>
<tr><td><code>_any</code></td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr><td><code>temperature</code></td><td>-</td><td>-</td><td><code>°C</code></td><td><pre lang="json">"mdi-thermometer"</pre></td><td>-</td></tr>
<tr><td><code>humidity</code></td><td>-</td><td>-</td><td><code>%</code></td><td>-</td><td>-</td></tr>
<tr><td><code>illumination</code></td><td>-</td><td>-</td><td><code>lux</code></td><td><pre lang="json">"mdi-brightness-7"</pre></td><td>-</td></tr>
<tr><td><code>pressure</code></td><td>-</td><td>-</td><td><code>hPa</code></td><td><pre lang="json">"mdi-air-purifier"</pre></td><td>-</td></tr>
</table>
<h3>Beispielkonfiguration</h3>
<h4>Adapter hm-rpc</h4>
<h5>HM-Sec-TiS</h5>
<ul>
<li><code>power</code>
<ul>
<li>state: <code>.1.STATE</code></li>
</ul>
</ul>
<h5>HmIP-SLO</h5>
<ul>
<li><code>illuminationAverage</code>
<ul>
<li>state: <code>.1.AVERAGE_ILLUMINATION</code></li>
<li>unit: <code> Lux</code></li>
</ul>
<li><code>illuminationCurrent</code>
<ul>
<li>state: <code>.1.CURRENT_ILLUMINATION</code></li>
<li>unit: <code> Lux</code></li>
</ul>
<li><code>illuminationHighest</code>
<ul>
<li>state: <code>.1.HIGHEST_ILLUMINATION</code></li>
<li>unit: <code> Lux</code></li>
</ul>
<li><code>illuminationLowest</code>
<ul>
<li>state: <code>.1.LOWEST_ILLUMINATION</code></li>
<li>unit: <code> Lux</code></li>
</ul>
</ul>
<h5>HmIP-SWD</h5>
<ul>
<li><code>alarm</code>
<ul>
<li>state: <code>.1.ALARMSTATE</code></li>
</ul>
<li><code>alarmMoisture</code>
<ul>
<li>state: <code>.1.MOISTURE_DETECTED</code></li>
</ul>
<li><code>alarmWaterlevel</code>
<ul>
<li>state: <code>.1.WATERLEVEL_DETECTED</code></li>
</ul>
</ul>
<h5>HM-Sec-WDS-2</h5>
<ul>
<li><code>alarm</code>
<ul>
<li>state: <code>.1.STATE</code></li>
</ul>
</ul>

<h2>Gewerk Server (<code>server</code>)</h2>
<h3>vordefinierte Datenpunkte</h3>
<table><tr><th>Datenpunkt Bezeichner</th><th>Datenpunkt Stil</th><th>Anzeige</th><th>Einheit</th><th>Icon</th><th>Icon Stil</th></tr>
<tr><td><code>_any</code></td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr><td><code>power</code></td><td>-</td><td>-</td><td>-</td><td><pre lang="json">{
   "true": "server-network",
   "false": "server-network-off"
}</pre></td><td>-</td></tr>
</table>

<h2>Gewerk Rauchmelder (<code>smoke</code>)</h2>
<h3>vordefinierte Datenpunkte</h3>
<table><tr><th>Datenpunkt Bezeichner</th><th>Datenpunkt Stil</th><th>Anzeige</th><th>Einheit</th><th>Icon</th><th>Icon Stil</th></tr>
<tr><td><code>_any</code></td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr><td><code>alarm</code></td><td>-</td><td>-</td><td>-</td><td><pre lang="json">{
   "true": "mdi-alarm-light",
   "false": "mdi-alarm-light-outline"
}</pre></td><td>-</td></tr>
</table>
<h3>Beispielkonfiguration</h3>
<h4>Adapter hm-rpc</h4>
<h5>HmIP-SWSD</h5>
<ul>
<li><code>alarm</code>
<ul>
<li>state: <code>.1.SMOKE_DETECTOR_ALARM_STATUS</code></li>
<li>display: <code>[object Object]</code></li>
</ul>
</ul>
<h5>HM-Sec-SD</h5>
<ul>
<li><code>alarm</code>
<ul>
<li>state: <code>.1.STATE</code></li>
</ul>
<li><code>lowBatteryCh1</code>
<ul>
<li>state: <code>.1.LOWBAT</code></li>
</ul>
</ul>
<h5>HM-Sec-SD-2</h5>
<ul>
<li><code>alarm</code>
<ul>
<li>state: <code>.1.STATE</code></li>
</ul>
<li><code>lowBatteryCh1</code>
<ul>
<li>state: <code>.1.LOWBAT</code></li>
</ul>
</ul>
<h5>HM-Sec-SD-2-Team</h5>
<ul>
<li><code>alarm</code>
<ul>
<li>state: <code>.1.STATE</code></li>
</ul>
</ul>

<h2>Gewerk Steckdose (<code>socket</code>)</h2>
<h3>vordefinierte Datenpunkte</h3>
<table><tr><th>Datenpunkt Bezeichner</th><th>Datenpunkt Stil</th><th>Anzeige</th><th>Einheit</th><th>Icon</th><th>Icon Stil</th></tr>
<tr><td><code>_any</code></td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr><td><code>power</code></td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr><td><code>consumption</code></td><td>-</td><td>-</td><td><code>W</code></td><td><pre lang="json">{
   "default": "mdi-power-plug-off-outline",
   ">0": "mdi-power-plug"
}</pre></td><td>-</td></tr>
<tr><td><code>meter</code></td><td>-</td><td>-</td><td><code>W</code></td><td><pre lang="json">{
   "default": "mdi-power-plug-off-outline",
   ">0": "mdi-power-plug"
}</pre></td><td>-</td></tr>
</table>
<h3>Beispielkonfiguration</h3>
<h4>Adapter hm-rpc</h4>
<h5>HmIP-FSM</h5>
<ul>
<li><code>power</code>
<ul>
<li>state: <code>.2.STATE</code></li>
<li>action: <code>.2.STATE</code></li>
</ul>
<li><code>timerOff</code>
<ul>
<li>state: <code>.2.ON_TIME</code></li>
<li>action: <code>.2.ON_TIME</code></li>
</ul>
<li><code>powerCurrent</code>
<ul>
<li>state: <code>.5.CURRENT</code></li>
<li>unit: <code> mA</code></li>
</ul>
<li><code>powerFrequency</code>
<ul>
<li>state: <code>.5.FREQUENCY</code></li>
</ul>
<li><code>powerCounter</code>
<ul>
<li>state: <code>.5.ENERGY_COUNTER</code></li>
<li>unit: <code> Wh</code></li>
</ul>
<li><code>powerMeter</code>
<ul>
<li>state: <code>.5.POWER</code></li>
<li>unit: <code> W</code></li>
</ul>
<li><code>powerVoltage</code>
<ul>
<li>state: <code>.5.VOLTAGE</code></li>
<li>unit: <code> V</code></li>
</ul>
</ul>
<h5>HmIP-PS</h5>
<ul>
<li><code>power</code>
<ul>
<li>state: <code>.3.STATE</code></li>
</ul>
</ul>
<h5>HmIP-PSM</h5>
<ul>
<li><code>power</code>
<ul>
<li>state: <code>.3.STATE</code></li>
</ul>
<li><code>meter</code>
<ul>
<li>state: <code>.6.POWER</code></li>
</ul>
</ul>
<h5>HM-ES-PMSw1-Pl-DN-R1</h5>
<ul>
<li><code>power</code>
<ul>
<li>state: <code>.1.STATE</code></li>
<li>action: <code>.1.STATE</code></li>
</ul>
<li><code>timerOff</code>
<ul>
<li>state: <code>.1.ON_TIME</code></li>
<li>action: <code>.1.ON_TIME</code></li>
</ul>
<li><code>powerCurrent</code>
<ul>
<li>state: <code>.2.CURRENT</code></li>
<li>unit: <code> mA</code></li>
</ul>
<li><code>powerFrequency</code>
<ul>
<li>state: <code>.2.FREQUENCY</code></li>
</ul>
<li><code>powerCounter</code>
<ul>
<li>state: <code>.2.ENERGY_COUNTER</code></li>
<li>unit: <code> Wh</code></li>
</ul>
<li><code>powerMeter</code>
<ul>
<li>state: <code>.2.POWER</code></li>
<li>unit: <code> W</code></li>
</ul>
<li><code>powerVoltage</code>
<ul>
<li>state: <code>.2.VOLTAGE</code></li>
<li>unit: <code> V</code></li>
</ul>
</ul>
<h5>HM-LC-Sw1-Pl-2</h5>
<ul>
<li><code>power</code>
<ul>
<li>state: <code>.1.STATE</code></li>
<li>action: <code>.1.STATE</code></li>
</ul>
<li><code>timerOff</code>
<ul>
<li>state: <code>.1.ON_TIME</code></li>
<li>action: <code>.1.ON_TIME</code></li>
</ul>
</ul>
<h5>HM-LC-Sw1-Pl-DN-R1</h5>
<ul>
<li><code>power</code>
<ul>
<li>state: <code>.1.STATE</code></li>
<li>action: <code>.1.STATE</code></li>
</ul>
<li><code>timerOff</code>
<ul>
<li>state: <code>.1.ON_TIME</code></li>
<li>action: <code>.1.ON_TIME</code></li>
</ul>
</ul>
<h5>HM-ES-PMSw1-DR</h5>
<ul>
<li><code>power</code>
<ul>
<li>state: <code>.1.STATE</code></li>
<li>action: <code>.1.STATE</code></li>
</ul>
<li><code>timerOff</code>
<ul>
<li>state: <code>.1.ON_TIME</code></li>
<li>action: <code>.1.ON_TIME</code></li>
</ul>
<li><code>boot</code>
<ul>
<li>state: <code>.2.BOOT</code></li>
<li>action: <code>.2.BOOT</code></li>
</ul>
<li><code>powerCurrent</code>
<ul>
<li>state: <code>.2.CURRENT</code></li>
<li>unit: <code> mA</code></li>
</ul>
<li><code>powerFrequency</code>
<ul>
<li>state: <code>.2.FREQUENCY</code></li>
</ul>
<li><code>powerCounter</code>
<ul>
<li>state: <code>.2.ENERGY_COUNTER</code></li>
<li>unit: <code> Wh</code></li>
</ul>
<li><code>powerMeter</code>
<ul>
<li>state: <code>.2.POWER</code></li>
<li>unit: <code> W</code></li>
</ul>
<li><code>powerVoltage</code>
<ul>
<li>state: <code>.2.VOLTAGE</code></li>
<li>unit: <code> V</code></li>
</ul>
</ul>
<h5>HM-ES-PMSw1-Pl</h5>
<ul>
<li><code>power</code>
<ul>
<li>state: <code>.1.STATE</code></li>
<li>action: <code>.1.STATE</code></li>
</ul>
<li><code>timerOff</code>
<ul>
<li>state: <code>.1.ON_TIME</code></li>
<li>action: <code>.1.ON_TIME</code></li>
</ul>
<li><code>boot</code>
<ul>
<li>state: <code>.2.BOOT</code></li>
<li>action: <code>.2.BOOT</code></li>
</ul>
<li><code>powerCurrent</code>
<ul>
<li>state: <code>.2.CURRENT</code></li>
<li>unit: <code> mA</code></li>
</ul>
<li><code>powerFrequency</code>
<ul>
<li>state: <code>.2.FREQUENCY</code></li>
</ul>
<li><code>powerCounter</code>
<ul>
<li>state: <code>.2.ENERGY_COUNTER</code></li>
<li>unit: <code> Wh</code></li>
</ul>
<li><code>powerMeter</code>
<ul>
<li>state: <code>.2.POWER</code></li>
<li>unit: <code> W</code></li>
</ul>
<li><code>powerVoltage</code>
<ul>
<li>state: <code>.2.VOLTAGE</code></li>
<li>unit: <code> V</code></li>
</ul>
</ul>
<h4>Adapter hmip</h4>
<h5>HmIP-PS</h5>
<ul>
<li><code>power</code>
<ul>
<li>state: <code>.channels.1.on</code></li>
<li>action: <code>.channels.1.on</code></li>
</ul>
</ul>

<h2>Gewerk Lautsprecher (<code>speaker</code>)</h2>
<h3>vordefinierte Datenpunkte</h3>
<table><tr><th>Datenpunkt Bezeichner</th><th>Datenpunkt Stil</th><th>Anzeige</th><th>Einheit</th><th>Icon</th><th>Icon Stil</th></tr>
<tr><td><code>_any</code></td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
</table>

<h2>Gewerk Schalter (<code>switch</code>)</h2>
<h3>vordefinierte Datenpunkte</h3>
<table><tr><th>Datenpunkt Bezeichner</th><th>Datenpunkt Stil</th><th>Anzeige</th><th>Einheit</th><th>Icon</th><th>Icon Stil</th></tr>
<tr><td><code>power</code></td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
</table>
<h3>Beispielkonfiguration</h3>
<h4>Adapter hm-rpc</h4>
<h5>HmIP-WRC2</h5>
<ul>
<li><code>PRESS_LONG_BOTTOM</code>
<ul>
<li>state: <code>.1.PRESS_LONG</code></li>
<li>action: <code>.1.PRESS_LONG</code></li>
</ul>
<li><code>PRESS_SHORT_BOTTOM</code>
<ul>
<li>state: <code>.1.PRESS_SHORT</code></li>
<li>action: <code>.1.PRESS_SHORT</code></li>
</ul>
<li><code>PRESS_LONG_TOP</code>
<ul>
<li>state: <code>.2.PRESS_LONG</code></li>
<li>action: <code>.2.PRESS_LONG</code></li>
</ul>
<li><code>PRESS_SHORT_TOP</code>
<ul>
<li>state: <code>.2.PRESS_SHORT</code></li>
<li>action: <code>.2.PRESS_SHORT</code></li>
</ul>
</ul>
<h5>HM-RC-2-PBU-FM</h5>
<ul>
<li><code>PRESS_CONT_BOTTOM</code>
<ul>
<li>state: <code>.1.PRESS_CONT</code></li>
<li>action: <code>.1.PRESS_CONT</code></li>
</ul>
<li><code>PRESS_LONG_BOTTOM</code>
<ul>
<li>state: <code>.1.PRESS_LONG</code></li>
<li>action: <code>.1.PRESS_LONG</code></li>
</ul>
<li><code>PRESS_LONGRELEASE_BOTTOM</code>
<ul>
<li>state: <code>.1.PRESS_LONG_RELEASE</code></li>
<li>action: <code>.1.PRESS_LONG_RELEASE</code></li>
</ul>
<li><code>PRESS_SHORT_BOTTOM</code>
<ul>
<li>state: <code>.1.PRESS_SHORT</code></li>
<li>action: <code>.1.PRESS_SHORT</code></li>
</ul>
<li><code>PRESS_CONT_TOP</code>
<ul>
<li>state: <code>.2.PRESS_CONT</code></li>
<li>action: <code>.2.PRESS_CONT</code></li>
</ul>
<li><code>PRESS_LONG_TOP</code>
<ul>
<li>state: <code>.2.PRESS_LONG</code></li>
<li>action: <code>.2.PRESS_LONG</code></li>
</ul>
<li><code>PRESS_LONGRELEASE_TOP</code>
<ul>
<li>state: <code>.2.PRESS_LONG_RELEASE</code></li>
<li>action: <code>.2.PRESS_LONG_RELEASE</code></li>
</ul>
<li><code>PRESS_SHORT_TOP</code>
<ul>
<li>state: <code>.2.PRESS_SHORT</code></li>
<li>action: <code>.2.PRESS_SHORT</code></li>
</ul>
</ul>
<h5>HM-LC-Sw1-DR</h5>
<ul>
<li><code>power</code>
<ul>
<li>state: <code>.1.STATE</code></li>
<li>action: <code>.1.STATE</code></li>
</ul>
</ul>
<h5>HM-LC-SW1-FM</h5>
<ul>
<li><code>power</code>
<ul>
<li>state: <code>.1.STATE</code></li>
<li>action: <code>.1.STATE</code></li>
</ul>
</ul>
<h5>HM-PB-2-WM55</h5>
<ul>
<li><code>lowBatteryCh1</code>
<ul>
<li>state: <code>.1.LOWBAT</code></li>
</ul>
<li><code>PRESS_LONG_BOTTOM</code>
<ul>
<li>state: <code>.1.PRESS_LONG</code></li>
<li>action: <code>.1.PRESS_LONG</code></li>
</ul>
<li><code>PRESS_SHORT_BOTTOM</code>
<ul>
<li>state: <code>.1.PRESS_SHORT</code></li>
<li>action: <code>.1.PRESS_SHORT</code></li>
</ul>
<li><code>PRESS_LONG_TOP</code>
<ul>
<li>state: <code>.2.PRESS_LONG</code></li>
<li>action: <code>.2.PRESS_LONG</code></li>
</ul>
<li><code>PRESS_SHORT_TOP</code>
<ul>
<li>state: <code>.2.PRESS_SHORT</code></li>
<li>action: <code>.2.PRESS_SHORT</code></li>
</ul>
</ul>
<h5>HB-UNI-SenAct-4-4-RC</h5>
<ul>
<li><code>state1</code>
<ul>
<li>state: <code>.1.STATE</code></li>
</ul>
<li><code>state2</code>
<ul>
<li>state: <code>.2.STATE</code></li>
</ul>
<li><code>state3</code>
<ul>
<li>state: <code>.3.STATE</code></li>
</ul>
<li><code>state4</code>
<ul>
<li>state: <code>.4.STATE</code></li>
</ul>
<li><code>PRESS_LONG1</code>
<ul>
<li>state: <code>.5.PRESS_LONG</code></li>
<li>action: <code>.5.PRESS_LONG</code></li>
</ul>
<li><code>PRESS_SHORT1</code>
<ul>
<li>state: <code>.5.PRESS_SHORT</code></li>
<li>action: <code>.5.PRESS_SHORT</code></li>
</ul>
<li><code>PRESS_LONG2</code>
<ul>
<li>state: <code>.6.PRESS_LONG</code></li>
<li>action: <code>.6.PRESS_LONG</code></li>
</ul>
<li><code>PRESS_SHORT2</code>
<ul>
<li>state: <code>.6.PRESS_SHORT</code></li>
<li>action: <code>.6.PRESS_SHORT</code></li>
</ul>
<li><code>PRESS_LONG3</code>
<ul>
<li>state: <code>.7.PRESS_LONG</code></li>
<li>action: <code>.7.PRESS_LONG</code></li>
</ul>
<li><code>PRESS_SHORT3</code>
<ul>
<li>state: <code>.7.PRESS_SHORT</code></li>
<li>action: <code>.7.PRESS_SHORT</code></li>
</ul>
<li><code>PRESS_LONG4</code>
<ul>
<li>state: <code>.8.PRESS_LONG</code></li>
<li>action: <code>.8.PRESS_LONG</code></li>
</ul>
<li><code>PRESS_SHORT4</code>
<ul>
<li>state: <code>.8.PRESS_SHORT</code></li>
<li>action: <code>.8.PRESS_SHORT</code></li>
</ul>
</ul>

<h2>Gewerk Fernseher (<code>tv</code>)</h2>
<h3>vordefinierte Datenpunkte</h3>
<table><tr><th>Datenpunkt Bezeichner</th><th>Datenpunkt Stil</th><th>Anzeige</th><th>Einheit</th><th>Icon</th><th>Icon Stil</th></tr>
<tr><td><code>_any</code></td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr><td><code>power</code></td><td>-</td><td>-</td><td>-</td><td><pre lang="json">{
   "true": "television-clean",
   "false": "television-off"
}</pre></td><td>-</td></tr>
</table>

<h2>Gewerk Benutzer (<code>user</code>)</h2>
<h3>vordefinierte Datenpunkte</h3>
<table><tr><th>Datenpunkt Bezeichner</th><th>Datenpunkt Stil</th><th>Anzeige</th><th>Einheit</th><th>Icon</th><th>Icon Stil</th></tr>
<tr><td><code>_any</code></td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr><td><code>position</code></td><td>-</td><td>-</td><td>-</td><td><pre lang="json">"map-marker"</pre></td><td>-</td></tr>
<tr><td><code>location</code></td><td>-</td><td>-</td><td>-</td><td><pre lang="json">"account"</pre></td><td>-</td></tr>
<tr><td><code>battery</code></td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
</table>

<h2>Gewerk Staubsauger-Roboter (<code>vacuum</code>)</h2>
<h3>vordefinierte Datenpunkte</h3>
<table><tr><th>Datenpunkt Bezeichner</th><th>Datenpunkt Stil</th><th>Anzeige</th><th>Einheit</th><th>Icon</th><th>Icon Stil</th></tr>
<tr><td><code>_any</code></td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
</table>

<h2>Gewerk Wetter-Station (<code>weather-station</code>)</h2>
<h3>vordefinierte Datenpunkte</h3>
<table><tr><th>Datenpunkt Bezeichner</th><th>Datenpunkt Stil</th><th>Anzeige</th><th>Einheit</th><th>Icon</th><th>Icon Stil</th></tr>
<tr><td><code>_any</code></td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr><td><code>humidity</code></td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr><td><code>wind</code></td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr><td><code>temperature</code></td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr><td><code>illumination</code></td><td>-</td><td>-</td><td>-</td><td><pre lang="json">"mdi-brightness-7"</pre></td><td>-</td></tr>
<tr><td><code>sunshineduration</code></td><td>-</td><td>-</td><td>-</td><td><pre lang="json">"mdi-weather-sunny"</pre></td><td>-</td></tr>
</table>
<h3>Beispielkonfiguration</h3>
<h4>Adapter hm-rpc</h4>
<h5>HmIP-STHO</h5>
<ul>
<li><code>temperature</code>
<ul>
<li>state: <code>.1.ACTUAL_TEMPERATURE</code></li>
</ul>
<li><code>humidity</code>
<ul>
<li>state: <code>.1.HUMIDITY</code></li>
</ul>
</ul>
<h5>HmIP-STHO-A</h5>
<ul>
<li><code>temperature</code>
<ul>
<li>state: <code>.1.ACTUAL_TEMPERATURE</code></li>
</ul>
<li><code>humidity</code>
<ul>
<li>state: <code>.1.HUMIDITY</code></li>
</ul>
</ul>
<h5>HmIP-SWO-B</h5>
<ul>
<li><code>humidity</code>
<ul>
<li>state: <code>.1.HUMIDITY</code></li>
</ul>
<li><code>wind</code>
<ul>
<li>state: <code>.1.WIND_SPEED</code></li>
</ul>
<li><code>temperature</code>
<ul>
<li>state: <code>.1.ACTUAL_TEMPERATURE</code></li>
</ul>
<li><code>illumination</code>
<ul>
<li>state: <code>.1.ILLUMINATION</code></li>
</ul>
<li><code>sunshineDuration</code>
<ul>
<li>state: <code>.1.SUNSHINEDURATION</code></li>
</ul>
</ul>
<h5>HmIP-SWO-PL</h5>
<ul>
<li><code>humidity</code>
<ul>
<li>state: <code>.1.HUMIDITY</code></li>
</ul>
<li><code>wind</code>
<ul>
<li>state: <code>.1.WIND_SPEED</code></li>
</ul>
<li><code>temperature</code>
<ul>
<li>state: <code>.1.ACTUAL_TEMPERATURE</code></li>
</ul>
<li><code>illumination</code>
<ul>
<li>state: <code>.1.ILLUMINATION</code></li>
</ul>
<li><code>sunshineDuration</code>
<ul>
<li>state: <code>.1.SUNSHINEDURATION</code></li>
</ul>
<li><code>raining</code>
<ul>
<li>state: <code>.1.RAINING</code></li>
</ul>
<li><code>rainCounter</code>
<ul>
<li>state: <code>.1.RAIN_COUNTER</code></li>
</ul>
</ul>
<h5>HM-WDS40-TH-I-2</h5>
<ul>
<li><code>temperature</code>
<ul>
<li>state: <code>.1.TEMPERATURE</code></li>
</ul>
<li><code>humidity</code>
<ul>
<li>state: <code>.1.HUMIDITY</code></li>
</ul>
</ul>
<h4>Adapter hmip</h4>
<h5>HmIP-STHO</h5>
<ul>
<li><code>temperature</code>
<ul>
<li>state: <code>.channels.1.actualTemperature</code></li>
</ul>
<li><code>humidity</code>
<ul>
<li>state: <code>.channels.1.humidity</code></li>
</ul>
<li><code>vapor</code>
<ul>
<li>state: <code>.channels.1.vaporAmount</code></li>
</ul>
<li><code>display</code>
<ul>
<li>state: <code>.channels.1.display</code></li>
</ul>
</ul>
<h5>HmIP-STHO-A</h5>
<ul>
<li><code>temperature</code>
<ul>
<li>state: <code>.1.ACTUAL_TEMPERATURE</code></li>
</ul>
<li><code>humidity</code>
<ul>
<li>state: <code>.1.HUMIDITY</code></li>
</ul>
</ul>
<h5>HmIP-SWO-B</h5>
<ul>
<li><code>humidity</code>
<ul>
<li>state: <code>.1.HUMIDITY</code></li>
</ul>
<li><code>wind</code>
<ul>
<li>state: <code>.1.WIND_SPEED</code></li>
</ul>
<li><code>temperature</code>
<ul>
<li>state: <code>.1.ACTUAL_TEMPERATURE</code></li>
</ul>
<li><code>illumination</code>
<ul>
<li>state: <code>.1.ILLUMINATION</code></li>
</ul>
<li><code>sunshineduration</code>
<ul>
<li>state: <code>.1.SUNSHINEDURATION</code></li>
</ul>
</ul>

<h2>Gewerk Fenster (<code>window</code>)</h2>
<h3>vordefinierte Datenpunkte</h3>
<table><tr><th>Datenpunkt Bezeichner</th><th>Datenpunkt Stil</th><th>Anzeige</th><th>Einheit</th><th>Icon</th><th>Icon Stil</th></tr>
<tr><td><code>_any</code></td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr><td><code>open</code></td><td>-</td><td><pre lang="json">{
   "0": "geschlossen",
   "1": "offen",
   "2": "offen",
   "false": "geschlossen",
   "true": "offen"
}</pre></td><td>-</td><td><pre lang="json">{
   "0": "window-closed-variant",
   "1": "window-open-variant",
   "false": "window-closed-variant",
   "true": "window-open-variant"
}</pre></td><td>-</td></tr>
</table>
<h3>Beispielkonfiguration</h3>
<h4>Adapter hm-rpc</h4>
<h5>HmIP-SWDM</h5>
<ul>
<li><code>open</code>
<ul>
<li>state: <code>.1.STATE</code></li>
</ul>
</ul>
<h5>HmIP-SWDO-I</h5>
<ul>
<li><code>open</code>
<ul>
<li>state: <code>.1.STATE</code></li>
</ul>
</ul>
<h5>HmIP-SWDO</h5>
<ul>
<li><code>open</code>
<ul>
<li>state: <code>.1.STATE</code></li>
</ul>
</ul>
<h5>HmIP-SRH</h5>
<ul>
<li><code>open</code>
<ul>
<li>state: <code>.1.STATE</code></li>
<li>display: <code>[object Object]</code></li>
</ul>
</ul>
<h5>HM-Sec-RHS</h5>
<ul>
<li><code>open</code>
<ul>
<li>state: <code>.1.STATE</code></li>
<li>display: <code>[object Object]</code></li>
</ul>
</ul>
<h5>HM-Sec-Sco</h5>
<ul>
<li><code>open</code>
<ul>
<li>state: <code>.1.STATE</code></li>
</ul>
</ul>
<h5>HM-Sec-SC-2</h5>
<ul>
<li><code>open</code>
<ul>
<li>state: <code>.1.STATE</code></li>
</ul>
</ul>
<h4>Adapter hmip</h4>
<h5>HmIP-SWDO</h5>
<ul>
<li><code>open</code>
<ul>
<li>state: <code>.channels.1.windowOpen</code></li>
</ul>
</ul>
<h5>HmIP-SWDO-I</h5>
<ul>
<li><code>open</code>
<ul>
<li>state: <code>.channels.1.windowOpen</code></li>
</ul>
</ul>
<h5>HmIP-SRH</h5>
<ul>
<li><code>open</code>
<ul>
<li>state: <code>.channels.1.windowOpen</code></li>
</ul>
<li><code>state</code>
<ul>
<li>state: <code>.channels.1.windowState</code></li>
<li>display: <code>[object Object]</code></li>
</ul>
</ul>

<h2>Gewerk Sonstige (<code>_defaults</code>)</h2>
<h3>vordefinierte Datenpunkte</h3>
<table><tr><th>Datenpunkt Bezeichner</th><th>Datenpunkt Stil</th><th>Anzeige</th><th>Einheit</th><th>Icon</th><th>Icon Stil</th></tr>
<tr><td><code>_any</code></td><td><pre lang="json">{
   "true": {
      "color": "#090",
      "fontWeight": "bold"
   },
   "false": {
      "color": "#999"
   }
}</pre></td><td><pre lang="json">{
   "true": "an",
   "false": "aus"
}</pre></td><td>-</td><td>-</td><td>-</td></tr>
<tr><td><code>battery</code></td><td>-</td><td>-</td><td><code>%</code></td><td><pre lang="json">{
   ">80": "battery-high",
   "<=80": "battery-medium",
   "<=30": "battery-low",
   "<=10": "battery-outline blink",
   "<=5": "battery-alert-variant-outline blink"
}</pre></td><td><pre lang="json">{
   "<=10": {
      "color": "#900"
   }
}</pre></td></tr>
<tr><td><code>firmware</code></td><td>-</td><td><pre lang="json">{
   "true": "Update verfügbar",
   "false": "kein Update"
}</pre></td><td>-</td><td><pre lang="json">{
   "true": "mdi-cog-refresh",
   "false": "mdi-cog-outline"
}</pre></td><td>-</td></tr>
<tr><td><code>frost</code></td><td>-</td><td>-</td><td>-</td><td><pre lang="json">{
   "default": "mdi-snowflake"
}</pre></td><td>-</td></tr>
<tr><td><code>humidity</code></td><td>-</td><td>-</td><td><code>%</code></td><td><pre lang="json">"water-percent"</pre></td><td>-</td></tr>
<tr><td><code>illuminance</code></td><td>-</td><td>-</td><td><code>lux</code></td><td>-</td><td>-</td></tr>
<tr><td><code>level</code></td><td>-</td><td>-</td><td><code>%</code></td><td>-</td><td>-</td></tr>
<tr><td><code>lowbattery</code></td><td><pre lang="json">{
   "true": {
      "color": "#900",
      "fontWeight": "bold"
   },
   "false": {
      "color": "#999"
   }
}</pre></td><td><pre lang="json">{
   "true": "niedrig",
   "false": "voll"
}</pre></td><td>-</td><td><pre lang="json">{
   "true": "battery-alert-variant-outline",
   "false": "battery-high"
}</pre></td><td>-</td></tr>
<tr><td><code>position</code></td><td>-</td><td>-</td><td>-</td><td><pre lang="json">"map-marker"</pre></td><td>-</td></tr>
<tr><td><code>power</code></td><td>-</td><td>-</td><td>-</td><td><pre lang="json">"power"</pre></td><td>-</td></tr>
<tr><td><code>config</code></td><td>-</td><td>-</td><td>-</td><td><pre lang="json">{
   "default": "mdi-cog"
}</pre></td><td>-</td></tr>
<tr><td><code>connectivity</code></td><td>-</td><td>-</td><td>-</td><td><pre lang="json">{
   "default": "mdi-wifi-arrow-left-right"
}</pre></td><td>-</td></tr>
<tr><td><code>reachability</code></td><td><pre lang="json">{
   "true": {
      "color": "#090"
   },
   "false": {
      "color": "#900",
      "fontWeight": "bold"
   }
}</pre></td><td><pre lang="json">{
   "true": "erreichbar",
   "false": "nicht erreichbar"
}</pre></td><td>-</td><td><pre lang="json">{
   "true": "lan-connect",
   "false": "lan-disconnect"
}</pre></td><td>-</td></tr>
<tr><td><code>rssi</code></td><td>-</td><td>-</td><td>-</td><td><pre lang="json">{
   "default": "mdi-antenna"
}</pre></td><td>-</td></tr>
<tr><td><code>temperature</code></td><td>-</td><td>-</td><td><code>°C</code></td><td><pre lang="json">"thermometer"</pre></td><td>-</td></tr>
<tr><td><code>trigger</code></td><td>-</td><td>-</td><td>-</td><td><pre lang="json">"power"</pre></td><td>-</td></tr>
<tr><td><code>unreach</code></td><td><pre lang="json">{
   "true": {
      "color": "#900",
      "fontWeight": "bold"
   },
   "false": {
      "color": "#090"
   }
}</pre></td><td><pre lang="json">{
   "true": "nicht erreichbar",
   "false": "erreichbar"
}</pre></td><td>-</td><td><pre lang="json">{
   "true": "lan-disconnect",
   "false": "lan-connect"
}</pre></td><td>-</td></tr>
<tr><td><code>wind</code></td><td>-</td><td>-</td><td><code>km/h</code></td><td><pre lang="json">"weather-windy"</pre></td><td>-</td></tr>
</table>
<h3>Beispielkonfiguration</h3>
<h4>Adapter hm-rpc</h4>
<h5>HM-LC-Sw1PBU-FM</h5>
<ul>
<li><code>powerCh1</code>
<ul>
<li>state: <code>.1.STATE</code></li>
<li>action: <code>.1.STATE</code></li>
</ul>
<li><code>powerCh2</code>
<ul>
<li>state: <code>.2.STATE</code></li>
<li>action: <code>.2.STATE</code></li>
</ul>
<li><code>powerCh3</code>
<ul>
<li>state: <code>.3.STATE</code></li>
<li>action: <code>.3.STATE</code></li>
</ul>
<li><code>powerCh4</code>
<ul>
<li>state: <code>.4.STATE</code></li>
<li>action: <code>.4.STATE</code></li>
</ul>
<li><code>powerCh5</code>
<ul>
<li>state: <code>.5.STATE</code></li>
<li>action: <code>.5.STATE</code></li>
</ul>
<li><code>powerCh6</code>
<ul>
<li>state: <code>.6.STATE</code></li>
<li>action: <code>.6.STATE</code></li>
</ul>
<li><code>powerCh7</code>
<ul>
<li>state: <code>.7.STATE</code></li>
<li>action: <code>.7.STATE</code></li>
</ul>
<li><code>powerCh8</code>
<ul>
<li>state: <code>.8.STATE</code></li>
<li>action: <code>.8.STATE</code></li>
</ul>
<li><code>powerCh9</code>
<ul>
<li>state: <code>.9.STATE</code></li>
<li>action: <code>.9.STATE</code></li>
</ul>
<li><code>powerCh10</code>
<ul>
<li>state: <code>.10.STATE</code></li>
<li>action: <code>.10.STATE</code></li>
</ul>
<li><code>powerCh11</code>
<ul>
<li>state: <code>.11.STATE</code></li>
<li>action: <code>.11.STATE</code></li>
</ul>
<li><code>powerCh12</code>
<ul>
<li>state: <code>.12.STATE</code></li>
<li>action: <code>.12.STATE</code></li>
</ul>
<li><code>powerCh13</code>
<ul>
<li>state: <code>.13.STATE</code></li>
<li>action: <code>.13.STATE</code></li>
</ul>
<li><code>powerCh14</code>
<ul>
<li>state: <code>.14.STATE</code></li>
<li>action: <code>.14.STATE</code></li>
</ul>
<li><code>powerCh15</code>
<ul>
<li>state: <code>.15.STATE</code></li>
<li>action: <code>.15.STATE</code></li>
</ul>
<li><code>powerCh16</code>
<ul>
<li>state: <code>.16.STATE</code></li>
<li>action: <code>.16.STATE</code></li>
</ul>
</ul>
<h4>Adapter mihome-vacuum</h4>
<h5>state</h5>
<ul>
<li><code>0</code>
<ul>
<li>0: <code>.</code></li>
</ul>
<li><code>1</code>
<ul>
<li>0: <code>i</code></li>
</ul>
<li><code>2</code>
<ul>
<li>0: <code>n</code></li>
</ul>
<li><code>3</code>
<ul>
<li>0: <code>f</code></li>
</ul>
<li><code>4</code>
<ul>
<li>0: <code>o</code></li>
</ul>
<li><code>5</code>
<ul>
<li>0: <code>.</code></li>
</ul>
<li><code>6</code>
<ul>
<li>0: <code>q</code></li>
</ul>
<li><code>7</code>
<ul>
<li>0: <code>u</code></li>
</ul>
<li><code>8</code>
<ul>
<li>0: <code>e</code></li>
</ul>
<li><code>9</code>
<ul>
<li>0: <code>u</code></li>
</ul>
<li><code>10</code>
<ul>
<li>0: <code>e</code></li>
</ul>
</ul>
<h5>action</h5>
<ul>
<li><code>0</code>
<ul>
<li>0: <code>.</code></li>
</ul>
<li><code>1</code>
<ul>
<li>0: <code>c</code></li>
</ul>
<li><code>2</code>
<ul>
<li>0: <code>o</code></li>
</ul>
<li><code>3</code>
<ul>
<li>0: <code>n</code></li>
</ul>
<li><code>4</code>
<ul>
<li>0: <code>t</code></li>
</ul>
<li><code>5</code>
<ul>
<li>0: <code>r</code></li>
</ul>
<li><code>6</code>
<ul>
<li>0: <code>o</code></li>
</ul>
<li><code>7</code>
<ul>
<li>0: <code>l</code></li>
</ul>
<li><code>8</code>
<ul>
<li>0: <code>.</code></li>
</ul>
<li><code>9</code>
<ul>
<li>0: <code>c</code></li>
</ul>
<li><code>10</code>
<ul>
<li>0: <code>l</code></li>
</ul>
<li><code>11</code>
<ul>
<li>0: <code>e</code></li>
</ul>
<li><code>12</code>
<ul>
<li>0: <code>a</code></li>
</ul>
<li><code>13</code>
<ul>
<li>0: <code>r</code></li>
</ul>
<li><code>14</code>
<ul>
<li>0: <code>Q</code></li>
</ul>
<li><code>15</code>
<ul>
<li>0: <code>u</code></li>
</ul>
<li><code>16</code>
<ul>
<li>0: <code>e</code></li>
</ul>
<li><code>17</code>
<ul>
<li>0: <code>u</code></li>
</ul>
<li><code>18</code>
<ul>
<li>0: <code>e</code></li>
</ul>
</ul>
<h4>Adapter mqtt</h4>
<h5>version</h5>
<ul>
<li><code>0</code>
<ul>
<li>0: <code>.</code></li>
<li>1: <code>V</code></li>
<li>2: <code>e</code></li>
<li>3: <code>r</code></li>
<li>4: <code>s</code></li>
<li>5: <code>i</code></li>
<li>6: <code>o</code></li>
<li>7: <code>n</code></li>
</ul>
<li><code>1</code>
<ul>
<li>0: <code>.</code></li>
<li>1: <code>I</code></li>
<li>2: <code>N</code></li>
<li>3: <code>F</code></li>
<li>4: <code>O</code></li>
<li>5: <code>.</code></li>
<li>6: <code>V</code></li>
<li>7: <code>e</code></li>
<li>8: <code>r</code></li>
<li>9: <code>s</code></li>
<li>10: <code>i</code></li>
<li>11: <code>o</code></li>
<li>12: <code>n</code></li>
</ul>
</ul>
<h5>reachability</h5>
<ul>
<li><code>0</code>
<ul>
<li>0: <code>.</code></li>
</ul>
<li><code>1</code>
<ul>
<li>0: <code>a</code></li>
</ul>
<li><code>2</code>
<ul>
<li>0: <code>l</code></li>
</ul>
<li><code>3</code>
<ul>
<li>0: <code>i</code></li>
</ul>
<li><code>4</code>
<ul>
<li>0: <code>v</code></li>
</ul>
<li><code>5</code>
<ul>
<li>0: <code>e</code></li>
</ul>
</ul>
<h5>ip</h5>
<ul>
<li><code>0</code>
<ul>
<li>0: <code>.</code></li>
</ul>
<li><code>1</code>
<ul>
<li>0: <code>I</code></li>
</ul>
<li><code>2</code>
<ul>
<li>0: <code>N</code></li>
</ul>
<li><code>3</code>
<ul>
<li>0: <code>F</code></li>
</ul>
<li><code>4</code>
<ul>
<li>0: <code>O</code></li>
</ul>
<li><code>5</code>
<ul>
<li>0: <code>.</code></li>
</ul>
<li><code>6</code>
<ul>
<li>0: <code>I</code></li>
</ul>
<li><code>7</code>
<ul>
<li>0: <code>P</code></li>
</ul>
<li><code>8</code>
<ul>
<li>0: <code>A</code></li>
</ul>
<li><code>9</code>
<ul>
<li>0: <code>d</code></li>
</ul>
<li><code>10</code>
<ul>
<li>0: <code>d</code></li>
</ul>
<li><code>11</code>
<ul>
<li>0: <code>r</code></li>
</ul>
<li><code>12</code>
<ul>
<li>0: <code>e</code></li>
</ul>
<li><code>13</code>
<ul>
<li>0: <code>s</code></li>
</ul>
<li><code>14</code>
<ul>
<li>0: <code>s</code></li>
</ul>
</ul>
<h5>signal</h5>
<ul>
<li><code>0</code>
<ul>
<li>0: <code>.</code></li>
</ul>
<li><code>1</code>
<ul>
<li>0: <code>W</code></li>
</ul>
<li><code>2</code>
<ul>
<li>0: <code>i</code></li>
</ul>
<li><code>3</code>
<ul>
<li>0: <code>f</code></li>
</ul>
<li><code>4</code>
<ul>
<li>0: <code>i</code></li>
</ul>
<li><code>5</code>
<ul>
<li>0: <code>_</code></li>
</ul>
<li><code>6</code>
<ul>
<li>0: <code>S</code></li>
</ul>
<li><code>7</code>
<ul>
<li>0: <code>i</code></li>
</ul>
<li><code>8</code>
<ul>
<li>0: <code>g</code></li>
</ul>
<li><code>9</code>
<ul>
<li>0: <code>n</code></li>
</ul>
<li><code>10</code>
<ul>
<li>0: <code>a</code></li>
</ul>
<li><code>11</code>
<ul>
<li>0: <code>l</code></li>
</ul>
</ul>
<h5>alive</h5>
<ul>
<li><code>0</code>
<ul>
<li>0: <code>.</code></li>
</ul>
<li><code>1</code>
<ul>
<li>0: <code>a</code></li>
</ul>
<li><code>2</code>
<ul>
<li>0: <code>l</code></li>
</ul>
<li><code>3</code>
<ul>
<li>0: <code>i</code></li>
</ul>
<li><code>4</code>
<ul>
<li>0: <code>v</code></li>
</ul>
<li><code>5</code>
<ul>
<li>0: <code>e</code></li>
</ul>
</ul>
<h5>dataReceived</h5>
<ul>
<li><code>0</code>
<ul>
<li>0: <code>.</code></li>
</ul>
<li><code>1</code>
<ul>
<li>0: <code>R</code></li>
</ul>
<li><code>2</code>
<ul>
<li>0: <code>f</code></li>
</ul>
<li><code>3</code>
<ul>
<li>0: <code>R</code></li>
</ul>
<li><code>4</code>
<ul>
<li>0: <code>e</code></li>
</ul>
<li><code>5</code>
<ul>
<li>0: <code>c</code></li>
</ul>
<li><code>6</code>
<ul>
<li>0: <code>e</code></li>
</ul>
<li><code>7</code>
<ul>
<li>0: <code>i</code></li>
</ul>
<li><code>8</code>
<ul>
<li>0: <code>v</code></li>
</ul>
<li><code>9</code>
<ul>
<li>0: <code>e</code></li>
</ul>
<li><code>10</code>
<ul>
<li>0: <code>d</code></li>
</ul>
<li><code>11</code>
<ul>
<li>0: <code>_</code></li>
</ul>
<li><code>12</code>
<ul>
<li>0: <code>D</code></li>
</ul>
<li><code>13</code>
<ul>
<li>0: <code>a</code></li>
</ul>
<li><code>14</code>
<ul>
<li>0: <code>t</code></li>
</ul>
<li><code>15</code>
<ul>
<li>0: <code>a</code></li>
</ul>
</ul>
<h5>power</h5>
<ul>
<li><code>state</code>
<ul>
<li>0: <code>.</code></li>
<li>1: <code>P</code></li>
<li>2: <code>O</code></li>
<li>3: <code>W</code></li>
<li>4: <code>E</code></li>
<li>5: <code>R</code></li>
</ul>
<li><code>action</code>
<ul>
<li>0: <code>.</code></li>
<li>1: <code>P</code></li>
<li>2: <code>O</code></li>
<li>3: <code>W</code></li>
<li>4: <code>E</code></li>
<li>5: <code>R</code></li>
</ul>
</ul>
<h5>powerCurrent</h5>
<ul>
<li><code>state</code>
<ul>
<li>0: <code>.</code></li>
<li>1: <code>E</code></li>
<li>2: <code>N</code></li>
<li>3: <code>E</code></li>
<li>4: <code>R</code></li>
<li>5: <code>G</code></li>
<li>6: <code>Y</code></li>
<li>7: <code>_</code></li>
<li>8: <code>C</code></li>
<li>9: <code>u</code></li>
<li>10: <code>r</code></li>
<li>11: <code>r</code></li>
<li>12: <code>e</code></li>
<li>13: <code>n</code></li>
<li>14: <code>t</code></li>
</ul>
<li><code>unit</code>
<ul>
<li>0: <code> </code></li>
<li>1: <code>A</code></li>
</ul>
</ul>
<h5>powerMeter</h5>
<ul>
<li><code>state</code>
<ul>
<li>0: <code>.</code></li>
<li>1: <code>E</code></li>
<li>2: <code>N</code></li>
<li>3: <code>E</code></li>
<li>4: <code>R</code></li>
<li>5: <code>G</code></li>
<li>6: <code>Y</code></li>
<li>7: <code>_</code></li>
<li>8: <code>P</code></li>
<li>9: <code>o</code></li>
<li>10: <code>w</code></li>
<li>11: <code>e</code></li>
<li>12: <code>r</code></li>
</ul>
<li><code>unit</code>
<ul>
<li>0: <code> </code></li>
<li>1: <code>W</code></li>
</ul>
</ul>
<h5>powerConsumption</h5>
<ul>
<li><code>state</code>
<ul>
<li>0: <code>.</code></li>
<li>1: <code>E</code></li>
<li>2: <code>N</code></li>
<li>3: <code>E</code></li>
<li>4: <code>R</code></li>
<li>5: <code>G</code></li>
<li>6: <code>Y</code></li>
<li>7: <code>_</code></li>
<li>8: <code>T</code></li>
<li>9: <code>o</code></li>
<li>10: <code>t</code></li>
<li>11: <code>a</code></li>
<li>12: <code>l</code></li>
</ul>
<li><code>unit</code>
<ul>
<li>0: <code> </code></li>
<li>1: <code>k</code></li>
<li>2: <code>W</code></li>
<li>3: <code>h</code></li>
</ul>
</ul>
<h5>powerConsumptionToday</h5>
<ul>
<li><code>state</code>
<ul>
<li>0: <code>.</code></li>
<li>1: <code>E</code></li>
<li>2: <code>N</code></li>
<li>3: <code>E</code></li>
<li>4: <code>R</code></li>
<li>5: <code>G</code></li>
<li>6: <code>Y</code></li>
<li>7: <code>_</code></li>
<li>8: <code>T</code></li>
<li>9: <code>o</code></li>
<li>10: <code>d</code></li>
<li>11: <code>a</code></li>
<li>12: <code>y</code></li>
</ul>
<li><code>unit</code>
<ul>
<li>0: <code> </code></li>
<li>1: <code>k</code></li>
<li>2: <code>W</code></li>
<li>3: <code>h</code></li>
</ul>
</ul>
<h5>powerConsumptionYesterday</h5>
<ul>
<li><code>state</code>
<ul>
<li>0: <code>.</code></li>
<li>1: <code>E</code></li>
<li>2: <code>N</code></li>
<li>3: <code>E</code></li>
<li>4: <code>R</code></li>
<li>5: <code>G</code></li>
<li>6: <code>Y</code></li>
<li>7: <code>_</code></li>
<li>8: <code>Y</code></li>
<li>9: <code>e</code></li>
<li>10: <code>s</code></li>
<li>11: <code>t</code></li>
<li>12: <code>e</code></li>
<li>13: <code>r</code></li>
<li>14: <code>d</code></li>
<li>15: <code>a</code></li>
<li>16: <code>y</code></li>
</ul>
<li><code>unit</code>
<ul>
<li>0: <code> </code></li>
<li>1: <code>k</code></li>
<li>2: <code>W</code></li>
<li>3: <code>h</code></li>
</ul>
</ul>
<h5>power1</h5>
<ul>
<li><code>state</code>
<ul>
<li>0: <code>.</code></li>
<li>1: <code>P</code></li>
<li>2: <code>O</code></li>
<li>3: <code>W</code></li>
<li>4: <code>E</code></li>
<li>5: <code>R</code></li>
<li>6: <code>1</code></li>
</ul>
<li><code>action</code>
<ul>
<li>0: <code>.</code></li>
<li>1: <code>P</code></li>
<li>2: <code>O</code></li>
<li>3: <code>W</code></li>
<li>4: <code>E</code></li>
<li>5: <code>R</code></li>
<li>6: <code>1</code></li>
</ul>
</ul>
<h5>power2</h5>
<ul>
<li><code>state</code>
<ul>
<li>0: <code>.</code></li>
<li>1: <code>P</code></li>
<li>2: <code>O</code></li>
<li>3: <code>W</code></li>
<li>4: <code>E</code></li>
<li>5: <code>R</code></li>
<li>6: <code>2</code></li>
</ul>
<li><code>action</code>
<ul>
<li>0: <code>.</code></li>
<li>1: <code>P</code></li>
<li>2: <code>O</code></li>
<li>3: <code>W</code></li>
<li>4: <code>E</code></li>
<li>5: <code>R</code></li>
<li>6: <code>2</code></li>
</ul>
</ul>
<h5>power3</h5>
<ul>
<li><code>state</code>
<ul>
<li>0: <code>.</code></li>
<li>1: <code>P</code></li>
<li>2: <code>O</code></li>
<li>3: <code>W</code></li>
<li>4: <code>E</code></li>
<li>5: <code>R</code></li>
<li>6: <code>3</code></li>
</ul>
<li><code>action</code>
<ul>
<li>0: <code>.</code></li>
<li>1: <code>P</code></li>
<li>2: <code>O</code></li>
<li>3: <code>W</code></li>
<li>4: <code>E</code></li>
<li>5: <code>R</code></li>
<li>6: <code>3</code></li>
</ul>
</ul>
<h5>power4</h5>
<ul>
<li><code>state</code>
<ul>
<li>0: <code>.</code></li>
<li>1: <code>P</code></li>
<li>2: <code>O</code></li>
<li>3: <code>W</code></li>
<li>4: <code>E</code></li>
<li>5: <code>R</code></li>
<li>6: <code>4</code></li>
</ul>
<li><code>action</code>
<ul>
<li>0: <code>.</code></li>
<li>1: <code>P</code></li>
<li>2: <code>O</code></li>
<li>3: <code>W</code></li>
<li>4: <code>E</code></li>
<li>5: <code>R</code></li>
<li>6: <code>4</code></li>
</ul>
</ul>
<h5>power5</h5>
<ul>
<li><code>state</code>
<ul>
<li>0: <code>.</code></li>
<li>1: <code>P</code></li>
<li>2: <code>O</code></li>
<li>3: <code>W</code></li>
<li>4: <code>E</code></li>
<li>5: <code>R</code></li>
<li>6: <code>5</code></li>
</ul>
<li><code>action</code>
<ul>
<li>0: <code>.</code></li>
<li>1: <code>P</code></li>
<li>2: <code>O</code></li>
<li>3: <code>W</code></li>
<li>4: <code>E</code></li>
<li>5: <code>R</code></li>
<li>6: <code>5</code></li>
</ul>
</ul>
<h5>power6</h5>
<ul>
<li><code>state</code>
<ul>
<li>0: <code>.</code></li>
<li>1: <code>P</code></li>
<li>2: <code>O</code></li>
<li>3: <code>W</code></li>
<li>4: <code>E</code></li>
<li>5: <code>R</code></li>
<li>6: <code>6</code></li>
</ul>
<li><code>action</code>
<ul>
<li>0: <code>.</code></li>
<li>1: <code>P</code></li>
<li>2: <code>O</code></li>
<li>3: <code>W</code></li>
<li>4: <code>E</code></li>
<li>5: <code>R</code></li>
<li>6: <code>6</code></li>
</ul>
</ul>
<h5>power7</h5>
<ul>
<li><code>state</code>
<ul>
<li>0: <code>.</code></li>
<li>1: <code>P</code></li>
<li>2: <code>O</code></li>
<li>3: <code>W</code></li>
<li>4: <code>E</code></li>
<li>5: <code>R</code></li>
<li>6: <code>7</code></li>
</ul>
<li><code>action</code>
<ul>
<li>0: <code>.</code></li>
<li>1: <code>P</code></li>
<li>2: <code>O</code></li>
<li>3: <code>W</code></li>
<li>4: <code>E</code></li>
<li>5: <code>R</code></li>
<li>6: <code>7</code></li>
</ul>
</ul>
<h5>power8</h5>
<ul>
<li><code>state</code>
<ul>
<li>0: <code>.</code></li>
<li>1: <code>P</code></li>
<li>2: <code>O</code></li>
<li>3: <code>W</code></li>
<li>4: <code>E</code></li>
<li>5: <code>R</code></li>
<li>6: <code>8</code></li>
</ul>
<li><code>action</code>
<ul>
<li>0: <code>.</code></li>
<li>1: <code>P</code></li>
<li>2: <code>O</code></li>
<li>3: <code>W</code></li>
<li>4: <code>E</code></li>
<li>5: <code>R</code></li>
<li>6: <code>8</code></li>
</ul>
</ul>
<h5>power9</h5>
<ul>
<li><code>state</code>
<ul>
<li>0: <code>.</code></li>
<li>1: <code>P</code></li>
<li>2: <code>O</code></li>
<li>3: <code>W</code></li>
<li>4: <code>E</code></li>
<li>5: <code>R</code></li>
<li>6: <code>9</code></li>
</ul>
<li><code>action</code>
<ul>
<li>0: <code>.</code></li>
<li>1: <code>P</code></li>
<li>2: <code>O</code></li>
<li>3: <code>W</code></li>
<li>4: <code>E</code></li>
<li>5: <code>R</code></li>
<li>6: <code>9</code></li>
</ul>
</ul>
<h4>Adapter nuki-extended</h4>
<ul>
<li><code>door</code>
<ul>
<li>state: <code>.state.closed</code></li>
</ul>
<li><code>doorState</code>
<ul>
<li>state: <code>.state.doorState</code></li>
<li>display: <code>[object Object]</code></li>
</ul>
<li><code>lock</code>
<ul>
<li>state: <code>.state.locked</code></li>
</ul>
<li><code>lockState</code>
<ul>
<li>state: <code>.state.lockState</code></li>
<li>display: <code>[object Object]</code></li>
</ul>
<li><code>lockUpdate</code>
<ul>
<li>state: <code>.state.lastStateUpdate</code></li>
</ul>
<li><code>lowbattery</code>
<ul>
<li>state: <code>.state.batteryCritical</code></li>
</ul>
<li><code>ACTIONS</code>
<ul>
<li>action: <code>._ACTION</code></li>
<li>display: <code>[object Object]</code></li>
<li>actionElement: <code>DropdownAction</code></li>
</ul>
<li><code>LOCK</code>
<ul>
<li>action: <code>._ACTION.LOCK</code></li>
<li>actionElement: <code>IconButtonAction</code></li>
</ul>
<li><code>LOCK_N_GO</code>
<ul>
<li>action: <code>._ACTION.LOCK_N_GO</code></li>
<li>actionElement: <code>IconButtonAction</code></li>
</ul>
<li><code>LOCK_N_GO_WITH_UNLATCH</code>
<ul>
<li>action: <code>._ACTION.LOCK_N_GO_WITH_UNLATCH</code></li>
<li>actionElement: <code>IconButtonAction</code></li>
</ul>
<li><code>UNLATCH</code>
<ul>
<li>action: <code>._ACTION.UNLATCH</code></li>
<li>actionElement: <code>IconButtonAction</code></li>
</ul>
<li><code>UNLOCK</code>
<ul>
<li>action: <code>._ACTION.UNLOCK</code></li>
<li>actionElement: <code>IconButtonAction</code></li>
</ul>
</ul>
<h4>Adapter tr-064</h4>
<ul>
<li><code>ab</code>
<ul>
<li>state: <code>.ab</code></li>
</ul>
<li><code>ip</code>
<ul>
<li>state: <code>.externalIP</code></li>
</ul>
<li><code>ipv6</code>
<ul>
<li>state: <code>.externalIPv6</code></li>
</ul>
<li><code>reboot</code>
<ul>
<li>action: <code>.reboot</code></li>
<li>actionElement: <code>IconButtonAction</code></li>
</ul>
<li><code>reconnect</code>
<ul>
<li>action: <code>.reconnectInternet</code></li>
<li>actionElement: <code>IconButtonAction</code></li>
</ul>
<li><code>wlan24</code>
<ul>
<li>state: <code>.wlan24</code></li>
</ul>
<li><code>wlan50</code>
<ul>
<li>state: <code>.wlan50</code></li>
</ul>
</ul>
<h4>Adapter unifi</h4>
<ul>
<li><code>update_available</code>
<ul>
<li>state: <code>.update_available</code></li>
</ul>
<li><code>version</code>
<ul>
<li>state: <code>.version</code></li>
</ul>
</ul>
<h4>Adapter zwave2</h4>
<ul>
<li><code>valve</code>
<ul>
<li>state: <code>.Multilevel_Switch.currentValue</code></li>
<li>unit: <code>%</code></li>
<li>icon: <code>rotate-right</code></li>
</ul>
<li><code>mode</code>
<ul>
<li>state: <code>.Thermostat_Mode.mode</code></li>
<li>action: <code>.Thermostat_Mode.mode</code></li>
<li>icon: <code>[object Object]</code></li>
</ul>
<li><code>setTemperatureEnergySave</code>
<ul>
<li>state: <code>.Thermostat_Setpoint.setpoint_energySaveHeating</code></li>
<li>action: <code>.Thermostat_Setpoint.setpoint_energySaveHeating</code></li>
<li>unit: <code>°C</code></li>
<li>icon: <code>radiator-disabled</code></li>
</ul>
<li><code>temperature</code>
<ul>
<li>state: <code>.Multilevel_Sensor.airTemperature</code></li>
</ul>
<li><code>setTemperature</code>
<ul>
<li>state: <code>.Thermostat_Setpoint.setpoint_heating</code></li>
<li>action: <code>.Thermostat_Setpoint.setpoint_heating</code></li>
</ul>
</ul>

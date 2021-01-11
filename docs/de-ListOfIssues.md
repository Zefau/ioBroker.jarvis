# Liste von Fehlern inkl. Lösungen

## jarvis öffnet bzw. lädt nicht

jarvis benötigt den Web-Adapter inkl. entweder integriertem Socket oder dediziertem socket.io Adapter.

**Die Optionen `Puffer` und `Nur Web-Sockets` dürfen in keinem Fall aktiviert sein!**

### Web-Adapter mit integriertem Socket (ohne socket.io Adapter)

![Web-Adapter](https://raw.githubusercontent.com/Zefau/ioBroker.jarvis/master/docs/de-ListOfIssues-WebAdapterConfig1.png)


### Web-Adapter in Verbindung mit dem socket.io Adapter

![Web-Adapter](https://raw.githubusercontent.com/Zefau/ioBroker.jarvis/master/docs/de-ListOfIssues-WebAdapterConfig2.png)
![socket.io Adapter](https://raw.githubusercontent.com/Zefau/ioBroker.jarvis/master/docs/de-ListOfIssues-WebAdapterConfig3.png)


## Meine Alias Geräte werden nicht gefunden, warum?

Die Import-Funktion sucht bei Alias Geräten nach `channels` (also Kanälen), woran die States ausgerichtet sind. Der Kanal sollte nach dem Gerät benannt sein (wird als Name übernommen).
Sofern das Alias Gerät keinen `channel` hat, wird nichts gefunden.

## Liste von Fehlern inkl. Lösungen

### jarvis öffnet bzw. lädt nicht

jarvis benötigt den Web-Adapter inkl. entweder integriertem Socket oder dediziertem socket.io Adapter.

**Die Optionen `Puffer` und `Nur Web-Sockets` dürfen in keinem Fall aktiviert sein!**

#### Web-Adapter mit integriertem Socket (ohne socket.io Adapter)

![Web-Adapter](https://raw.githubusercontent.com/Zefau/ioBroker.jarvis/master/wiki/de-ListOfIssues-WebAdapterConfig1.png)


#### Web-Adapter in Verbindung mit dem socket.io Adapter

![Web-Adapter](https://raw.githubusercontent.com/Zefau/ioBroker.jarvis/master/wiki/de-ListOfIssues-WebAdapterConfig2.png)
![socket.io Adapter](https://raw.githubusercontent.com/Zefau/ioBroker.jarvis/master/wiki/de-ListOfIssues-WebAdapterConfig3.png)
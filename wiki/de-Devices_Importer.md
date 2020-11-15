# Geräte importieren

Um schnell in jarvis zu starten, können vorhandene Geräte aus ioBroker importiert werden:

![Importer](https://raw.githubusercontent.com/Zefau/ioBroker.jarvis/master/wiki/de-Devices_Import-Button.png)


## Such-Modus (alle oder Enums)

Es werden zwei Modi unterstützt um die Adapter-Struktur zu durchsuchen:
![Importer](https://raw.githubusercontent.com/Zefau/ioBroker.jarvis/master/wiki/de-Devices_Import-Structure-Selection.png)

- `nach allen Geräten durchsuchen`: Durchsucht die komplette Struktur der ausgewählten Adapter nach allen vorhandenen Geräten und listet diese auf.
- `nur nach in Enums hinzugefügten Geräten durchsuchen`: Durchsucht die Struktur der ausgewählten Adapter nur nach Geräten, die bereits in Enums zugeordnet sind.


## Liste unterstützter Adapter

- [deconz](#deconz)
- [hm-prc](#hm-prc)
- [hmip](#hmip)
- [hue-extended](#hue-extended)
- [hue](#hue)
- [shelly](#shelly)
- [zigbee](#zigbee)
- [zwave2](#zwave2)


## Unterstützte Geräte der Adapter

### Adapter deconz

#### light
```
{
   "power": {
      "state": ".on",
      "action": ".on"
   },
   "level": {
      "state": ".level",
      "action": ".level"
   },
   "colorTemperature": {
      "state": ".ct",
      "action": ".ct"
   },
   "hue": {
      "state": ".hue",
      "action": ".hue"
   }
}
```

### Adapter hm-prc

#### light
```
{
   "hmip-bsm": {
      "power": {
         "state": ".4.STATE",
         "action": ".4.STATE"
      },
      "powerMeter": {
         "state": ".7.POWER"
      },
      "powerVoltage": {
         "state": ".7.VOLTAGE"
      },
      "powerFrequency": {
         "state": ".7.FREQUENCY"
      }
   },
   "hmip-bsl": {
      "power": {
         "state": ".4.STATE",
         "action": ".4.STATE"
      },
      "levelTop": {
         "state": ".8.LEVEL",
         "action": ".8.LEVEL"
      },
      "colorTop": {
         "state": ".8.COLOR",
         "action": ".8.COLOR",
         "display": {
            "0": "BLACK",
            "1": "BLUE",
            "2": "GREEN",
            "3": "TURQUOISE",
            "4": "RED",
            "5": "PURPLE",
            "6": "YELLOW",
            "7": "WHITE"
         }
      },
      "levelBottom": {
         "state": ".12.LEVEL",
         "action": ".12.LEVEL"
      },
      "colorBottom": {
         "state": ".12.COLOR",
         "action": ".12.COLOR",
         "display": {
            "0": "BLACK",
            "1": "BLUE",
            "2": "GREEN",
            "3": "TURQUOISE",
            "4": "RED",
            "5": "PURPLE",
            "6": "YELLOW",
            "7": "WHITE"
         }
      }
   },
   "hmip-brc2": {
      "power": {
         "state": ".3.STATE",
         "action": ".4.STATE"
      }
   },
   "hmip-bdt": {
      "level": {
         "state": ".3.LEVEL",
         "action": ".4.LEVEL"
      }
   },
   "hm-lc-sw1pbu-fm": {
      "power": {
         "state": ".1.STATE",
         "action": ".1.STATE"
      }
   },
   "hm-lc-sw1-fm": {
      "power": {
         "state": ".1.STATE",
         "action": ".1.STATE"
      },
      "timerOff": {
         "state": ".1.ON_TIME",
         "action": ".1.ON_TIME"
      }
   },
   "hm-lc-dim1tpbu-fm": {
      "level": {
         "state": ".1.LEVEL",
         "action": ".1.LEVEL"
      }
   },
   "hm-lc-dim1t-pl-3": {
      "level": {
         "state": ".1.LEVEL",
         "action": ".1.LEVEL"
      }
   }
}
```


#### heating
```
{
   "hmip-etrv-b": {
      "temperature": {
         "state": ".1.ACTUAL_TEMPERATURE"
      },
      "setTemperature": {
         "state": ".1.SET_POINT_TEMPERATURE",
         "action": ".1.SET_POINT_TEMPERATURE"
      },
      "frost": {
         "state": ".1.FROST_PROTECTION"
      },
      "boost": {
         "state": ".1.BOOST_MODE",
         "action": ".1.BOOST_MODE"
      },
      "boostTime": {
         "state": ".1.BOOST_TIME",
         "action": ".1.BOOST_TIME"
      },
      "windowState": {
         "state": ".1.WINDOW_STATE"
      },
      "partyMode": {
         "state": ".1.PARTY_MODE",
         "action": ".1.PARTY_MODE"
      }
   },
   "hmip-bwth": {
      "temperature": {
         "state": ".1.ACTUAL_TEMPERATURE"
      },
      "setTemperature": {
         "state": ".1.SET_POINT_TEMPERATURE",
         "action": ".1.SET_POINT_TEMPERATURE"
      },
      "humidity": {
         "state": ".1.HUMIDITY"
      },
      "boost": {
         "state": ".1.BOOST_MODE",
         "action": ".1.BOOST_MODE"
      }
   },
   "hmip-wth-2": {
      "temperature": {
         "state": ".1.ACTUAL_TEMPERATURE"
      },
      "setTemperature": {
         "state": ".1.SET_POINT_TEMPERATURE",
         "action": ".1.SET_POINT_TEMPERATURE"
      },
      "humidity": {
         "state": ".1.HUMIDITY"
      },
      "boost": {
         "state": ".1.BOOST_MODE",
         "action": ".1.BOOST_MODE"
      }
   },
   "hm-cc-rt-dn": {
      "temperature": {
         "state": ".4.ACTUAL_TEMPERATURE"
      },
      "setTemperature": {
         "state": ".4.SET_TEMPERATURE",
         "action": ".4.SET_TEMPERATURE"
      },
      "boost": {
         "state": ".4.BOOST_MODE",
         "action": ".4.BOOST_MODE"
      },
      "modeAuto": {
         "state": ".4.AUTO_MODE",
         "action": ".4.AUTO_MODE"
      },
      "modeManu": {
         "state": ".4.MANU_MODE",
         "action": ".4.MANU_MODE"
      },
      "boostState": {
         "state": ".4.BOOST_STATE",
         "action": ".4.BOOST_STATE"
      },
      "modeCurrent": {
         "state": ".4.COMFORT_MODE",
         "action": ".4.COMFORT_MODE"
      },
      "modeLowering": {
         "state": ".4.LOWERING_MODE",
         "action": ".4.LOWERING_MODE"
      },
      "modeControl": {
         "state": ".4.CONTROL_MODE",
         "action": ".4.CONTROL_MODE"
      },
      "valve": {
         "state": ".4.VALVE_STATE",
         "action": ".4.VALVE_STATE"
      }
   },
   "hm-tc-it-wm-w-eu": {
      "temperature": {
         "state": ".1.TEMPERATURE"
      },
      "setTemperature": {
         "state": ".2.SET_TEMPERATURE",
         "action": ".2.SET_TEMPERATURE"
      },
      "humidity": {
         "state": ".1.HUMIDITY"
      },
      "boost": {
         "state": ".2.BOOST_MODE",
         "action": ".2.BOOST_MODE"
      }
   }
}
```


#### blind
```
{
   "hmip-broll": {
      "level": {
         "state": ".3.LEVEL",
         "action": ".4.LEVEL"
      },
      "level2": {
         "state": ".3.LEVEL2",
         "action": ".4.LEVEL2"
      },
      "activity": {
         "state": ".3.ACTIVITY_STATE",
         "action": ".4.STOP"
      }
   },
   "hm-lc-bl1-fm": {
      "level": {
         "state": ".1.LEVEL",
         "action": ".1.LEVEL"
      },
      "activity": {
         "state": ".1.WORKING",
         "action": ".1.STOP"
      }
   },
   "hm-lc-bl1pbu-fm": {
      "level": {
         "state": ".1.LEVEL",
         "action": ".1.LEVEL"
      },
      "activity": {
         "state": ".1.WORKING",
         "action": ".1.STOP"
      }
   }
}
```


#### window
```
{
   "hmip-swdo-I": {
      "open": {
         "state": ".1.STATE",
         "display": {
            "0": "CLOSED",
            "1": "OPEN"
         }
      }
   },
   "hmip-swdo": {
      "open": {
         "state": ".1.STATE",
         "display": {
            "0": "CLOSED",
            "1": "OPEN"
         }
      }
   },
   "hmip-srh": {
      "open": {
         "state": ".1.STATE",
         "display": {
            "0": "CLOSED",
            "1": "TILTED",
            "2": "OPEN"
         }
      }
   },
   "hm-sec-sco": {
      "open": {
         "state": ".1.STATE"
      }
   },
   "hm-sec-sc-2": {
      "open": {
         "state": ".1.STATE"
      }
   }
}
```


#### socket
```
{
   "hmip-ps": {
      "power": {
         "state": ".3.STATE"
      }
   },
   "hmip-psm": {
      "power": {
         "state": ".3.STATE"
      },
      "meter": {
         "state": ".6.POWER"
      }
   },
   "hm-lc-sw1-pl-dn-r1": {
      "power": {
         "state": ".1.STATE",
         "action": ".1.STATE"
      },
      "timerOff": {
         "state": ".1.ON_TIME",
         "action": ".1.ON_TIME"
      }
   },
   "hm-es-pmsw1-pl": {
      "power": {
         "state": ".1.STATE",
         "action": ".1.STATE"
      },
      "timerOff": {
         "state": ".1.ON_TIME",
         "action": ".1.ON_TIME"
      },
      "powerCurrent": {
         "state": ".2.CURRENT",
         "action": ".2.CURRENT",
         "unit": " mA"
      },
      "powerCounter": {
         "state": ".2.ENERGY_COUNTER",
         "action": ".2.ENERGY_COUNTER",
         "unit": " Wh"
      },
      "powerMeter": {
         "state": ".2.POWER",
         "action": ".2.POWER",
         "unit": " W"
      },
      "powerVoltage": {
         "state": ".2.VOLTAGE",
         "action": ".2.VOLTAGE",
         "unit": " V"
      }
   }
}
```


#### motion
```
{
   "hmip-smi55": {
      "motion": {
         "state": ".3.MOTION"
      },
      "brightness": {
         "state": ".3.BRIGHTNESS"
      }
   },
   "hmip-smi": {
      "motion": {
         "state": ".1.MOTION"
      },
      "illumination": {
         "state": ".1.ILLUMINATION"
      }
   },
   "hmip-smo-a": {
      "motion": {
         "state": ".1.MOTION"
      },
      "illumination": {
         "state": ".1.ILLUMINATION"
      }
   },
   "hmip-sam": {
      "motion": {
         "state": ".1.MOTION"
      },
      "illumination": {
         "state": ".1.ILLUMINATION"
      }
   },
   "hmip-spi": {
      "presence": {
         "state": ".1.PRESENCE_DETECTION_STATE"
      },
      "illumination": {
         "state": ".1.ILLUMINATION"
      }
   },
   "hm-sen-mdir-wm55": {
      "motion": {
         "state": ".3.MOTION"
      },
      "illumination": {
         "state": ".3.ILLUMINATION"
      }
   }
}
```


#### weather-station
```
{
   "hmip-stho-a": {
      "temperature": {
         "state": ".1.ACTUAL_TEMPERATURE"
      },
      "humidity": {
         "state": ".1.HUMIDITY"
      }
   },
   "hmip-swo-b": {
      "humidity": {
         "state": ".1.HUMIDITY"
      },
      "wind": {
         "state": ".1.WIND_SPEED"
      },
      "temperature": {
         "state": ".1.ACTUAL_TEMPERATURE"
      },
      "illumination": {
         "state": ".1.ILLUMINATION"
      },
      "sunshineDuration": {
         "state": ".1.SUNSHINEDURATION"
      }
   },
   "hmip-swo-pl": {
      "humidity": {
         "state": ".1.HUMIDITY"
      },
      "wind": {
         "state": ".1.WIND_SPEED"
      },
      "temperature": {
         "state": ".1.ACTUAL_TEMPERATURE"
      },
      "illumination": {
         "state": ".1.ILLUMINATION"
      },
      "sunshineDuration": {
         "state": ".1.SUNSHINEDURATION"
      },
      "raining": {
         "state": ".1.RAINING"
      },
      "rainCounter": {
         "state": ".1.RAIN_COUNTER"
      }
   }
}
```


#### other
```
{
   "hmip-wrc2": {
      "PRESS_LONG_BOTTOM": {
         "state": ".1.PRESS_LONG",
         "action": ".1.PRESS_LONG"
      },
      "PRESS_SHORT_BOTTOM": {
         "state": ".1.PRESS_SHORT",
         "action": ".1.PRESS_SHORT"
      },
      "PRESS_LONG_TOP": {
         "state": ".2.PRESS_LONG",
         "action": ".2.PRESS_LONG"
      },
      "PRESS_SHORT_TOP": {
         "state": ".2.PRESS_SHORT",
         "action": ".2.PRESS_SHORT"
      }
   }
}
```

### Adapter hmip

#### heating
```
{
   "hmip-etrv-2": {
      "temperature": {
         "state": ".channels.1.valveActualTemperature"
      },
      "setTemperature": {
         "state": ".channels.1.setPointTemperature",
         "action": ".channels.1.setPointTemperature"
      }
   }
}
```


#### window
```
{
   "hmip-swdo": {
      "open": {
         "state": ".channels.1.windowOpen",
         "display": {
            "0": "CLOSED",
            "1": "OPEN"
         }
      }
   }
}
```

### Adapter hue-extended

#### light
```
{
   "power": {
      "state": ".action.on",
      "action": ".action.on"
   },
   "level": {
      "state": ".action.level",
      "action": ".action.level"
   },
   "colorTemperature": {
      "state": ".action.colorTemperature",
      "action": ".action.colorTemperature"
   },
   "hue": {
      "state": ".action.hue",
      "action": ".action.hue"
   }
}
```

### Adapter hue

#### light
```
{
   "power": {
      "state": ".on",
      "action": ".on"
   },
   "level": {
      "state": ".level",
      "action": ".level"
   },
   "colorTemperature": {
      "state": ".ct",
      "action": ".ct"
   },
   "hue": {
      "state": ".hue",
      "action": ".hue"
   }
}
```

### Adapter shelly

#### blind
```
{
   "level": {
      "state": ".Shutter.Position",
      "action": ".Shutter.Position"
   },
   "activity": {
      "state": ".Shutter.state",
      "action": ".Shutter.Pause"
   }
}
```


#### light
```
{
   "power": {
      "state": ".lights.Switch",
      "action": ".lights.Switch"
   },
   "level": {
      "state": ".lights.brightness",
      "action": ".lights.brightness"
   }
}
```

### Adapter zigbee

#### light
```
{
   "power": {
      "state": ".state",
      "action": ".state"
   },
   "level": {
      "state": ".brightness",
      "action": ".brightness"
   },
   "colorTemperature": {
      "state": ".colortemp",
      "action": ".colortemp"
   },
   "rgb": {
      "state": ".color",
      "action": ".color"
   }
}
```


#### socket
```
{
   "power": {
      "state": ".state",
      "action": ".state"
   }
}
```


#### sensor
```
{
   "drop": {
      "state": ".drop"
   },
   "tilt": {
      "state": ".tilt"
   },
   "tilt_angle": {
      "state": ".tilt_angle"
   },
   "tilt_angle_x": {
      "state": ".tilt_angle_x"
   },
   "tilt_angle_x_abs": {
      "state": ".tilt_angle_x_abs"
   },
   "tilt_angle_y": {
      "state": ".tilt_angle_y"
   },
   "tilt_angle_y_abs": {
      "state": ".tilt_angle_y_abs"
   },
   "tilt_angle_z": {
      "state": ".tilt_angle_z"
   },
   "contact": {
      "state": ".contact"
   },
   "opened": {
      "state": ".opened"
   },
   "occupancy": {
      "state": ".occupancy"
   },
   "humidity": {
      "state": ".humidity"
   },
   "temperature": {
      "state": ".temperature"
   },
   "illumination": {
      "state": ".illuminance"
   },
   "pressure": {
      "state": ".pressure"
   }
}
```


#### smoke
```
{
   "alarm": {
      "state": ".detected"
   },
   "test": {
      "state": ".selftest"
   }
}
```


#### motion
```
{
   "illuminance": {
      "state": ".illuminance",
      "unit": " lux"
   },
   "noMotionTime": {
      "state": ".no_motion",
      "unit": " s"
   },
   "motion": {
      "state": ".occupancy"
   }
}
```

### Adapter zwave2

#### heating
```
{
   "valve": {
      "state": ".Multilevel_Switch.currentValue",
      "unit": "%",
      "icon": "rotate-right"
   },
   "mode": {
      "state": ".Thermostat_Mode.mode",
      "action": ".Thermostat_Mode.mode",
      "icon": {
         "0": "radiator-off",
         "1": "radiator",
         "11": "radiator-disabled",
         "15": "radiator"
      }
   },
   "setTemperatureEnergySave": {
      "state": ".Thermostat_Setpoint.setpoint_energySaveHeating",
      "action": ".Thermostat_Setpoint.setpoint_energySaveHeating",
      "unit": "°C",
      "icon": "radiator-disabled"
   },
   "temperature": {
      "state": ".Multilevel_Sensor.airTemperature"
   },
   "setTemperature": {
      "state": ".Thermostat_Setpoint.setpoint_heating",
      "action": ".Thermostat_Setpoint.setpoint_heating"
   }
}
```


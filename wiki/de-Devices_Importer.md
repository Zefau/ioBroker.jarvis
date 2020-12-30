# Geräte importieren

Um schnell in jarvis zu starten, können vorhandene Geräte aus ioBroker importiert werden:

![Importer](https://raw.githubusercontent.com/Zefau/ioBroker.jarvis/master/wiki/de-Devices_Import-Button.png)


## Such-Modus (alle oder Enums)

Es werden zwei Modi unterstützt um die Adapter-Struktur zu durchsuchen:
![Importer](https://raw.githubusercontent.com/Zefau/ioBroker.jarvis/master/wiki/de-Devices_Import-Structure-Selection.png)

- `nach allen Geräten durchsuchen`: Durchsucht die komplette Struktur der ausgewählten Adapter nach allen vorhandenen Geräten und listet diese auf.
- `nur nach in Enums hinzugefügten Geräten durchsuchen`: Durchsucht die Struktur der ausgewählten Adapter nur nach Geräten, die bereits in Enums zugeordnet sind.


## Liste unterstützter Adapter

- [deconz](#adapter-deconz)
  - [Function `light` of deconz](#function-light-of-deconz)
- [hm-prc](#adapter-hm-prc)
  - [Function `light` of hm-prc](#function-light-of-hm-prc)
  - [Function `heating` of hm-prc](#function-heating-of-hm-prc)
  - [Function `blind` of hm-prc](#function-blind-of-hm-prc)
  - [Function `smoke` of hm-prc](#function-smoke-of-hm-prc)
  - [Function `window` of hm-prc](#function-window-of-hm-prc)
  - [Function `socket` of hm-prc](#function-socket-of-hm-prc)
  - [Function `motion` of hm-prc](#function-motion-of-hm-prc)
  - [Function `door` of hm-prc](#function-door-of-hm-prc)
  - [Function `weather-station` of hm-prc](#function-weather-station-of-hm-prc)
  - [Function `other` of hm-prc](#function-other-of-hm-prc)
- [hmip](#adapter-hmip)
  - [Function `heating` of hmip](#function-heating-of-hmip)
  - [Function `blind` of hmip](#function-blind-of-hmip)
  - [Function `window` of hmip](#function-window-of-hmip)
  - [Function `motion` of hmip](#function-motion-of-hmip)
- [hue-extended](#adapter-hue-extended)
  - [Function `light` of hue-extended](#function-light-of-hue-extended)
- [hue](#adapter-hue)
  - [Function `light` of hue](#function-light-of-hue)
- [mihome-vacuum](#adapter-mihome-vacuum)
  - [Function `consumableFilter` of mihome-vacuum](#function-consumableFilter-of-mihome-vacuum)
  - [Function `consumableBrushMain` of mihome-vacuum](#function-consumableBrushMain-of-mihome-vacuum)
  - [Function `consumableBrushSide` of mihome-vacuum](#function-consumableBrushSide-of-mihome-vacuum)
  - [Function `consumableSensors` of mihome-vacuum](#function-consumableSensors-of-mihome-vacuum)
  - [Function `consumableFilterWater` of mihome-vacuum](#function-consumableFilterWater-of-mihome-vacuum)
  - [Function `controlSoundVolume` of mihome-vacuum](#function-controlSoundVolume-of-mihome-vacuum)
  - [Function `controlModeCarpet` of mihome-vacuum](#function-controlModeCarpet-of-mihome-vacuum)
  - [Function `controlFind` of mihome-vacuum](#function-controlFind-of-mihome-vacuum)
  - [Function `controlHome` of mihome-vacuum](#function-controlHome-of-mihome-vacuum)
  - [Function `controlPause` of mihome-vacuum](#function-controlPause-of-mihome-vacuum)
  - [Function `cleanRoomResume` of mihome-vacuum](#function-cleanRoomResume-of-mihome-vacuum)
  - [Function `cleanZoneResume` of mihome-vacuum](#function-cleanZoneResume-of-mihome-vacuum)
  - [Function `cleanSpot` of mihome-vacuum](#function-cleanSpot-of-mihome-vacuum)
  - [Function `cleanZone` of mihome-vacuum](#function-cleanZone-of-mihome-vacuum)
  - [Function `clean` of mihome-vacuum](#function-clean-of-mihome-vacuum)
  - [Function `controlFan` of mihome-vacuum](#function-controlFan-of-mihome-vacuum)
  - [Function `historyTableJson` of mihome-vacuum](#function-historyTableJson-of-mihome-vacuum)
  - [Function `cleanedTotalArea` of mihome-vacuum](#function-cleanedTotalArea-of-mihome-vacuum)
  - [Function `cleanedTotalCleanups` of mihome-vacuum](#function-cleanedTotalCleanups-of-mihome-vacuum)
  - [Function `cleanedTotalTime` of mihome-vacuum](#function-cleanedTotalTime-of-mihome-vacuum)
  - [Function `cleanedMissionArea` of mihome-vacuum](#function-cleanedMissionArea-of-mihome-vacuum)
  - [Function `cleanedMissionTime` of mihome-vacuum](#function-cleanedMissionTime-of-mihome-vacuum)
  - [Function `battery` of mihome-vacuum](#function-battery-of-mihome-vacuum)
  - [Function `connection` of mihome-vacuum](#function-connection-of-mihome-vacuum)
  - [Function `device_fw` of mihome-vacuum](#function-device_fw-of-mihome-vacuum)
  - [Function `device_model` of mihome-vacuum](#function-device_model-of-mihome-vacuum)
  - [Function `doNotDisturb` of mihome-vacuum](#function-doNotDisturb-of-mihome-vacuum)
  - [Function `error` of mihome-vacuum](#function-error-of-mihome-vacuum)
  - [Function `state` of mihome-vacuum](#function-state-of-mihome-vacuum)
  - [Function `waterBox` of mihome-vacuum](#function-waterBox-of-mihome-vacuum)
  - [Function `map` of mihome-vacuum](#function-map-of-mihome-vacuum)
  - [Function `cleanQueueClear` of mihome-vacuum](#function-cleanQueueClear-of-mihome-vacuum)
  - [Function `cleanQueue` of mihome-vacuum](#function-cleanQueue-of-mihome-vacuum)
- [nuki-extended](#adapter-nuki-extended)
  - [Function `openers` of nuki-extended](#function-openers-of-nuki-extended)
  - [Function `smartlocks` of nuki-extended](#function-smartlocks-of-nuki-extended)
- [shelly](#adapter-shelly)
  - [Function `blind` of shelly](#function-blind-of-shelly)
  - [Function `light` of shelly](#function-light-of-shelly)
- [sonoff](#adapter-sonoff)
  - [Function `light` of sonoff](#function-light-of-sonoff)
  - [Function `other` of sonoff](#function-other-of-sonoff)
- [tr-064](#adapter-tr-064)
  - [Function `calllists` of tr-064](#function-calllists-of-tr-064)
  - [Function `phonebook` of tr-064](#function-phonebook-of-tr-064)
  - [Function `states` of tr-064](#function-states-of-tr-064)
- [zigbee](#adapter-zigbee)
  - [Function `light` of zigbee](#function-light-of-zigbee)
  - [Function `socket` of zigbee](#function-socket-of-zigbee)
  - [Function `sensor` of zigbee](#function-sensor-of-zigbee)
  - [Function `smoke` of zigbee](#function-smoke-of-zigbee)
  - [Function `motion` of zigbee](#function-motion-of-zigbee)
- [zwave2](#adapter-zwave2)
  - [Function `heating` of zwave2](#function-heating-of-zwave2)


## Unterstützte Geräte der Adapter

### Adapter deconz

#### Function `light` of deconz
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

#### Function `light` of hm-prc
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


#### Function `heating` of hm-prc
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
         "action": ".4.CONTROL_MODE",
         "display": {
            "0": "Auto-Mode",
            "1": "Manu-Mode",
            "2": "Party-Mode",
            "3": "Boost-Mode"
         }
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
   },
   "hm-wds40-th-i": {
      "temperature": {
         "state": ".1.TEMPERATURE"
      },
      "humidity": {
         "state": ".1.HUMIDITY"
      }
   },
   "HM-WDS30-OT2-SM": {
      "temperature1": {
         "state": ".1.TEMPERATURE"
      },
      "temperature2": {
         "state": ".2.TEMPERATURE"
      }
   }
}
```


#### Function `blind` of hm-prc
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


#### Function `smoke` of hm-prc
```
{
   "HM-Sec-SD-2": {
      "alarm": {
         "state": ".1.STATE"
      }
   }
}
```


#### Function `window` of hm-prc
```
{
   "hmip-swdo-I": {
      "open": {
         "state": ".1.STATE"
      }
   },
   "hmip-swdo": {
      "open": {
         "state": ".1.STATE"
      }
   },
   "hmip-srh": {
      "open": {
         "state": ".1.STATE",
         "display": {
            "0": "window#open#false",
            "1": "window#open#tilted",
            "2": "window#open#true"
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


#### Function `socket` of hm-prc
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


#### Function `motion` of hm-prc
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
   },
   "hm-sen-mdir-o-2": {
      "motion": {
         "state": ".1.MOTION"
      },
      "brightness": {
         "state": ".1.BRIGHTNESS"
      }
   }
}
```


#### Function `door` of hm-prc
```
{
   "HM-Sec-Key": {
      "error": {
         "state": "1.ERROR"
      },
      "lock": {
         "state": "1.OPEN"
      }
   }
}
```


#### Function `weather-station` of hm-prc
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


#### Function `other` of hm-prc
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
   },
   "hm-lc-sw1-dr": {
      "power": {
         "state": ".1.STATE",
         "action": ".1.STATE"
      }
   },
   "HM-PB-2-WM55": {
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
   },
   "HB-UNI-SenAct-4-4-RC": {
      "state1": {
         "state": ".1.STATE"
      },
      "state2": {
         "state": ".2.STATE"
      },
      "state3": {
         "state": ".3.STATE"
      },
      "state4": {
         "state": ".4.STATE"
      },
      "PRESS_LONG1": {
         "state": ".5.PRESS_LONG",
         "action": ".5.PRESS_LONG"
      },
      "PRESS_SHORT1": {
         "state": ".5.PRESS_SHORT",
         "action": ".5.PRESS_SHORT"
      },
      "PRESS_LONG2": {
         "state": ".6.PRESS_LONG",
         "action": ".6.PRESS_LONG"
      },
      "PRESS_SHORT2": {
         "state": ".6.PRESS_SHORT",
         "action": ".6.PRESS_SHORT"
      },
      "PRESS_LONG3": {
         "state": ".7.PRESS_LONG",
         "action": ".7.PRESS_LONG"
      },
      "PRESS_SHORT3": {
         "state": ".7.PRESS_SHORT",
         "action": ".7.PRESS_SHORT"
      },
      "PRESS_LONG4": {
         "state": ".8.PRESS_LONG",
         "action": ".8.PRESS_LONG"
      },
      "PRESS_SHORT4": {
         "state": ".8.PRESS_SHORT",
         "action": ".8.PRESS_SHORT"
      }
   }
}
```

### Adapter hmip

#### Function `heating` of hmip
```
{
   "hmip-etrv-b": {
      "temperature": {
         "state": ".channels.1.valveActualTemperature"
      },
      "setTemperature": {
         "state": ".channels.1.setPointTemperature",
         "action": ".channels.1.setPointTemperature"
      },
      "valvePosition": {
         "state": ".channels.1.valvePosition"
      },
      "valveState": {
         "state": ".channels.1.valveState"
      }
   },
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


#### Function `blind` of hmip
```
{
   "hmip-broll": {
      "level": {
         "state": ".channels.1.shutterLevel",
         "action": ".channels.1.shutterLevel"
      },
      "activity": {
         "state": ".channels.1.processing",
         "action": ".channels.1.stop"
      }
   }
}
```


#### Function `window` of hmip
```
{
   "hmip-swdo": {
      "open": {
         "state": ".channels.1.windowOpen"
      }
   }
}
```


#### Function `motion` of hmip
```
{
   "hmip-smi": {
      "motion": {
         "state": ".channels.1.motionDetected"
      },
      "illumination": {
         "state": ".channels.1.illumination"
      }
   }
}
```

### Adapter hue-extended

#### Function `light` of hue-extended
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

#### Function `light` of hue
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

### Adapter mihome-vacuum

#### Function `consumableFilter` of mihome-vacuum
```
{
   "state": ".consumable.filter",
   "action": ".consumable.filter_reset",
   "actionElement": "IconButtonAction"
}
```


#### Function `consumableBrushMain` of mihome-vacuum
```
{
   "state": ".consumable.main_brush",
   "action": ".consumable.main_brush_reset",
   "actionElement": "IconButtonAction"
}
```


#### Function `consumableBrushSide` of mihome-vacuum
```
{
   "state": ".consumable.side_brush",
   "action": ".consumable.side_brush_reset",
   "actionElement": "IconButtonAction"
}
```


#### Function `consumableSensors` of mihome-vacuum
```
{
   "state": ".consumable.sensors",
   "action": ".consumable.sensors_reset",
   "actionElement": "IconButtonAction"
}
```


#### Function `consumableFilterWater` of mihome-vacuum
```
{
   "state": ".consumable.water_filter",
   "action": ".consumable.water_filter_reset",
   "actionElement": "IconButtonAction"
}
```


#### Function `controlSoundVolume` of mihome-vacuum
```
{
   "state": ".control.sound_volume",
   "action": ".control.sound_volume",
   "actionElement": "InputAction"
}
```


#### Function `controlModeCarpet` of mihome-vacuum
```
{
   "action": ".control.carpet_mode",
   "actionElement": "IconButtonAction"
}
```


#### Function `controlFind` of mihome-vacuum
```
{
   "action": ".control.find",
   "actionElement": "IconButtonAction"
}
```


#### Function `controlHome` of mihome-vacuum
```
{
   "action": ".control.home",
   "actionElement": "IconButtonAction"
}
```


#### Function `controlPause` of mihome-vacuum
```
{
   "action": ".control.pause",
   "actionElement": "IconButtonAction"
}
```


#### Function `cleanRoomResume` of mihome-vacuum
```
{
   "action": ".control.resumeRoomClean",
   "actionElement": "IconButtonAction"
}
```


#### Function `cleanZoneResume` of mihome-vacuum
```
{
   "action": ".control.resumeZoneClean",
   "actionElement": "IconButtonAction"
}
```


#### Function `cleanSpot` of mihome-vacuum
```
{
   "action": ".control.spotclean",
   "actionElement": "IconButtonAction"
}
```


#### Function `cleanZone` of mihome-vacuum
```
{
   "action": ".control.zoneClean",
   "actionElement": "InputAction"
}
```


#### Function `clean` of mihome-vacuum
```
{
   "action": ".control.clean",
   "actionElement": "IconButtonAction"
}
```


#### Function `controlFan` of mihome-vacuum
```
{
   "action": ".control.fan_power",
   "display": {
      "101": "QUIET",
      "102": "BALANCED",
      "103": "TURBO",
      "104": "MAXIMUM",
      "105": "MOP",
      "106": "CUSTOM"
   }
}
```


#### Function `historyTableJson` of mihome-vacuum
```
{
   "state": ".history.allTableJSON"
}
```


#### Function `cleanedTotalArea` of mihome-vacuum
```
{
   "state": ".history.total_area"
}
```


#### Function `cleanedTotalCleanups` of mihome-vacuum
```
{
   "state": ".history.cleanups"
}
```


#### Function `cleanedTotalTime` of mihome-vacuum
```
{
   "state": ".history.total_time"
}
```


#### Function `cleanedMissionArea` of mihome-vacuum
```
{
   "state": ".info.cleanedarea"
}
```


#### Function `cleanedMissionTime` of mihome-vacuum
```
{
   "state": ".info.cleanedtime"
}
```


#### Function `battery` of mihome-vacuum
```
{
   "state": ".info.battery"
}
```


#### Function `connection` of mihome-vacuum
```
{
   "state": ".info.connection"
}
```


#### Function `device_fw` of mihome-vacuum
```
{
   "state": ".info.device_fw"
}
```


#### Function `device_model` of mihome-vacuum
```
{
   "state": ".info.device_model"
}
```


#### Function `doNotDisturb` of mihome-vacuum
```
{
   "state": ".info.dnd"
}
```


#### Function `error` of mihome-vacuum
```
{
   "state": ".info.error"
}
```


#### Function `state` of mihome-vacuum
```
{
   "state": ".info.state"
}
```


#### Function `waterBox` of mihome-vacuum
```
{
   "state": ".info.water_box"
}
```


#### Function `map` of mihome-vacuum
```
{
   "state": ".map.map64",
   "action": ".map.loadMap"
}
```


#### Function `cleanQueueClear` of mihome-vacuum
```
{
   "action": ".control.clearQueue"
}
```


#### Function `cleanQueue` of mihome-vacuum
```
{
   "state": ".info.queue"
}
```

### Adapter nuki-extended

#### Function `openers` of nuki-extended
```
{
   "door": {
      "state": ".state.doorState"
   },
   "ring": {
      "state": ".state.ringState"
   },
   "ringUpdate": {
      "state": ".state.ringStateUpdate"
   },
   "state": {
      "state": ".state.lockState",
      "display": {
         "0": "UNTRAINED",
         "1": "ONLINE",
         "3": "RING_TO_OPEN",
         "5": "OPEN",
         "7": "OPENING",
         "253": "BOOT_RUN",
         "255": "UNDEFINED"
      }
   },
   "lowbattery": {
      "state": ".state.batteryCritical"
   },
   "ACTIONS": {
      "action": "._ACTION",
      "display": {
         "0": "NO_ACTION",
         "1": "ACTIVE RTO",
         "2": "DEACTIVATE RTO",
         "3": "ELECTRIC STRIKE ACTUATION",
         "4": "ACTIVATE CM",
         "5": "DEACTIVATE CM"
      },
      "actionElement": "DropdownAction"
   },
   "ACTIVATE_CM": {
      "action": "._ACTION.ACTIVATE_CM",
      "actionElement": "IconButtonAction"
   },
   "ACTIVE_RTO": {
      "action": "._ACTION.ACTIVE_RTO",
      "actionElement": "IconButtonAction"
   },
   "DEACTIVATE_CM": {
      "action": "._ACTION.DEACTIVATE_CM",
      "actionElement": "IconButtonAction"
   },
   "DEACTIVATE_RTO": {
      "action": "._ACTION.DEACTIVATE_RTO",
      "actionElement": "IconButtonAction"
   },
   "ELECTRIC_STRIKE_ACTUATION": {
      "action": "._ACTION.ELECTRIC_STRIKE_ACTUATION",
      "actionElement": "IconButtonAction"
   }
}
```


#### Function `smartlocks` of nuki-extended
```
{
   "door": {
      "state": ".state.closed"
   },
   "doorState": {
      "state": ".state.doorState",
      "display": {
         "0": "UNAVAILABLE",
         "1": "DEACTIVATED",
         "2": "DOOR_CLOSED",
         "3": "DOOR_OPENED",
         "4": "DOOR_STATE_UNKNOWN",
         "5": "CALIBRATING"
      }
   },
   "lock": {
      "state": ".state.locked"
   },
   "lockState": {
      "state": ".state.lockState",
      "display": {
         "0": "UNCALIBRATED",
         "1": "LOCKED",
         "2": "UNLOCKING",
         "3": "UNLOCKED",
         "4": "LOCKING",
         "5": "UNLATCHED",
         "6": "UNLOCKED_LOCK_N_GO",
         "7": "UNLATCHING",
         "254": "MOTOR_BLOCKED",
         "255": "UNDEFINED"
      }
   },
   "lockUpdate": {
      "state": ".state.lastStateUpdate"
   },
   "lowbattery": {
      "state": ".state.batteryCritical"
   },
   "ACTIONS": {
      "action": "._ACTION",
      "display": {
         "0": "NO_ACTION",
         "1": "UNLOCK",
         "2": "LOCK",
         "3": "UNLATCH",
         "4": "LOCK_N_GO",
         "5": "LOCK_N_GO_WITH_UNLATCH"
      },
      "actionElement": "DropdownAction"
   },
   "LOCK": {
      "action": "._ACTION.LOCK",
      "actionElement": "IconButtonAction"
   },
   "LOCK_N_GO": {
      "action": "._ACTION.LOCK_N_GO",
      "actionElement": "IconButtonAction"
   },
   "LOCK_N_GO_WITH_UNLATCH": {
      "action": "._ACTION.LOCK_N_GO_WITH_UNLATCH",
      "actionElement": "IconButtonAction"
   },
   "UNLATCH": {
      "action": "._ACTION.UNLATCH",
      "actionElement": "IconButtonAction"
   },
   "UNLOCK": {
      "action": "._ACTION.UNLOCK",
      "actionElement": "IconButtonAction"
   }
}
```

### Adapter shelly

#### Function `blind` of shelly
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


#### Function `light` of shelly
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

### Adapter sonoff

#### Function `light` of sonoff
```
{
   "dimmer": {
      "state": ".Dimmer",
      "action": ".Dimmer"
   },
   "ct": {
      "state": ".CT",
      "action": ".CT",
      "properties": {
         "min": 153,
         "max": 500
      }
   },
   "hue": {
      "state": ".Hue",
      "action": ".Hue"
   },
   "sat": {
      "state": ".Saturation",
      "action": ".Saturation"
   }
}
```


#### Function `other` of sonoff
```
{
   "version": [
      ".Version",
      ".INFO.Version"
   ],
   "reachability": ".alive",
   "ip": ".INFO.IPAddress",
   "signal": ".Wifi_Signal",
   "alive": ".alive",
   "dataReceived": ".RfReceived_Data",
   "power": {
      "state": ".POWER",
      "action": ".POWER"
   },
   "powerCurrent": {
      "state": ".ENERGY_Current",
      "unit": " A"
   },
   "powerMeter": {
      "state": ".ENERGY_Power",
      "unit": " W"
   },
   "powerConsumption": {
      "state": ".ENERGY_Total",
      "unit": " kWh"
   },
   "powerConsumptionToday": {
      "state": ".ENERGY_Today",
      "unit": " kWh"
   },
   "powerConsumptionYesterday": {
      "state": ".ENERGY_Yesterday",
      "unit": " kWh"
   },
   "power1": {
      "state": ".POWER1",
      "action": ".POWER1"
   },
   "power2": {
      "state": ".POWER2",
      "action": ".POWER2"
   },
   "power3": {
      "state": ".POWER3",
      "action": ".POWER3"
   },
   "power4": {
      "state": ".POWER4",
      "action": ".POWER4"
   },
   "power5": {
      "state": ".POWER5",
      "action": ".POWER5"
   },
   "power6": {
      "state": ".POWER6",
      "action": ".POWER6"
   },
   "power7": {
      "state": ".POWER7",
      "action": ".POWER7"
   },
   "power8": {
      "state": ".POWER8",
      "action": ".POWER8"
   },
   "power9": {
      "state": ".POWER9",
      "action": ".POWER9"
   }
}
```

### Adapter tr-064

#### Function `calllists` of tr-064
```
{
   "allCount": {
      "state": ".all.count"
   },
   "allHTML": {
      "state": ".all.html"
   },
   "allJson": {
      "state": ".all.json"
   },
   "inboundCount": {
      "state": ".inbound.count"
   },
   "inboundHTML": {
      "state": ".inbound.html"
   },
   "inboundJson": {
      "state": ".inbound.json"
   },
   "missedCount": {
      "state": ".missed.count"
   },
   "missedHTML": {
      "state": ".missed.html"
   },
   "missedJson": {
      "state": ".missed.json"
   },
   "outboundCount": {
      "state": ".outbound.count"
   },
   "outboundHTML": {
      "state": ".outbound.html"
   },
   "outboundJson": {
      "state": ".outbound.json"
   }
}
```


#### Function `phonebook` of tr-064
```
{
   "image": {
      "state": ".image"
   },
   "name": {
      "state": ".name"
   },
   "number": {
      "state": ".number"
   }
}
```


#### Function `states` of tr-064
```
{
   "ab": {
      "state": ".ab"
   },
   "ip": {
      "state": ".externalIP"
   },
   "ipv6": {
      "state": ".externalIPv6"
   },
   "reboot": {
      "action": ".reboot",
      "actionElement": "IconButtonAction"
   },
   "reconnect": {
      "action": ".reconnectInternet",
      "actionElement": "IconButtonAction"
   },
   "wlan24": {
      "state": ".wlan24"
   },
   "wlan50": {
      "state": ".wlan50"
   }
}
```

### Adapter zigbee

#### Function `light` of zigbee
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
   "hex": {
      "state": ".color",
      "action": ".color"
   }
}
```


#### Function `socket` of zigbee
```
{
   "power": {
      "state": ".state",
      "action": ".state"
   }
}
```


#### Function `sensor` of zigbee
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


#### Function `smoke` of zigbee
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


#### Function `motion` of zigbee
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

#### Function `heating` of zwave2
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


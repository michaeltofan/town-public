/**
 * TOWN public signal reading-copy catalogs.
 * Stable signal IDs; localized fields for en/es/it/de/ro.
 * Original source language preserved per city (Milano=it, Munich=de, Arad=ro).
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }
  root.TownSignalCopy = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const SIGNAL_FIELD_KEYS = ["category","headline","summary","area","observedTime","observedDate","civicStatus","description","whyMatters","whoAffected","latestUpdate","statusNote"];
  const SIGNAL_COPY = {
  "milano-signal-1": {
    "sourceLang": "it",
    "cityId": "Milano",
    "it": {
      "category": "SPAZIO PUBBLICO",
      "headline": "Marciapiede danneggiato davanti alla scuola di via Padova",
      "summary": "Le radici hanno sollevato il marciapiede. Bambini e anziani sono costretti sulla carreggiata.",
      "area": "Città Studi",
      "observedTime": "Osservato ieri",
      "observedDate": "14 luglio 2026",
      "civicStatus": "Stato civico: osservato — in attesa di attenzione locale",
      "description": "Davanti alla scuola di via Padova il marciapiede è sollevato e spezzato. Il passaggio pedonale resta irregolare per diversi metri e costringe chi cammina a avvicinarsi alla carreggiata, soprattutto nelle ore di entrata e uscita.",
      "whyMatters": "Qui passa ogni giorno chi accompagna i bambini a scuola e chi si muove a piedi nel quartiere. Un marciapiede danneggiato non è un dettaglio estetico: riduce la sicurezza di un tratto quotidiano e molto frequentato.",
      "whoAffected": "Famiglie con bambini, anziani, persone con mobilità ridotta e chi attraversa Città Studi a piedi nelle ore di punta.",
      "latestUpdate": "Il segnale resta locale e aperto. Nessuna conferma rilevante di intervento è ancora disponibile in questo prototipo.",
      "statusNote": "«Osservato» significa che il problema è stato riconosciuto dalla comunità locale. Non implica una pratica ufficiale né un intervento già avviato."
    },
    "en": {
      "category": "PUBLIC SPACE",
      "headline": "Damaged pavement in front of the school on via Padova",
      "summary": "Roots have lifted the pavement. Children and older people are forced onto the roadway.",
      "area": "Città Studi",
      "observedTime": "Observed yesterday",
      "observedDate": "14 July 2026",
      "civicStatus": "Civic status: observed — awaiting local attention",
      "description": "In front of the school on via Padova the pavement is lifted and broken. The pedestrian path stays uneven for several metres and pushes people walking toward the roadway, especially at arrival and dismissal times.",
      "whyMatters": "People who walk children to school and move through the neighbourhood on foot pass here every day. Damaged pavement is not a cosmetic detail: it reduces the safety of a daily, well-used stretch.",
      "whoAffected": "Families with children, older people, people with reduced mobility, and anyone crossing Città Studi on foot at peak hours.",
      "latestUpdate": "The signal remains local and open. No relevant confirmation of intervention is available yet in this prototype.",
      "statusNote": "“Observed” means the local community has recognised the problem. It does not imply an official process or an intervention already underway."
    },
    "es": {
      "category": "ESPACIO PÚBLICO",
      "headline": "Acera dañada frente a la escuela de via Padova",
      "summary": "Las raíces han levantado la acera. Niños y personas mayores se ven obligados a ir por la calzada.",
      "area": "Città Studi",
      "observedTime": "Observado ayer",
      "observedDate": "14 de julio de 2026",
      "civicStatus": "Estado cívico: observado — a la espera de atención local",
      "description": "Frente a la escuela de via Padova la acera está levantada y rota. El paso peatonal permanece irregular durante varios metros y obliga a quien camina a acercarse a la calzada, sobre todo en las horas de entrada y salida.",
      "whyMatters": "Por aquí pasa cada día quien acompaña a los niños a la escuela y quien se mueve a pie por el barrio. Una acera dañada no es un detalle estético: reduce la seguridad de un tramo cotidiano y muy usado.",
      "whoAffected": "Familias con niños, personas mayores, personas con movilidad reducida y quien cruza Città Studi a pie en horas punta.",
      "latestUpdate": "La señal sigue siendo local y abierta. En este prototipo aún no hay confirmación relevante de intervención.",
      "statusNote": "«Observado» significa que la comunidad local ha reconocido el problema. No implica un procedimiento oficial ni una intervención ya iniciada."
    },
    "de": {
      "category": "ÖFFENTLICHER RAUM",
      "headline": "Beschädigter Gehweg vor der Schule in der Via Padova",
      "summary": "Wurzeln haben den Gehweg angehoben. Kinder und ältere Menschen müssen auf die Fahrbahn ausweichen.",
      "area": "Città Studi",
      "observedTime": "Gestern beobachtet",
      "observedDate": "14. Juli 2026",
      "civicStatus": "Bürgerlicher Status: beobachtet — wartet auf lokale Aufmerksamkeit",
      "description": "Vor der Schule in der Via Padova ist der Gehweg angehoben und gebrochen. Der Fußweg bleibt über mehrere Meter uneben und drängt Fußgänger näher an die Fahrbahn — besonders zu Schulbeginn und Schulschluss.",
      "whyMatters": "Hier gehen jeden Tag Menschen, die Kinder zur Schule bringen, und alle, die zu Fuß durch das Viertel unterwegs sind. Ein beschädigter Gehweg ist kein ästhetisches Detail: Er mindert die Sicherheit eines alltäglichen, stark genutzten Abschnitts.",
      "whoAffected": "Familien mit Kindern, ältere Menschen, Personen mit eingeschränkter Mobilität und alle, die Città Studi zu Stoßzeiten zu Fuß durchqueren.",
      "latestUpdate": "Das Signal bleibt lokal und offen. In diesem Prototyp liegt noch keine relevante Bestätigung einer Maßnahme vor.",
      "statusNote": "„Beobachtet“ bedeutet, dass die lokale Gemeinschaft das Problem erkannt hat. Es bedeutet keine offizielle Akte und keinen bereits begonnenen Eingriff."
    },
    "ro": {
      "category": "SPAȚIU PUBLIC",
      "headline": "Trotuar deteriorat în fața școlii de pe via Padova",
      "summary": "Rădăcinile au ridicat trotuarul. Copiii și persoanele în vârstă sunt nevoiți să meargă pe carosabil.",
      "area": "Città Studi",
      "observedTime": "Observat ieri",
      "observedDate": "14 iulie 2026",
      "civicStatus": "Stare civică: observat — în așteptarea atenției locale",
      "description": "În fața școlii de pe via Padova trotuarul este ridicat și spart. Trecerea pietonală rămâne neregulată pe câțiva metri și îi obligă pe pietoni să se apropie de carosabil, mai ales la orele de intrare și ieșire.",
      "whyMatters": "Pe aici trec zilnic cei care însoțesc copiii la școală și cei care se deplasează pe jos prin cartier. Un trotuar deteriorat nu e un detaliu estetic: reduce siguranța unui tronson cotidian și foarte folosit.",
      "whoAffected": "Familii cu copii, persoane în vârstă, persoane cu mobilitate redusă și oricine traversează Città Studi pe jos la ore de vârf.",
      "latestUpdate": "Semnalul rămâne local și deschis. În acest prototip nu există încă o confirmare relevantă a unei intervenții.",
      "statusNote": "„Observat” înseamnă că problema a fost recunoscută de comunitatea locală. Nu implică o procedură oficială și nici o intervenție deja începută."
    }
  },
  "milano-signal-2": {
    "sourceLang": "it",
    "cityId": "Milano",
    "it": {
      "category": "ILLUMINAZIONE",
      "headline": "Il percorso vicino alla scuola resta al buio la sera",
      "summary": "Diversi lampioni non funzionano sul tratto pedonale. I residenti hanno già segnalato il Comune.",
      "area": "Porta Romana",
      "observedTime": "Segnalato due giorni fa",
      "observedDate": "13 luglio 2026",
      "civicStatus": "Stato civico: segnalato — monitoraggio locale",
      "description": "Sul tratto pedonale vicino alla scuola, più lampioni restano spenti dopo il tramonto. Il percorso tra le abitazioni e l’ingresso scolastico diventa difficile da leggere, soprattutto per chi torna a piedi la sera.",
      "whyMatters": "Una strada poco illuminata riduce il senso di sicurezza di un percorso scolastico e quotidiano. In un quartiere abitato, la luce pubblica è parte essenziale della vita locale.",
      "whoAffected": "Studenti, genitori, residenti della sera e chi usa questo tratto pedonale per raggiungere fermate e abitazioni vicine.",
      "latestUpdate": "I residenti riferiscono di aver già segnalato il Comune. In questo prototipo il segnale resta in monitoraggio locale.",
      "statusNote": "«Segnalato» indica che il problema è stato portato all’attenzione locale. Non conferma riparazione, presa in carico formale o tempi di intervento."
    },
    "en": {
      "category": "LIGHTING",
      "headline": "The path near the school stays dark in the evening",
      "summary": "Several streetlights are not working on the pedestrian stretch. Residents have already reported it to the municipality.",
      "area": "Porta Romana",
      "observedTime": "Reported two days ago",
      "observedDate": "13 July 2026",
      "civicStatus": "Civic status: reported — local monitoring",
      "description": "On the pedestrian stretch near the school, several streetlights stay off after dusk. The path between homes and the school entrance becomes hard to read, especially for people walking back in the evening.",
      "whyMatters": "A poorly lit street reduces the sense of safety on a school and everyday route. In a lived-in neighbourhood, public lighting is part of local life.",
      "whoAffected": "Students, parents, evening residents, and anyone using this pedestrian stretch to reach nearby stops and homes.",
      "latestUpdate": "Residents say they have already reported it to the municipality. In this prototype the signal remains under local monitoring.",
      "statusNote": "“Reported” means the issue has been brought to local attention. It does not confirm repair, formal uptake, or intervention timing."
    },
    "es": {
      "category": "ILUMINACIÓN",
      "headline": "El camino cerca de la escuela permanece a oscuras por la noche",
      "summary": "Varias farolas no funcionan en el tramo peatonal. Los vecinos ya lo han señalado al Ayuntamiento.",
      "area": "Porta Romana",
      "observedTime": "Señalado hace dos días",
      "observedDate": "13 de julio de 2026",
      "civicStatus": "Estado cívico: señalado — seguimiento local",
      "description": "En el tramo peatonal cerca de la escuela, varias farolas permanecen apagadas después del anochecer. El recorrido entre las viviendas y la entrada escolar se vuelve difícil de leer, sobre todo para quien vuelve a pie por la noche.",
      "whyMatters": "Una calle poco iluminada reduce la sensación de seguridad de un recorrido escolar y cotidiano. En un barrio habitado, la luz pública es parte esencial de la vida local.",
      "whoAffected": "Estudiantes, padres, residentes nocturnos y quien usa este tramo peatonal para llegar a paradas y viviendas cercanas.",
      "latestUpdate": "Los vecinos indican que ya lo han señalado al Ayuntamiento. En este prototipo la señal permanece en seguimiento local.",
      "statusNote": "«Señalado» indica que el problema se ha llevado a la atención local. No confirma reparación, toma de cargo formal ni plazos de intervención."
    },
    "de": {
      "category": "STRASSENBELEUCHTUNG",
      "headline": "Der Weg nahe der Schule bleibt abends dunkel",
      "summary": "Mehrere Laternen am Fußweg funktionieren nicht. Anwohner haben die Störung bereits der Gemeinde gemeldet.",
      "area": "Porta Romana",
      "observedTime": "Vor zwei Tagen gemeldet",
      "observedDate": "13. Juli 2026",
      "civicStatus": "Bürgerlicher Status: gemeldet — lokale Beobachtung",
      "description": "Am Fußweg nahe der Schule bleiben mehrere Laternen nach Einbruch der Dunkelheit aus. Der Weg zwischen Wohnhäusern und Schuleingang ist schwerer zu lesen — besonders für alle, die abends zu Fuß zurückkommen.",
      "whyMatters": "Eine schlecht beleuchtete Straße mindert das Sicherheitsgefühl auf einem Schul- und Alltagsweg. In einem bewohnten Viertel gehört öffentliche Beleuchtung zum lokalen Leben.",
      "whoAffected": "Schülerinnen und Schüler, Eltern, Abendbewohner sowie alle, die diesen Fußweg zu Haltestellen und nahen Wohnungen nutzen.",
      "latestUpdate": "Anwohner berichten, die Störung bereits der Gemeinde gemeldet zu haben. In diesem Prototyp bleibt das Signal in lokaler Beobachtung.",
      "statusNote": "„Gemeldet“ heißt, dass das Thema lokal sichtbar gemacht wurde. Es bestätigt keine Reparatur, keine formale Übernahme und keinen Zeitplan."
    },
    "ro": {
      "category": "ILUMINAT",
      "headline": "Traseul de lângă școală rămâne întunecat seara",
      "summary": "Mai mulți stâlpi de iluminat nu funcționează pe tronsonul pietonal. Locuitorii au semnalat deja primăriei.",
      "area": "Porta Romana",
      "observedTime": "Semnalat acum două zile",
      "observedDate": "13 iulie 2026",
      "civicStatus": "Stare civică: semnalat — monitorizare locală",
      "description": "Pe tronsonul pietonal de lângă școală, mai mulți stâlpi rămân stinși după lăsarea întunericului. Traseul dintre locuințe și intrarea școlii devine greu de citit, mai ales pentru cei care se întorc pe jos seara.",
      "whyMatters": "O stradă slab iluminată reduce senzația de siguranță pe un traseu școlar și cotidian. Într-un cartier locuit, iluminatul public face parte din viața locală.",
      "whoAffected": "Elevi, părinți, locuitori seara și oricine folosește acest tronson pietonal pentru a ajunge la stații și locuințe apropiate.",
      "latestUpdate": "Locuitorii spun că au semnalat deja primăriei. În acest prototip semnalul rămâne în monitorizare locală.",
      "statusNote": "„Semnalat” înseamnă că problema a fost adusă în atenția locală. Nu confirmă reparația, preluarea formală sau termenele de intervenție."
    }
  },
  "milano-signal-3": {
    "sourceLang": "it",
    "cityId": "Milano",
    "it": {
      "category": "LAVORI PUBBLICI",
      "headline": "Il cantiere restringe il passaggio pedonale senza indicazioni chiare",
      "summary": "Il percorso temporaneo è stretto e poco segnalato. Servono tempi chiari e un passaggio più sicuro.",
      "area": "Lorenteggio",
      "observedTime": "Osservato questa settimana",
      "observedDate": "Questa settimana · luglio 2026",
      "civicStatus": "Stato civico: aperto — richiede chiarezza locale",
      "description": "Il cantiere ha ristretto il passaggio pedonale a un corridoio stretto, con indicazioni poco leggibili. Pedoni e ciclisti si trovano a condividere uno spazio ridotto, senza un percorso alternativo chiaro.",
      "whyMatters": "I lavori pubblici fanno parte della vita di quartiere, ma senza indicazioni e tempi comprensibili il passaggio quotidiano diventa confuso e meno sicuro.",
      "whoAffected": "Pedoni, ciclisti, residenti di Lorenteggio e chi attraversa l’area per lavoro o scuola.",
      "latestUpdate": "Il segnale resta aperto. In questo prototipo non risultano ancora indicazioni aggiornate su durata o percorso alternativo.",
      "statusNote": "«Aperto» significa che la situazione resta da chiarire per la comunità. Non implica una decisione amministrativa già conclusa."
    },
    "en": {
      "category": "PUBLIC WORKS",
      "headline": "The construction site narrows the pedestrian path without clear signs",
      "summary": "The temporary path is narrow and poorly marked. Clear timing and a safer passage are needed.",
      "area": "Lorenteggio",
      "observedTime": "Observed this week",
      "observedDate": "This week · July 2026",
      "civicStatus": "Civic status: open — needs local clarity",
      "description": "The worksite has narrowed the pedestrian path to a tight corridor, with signs that are hard to read. Pedestrians and cyclists share a reduced space without a clear alternative route.",
      "whyMatters": "Public works are part of neighbourhood life, but without understandable signs and timing the daily passage becomes confusing and less safe.",
      "whoAffected": "Pedestrians, cyclists, Lorenteggio residents, and anyone crossing the area for work or school.",
      "latestUpdate": "The signal remains open. In this prototype there is still no updated information on duration or an alternative route.",
      "statusNote": "“Open” means the situation still needs clarifying for the community. It does not imply a finished administrative decision."
    },
    "es": {
      "category": "OBRAS PÚBLICAS",
      "headline": "La obra estrecha el paso peatonal sin indicaciones claras",
      "summary": "El recorrido temporal es estrecho y está poco señalizado. Se necesitan plazos claros y un paso más seguro.",
      "area": "Lorenteggio",
      "observedTime": "Observado esta semana",
      "observedDate": "Esta semana · julio de 2026",
      "civicStatus": "Estado cívico: abierto — requiere claridad local",
      "description": "La obra ha reducido el paso peatonal a un corredor estrecho, con indicaciones poco legibles. Peatones y ciclistas comparten un espacio reducido, sin un recorrido alternativo claro.",
      "whyMatters": "Las obras públicas forman parte de la vida del barrio, pero sin indicaciones y plazos comprensibles el paso cotidiano se vuelve confuso y menos seguro.",
      "whoAffected": "Peatones, ciclistas, residentes de Lorenteggio y quien atraviesa la zona por trabajo o escuela.",
      "latestUpdate": "La señal permanece abierta. En este prototipo aún no hay indicaciones actualizadas sobre duración o recorrido alternativo.",
      "statusNote": "«Abierto» significa que la situación sigue por aclarar para la comunidad. No implica una decisión administrativa ya concluida."
    },
    "de": {
      "category": "ÖFFENTLICHE BAUARBEITEN",
      "headline": "Die Baustelle verengt den Fußweg ohne klare Hinweise",
      "summary": "Der provisorische Weg ist eng und schlecht ausgeschildert. Es braucht klare Zeiten und einen sichereren Durchgang.",
      "area": "Lorenteggio",
      "observedTime": "Diese Woche beobachtet",
      "observedDate": "Diese Woche · Juli 2026",
      "civicStatus": "Bürgerlicher Status: offen — braucht lokale Klarheit",
      "description": "Die Baustelle hat den Fußweg auf einen engen Korridor verengt, mit schwer lesbaren Hinweisen. Fußgänger und Radfahrer teilen sich einen verkleinerten Raum ohne klare Alternative.",
      "whyMatters": "Öffentliche Bauarbeiten gehören zum Viertelleben, aber ohne verständliche Hinweise und Zeiten wird der tägliche Durchgang unklar und weniger sicher.",
      "whoAffected": "Fußgänger, Radfahrer, Anwohner in Lorenteggio und alle, die das Gebiet für Arbeit oder Schule durchqueren.",
      "latestUpdate": "Das Signal bleibt offen. In diesem Prototyp gibt es noch keine aktualisierte Angabe zu Dauer oder Ausweichweg.",
      "statusNote": "„Offen“ bedeutet, dass die Situation für die Gemeinschaft noch geklärt werden muss. Es bedeutet keine abgeschlossene behördliche Entscheidung."
    },
    "ro": {
      "category": "LUCRĂRI PUBLICE",
      "headline": "Șantierul îngustează trecerea pietonală fără indicații clare",
      "summary": "Traseul temporar este îngust și slab semnalizat. Sunt necesare termene clare și o trecere mai sigură.",
      "area": "Lorenteggio",
      "observedTime": "Observat săptămâna aceasta",
      "observedDate": "Săptămâna aceasta · iulie 2026",
      "civicStatus": "Stare civică: deschis — necesită claritate locală",
      "description": "Șantierul a restrâns trecerea pietonală la un coridor îngust, cu indicații greu de citit. Pietonii și bicicliștii împart un spațiu redus, fără un traseu alternativ clar.",
      "whyMatters": "Lucrările publice fac parte din viața cartierului, dar fără indicații și termene clare trecerea zilnică devine confuză și mai puțin sigură.",
      "whoAffected": "Pietoni, bicicliști, locuitori din Lorenteggio și oricine traversează zona pentru muncă sau școală.",
      "latestUpdate": "Semnalul rămâne deschis. În acest prototip nu există încă indicații actualizate privind durata sau un traseu alternativ.",
      "statusNote": "„Deschis” înseamnă că situația rămâne de clarificat pentru comunitate. Nu implică o decizie administrativă deja încheiată."
    }
  },
  "munich-signal-1": {
    "sourceLang": "de",
    "cityId": "Munich",
    "de": {
      "category": "ÖFFENTLICHER RAUM",
      "headline": "Der Gehweg ist hier kaum noch sicher passierbar.",
      "summary": "Unebene Platten verengen den Gehweg. Menschen mit Kinderwagen oder Rollstuhl müssen auf die Straße ausweichen.",
      "area": "Schwabing",
      "observedTime": "Gestern beobachtet",
      "observedDate": "14. Juli 2026",
      "civicStatus": "Bürgerlicher Status: beobachtet — wartet auf lokale Aufmerksamkeit",
      "description": "In Schwabing ist der Gehweg durch angehobene und unebene Platten stark eingeschränkt. Der sichere Fußweg wird schmal, sodass Menschen näher an den Fahrbahnrand ausweichen müssen.",
      "whyMatters": "Ein beschädigter Gehweg betrifft den Alltag im Viertel. Er macht einen häufig genutzten Weg unsicherer — besonders für Familien, ältere Menschen und alle, die zu Fuß unterwegs sind.",
      "whoAffected": "Familien mit Kinderwagen, ältere Menschen, Personen mit eingeschränkter Mobilität und Fußgängerinnen und Fußgänger im täglichen Weg durch Schwabing.",
      "latestUpdate": "Das Signal bleibt lokal und offen. In diesem Prototyp liegt noch keine bestätigte Maßnahme vor.",
      "statusNote": "„Beobachtet“ bedeutet, dass die lokale Gemeinschaft das Problem erkannt hat. Es bedeutet keine offizielle Akte und keinen bereits begonnenen Eingriff."
    },
    "en": {
      "category": "PUBLIC SPACE",
      "headline": "The pavement here is barely safe to walk on.",
      "summary": "Uneven slabs narrow the pavement. People with prams or wheelchairs must move onto the road.",
      "area": "Schwabing",
      "observedTime": "Observed yesterday",
      "observedDate": "14 July 2026",
      "civicStatus": "Civic status: observed — awaiting local attention",
      "description": "In Schwabing the pavement is badly constrained by raised and uneven slabs. The safe footpath becomes narrow, so people have to move closer to the roadway edge.",
      "whyMatters": "A damaged pavement affects everyday life in the neighbourhood. It makes a frequently used route less safe — especially for families, older people, and anyone on foot.",
      "whoAffected": "Families with prams, older people, people with reduced mobility, and pedestrians on the daily route through Schwabing.",
      "latestUpdate": "The signal remains local and open. In this prototype no confirmed measure is available yet.",
      "statusNote": "“Observed” means the local community has recognised the problem. It does not mean an official act or an intervention already begun."
    },
    "es": {
      "category": "ESPACIO PÚBLICO",
      "headline": "La acera aquí apenas es segura para caminar.",
      "summary": "Losas irregulares estrechan la acera. Quien va con cochecito o silla de ruedas debe salir a la calzada.",
      "area": "Schwabing",
      "observedTime": "Observado ayer",
      "observedDate": "14 de julio de 2026",
      "civicStatus": "Estado cívico: observado — a la espera de atención local",
      "description": "En Schwabing la acera queda muy limitada por losas levantadas e irregulares. El paso peatonal seguro se estrecha, de modo que la gente debe acercarse al borde de la calzada.",
      "whyMatters": "Una acera dañada afecta la vida cotidiana del barrio. Hace menos seguro un recorrido muy usado — especialmente para familias, personas mayores y quien va a pie.",
      "whoAffected": "Familias con cochecito, personas mayores, personas con movilidad reducida y peatones en el recorrido diario por Schwabing.",
      "latestUpdate": "La señal sigue siendo local y abierta. En este prototipo aún no hay una medida confirmada.",
      "statusNote": "«Observado» significa que la comunidad local ha reconocido el problema. No implica un acto oficial ni una intervención ya iniciada."
    },
    "it": {
      "category": "SPAZIO PUBBLICO",
      "headline": "Il marciapiede qui è a malapena percorribile in sicurezza.",
      "summary": "Lastre irregolari restringono il marciapiede. Chi ha passeggino o sedia a rotelle deve spostarsi sulla carreggiata.",
      "area": "Schwabing",
      "observedTime": "Osservato ieri",
      "observedDate": "14 luglio 2026",
      "civicStatus": "Stato civico: osservato — in attesa di attenzione locale",
      "description": "A Schwabing il marciapiede è fortemente limitato da lastre sollevate e irregolari. Il passaggio pedonale sicuro si restringe, così le persone devono avvicinarsi al bordo della carreggiata.",
      "whyMatters": "Un marciapiede danneggiato riguarda la vita quotidiana del quartiere. Rende meno sicuro un percorso usato di frequente — soprattutto per famiglie, anziani e chi si muove a piedi.",
      "whoAffected": "Famiglie con passeggino, anziani, persone con mobilità ridotta e pedoni sul percorso quotidiano attraverso Schwabing.",
      "latestUpdate": "Il segnale resta locale e aperto. In questo prototipo non risulta ancora una misura confermata.",
      "statusNote": "«Osservato» significa che la comunità locale ha riconosciuto il problema. Non implica un atto ufficiale né un intervento già avviato."
    },
    "ro": {
      "category": "SPAȚIU PUBLIC",
      "headline": "Trotuarul de aici abia mai e sigur de parcurs.",
      "summary": "Dalele denivelate îngustează trotuarul. Persoanele cu cărucior sau scaun rulant trebuie să iasă pe carosabil.",
      "area": "Schwabing",
      "observedTime": "Observat ieri",
      "observedDate": "14 iulie 2026",
      "civicStatus": "Stare civică: observat — în așteptarea atenției locale",
      "description": "În Schwabing trotuarul este puternic restrâns de dale ridicate și denivelate. Trecerea pietonală sigură se îngustează, astfel încât oamenii trebuie să se apropie de marginea carosabilului.",
      "whyMatters": "Un trotuar deteriorat afectează viața de zi cu zi din cartier. Face mai puțin sigur un traseu folosit des — mai ales pentru familii, persoane în vârstă și pietoni.",
      "whoAffected": "Familii cu cărucior, persoane în vârstă, persoane cu mobilitate redusă și pietoni pe traseul zilnic prin Schwabing.",
      "latestUpdate": "Semnalul rămâne local și deschis. În acest prototip nu există încă o măsură confirmată.",
      "statusNote": "„Observat” înseamnă că problema a fost recunoscută de comunitatea locală. Nu implică un act oficial și nici o intervenție deja începută."
    }
  },
  "munich-signal-2": {
    "sourceLang": "de",
    "cityId": "Munich",
    "de": {
      "category": "STRASSENBELEUCHTUNG",
      "headline": "Mehrere Straßenlaternen bleiben am Abend dunkel.",
      "summary": "Der Fußweg zwischen Wohnhäusern und Haltestelle ist kaum beleuchtet. Anwohner haben die Störung bereits gemeldet.",
      "area": "Haidhausen",
      "observedTime": "Vor zwei Tagen gemeldet",
      "observedDate": "13. Juli 2026",
      "civicStatus": "Bürgerlicher Status: gemeldet — lokale Beobachtung",
      "description": "Mehrere Laternen am Fußweg zwischen Wohnhäusern und Haltestelle bleiben nach Einbruch der Dunkelheit aus. Der Weg ist schwerer zu lesen und fühlt sich weniger sicher an.",
      "whyMatters": "Gute Beleuchtung gehört zur alltäglichen Sicherheit im Quartier. Ein dunkler Schul- und Wohnweg betrifft nicht nur Komfort, sondern das Vertrauen in den öffentlichen Raum.",
      "whoAffected": "Anwohnerinnen und Anwohner, Schülerinnen und Schüler, Abendgänger sowie alle, die diesen Fußweg zur Haltestelle nutzen.",
      "latestUpdate": "Anwohner berichten, die Störung bereits gemeldet zu haben. In diesem Prototyp bleibt das Signal in lokaler Beobachtung.",
      "statusNote": "„Gemeldet“ heißt, dass das Thema lokal sichtbar gemacht wurde. Es bestätigt keine Reparatur, keine formale Übernahme und keinen Zeitplan."
    },
    "en": {
      "category": "STREET LIGHTING",
      "headline": "Several streetlights stay dark in the evening.",
      "summary": "The footpath between homes and the stop is barely lit. Residents have already reported the fault.",
      "area": "Haidhausen",
      "observedTime": "Reported two days ago",
      "observedDate": "13 July 2026",
      "civicStatus": "Civic status: reported — local observation",
      "description": "Several lights on the footpath between homes and the stop stay off after dark. The path is harder to read and feels less safe.",
      "whyMatters": "Good lighting belongs to everyday safety in the neighbourhood. A dark school and residential path affects not only comfort, but trust in public space.",
      "whoAffected": "Residents, schoolchildren, evening walkers, and anyone using this footpath to the stop.",
      "latestUpdate": "Residents report they have already flagged the fault. In this prototype the signal stays under local observation.",
      "statusNote": "“Reported” means the issue has been made locally visible. It does not confirm repair, formal uptake, or a timetable."
    },
    "es": {
      "category": "ILUMINACIÓN VIAL",
      "headline": "Varias farolas permanecen apagadas por la noche.",
      "summary": "El camino peatonal entre viviendas y la parada está casi sin luz. Los vecinos ya han avisado de la avería.",
      "area": "Haidhausen",
      "observedTime": "Señalado hace dos días",
      "observedDate": "13 de julio de 2026",
      "civicStatus": "Estado cívico: señalado — observación local",
      "description": "Varias farolas del camino peatonal entre viviendas y la parada permanecen apagadas tras el anochecer. El recorrido es más difícil de leer y se siente menos seguro.",
      "whyMatters": "Una buena iluminación forma parte de la seguridad cotidiana del barrio. Un camino escolar y residencial oscuro afecta no solo al confort, sino a la confianza en el espacio público.",
      "whoAffected": "Vecinos, escolares, paseantes nocturnos y quien usa este camino peatonal hacia la parada.",
      "latestUpdate": "Los vecinos indican que ya han avisado de la avería. En este prototipo la señal permanece en observación local.",
      "statusNote": "«Señalado» significa que el tema se ha hecho visible a nivel local. No confirma reparación, toma de cargo formal ni plazos."
    },
    "it": {
      "category": "ILLUMINAZIONE STRADALE",
      "headline": "Diverse lampade restano spente la sera.",
      "summary": "Il percorso pedonale tra le abitazioni e la fermata è poco illuminato. I residenti hanno già segnalato il guasto.",
      "area": "Haidhausen",
      "observedTime": "Segnalato due giorni fa",
      "observedDate": "13 luglio 2026",
      "civicStatus": "Stato civico: segnalato — osservazione locale",
      "description": "Diverse lampade sul percorso pedonale tra abitazioni e fermata restano spente dopo il buio. Il tragitto è più difficile da leggere e sembra meno sicuro.",
      "whyMatters": "Una buona illuminazione fa parte della sicurezza quotidiana del quartiere. Un percorso scolastico e residenziale buio riguarda non solo il comfort, ma la fiducia nello spazio pubblico.",
      "whoAffected": "Residenti, scolari, chi passeggia la sera e chi usa questo percorso pedonale verso la fermata.",
      "latestUpdate": "I residenti riferiscono di aver già segnalato il guasto. In questo prototipo il segnale resta in osservazione locale.",
      "statusNote": "«Segnalato» significa che il tema è stato reso visibile a livello locale. Non conferma riparazione, presa in carico formale o tempi."
    },
    "ro": {
      "category": "ILUMINAT STRADAL",
      "headline": "Mai mulți stâlpi de iluminat rămân stinși seara.",
      "summary": "Traseul pietonal dintre locuințe și stație este abia iluminat. Locuitorii au semnalat deja defectul.",
      "area": "Haidhausen",
      "observedTime": "Semnalat acum două zile",
      "observedDate": "13 iulie 2026",
      "civicStatus": "Stare civică: semnalat — observație locală",
      "description": "Mai mulți stâlpi de pe traseul pietonal dintre locuințe și stație rămân stinși după lăsarea întunericului. Traseul e mai greu de citit și se simte mai puțin sigur.",
      "whyMatters": "Un iluminat bun face parte din siguranța cotidiană a cartierului. Un traseu școlar și rezidențial întunecat afectează nu doar confortul, ci încrederea în spațiul public.",
      "whoAffected": "Locuitori, elevi, persoane care ies seara și oricine folosește acest traseu pietonal către stație.",
      "latestUpdate": "Locuitorii spun că au semnalat deja defectul. În acest prototip semnalul rămâne în observație locală.",
      "statusNote": "„Semnalat” înseamnă că problema a fost făcută vizibilă la nivel local. Nu confirmă reparația, preluarea formală sau un calendar."
    }
  },
  "munich-signal-3": {
    "sourceLang": "de",
    "cityId": "Munich",
    "de": {
      "category": "ÖFFENTLICHE BAUARBEITEN",
      "headline": "Der provisorische Weg ist zu eng und schlecht ausgeschildert.",
      "summary": "Fußgänger und Radfahrer teilen sich einen schmalen Durchgang. Es fehlen klare Hinweise und ein sicherer Übergang.",
      "area": "Sendling",
      "observedTime": "Diese Woche beobachtet",
      "observedDate": "Diese Woche · Juli 2026",
      "civicStatus": "Bürgerlicher Status: offen — braucht lokale Klarheit",
      "description": "Die Bauarbeiten haben den Durchgang auf einen engen provisorischen Weg verengt. Fußgänger und Radfahrer teilen sich denselben schmalen Raum, ohne klare Führung oder erkennbare Alternative.",
      "whyMatters": "Öffentliche Bauarbeiten gehören zum Stadtleben. Ohne verständliche Hinweise und sichere Übergänge wird der Alltag im Viertel jedoch unnötig unsicher und unklar.",
      "whoAffected": "Fußgänger, Radfahrer, Anwohner in Sendling und alle, die das Gebiet regelmäßig durchqueren.",
      "latestUpdate": "Das Signal bleibt offen. In diesem Prototyp gibt es noch keine aktualisierte Angabe zu Dauer oder Ausweichweg.",
      "statusNote": "„Offen“ bedeutet, dass die Situation für die Gemeinschaft noch geklärt werden muss. Es bedeutet keine abgeschlossene behördliche Entscheidung."
    },
    "en": {
      "category": "PUBLIC WORKS",
      "headline": "The temporary path is too narrow and poorly signed.",
      "summary": "Pedestrians and cyclists share a narrow passage. Clear guidance and a safer crossing are missing.",
      "area": "Sendling",
      "observedTime": "Observed this week",
      "observedDate": "This week · July 2026",
      "civicStatus": "Civic status: open — needs local clarity",
      "description": "The works have narrowed the passage to a tight temporary path. Pedestrians and cyclists share the same narrow space without clear guidance or a visible alternative.",
      "whyMatters": "Public works belong to city life. Without understandable signs and safe crossings, everyday movement in the neighbourhood becomes unnecessarily unsafe and unclear.",
      "whoAffected": "Pedestrians, cyclists, Sendling residents, and anyone who regularly crosses the area.",
      "latestUpdate": "The signal remains open. In this prototype there is still no updated note on duration or a diversion.",
      "statusNote": "“Open” means the situation still needs clarifying for the community. It does not mean a finished official decision."
    },
    "es": {
      "category": "OBRAS PÚBLICAS",
      "headline": "El camino provisional es demasiado estrecho y está mal señalizado.",
      "summary": "Peatones y ciclistas comparten un paso estrecho. Faltan indicaciones claras y un cruce más seguro.",
      "area": "Sendling",
      "observedTime": "Observado esta semana",
      "observedDate": "Esta semana · julio de 2026",
      "civicStatus": "Estado cívico: abierto — necesita claridad local",
      "description": "Las obras han reducido el paso a un camino provisional estrecho. Peatones y ciclistas comparten el mismo espacio reducido, sin guía clara ni alternativa visible.",
      "whyMatters": "Las obras públicas forman parte de la vida urbana. Sin indicaciones comprensibles y cruces seguros, el movimiento cotidiano del barrio se vuelve innecesariamente inseguro y confuso.",
      "whoAffected": "Peatones, ciclistas, residentes de Sendling y quien atraviesa la zona con regularidad.",
      "latestUpdate": "La señal permanece abierta. En este prototipo aún no hay una nota actualizada sobre duración o desvío.",
      "statusNote": "«Abierto» significa que la situación sigue por aclarar para la comunidad. No implica una decisión oficial concluida."
    },
    "it": {
      "category": "LAVORI PUBBLICI",
      "headline": "Il percorso provvisorio è troppo stretto e poco segnalato.",
      "summary": "Pedoni e ciclisti condividono un passaggio stretto. Mancano indicazioni chiare e un attraversamento più sicuro.",
      "area": "Sendling",
      "observedTime": "Osservato questa settimana",
      "observedDate": "Questa settimana · luglio 2026",
      "civicStatus": "Stato civico: aperto — serve chiarezza locale",
      "description": "I lavori hanno ristretto il passaggio a un percorso provvisorio stretto. Pedoni e ciclisti condividono lo stesso spazio ridotto, senza guida chiara né un’alternativa visibile.",
      "whyMatters": "I lavori pubblici fanno parte della vita cittadina. Senza indicazioni comprensibili e attraversamenti sicuri, il movimento quotidiano nel quartiere diventa inutilmente insicuro e poco chiaro.",
      "whoAffected": "Pedoni, ciclisti, residenti di Sendling e chi attraversa regolarmente l’area.",
      "latestUpdate": "Il segnale resta aperto. In questo prototipo non c’è ancora un’indicazione aggiornata su durata o diversione.",
      "statusNote": "«Aperto» significa che la situazione va ancora chiarita per la comunità. Non implica una decisione ufficiale conclusa."
    },
    "ro": {
      "category": "LUCRĂRI PUBLICE",
      "headline": "Traseul provizoriu este prea îngust și slab semnalizat.",
      "summary": "Pietonii și bicicliștii împart o trecere îngustă. Lipsesc indicații clare și o traversare mai sigură.",
      "area": "Sendling",
      "observedTime": "Observat săptămâna aceasta",
      "observedDate": "Săptămâna aceasta · iulie 2026",
      "civicStatus": "Stare civică: deschis — necesită claritate locală",
      "description": "Lucrările au restrâns trecerea la un traseu provizoriu îngust. Pietonii și bicicliștii împart același spațiu redus, fără îndrumare clară și fără o alternativă vizibilă.",
      "whyMatters": "Lucrările publice fac parte din viața orașului. Fără indicații clare și traversări sigure, deplasarea zilnică din cartier devine inutil de nesigură și confuză.",
      "whoAffected": "Pietoni, bicicliști, locuitori din Sendling și oricine traversează zona în mod regulat.",
      "latestUpdate": "Semnalul rămâne deschis. În acest prototip nu există încă o mențiune actualizată privind durata sau o ocolire.",
      "statusNote": "„Deschis” înseamnă că situația rămâne de clarificat pentru comunitate. Nu înseamnă o decizie oficială încheiată."
    }
  },
  "arad-signal-1": {
    "sourceLang": "ro",
    "cityId": "Arad",
    "ro": {
      "category": "MEDIU",
      "headline": "Moloz depozitat ilegal la marginea pădurii Ceala",
      "summary": "Camioane cu moloz ajung în continuare pe malul Mureșului, lângă pădurea Ceala. Traseul rămâne deschis, fără barieră.",
      "area": "Pădurea Ceala",
      "observedTime": "Observat săptămâna aceasta",
      "observedDate": "20 iulie 2026",
      "civicStatus": "Stare civică: observat — în așteptarea atenției locale",
      "description": "La capătul străzii Mărului, în zona Alfa, transporturile de moloz continuă pe un traseu care trece inclusiv pe pista de biciclete, către malul Mureșului și marginea pădurii Ceala. Amenzile aplicate până acum nu au oprit depozitările, iar accesul camioanelor rămâne posibil în lipsa unei bariere.",
      "whyMatters": "Pădurea Ceala și malul Mureșului sunt printre puținele zone naturale de agrement ale orașului. Depozitarea necontrolată a molozului afectează peisajul, mediul și siguranța celor care folosesc pista de biciclete.",
      "whoAffected": "Bicicliști, familii care se plimbă în zona Ceala, pescari, locuitorii cartierului Alfa și oricine folosește malul Mureșului pentru recreere.",
      "latestUpdate": "Semnalul rămâne local și deschis. O barieră de acces nu a fost încă instalată.",
      "statusNote": "„Observat” înseamnă că problema a fost recunoscută de comunitatea locală. Nu implică o procedură oficială și nici o intervenție deja începută."
    },
    "en": {
      "category": "ENVIRONMENT",
      "headline": "Illegal rubble dumped at the edge of Ceala Forest",
      "summary": "Rubble trucks still reach the Mureș riverbank near Ceala Forest. The route stays open, without a barrier.",
      "area": "Ceala Forest",
      "observedTime": "Observed this week",
      "observedDate": "20 July 2026",
      "civicStatus": "Civic status: observed — awaiting local attention",
      "description": "At the end of Mărului Street, in the Alfa area, rubble transports continue on a route that also crosses the cycle path toward the Mureș bank and the edge of Ceala Forest. Fines so far have not stopped the dumping, and truck access remains possible without a barrier.",
      "whyMatters": "Ceala Forest and the Mureș bank are among the city’s few natural leisure areas. Uncontrolled rubble dumping affects the landscape, the environment, and the safety of people using the cycle path.",
      "whoAffected": "Cyclists, families walking in the Ceala area, anglers, Alfa neighbourhood residents, and anyone using the Mureș bank for recreation.",
      "latestUpdate": "The signal remains local and open. An access barrier has not been installed yet.",
      "statusNote": "“Observed” means the local community has recognised the problem. It does not imply an official procedure or an intervention already started."
    },
    "es": {
      "category": "MEDIO AMBIENTE",
      "headline": "Escombros depositados ilegalmente al borde del bosque de Ceala",
      "summary": "Los camiones de escombros siguen llegando a la orilla del Mureș, junto al bosque de Ceala. La ruta permanece abierta, sin barrera.",
      "area": "Bosque de Ceala",
      "observedTime": "Observado esta semana",
      "observedDate": "20 de julio de 2026",
      "civicStatus": "Estado cívico: observado — a la espera de atención local",
      "description": "Al final de la calle Mărului, en la zona Alfa, los transportes de escombros continúan por una ruta que también cruza el carril bici hacia la orilla del Mureș y el borde del bosque de Ceala. Las multas hasta ahora no han detenido los vertidos, y el acceso de camiones sigue siendo posible sin una barrera.",
      "whyMatters": "El bosque de Ceala y la orilla del Mureș están entre las pocas zonas naturales de ocio de la ciudad. El vertido incontrolado de escombros afecta al paisaje, al medio ambiente y a la seguridad de quienes usan el carril bici.",
      "whoAffected": "Ciclistas, familias que pasean por la zona de Ceala, pescadores, vecinos del barrio Alfa y quien usa la orilla del Mureș para recreo.",
      "latestUpdate": "La señal sigue siendo local y abierta. Aún no se ha instalado una barrera de acceso.",
      "statusNote": "«Observado» significa que la comunidad local ha reconocido el problema. No implica un procedimiento oficial ni una intervención ya iniciada."
    },
    "it": {
      "category": "AMBIENTE",
      "headline": "Macerie depositate illegalmente al margine della foresta Ceala",
      "summary": "I camion di macerie raggiungono ancora la riva del Mureș vicino alla foresta Ceala. Il percorso resta aperto, senza barriera.",
      "area": "Foresta Ceala",
      "observedTime": "Osservato questa settimana",
      "observedDate": "20 luglio 2026",
      "civicStatus": "Stato civico: osservato — in attesa di attenzione locale",
      "description": "Alla fine di strada Mărului, nella zona Alfa, i trasporti di macerie continuano su un percorso che attraversa anche la pista ciclabile verso la riva del Mureș e il margine della foresta Ceala. Le multe finora non hanno fermato i depositi e l’accesso dei camion resta possibile senza una barriera.",
      "whyMatters": "La foresta Ceala e la riva del Mureș sono tra le poche aree naturali di svago della città. Il deposito incontrollato di macerie colpisce il paesaggio, l’ambiente e la sicurezza di chi usa la pista ciclabile.",
      "whoAffected": "Ciclisti, famiglie che passeggiano nella zona Ceala, pescatori, abitanti del quartiere Alfa e chi usa la riva del Mureș per il tempo libero.",
      "latestUpdate": "Il segnale resta locale e aperto. Una barriera di accesso non è ancora stata installata.",
      "statusNote": "«Osservato» significa che la comunità locale ha riconosciuto il problema. Non implica una procedura ufficiale né un intervento già avviato."
    },
    "de": {
      "category": "UMWELT",
      "headline": "Illegal abgelagerter Bauschutt am Rand des Ceala-Waldes",
      "summary": "Schuttlastwagen erreichen weiterhin das Mureș-Ufer nahe dem Ceala-Wald. Die Route bleibt offen, ohne Schranke.",
      "area": "Ceala-Wald",
      "observedTime": "Diese Woche beobachtet",
      "observedDate": "20. Juli 2026",
      "civicStatus": "Bürgerlicher Status: beobachtet — wartet auf lokale Aufmerksamkeit",
      "description": "Am Ende der Mărului-Straße im Gebiet Alfa gehen Schutttransporte weiter auf einer Route, die auch den Radweg zum Mureș-Ufer und zum Rand des Ceala-Waldes nutzt. Bisherige Bußgelder haben die Ablagerungen nicht gestoppt; der Lkw-Zugang bleibt ohne Schranke möglich.",
      "whyMatters": "Der Ceala-Wald und das Mureș-Ufer gehören zu den wenigen naturnahen Erholungsräumen der Stadt. Unkontrollierte Schuttablagerung belastet Landschaft, Umwelt und die Sicherheit aller, die den Radweg nutzen.",
      "whoAffected": "Radfahrer, Familien, die im Ceala-Gebiet spazieren, Angler, Bewohner des Viertels Alfa und alle, die das Mureș-Ufer zur Erholung nutzen.",
      "latestUpdate": "Das Signal bleibt lokal und offen. Eine Zugangsschranke wurde noch nicht installiert.",
      "statusNote": "„Beobachtet“ bedeutet, dass die lokale Gemeinschaft das Problem erkannt hat. Es bedeutet keine offizielle Akte und keinen bereits begonnenen Eingriff."
    }
  },
  "arad-signal-2": {
    "sourceLang": "ro",
    "cityId": "Arad",
    "ro": {
      "category": "INFRASTRUCTURĂ",
      "headline": "Lucrările la Drumul Regelui avansează pe tronsonul Petriș–Vața",
      "summary": "Pe cei 4 km din județul Arad se construiesc ziduri de sprijin și fundații continue. Termen de finalizare: aprilie 2028.",
      "area": "Petriș",
      "observedTime": "Observat săptămâna aceasta",
      "observedDate": "21 iulie 2026",
      "civicStatus": "Stare civică: în lucru — intervenție publică în desfășurare",
      "description": "Pe sectorul arădean al Drumului Regelui, între Petriș și limita cu județul Hunedoara, constructorul execută aproximativ 2,5 kilometri de ziduri de sprijin și 1.900 de metri de fundații continue. Lucrările stabilizează versanții și lărgesc platforma drumului montan.",
      "whyMatters": "Drumul Regelui va lega modern județele Arad și Hunedoara și va deschide accesul către Munții Zărandului, pe unul dintre cele mai spectaculoase trasee panoramice din vestul României.",
      "whoAffected": "Locuitorii comunei Petriș și ai zonei montane, șoferii care circulă între cele două județe, turiștii care vizitează Munții Zărandului.",
      "latestUpdate": "Lucrările avansează în ritm susținut. Proiectul are termen de finalizare în aprilie 2028.",
      "statusNote": "„În lucru” înseamnă că o intervenție publică este în desfășurare, cu termen asumat. Semnalul urmărește evoluția lucrărilor."
    },
    "en": {
      "category": "INFRASTRUCTURE",
      "headline": "Works on the King’s Road advance on the Petriș–Vața section",
      "summary": "On the 4 km in Arad County, retaining walls and continuous foundations are being built. Completion target: April 2028.",
      "area": "Petriș",
      "observedTime": "Observed this week",
      "observedDate": "21 July 2026",
      "civicStatus": "Civic status: in progress — public intervention underway",
      "description": "On the Arad section of the King’s Road, between Petriș and the Hunedoara County border, the contractor is building about 2.5 kilometres of retaining walls and 1,900 metres of continuous foundations. The works stabilise the slopes and widen the mountain road platform.",
      "whyMatters": "The King’s Road will modernise the link between Arad and Hunedoara counties and open access toward the Zărand Mountains, on one of the most scenic routes in western Romania.",
      "whoAffected": "Residents of Petriș commune and the mountain area, drivers travelling between the two counties, and visitors to the Zărand Mountains.",
      "latestUpdate": "Works are advancing at a steady pace. The project has a completion target of April 2028.",
      "statusNote": "“In progress” means a public intervention is underway, with a stated deadline. The signal follows the works as they evolve."
    },
    "es": {
      "category": "INFRAESTRUCTURA",
      "headline": "Las obras del Camino del Rey avanzan en el tramo Petriș–Vața",
      "summary": "En los 4 km del condado de Arad se construyen muros de contención y cimentaciones continuas. Plazo de finalización: abril de 2028.",
      "area": "Petriș",
      "observedTime": "Observado esta semana",
      "observedDate": "21 de julio de 2026",
      "civicStatus": "Estado cívico: en curso — intervención pública en marcha",
      "description": "En el tramo aradense del Camino del Rey, entre Petriș y el límite con el condado de Hunedoara, el constructor ejecuta unos 2,5 kilómetros de muros de contención y 1.900 metros de cimentaciones continuas. Las obras estabilizan las laderas y ensanchan la plataforma de la carretera de montaña.",
      "whyMatters": "El Camino del Rey modernizará el enlace entre los condados de Arad y Hunedoara y abrirá el acceso hacia los montes Zărand, en una de las rutas panorámicas más destacadas del oeste de Rumanía.",
      "whoAffected": "Habitantes de la comuna de Petriș y de la zona de montaña, conductores que circulan entre ambos condados y visitantes de los montes Zărand.",
      "latestUpdate": "Las obras avanzan a ritmo sostenido. El proyecto tiene plazo de finalización en abril de 2028.",
      "statusNote": "«En curso» significa que hay una intervención pública en marcha, con un plazo asumido. La señal sigue la evolución de las obras."
    },
    "it": {
      "category": "INFRASTRUTTURA",
      "headline": "I lavori sulla Strada del Re avanzano sul tratto Petriș–Vața",
      "summary": "Sui 4 km nella contea di Arad si costruiscono muri di sostegno e fondazioni continue. Termine di completamento: aprile 2028.",
      "area": "Petriș",
      "observedTime": "Osservato questa settimana",
      "observedDate": "21 luglio 2026",
      "civicStatus": "Stato civico: in corso — intervento pubblico in svolgimento",
      "description": "Sul tratto aradese della Strada del Re, tra Petriș e il confine con la contea di Hunedoara, l’impresa esegue circa 2,5 chilometri di muri di sostegno e 1.900 metri di fondazioni continue. I lavori stabilizzano i versanti e allargano la piattaforma della strada di montagna.",
      "whyMatters": "La Strada del Re modernizzerà il collegamento tra le contee di Arad e Hunedoara e aprirà l’accesso ai Monti Zărand, su uno dei percorsi panoramici più rilevanti dell’ovest della Romania.",
      "whoAffected": "Abitanti del comune di Petriș e dell’area montana, automobilisti che viaggiano tra le due contee e visitatori dei Monti Zărand.",
      "latestUpdate": "I lavori avanzano a ritmo sostenuto. Il progetto ha termine di completamento nell’aprile 2028.",
      "statusNote": "«In corso» significa che un intervento pubblico è in svolgimento, con un termine dichiarato. Il segnale segue l’evoluzione dei lavori."
    },
    "de": {
      "category": "INFRASTRUKTUR",
      "headline": "Arbeiten an der Königsstraße schreiten auf dem Abschnitt Petriș–Vața voran",
      "summary": "Auf den 4 km im Kreis Arad entstehen Stützmauern und durchgehende Fundamente. Fertigstellungstermin: April 2028.",
      "area": "Petriș",
      "observedTime": "Diese Woche beobachtet",
      "observedDate": "21. Juli 2026",
      "civicStatus": "Bürgerlicher Status: in Arbeit — öffentliche Maßnahme läuft",
      "description": "Auf dem arader Abschnitt der Königsstraße zwischen Petriș und der Grenze zum Kreis Hunedoara errichtet die Baufirma etwa 2,5 Kilometer Stützmauern und 1.900 Meter durchgehende Fundamente. Die Arbeiten sichern die Hänge und verbreitern die Bergstraßenplattform.",
      "whyMatters": "Die Königsstraße wird die Verbindung zwischen den Kreisen Arad und Hunedoara modernisieren und den Zugang zu den Zărand-Bergen öffnen — auf einer der eindrucksvollsten Panoramarouten im Westen Rumäniens.",
      "whoAffected": "Einwohner der Gemeinde Petriș und der Bergregion, Autofahrer zwischen beiden Kreisen sowie Besucher der Zărand-Berge.",
      "latestUpdate": "Die Arbeiten schreiten im gleichmäßigen Tempo voran. Das Projekt hat den Fertigstellungstermin April 2028.",
      "statusNote": "„In Arbeit“ bedeutet, dass eine öffentliche Maßnahme läuft, mit genanntem Termin. Das Signal verfolgt den Fortschritt der Arbeiten."
    }
  },
  "arad-signal-3": {
    "sourceLang": "ro",
    "cityId": "Arad",
    "ro": {
      "category": "SPAȚIU PUBLIC",
      "headline": "Strada Someșului rămâne neasfaltată, în ciuda unei sentințe definitive",
      "summary": "Instanța a obligat Primăria să asfalteze strada. Trotuarele au fost realizate; carosabilul, încă nu.",
      "area": "Strada Someșului",
      "observedTime": "Observat săptămâna aceasta",
      "observedDate": "21 iulie 2026",
      "civicStatus": "Stare civică: observat — hotărâre judecătorească în așteptarea executării",
      "description": "Strada Someșului este în continuare din pământ, deși o sentință definitivă din 2024 obligă Primăria la asfaltare și amenajarea trotuarelor. Trotuarele au fost realizate anul trecut; partea carosabilă așteaptă încă documentația tehnică și execuția.",
      "whyMatters": "O stradă de pământ într-o zonă cu impozite calculate pentru infrastructură completă ridică o întrebare simplă de echitate: locuitorii plătesc pentru condiții pe care nu le au.",
      "whoAffected": "Locuitorii străzii Someșului și ai zonei — pietoni, familii, șoferi care folosesc zilnic o stradă fără asfalt, pe orice vreme.",
      "latestUpdate": "Primăria a comunicat că strada este inclusă pe lista de asfaltare, investiția fiind în etapa documentației tehnico-economice.",
      "statusNote": "Semnalul privește o obligație stabilită printr-o hotărâre judecătorească definitivă, a cărei executare este încă în curs."
    },
    "en": {
      "category": "PUBLIC SPACE",
      "headline": "Someșului Street remains unpaved despite a final court ruling",
      "summary": "The court ordered the City Hall to pave the street. Sidewalks were built; the roadway still was not.",
      "area": "Someșului Street",
      "observedTime": "Observed this week",
      "observedDate": "21 July 2026",
      "civicStatus": "Civic status: observed — final court ruling awaiting execution",
      "description": "Someșului Street is still dirt, even though a final 2024 ruling obliges the City Hall to pave it and arrange sidewalks. Sidewalks were completed last year; the roadway still awaits technical documentation and execution.",
      "whyMatters": "A dirt street in an area with taxes calculated for complete infrastructure raises a simple fairness question: residents pay for conditions they do not have.",
      "whoAffected": "Residents of Someșului Street and the area — pedestrians, families, and drivers who use an unpaved street daily, in every weather.",
      "latestUpdate": "City Hall has said the street is on the paving list, with the investment still in the technical-economic documentation stage.",
      "statusNote": "The signal concerns an obligation set by a final court ruling whose execution is still underway."
    },
    "es": {
      "category": "ESPACIO PÚBLICO",
      "headline": "La calle Someșului sigue sin asfaltar pese a una sentencia firme",
      "summary": "El tribunal obligó al Ayuntamiento a asfaltar la calle. Se hicieron las aceras; la calzada, aún no.",
      "area": "Calle Someșului",
      "observedTime": "Observado esta semana",
      "observedDate": "21 de julio de 2026",
      "civicStatus": "Estado cívico: observado — sentencia firme a la espera de ejecución",
      "description": "La calle Someșului sigue siendo de tierra, aunque una sentencia firme de 2024 obliga al Ayuntamiento a asfaltarla y acondicionar las aceras. Las aceras se hicieron el año pasado; la calzada aún espera la documentación técnica y la ejecución.",
      "whyMatters": "Una calle de tierra en una zona con impuestos calculados para una infraestructura completa plantea una pregunta sencilla de equidad: los vecinos pagan por condiciones que no tienen.",
      "whoAffected": "Vecinos de la calle Someșului y de la zona — peatones, familias y conductores que usan a diario una calle sin asfalto, con cualquier tiempo.",
      "latestUpdate": "El Ayuntamiento ha comunicado que la calle está en la lista de asfaltado, con la inversión aún en fase de documentación técnico-económica.",
      "statusNote": "La señal se refiere a una obligación fijada por una sentencia firme cuya ejecución sigue en curso."
    },
    "it": {
      "category": "SPAZIO PUBBLICO",
      "headline": "Via Someșului resta non asfaltata nonostante una sentenza definitiva",
      "summary": "Il tribunale ha obbligato il Comune ad asfaltare la strada. I marciapiedi sono stati realizzati; la carreggiata, non ancora.",
      "area": "Via Someșului",
      "observedTime": "Osservato questa settimana",
      "observedDate": "21 luglio 2026",
      "civicStatus": "Stato civico: osservato — sentenza definitiva in attesa di esecuzione",
      "description": "Via Someșului è ancora in terra, anche se una sentenza definitiva del 2024 obbliga il Comune all’asfaltatura e alla sistemazione dei marciapiedi. I marciapiedi sono stati realizzati lo scorso anno; la carreggiata attende ancora documentazione tecnica ed esecuzione.",
      "whyMatters": "Una strada di terra in un’area con imposte calcolate per un’infrastruttura completa pone una domanda semplice di equità: i residenti pagano per condizioni che non hanno.",
      "whoAffected": "Abitanti di via Someșului e della zona — pedoni, famiglie e automobilisti che usano ogni giorno una strada senza asfalto, con qualsiasi tempo.",
      "latestUpdate": "Il Comune ha comunicato che la strada è inclusa nell’elenco di asfaltatura, con l’investimento ancora in fase di documentazione tecnico-economica.",
      "statusNote": "Il segnale riguarda un obbligo fissato da una sentenza definitiva la cui esecuzione è ancora in corso."
    },
    "de": {
      "category": "ÖFFENTLICHER RAUM",
      "headline": "Die Someșului-Straße bleibt ungepflastert trotz rechtskräftigem Urteil",
      "summary": "Das Gericht hat die Stadtverwaltung zur Asphaltierung verpflichtet. Gehwege wurden gebaut; die Fahrbahn noch nicht.",
      "area": "Someșului-Straße",
      "observedTime": "Diese Woche beobachtet",
      "observedDate": "21. Juli 2026",
      "civicStatus": "Bürgerlicher Status: beobachtet — rechtskräftiges Urteil wartet auf Vollzug",
      "description": "Die Someșului-Straße ist weiterhin unbefestigt, obwohl ein rechtskräftiges Urteil von 2024 die Stadtverwaltung zur Asphaltierung und zur Anlage von Gehwegen verpflichtet. Die Gehwege wurden im vergangenen Jahr fertiggestellt; die Fahrbahn wartet noch auf die technische Dokumentation und die Ausführung.",
      "whyMatters": "Eine unbefestigte Straße in einem Gebiet mit Abgaben für vollständige Infrastruktur stellt eine einfache Fairnessfrage: Die Bewohner zahlen für Bedingungen, die sie nicht haben.",
      "whoAffected": "Bewohner der Someșului-Straße und der Umgebung — Fußgänger, Familien und Autofahrer, die täglich eine ungepflasterte Straße bei jedem Wetter nutzen.",
      "latestUpdate": "Die Stadtverwaltung hat mitgeteilt, dass die Straße auf der Asphaltierungsliste steht; die Investition befindet sich noch in der technisch-wirtschaftlichen Dokumentationsphase.",
      "statusNote": "Das Signal betrifft eine Verpflichtung aus einem rechtskräftigen Urteil, dessen Vollzug noch läuft."
    }
  }
};

  function localizeSignal(scene, readingLang, i18n) {
    if (!scene || !scene.id) return scene;
    const entry = SIGNAL_COPY[scene.id];
    if (!entry) {
      return Object.assign({}, scene, {
        sourceLang: null,
        sourceLanguageLabel: "",
        readingLang: (i18n && i18n.resolveReadingLanguage([readingLang])) || "en",
      });
    }
    const lang = (i18n && i18n.resolveReadingLanguage([readingLang])) || "en";
    const localized = Object.assign({}, scene);
    localized.sourceLang = entry.sourceLang || null;
    localized.cityId = entry.cityId || null;
    localized.readingLang = lang;
    for (let i = 0; i < SIGNAL_FIELD_KEYS.length; i++) {
      const key = SIGNAL_FIELD_KEYS[i];
      let value = "";
      if (entry[lang] && entry[lang][key] != null && entry[lang][key] !== "") {
        value = entry[lang][key];
      } else if (entry.en && entry.en[key] != null && entry.en[key] !== "") {
        value = entry.en[key];
      } else if (scene[key] != null) {
        value = scene[key];
      }
      localized[key] = value;
    }
    localized.sourceLanguageLabel =
      i18n && i18n.sourceLanguageLabel
        ? i18n.sourceLanguageLabel(lang, entry.sourceLang)
        : "";
    return localized;
  }

  function hasCompleteLocale(signalId, lang) {
    const entry = SIGNAL_COPY[signalId];
    if (!entry || !entry[lang]) return false;
    for (let i = 0; i < SIGNAL_FIELD_KEYS.length; i++) {
      const key = SIGNAL_FIELD_KEYS[i];
      if (entry[lang][key] == null || entry[lang][key] === "") return false;
    }
    return true;
  }

  function allSignalIds() {
    return Object.keys(SIGNAL_COPY);
  }

  return {
    SIGNAL_COPY: SIGNAL_COPY,
    SIGNAL_FIELD_KEYS: SIGNAL_FIELD_KEYS,
    localizeSignal: localizeSignal,
    hasCompleteLocale: hasCompleteLocale,
    allSignalIds: allSignalIds,
  };
});

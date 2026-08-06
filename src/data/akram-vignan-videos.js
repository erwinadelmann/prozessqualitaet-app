// Feste, geräteübergreifend synchronisierte Liste für den Tab "Akram Vignan".
// Titel und Reihenfolge sind absichtlich fest im Code hinterlegt statt in localStorage,
// damit sie auf jedem Gerät identisch sind und stabil bleiben, bis diese Datei geändert
// und neu deployt wird (siehe VideoListTab.jsx, Prop "synced"). Titel stammen aus den
// echten YouTube-Video-Titeln (Quelle: YouTube-oEmbed-API). Kanal ist Erwin Adelmanns
// eigener YouTube-Kanal (@ErwinAdelmann), keine externe Autorenquelle wie bei den übrigen
// Sammlungen. Stand: 2026-08-05.
// Reihenfolge bewusst thematisch gesetzt statt in der Reihenfolge des Einlangens:
// zuerst die zweiteilige Satsang-Einführung (Part 1 vor Part 2), dann die inhaltlichen
// Grundlagen (Seele, Karma, Ego), zuletzt die kurze Energizer-Reihe von Pujya Deepakbhai.
export const AKRAM_VIGNAN_VIDEOS = [
  { url: 'https://youtu.be/vXS5q3hm3AQ', title: 'Einführung in die Spirituelle Wissenschaft, Akram Vignan Satsang, Part 1' },
  { url: 'https://youtu.be/MDYotFbn-XE', title: 'Einführung in die Spirituelle Wissenschaft, Akram Vignan Satsang 2014, Part 2' },
  { url: 'https://youtu.be/mgsW_qYWak0', title: 'Die Qualitäten der Reinen Seele, Akram Vignan, der stufenlose Weg die Seele direkt zu erfahren' },
  { url: 'https://youtu.be/GCRsXljwEvg', title: 'Wie kann man die Seele erkennen, Können wir das Selbst sehen, Ist es nur eine Imagination' },
  { url: 'https://youtu.be/lxinhwcPkSQ', title: 'Was ist Karma, Ist es Strafe, Ursache oder Wirkung, Akram Vignan, Frei von Karma werden' },
  { url: 'https://youtu.be/cSk15UTidtE', title: 'Wie erreicht man den egolosen Zustand, Akram Vignan' },
  { url: 'https://youtu.be/bSudPS5J4kU', title: 'Satsang Deepakbhai about Thoughts and Mind (englisch), Akram Vignan Germany' },
  { url: 'https://youtu.be/NvNvyYf9JE8', title: 'Die Kraft des Gebets, Hingabe, Atma Gnani Pujya Deepakbhai' },
  { url: 'https://youtu.be/-fP4dlOLNp8', title: 'Energizer, Das Gebet für den Frieden in der Welt, Pujya Deepakbhai' },
  { url: 'https://youtu.be/LJOhrwYDZrU', title: 'Energizer, In jeder Situation glücklich sein, Pujya Deepakbhai' },
  { url: 'https://youtu.be/S-stHCxhHv0', title: 'Energizer, Wer ist eigentlich Chandubhai, Pujya Deepakbhai' },
  { url: 'https://youtu.be/j3nYHN6vG6E', title: 'Energizer, Innere Stabilität durch die Erfahrung der Reinen Seele, Pujya Deepakbhai' }
];

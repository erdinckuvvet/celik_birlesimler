// calc.js - Modül 01 (tablo destekli sürüm)
(function () {

  // --- Tablo verileri -------------------------------------------------------


  const HE_GEOMETRY = {
    "HE 100 AA": { d: 91, bf: 100, tw: 4.2, tf: 5.5 },
    "HE 100 A": { d: 96, bf: 100, tw: 5.0, tf: 8.0 },
    "HE 100 B": { d: 100, bf: 100, tw: 6.0, tf: 10.0 },
    "HE 100 M": { d: 120, bf: 106, tw: 12.0, tf: 20.0 },

    "HE 120 AA": { d: 109, bf: 120, tw: 4.2, tf: 5.5 },
    "HE 120 A": { d: 114, bf: 120, tw: 5.0, tf: 8.0 },
    "HE 120 B": { d: 120, bf: 120, tw: 6.5, tf: 11.0 },
    "HE 120 M": { d: 140, bf: 126, tw: 12.5, tf: 21.0 },

    "HE 140 AA": { d: 128, bf: 140, tw: 4.3, tf: 6.0 },
    "HE 140 A": { d: 133, bf: 140, tw: 5.5, tf: 8.5 },
    "HE 140 B": { d: 140, bf: 140, tw: 7.0, tf: 12.0 },
    "HE 140 M": { d: 160, bf: 146, tw: 13.0, tf: 22.0 },

    "HE 160 AA": { d: 148, bf: 160, tw: 4.5, tf: 7.0 },
    "HE 160 A": { d: 152, bf: 160, tw: 6.0, tf: 9.0 },
    "HE 160 B": { d: 160, bf: 160, tw: 8.0, tf: 13.0 },
    "HE 160 M": { d: 180, bf: 166, tw: 14.0, tf: 23.0 },

    "HE 180 AA": { d: 167, bf: 180, tw: 5.0, tf: 7.5 },
    "HE 180 A": { d: 171, bf: 180, tw: 6.0, tf: 9.5 },
    "HE 180 B": { d: 180, bf: 180, tw: 8.5, tf: 14.0 },
    "HE 180 M": { d: 200, bf: 186, tw: 14.5, tf: 24.0 },

    "HE 200 AA": { d: 186, bf: 200, tw: 5.5, tf: 8.0 },
    "HE 200 A": { d: 190, bf: 200, tw: 6.5, tf: 10.0 },
    "HE 200 B": { d: 200, bf: 200, tw: 9.0, tf: 15.0 },
    "HE 200 M": { d: 220, bf: 206, tw: 15.0, tf: 25.0 },

    "HE 220 AA": { d: 205, bf: 220, tw: 6.0, tf: 8.5 },
    "HE 220 A": { d: 210, bf: 220, tw: 7.0, tf: 11.0 },
    "HE 220 B": { d: 220, bf: 220, tw: 9.5, tf: 16.0 },
    "HE 220 M": { d: 240, bf: 226, tw: 15.5, tf: 26.0 },

    "HE 240 AA": { d: 224, bf: 240, tw: 6.5, tf: 9.0 },
    "HE 240 A": { d: 230, bf: 240, tw: 7.5, tf: 12.0 },
    "HE 240 B": { d: 240, bf: 240, tw: 10.0, tf: 17.0 },
    "HE 240 M": { d: 270, bf: 248, tw: 18.0, tf: 32.0 },

    "HE 260 AA": { d: 244, bf: 260, tw: 6.5, tf: 9.5 },
    "HE 260 A": { d: 250, bf: 260, tw: 7.5, tf: 12.5 },
    "HE 260 B": { d: 260, bf: 260, tw: 10.0, tf: 17.5 },
    "HE 260 M": { d: 290, bf: 268, tw: 18.0, tf: 32.5 },

    "HE 280 AA": { d: 264, bf: 280, tw: 7.0, tf: 10.0 },
    "HE 280 A": { d: 270, bf: 280, tw: 8.0, tf: 13.0 },
    "HE 280 B": { d: 280, bf: 280, tw: 10.5, tf: 18.0 },
    "HE 280 M": { d: 310, bf: 288, tw: 18.5, tf: 33.0 },

    "HE 300 AA": { d: 283, bf: 300, tw: 7.5, tf: 10.5 },
    "HE 300 A": { d: 290, bf: 300, tw: 8.5, tf: 14.0 },
    "HE 300 B": { d: 300, bf: 300, tw: 11.0, tf: 19.0 },
    "HE 300 M": { d: 340, bf: 310, tw: 21.0, tf: 39.0 },

    "HE 320 AA": { d: 301, bf: 300, tw: 8.0, tf: 11.0 },
    "HE 320 A": { d: 310, bf: 300, tw: 9.0, tf: 15.5 },
    "HE 320 B": { d: 320, bf: 300, tw: 11.5, tf: 20.5 },
    "HE 320 M": { d: 359, bf: 309, tw: 21.0, tf: 40.0 },

    "HE 340 AA": { d: 320, bf: 300, tw: 8.5, tf: 11.5 },
    "HE 340 A": { d: 330, bf: 300, tw: 9.5, tf: 16.5 },
    "HE 340 B": { d: 340, bf: 300, tw: 12.0, tf: 21.5 },
    "HE 340 M": { d: 377, bf: 309, tw: 21.0, tf: 40.0 },

    "HE 360 AA": { d: 339, bf: 300, tw: 9.0, tf: 12.0 },
    "HE 360 A": { d: 350, bf: 300, tw: 10.0, tf: 17.5 },
    "HE 360 B": { d: 360, bf: 300, tw: 12.5, tf: 22.5 },
    "HE 360 M": { d: 395, bf: 308, tw: 21.0, tf: 40.0 },

    "HE 400 AA": { d: 378, bf: 300, tw: 9.5, tf: 13.0 },
    "HE 400 A": { d: 390, bf: 300, tw: 11.0, tf: 19.0 },
    "HE 400 B": { d: 400, bf: 300, tw: 13.5, tf: 24.0 },
    "HE 400 M": { d: 432, bf: 307, tw: 21.0, tf: 40.0 },

    "HE 450 AA": { d: 425, bf: 300, tw: 10.0, tf: 13.5 },
    "HE 450 A": { d: 440, bf: 300, tw: 11.5, tf: 21.0 },
    "HE 450 B": { d: 450, bf: 300, tw: 14.0, tf: 26.0 },
    "HE 450 M": { d: 478, bf: 307, tw: 21.0, tf: 40.0 },

    "HE 500 AA": { d: 472, bf: 300, tw: 10.5, tf: 14.0 },
    "HE 500 A": { d: 490, bf: 300, tw: 12.0, tf: 23.0 },
    "HE 500 B": { d: 500, bf: 300, tw: 14.5, tf: 28.0 },
    "HE 500 M": { d: 524, bf: 306, tw: 21.0, tf: 40.0 },

    "HE 550 AA": { d: 522, bf: 300, tw: 11.5, tf: 15.0 },
    "HE 550 A": { d: 540, bf: 300, tw: 12.5, tf: 24.0 },
    "HE 550 B": { d: 550, bf: 300, tw: 15.0, tf: 29.0 },
    "HE 550 M": { d: 572, bf: 306, tw: 21.0, tf: 40.0 },

    "HE 600 AA": { d: 571, bf: 300, tw: 12.0, tf: 15.5 },
    "HE 600 A": { d: 590, bf: 300, tw: 13.0, tf: 25.0 },
    "HE 600 B": { d: 600, bf: 300, tw: 15.5, tf: 30.0 },
    "HE 600 M": { d: 620, bf: 305, tw: 21.0, tf: 40.0 },
    "HE 600 x 337": { d: 632, bf: 310, tw: 25.5, tf: 46.0 },
    "HE 600 x 399": { d: 648, bf: 315, tw: 30.0, tf: 54.0 },

    "HE 650 AA": { d: 620, bf: 300, tw: 12.5, tf: 16.0 },
    "HE 650 A": { d: 640, bf: 300, tw: 13.5, tf: 26.0 },
    "HE 650 B": { d: 650, bf: 300, tw: 16.0, tf: 31.0 },
    "HE 650 M": { d: 668, bf: 305, tw: 21.0, tf: 40.0 },

    "HE 650 x 343": { d: 680, bf: 309, tw: 25.0, tf: 46.0 },
    "HE 650 x 407": { d: 696, bf: 314, tw: 29.5, tf: 54.0 },

    "HE 700 AA": { d: 670, bf: 300, tw: 13.0, tf: 17.0 },
    "HE 700 A": { d: 690, bf: 300, tw: 14.5, tf: 27.0 },
    "HE 700 B": { d: 700, bf: 300, tw: 17.0, tf: 32.0 },
    "HE 700 M": { d: 716, bf: 304, tw: 21.0, tf: 40.0 },

    "HE 700 x 352": { d: 728, bf: 308, tw: 25.0, tf: 46.0 },
    "HE 700 x 418": { d: 744, bf: 313, tw: 29.5, tf: 54.0 },

    "HE 800 AA": { d: 770, bf: 300, tw: 14.0, tf: 18.0 },
    "HE 800 A": { d: 790, bf: 300, tw: 15.0, tf: 28.0 },
    "HE 800 B": { d: 800, bf: 300, tw: 17.5, tf: 33.0 },
    "HE 800 M": { d: 814, bf: 303, tw: 21.0, tf: 40.0 },

    "HE 800 x 373": { d: 826, bf: 308, tw: 25.0, tf: 46.0 },
    "HE 800 x 444": { d: 842, bf: 313, tw: 30.0, tf: 54.0 },

    "HE 900 AA": { d: 870, bf: 300, tw: 15.0, tf: 20.0 },
    "HE 900 A": { d: 890, bf: 300, tw: 16.0, tf: 30.0 },
    "HE 900 B": { d: 900, bf: 300, tw: 18.5, tf: 35.0 },
    "HE 900 M": { d: 910, bf: 302, tw: 21.0, tf: 40.0 },

    "HE 900 x 391": { d: 922, bf: 307, tw: 25.0, tf: 46.0 },
    "HE 900 x 466": { d: 938, bf: 312, tw: 30.0, tf: 54.0 },

    "HE 1000 AA": { d: 970, bf: 300, tw: 16.0, tf: 21.0 },
    "HE 1000 A": { d: 990, bf: 300, tw: 16.5, tf: 31.0 },
    "HE 1000 B": { d: 1000, bf: 300, tw: 19.0, tf: 36.0 },
    "HE 1000 M": { d: 1008, bf: 302, tw: 21.0, tf: 40.0 },

    "HE 1000 x 393": { d: 1016, bf: 303, tw: 24.4, tf: 43.9 },
    "HE 1000 x 409": { d: 1020, bf: 306, tw: 25.0, tf: 46.0 },
    "HE 1000 x 488": { d: 1036, bf: 311, tw: 30.0, tf: 54.0 },
    "HE 1000 x 579": { d: 1056, bf: 316, tw: 35.0, tf: 64.0 },

    "HL 920 x 342": { d: 912, bf: 418, tw: 19.3, tf: 32.0 },
    "HL 920 x 365": { d: 916, bf: 419, tw: 20.3, tf: 34.3 },
    "HL 920 x 387": { d: 921, bf: 420, tw: 21.3, tf: 36.6 },
    "HL 920 x 417": { d: 928, bf: 422, tw: 22.5, tf: 39.9 },
    "HL 920 x 446": { d: 933, bf: 423, tw: 24.0, tf: 42.7 },
    "HL 920 x 488": { d: 942, bf: 422, tw: 25.9, tf: 47.0 },
    "HL 920 x 534": { d: 950, bf: 425, tw: 28.4, tf: 51.1 },
    "HL 920 x 585": { d: 960, bf: 427, tw: 31.0, tf: 55.9 },
    "HL 920 x 653": { d: 972, bf: 431, tw: 34.5, tf: 62.0 },
    "HL 920 x 784": { d: 996, bf: 437, tw: 40.9, tf: 73.9 },
    "HL 920 x 967": { d: 1028, bf: 446, tw: 50.0, tf: 89.9 },
    "HL 1000 x 296": { d: 982, bf: 400, tw: 16.5, tf: 27.0 },
    "HL 1000 A": { d: 990, bf: 400, tw: 16.5, tf: 31.0 },
    "HL 1000 B": { d: 1000, bf: 400, tw: 19.0, tf: 36.0 },
    "HL 1000 M": { d: 1008, bf: 402, tw: 21.0, tf: 40.0 },
    "HL 1000 x 477": { d: 1018, bf: 404, tw: 25.5, tf: 45.0 },
    "HL 1000 x 554": { d: 1032, bf: 408, tw: 29.5, tf: 52.0 },
    "HL 1000 x 642": { d: 1048, bf: 412, tw: 34.0, tf: 60.0 },
    "HL 1000 x 748": { d: 1068, bf: 417, tw: 39.0, tf: 70.0 },
    "HL 1000 x 883": { d: 1092, bf: 424, tw: 45.5, tf: 82.0 },
    "HL 1100 A": { d: 1090, bf: 400, tw: 18.0, tf: 31.0 },
    "HL 1100 B": { d: 1100, bf: 400, tw: 20.0, tf: 36.0 },
    "HL 1100 M": { d: 1108, bf: 402, tw: 22.0, tf: 40.0 },
    "HL 1100 R": { d: 1118, bf: 405, tw: 26.0, tf: 45.0 },

    "IPE A 100": { d: 98, bf: 55, tw: 3.6, tf: 4.7 },
    "IPE 100": { d: 100, bf: 55, tw: 4.1, tf: 5.7 },

    "IPE A 120": { d: 117.6, bf: 64, tw: 3.8, tf: 5.1 },
    "IPE 120": { d: 120, bf: 64, tw: 4.4, tf: 6.3 },

    "IPE A 140": { d: 137.4, bf: 73, tw: 3.8, tf: 5.6 },
    "IPE 140": { d: 140, bf: 73, tw: 4.7, tf: 6.9 },

    "IPE A 160": { d: 157, bf: 82, tw: 4.0, tf: 5.9 },
    "IPE 160": { d: 160, bf: 82, tw: 5.0, tf: 7.4 },

    "IPE A 180": { d: 177, bf: 91, tw: 4.3, tf: 6.5 },
    "IPE 180": { d: 180, bf: 91, tw: 5.3, tf: 8.0 },
    "IPE O 180": { d: 182, bf: 92, tw: 6.0, tf: 9.0 },

    "IPE A 200": { d: 197, bf: 100, tw: 4.5, tf: 7.0 },
    "IPE 200": { d: 200, bf: 100, tw: 5.6, tf: 8.5 },
    "IPE O 200": { d: 202, bf: 102, tw: 6.2, tf: 9.5 },

    "IPE A 220": { d: 217, bf: 110, tw: 5.0, tf: 7.7 },
    "IPE 220": { d: 220, bf: 110, tw: 5.9, tf: 9.2 },
    "IPE O 220": { d: 222, bf: 112, tw: 6.6, tf: 10.2 },

    "IPE A 240": { d: 237, bf: 120, tw: 5.2, tf: 8.3 },
    "IPE 240": { d: 240, bf: 120, tw: 6.2, tf: 9.8 },
    "IPE O 240": { d: 242, bf: 122, tw: 7.0, tf: 10.8 },

    "IPE A 270": { d: 267, bf: 135, tw: 5.5, tf: 8.7 },
    "IPE 270": { d: 270, bf: 135, tw: 6.6, tf: 10.2 },
    "IPE O 270": { d: 274, bf: 136, tw: 7.5, tf: 12.2 },

    "IPE A 300": { d: 297, bf: 150, tw: 6.1, tf: 9.2 },
    "IPE 300": { d: 300, bf: 150, tw: 7.1, tf: 10.7 },
    "IPE O 300": { d: 304, bf: 152, tw: 8.0, tf: 12.7 },

    "IPE A 330": { d: 327, bf: 160, tw: 6.5, tf: 10.0 },
    "IPE 330": { d: 330, bf: 160, tw: 7.5, tf: 11.5 },
    "IPE O 330": { d: 334, bf: 162, tw: 8.5, tf: 13.5 },

    "IPE A 360": { d: 357.6, bf: 170, tw: 6.6, tf: 11.5 },
    "IPE 360": { d: 360, bf: 170, tw: 8.0, tf: 12.7 },
    "IPE O 360": { d: 364, bf: 172, tw: 9.2, tf: 14.7 },

    "IPE A 400": { d: 397, bf: 180, tw: 7.0, tf: 12.0 },
    "IPE 400": { d: 400, bf: 180, tw: 8.6, tf: 13.5 },
    "IPE O 400": { d: 404, bf: 182, tw: 9.7, tf: 15.5 },

    "IPE A 450": { d: 447, bf: 190, tw: 7.6, tf: 13.1 },
    "IPE 450": { d: 450, bf: 190, tw: 9.4, tf: 14.6 },
    "IPE O 450": { d: 456, bf: 192, tw: 11.0, tf: 17.6 },

    "IPE A 500": { d: 497, bf: 200, tw: 8.4, tf: 14.5 },
    "IPE 500": { d: 500, bf: 200, tw: 10.2, tf: 16.0 },
    "IPE O 500": { d: 506, bf: 202, tw: 12.0, tf: 19.0 },

    "IPE A 550": { d: 547, bf: 210, tw: 9.0, tf: 15.7 },
    "IPE 550": { d: 550, bf: 210, tw: 11.1, tf: 17.2 },
    "IPE O 550": { d: 556, bf: 212, tw: 12.7, tf: 20.2 },

    "IPE A 600": { d: 597, bf: 220, tw: 9.8, tf: 17.5 },
    "IPE 600": { d: 600, bf: 220, tw: 12.0, tf: 19.0 },
    "IPE O 600": { d: 610, bf: 224, tw: 15.0, tf: 24.0 },

    "IPE 750 x 147": { d: 753, bf: 265, tw: 13.2, tf: 17.0 },
    "IPE 750 x 173": { d: 762, bf: 267, tw: 14.4, tf: 21.6 },
    "IPE 750 x 196": { d: 770, bf: 268, tw: 15.6, tf: 25.4 },

    "IPN 120": { d: 120, bf: 58, tw: 5.1, tf: 7.7 },
    "IPN 140": { d: 140, bf: 66, tw: 5.7, tf: 8.6 },
    "IPN 160": { d: 160, bf: 74, tw: 6.3, tf: 9.5 },
    "IPN 180": { d: 180, bf: 82, tw: 6.9, tf: 10.4 },
    "IPN 200": { d: 200, bf: 90, tw: 7.5, tf: 11.3 },
    "IPN 220": { d: 220, bf: 98, tw: 8.1, tf: 12.2 },
    "IPN 240": { d: 240, bf: 106, tw: 8.7, tf: 13.1 },
    "IPN 260": { d: 260, bf: 113, tw: 9.4, tf: 14.1 },
    "IPN 280": { d: 280, bf: 119, tw: 10.1, tf: 15.2 },
    "IPN 300": { d: 300, bf: 125, tw: 10.8, tf: 16.2 },
    "IPN 320": { d: 320, bf: 131, tw: 11.5, tf: 17.3 },
    "IPN 340": { d: 340, bf: 137, tw: 12.2, tf: 18.3 },
    "IPN 360": { d: 360, bf: 143, tw: 13.0, tf: 19.5 },
    "IPN 380": { d: 380, bf: 149, tw: 13.7, tf: 20.5 },
    "IPN 400": { d: 400, bf: 155, tw: 14.4, tf: 21.6 },
    "IPN 450": { d: 450, bf: 170, tw: 16.2, tf: 24.3 },
    "IPN 500": { d: 500, bf: 185, tw: 18.0, tf: 27.0 },
    "IPN 550": { d: 550, bf: 200, tw: 19.0, tf: 30.0 }
  };

  const taliProfilVerileri = {
    "UPN 100": { tw: 6.0 },
    "UPN 120": { tw: 7.0 },
    "UPN 140": { tw: 7.0 },
    "UPN 160": { tw: 7.5 },
    "UPN 180": { tw: 8.0 },
    "UPN 200": { tw: 8.5 },
    "UPN 220": { tw: 9.0 },
    "UPN 240": { tw: 9.5 },
    "UPN 260": { tw: 10.0 },
    "UPN 280": { tw: 10.0 },
    "UPN 300": { tw: 10.0 },
    "UPN 320": { tw: 14.0 },
    "UPN 350": { tw: 14.0 },
    "UPN 380": { tw: 13.5 },
    "UPN 400": { tw: 14.0 }
  };

  const malzemeListesi = {
    "S235": { Fy: 235, Fu: 360, Fy2: 215, Fu2: 360 },
    "S275": { Fy: 275, Fu: 430, Fy2: 255, Fu2: 410 },
    "S355": { Fy: 355, Fu: 510, Fy2: 335, Fu2: 470 },
    "S450": { Fy: 450, Fu: 570, Fy2: 410, Fu2: 550 }
  };

  const bulonList = [
    { text: "M10", db: 10 }, { text: "M12", db: 12 }, { text: "M16", db: 16 },
    { text: "M20", db: 20 }, { text: "M24", db: 24 }, { text: "M27", db: 27 },
    { text: "M30", db: 30 }, { text: "M33", db: 33 }, { text: "M36", db: 36 }
  ];

  // Bulon sınıfı – kesme hesabı için Fub_MPa buradan alınır
  const BULON_SINIFLARI = [
    { bulonSınıfı: "4.6", Fyb_MPa: 240, Fub_MPa: 400 },
    { bulonSınıfı: "4.8", Fyb_MPa: 320, Fub_MPa: 400 },
    { bulonSınıfı: "5.6", Fyb_MPa: 300, Fub_MPa: 500 },
    { bulonSınıfı: "5.8", Fyb_MPa: 400, Fub_MPa: 500 },
    { bulonSınıfı: "6.8", Fyb_MPa: 480, Fub_MPa: 600 },
    { bulonSınıfı: "8.8", Fyb_MPa: 640, Fub_MPa: 800 },
    { bulonSınıfı: "10.9", Fyb_MPa: 900, Fub_MPa: 1000 }
  ];

  // --- Select doldurma ------------------------------------------------------
  function populateSelect(id, items) {
    const sel = document.getElementById(id);
    sel.innerHTML = '<option value="">Seçiniz...</option>';
    items.forEach(item => {
      const opt = document.createElement('option');
      opt.value = item;
      opt.textContent = item;
      sel.appendChild(opt);
      if (id === "anaProfil" && item === "HE 180 A") opt.selected = true;
      if (id === "taliProfil" && item === "UPN 200") opt.selected = true;
      if (id === "anaMalzeme" && item === "S355") opt.selected = true;
      if (id === "taliMalzeme" && item === "S355") opt.selected = true;
      if (id === "kosebentMalzeme" && item === "S235") opt.selected = true;
    });
  }

  populateSelect("anaProfil", Object.keys(HE_GEOMETRY));
  populateSelect("taliProfil", Object.keys(taliProfilVerileri));
  populateSelect("anaMalzeme", Object.keys(malzemeListesi));
  populateSelect("taliMalzeme", Object.keys(malzemeListesi));
  populateSelect("kosebentMalzeme", Object.keys(malzemeListesi));

  const boltSelect = document.getElementById('boltSelect');
  bulonList.forEach(b => {
    const opt = document.createElement('option');
    opt.value = b.db;
    opt.textContent = b.text;
    if (b.db === 20) opt.selected = true;
    boltSelect.appendChild(opt);
  });

  // Bulon sınıfı select doldurma (varsayılan 6.8)
  const boltClassSel = document.getElementById("boltClass");
  if (boltClassSel && !boltClassSel.options.length) {
    BULON_SINIFLARI.forEach(b => {
      const opt = document.createElement("option");
      opt.value = b.bulonSınıfı;
      opt.textContent = b.bulonSınıfı;
      if (b.bulonSınıfı === "6.8") opt.selected = true;
      boltClassSel.appendChild(opt);
    });
  }

  // Köşebent et kalınlığı değişirse t'ye yansıt
  document.getElementById('kosebent_t').addEventListener('change', e => {
    const t = parseFloat(e.target.value);
    if (t) document.getElementById('t').value = t;
  });



  //Tabloyu dolduran helper fonksiyonlar ve limit durumları için özet tutan yapı
  // Limit durum isimleri
  const LIMIT_LABELS = {
    bearing: "Bulon deliği ezilme",
    boltShear: "Bulon kesme kuvveti",
    weld: "Kaynak dayanımı"
  };

  // Özet değerlerini tutacağımız obje
  const LIMIT_SUMMARY = {};

  // Her limit durumu hesabından sonra çağır:
  function setSummary(key, value_kN) {
    if (!isFinite(value_kN)) return;
    LIMIT_SUMMARY[key] = Number(value_kN);
  }

  // Tabloyu güncelle
  function renderSummaryTable() {
    const tbody = $("summaryBody");
    const vuSpan = $("summaryVu");
    if (!tbody) return;

    tbody.innerHTML = "";

    const vu = getVu();
    const rows = [];

    Object.keys(LIMIT_LABELS).forEach((key) => {
      const val = LIMIT_SUMMARY[key];
      if (!Number.isFinite(val)) return;
      rows.push({ key, label: LIMIT_LABELS[key], val });
    });

    if (!rows.length) {
      tbody.innerHTML = `
      <tr>
        <td colspan="2" style="text-align:center;color:var(--muted);">
          Henüz hesaplama yapılmadı.
        </td>
      </tr>
    `;
      if (vuSpan) vuSpan.textContent = Number.isFinite(vu) ? `${vu.toFixed(2)} kN` : "-";
      return;
    }

    rows.forEach((row) => {
      const tr = document.createElement("tr");
      const isOk = Number.isFinite(vu) ? vu <= row.val : false;
      if (Number.isFinite(vu)) {
        tr.classList.add(isOk ? "ok" : "fail");
      }

      const td1 = document.createElement("td");
      td1.textContent = row.label;

      const td2 = document.createElement("td");
      td2.innerHTML = `
      ${row.val.toFixed(2)} kN
      <span style="margin-left:8px;font-weight:600;">
        (${adequacyText(row.val)})
      </span>
    `;

      tr.appendChild(td1);
      tr.appendChild(td2);
      tbody.appendChild(tr);
    });

    if (vuSpan) {
      vuSpan.textContent = Number.isFinite(vu) ? `${vu.toFixed(2)} kN` : "-";
    }
  }

  // --- Yardımcı fonksiyonlar ------------------------------------------------
  function $(id) {
    return document.getElementById(id);
  }

  function num(v, defaultVal = NaN) {
    const n = Number(String(v).replace(",", "."));
    return Number.isFinite(n) ? n : defaultVal;
  }
  function getVu() {
    return num($("vu")?.value, NaN);
  }

  function fmt(v, digits = 2) {
    const n = Number(v);
    if (!Number.isFinite(n)) return "-";
    return n.toFixed(digits);
  }

  function adequacyText(Rd) {
    const vu = getVu();
    if (!Number.isFinite(vu) || !Number.isFinite(Rd)) return "";
    return vu <= Rd ? "Yeterli" : "Yetersiz";
  }

  function getVu() {
    return num($("vu")?.value, NaN);
  }

  function adequacyText(Rd) {
    const vu = getVu();
    if (!Number.isFinite(vu) || !Number.isFinite(Rd)) return "";
    return vu <= Rd ? "Yeterli" : "Yetersiz";
  }

  function adequacyClass(Rd) {
    const vu = getVu();
    if (!Number.isFinite(vu) || !Number.isFinite(Rd)) return "";
    return vu <= Rd ? "pdf-status-ok" : "pdf-status-fail";
  }


  function pickFyFromMaterial(selectId, thk) {
    const sel = document.getElementById(selectId);
    const key = sel ? sel.value : null;
    if (!key || !malzemeListesi[key]) return NaN;

    const rec = malzemeListesi[key];
    let Fy = (thk > 40 && rec.Fy2) ? rec.Fy2 : rec.Fy;
    Fy = Number(Fy) || Number(rec.Fy) || Number(rec.Fy2);
    return Fy;
  }

  function pickFuFromMaterial(selectId, thk) {
    const sel = document.getElementById(selectId);
    const key = sel ? sel.value : null;
    if (!key || !malzemeListesi[key]) return NaN;

    const rec = malzemeListesi[key];
    let Fu = (thk > 40 && rec.Fu2) ? rec.Fu2 : rec.Fu;
    Fu = Number(Fu) || Number(rec.Fu) || Number(rec.Fu2);
    return Fu;
  }


  // --- Hesaplama -------------------------------------------------------------
  function calculate() {
    const anaProfil = document.getElementById("anaProfil").value;
    const taliProfil = document.getElementById("taliProfil").value;
    const anaMalzeme = document.getElementById("anaMalzeme").value;
    const taliMalzeme = document.getElementById("taliMalzeme").value;
    const kosebentMalzeme = document.getElementById("kosebentMalzeme").value;


    const phi = parseFloat(document.getElementById("phi").value);
    const Ubs = parseFloat(document.getElementById("Ubs").value);

    const k1 = parseFloat(document.getElementById("kosebent_1").value) || 90;
    const k2 = parseFloat(document.getElementById("kosebent_2").value) || 90;
    const kt = parseFloat(document.getElementById("kosebent_t").value) || 10;

    const db = Number(document.getElementById("boltSelect")?.value);

    const bolt = bulonList.find(b => b.db === db);
    if (!bolt) {
      alert("Bulon seçimi hatalı");
      return;
    }


    const weld_a = parseFloat(document.getElementById("weld_a").value) || 4;
    const weld_FE = parseFloat(document.getElementById("weld_FE").value) || 550;
    const weld_count = parseFloat(document.getElementById("weld_count").value) || 2;

    const shearWidths = (document.getElementById("shearWidths").value || "")
      .split(",")
      .map(x => parseFloat(x.trim()))
      .filter(v => Number.isFinite(v) && v > 0);

    const shearHoleCount = parseFloat(document.getElementById("shearHoleCount").value) || 2;



    // --- Bulon Deliği Ezilme Kuvveti Dayanımı (13.3.13) ------------------------
    (function bearingCalc46() {
      const varsEl = document.getElementById("vars2");
      const stepsEl = document.getElementById("calcSteps2");
      const resultEl = document.getElementById("results2");
      if (!varsEl || !stepsEl || !resultEl) return;

      const num = (v) => Number(String(v).replace(",", "."));

      const shearTxt = document.getElementById("shearWidths")?.value || "";
      const parts = shearTxt
        .split(",")
        .map(s => num(s.trim()))
        .filter(v => Number.isFinite(v) && v > 0);

      const e = parts.length > 0 ? parts[0] : 40;
      const t = kt || num(document.getElementById("kosebent_t")?.value) || 10;

      const dh = db + 2;

      const Fu = pickFuFromMaterial("kosebentMalzeme", t) || 360;

      const lc = e - dh / 2;

      const R1 = 1.2 * lc * t * Fu;
      const R2 = 2.4 * db * t * Fu;
      const Rn_single = Math.min(R1, R2) * 1e-3; // kN

      const boltCount = 2;
      const Rn_total = Rn_single * boltCount;
      const Rd = phi * Rn_total;

      varsEl.innerHTML = String.raw`
$$
d_b = ${db}\,\text{mm},\quad
d_h = d_b + 2 = ${dh}\,\text{mm} \\
e = ${e}\,\text{mm},\quad
t = ${t}\,\text{mm},\quad
F_u = ${Fu}\,\text{MPa},\quad
\varphi = ${phi}
$$
`;

      stepsEl.innerHTML = String.raw`
$$
l_c = e - \frac{d_h}{2}
= ${e} - \frac{${dh}}{2}
= ${lc.toFixed(2)}\,\text{mm}
$$

$$
R_n = \min(1.2\,l_c\,t\,F_u,\; 2.4\,d_b\,t\,F_u)
$$

$$
= \min(
${(1.2 * lc * t * Fu * 1e-3).toFixed(2)},\;
${(2.4 * db * t * Fu * 1e-3).toFixed(2)}
)
= ${Rn_single.toFixed(2)}\,\text{kN}
$$
`;

      resultEl.innerHTML = String.raw`
$$
R_d = \varphi R_n \times 2
= ${phi}\times ${Rn_single.toFixed(2)} \times 2
= \mathbf{${Rd.toFixed(2)}\,\text{kN}}
$$
`;

      if (typeof setSummary === "function") {
        setSummary("bearing", Rd);
      }
    })();

    // 13.3.9 — Bulonların Kesme Kuvveti Dayanımı
    (function boltShear46() {
      const varsEl = document.getElementById("vars3");
      const stepsEl = document.getElementById("calcSteps3");
      const resultEl = document.getElementById("results3");
      if (!varsEl || !stepsEl || !resultEl) return;

      const num = (v) => Number(String(v).replace(",", "."));

      // --- Input ---
      const phi = num(document.getElementById("phi")?.value) || 0.75;

      const boltCount =
        num(document.getElementById("boltCount")?.value) || 2;

      // --- Sabit ---
      const Fnv = 270; // MPa (görsele göre sabit)

      // --- Alan ---
      const Ab = Math.PI * Math.pow(db, 2) / 4;

      // --- TEK bulon kapasitesi ---
      const n = 1; // tek kesme düzlemi

      const Rn_single = n * Fnv * Ab * 1e-3; // kN

      // --- TOPLAM ---
      const Rd = phi * Rn_single * boltCount;

      // =========================
      // KaTeX
      // =========================

      varsEl.innerHTML = String.raw`
$$
d_b = ${db}\,\text{mm},\quad
A_b = \frac{\pi d_b^2}{4}
= ${Ab.toFixed(2)}\,\text{mm}^2 \\
F_{nv} = ${Fnv}\,\text{MPa},\quad
n = ${n},\quad
\varphi = ${phi}
$$
`;

      stepsEl.innerHTML = String.raw`
$$
R_n = n\,F_{nv}\,A_b
= ${n}\times ${Fnv}\times ${Ab.toFixed(2)}\times 10^{-3}
= ${Rn_single.toFixed(2)}\ \text{kN}
$$
`;

      resultEl.innerHTML = String.raw`
$$
R_d = \varphi R_n \times ${boltCount}
= ${phi}\times ${Rn_single.toFixed(2)} \times ${boltCount}
= \mathbf{${Rd.toFixed(2)}\ \text{kN}}
$$
`;

      if (typeof setSummary === "function") {
        setSummary("boltShear", Rd);
      }
    })();


    // 2.4.6 — Kaynak Dayanımı (13.2.4) - Birleşim 2, çift köşebent
    (function weld46() {
      const varsEl = document.getElementById("vars8");
      const stepsEl = document.getElementById("calcSteps8");
      const resultEl = document.getElementById("results8");
      if (!varsEl || !stepsEl || !resultEl) return;

      const num = (v) => Number(String(v).replace(",", "."));

      // --- Inputlar (mevcut description.html ile uyumlu) ---
      const phi = num(document.getElementById("phi")?.value) || 0.75;
      const a = num(document.getElementById("weld_a")?.value) || 4;
      const Fe = num(document.getElementById("weld_FE")?.value) || 550;
      const weldCount = num(document.getElementById("weld_count")?.value) || 2;

      // Köşebent kol boyu
      const k = num(document.getElementById("kosebent_1")?.value) || 90;

      // --- Modül 46 için iç hesap ---
      // Kitap örneğiyle uyumlu etkin boy: 81 mm / dikiş (90x90x10 ve a=4 için)
      // Genel ifade olarak:
      const leSingle = k - 2 * a - 1;   // mm
      const leTotal = weldCount * leSingle;
      const Awe = a * leTotal;          // mm²

      const Fnw = 0.60 * Fe;            // MPa
      const Rnw = Fnw * Awe * 1e-3;     // kN
      const Rd = phi * Rnw;             // kN

      varsEl.innerHTML = String.raw`
$$
a = ${a}\,\text{mm},\quad
k = ${k}\,\text{mm},\quad
n_{\text{dikiş}} = ${weldCount} \\
F_E = ${Fe}\,\text{MPa},\quad
F_{nw} = 0.60F_E = ${Fnw.toFixed(0)}\,\text{MPa},\quad
\varphi = ${phi}
$$
`;

      stepsEl.innerHTML = String.raw`
$$
l_{e,\text{tek}} = k - 2a - 1
= ${k} - 2\times ${a} - 1
= ${leSingle.toFixed(2)}\,\text{mm}
$$

$$
l_e = n_{\text{dikiş}} \, l_{e,\text{tek}}
= ${weldCount}\times ${leSingle.toFixed(2)}
= ${leTotal.toFixed(2)}\,\text{mm}
$$

$$
A_{we} = a\,l_e
= ${a}\times ${leTotal.toFixed(2)}
= ${Awe.toFixed(2)}\,\text{mm}^2
$$

$$
R_{nw} = F_{nw}A_{we}
= ${Fnw.toFixed(0)} \times ${Awe.toFixed(2)} \times 10^{-3}
= ${Rnw.toFixed(2)}\ \text{kN}
$$
`;

      resultEl.innerHTML = String.raw`
$$
R_d = \varphi R_{nw}
= ${phi} \times ${Rnw.toFixed(2)}
= \mathbf{${Rd.toFixed(2)}\ \text{kN}}
$$
`;

      if (typeof setSummary === "function") {
        setSummary("weld", Rd);
      }
    })();


    // KaTeX render
    if (window.renderMathInElement) renderMathInElement(document.body);
    // Özet tabloyu güncelle
    renderSummaryTable();
  }

  function fillReportInputs() {
    const tbody = $("reportInputsTable")?.querySelector("tbody");
    if (!tbody) return;

    const rows = [
      ["Gerekli Kesme Kuvveti (Vu)", `${fmt(getVu())} kN`],
      ["Ana Kiriş", $("anaProfil")?.value || "-"],
      ["Ana Kiriş Malzemesi", $("anaMalzeme")?.value || "-"],
      ["Aşık", $("taliProfil")?.value || "-"],
      ["Aşık Malzemesi", $("taliMalzeme")?.value || "-"],
      ["Köşebent", `L${$("kosebent_1")?.value || "-"}x${$("kosebent_2")?.value || "-"}x${$("kosebent_t")?.value || "-"}`],
      ["Köşebent Malzemesi", $("kosebentMalzeme")?.value || "-"],
      ["Bulon", $("boltSelect")?.selectedOptions?.[0]?.textContent || "-"],
      ["Bulon Sınıfı", $("boltClass")?.value || "-"],
      ["Kaynak Kalınlığı", `${$("weld_a")?.value || "-"} mm`],
      ["Elektrod Mukavemeti", `${$("weld_FE")?.value || "-"} MPa`],
      ["Dikiş Sayısı", $("weld_count")?.value || "-"],
      ["Kesme Yolu Girdisi", $("shearWidths")?.value || "-"]
    ];

    tbody.innerHTML = rows.map(
      ([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`
    ).join("");
  }

  function copyMathBlocksToReport() {
    const map = [
      ["vars2", "reportVars2"],
      ["calcSteps2", "reportSteps2"],
      ["results2", "reportResults2"],
      ["vars3", "reportVars3"],
      ["calcSteps3", "reportSteps3"],
      ["results3", "reportResults3"],
      ["vars8", "reportVars8"],
      ["calcSteps8", "reportSteps8"],
      ["results8", "reportResults8"]
    ];

    map.forEach(([srcId, targetId]) => {
      const src = $(srcId);
      const target = $(targetId);
      if (src && target) {
        target.innerHTML = src.innerHTML;
      }
    });

    console.log("reportVars2:", $("reportVars2")?.innerHTML);
    console.log("reportSteps2:", $("reportSteps2")?.innerHTML);
    console.log("reportResults2:", $("reportResults2")?.innerHTML);
  }

  function fillReportSummary() {
    const tbody = $("reportSummaryTable")?.querySelector("tbody");
    if (!tbody) return;

    const vu = getVu();
    const rows = [];

    Object.keys(LIMIT_LABELS).forEach((key) => {
      const val = LIMIT_SUMMARY[key];
      if (!Number.isFinite(val)) return;
      rows.push({ key, label: LIMIT_LABELS[key], val });
    });

    tbody.innerHTML = "";

    rows.forEach((row) => {
      const tr = document.createElement("tr");
      const cls = adequacyClass(row.val);
      if (cls) tr.classList.add(cls);

      tr.innerHTML = `
      <td>${row.label}</td>
      <td>${row.val.toFixed(2)} kN</td>
      <td>${Number.isFinite(vu) ? vu.toFixed(2) + " kN" : "-"}</td>
      <td>${adequacyText(row.val)}</td>
    `;
      tbody.appendChild(tr);
    });
  }

  function buildPdfReport() {
    $("reportDate").textContent = new Date().toLocaleDateString("tr-TR");
    fillReportInputs();
    copyMathBlocksToReport();
    fillReportSummary();
    paginatePdfReport();

  }

  function paginatePdfReport() {
    const report = $("pdfReport");
    if (!report) return;

    const originalPage = report.querySelector(".pdf-page");
    if (!originalPage) return;

    const sections = Array.from(originalPage.querySelectorAll(".pdf-section"));
    const header = originalPage.querySelector(".pdf-header");

    // Eski içeriği temizle
    report.innerHTML = "";

    const PAGE_HEIGHT = 1123; // px
    const PAGE_PADDING_TOP = 56;
    const PAGE_PADDING_BOTTOM = 56;
    const USABLE_HEIGHT = PAGE_HEIGHT - PAGE_PADDING_TOP - PAGE_PADDING_BOTTOM;

    function createPage(includeHeader = false) {
      const page = document.createElement("div");
      page.className = "pdf-page";

      if (includeHeader && header) {
        page.appendChild(header.cloneNode(true));
      }

      report.appendChild(page);
      return page;
    }

    let currentPage = createPage(true);
    let currentHeight = header ? header.offsetHeight + 24 : 0;

    sections.forEach((section) => {
      const clone = section.cloneNode(true);

      // Ölçüm için geçici ekle
      clone.style.visibility = "hidden";
      clone.style.position = "absolute";
      clone.style.left = "-99999px";
      clone.style.top = "0";
      report.appendChild(clone);

      const sectionHeight = clone.offsetHeight;
      report.removeChild(clone);

      // Sığmıyorsa yeni sayfa
      if (currentHeight + sectionHeight > USABLE_HEIGHT) {
        currentPage = createPage(false);
        currentHeight = 0;
      }

      currentPage.appendChild(section.cloneNode(true));
      currentHeight += sectionHeight + 22;
    });
  }

  async function exportPdfReport() {
    buildPdfReport();

    const sourceEl = $("pdfReport");
    if (!sourceEl) return;

    const stage = document.createElement("div");
    stage.style.position = "fixed";
    stage.style.left = "0";
    stage.style.top = "0";
    stage.style.width = "794px";
    stage.style.background = "#fff";
    stage.style.zIndex = "999999";
    stage.style.opacity = "1";
    stage.style.pointerEvents = "none";
    stage.style.overflow = "visible";

    const clone = sourceEl.cloneNode(true);
    clone.id = "pdfReportClone";
    clone.style.position = "static";
    clone.style.left = "auto";
    clone.style.top = "auto";
    clone.style.width = "794px";
    clone.style.background = "#fff";
    clone.style.opacity = "1";
    clone.style.pointerEvents = "auto";
    clone.style.margin = "0";
    clone.style.padding = "0";
    clone.style.overflow = "visible";

    stage.appendChild(clone);
    document.body.appendChild(stage);

    await new Promise((resolve) => requestAnimationFrame(resolve));
    await new Promise((resolve) => setTimeout(resolve, 250));

    try {
      const pdf = new window.jspdf.jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });

      const pages = Array.from(clone.querySelectorAll(".pdf-page"));

      for (let i = 0; i < pages.length; i++) {
        const pageEl = pages[i];

        const canvas = await html2canvas(pageEl, {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
          scrollX: 0,
          scrollY: 0,
          width: pageEl.scrollWidth,
          height: pageEl.scrollHeight,
          windowWidth: pageEl.scrollWidth,
          windowHeight: pageEl.scrollHeight
        });

        const imgData = canvas.toDataURL("image/jpeg", 0.98);

        if (i > 0) pdf.addPage();

        pdf.addImage(imgData, "JPEG", 0, 0, 210, 297);
      }

      pdf.save("Birlesim_46_Hesap_Raporu.pdf");
    } catch (err) {
      console.error("PDF oluşturma hatası:", err);
    } finally {
      document.body.removeChild(stage);
    }
  }

  document.getElementById('calcBtn').addEventListener('click', calculate);
  $("pdfBtn")?.addEventListener("click", exportPdfReport);

  document.getElementById("resetBtn")?.addEventListener("click", () => {
    location.reload();
  });

})();





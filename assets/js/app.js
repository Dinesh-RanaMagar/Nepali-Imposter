(() => {
    const categories = {
        food: [
            { word: "मोमो", hint: "भापभित्र स्वाद" },
            { word: "चाउमिन", hint: "तारजस्तो परिकार" },
            { word: "भात", hint: "दैनिक थालको राजा" },
            { word: "दाल", hint: "झोलको साथी" },
            { word: "समोसा", hint: "त्रिकोण भोकमार" },
            { word: "पिज्जा", hint: "गोलो टुक्रा भोज" },
            { word: "सेलरोटी", hint: "चाडको घेरा" },
            { word: "खीर", hint: "मिठासको कटोरा" },
            { word: "ढिँडो", hint: "गाँउले बल" },
            { word: "अचार", hint: "सानो तर झन् स्वाद" }
        ],
        animals: [
            { word: "कुकुर", hint: "घरको पहरेदार" },
            { word: "बिरालो", hint: "चुपचाप सिकार" },
            { word: "हात्ती", hint: "ठूलो र सम्झनशील" },
            { word: "घोडा", hint: "दौडको साथी" },
            { word: "बाघ", hint: "जंगलको दबदबा" },
            { word: "सिंह", hint: "गर्जनले चिनिन्छ" },
            { word: "बाँदर", hint: "हाँगाको खेलाडी" },
            { word: "गाई", hint: "घाँसकी शान्त रानी" },
            { word: "भैंसी", hint: "कालो बलियो जनावर" },
            { word: "मगरमच्छ", hint: "पानीको घातक" }
        ],
        objects: [
            { word: "मोबाइल", hint: "हातमै संसार" },
            { word: "कुर्सी", hint: "थकाइको टेक" },
            { word: "टेबल", hint: "कामको थाम" },
            { word: "घडी", hint: "समयको पहरेदार" },
            { word: "चस्मा", hint: "आँखाको सहायक" },
            { word: "कलम", hint: "स्याहीको हतियार" },
            { word: "किताब", hint: "पानाभित्र ज्ञान" },
            { word: "झोला", hint: "बोकेर हिँड्ने साथी" },
            { word: "बत्ती", hint: "अँध्यारोको शत्रु" },
            { word: "ताला", hint: "ढोकाको गोप्य साथी" }
        ],
        actors: [
            { word: "राजेश हमाल", hint: "महानायक भनेर चिनिन्छ" },
            { word: "दयाहाङ राई", hint: "यथार्थ अभिनयका लागि प्रसिद्ध" },
            { word: "भुवन केसी", hint: "पुराना पर्दाका नायक" },
            { word: "अनमोल केसी", hint: "नयाँ पुस्ताको स्टार" },
            { word: "पल शाह", hint: "पर्दा र गीत दुवैमा" },
            { word: "नाजिर हुसेन", hint: "शान्त तर गहिरो अभिनय" },
            { word: "निरुता सिंह", hint: "पुराना हिट फिल्मकी नायिका" },
            { word: "करिश्मा मानन्धर", hint: "पर्दाकी सदाबहार" },
            { word: "रेखा थापा", hint: "बलियो भूमिकाले चिनिन्छ" },
            { word: "प्रियंका कार्की", hint: "आधुनिक पर्दाकी परिचित" }
        ],
        places: [
            { word: "काठमाडौं", hint: "मन्दिर र भीडको शहर" },
            { word: "पोखरा", hint: "ताल र हिमालको साथ" },
            { word: "लुम्बिनी", hint: "शान्तिको जन्मथलो" },
            { word: "चितवन", hint: "जंगलको रोमाञ्च" },
            { word: "जनकपुर", hint: "मिथिलाको धरोहर" },
            { word: "इलाम", hint: "हरियो पाखाको सुवास" },
            { word: "मुस्ताङ", hint: "हावाले कथा लेख्छ" },
            { word: "धरान", hint: "पूर्वको चहलपहल" },
            { word: "भक्तपुर", hint: "ईँट र इतिहास" },
            { word: "नागरकोट", hint: "सूर्योदयको प्रतीक्षा" }
        ],
        professions: [
            { word: "डाक्टर", hint: "सेतो कोटको भरोसा" },
            { word: "शिक्षक", hint: "अक्षरको मार्गदर्शक" },
            { word: "इन्जिनियर", hint: "नक्सालाई रूप दिन्छ" },
            { word: "पाइलट", hint: "आकाशको चालक" },
            { word: "किसान", hint: "माटोसँगको जीवन" },
            { word: "प्रहरी", hint: "सुरक्षाको पहरा" },
            { word: "सैनिक", hint: "सीमाको साहस" },
            { word: "पत्रकार", hint: "समाचारको खोजी" },
            { word: "वकिल", hint: "कानुनको बहस" },
            { word: "नाई", hint: "कपालको कलाकार" }
        ],
        vehicles: [
            { word: "बस", hint: "धेरै यात्रुको साथी" },
            { word: "मोटरसाइकल", hint: "दुई पाङ्ग्रेको रफ्तार" },
            { word: "साइकल", hint: "पेट्रोलबिनाको यात्रा" },
            { word: "कार", hint: "चार पाङ्ग्रेको आराम" },
            { word: "ट्रक", hint: "भारी बोकेको बाटो" },
            { word: "टेम्पो", hint: "सहरको सस्तो सवारी" },
            { word: "ट्रेन", hint: "लामो लहरको यात्रा" },
            { word: "विमान", hint: "बादलमाथि हिँड्छ" },
            { word: "हेलिकप्टर", hint: "पखेटा नभई उड्छ" },
            { word: "डुङ्गा", hint: "पानीको बाटो" }
        ],
        colors: [
            { word: "रातो", hint: "जोशको छाया" },
            { word: "निलो", hint: "आकाशको सम्झना" },
            { word: "हरियो", hint: "पातको भावना" },
            { word: "पहेंलो", hint: "घामजस्तै उज्यालो" },
            { word: "कालो", hint: "अँध्यारोसँग नजिक" },
            { word: "सेतो", hint: "साफपनको संकेत" },
            { word: "गुलाबी", hint: "कोमल मिठास" },
            { word: "बैजनी", hint: "रहस्यमय चमक" },
            { word: "सुन्तला", hint: "फलजस्तो तातोपन" },
            { word: "खैरो", hint: "माटोको झल्को" }
        ],
        sports: [
            { word: "फुटबल", hint: "खुट्टाले गोल खोज्छ" },
            { word: "क्रिकेट", hint: "ब्याट र बलको खेल" },
            { word: "भलिबल", hint: "जालीमाथि उड्छ" },
            { word: "बास्केटबल", hint: "घेराभित्र लक्ष्य" },
            { word: "टेबलटेनिस", hint: "सानो बलको तीव्रता" },
            { word: "ब्याडमिन्टन", hint: "प्वाँख उड्ने खेल" },
            { word: "कबड्डी", hint: "साससँग शक्ति" },
            { word: "दौड", hint: "गन्तव्यसँग होड" },
            { word: "चेस", hint: "मस्तिष्कको मैदान" },
            { word: "बक्सिङ", hint: "मुठ्ठीको मुकाबला" }
        ],
        bodyParts: [
            { word: "आँखा", hint: "दृश्यको ढोका" },
            { word: "नाक", hint: "सुगन्धको बाटो" },
            { word: "कान", hint: "ध्वनिको झ्याल" },
            { word: "मुख", hint: "शब्दको प्रवेशद्वार" },
            { word: "हात", hint: "कामको पहिलो साथी" },
            { word: "खुट्टा", hint: "यात्राको आधार" },
            { word: "टाउको", hint: "सोच बस्ने ठाउँ" },
            { word: "ओठ", hint: "मुस्कानको किनार" },
            { word: "जिब्रो", hint: "स्वादको परीक्षक" },
            { word: "मुटु", hint: "धड्कनको केन्द्र" }
        ],
        nature: [
            { word: "हिमाल", hint: "सेतो उचाइ" },
            { word: "नदी", hint: "बगिरहने बाटो" },
            { word: "जंगल", hint: "हरियो रहस्य" },
            { word: "झरना", hint: "पानीको संगीत" },
            { word: "बादल", hint: "आकाशको रुई" },
            { word: "हावा", hint: "देखिँदैन तर छुनिन्छ" },
            { word: "वर्षा", hint: "आकाशको झरी" },
            { word: "माटो", hint: "जीवनको गन्ध" },
            { word: "समुद्र", hint: "किनार खोज्ने विशालता" },
            { word: "सूर्य", hint: "दिनको राजा" }
        ],
        schoolItems: [
            { word: "कापी", hint: "खाली पानाको साथी" },
            { word: "कलम", hint: "अक्षर बगाउँछ" },
            { word: "पेन्सिल", hint: "मेटिएर पनि फर्किन्छ" },
            { word: "रबर", hint: "गल्तीको सफाइ" },
            { word: "झोला", hint: "काँधको बोझ" },
            { word: "किताब", hint: "पाठभित्र संसार" },
            { word: "स्केल", hint: "सीधाको साथी" },
            { word: "कम्पास", hint: "गोलो खोज्ने यन्त्र" },
            { word: "शार्पनर", hint: "नोक तिखार्छ" },
            { word: "पहिचानपत्र", hint: "विद्यार्थीको चिनारी" }
        ],
        fruits: [
            { word: "स्याउ", hint: "रुखको गोल मिठास" },
            { word: "केरा", hint: "छिल्काभित्र ऊर्जा" },
            { word: "सुन्तला", hint: "फाँकफाँक रस" },
            { word: "आँप", hint: "गर्मीको मिठो राजा" },
            { word: "अङ्गुर", hint: "सानो थुँग्रो स्वाद" },
            { word: "अनार", hint: "दाना भित्र रत्न" },
            { word: "नासपाती", hint: "घण्टीजस्तो आकार" },
            { word: "मेवा", hint: "भित्र धेरै बीउ" },
            { word: "अनानास", hint: "काँडामाथि मिठास" },
            { word: "तरबूजा", hint: "हरियो बाहिर रातो भित्र" }
        ],
        countries: [
            { word: "नेपाल", hint: "हिमालको देश" },
            { word: "भारत", hint: "दक्षिणको छिमेकी" },
            { word: "चीन", hint: "उत्तरको विशालता" },
            { word: "जापान", hint: "उदाउँदो सूर्य" },
            { word: "अमेरिका", hint: "टाढाको शक्तिशाली देश" },
            { word: "बेलायत", hint: "पुरानो राजतन्त्र" },
            { word: "अष्ट्रेलिया", hint: "कंगारुको घर" },
            { word: "क्यानडा", hint: "हिउँ र शिष्टता" },
            { word: "भुटान", hint: "खुसीको मापन" },
            { word: "पाकिस्तान", hint: "पश्चिमतिरको छिमेक" }
        ],
        bibleCharacters: [
    { word: "येशू", hint: "उद्धारको मार्ग" },
    { word: "मोशा", hint: "समुद्र चिरेका अगुवा" },
    { word: "अब्राहाम", hint: "विश्वासका पिता" },
    { word: "नोह", hint: "जहाज बनाएका धर्मी" },
    { word: "दाऊद", hint: "गोठालोदेखि राजा" },
    { word: "सोलोमन", hint: "बुद्धिको प्रतीक" },
    { word: "दानियल", hint: "सिंहको गुफामा पनि अटल" },
    { word: "योसेफ", hint: "रंगीन कोटको कथा" },
    { word: "यूसुफ", hint: "सपनाको व्याख्याता" },
    { word: "एलिया", hint: "आगो झार्ने अगमवक्ता" },
    { word: "एलीशा", hint: "एलियाका उत्तराधिकारी" },
    { word: "यशैया", hint: "मसीहको भविष्यवक्ता" },
    { word: "यर्मिया", hint: "रोइरहने अगमवक्ता" },
    { word: "इजकिएल", hint: "सुक्खा हड्डीको दर्शन" },
    { word: "योना", hint: "ठूलो माछासँग सम्बन्धित" },
    { word: "रूथ", hint: "विश्वासी बुहारी" },
    { word: "एस्तर", hint: "रानी बनेर बचाइन्" },
    { word: "मरियम", hint: "येशूकी आमा" },
    { word: "पावल", hint: "धेरै पत्रका लेखक" },
    { word: "पत्रुस", hint: "चट्टान भनिएका चेला" },
    { word: "यूहन्ना", hint: "प्रेमको प्रेरित" },
    { word: "याकूब", hint: "प्रेरितमध्ये एक" },
    { word: "मत्ती", hint: "कर उठाउनेदेखि चेला" },
    { word: "लाजरस", hint: "मृत्युबाट उठाइएका" },
    { word: "मार्था", hint: "सेवामा व्यस्त" },
    { word: "मरियम मग्दलिनी", hint: "पहिलो पुनरुत्थान साक्षी" },
    { word: "बरअब्बा", hint: "येशूको सट्टा छुटेका" },
    { word: "पिलातस", hint: "हात धोएका शासक" },
    { word: "जक्कैय", hint: "रुखमा चढेका कर उठाउने" },
    { word: "तिमोथी", hint: "जवान सेवक" }
],

biblePlaces: [
    { word: "बेथलेहेम", hint: "राजाको जन्मस्थान" },
    { word: "नासरत", hint: "बाल्यकाल बितेको ठाउँ" },
    { word: "यरूशलेम", hint: "पवित्र शहर" },
    { word: "गालिल", hint: "धेरै चमत्कार भएका क्षेत्र" },
    { word: "यर्दन", hint: "बप्तिस्माको नदी" },
    { word: "काना", hint: "पानी दाखमद्य बनेको ठाउँ" },
    { word: "यरिहो", hint: "पर्खाल ढलेको शहर" },
    { word: "बेथानी", hint: "लाजरसको गाउँ" },
    { word: "सिनै", hint: "दश आज्ञाको पर्वत" },
    { word: "गलगोथा", hint: "क्रूसको स्थान" },
    { word: "गेतसमनी", hint: "प्रार्थनाको बगैंचा" },
    { word: "कफर्नहूम", hint: "सेवकाइको केन्द्र" },
    { word: "दमास्कस", hint: "पावलको परिवर्तन" },
    { word: "एफिसस", hint: "पत्र लेखिएको मण्डली" },
    { word: "कोरिन्थ", hint: "प्रेरितको पत्र प्राप्त शहर" },
    { word: "रोम", hint: "पावलको अन्तिम यात्रा" },
    { word: "बाबेल", hint: "भाषा विभाजनको कथा" },
    { word: "मिश्र", hint: "दासत्वको देश" },
    { word: "लालसमुद्र", hint: "दुई भाग भएको पानी" },
    { word: "जैतुन पर्वत", hint: "स्वर्गारोहणको स्थान" },
    { word: "पत्मोस", hint: "प्रकाशको पुस्तक लेखिएको टापु" },
    ],
    christianSongs: [
    // ===== भजन =====
    { word: "महान् ईश्वर", hint: "भजन नं. ८" },
    { word: "भेडिगोठ चड्दा नि चड्दा", hint: "क्रिसमस भजन" },
    { word: "सिंहासनमा विराजमान", hint: "भजन नं. ५०१" },
    { word: "यहोवे मेरो गोठालो", hint: "भजनसंग्रह २३" },
       { word: "आजको दिन", hint: "धेरैजसो सुरूमा गाइने" },
    { word: "न ता बलले", hint: "कोरस न 126" },
    { word: "भजन न ८", hint: "परमेश्वर महान हुनुहुन्छ" },
    { word: "सरर सरर सरर", hint: "एड्रिन डेवनको गित" },
    { word: "जय होस यसु राजाको", hint: "भजन न ९८" },
    { word: "येशूको नाम", hint: "स्वर्गको मुनि मान्छेको बिचमा अरू नाम छैन" },
    { word: "हे सबै जातिका मानिस हो कोरस", hint: "भजनसंग्रह ११७" },
    { word: "कोहि चाहाता बन्ना ", hint: "एक्सन गित " },
    { word: "सानो चरा सानो चरा", hint: "चरा" },
    { word: "यो सानो दियो", hint: "दियो" },
    { word: "दाऊदने गोलियात", hint: "दाउद" },
    { word: "म म चकचके", hint: "म लोभि" },
    { word: "धुन बनाउछु मेरो मनमा", hint: "जिब्रो बाहिर" },
    { word: "आज मेरो भेडाहरू कता लाग्यो", hint: "भोकै छ होला?" },
   
]


    };

    const categoryNames = {
        food: "खाना",
        animals: "जनावर",
        objects: "वस्तु",
        actors: "अभिनेता/अभिनेत्री",
        places: "स्थान",
        professions: "पेशा",
        vehicles: "सवारी",
        colors: "रंग",
        sports: "खेलकुद",
        bodyParts: "शरीरका अंग",
        nature: "प्रकृति",
        schoolItems: "विद्यालय सामग्री",
        fruits: "फलफूल",
        countries: "देश",
        bibleCharacters: "बाइबल पात्रहरू",
        biblePlaces: "बाइबल स्थानहरू",
        christianSongs: "क्रिश्चियन गीतहरू"
    };

    const elements = {
        screens: Array.from(document.querySelectorAll(".screen")),
        lastRoundBox: document.getElementById("lastRoundBox"),
        category: document.getElementById("category"),
        playerCount: document.getElementById("playerCount"),
        playerNames: document.getElementById("playerNames"),
        hintMode: document.getElementById("hintMode"),
        soundMode: document.getElementById("soundMode"),
        shuffleMode: document.getElementById("shuffleMode"),
        timerMode: document.getElementById("timerMode"),
        timerDuration: document.getElementById("timerDuration"),
        timerDurationRow: document.getElementById("timerDurationRow"),
        gameMeta: document.getElementById("gameMeta"),
        roundChip: document.getElementById("roundChip"),
        imposterChip: document.getElementById("imposterChip"),
        playerProgress: document.getElementById("playerProgress"),
        infoBox: document.getElementById("infoBox"),
        holdBtn: document.getElementById("holdBtn"),
        nextBtn: document.getElementById("nextBtn"),
        restartCurrentBtn: document.getElementById("restartCurrentBtn"),
        guessBtns: document.getElementById("guessBtns"),
        resultBox: document.getElementById("resultBox"),
        roundSummary: document.getElementById("roundSummary"),
        playAgainBtn: document.getElementById("playAgainBtn"),
        modalBackdrop: document.getElementById("modalBackdrop"),
        modalTitle: document.getElementById("modalTitle"),
        modalText: document.getElementById("modalText"),
        modalCancelBtn: document.getElementById("modalCancelBtn"),
        modalConfirmBtn: document.getElementById("modalConfirmBtn"),
        statusHeadline: document.getElementById("statusHeadline"),
        statusText: document.getElementById("statusText"),
        onlineIndicator: document.getElementById("onlineIndicator"),
        downloadCard: document.getElementById("downloadCard"),
        downloadPercent: document.getElementById("downloadPercent"),
        downloadProgress: document.getElementById("downloadProgress"),
        downloadMessage: document.getElementById("downloadMessage"),
        settingsUpdateStatus: document.getElementById("settingsUpdateStatus"),
        settingsUpdateBadge: document.getElementById("settingsUpdateBadge"),
        offlineStatusText: document.getElementById("offlineStatusText"),
        offlineStatusBadge: document.getElementById("offlineStatusBadge"),
        installStatusText: document.getElementById("installStatusText"),
        installStatusBadge: document.getElementById("installStatusBadge"),
        updateModalBackdrop: document.getElementById("updateModalBackdrop"),
        updateModalTitle: document.getElementById("updateModalTitle"),
        updateModalText: document.getElementById("updateModalText"),
        updateModalProgress: document.getElementById("updateModalProgress"),
        updateModalMessage: document.getElementById("updateModalMessage"),
        applyUpdateBtn: document.getElementById("applyUpdateBtn"),
        laterUpdateBtn: document.getElementById("laterUpdateBtn"),
        whatsNewBackdrop: document.getElementById("whatsNewBackdrop"),
        whatsNewBody: document.getElementById("whatsNewBody"),
        closeWhatsNewBtn: document.getElementById("closeWhatsNewBtn"),
        toast: document.getElementById("toast"),
        changelogList: document.getElementById("changelogList"),
        openSettingsBtn: document.getElementById("openSettingsBtn"),
        installAppBtn: document.getElementById("installAppBtn"),
        settingsInstallBtn: document.getElementById("settingsInstallBtn"),
        homeSettingsBtn: document.getElementById("homeSettingsBtn"),
        backFromSettingsBtn: document.getElementById("backFromSettingsBtn"),
        showWhatsNewBtn: document.getElementById("showWhatsNewBtn"),
        checkUpdatesBtn: document.getElementById("checkUpdatesBtn")
    };

    let players = [];
    let imposter = null;
    let wordObj = null;
    let current = 0;
    let guessed = false;
    let hintEnabled = true;
    let soundEnabled = true;
    let activeCategory = "";
    let lastRoundText = "";
    let roundNumber = 1;
    let isHoldActive = false;
    let previousScreenId = "screen1";
    let toastTimer = null;

    /* ── Timer state ─────────────────────────────────────── */
    let timerEnabled    = false;
    let timerSeconds    = 120;
    let timerRemaining  = 0;
    let timerInterval   = null;

    function syncTimerDurationRow() {
        if (!elements.timerDurationRow) return;
        elements.timerDurationRow.hidden = (elements.timerMode.value !== "yes");
    }

    function stopTimer() {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        const wrap = document.getElementById("guessTimerWrap");
        if (wrap) wrap.hidden = true;
    }

    function startTimer(seconds) {
        stopTimer();
        timerRemaining = seconds;

        const wrap    = document.getElementById("guessTimerWrap");
        const display = document.getElementById("guessTimerDisplay");
        const bar     = document.getElementById("guessTimerBar");
        if (!wrap || !display || !bar) return;

        wrap.hidden = false;
        wrap.classList.remove("timer-urgent");

        function renderTick() {
            const m = Math.floor(timerRemaining / 60);
            const s = timerRemaining % 60;
            display.textContent = m + ":" + String(s).padStart(2, "0");
            const pct = (timerRemaining / seconds) * 100;
            bar.style.width = pct + "%";

            if (timerRemaining <= 10) {
                wrap.classList.add("timer-urgent");
                bar.style.background = "linear-gradient(90deg, #ef4444, #dc2626)";
            } else if (timerRemaining <= 30) {
                bar.style.background = "linear-gradient(90deg, #f59e0b, #ea580c)";
            } else {
                bar.style.background = "linear-gradient(90deg, #38bdf8, #22c55e)";
            }

            // Tick sound in last 10s
            if (timerRemaining <= 10 && timerRemaining > 0 && soundEnabled) {
                playTickSound();
            }
        }

        renderTick();

        timerInterval = setInterval(() => {
            timerRemaining -= 1;
            renderTick();
            if (timerRemaining <= 0) {
                stopTimer();
                onTimerExpired();
            }
        }, 1000);
    }

    function onTimerExpired() {
        const display = document.getElementById("guessTimerDisplay");
        const wrap    = document.getElementById("guessTimerWrap");
        if (display) display.textContent = "⏰ समय सकियो!";
        if (wrap) {
            wrap.classList.add("timer-expired");
            setTimeout(() => wrap.classList.remove("timer-expired"), 1200);
        }
        if (soundEnabled) playExpiredSound();
        if (navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 400]);
    }

    function playTickSound() {
        try {
            const Ctx = window.AudioContext || window.webkitAudioContext;
            if (!Ctx) return;
            const ctx = new Ctx();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "square";
            osc.frequency.value = 880;
            gain.gain.setValueAtTime(0.04, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.08);
        } catch (e) { /* silent */ }
    }

    function playExpiredSound() {
        try {
            const Ctx = window.AudioContext || window.webkitAudioContext;
            if (!Ctx) return;
            const ctx = new Ctx();
            const now = ctx.currentTime;
            [220, 196, 165].forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = "sawtooth";
                osc.frequency.value = freq;
                const t = now + i * 0.18;
                gain.gain.setValueAtTime(0.12, t);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(t);
                osc.stop(t + 0.35);
            });
        } catch (e) { /* silent */ }
    }

    /* ════════════════════════════════════════════════════════
       SETTINGS PERSISTENCE
       – Auto-save on every field change (no save button needed)
       – Auto-fill when setup screen opens
       – PLAY AGAIN reuses saved settings directly (no setup screen)
       – Reset clears everything after confirmation
    ════════════════════════════════════════════════════════ */
    const SETTINGS_KEY = "nepali-imposter-settings";

    const DEFAULTS = {
        category:      "random",
        playerCount:   "",
        playerNames:   "",
        hintMode:      "yes",
        soundMode:     "on",
        shuffleMode:   "no",
        timerMode:     "no",
        timerDuration: "120"
    };

    function readSettings() {
        try {
            const raw = localStorage.getItem(SETTINGS_KEY);
            if (!raw) return null;
            return Object.assign({}, DEFAULTS, JSON.parse(raw));
        } catch (e) {
            return null;
        }
    }

    function writeSettings(data) {
        try {
            localStorage.setItem(SETTINGS_KEY, JSON.stringify(data));
        } catch (e) { /* quota exceeded — silent */ }
    }

    function settingsFromForm() {
        return {
            category:      elements.category.value,
            playerCount:   elements.playerCount.value,
            playerNames:   elements.playerNames.value,
            hintMode:      elements.hintMode.value,
            soundMode:     elements.soundMode.value,
            shuffleMode:   elements.shuffleMode.value,
            timerMode:     elements.timerMode.value,
            timerDuration: elements.timerDuration.value
        };
    }

    function applySettingsToForm(s) {
        if (!s) return;
        elements.category.value      = s.category      !== undefined ? s.category      : DEFAULTS.category;
        elements.playerCount.value   = s.playerCount   !== undefined ? s.playerCount   : DEFAULTS.playerCount;
        elements.playerNames.value   = s.playerNames   !== undefined ? s.playerNames   : DEFAULTS.playerNames;
        elements.hintMode.value      = s.hintMode      !== undefined ? s.hintMode      : DEFAULTS.hintMode;
        elements.soundMode.value     = s.soundMode     !== undefined ? s.soundMode     : DEFAULTS.soundMode;
        elements.shuffleMode.value   = s.shuffleMode   !== undefined ? s.shuffleMode   : DEFAULTS.shuffleMode;
        elements.timerMode.value     = s.timerMode     !== undefined ? s.timerMode     : DEFAULTS.timerMode;
        elements.timerDuration.value = s.timerDuration !== undefined ? s.timerDuration : DEFAULTS.timerDuration;
        syncTimerDurationRow();
    }

    let fillingForm = false;   // guard: prevent auto-save firing during restore

    /* Called on every field input/change — saves immediately */
    function autoSaveSettings() {
        if (fillingForm) return;   // never save while we are restoring
        writeSettings(settingsFromForm());
    }

    /* Fill form from saved settings (called when setup screen opens) */
    function fillFormFromSettings() {
        fillingForm = true;
        const saved = readSettings();
        applySettingsToForm(saved || DEFAULTS);
        fillingForm = false;
        const badge = document.getElementById("setupCacheBadge");
        if (badge) badge.hidden = !saved;
    }

    /* Reset with confirmation */
    function confirmResetSettings() {
        openModal(
            "🗑 Reset Saved Settings",
            "All saved player names, category and settings will be cleared.\nThis cannot be undone.",
            doResetSettings
        );
    }

    function doResetSettings() {
        localStorage.removeItem(SETTINGS_KEY);
        fillingForm = true;
        applySettingsToForm(DEFAULTS);
        fillingForm = false;
        const badge = document.getElementById("setupCacheBadge");
        if (badge) badge.hidden = true;
        showToast("Settings reset to defaults.");
    }

    const lastWordByCategory = Object.fromEntries(Object.keys(categories).map((category) => [category, null]));

    function showScreen(screenId) {
        elements.screens.forEach((screen) => {
            screen.classList.toggle("active", screen.id === screenId);
        });
        if (screenId === "screen2") {
            fillFormFromSettings();
        }
        updateLastRoundBox();
    }

    function getActiveScreenId() {
        const active = document.querySelector(".screen.active");
        return active ? active.id : "screen1";
    }

    function openSettings() {
        const currentScreen = getActiveScreenId();
        if (currentScreen !== "screen5") {
            previousScreenId = currentScreen;
        }
        showScreen("screen5");
    }

    function closeSettings() {
        showScreen(previousScreenId || "screen1");
    }

    function getDisplayCategoryName(key) {
        return categoryNames[key] || key;
    }

    function getRandomCategoryName() {
        const keys = Object.keys(categories);
        return keys[Math.floor(Math.random() * keys.length)];
    }

    function getRandomWordNoImmediateRepeat(categoryName) {
        const words = categories[categoryName];
        if (!words || words.length === 0) {
            return null;
        }

        if (words.length === 1) {
            lastWordByCategory[categoryName] = words[0];
            return words[0];
        }

        let newWordObj = null;
        do {
            const randomIndex = Math.floor(Math.random() * words.length);
            newWordObj = words[randomIndex];
        } while (newWordObj === lastWordByCategory[categoryName]);

        lastWordByCategory[categoryName] = newWordObj;
        return newWordObj;
    }

    function makeNamesUnique(names) {
        const counts = {};
        return names.map((name) => {
            const clean = name.trim();
            counts[clean] = (counts[clean] || 0) + 1;
            return counts[clean] === 1 ? clean : clean + " " + counts[clean];
        });
    }

    function shuffleArray(array) {
        const arr = [...array];
        for (let index = arr.length - 1; index > 0; index -= 1) {
            const swapIndex = Math.floor(Math.random() * (index + 1));
            [arr[index], arr[swapIndex]] = [arr[swapIndex], arr[index]];
        }
        return arr;
    }

    function getPlayerNames(count) {
        return getPlayerNamesFromString(elements.playerNames.value, count);
    }

    function setupGame() {
        const count = Number.parseInt(elements.playerCount.value, 10);
        let selectedCategory = elements.category.value;
        const hintMode    = elements.hintMode.value;
        const soundMode   = elements.soundMode.value;
        const shuffleMode = elements.shuffleMode.value;
        const tMode       = elements.timerMode.value;
        const tDuration   = Number.parseInt(elements.timerDuration.value, 10);

        if (Number.isNaN(count) || count < 3) {
            alert("कम्तिमा 3 जना players राख्नुहोस्");
            return;
        }

        if (count > 20) {
            alert("अहिलेलाई अधिकतम 20 जना players राख्नुहोस्");
            return;
        }

        if (selectedCategory === "random") {
            selectedCategory = getRandomCategoryName();
        }

        if (!categories[selectedCategory] || categories[selectedCategory].length === 0) {
            alert("यो category मा words छैनन्");
            return;
        }

        // Save current form values immediately before starting
        writeSettings(settingsFromForm());

        players = getPlayerNames(count);
        if (shuffleMode === "yes") {
            players = shuffleArray(players);
        }

        imposter = players[Math.floor(Math.random() * players.length)];
        wordObj = getRandomWordNoImmediateRepeat(selectedCategory);
        if (!wordObj) {
            alert("Word load गर्न मिलेन");
            return;
        }

        hintEnabled  = hintMode === "yes";
        soundEnabled = soundMode === "on";
        activeCategory = selectedCategory;
        current      = 0;
        guessed      = false;
        isHoldActive = false;

        timerEnabled = (tMode === "yes");
        timerSeconds = (!Number.isNaN(tDuration) && tDuration >= 10) ? tDuration : 120;

        elements.gameMeta.textContent =
            "Category: " + getDisplayCategoryName(activeCategory) +
            " | Hint: " + (hintEnabled ? "ON" : "OFF") +
            " | Sound: " + (soundEnabled ? "ON" : "OFF");

        elements.roundChip.textContent = "Round: " + roundNumber;
        elements.imposterChip.textContent = "Imposter: 1 जना";
        updatePlayerInfo();
        showScreen("screen3");
    }

    function updatePlayerInfo() {
        elements.playerProgress.textContent = "Player " + (current + 1) + " / " + players.length;
        elements.infoBox.textContent = players[current] + " तयार होऊ\nअरूले नहेर्नुहोस्";
        elements.holdBtn.textContent = "HOLD TO SEE";
        elements.nextBtn.disabled = false;
        isHoldActive = false;
    }

    function showData(event) {
        if (event) {
            event.preventDefault();
        }

        const player = players[current];
        if (player === imposter) {
            elements.infoBox.textContent = hintEnabled
                ? player + "\nतिमी Imposter हौ\nHint: " + wordObj.hint
                : player + "\nतिमी Imposter हौ";
            return;
        }

        elements.infoBox.textContent = player + "\nशब्द: " + wordObj.word;
    }

    function hideData(event) {
        if (event) {
            event.preventDefault();
        }
        elements.infoBox.textContent = players[current] + "\n#####";
    }

    function pressHold(event) {
        if (isHoldActive) {
            return;
        }
        if (event) {
            event.preventDefault();
        }
        isHoldActive = true;
        elements.holdBtn.textContent = "RELEASE TO HIDE";
        elements.nextBtn.disabled = true;
        showData(event);
    }

    function releaseHold(event) {
        if (!isHoldActive) {
            return;
        }
        if (event) {
            event.preventDefault();
        }
        isHoldActive = false;
        elements.holdBtn.textContent = "HOLD TO SEE";
        elements.nextBtn.disabled = false;
        hideData(event);
    }

    function nextPlayer() {
        if (isHoldActive) {
            releaseHold();
        }

        current += 1;
        if (current < players.length) {
            updatePlayerInfo();
            return;
        }
        openGuessScreen();
    }

    function openGuessScreen() {
        stopTimer();
        showScreen("screen4");
        elements.guessBtns.innerHTML = "";
        elements.resultBox.style.display = "none";
        elements.resultBox.textContent = "";
        elements.roundSummary.style.display = "none";
        elements.roundSummary.textContent = "";
        elements.playAgainBtn.hidden = true;

        players.forEach((player) => {
            const button = document.createElement("button");
            button.className = "btn primary";
            button.type = "button";
            button.textContent = player;
            button.addEventListener("click", () => askGuessConfirmation(player));
            elements.guessBtns.appendChild(button);
        });

        if (timerEnabled) {
            startTimer(timerSeconds);
        }
    }

    function askGuessConfirmation(player) {
        if (guessed) {
            return;
        }
        openModal(
            "Guess Confirm",
            "तपाईं " + player + " लाई Imposter ठान्नुहुन्छ?\nयो final choice हो।",
            () => checkGuess(player)
        );
    }

    function checkGuess(player) {
        if (guessed) { return; }
        guessed = true;
        stopTimer();

        if (player === imposter) {
            elements.resultBox.textContent = "✅ Civilians Win\n\nसही Imposter: " + imposter + "\nशब्द थियो: " + wordObj.word;
            playResultTone(true);
        } else {
            elements.resultBox.textContent = "😈 Imposter Wins\n\nसाँचो Imposter: " + imposter + "\nतपाईंको Guess: " + player + "\nशब्द थियो: " + wordObj.word;
            playResultTone(false);
        }

        const summaryText = [
            "📋 Round Summary",
            "Round: " + roundNumber,
            "Category: " + getDisplayCategoryName(activeCategory),
            "Players: " + players.length,
            "Hint: " + (hintEnabled ? "ON" : "OFF"),
            "Sound: " + (soundEnabled ? "ON" : "OFF"),
            "Word: " + wordObj.word,
            "Imposter: " + imposter
        ].join("\n");

        elements.resultBox.style.display = "block";
        elements.roundSummary.textContent = summaryText;
        elements.roundSummary.style.display = "block";
        elements.playAgainBtn.hidden = false;
        lastRoundText = summaryText;
        roundNumber += 1;

        Array.from(elements.guessBtns.querySelectorAll("button")).forEach((button) => {
            button.disabled = true;
        });
    }

    /* ── PLAY AGAIN ─────────────────────────────────────────
       Open the setup screen with all previous values filled.
       Player edits what they want, then hits START.
    ─────────────────────────────────────────────────────── */
    function playAgain() {
        showScreen("screen2");
    }

    /* ── GO TO SETUP (Start Game button on home screen) ─── */
    function goToSetup() {
        showScreen("screen2");
    }

    /* Helper: build player list from a names string + count */
    function getPlayerNamesFromString(namesStr, count) {
        const input = (namesStr || "").trim();
        if (!input) {
            return Array.from({ length: count }, (_, i) => "Player " + (i + 1));
        }
        const names = input.split(",").map((n) => n.trim()).filter(Boolean);
        while (names.length < count) {
            names.push("Player " + (names.length + 1));
        }
        return makeNamesUnique(names.slice(0, count));
    }

    /* Legacy wrapper used by setupGame */
    function restartGame() {
        stopTimer();
        current      = 0;
        guessed      = false;
        isHoldActive = false;
        players      = [];
        imposter     = null;
        wordObj      = null;
        activeCategory = "";
        showScreen("screen1");
    }

    function confirmRestart() {
        openModal(
            "Restart Game",
            "अहिलेको round restart गर्ने हो?\nहालको game reset हुनेछ।",
            restartGame
        );
    }

    function updateLastRoundBox() {
        if (!lastRoundText) {
            elements.lastRoundBox.style.display = "none";
            elements.lastRoundBox.textContent = "";
            return;
        }
        elements.lastRoundBox.style.display = "block";
        elements.lastRoundBox.textContent = lastRoundText;
    }

    function playResultTone(isWin) {
        if (!soundEnabled) {
            return;
        }

        try {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (!AudioContextClass) {
                return;
            }

            const context = new AudioContextClass();
            const now = context.currentTime;
            const firstTone = context.createOscillator();
            const firstGain = context.createGain();
            firstTone.type = "sine";
            firstTone.frequency.value = isWin ? 660 : 240;
            firstGain.gain.setValueAtTime(0.001, now);
            firstGain.gain.exponentialRampToValueAtTime(0.12, now + 0.02);
            firstGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
            firstTone.connect(firstGain);
            firstGain.connect(context.destination);
            firstTone.start(now);
            firstTone.stop(now + 0.25);

            const secondTone = context.createOscillator();
            const secondGain = context.createGain();
            secondTone.type = "sine";
            secondTone.frequency.value = isWin ? 880 : 180;
            secondGain.gain.setValueAtTime(0.001, now + 0.18);
            secondGain.gain.exponentialRampToValueAtTime(0.10, now + 0.22);
            secondGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
            secondTone.connect(secondGain);
            secondGain.connect(context.destination);
            secondTone.start(now + 0.18);
            secondTone.stop(now + 0.45);
        } catch (error) {
            console.warn("Audio feedback unavailable.", error);
        }

        if (navigator.vibrate) {
            navigator.vibrate(isWin ? [120, 50, 120] : [250, 70, 250]);
        }
    }

    function openModal(title, text, onConfirm) {
        elements.modalTitle.textContent = title;
        elements.modalText.textContent = text;
        elements.modalBackdrop.hidden = false;
        document.body.classList.add("modal-open");

        elements.modalCancelBtn.onclick = () => {
            elements.modalBackdrop.hidden = true;
            document.body.classList.remove("modal-open");
        };

        elements.modalConfirmBtn.onclick = () => {
            elements.modalBackdrop.hidden = true;
            document.body.classList.remove("modal-open");
            if (typeof onConfirm === "function") {
                onConfirm();
            }
        };
    }

    function renderChangelog() {
        elements.changelogList.innerHTML = "";
        APP_META.releaseNotes.forEach((entry) => {
            const article = document.createElement("article");
            article.className = "changelog-entry";
            article.innerHTML = `
                <h4>${entry.title} (${entry.version})</h4>
                <p>${entry.date}</p>
                <ul>${entry.changes.map((change) => `<li>${change}</li>`).join("")}</ul>
            `;
            elements.changelogList.appendChild(article);
        });
    }

    function renderWhatsNew(entries) {
        const notes = entries && entries.length ? entries : APP_META.releaseNotes.slice(0, 1);
        elements.whatsNewBody.innerHTML = notes.map((entry) => `
            <article>
                <h4>${entry.title} (${entry.version})</h4>
                <p>${entry.date}</p>
                <ul>${entry.changes.map((change) => `<li>${change}</li>`).join("")}</ul>
            </article>
        `).join("");
        elements.whatsNewBackdrop.hidden = false;
        document.body.classList.add("modal-open");
    }

    function closeWhatsNew() {
        elements.whatsNewBackdrop.hidden = true;
        if (elements.modalBackdrop.hidden && elements.updateModalBackdrop.hidden) {
            document.body.classList.remove("modal-open");
        }
    }

    function setAllVersionLabels() {
        document.querySelectorAll("[data-app-version]").forEach((node) => {
            node.textContent = APP_META.version;
        });
    }

    function showToast(message) {
        elements.toast.textContent = message;
        elements.toast.hidden = false;
        window.clearTimeout(toastTimer);
        toastTimer = window.setTimeout(() => {
            elements.toast.hidden = true;
        }, 3000);
    }

    function setStatus(headline, text) {
        elements.statusHeadline.textContent = headline;
        elements.statusText.textContent = text;
    }

    function setStatusPill(element, label, tone) {
        element.textContent = label;
        element.className = "status-pill" + (tone ? " " + tone : "");
    }

    function setOnlineStatus() {
        if (navigator.onLine) {
            setStatusPill(elements.onlineIndicator, "Online", "success");
            return;
        }
        setStatusPill(elements.onlineIndicator, "Offline", "warning");
    }

    function setDownloadState(options) {
        const visible = Boolean(options.visible);
        elements.downloadCard.hidden = !visible;
        if (!visible) {
            return;
        }

        const percentage = Math.max(0, Math.min(100, options.percentage || 0));
        elements.downloadPercent.textContent = percentage + "%";
        elements.downloadProgress.style.width = percentage + "%";
        elements.downloadMessage.textContent = options.message || "Preparing update...";
    }

    function setUpdateStatus(options) {
        elements.settingsUpdateStatus.textContent = options.text;
        setStatusPill(elements.settingsUpdateBadge, options.badge, options.tone);
    }

    function setOfflineStatus(options) {
        elements.offlineStatusText.textContent = options.text;
        setStatusPill(elements.offlineStatusBadge, options.badge, options.tone);
    }

    function setInstallState(options) {
        const available = Boolean(options.available);
        const installed = Boolean(options.installed);

        elements.installStatusText.textContent = options.text;
        setStatusPill(elements.installStatusBadge, options.badge, options.tone);
        elements.installAppBtn.hidden = !available || installed;
        elements.settingsInstallBtn.hidden = !available || installed;

        if (installed) {
            elements.installAppBtn.hidden = true;
            elements.settingsInstallBtn.hidden = true;
        }
    }

    function showUpdateDialog(options) {
        elements.updateModalTitle.textContent = options.title || "🎉 New Version Available";
        elements.updateModalText.textContent = options.text || ("Version " + options.version + " is ready. Update now?");
        elements.updateModalProgress.style.width = (options.percentage || 100) + "%";
        elements.updateModalMessage.textContent = options.message || "Background download complete.";
        elements.applyUpdateBtn.disabled = Boolean(options.disableApply);
        elements.updateModalBackdrop.hidden = false;
        document.body.classList.add("modal-open");
    }

    function closeUpdateDialog() {
        elements.updateModalBackdrop.hidden = true;
        if (elements.modalBackdrop.hidden && elements.whatsNewBackdrop.hidden) {
            document.body.classList.remove("modal-open");
        }
    }

    function bindEvents() {
        document.getElementById("startGameBtn").addEventListener("click", goToSetup);
        document.getElementById("setupStartBtn").addEventListener("click", setupGame);
        document.getElementById("backToHomeBtn").addEventListener("click", () => showScreen("screen1"));
        document.getElementById("playAgainBtn").addEventListener("click", playAgain);
        elements.restartCurrentBtn.addEventListener("click", confirmRestart);
        elements.nextBtn.addEventListener("click", nextPlayer);
        elements.openSettingsBtn.addEventListener("click", openSettings);
        elements.installAppBtn.addEventListener("click", () => {
            if (typeof window.handlePwaInstall === "function") {
                window.handlePwaInstall();
            }
        });
        elements.settingsInstallBtn.addEventListener("click", () => {
            if (typeof window.handlePwaInstall === "function") {
                window.handlePwaInstall();
            }
        });
        elements.homeSettingsBtn.addEventListener("click", openSettings);
        elements.backFromSettingsBtn.addEventListener("click", closeSettings);
        elements.showWhatsNewBtn.addEventListener("click", () => renderWhatsNew(APP_META.releaseNotes));
        elements.closeWhatsNewBtn.addEventListener("click", closeWhatsNew);
        elements.laterUpdateBtn.addEventListener("click", closeUpdateDialog);

        elements.holdBtn.addEventListener("selectstart", (event) => event.preventDefault());
        elements.holdBtn.addEventListener("dragstart",   (event) => event.preventDefault());
        elements.holdBtn.addEventListener("contextmenu", (event) => event.preventDefault());
        elements.holdBtn.addEventListener("mousedown",   pressHold);
        elements.holdBtn.addEventListener("mouseup",     releaseHold);
        elements.holdBtn.addEventListener("mouseleave",  releaseHold);
        elements.holdBtn.addEventListener("touchstart",  (event) => pressHold(event),   { passive: false });
        elements.holdBtn.addEventListener("touchend",    (event) => releaseHold(event), { passive: false });
        elements.holdBtn.addEventListener("touchcancel", (event) => releaseHold(event), { passive: false });

        elements.playerCount.addEventListener("keydown", (event) => {
            if (event.key === "Enter") setupGame();
        });
        elements.playerNames.addEventListener("keydown", (event) => {
            if (event.key === "Enter") setupGame();
        });

        // ── Auto-save every field the moment it changes ──────
        [
            elements.category,
            elements.playerCount,
            elements.playerNames,
            elements.hintMode,
            elements.soundMode,
            elements.shuffleMode,
            elements.timerMode,
            elements.timerDuration
        ].forEach((field) => {
            field.addEventListener("change", autoSaveSettings);
            field.addEventListener("input",  autoSaveSettings);
        });

        // Show/hide timer duration row when timerMode changes
        elements.timerMode.addEventListener("change", syncTimerDurationRow);

        // ── Reset saved settings button ──────────────────────
        const resetBtn = document.getElementById("clearSetupCacheBtn");
        if (resetBtn) {
            resetBtn.addEventListener("click", confirmResetSettings);
        }

        window.addEventListener("online",  setOnlineStatus);
        window.addEventListener("offline", setOnlineStatus);
    }

    function syncCategoryOptions() {
        if (!elements.category) return;
        const existingValues = new Set(
            Array.from(elements.category.options).map((opt) => opt.value)
        );
        Object.keys(categories).forEach((key) => {
            if (!existingValues.has(key)) {
                const opt = document.createElement("option");
                opt.value = key;
                opt.textContent = categoryNames[key] ? `${key} (${categoryNames[key]})` : key;
                elements.category.appendChild(opt);
            }
        });
    }

    syncCategoryOptions();
    setAllVersionLabels();
    renderChangelog();
    bindEvents();
    setOnlineStatus();
    setStatus("Ready", "Version " + APP_META.version + " is installed and available offline.");
    setUpdateStatus({ text: "Ready to check for new releases.", badge: "Idle", tone: "" });
    setOfflineStatus({
        text: "Offline install will complete after the service worker finishes caching.",
        badge: "Pending",
        tone: "warning"
    });
    setInstallState({
        available: false,
        installed: false,
        text: "When supported, the install button appears here and in the header.",
        badge: "Waiting",
        tone: "warning"
    });

    window.AppUI = {
        setStatus,
        setOnlineStatus,
        setDownloadState,
        setUpdateStatus,
        setOfflineStatus,
        setInstallState,
        showUpdateDialog,
        closeUpdateDialog,
        showToast,
        showWhatsNew: renderWhatsNew,
        closeWhatsNew,
        applyUpdateButton: elements.applyUpdateBtn,
        installHeaderButton: elements.installAppBtn,
        installSettingsButton: elements.settingsInstallBtn,
        checkUpdatesButton: elements.checkUpdatesBtn
    };
})();

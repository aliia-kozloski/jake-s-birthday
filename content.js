/* ==========================================================================
   JAKE'S BIRTHDAY WEEK — CONTENT FILE
   ==========================================================================
   ★ This is the only file you need to edit to change what the site says. ★

   Tips:
   - Anything marked [EDIT ME] is a placeholder waiting for your words.
   - Text inside quotes can be freely rewritten — just keep the quotes.
   - To add photos: drop image files into assets/photos/ and follow the
     examples in the galleries below (see assets/photos/README.md).
   - Preview every door before its date:      index.html?preview=1
   - See exactly what Jake sees on a day:     index.html?date=2026-08-26
   - Skip the opening crawl while testing:    index.html?nointro=1
     (you can combine them: index.html?preview=1&nointro=1)
   - Share ONE day with family (e.g. the fleet): index.html?peek=6
     Only that day is unlocked — everything else stays locked for them,
     no matter the date. It opens automatically when they arrive.
   ========================================================================== */

const SITE = {
  honoree: "Jake",
  from: "Aliia", // [EDIT ME] how you want to sign things
  eyebrow: "A BIRTHDAY SAGA",
  titleLines: ["JAKE'S", "BIRTHDAY WEEK"],
  datesLabel: "AUGUST 24 – 30",
  startDate: "2026-08-24", // first door opens
  endDate: "2026-08-30",   // the birthday itself
  footer: "Made with love (and the Force) by Aliia",

  // Jake's playable characters. When a new door opens he picks who he is
  // that day — the chosen one then stands guard next to the title.
  // (He can change any time by clicking the figure on the main page.)
  characters: {
    label: "The Birthday Boy",
    prompt: "A new day dawns. Choose your character.",
    options: [
      { id: "commander", name: "The Commander", image: "assets/photos/characters/commander.png" },
      { id: "jedi", name: "The Jedi", image: "assets/photos/characters/jedi.png" },
      { id: "pilot", name: "Red Five", image: "assets/photos/characters/pilot.png", fade: true },
      { id: "trooper", name: "The Stormtrooper", image: "assets/photos/characters/trooper.png" },
      { id: "vader", name: "Darth Jake", image: "assets/photos/characters/vader.png" },
      { id: "jarjar", name: "Jar Jar Jake", image: "assets/photos/characters/jarjar.png", fade: true }
    ]
  },

  // The opening crawl — plays once per visit (there's a Replay button in the footer).
  intro: {
    preText: "A long time ago, in a galaxy\nfar, far away....",
    crawlEyebrow: "JAKE'S BIRTHDAY WEEK",
    crawlTitle: "THE BIRTHDAY AWAKENS",
    crawl: [
      "It is a period of CELEBRATION. Rebel spies have confirmed that JAKE — husband, hero, and the best person in this galaxy — was born in the final days of August.",
      "By official decree, August 24 to August 30 is hereby declared JAKE'S BIRTHDAY WEEK. Seven days. Seven doors. One legendary birthday boy.",
      "Each morning a new door will unlock, revealing surprises, memories and missions prepared by those who love him most.",
      "No peeking at locked doors, young Skywalker. Patience... and may the Force be with you."
    ]
  }
};

/* ==========================================================================
   THE SEVEN DAYS
   --------------------------------------------------------------------------
   Each day has:
     date    — when the door unlocks (at midnight, local time)
     episode — the roman numeral on the door
     title   — shown once the door is unlocked
     teaser  — the cryptic hint shown while it's still locked
     tagline — small line under the title inside the door
     saber   — accent color for that day (any CSS color)
     icon    — one of: suns, droid, saber, holo, xwing, ticket, cake
     blocks  — the content inside, in order. Block types:
               opening, text, gallery, hologram, quiz, mission,
               fleet, coupons, countdown, links, video, finale
   ========================================================================== */

const DAYS = [

  /* ---------- DAY 1 · AUG 24 ------------------------------------------- */
  {
    date: "2026-08-24",
    episode: "I",
    title: "The Birthday Week Awakens",
    teaser: "It begins…",
    tagline: "Seven days of celebration begin now.",
    saber: "#ffe81f",
    icon: "suns",
    blocks: [
      {
        type: "opening",
        paragraphs: [
          "THE BIRTHDAY WEEK HAS BEGUN.",
          "For the next seven days, the entire galaxy celebrates one man: JAKE.",
          "Report back every morning — a new door opens each day, until the big one on August 30."
        ]
      },
      {
        type: "gallery",
        title: "The Story So Far",
        note: "A few of my favorite holos of us. More intel arrives all week.",
        photos: [
          // Add more photos any time: copy a line and change the file + caption.
          // tall: true = portrait orientation frame.
          { src: "assets/photos/first-texting.jpg", caption: "Sep 4, 2022 — the first transmission", tall: true },
          { src: "assets/photos/first-date.jpg", caption: "One of the first dates", tall: true },
          { src: "assets/photos/first-trip.jpg", caption: "The first trip across the galaxy" }
        ]
      }
    ]
  },

  /* ---------- DAY 2 · AUG 25 · SURPRISE DATE ---------------------------- */
  {
    date: "2026-08-25",
    episode: "II",
    title: "The Phantom Date",
    teaser: "Sealed orders…",
    tagline: "Destination: classified.",
    saber: "#4f8cff",
    icon: "xwing",
    blocks: [
      {
        type: "text",
        title: "Sealed Orders",
        paragraphs: [
          "Rebel Command requires your presence this afternoon — Tuesday, August 25.",
          "Where are we going? Classified. It will be a surprise. No questions, no guessing, and no Jedi mind tricks."
        ]
      },
      {
        type: "mission",
        title: "Mission Briefing",
        steps: [
          {
            time: "·",
            label: "Refuel",
            detail: "Early dinner at home base first — cooked by me. Come hungry."
          },
          {
            time: "16:15",
            label: "Departure",
            detail: "We leave at 4:15pm sharp. Pick your transport, pilot: a 30-minute walk, or a 20-minute bus ride."
          },
          {
            time: "17:00",
            label: "The mission",
            detail: "We arrive at 5:00pm. What happens there is known only to Rebel Command (me)."
          },
          {
            time: "·",
            label: "Dress code",
            detail: "Comfy, but nice. Rebel casual."
          }
        ]
      },
      {
        type: "text",
        paragraphs: [
          "That is all the intel you get, Skywalker. See you at 16:15."
        ]
      }
    ]
  },

  /* ---------- DAY 3 · AUG 26 ------------------------------------------- */
  {
    date: "2026-08-26",
    episode: "III",
    title: "The Jedi Trials",
    teaser: "Trials await…",
    tagline: "Prove your knowledge of the galaxy.",
    saber: "#b98cff",
    icon: "saber",
    blocks: [
      {
        type: "quiz",
        title: "Trial of Knowledge",
        intro: "The Council has convened. Answer well, and a rank shall be bestowed upon you.",
        questions: [
          {
            q: "According to Master Yoda: “Do. Or do not. ______”",
            choices: ["There is no try.", "Trying is the first step.", "Do it with style.", "Always in motion is the future."],
            answer: 0,
            fact: "Yoda, The Empire Strikes Back."
          },
          {
            q: "What is the name of Han Solo's ship?",
            choices: ["Star Destroyer", "Slave I", "Millennium Falcon", "The Ghost"],
            answer: 2,
            fact: "She made the Kessel Run in less than twelve parsecs."
          },
          {
            q: "Who reveals to Luke: “I am your father”?",
            choices: ["Obi-Wan Kenobi", "Darth Vader", "Emperor Palpatine", "Han Solo"],
            answer: 1,
            fact: "Cloud City, 3 ABY. Luke took it badly."
          },
          {
            q: "What color is Mace Windu's lightsaber?",
            choices: ["Green", "Blue", "Red", "Purple"],
            answer: 3,
            fact: "The only purple blade in the Order."
          },
          {
            q: "Chewbacca belongs to which species?",
            choices: ["Ewok", "Wookiee", "Rodian", "Gungan"],
            answer: 1,
            fact: "Let the Wookiee win."
          },
          {
            q: "Complete the message: “Help me, Obi-Wan Kenobi…”",
            choices: ["…the Empire is coming.", "…you're my only hope.", "…bring the Falcon.", "…I've lost the plans."],
            answer: 1,
            fact: "Princess Leia's hologram, delivered by R2-D2."
          },
          {
            q: "The Death Star's fatal weakness was…",
            choices: ["A small thermal exhaust port", "A faulty tractor beam", "Weak Wi-Fi in the trench", "An unlocked hangar door"],
            answer: 0,
            fact: "Two meters wide. Womp-rat sized."
          },
          {
            q: "Which bounty hunter delivered Han Solo to Jabba the Hutt?",
            choices: ["Jango Fett", "Greedo", "IG-88", "Boba Fett"],
            answer: 3,
            fact: "Frozen in carbonite — the galaxy's worst travel class."
          },
          // [EDIT ME] Add your own questions about Jake! Copy the shape above.
          {
            q: "Final question: what is Jake's greatest strength?",
            choices: ["That smile", "Being an amazing husband", "Great taste in movies", "All of the above"],
            answer: 3,
            fact: "Trick question — it was always “All of the above.”"
          }
        ],
        // Rank earned by number of correct answers (out of 9)
        results: [
          { min: 0, title: "Youngling", note: "The Force is… still loading. More training you need." },
          { min: 4, title: "Padawan", note: "Strong potential. Your midi-chlorian count is rising." },
          { min: 6, title: "Jedi Knight", note: "Impressive. Most impressive." },
          { min: 8, title: "Jedi Master", note: "The Council grants you the rank of Master." },
          { min: 9, title: "Grand Master of the Order", note: "A perfect score. Yoda himself applauds." }
        ]
      }
    ]
  },

  /* ---------- DAY 4 · AUG 27 · FAKE PRESS DAY --------------------------- */
  {
    date: "2026-08-27",
    episode: "IV",
    title: "HoloNet News",
    teaser: "Press embargo lifts…",
    tagline: "You're on every front page in the galaxy.",
    saber: "#4bd5ee",
    icon: "holo",
    blocks: [
      {
        type: "text",
        title: "Breaking",
        paragraphs: [
          "The press embargo lifted at dawn, and it's madness out there. Every outlet from Coruscant to Cupertino is somehow running the same face on its front page.",
          "We pulled today's clippings for your records, Mr. CEO."
        ]
      },
      {
        type: "press",
        items: [
          {
            style: "forbes",
            format: "article",
            outlet: "Forbes",
            headline: "Keeper.ai CEO Named Husband of the Year",
            byline: "Forbes Staff · August 27, 2026",
            photo: "assets/photos/press/forbes.jpg",
            pos: "center 45%",
            body: [
              "In a decision insiders describe as “unanimous, immediate, and frankly overdue,” Jake — chief executive of Keeper.ai — has been named Husband of the Year. Sources close to the matter confirmed the award this morning over breakfast, which he also made.",
              "“His fundamentals are exceptional,” said one analyst (his wife). “Strong hug performance, consistent snack logistics, and he remembers things I said once, in passing, months ago.” The committee confirmed no other nominees were seriously considered."
            ]
          },
          {
            style: "gq",
            format: "cover",
            masthead: "GQ",
            kicker: "August 2026 · The Style Issue",
            headline: "The Best-Dressed CEO in America Speaks",
            subhead: "“I just wear whatever my wife says looks good.”",
            photo: "assets/photos/press/gq.jpg"
          },
          {
            style: "bonappetit",
            format: "cover",
            masthead: "bon appétit",
            kicker: "The Birthday Issue",
            headline: "The Steak Whisperer",
            subhead: "Inside the home kitchen critics can't get a table at",
            photo: "assets/photos/press/bonappetit.jpg"
          },
          {
            style: "techcrunch",
            format: "article",
            outlet: "TechCrunch",
            headline: "Keeper.ai CEO closes his most important round yet: Year 3 of marriage, oversubscribed",
            byline: "The Galactic Press Desk · 9:00 AM · August 27, 2026",
            photo: "assets/photos/press/techcrunch.jpg",
            pos: "center 45%",
            body: [
              "Keeper.ai's chief executive has quietly closed his most important round to date: Year 3 of Marriage, which sources say was oversubscribed within minutes of opening.",
              "The round was led by longtime partner Aliia Capital, doubling down after what one investor called “outstanding year-two performance across every metric.” Terms reportedly include unlimited forehead kisses and a lifetime lock-up period. Asked about valuation, the CEO declined to comment, calling the partnership “priceless.”"
            ]
          },
          {
            style: "people",
            format: "cover",
            masthead: "PEOPLE",
            kicker: "Special Double Issue",
            headline: "Sexiest Man Alive",
            subhead: "Sources close to the matter (his wife) confirm",
            photo: "assets/photos/press/people.jpg"
          }
        ]
      }
    ]
  },

  /* ---------- DAY 5 · AUG 28 ------------------------------------------- */
  {
    date: "2026-08-28",
    episode: "V",
    title: "The Baby Strikes Back",
    teaser: "Recovered archives…",
    tagline: "Classified holos of a very young Padawan.",
    saber: "#ff9d3b",
    icon: "droid",
    blocks: [
      {
        type: "text",
        title: "Intel Update",
        paragraphs: [
          "Our archivists have recovered classified holos of a young Padawan named Jake.",
          "Analysts agree: 100% adorable, and strong with the Force from the very start."
        ]
      },
      {
        type: "gallery",
        title: "Young Padawan Archives",
        note: "Recovered from the family archives — declassified today.",
        photos: [
          { src: "assets/photos/young/22.jpg", caption: "Day one in this galaxy" },
          { src: "assets/photos/young/13.jpg", caption: "First press appearance — the HoloNet started early", tall: true },
          { src: "assets/photos/young/03.jpg", caption: "Baby Jake — already plotting", tall: true },
          { src: "assets/photos/young/17.jpg", caption: "Diplomatic negotiations, age two" },
          { src: "assets/photos/young/19.jpg", caption: "Space cowboy era", tall: true },
          { src: "assets/photos/young/11.jpg", caption: "First steps, supervised by Grandpa" },
          { src: "assets/photos/young/28.jpg", caption: "The happiest smuggler in the spaceport", tall: true },
          { src: "assets/photos/young/23.jpg", caption: "The Elder Council, in session" },
          { src: "assets/photos/young/26.jpg", caption: "Youngling academy, morning lineup" },
          { src: "assets/photos/young/27.jpg", caption: "Climbing trials" },
          { src: "assets/photos/young/25.jpg", caption: "Pod-racing, training wheels edition" },
          { src: "assets/photos/young/12.jpg", caption: "Youngling academy: graduated with honors", tall: true },
          { src: "assets/photos/young/21.jpg", caption: "Life Day, back in the day", tall: true },
          { src: "assets/photos/young/24.jpg", caption: "Sunny afternoon with Grandma" },
          { src: "assets/photos/young/02.jpg", caption: "The prophecy, confirmed early (see shirt)" },
          { src: "assets/photos/young/05.jpg", caption: "With Grandma — the original Jedi Council" },
          { src: "assets/photos/young/32.jpg", caption: "The Force face, mastered early", tall: true },
          { src: "assets/photos/young/01.jpg", caption: "The squadron, before flight school" },
          { src: "assets/photos/young/04.jpg", caption: "Early simulator training with the crew" },
          { src: "assets/photos/young/16.jpg", caption: "Archival footage: “We're gonna see Star Wars”" },
          { src: "assets/photos/young/06.jpg", caption: "Guardian of small furry lifeforms" },
          { src: "assets/photos/young/18.jpg", caption: "Commander Jake with young recruits" },
          { src: "assets/photos/young/20.jpg", caption: "Chairing the younglings' council" },
          { src: "assets/photos/young/31.jpg", caption: "Harbor-side briefing with a Padawan" },
          { src: "assets/photos/young/07.jpg", caption: "The clan, assembled" },
          { src: "assets/photos/young/08.jpg", caption: "Off duty at the rebel base" },
          { src: "assets/photos/young/09.jpg", caption: "Young captain, surveying the Outer Rim" },
          { src: "assets/photos/young/10.jpg", caption: "Long-range communications, early tech" },
          { src: "assets/photos/young/14.jpg", caption: "Gala training: black-tie protocol" },
          { src: "assets/photos/young/15.jpg", caption: "Graduation day with Mom", tall: true },
          { src: "assets/photos/young/29.jpg", caption: "His actual life plan, recovered. “Beautiful, intelligent, sweet wife” — ✓", tall: true }
        ]
      }
      // Want to add a playlist or a video? Add a links block like this:
      // {
      //   type: "links",
      //   title: "Soundtrack",
      //   items: [
      //     { label: "▶ Our playlist", url: "https://open.spotify.com/playlist/...", note: "press play" }
      //   ]
      // }
    ]
  },

  /* ---------- DAY 6 · AUG 29 ------------------------------------------- */
  {
    date: "2026-08-29",
    episode: "VI",
    title: "The Fleet Arrives",
    teaser: "Ships incoming…",
    tagline: "Transmissions from across the galaxy.",
    saber: "#3bff6f",
    icon: "fleet",
    blocks: [
      {
        type: "text",
        title: "Long-Range Sensors",
        paragraphs: [
          "Sensors are picking up ships dropping out of hyperspace all over the system. It's not an attack — it's your people. The whole galaxy is gathering for tomorrow.",
          "Each ship carries a transmission recorded just for you."
        ]
      },
      {
        type: "fleet",
        title: "The Rebel Fleet",
        note: "Click a ship to receive its transmission.",
        /* ============================================================
           [EDIT ME] One entry per relative/friend. For each ship:
           - name / callsign : who they are (callsign is optional fun)
           - ship  : xwing | awing | ywing | falcon | shuttle
                     (the site draws it — no artwork needed)
           - color : that ship's glow color
           - photo : OPTIONAL — their face photo; shown as a big round
                     portrait riding on top of their ship
           - image : OPTIONAL — your own photoshopped ship picture
                     (transparent PNG looks best; replaces the drawn ship)
           - video : OPTIONAL — a video message! Either a file
                     ("assets/photos/fleet/mom.mp4") or a YouTube/Vimeo
                     link ("https://youtu.be/XXXX" — upload as Unlisted).
                     Plays above their written message.
           - videoPoster : OPTIONAL — preview image for a file video
           - message : their words — one paragraph per quoted line
                       (fine to leave out if the video says it all)
           - photos  : OPTIONAL — pictures shown under the message
           - signoff : the closing line
           Put files in assets/photos/fleet/ (see assets/photos/README.md)
           ============================================================ */
        ships: [
          {
            name: "Rael",
            callsign: "Red Leader",
            ship: "xwing",
            color: "#ff5c5c",
            photo: "assets/photos/fleet/rael.jpg",
            // video: "assets/photos/fleet/rael.mp4",   (or a YouTube link)
            message: [
              "[EDIT ME — Rael's birthday message goes here. Each paragraph in its own quotes, separated by commas.]"
            ],
            photos: [
              { src: "assets/photos/fleet/rael-full.jpg", caption: "Red Leader, standing by", tall: true }
            ],
            signoff: "— Rael"
          },
          {
            name: "Aliia",
            callsign: "The Princess",
            ship: "shuttle",
            color: "#cfe9ff",
            photo: "assets/photos/fleet/aliia.jpg",
            message: [
              "[EDIT ME — your own message to Jake, delivered with the fleet.]"
            ],
            photos: [
              { src: "assets/photos/fleet/aliia-full.jpg", caption: "Princess Aliia of Alderaan", tall: true }
            ],
            signoff: "— Your princess"
          },
          {
            name: "James",
            callsign: "Gold Leader",
            ship: "ywing",
            color: "#ffcf4d",
            // photo: "assets/photos/fleet/james.jpg",       (face → cockpit)
            // image: "assets/photos/fleet/james-ship.png",  (your photoshopped ship)
            // video: "assets/photos/fleet/james.mp4",       (or a YouTube link)
            message: ["[EDIT ME — James's message.]"],
            signoff: "— James"
          },
          {
            name: "Sarah",
            callsign: "Phantom Five",
            ship: "awing",
            color: "#b98cff",
            message: ["[EDIT ME — Sarah's message.]"],
            signoff: "— Sarah"
          },
          {
            name: "Stella",
            callsign: "Stardust",
            ship: "falcon",
            color: "#4bd5ee",
            message: ["[EDIT ME — Stella's message.]"],
            signoff: "— Stella"
          }
        ]
      },
      {
        type: "countdown",
        title: "T-minus to your birthday",
        target: "2026-08-30T00:00:00",
        doneText: "IT'S TIME — HAPPY BIRTHDAY, JAKE!"
      }
    ]
  },

  /* ---------- DAY 7 · AUG 30 · THE BIRTHDAY ----------------------------- */
  {
    date: "2026-08-30",
    episode: "VII",
    title: "The Rise of Jake",
    teaser: "The big one…",
    tagline: "HAPPY BIRTHDAY!",
    saber: "#ffcf4d",
    icon: "cake",
    blocks: [
      {
        type: "finale",
        headline: ["HAPPY", "BIRTHDAY,", "JAKE!"],
        subline: "LEVEL UP: ANOTHER YEAR OF JEDI MASTERY", // [EDIT ME] e.g. "LEVEL 35 UNLOCKED"
        message: [
          "[EDIT ME — your big birthday message goes here. This is the one he reads on the day itself.]",
          "This week was just the trailer — the best is yet to come. I love you. Happy birthday, my Jedi."
        ],
        wishes: [
          "May your year be free of Sith Lords and slow Wi-Fi.",
          "May your coffee be strong and your weekends long.",
          "May every traffic light you meet glow Jedi green.",
          "May the snacks always be within arm's reach.",
          "And above all — may the Force be with you. Always."
        ]
      },
      {
        type: "hologram",
        from: "Aliia",
        title: "A message from your favorite rebel",
        paragraphs: [
          "Jake — if you're reading this, the transmission worked and the Empire didn't intercept it.",
          "[EDIT ME — write your letter here. Ideas: your favorite memory together, the moment you knew, the thing you love most about him. Add as many paragraphs as you like — each one goes in quotes, separated by commas.]",
          "Happy birthday. I love you more than all the stars this website can render — and I checked, it renders a lot."
        ],
        signoff: "Yours across the galaxy, — Aliia"
      },
      // Prefer to say it on camera? Record a video and add it like this:
      // {
      //   type: "video",
      //   title: "A holomessage from Aliia",
      //   src: "assets/photos/aliia-message.mp4"   // or a YouTube/Vimeo link
      // },
      {
        type: "coupons",
        title: "Birthday Spoils: The Coupon Book",
        note: "Valid forever. No expiration date in this galaxy — screenshot to redeem.",
        coupons: [
          { title: "One breakfast in bed", detail: "Blue milk optional." },
          { title: "Movie night — your pick", detail: "Yes, even a full Star Wars marathon. Yes, even the prequels." },
          { title: "One 20-minute massage", detail: "Guaranteed to restore balance to the Force." },
          { title: "A day free of chores", detail: "The droids (me) will handle everything." },
          { title: "One day of whatever Jake wants", detail: "UNLIMITED POWER — for 24 hours, your wish is the law of the galaxy." },
          { title: "One wish — anything*", detail: "*Within reason. And within this star system." }
        ]
      },
      {
        type: "text",
        paragraphs: [
          "P.S. Every door stays open now — revisit any day of your week whenever you like."
        ]
      }
    ]
  }
];

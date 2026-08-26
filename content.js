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
   - Share ONE day with family (e.g. the fleet): index.html?peek=7
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
               fleet, albums, coupons, countdown, links, video, finale
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
          "Analysts agree: 100% adorable, and strong with the Force from the very start. The file runs long — from day one all the way to the present."
        ]
      },
      {
        type: "albums",
        title: "Young Padawan Archives",
        note: "Recovered from the family archives — declassified today. Click an album to open it.",
        /* Each album = one cover tile. Add albums by copying a block below.
           cover: the photo shown on the tile (defaults to the first photo). */
        albums: [
          {
            title: "The Beginning",
            subtitle: "Arrival in this galaxy",
            cover: "assets/photos/young/22.jpg",
            photos: [
              { src: "assets/photos/young/22.jpg", caption: "Day one in this galaxy" },
              { src: "assets/photos/young/13.jpg", caption: "First press appearance — the HoloNet started early", tall: true },
              { src: "assets/photos/young/03.jpg", caption: "Baby Jake — already plotting", tall: true },
              { src: "assets/photos/young/11.jpg", caption: "First steps, supervised by Grandpa" },
              { src: "assets/photos/young/17.jpg", caption: "Diplomatic negotiations, age two" }
            ]
          },
          {
            title: "Small But Mighty",
            subtitle: "The training years",
            cover: "assets/photos/young/19.jpg",
            photos: [
              { src: "assets/photos/young/19.jpg", caption: "Space cowboy era", tall: true },
              { src: "assets/photos/young/28.jpg", caption: "The happiest smuggler in the spaceport", tall: true },
              { src: "assets/photos/young/32.jpg", caption: "The Force face, mastered early", tall: true },
              { src: "assets/photos/young/21.jpg", caption: "Life Day, back in the day", tall: true },
              { src: "assets/photos/young/12.jpg", caption: "Graduated with honors", tall: true }
            ]
          },
          {
            title: "Youngling Academy",
            subtitle: "Playground trials",
            cover: "assets/photos/young/26.jpg",
            photos: [
              { src: "assets/photos/young/26.jpg", caption: "Youngling academy, morning lineup" },
              { src: "assets/photos/young/27.jpg", caption: "Climbing trials" },
              { src: "assets/photos/young/25.jpg", caption: "Pod-racing, training wheels edition" },
              { src: "assets/photos/young/02.jpg", caption: "The prophecy, confirmed early (see shirt)" },
              { src: "assets/photos/young/16.jpg", caption: "Archival footage: “We're gonna see Star Wars”" }
            ]
          },
          {
            title: "The Seventh Birthday",
            subtitle: "Bowling, cake, chaos",
            cover: "assets/photos/bday7/11.jpg",
            photos: [
              { src: "assets/photos/bday7/12.jpg", caption: "Birthday morning at home base", tall: true },
              { src: "assets/photos/bday7/13.jpg", caption: "Recon walk with Dad and the co-pilot" },
              { src: "assets/photos/bday7/04.jpg", caption: "Squadron assembled at the lanes" },
              { src: "assets/photos/bday7/01.jpg", caption: "Mission control, also known as the scoring screen" },
              { src: "assets/photos/bday7/02.jpg", caption: "Ball selection: a serious business", tall: true },
              { src: "assets/photos/bday7/07.jpg", caption: "Strike run in progress" },
              { src: "assets/photos/bday7/08.jpg", caption: "Weighing the options" },
              { src: "assets/photos/bday7/05.jpg", caption: "The crowd holds its breath" },
              { src: "assets/photos/bday7/06.jpg", caption: "Jake, mid-victory-report" },
              { src: "assets/photos/bday7/03.jpg", caption: "The Elder Council attends" },
              { src: "assets/photos/bday7/09.jpg", caption: "Cake incoming" },
              { src: "assets/photos/bday7/10.jpg", caption: "Two cakes. Correct protocol." },
              { src: "assets/photos/bday7/11.jpg", caption: "Seven candles, one breath" }
            ]
          },
          {
            title: "The Elders",
            subtitle: "Family & the original Council",
            cover: "assets/photos/young/23.jpg",
            photos: [
              { src: "assets/photos/young/23.jpg", caption: "The Elder Council, in session" },
              { src: "assets/photos/young/24.jpg", caption: "Sunny afternoon with Grandma" },
              { src: "assets/photos/young/05.jpg", caption: "With Grandma — the original Jedi Council" },
              { src: "assets/photos/young/15.jpg", caption: "Graduation day with Mom", tall: true },
              { src: "assets/photos/young/31.jpg", caption: "Harbor-side briefing with a Padawan" }
            ]
          },
          {
            title: "Jake & Stella",
            subtitle: "Big brother duty",
            cover: "assets/photos/thanksgiving/07.jpg",
            photos: [
              { src: "assets/photos/thanksgiving/07.jpg", caption: "First mate Stella, freshly recruited" },
              { src: "assets/photos/thanksgiving/08.jpg", caption: "Briefing the new crew member" },
              { src: "assets/photos/thanksgiving/04.jpg", caption: "Mom, Jake and the newest addition to the fleet" },
              { src: "assets/photos/thanksgiving/01.jpg", caption: "Touchdown for Thanksgiving", tall: true },
              { src: "assets/photos/thanksgiving/02.jpg", caption: "Mission face" },
              { src: "assets/photos/thanksgiving/05.jpg", caption: "Golden hour at the homestead" },
              { src: "assets/photos/thanksgiving/06.jpg", caption: "The smile that runs the galaxy" },
              { src: "assets/photos/thanksgiving/03.jpg", caption: "The famous red flannel", tall: true },
              { src: "assets/photos/thanksgiving/09.jpg", caption: "The same holo, after unauthorized modification. Suspect: age 8, armed with MS Paint.", tall: true },
              { src: "assets/photos/misc/bowling-stella-1.jpg", caption: "Years later: teaching the first mate to bowl", tall: true },
              { src: "assets/photos/misc/bowling-stella-2.jpg", caption: "Ball return duty, closely supervised", tall: true }
            ]
          },
          {
            title: "The Squadron",
            subtitle: "The clan, assembled",
            cover: "assets/photos/young/07.jpg",
            photos: [
              { src: "assets/photos/young/07.jpg", caption: "The clan, assembled" },
              { src: "assets/photos/young/01.jpg", caption: "The squadron, before flight school" },
              { src: "assets/photos/young/04.jpg", caption: "Early simulator training with the crew" },
              { src: "assets/photos/young/18.jpg", caption: "Commander Jake with young recruits" },
              { src: "assets/photos/young/20.jpg", caption: "Chairing the younglings' council" },
              { src: "assets/photos/young/06.jpg", caption: "Guardian of small furry lifeforms" },
              { src: "assets/photos/young/08.jpg", caption: "Off duty at the rebel base" },
              { src: "assets/photos/young/09.jpg", caption: "Young captain, surveying the Outer Rim" },
              { src: "assets/photos/young/10.jpg", caption: "Long-range communications, early tech" },
              { src: "assets/photos/young/14.jpg", caption: "Gala training: black-tie protocol" },
              { src: "assets/photos/misc/chinatown-clan.jpg", caption: "The clan on the town", tall: true }
            ]
          },
          {
            title: "The Hoth Expedition",
            subtitle: "Snow detail",
            cover: "assets/photos/ski/02.jpg",
            photos: [
              { src: "assets/photos/ski/01.jpg", caption: "Helmet check before the run", tall: true },
              { src: "assets/photos/ski/02.jpg", caption: "Chairlift ascent, Hoth sector" },
              { src: "assets/photos/ski/03.jpg", caption: "With Dad, surveying the ice planet" }
            ]
          },
          {
            title: "The Promotion",
            subtitle: "Certificate secured",
            cover: "assets/photos/misc/grad-portrait.jpg",
            photos: [
              { src: "assets/photos/misc/grad-portrait.jpg", caption: "Official portrait with the Certificate of Promotion", tall: true },
              { src: "assets/photos/june/09.jpg", caption: "Marching on the ceremony" },
              { src: "assets/photos/june/08.jpg", caption: "The class assembles" },
              { src: "assets/photos/june/10.jpg", caption: "Certificate secured" },
              { src: "assets/photos/june/11.jpg", caption: "Grandparents, duly impressed" },
              { src: "assets/photos/june/07.jpg", caption: "Debrief with Dad afterwards", tall: true }
            ]
          },
          {
            title: "Assorted Intel",
            subtitle: "Everything else the archives kept",
            cover: "assets/photos/june/15.jpg",
            photos: [
              { src: "assets/photos/june/15.jpg", caption: "Violin training — the Force has many disciplines" },
              { src: "assets/photos/june/01.jpg", caption: "Cake reconnaissance at the kitchen table" },
              { src: "assets/photos/june/03.jpg", caption: "Board game strategy session" },
              { src: "assets/photos/june/02.jpg", caption: "New arrivals in the hangar" },
              { src: "assets/photos/june/04.jpg", caption: "Convoy formation: bikes and wagons" },
              { src: "assets/photos/june/06.jpg", caption: "Full crew, wheels ready" },
              { src: "assets/photos/june/05.jpg", caption: "Dad and the little squadron" },
              { src: "assets/photos/june/14.jpg", caption: "Kitchen patrol with a small shadow" },
              { src: "assets/photos/june/12.jpg", caption: "Couch duty with Stella" },
              { src: "assets/photos/june/13.jpg", caption: "Long-haul transport, strapped in" },
              { src: "assets/photos/misc/breakfast-dad.jpg", caption: "Breakfast briefing with Dad" },
              { src: "assets/photos/misc/trackside-dad.jpg", caption: "Trackside with Dad, blanket provisions secured", tall: true },
              { src: "assets/photos/misc/beach-mom.jpg", caption: "Beach detail with Mom" },
              { src: "assets/photos/misc/suited-dad.jpg", caption: "Suited up with Dad, decades later", tall: true }
            ]
          },
          {
            title: "Sweet Sixteen",
            subtitle: "The 2010 archives",
            cover: "assets/photos/y2010/07.jpg",
            photos: [
              { src: "assets/photos/y2010/01.jpg", caption: "Cake secured, moving at lightspeed", tall: true },
              { src: "assets/photos/y2010/02.jpg", caption: "The ceremonial cutting, Dad supervising", tall: true },
              { src: "assets/photos/y2010/05.jpg", caption: "A second cake appears, candles armed" },
              { src: "assets/photos/y2010/03.jpg", caption: "Small rebel, armed with a net" },
              { src: "assets/photos/y2010/04.jpg", caption: "Costume protocol, strictly enforced", tall: true },
              { src: "assets/photos/y2010/06.jpg", caption: "The younglings have opinions" },
              { src: "assets/photos/y2010/10.jpg", caption: "Hugs, dispensed generously" },
              { src: "assets/photos/y2010/07.jpg", caption: "Sixteen and dangerous" },
              { src: "assets/photos/y2010/08.jpg", caption: "Double thumbs: mission accomplished" },
              { src: "assets/photos/y2010/09.jpg", caption: "The classic Jake face, 2010 edition" }
            ]
          },
          {
            title: "The Graduation",
            subtitle: "Class of 2012",
            cover: "assets/photos/grad/06.jpg",
            photos: [
              { src: "assets/photos/grad/06.jpg", caption: "The official senior portrait", tall: true },
              { src: "assets/photos/grad/02.jpg", caption: "Blue robes, class of 2012" },
              { src: "assets/photos/grad/04.jpg", caption: "With Dad — mission accomplished" },
              { src: "assets/photos/grad/03.jpg", caption: "The Elder Council, still in attendance" },
              { src: "assets/photos/grad/07.jpg", caption: "A selfie from the big day", tall: true },
              { src: "assets/photos/grad/05.jpg", caption: "Next mission: orientation day, badge and all", tall: true }
            ]
          },
          {
            title: "Charleston, 2019",
            subtitle: "Oysters, palms and a helicopter",
            cover: "assets/photos/charleston/05.jpg",
            photos: [
              { src: "assets/photos/charleston/03.jpg", caption: "Palms and pastel: the Charleston sector" },
              { src: "assets/photos/charleston/01.jpg", caption: "Cleared for takeoff" },
              { src: "assets/photos/charleston/02.jpg", caption: "Porch duty" },
              { src: "assets/photos/charleston/04.jpg", caption: "Oyster detail with Dad" },
              { src: "assets/photos/charleston/05.jpg", caption: "The shells did not stand a chance" },
              { src: "assets/photos/charleston/07.jpg", caption: "Refueling: smokehouse rations" },
              { src: "assets/photos/charleston/06.jpg", caption: "Night patrol at the pineapple fountain", tall: true }
            ]
          }
        ]
      },
      {
        type: "gallery",
        title: "Recovered Document",
        photos: [
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

  /* ---------- DAY 6 · AUG 29 · BIRTHDAY EVE ----------------------------- */
  {
    date: "2026-08-29",
    episode: "VI",
    title: "Return of the Coupons",
    teaser: "Cargo arriving…",
    tagline: "Redeemable across the galaxy. No expiration.",
    saber: "#3bff6f",
    icon: "ticket",
    blocks: [
      {
        type: "text",
        title: "Birthday Eve",
        paragraphs: [
          "One sleep to go. To keep you occupied, the Alliance has issued the following vouchers. All are legally binding in this household."
        ]
      },
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
        type: "text",
        title: "Long-Range Sensors",
        paragraphs: [
          "Sensors are picking up ships dropping out of hyperspace all over the system. It's not an attack — it's your people. The whole galaxy has gathered for today.",
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
           - ship  : xwing | awing | ywing | falcon | shuttle | cruiser | jedifighter | sailbarge | tantive | tsix
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
            name: "Pamela",
            callsign: "The Astromech",
            ship: "ywing",
            color: "#4f8cff",
            photo: "assets/photos/fleet/pamela.jpg",
            message: [
              "Dear Jake,",
              "A long time ago",
              "You were born into this world",
              "May the Force be yours"
            ],
            photos: [
              { src: "assets/photos/fleet/pamela-full.jpg", caption: "Unit P2-D2, reporting for birthday duty", tall: true }
            ],
            signoff: "Love, P2-D2"
          },
          {
            name: "James",
            callsign: "Admiral Ackbar",
            ship: "cruiser", // Home One Star Cruiser
            color: "#ff8c5a",
            photo: "assets/photos/fleet/james.jpg",
            message: [
              "Son.",
              "The candles are armed. The cake is surrounded. Singing has begun. This celebration is fully operational!",
              "It is a trap!",
              "Happy Birthday and may the force be with you."
            ],
            photos: [
              { src: "assets/photos/fleet/james-full.jpg", caption: "The Admiral, on the bridge of Home One Star Cruiser" }
            ],
            signoff: "— Admiral Ackbar"
          },
          {
            name: "Sarah",
            callsign: "Fulcrum",
            ship: "tsix", // Ahsoka's T-6 Jedi shuttle
            color: "#f0ece1",
            photo: "assets/photos/fleet/sarah.jpg",
            message: [
              "Thirty-two years! Thirty-two years you have been\nZooming around on this planet!\nBringing added sunshine to the galaxy.\nSun so bright!!\nBringing joy to your mother's heart.\nNow you bring joy to your wife's heart too, and her brother's heart too,\nAnd through Keeper joy to strangers even.",
              "Here is a maternal blessing\nTo carry in space\nFor your next year in this galaxy:",
              "May all your wonderfulness bounce back to you.\nMay all the rays of love you have sent to so many\nCome back to warm you.\nMay you have a year of joy, of discovery,\nof dreams and laughter with your wife.",
              "Next week, when you are under water looking at marvels,\nthe faces of the Pacific fish,\nKnow they are saying, “Your mama loves you!”\nAs well she should.",
              "You are wonderful."
            ],
            photos: [
              { src: "assets/photos/fleet/sarah-full.jpg", caption: "Fulcrum, watching over the whole galaxy" }
            ],
            signoff: "— Mom"
          },
          {
            name: "Stella",
            callsign: "Chewbacca",
            ship: "falcon",
            color: "#c98f3f",
            photo: "assets/photos/fleet/stella.jpg",
            message: [
              "AAARRRRREERGH!",
              "Translation: “Happy birthday Jake, we love you so much!”"
            ],
            photos: [
              { src: "assets/photos/fleet/stella-full.jpg", caption: "First mate Stella, mid-hyperspace jump", tall: true }
            ],
            signoff: "— Chewie"
          },
          {
            name: "Roman",
            callsign: "Anakin Skywalker",
            ship: "jedifighter", // flying with the Open Circle Armada
            color: "#ffd23f",
            photo: "assets/photos/fleet/roman.jpg",
            message: [
              "Happy Birthday, Jake.",
              "I don't like sand… but I love watching you get older while I stay forever 19 in the Force.",
              "I may not have the high ground, but you underestimate my presents.",
              "You're the real chosen one today… and right now, this is podracing.",
              "Time to hit the battlefield. This is where the fun begins.",
              "We smoke not just the clankers, but the cake and the candles too."
            ],
            photos: [
              { src: "assets/photos/fleet/roman-full.jpg", caption: "General Skywalker, leading the Open Circle Armada", tall: true }
            ],
            signoff: "— Anakin Skywalker"
          },
          {
            name: "Anna",
            callsign: "Salacious Crumb",
            ship: "sailbarge", // Jabba's sail barge — Mr. Crumb's ride
            color: "#9fd65a",
            photo: "assets/photos/fleet/anna.jpg",
            message: [
              "Happy birthday, Jake!",
              "I don't know a lot about Star Wars, but I liked the way Mr. Salacious Crumb looked.",
              "Enjoy your day and eat some cake… maybe even cackle a little bit."
            ],
            photos: [
              { src: "assets/photos/fleet/anna-full.jpg", caption: "Mr. Salacious Crumb (Anna), mid-snack at Jabba's court", tall: true }
            ],
            signoff: "— Anna"
          },
          {
            name: "Izzy",
            callsign: "The Padawan",
            ship: "tantive", // Leia's blockade runner — Leia-terally her ship
            color: "#ff9ebb",
            photo: "assets/photos/fleet/izzy.jpg",
            message: [
              "Happy birthday, Jake! May the Force be with you today and always.",
              "I'm so grateful to have you as my big bro. You've always been someone who inspires me, and I'm so happy to see where life has taken you and excited to see where the Force takes you next. You're truly one of the best brothers in the galaxy.",
              "Hope your birthday is Leia-terally legendary. Love you! ❤️🚀✨"
            ],
            photos: [
              { src: "assets/photos/fleet/izzy-full.jpg", caption: "Padawan Izzy, at the first Jedi Temple on Ahch-To", tall: true }
            ],
            signoff: "— Izzy, the Skywalker sister"
          }
        ]
      },
      {
        type: "hologram",
        from: "Aliia",
        title: "A message from your favorite rebel",
        paragraphs: [
          "Jake — if you're reading this, the transmission worked and the Empire didn't intercept it.",
          "You are the most hardworking, ambitious, and fair CEO. The most supportive, generous, and loving husband. And the most handsome, reliable person I know.",
          "I can't put into words how much I love you and how grateful I am for everything you do. I know how hard you work for our family, and I just want you to know that I always see it, notice it, and appreciate it.",
          "Cheers to another wonderful year together. I love you"
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
        type: "text",
        paragraphs: [
          "P.S. Every door stays open now — revisit any day of your week whenever you like."
        ]
      }
    ]
  }
];

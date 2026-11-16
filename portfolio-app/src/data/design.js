import images from "./design-images.json";

const work = (id, title, medium, alt) => ({ id, title, medium, alt, ...images[id] });

export const designCategories = [
  {
    id: "posters", label: "Posters", groups: [
      {
        id: "paper", title: "Paper & form", mood: "Warm tones / tactile textures",
        works: [
          work("blanc", "BLANC", "Poster study", "Cream and forest-green BLANC poster with a white rose and oversized typography"),
          work("midsommar", "Midsommar", "Film poster study", "Cream Midsommar film poster with a grainy floral portrait and expressive black lettering"),
          work("the-ruins", "The Ruins", "Place study", "The Ruins mansion rendered in ochre and blue on textured cream paper"),
          work("bauhaus", "Bauhaus", "Graphic study", "Bauhaus-inspired turquoise mountains, a striped yellow sun, and flowing black lines"),
        ],
      },
      {
        id: "quiet", title: "Quiet details", mood: "Cream / paper / small gestures",
        works: [
          work("camera", "Camera", "Graphic study", "Green and orange flowers arranged on a pale paper background with small editorial details"),
          work("middle", "Middle", "Typographic study", "A warm gray typographic collage with 404 numerals, small photographs, and delicate linework"),
          work("kataomoi", "Kataomoi", "Poster study", "A small dark window on a quiet cream poster with fine looping lines and vertical Japanese lettering"),
          work("mirror", "Mirror", "Square graphic study", "A white flower photograph on crumpled white paper beside flowing black linework"),
        ],
      },
      {
        id: "noise", title: "Noise & sound", mood: "Distortion / music / saturated color",
        works: [
          work("the-dooo-show", "The Dooo Show", "Music poster study", "Purple and orange music poster featuring a guitarist and distorted type"),
          work("kanibalismo", "Pag-ibig ay Kanibalismo", "Music poster study", "Red and black music collage with distressed lettering and grayscale imagery"),
          work("russian-roulette", "Russian Roulette", "Music poster study", "A violet poster with dense background type and bold multicolored lettering cascading down the page"),
          work("obsession", "Obsession", "Film poster study", "A distressed cream and magenta film poster with a warped fan, dark drips, and curved lettering"),
        ],
      },
      {
        id: "green", title: "Green frequencies", mood: "Acid tones / layered type / green light",
        works: [
          work("fade", "Fade", "Graphic study", "An acid-yellow and green collage with pink typography and a broad cyan diagonal band"),
          work("ouroborus", "Ouroborus", "Poster study", "A lime-green and charcoal architectural collage with curved forms, fine grids, and italic type"),
          work("look-at-the-sky", "Look at the sky", "Music poster study", "Green and blue atmospheric poster with the words Look at the sky, I'm still here"),
          work("cyberpunk", "Cyberpunk", "Square digital collage", "A mint-green and black cyberpunk collage with an illustrated figure, cropped eyes, and graphic panels"),
        ],
      },
      {
        id: "cold", title: "Cold light", mood: "Blue / glass / electronic textures",
        works: [
          work("glass", "Glass", "Digital collage", "A fragmented portrait on pale blue with bold black Japanese characters and a glass distortion effect"),
          work("cybercore", "Cybercore", "Digital collage", "Electric-blue graphic collage with a metallic star, layered typography, and halftone imagery"),
          work("08", "08", "Graphic study", "A dark poster with electric-blue and purple light patterns, an amber streak, and fine looping lines"),
        ],
      },
      {
        id: "fragments", title: "Dark fragments", mood: "Black / negative space / red accents",
        works: [
          work("prisms", "Prisms", "Portrait study", "A red and yellow distorted profile emerging from a mostly black background"),
          work("past-wont-leave-my-bed", "Past Wont Leave My Bed", "Poster study", "A white silhouette against deep red textures and black panels with delicate looping lines"),
          work("poetic-justice", "Poetic Justice", "Poster study", "A torn rocky landscape floating on black with a small white flower drawing and restrained typography"),
        ],
      },
    ],
  },
  {
    id: "composites", label: "Composites", groups: [
      {
        id: "night", title: "After dark", mood: "Neon / cool light / imagined worlds",
        works: [
          work("neon-city", "Neon city", "Photo composite", "A futuristic city street with teal neon signs, red lighting, and a sports car"),
          work("cosmic-drift", "Cosmic drift", "Photo composite", "A blue cosmic landscape with an astronaut, glowing planets, and a floating boat"),
        ],
      },
      {
        id: "terrain", title: "Distant terrain", mood: "Earth / atmosphere / scale",
        works: [
          work("distant-ruins", "Distant ruins", "Photo composite", "A vast brown landscape of ruined architecture beneath a stormy sky"),
          work("alpine-world", "Alpine world", "Photo composite", "A lone explorer facing a snow-covered mountain beneath green aurora light"),
        ],
      },
    ],
  },
  {
    id: "interfaces", label: "Interfaces", groups: [
      {
        id: "products", title: "Product & flow", mood: "Purple / blue / connected screens",
        works: [
          work("marketplace-study", "Marketplace study", "Interface design / Figma", "A purple marketplace design board with product listings, mobile screens, and components"),
          work("application-flows", "Application flows", "Interface design / Figma", "A blue and white interface board showing connected application screens and web layouts"),
        ],
      },
      {
        id: "care", title: "Care & conservation", mood: "Green / light blue / softer systems",
        works: [
          work("conservation-study", "Conservation study", "Interface design / Figma", "A green interface design board with connected mobile screens and conservation dashboards"),
          work("healthcare-study", "Healthcare study", "Interface design / Figma", "A light-blue healthcare interface board with mobile flows and desktop screens"),
        ],
      },
    ],
  },
];

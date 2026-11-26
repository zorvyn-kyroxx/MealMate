import { Sunrise, Sun, Moon, Coffee, UtensilsCrossed, Cake } from "lucide-react";
import { dateKey } from "../utils/dateUtils";

export const today = new Date();

export const starterRecipes = [
  // ─── BREAKFAST (15 recipes) ──────────────────────────────────────────────────
  {
    id: 1,
    title: "Poha",
    category: "Breakfast",
    time: 20,
    calories: 290,
    servings: 2,
    description: "Light and fluffy flattened rice tempered with mustard seeds, curry leaves, peanuts, and lemon — a beloved Indian morning staple.",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d6?w=900",
    ingredients: [
      "2 cups flattened rice (poha)",
      "1 medium onion, finely chopped",
      "2 green chillies, slit",
      "1 tsp mustard seeds",
      "10–12 curry leaves",
      "2 tbsp roasted peanuts",
      "½ tsp turmeric powder",
      "1 tsp sugar",
      "Salt to taste",
      "2 tbsp oil",
      "2 tbsp fresh coriander leaves",
      "Juice of ½ lemon"
    ],
    instructions: [
      "Rinse poha in a colander under running water, drain well, and set aside for 5 minutes to soften.",
      "Heat oil in a wide pan over medium heat; add mustard seeds and let them splutter.",
      "Add curry leaves, green chillies, and onions; sauté until onions turn translucent.",
      "Add peanuts, turmeric, sugar, and salt; mix well.",
      "Fold in the softened poha gently, mix on low heat for 2–3 minutes, squeeze lemon juice, garnish with coriander, and serve hot."
    ]
  },
  {
    id: 2,
    title: "Upma",
    category: "Breakfast",
    time: 25,
    calories: 310,
    servings: 2,
    description: "A hearty, golden semolina porridge enriched with vegetables, cashews, and a classic South Indian tadka — perfect for a satisfying morning.",
    image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=900",
    ingredients: [
      "1 cup fine semolina (rava/suji)",
      "1 small onion, chopped",
      "1 small carrot, diced",
      "2 tbsp fresh green peas",
      "1 tsp mustard seeds",
      "1 tsp chana dal",
      "10 curry leaves",
      "2 green chillies, chopped",
      "2 tbsp cashews",
      "2.5 cups hot water",
      "2 tbsp ghee",
      "Salt to taste",
      "Fresh coriander and lemon wedge to serve"
    ],
    instructions: [
      "Dry roast semolina in a pan on medium heat until lightly golden and aromatic; set aside.",
      "Heat ghee, add mustard seeds, chana dal, cashews, curry leaves, and green chillies; fry until dal turns golden.",
      "Add onions, carrot, and peas; sauté for 3–4 minutes until vegetables soften.",
      "Pour in hot water and bring to a boil; add salt.",
      "Slowly stir in roasted semolina while whisking continuously to avoid lumps; cover and cook on low heat for 2–3 minutes, then serve garnished with coriander and a squeeze of lemon."
    ]
  },
  {
    id: 3,
    title: "Aloo Paratha",
    category: "Breakfast",
    time: 40,
    calories: 420,
    servings: 3,
    description: "Golden, buttery whole-wheat flatbreads stuffed with a spiced mashed potato filling — an iconic Punjabi breakfast served with cool yogurt and tangy pickle.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=900",
    ingredients: [
      "2 cups whole-wheat flour (atta)",
      "Water to knead",
      "3 medium potatoes, boiled and mashed",
      "1 tsp cumin seeds",
      "½ tsp red chilli powder",
      "1 tsp amchur (dry mango powder)",
      "2 tbsp fresh coriander, chopped",
      "2 green chillies, finely chopped",
      "Salt to taste",
      "Ghee or butter for cooking"
    ],
    instructions: [
      "Knead whole-wheat flour with water into a smooth, soft dough; rest covered for 15 minutes.",
      "Mix mashed potatoes with cumin, chilli powder, amchur, coriander, green chillies, and salt to make the stuffing.",
      "Divide dough into equal balls; roll each into a 4-inch circle, place a spoon of filling in the centre, bring edges together, and seal.",
      "Gently roll the stuffed ball into a 7-inch flatbread.",
      "Cook on a hot tawa with ghee on both sides until golden-brown spots appear; serve hot with dahi and achaar."
    ]
  },
  {
    id: 4,
    title: "Idli with Sambar",
    category: "Breakfast",
    time: 30,
    calories: 260,
    servings: 4,
    description: "Soft, pillowy steamed rice cakes paired with a tangy, vegetable-packed lentil sambar — the crown jewel of South Indian breakfasts.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=900",
    ingredients: [
      "2 cups idli rice",
      "1 cup split urad dal",
      "Salt to taste",
      "1 cup toor dal (for sambar)",
      "1 cup mixed vegetables (drumstick, carrot, onion)",
      "2 tsp sambar powder",
      "1 tsp tamarind paste",
      "1 tsp mustard seeds",
      "2 dried red chillies",
      "10 curry leaves",
      "1 tbsp oil"
    ],
    instructions: [
      "Soak rice and urad dal separately for 6–8 hours; grind to a smooth batter and ferment overnight.",
      "Add salt to batter, pour into greased idli moulds, and steam for 10–12 minutes until a toothpick comes out clean.",
      "Boil toor dal until soft; whisk smooth, then add cooked vegetables, sambar powder, and tamarind paste; simmer for 10 minutes.",
      "Prepare tadka: heat oil, add mustard seeds, dried red chillies, and curry leaves; pour over sambar.",
      "Serve hot idlis alongside sambar and coconut chutney."
    ]
  },
  {
    id: 5,
    title: "Masala Dosa",
    category: "Breakfast",
    time: 35,
    calories: 390,
    servings: 2,
    description: "Paper-thin, crisply fermented rice crepe filled with golden spiced potato masala — an irresistible South Indian classic loved across India.",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=900",
    ingredients: [
      "2 cups dosa batter (fermented rice-urad batter)",
      "3 medium potatoes, boiled and mashed",
      "1 large onion, sliced",
      "1 tsp mustard seeds",
      "10 curry leaves",
      "2 green chillies, chopped",
      "½ tsp turmeric",
      "2 tbsp oil for masala",
      "Oil or ghee for dosa",
      "Salt to taste"
    ],
    instructions: [
      "Prepare potato masala: heat oil, splutter mustard seeds, add curry leaves, chillies, and onions; sauté until soft.",
      "Add turmeric and mashed potatoes, mix well, season with salt; set aside.",
      "Heat a flat griddle until very hot; pour a ladleful of batter and spread in a thin circular motion outward.",
      "Drizzle oil on the edges; when the dosa turns golden and crisp, place a portion of masala in the centre.",
      "Fold the dosa over the filling and serve immediately with sambar and coconut chutney."
    ]
  },
  {
    id: 6,
    title: "Puri Bhaji",
    category: "Breakfast",
    time: 35,
    calories: 450,
    servings: 3,
    description: "Puffed golden deep-fried pooris served alongside a spiced potato-tomato bhaji — a festive, indulgent weekend breakfast from North India.",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=900",
    ingredients: [
      "2 cups whole-wheat flour",
      "Water to knead",
      "Oil for deep frying",
      "4 medium potatoes, boiled and cubed",
      "2 tomatoes, chopped",
      "1 tsp cumin seeds",
      "½ tsp turmeric",
      "1 tsp coriander powder",
      "½ tsp red chilli powder",
      "Salt to taste",
      "2 tbsp oil (for bhaji)",
      "Fresh coriander to garnish"
    ],
    instructions: [
      "Knead firm dough with whole-wheat flour and water; divide into small balls and roll into 3-inch circles.",
      "Deep fry pooris in hot oil, pressing gently with a slotted spoon — they should puff up in seconds; drain on paper towels.",
      "For bhaji, heat oil, add cumin seeds, then tomatoes and spices; cook until tomatoes break down.",
      "Add boiled potatoes, mix well, and lightly mash a few pieces to thicken the gravy; adjust salt.",
      "Serve hot puffy pooris with bhaji and a side of pickle."
    ]
  },
  {
    id: 7,
    title: "Besan Cheela",
    category: "Breakfast",
    time: 20,
    calories: 280,
    servings: 2,
    description: "Protein-rich gram-flour crepes spiced with cumin, ajwain, and green chilli — a quick, nutritious breakfast ready in under 20 minutes.",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d6?w=900",
    ingredients: [
      "1½ cups besan (gram flour)",
      "1 small onion, finely chopped",
      "1 green chilli, finely chopped",
      "½ tsp ajwain (carom seeds)",
      "½ tsp cumin seeds",
      "½ tsp red chilli powder",
      "¼ tsp turmeric",
      "2 tbsp fresh coriander, chopped",
      "Water to make a smooth batter",
      "Salt to taste",
      "Oil or ghee for cooking"
    ],
    instructions: [
      "Whisk besan with water to form a smooth, lump-free batter of medium-thin consistency.",
      "Stir in onion, green chilli, ajwain, cumin, chilli powder, turmeric, coriander, and salt.",
      "Heat a non-stick tawa; pour a ladle of batter and spread into a thin circle.",
      "Drizzle oil around the edges; cook on medium heat until the base is set and golden.",
      "Flip carefully, cook the other side for 1–2 minutes, and serve hot with green chutney."
    ]
  },
  {
    id: 8,
    title: "Sabudana Khichdi",
    category: "Breakfast",
    time: 25,
    calories: 320,
    servings: 2,
    description: "Pearl-soft sago pearls tossed with peanuts, potato, cumin, and green chilli — a popular fasting breakfast with a delightfully light texture.",
    image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=900",
    ingredients: [
      "1 cup sabudana (sago/tapioca pearls)",
      "½ cup roasted peanuts, coarsely ground",
      "1 medium potato, boiled and cubed",
      "1 tsp cumin seeds",
      "2 green chillies, chopped",
      "10 curry leaves",
      "1 tsp sugar",
      "Salt to taste",
      "2 tbsp ghee or oil",
      "Juice of ½ lemon",
      "Fresh coriander to garnish"
    ],
    instructions: [
      "Soak sabudana in water for 4–6 hours; drain completely and ensure pearls separate easily.",
      "Mix soaked sabudana with ground peanuts, sugar, and salt in a bowl.",
      "Heat ghee in a pan; add cumin seeds, curry leaves, and green chillies — let them sizzle.",
      "Add cubed potato and sauté for 2 minutes, then fold in the sabudana mixture.",
      "Cook on medium-low heat, stirring gently until sabudana pearls turn translucent; squeeze lemon and garnish with coriander."
    ]
  },
  {
    id: 9,
    title: "Methi Thepla",
    category: "Breakfast",
    time: 30,
    calories: 310,
    servings: 3,
    description: "Thin, spiced Gujarati flatbreads made with fresh fenugreek leaves and whole-wheat flour — wholesome, travel-friendly, and incredibly aromatic.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=900",
    ingredients: [
      "1½ cups whole-wheat flour",
      "½ cup besan (gram flour)",
      "1 cup fresh methi (fenugreek) leaves, chopped",
      "2 tbsp yogurt",
      "1 tsp red chilli powder",
      "½ tsp turmeric",
      "1 tsp cumin-coriander powder",
      "1 tsp sesame seeds",
      "Salt to taste",
      "Oil for cooking"
    ],
    instructions: [
      "Combine whole-wheat flour, besan, methi leaves, spices, sesame seeds, and salt in a bowl.",
      "Add yogurt and mix; knead with minimal water into a soft, smooth dough — rest for 10 minutes.",
      "Divide into equal portions and roll each into a thin 6-inch flatbread.",
      "Cook on a hot tawa with a little oil on both sides until light golden spots appear.",
      "Serve hot or at room temperature with yogurt, pickle, or chutney."
    ]
  },
  {
    id: 10,
    title: "Rava Upma",
    category: "Breakfast",
    time: 20,
    calories: 290,
    servings: 2,
    description: "A light, fluffy semolina breakfast cooked with ginger, green chilli, and a bright South Indian tempering — simple, comforting, and ready in minutes.",
    image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=900",
    ingredients: [
      "1 cup coarse semolina (rava)",
      "1 tsp mustard seeds",
      "1 tsp urad dal",
      "1 tbsp chana dal",
      "2 green chillies, slit",
      "1-inch ginger, grated",
      "10 curry leaves",
      "1 small onion, chopped",
      "2.5 cups boiling water",
      "2 tbsp ghee",
      "Salt to taste",
      "Juice of ½ lemon"
    ],
    instructions: [
      "Dry roast semolina on medium heat until it smells nutty and turns slightly golden; keep aside.",
      "Heat ghee in a heavy pan; add mustard seeds, urad dal, chana dal, and cook until dal is golden.",
      "Add curry leaves, ginger, chillies, and onion; sauté until onion is translucent.",
      "Pour in boiling water and salt; bring to a full boil.",
      "Slowly add roasted semolina while stirring continuously; cover and cook on low heat for 2 minutes; finish with a squeeze of lemon."
    ]
  },
  {
    id: 11,
    title: "Moong Dal Chilla",
    category: "Breakfast",
    time: 25,
    calories: 240,
    servings: 3,
    description: "Thin, crispy lentil crepes made from soaked green moong dal — packed with plant protein and paired beautifully with mint-coriander chutney.",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d6?w=900",
    ingredients: [
      "1 cup moong dal (split green lentils), soaked 4 hours",
      "1-inch ginger",
      "2 green chillies",
      "½ tsp cumin seeds",
      "¼ tsp asafoetida (hing)",
      "Salt to taste",
      "Water to grind",
      "1 small onion, finely chopped",
      "2 tbsp fresh coriander",
      "Oil for cooking"
    ],
    instructions: [
      "Drain soaked moong dal and grind with ginger, green chillies, cumin, hing, and minimal water into a coarse batter.",
      "Stir in chopped onion, coriander, and salt; adjust consistency with a splash of water.",
      "Heat a non-stick tawa; pour a ladle of batter and spread thin.",
      "Drizzle oil on the edges; cook on medium heat until golden and crisp on the bottom.",
      "Flip and cook the other side; serve hot with green chutney."
    ]
  },
  {
    id: 12,
    title: "Suji Halwa",
    category: "Breakfast",
    time: 20,
    calories: 350,
    servings: 3,
    description: "Rich, golden semolina pudding roasted in fragrant ghee, sweetened with sugar, and perfumed with cardamom and saffron — a beloved temple-style prasad breakfast.",
    image: "https://images.unsplash.com/photo-1593434232-16a35c5b8c4d?w=900",
    ingredients: [
      "1 cup fine semolina (suji/rava)",
      "¾ cup sugar",
      "3 tbsp pure ghee",
      "2.5 cups water",
      "½ tsp cardamom powder",
      "A few saffron strands (soaked in 2 tbsp warm milk)",
      "10–12 raisins",
      "10 cashews, halved"
    ],
    instructions: [
      "Heat ghee in a heavy-bottomed pan; fry cashews until golden, then add raisins — set aside.",
      "In the same ghee, roast semolina on medium-low heat, stirring constantly, until it turns golden and smells nutty (about 8 minutes).",
      "Meanwhile, heat water with sugar until sugar dissolves; keep it warm.",
      "Carefully pour hot sugar water into the roasted semolina while stirring constantly to prevent lumps.",
      "Cook on low heat until halwa thickens and pulls away from the sides; add saffron milk, cardamom, fried cashews, and raisins; serve warm."
    ]
  },
  {
    id: 13,
    title: "Chole Bhature",
    category: "Breakfast",
    time: 50,
    calories: 580,
    servings: 3,
    description: "Pillowy deep-fried fluffy bhaturas served with boldly spiced Punjabi chole — a legendary weekend breakfast that feels like a celebration on a plate.",
    image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=900",
    ingredients: [
      "2 cups all-purpose flour (maida)",
      "½ tsp baking soda",
      "2 tbsp yogurt",
      "Water to knead",
      "Oil for deep frying",
      "1½ cups chickpeas, soaked overnight and boiled",
      "2 onions, finely chopped",
      "2 tomatoes, pureed",
      "2 tsp chole masala",
      "1 tsp cumin seeds",
      "2 bay leaves",
      "Salt to taste",
      "2 tbsp oil (for chole)"
    ],
    instructions: [
      "Knead soft bhatura dough with maida, baking soda, yogurt, salt, and water; rest for 30 minutes.",
      "For chole: heat oil, add cumin seeds and bay leaves; sauté onions until golden-brown.",
      "Add tomato puree and chole masala; cook until oil separates, then fold in boiled chickpeas with water; simmer 15 minutes.",
      "Roll bhatura dough into oval shapes and deep fry in hot oil until puffed and golden on both sides.",
      "Serve fluffy bhaturas alongside spicy chole with sliced onions and green chutney."
    ]
  },
  {
    id: 14,
    title: "Bread Poha",
    category: "Breakfast",
    time: 15,
    calories: 270,
    servings: 2,
    description: "A quick-fix twist on classic poha using torn white bread tossed with a punchy mustard-curry leaf tadka — simple, fast, and full of nostalgic flavour.",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d6?w=900",
    ingredients: [
      "4 slices white or multigrain bread, torn into pieces",
      "1 small onion, finely chopped",
      "2 green chillies, chopped",
      "1 tsp mustard seeds",
      "10 curry leaves",
      "½ tsp turmeric",
      "2 tbsp roasted peanuts",
      "Salt to taste",
      "2 tbsp oil",
      "Juice of ½ lemon",
      "Fresh coriander to garnish"
    ],
    instructions: [
      "Heat oil in a non-stick pan; add mustard seeds and let them pop, then add curry leaves and green chillies.",
      "Add onions and sauté until softened; stir in peanuts, turmeric, and salt.",
      "Fold in torn bread pieces quickly, mixing everything together on medium heat.",
      "Cook for 2 minutes until bread is heated through and lightly toasted on the edges.",
      "Squeeze lemon juice, garnish with fresh coriander, and serve immediately."
    ]
  },
  {
    id: 15,
    title: "Sindhi Koki",
    category: "Breakfast",
    time: 25,
    calories: 330,
    servings: 2,
    description: "A thick, flaky Sindhi wheat flatbread studded with onion, coriander seeds, and green chilli — cooked twice on the tawa for an irresistible crunch.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=900",
    ingredients: [
      "2 cups whole-wheat flour",
      "1 medium onion, finely chopped",
      "2 green chillies, finely chopped",
      "2 tbsp fresh coriander leaves",
      "1 tsp cumin seeds",
      "1 tsp coriander seeds, crushed",
      "½ tsp red chilli flakes",
      "Salt to taste",
      "2 tbsp ghee (for dough and cooking)"
    ],
    instructions: [
      "Rub ghee into whole-wheat flour, then add onion, green chillies, coriander leaves, cumin, coriander seeds, chilli flakes, and salt.",
      "Knead into a stiff dough using minimal water — do not add too much liquid.",
      "Divide into 2–3 thick balls; roll into thick (5mm) round flatbreads.",
      "Cook on a dry tawa on medium heat until partially cooked on both sides.",
      "Increase heat and add a little ghee; re-cook on both sides, pressing edges, until crisp and golden; serve with yogurt."
    ]
  },

  // ─── LUNCH (20 recipes) ──────────────────────────────────────────────────────
  {
    id: 16,
    title: "Rajma Chawal",
    category: "Lunch",
    time: 50,
    calories: 490,
    servings: 3,
    description: "Velvety kidney bean curry simmered in a rich onion-tomato-ginger gravy, served over fluffy steamed basmati rice — the soul food of North India.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=900",
    ingredients: [
      "1½ cups kidney beans (rajma), soaked overnight and boiled",
      "2 large onions, finely chopped",
      "3 tomatoes, pureed",
      "1-inch ginger, grated",
      "4 garlic cloves, minced",
      "2 tsp rajma masala",
      "1 tsp cumin seeds",
      "1 tsp coriander powder",
      "½ tsp red chilli powder",
      "½ tsp garam masala",
      "Salt to taste",
      "2 tbsp oil or ghee",
      "2 cups basmati rice, cooked",
      "Fresh coriander and onion rings to serve"
    ],
    instructions: [
      "Heat oil in a pressure cooker; add cumin seeds and sauté onions until deep golden-brown (10–12 minutes) — this colour is key to flavour.",
      "Add ginger and garlic; cook for 2 minutes, then add tomato puree and all spices; cook until oil separates.",
      "Add boiled rajma with its cooking water; pressure cook for 2 more whistles.",
      "Mash a few beans against the side of the pot to thicken the gravy; simmer for 5–10 minutes.",
      "Finish with garam masala, fresh coriander, and serve hot alongside steamed basmati rice and sliced onions."
    ]
  },
  {
    id: 17,
    title: "Dal Tadka",
    category: "Lunch",
    time: 35,
    calories: 320,
    servings: 3,
    description: "Creamy yellow toor dal crowned with a sizzling tempering of cumin, garlic, dried red chilli, and ghee — simple, warming, and endlessly satisfying.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=900",
    ingredients: [
      "1 cup toor dal (split pigeon peas)",
      "2 tomatoes, chopped",
      "1 small onion, chopped",
      "1-inch ginger, grated",
      "½ tsp turmeric",
      "Salt to taste",
      "3 cups water",
      "2 tbsp ghee (for tadka)",
      "1 tsp cumin seeds",
      "4 garlic cloves, thinly sliced",
      "2 dried red chillies",
      "1 tsp kashmiri red chilli powder",
      "Fresh coriander to garnish"
    ],
    instructions: [
      "Rinse toor dal and pressure cook with water, tomatoes, onion, ginger, turmeric, and salt for 3 whistles until soft.",
      "Open, mash the dal to a creamy consistency, adjust water and salt; keep warm.",
      "For tadka: heat ghee in a small pan until shimmering; add cumin seeds and let them crackle.",
      "Add garlic slices and fry until golden, then add dried red chillies and kashmiri chilli powder — it will sizzle and colour the ghee red.",
      "Pour the entire tadka over the dal, garnish with coriander, and serve immediately with rice or rotis."
    ]
  },
  {
    id: 18,
    title: "Chole Masala",
    category: "Lunch",
    time: 50,
    calories: 420,
    servings: 3,
    description: "Bold, deeply spiced Punjabi chickpea curry with a dark, complex gravy built from whole spices and slow-cooked onion-tomato masala.",
    image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=900",
    ingredients: [
      "1½ cups chickpeas, soaked overnight and boiled",
      "2 large onions, finely chopped",
      "2 tomatoes, pureed",
      "1-inch ginger, grated",
      "4 garlic cloves, minced",
      "2 tsp chole masala powder",
      "1 tsp cumin seeds",
      "2 bay leaves",
      "2 black cardamom pods",
      "1 tsp red chilli powder",
      "½ tsp garam masala",
      "1 tbsp dried fenugreek leaves (kasuri methi)",
      "2 tbsp oil",
      "Salt to taste"
    ],
    instructions: [
      "Heat oil in a deep pan; add cumin seeds, bay leaves, and black cardamom — let them temper for 30 seconds.",
      "Add onions and cook on medium heat for 15 minutes until deep caramelised and golden.",
      "Stir in ginger, garlic, tomato puree, and all spices; cook until oil floats on the surface.",
      "Add boiled chickpeas with ½ cup cooking water; simmer on medium-low for 20 minutes, mashing a few chickpeas to thicken.",
      "Finish with crushed kasuri methi and garam masala; serve with bhature, puri, or rice."
    ]
  },
  {
    id: 19,
    title: "Kadhi Chawal",
    category: "Lunch",
    time: 40,
    calories: 380,
    servings: 3,
    description: "Tangy, golden yogurt-and-besan kadhi laden with soft pakoras, crowned with a fiery red cumin tadka — a Sunday comfort lunch classic.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=900",
    ingredients: [
      "1 cup sour yogurt",
      "3 tbsp besan (gram flour)",
      "½ tsp turmeric",
      "1 tsp red chilli powder",
      "1 tsp cumin seeds",
      "2 dried red chillies",
      "5–6 curry leaves",
      "1 tbsp ghee",
      "Salt to taste",
      "3 cups water",
      "½ cup besan (for pakoras)",
      "1 small onion, finely chopped (for pakoras)",
      "Oil for frying pakoras"
    ],
    instructions: [
      "Whisk together yogurt, besan, turmeric, chilli powder, and salt into a lump-free batter; thin with water.",
      "Cook the kadhi on medium heat, stirring constantly, until it boils and thickens (20–25 minutes); reduce to a simmer.",
      "Make pakoras: mix besan, onion, salt, and chilli; drop spoonfuls into hot oil and fry until golden.",
      "Drop pakoras into the simmering kadhi; cook together for 5 minutes.",
      "Heat ghee for tadka, add cumin seeds, dried chillies, and curry leaves; pour over kadhi and serve with steamed rice."
    ]
  },
  {
    id: 20,
    title: "Baingan Bharta",
    category: "Lunch",
    time: 40,
    calories: 290,
    servings: 3,
    description: "Smoky fire-roasted eggplant mashed with onions, tomatoes, and aromatic spices — a soulful dish where the flame-charred flavour is everything.",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=900",
    ingredients: [
      "2 large brinjals (baingan/eggplant)",
      "2 medium onions, finely chopped",
      "2 tomatoes, finely chopped",
      "4 garlic cloves, minced",
      "1-inch ginger, grated",
      "2 green chillies, chopped",
      "1 tsp cumin seeds",
      "½ tsp turmeric",
      "1 tsp coriander powder",
      "½ tsp red chilli powder",
      "2 tbsp oil",
      "Salt to taste",
      "Fresh coriander to garnish"
    ],
    instructions: [
      "Pierce brinjals all over with a fork; roast directly on a gas flame, turning occasionally, until completely charred and collapsed (10–15 minutes) — this charring creates the smoky flavour.",
      "Cool, peel off the blackened skin, and mash the soft flesh; set aside.",
      "Heat oil in a pan; add cumin seeds, then onions and green chillies — sauté until golden.",
      "Add ginger, garlic, tomatoes, and spices; cook until tomatoes break down and oil separates.",
      "Fold in mashed brinjal; mix well, cook for 5 minutes, adjust salt, garnish with coriander, and serve with roti or rice."
    ]
  },
  {
    id: 21,
    title: "Dal Makhani",
    category: "Lunch",
    time: 60,
    calories: 440,
    servings: 4,
    description: "Luxuriously creamy whole black lentil dal slow-cooked with butter, cream, and a rich tomato-ginger gravy — the king of North Indian dals.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=900",
    ingredients: [
      "1 cup whole black urad dal (sabut urad), soaked overnight",
      "¼ cup kidney beans (rajma), soaked overnight",
      "2 tomatoes, pureed",
      "1-inch ginger, grated",
      "4 garlic cloves, minced",
      "½ tsp cumin seeds",
      "1 tsp red chilli powder",
      "½ tsp garam masala",
      "2 tbsp butter",
      "2 tbsp cream",
      "Salt to taste",
      "Water as needed",
      "1 tbsp kasuri methi"
    ],
    instructions: [
      "Pressure cook soaked urad dal and rajma with water and salt for 8–10 whistles until very soft; mash lightly.",
      "In a separate pan, heat butter; add cumin seeds, ginger, garlic, then tomato puree and spices; cook until oil separates.",
      "Add the cooked dal to the masala; stir well and simmer on the lowest heat for 30 minutes, stirring occasionally.",
      "Add cream, crushed kasuri methi, and garam masala; simmer for another 10 minutes.",
      "Finish with a swirl of butter and cream; serve with garlic naan or steamed rice."
    ]
  },
  {
    id: 22,
    title: "Sarson Da Saag",
    category: "Lunch",
    time: 60,
    calories: 350,
    servings: 4,
    description: "A rustic Punjabi winter delicacy of slow-cooked mustard greens and spinach, blended to a silky richness and paired with golden makki di roti.",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=900",
    ingredients: [
      "4 cups mustard greens (sarson), roughly chopped",
      "2 cups spinach (palak)",
      "½ cup bathua (or additional spinach)",
      "1 large onion, chopped",
      "2 tomatoes, chopped",
      "2-inch ginger, grated",
      "5 garlic cloves, minced",
      "2 green chillies",
      "2 tbsp maize flour (makki atta) or white butter",
      "3 tbsp butter or ghee",
      "Salt to taste"
    ],
    instructions: [
      "Wash and roughly chop all greens; pressure cook with onion, tomatoes, green chillies, and salt until very soft (3–4 whistles).",
      "Blend or hand-mash the cooked greens to a coarse, thick consistency — do not make it completely smooth.",
      "Add makki flour and cook on medium heat, stirring for 10–15 minutes until the saag is thick and no raw flour smell remains.",
      "Heat ghee or butter in a small pan; fry onion slices and ginger until golden; pour over the saag.",
      "Serve in a clay bowl with a generous dollop of white butter alongside makki di roti."
    ]
  },
  {
    id: 23,
    title: "Khichdi",
    category: "Lunch",
    time: 30,
    calories: 310,
    servings: 3,
    description: "The ultimate healing comfort food — a one-pot rice and lentil porridge seasoned with turmeric, ginger, and ghee, light enough for any day.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=900",
    ingredients: [
      "½ cup basmati rice",
      "½ cup moong dal (yellow split lentils)",
      "1 small onion, finely chopped",
      "2 tomatoes, chopped",
      "1 tsp cumin seeds",
      "½ tsp turmeric",
      "1-inch ginger, grated",
      "2 green chillies, slit",
      "2 tbsp ghee",
      "Salt to taste",
      "3–4 cups water",
      "Fresh coriander to garnish"
    ],
    instructions: [
      "Rinse rice and moong dal together; soak for 20 minutes.",
      "Heat ghee in a pressure cooker; add cumin seeds, then sauté onions until translucent.",
      "Add ginger, green chillies, tomatoes, and turmeric; cook until tomatoes soften.",
      "Add soaked rice and dal; mix well, add water and salt; pressure cook for 3 whistles.",
      "Mash gently to desired consistency, adjust water, drizzle extra ghee, and garnish with coriander — serve with papad and pickle."
    ]
  },
  {
    id: 24,
    title: "Pav Bhaji",
    category: "Lunch",
    time: 45,
    calories: 480,
    servings: 4,
    description: "Mumbai's most iconic street food — a chunky, buttery, deeply spiced mixed vegetable mash served with toasted pav buns lathered in golden butter.",
    image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=900",
    ingredients: [
      "4 medium potatoes, boiled and mashed",
      "1 cup cauliflower florets, boiled",
      "½ cup fresh peas, boiled",
      "2 large onions (1 for bhaji, 1 for garnish)",
      "3 tomatoes, finely chopped",
      "1 capsicum, finely chopped",
      "2 tsp pav bhaji masala",
      "1 tsp red chilli powder",
      "½ tsp turmeric",
      "4 tbsp butter",
      "Salt to taste",
      "8 pav buns",
      "Lemon wedges and coriander to serve"
    ],
    instructions: [
      "Heat 2 tbsp butter in a large flat pan; sauté 1 chopped onion until pink, then add capsicum and tomatoes.",
      "Add all spices and cook until tomatoes break down completely and mixture darkens.",
      "Add boiled and mashed potatoes, cauliflower, and peas; mash everything together on the tawa, mixing vigorously.",
      "Add water to achieve a saucy consistency; cook on high heat, stirring and mashing for 10 minutes; adjust salt.",
      "Split pav buns and toast face-down on the buttered tawa until golden; serve bhaji topped with raw onion, coriander, and lemon."
    ]
  },
  {
    id: 25,
    title: "Vegetable Biryani",
    category: "Lunch",
    time: 60,
    calories: 520,
    servings: 4,
    description: "Fragrant basmati rice layered with saffron-infused vegetables, whole spices, and crispy fried onions — a feast-worthy vegetable biryani with royal heritage.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=900",
    ingredients: [
      "2 cups basmati rice, soaked 30 minutes",
      "1 cup mixed vegetables (carrot, beans, peas, potato)",
      "2 onions, thinly sliced and fried until golden-brown",
      "1 cup yogurt",
      "1-inch ginger, grated",
      "4 garlic cloves, minced",
      "2 tsp biryani masala",
      "4 green cardamom pods",
      "2 bay leaves",
      "2 cloves",
      "A generous pinch of saffron soaked in 3 tbsp warm milk",
      "3 tbsp ghee",
      "Salt to taste",
      "Fresh mint and coriander"
    ],
    instructions: [
      "Marinate vegetables in yogurt, ginger-garlic, biryani masala, and salt for 20 minutes.",
      "Cook marinated vegetables with 1 tbsp ghee on medium heat until 70% done.",
      "Boil rice with whole spices (cardamom, bay leaf, cloves) until 70% cooked; drain.",
      "Layer: half cooked rice, all vegetable masala, fried onions, mint, coriander, then remaining rice on top.",
      "Drizzle saffron milk and ghee over the top layer; seal with foil and dum-cook on the lowest heat for 20–25 minutes; serve gently fluffed with raita."
    ]
  },
  {
    id: 26,
    title: "Matar Pulao",
    category: "Lunch",
    time: 30,
    calories: 360,
    servings: 3,
    description: "Delicate basmati rice cooked with fresh green peas, whole spices, and fragrant ghee — a simple, elegant one-pot rice dish for any weekday lunch.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=900",
    ingredients: [
      "1½ cups basmati rice, washed and soaked",
      "1 cup fresh or frozen green peas",
      "1 small onion, thinly sliced",
      "1 bay leaf",
      "3 green cardamom pods",
      "2 cloves",
      "1-inch cinnamon stick",
      "½ tsp cumin seeds",
      "2 tbsp ghee",
      "Salt to taste",
      "2.5 cups water"
    ],
    instructions: [
      "Heat ghee in a pot; add cumin seeds, bay leaf, cardamom, cloves, and cinnamon — let them temper for 30 seconds.",
      "Add sliced onions and sauté until lightly golden.",
      "Add green peas and sauté for 2 minutes.",
      "Drain soaked rice and add to the pot; sauté gently for 1–2 minutes to coat with ghee.",
      "Add water and salt; bring to a boil, then cover and cook on the lowest heat for 15 minutes; fluff and serve with any dal or raita."
    ]
  },
  {
    id: 27,
    title: "Aloo Methi",
    category: "Lunch",
    time: 25,
    calories: 280,
    servings: 2,
    description: "Golden potatoes tossed with fresh fenugreek leaves in a dry spiced sauté — the slight bitterness of methi balanced perfectly with cumin and amchur.",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=900",
    ingredients: [
      "3 medium potatoes, peeled and cubed",
      "2 cups fresh fenugreek (methi) leaves, washed",
      "1 tsp cumin seeds",
      "½ tsp turmeric",
      "1 tsp coriander powder",
      "½ tsp red chilli powder",
      "½ tsp amchur (dry mango powder)",
      "Salt to taste",
      "2 tbsp oil"
    ],
    instructions: [
      "Heat oil in a pan; add cumin seeds and let them splutter.",
      "Add potato cubes; toss well and cook covered on medium heat for 8–10 minutes, stirring occasionally.",
      "Add turmeric, coriander powder, and red chilli powder; mix and cook uncovered for 3 more minutes.",
      "Fold in fresh methi leaves; sauté on high heat for 3–4 minutes until methi wilts and potatoes are cooked through.",
      "Season with salt and amchur; serve dry with roti or as a side with dal-rice."
    ]
  },
  {
    id: 28,
    title: "Mix Veg Dal",
    category: "Lunch",
    time: 40,
    calories: 340,
    servings: 3,
    description: "A hearty combination of three lentils cooked with seasonal vegetables, finished with a bright ghee tadka — wholesome Indian home cooking at its best.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=900",
    ingredients: [
      "¼ cup toor dal",
      "¼ cup moong dal",
      "¼ cup chana dal",
      "1 carrot, diced",
      "½ cup beans, chopped",
      "2 tomatoes, chopped",
      "1 tsp ginger-garlic paste",
      "½ tsp turmeric",
      "1 tsp cumin seeds",
      "1 tsp coriander powder",
      "½ tsp red chilli powder",
      "Salt to taste",
      "2 tbsp ghee",
      "Lemon juice and coriander to garnish"
    ],
    instructions: [
      "Rinse all three dals together; pressure cook with vegetables, tomatoes, turmeric, and water for 4 whistles.",
      "Open cooker, mash gently — the dal should be creamy but with some texture.",
      "Heat ghee in a small pan; add cumin seeds, then ginger-garlic paste; sauté for 1 minute.",
      "Add coriander powder, chilli powder, and pour in the cooked dal; simmer for 5 minutes.",
      "Squeeze lemon juice, garnish with coriander, and serve with roti or rice."
    ]
  },
  {
    id: 29,
    title: "Paneer Bhurji",
    category: "Lunch",
    time: 20,
    calories: 370,
    servings: 2,
    description: "Crumbled fresh paneer scrambled with onions, tomatoes, capsicum, and spices — a quick, protein-packed dish that works brilliantly as a roti filling.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=900",
    ingredients: [
      "250g fresh paneer, crumbled",
      "1 large onion, finely chopped",
      "2 tomatoes, finely chopped",
      "1 capsicum, finely chopped",
      "1 tsp cumin seeds",
      "½ tsp turmeric",
      "1 tsp coriander powder",
      "½ tsp red chilli powder",
      "½ tsp garam masala",
      "2 green chillies, chopped",
      "2 tbsp oil",
      "Salt to taste",
      "Fresh coriander to garnish"
    ],
    instructions: [
      "Heat oil in a pan; add cumin seeds, then onions and green chillies; sauté until onions turn pink.",
      "Add capsicum and sauté for 2 minutes, then add tomatoes and all spices; cook until tomatoes break down.",
      "Add crumbled paneer and mix well on medium heat for 3–4 minutes.",
      "Season with garam masala and salt; garnish generously with fresh coriander.",
      "Serve hot with roti, paratha, or as a wrap filling."
    ]
  },
  {
    id: 30,
    title: "Dhokla",
    category: "Lunch",
    time: 40,
    calories: 230,
    servings: 4,
    description: "Soft, spongy, and tangy steamed Gujarati chickpea-flour cakes tempered with mustard seeds, sesame, and curry leaves — light, healthy, and utterly addictive.",
    image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=900",
    ingredients: [
      "1 cup besan (gram flour)",
      "1 tbsp fine semolina",
      "½ cup yogurt",
      "1 tsp ginger-green chilli paste",
      "1 tsp lemon juice",
      "1 tsp Eno fruit salt",
      "Water as needed",
      "Salt to taste",
      "1 tbsp oil",
      "1 tsp mustard seeds",
      "2 tsp sesame seeds",
      "10 curry leaves",
      "1 tbsp sugar in ¼ cup water (for tempering liquid)"
    ],
    instructions: [
      "Mix besan, semolina, yogurt, ginger-chilli paste, lemon juice, salt, and water into a smooth, flowing batter.",
      "Just before steaming, add Eno fruit salt and mix gently until foamy.",
      "Pour batter into a greased steamer plate and steam for 15–18 minutes until a toothpick comes out clean.",
      "Let it cool slightly; for tempering, heat oil and splutter mustard seeds, sesame, and curry leaves; pour sugar water into the tempering and immediately spoon over the dhokla.",
      "Cut into squares and serve with green chutney and tamarind chutney."
    ]
  },
  {
    id: 31,
    title: "Veg Pulao",
    category: "Lunch",
    time: 35,
    calories: 390,
    servings: 3,
    description: "A fragrant, lightly spiced one-pot basmati rice cooked with colourful vegetables and whole spices — the perfect quick lunch that feels gourmet.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=900",
    ingredients: [
      "1½ cups basmati rice",
      "1 cup mixed vegetables (peas, carrot, beans, potato)",
      "1 onion, sliced",
      "1 tomato, chopped",
      "1 tsp cumin seeds",
      "2 green cardamom pods",
      "1 bay leaf",
      "1-inch cinnamon stick",
      "1-inch ginger, grated",
      "2 green chillies, slit",
      "2 tbsp ghee",
      "Salt to taste",
      "2.5 cups warm water"
    ],
    instructions: [
      "Wash and soak basmati rice for 20 minutes; drain.",
      "Heat ghee in a pot; add whole spices (cumin, cardamom, bay leaf, cinnamon) and let them temper.",
      "Add onions and sauté until golden, then add ginger, chillies, and tomato; cook 3 minutes.",
      "Add mixed vegetables and sauté for 2 minutes; then add drained rice and sauté for 1 minute.",
      "Pour warm water, add salt, bring to a boil; cover tightly and cook on lowest heat for 15 minutes; rest 5 minutes then fluff and serve."
    ]
  },
  {
    id: 32,
    title: "Bhel Puri",
    category: "Lunch",
    time: 15,
    calories: 240,
    servings: 2,
    description: "Mumbai's most beloved chaat — a crunchy medley of puffed rice, sev, diced vegetables, and tangy chutneys that must be eaten the moment it's tossed.",
    image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=900",
    ingredients: [
      "2 cups puffed rice (murmura)",
      "½ cup sev (thin chickpea noodles)",
      "1 medium potato, boiled and diced",
      "1 small onion, finely diced",
      "1 medium tomato, finely diced",
      "2 tbsp tamarind chutney",
      "2 tbsp green mint-coriander chutney",
      "1 tsp chaat masala",
      "Salt to taste",
      "Lemon juice",
      "Fresh coriander to garnish"
    ],
    instructions: [
      "In a large bowl, combine puffed rice, boiled potato, onion, and tomato.",
      "Add tamarind chutney, green chutney, chaat masala, and salt; toss vigorously.",
      "Squeeze in fresh lemon juice and mix once more.",
      "Top with generous amounts of sev and fresh coriander.",
      "Serve immediately — bhel puri loses its crunch within minutes!"
    ]
  },
  {
    id: 33,
    title: "Aloo Tamatar Sabzi",
    category: "Lunch",
    time: 25,
    calories: 260,
    servings: 2,
    description: "A simple, homestyle potato-tomato curry bursting with cumin, ginger, and coriander — a quintessential weekday dish paired with roti or puri.",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=900",
    ingredients: [
      "4 medium potatoes, peeled and cubed",
      "3 tomatoes, finely chopped",
      "1 tsp cumin seeds",
      "½ tsp turmeric",
      "1 tsp coriander powder",
      "½ tsp red chilli powder",
      "1-inch ginger, grated",
      "Salt to taste",
      "2 tbsp oil",
      "1 tsp dried fenugreek leaves (kasuri methi)",
      "Fresh coriander to garnish"
    ],
    instructions: [
      "Heat oil in a pan; add cumin seeds until they splutter, then add grated ginger.",
      "Add potatoes and sauté on medium heat for 5 minutes.",
      "Add all dry spices, stir well, then add tomatoes; cover and cook for 10 minutes until potatoes are soft.",
      "Add a splash of water if needed; crush a few potato pieces to thicken the gravy.",
      "Crush kasuri methi between your palms and stir in; garnish with coriander and serve with roti."
    ]
  },
  {
    id: 34,
    title: "Chana Masala",
    category: "Lunch",
    time: 50,
    calories: 400,
    servings: 3,
    description: "Robust, tangy chickpea curry infused with roasted spices, dried mango powder, and pomegranate seeds — a street-style chana that packs serious depth.",
    image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=900",
    ingredients: [
      "1½ cups white chickpeas, soaked overnight and boiled",
      "2 onions, finely chopped",
      "2 tomatoes, pureed",
      "2 green chillies",
      "1 tsp ginger-garlic paste",
      "2 tsp chana masala powder",
      "1 tsp cumin seeds",
      "1 tbsp dried pomegranate seeds (anardana)",
      "1 tsp amchur",
      "½ tsp garam masala",
      "2 tbsp oil",
      "Salt to taste",
      "Lemon juice, onion rings, coriander to serve"
    ],
    instructions: [
      "Heat oil; splutter cumin seeds then sauté onions until deep golden.",
      "Add ginger-garlic paste and cook 2 minutes; add tomato puree and all masalas except garam masala.",
      "Cook masala on medium heat until oil separates (8–10 minutes).",
      "Add boiled chickpeas with a little water; mash a few for texture; simmer 15 minutes.",
      "Add garam masala, lemon juice; garnish with onion rings and coriander — serve with kulcha or puri."
    ]
  },
  {
    id: 35,
    title: "Mushroom Masala",
    category: "Lunch",
    time: 30,
    calories: 310,
    servings: 2,
    description: "Meaty button mushrooms bathed in a silky, aromatic tomato-cashew gravy — a restaurant-worthy curry that's surprisingly quick and deeply satisfying.",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=900",
    ingredients: [
      "250g button mushrooms, quartered",
      "2 onions, finely chopped",
      "2 tomatoes, pureed",
      "10 cashews (soaked and blended to paste)",
      "1 tsp ginger-garlic paste",
      "1 tsp cumin seeds",
      "1 tsp coriander powder",
      "½ tsp red chilli powder",
      "½ tsp kashmiri chilli powder",
      "½ tsp garam masala",
      "2 tbsp oil",
      "Salt to taste",
      "Fresh cream and coriander to garnish"
    ],
    instructions: [
      "Heat oil; splutter cumin, then sauté onions until golden-brown.",
      "Add ginger-garlic paste; cook 1 minute, then add tomato puree and all dry spices.",
      "Cook masala until oil separates; stir in cashew paste and cook for 3 more minutes.",
      "Add mushrooms; toss to coat, cover, and cook on medium heat for 8–10 minutes until mushrooms are cooked through.",
      "Finish with garam masala, a drizzle of fresh cream, and coriander; serve with naan or rice."
    ]
  },

  // ─── DINNER (20 recipes) ──────────────────────────────────────────────────────
  {
    id: 36,
    title: "Matar Paneer",
    category: "Dinner",
    time: 35,
    calories: 420,
    servings: 3,
    description: "Fresh paneer cubes and green peas simmered in a velvety spiced tomato-onion gravy — a classic North Indian dinner that is comforting and deeply flavourful.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=900",
    ingredients: [
      "250g paneer, cubed",
      "1 cup fresh or frozen peas",
      "2 large onions, finely chopped",
      "3 tomatoes, pureed",
      "1 tsp ginger-garlic paste",
      "1 tsp cumin seeds",
      "1 tsp coriander powder",
      "½ tsp turmeric",
      "1 tsp red chilli powder",
      "½ tsp garam masala",
      "2 tbsp oil",
      "Salt to taste",
      "Fresh coriander to garnish"
    ],
    instructions: [
      "Lightly pan-fry paneer cubes in a little oil until golden on two sides; soak in warm water to keep soft.",
      "Heat oil; add cumin seeds and sauté onions until golden-brown.",
      "Add ginger-garlic paste and cook 2 minutes; add tomato puree and all dry spices; cook until oil separates.",
      "Add peas and ½ cup water; simmer 5 minutes, then fold in fried paneer.",
      "Simmer together for 5 more minutes; finish with garam masala and coriander; serve with roti or rice."
    ]
  },
  {
    id: 37,
    title: "Palak Paneer",
    category: "Dinner",
    time: 40,
    calories: 400,
    servings: 3,
    description: "Vibrant, restaurant-quality paneer in a smooth, vibrant spinach gravy brightened with cream and tempered with aromatic whole spices — absolutely luxurious.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=900",
    ingredients: [
      "250g fresh paneer, cubed",
      "4 cups fresh spinach (palak)",
      "1 large onion, chopped",
      "2 tomatoes, chopped",
      "5 garlic cloves",
      "1-inch ginger",
      "2 green chillies",
      "1 tsp cumin seeds",
      "½ tsp garam masala",
      "2 tbsp fresh cream",
      "2 tbsp oil or butter",
      "Salt to taste",
      "Pinch of nutmeg"
    ],
    instructions: [
      "Blanch spinach in boiling salted water for 2 minutes; immediately plunge into ice-cold water to retain the vivid green colour; drain and blend smooth.",
      "Pan-fry paneer cubes until golden; soak in warm water.",
      "Heat oil; add cumin seeds, then onions — sauté until golden; add garlic, ginger, chillies, and tomatoes; cook until soft.",
      "Add spinach puree and salt; simmer for 5 minutes, then fold in paneer.",
      "Stir in cream and a pinch of nutmeg; cook 2 more minutes; finish with garam masala and serve with naan."
    ]
  },
  {
    id: 38,
    title: "Shahi Paneer",
    category: "Dinner",
    time: 45,
    calories: 480,
    servings: 3,
    description: "Soft paneer cubes bathed in a regal, saffron-kissed cashew-cream gravy — a Mughal-inspired delicacy that belongs on every celebratory dinner table.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=900",
    ingredients: [
      "300g paneer, cubed",
      "2 large onions, roughly chopped",
      "15 cashews",
      "2 tbsp melon seeds (magaz)",
      "3 tomatoes, pureed",
      "½ cup fresh cream",
      "1-inch ginger",
      "4 garlic cloves",
      "1 tsp coriander powder",
      "½ tsp white pepper powder",
      "½ tsp cardamom powder",
      "A generous pinch of saffron soaked in warm milk",
      "2 tbsp butter",
      "Salt to taste"
    ],
    instructions: [
      "Boil onions, cashews, and melon seeds together for 10 minutes; cool and blend into a silky paste.",
      "Heat butter; add onion-cashew paste and cook on medium heat for 5 minutes.",
      "Add tomato puree and all dry spices; cook until oil separates from the masala.",
      "Stir in cream and saffron milk; cook on low heat for 5 minutes until a rich, golden gravy forms.",
      "Gently fold in paneer; simmer 5 minutes; taste and adjust salt — serve with sheermal, naan, or pulao."
    ]
  },
  {
    id: 39,
    title: "Kadhai Paneer",
    category: "Dinner",
    time: 35,
    calories: 440,
    servings: 3,
    description: "Paneer and capsicum stir-fried in a bold, freshly ground kadhai masala with whole coriander and cumin — cooked on high heat for a smoky, rustic character.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=900",
    ingredients: [
      "250g paneer, cut into thick strips",
      "1 large capsicum, cut into strips",
      "2 medium onions (1 blended, 1 cubed and petals separated)",
      "3 tomatoes, finely chopped",
      "1 tbsp fresh coriander seeds, coarsely crushed",
      "1 tsp cumin seeds",
      "1 tsp kashmiri red chilli powder",
      "½ tsp turmeric",
      "1 tsp ginger-garlic paste",
      "½ tsp garam masala",
      "1 tbsp kasuri methi",
      "2 tbsp oil",
      "Salt to taste"
    ],
    instructions: [
      "In a dry wok (kadhai), toast coriander seeds until fragrant; set aside.",
      "Heat oil in the same kadhai; sauté cubed onion petals and capsicum on high heat for 2 minutes — they should still have a little crunch.",
      "Add blended onion and ginger-garlic paste; cook until golden, then add tomatoes and all spices.",
      "Cook on high heat until the masala thickens and oil separates; fold in paneer strips.",
      "Crush kasuri methi and add; toss on high heat for 1–2 minutes; serve sizzling hot with tandoori roti."
    ]
  },
  {
    id: 40,
    title: "Paneer Butter Masala",
    category: "Dinner",
    time: 40,
    calories: 490,
    servings: 3,
    description: "Soft paneer in a velvety, mildly sweet tomato-butter-cream sauce — the Indian restaurant classic beloved by all ages, every occasion.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=900",
    ingredients: [
      "300g paneer, cubed",
      "3 large tomatoes, roughly chopped",
      "1 large onion, roughly chopped",
      "10 cashews",
      "5 garlic cloves",
      "1-inch ginger",
      "2 green cardamom pods",
      "2 tbsp butter",
      "1 tbsp oil",
      "1 tsp kashmiri red chilli powder",
      "1 tsp coriander powder",
      "½ tsp sugar",
      "3 tbsp fresh cream",
      "1 tbsp kasuri methi",
      "Salt to taste"
    ],
    instructions: [
      "Simmer onion, tomatoes, cashews, ginger, garlic, and cardamom in a little water for 15 minutes; cool and blend into a silky smooth sauce.",
      "Heat butter and oil together in a pan; add kashmiri chilli powder for the vibrant colour.",
      "Pour the blended tomato sauce; cook on medium heat for 10 minutes until it darkens and thickens.",
      "Add salt, sugar, and cream; stir well and simmer on low heat for 5 minutes.",
      "Add paneer cubes; heat through for 3 minutes; finish with crushed kasuri methi and a swirl of cream."
    ]
  },
  {
    id: 41,
    title: "Aloo Gobhi",
    category: "Dinner",
    time: 30,
    calories: 300,
    servings: 3,
    description: "A dry, home-style stir-fry of potatoes and cauliflower with cumin, ginger, and warming spices — the most reliable and comforting everyday sabzi.",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=900",
    ingredients: [
      "2 medium potatoes, cubed",
      "½ medium cauliflower, cut into florets",
      "1 tsp cumin seeds",
      "½ tsp turmeric",
      "1 tsp coriander powder",
      "½ tsp red chilli powder",
      "1-inch ginger, julienned",
      "1 green chilli, slit",
      "1 tsp amchur (optional)",
      "Salt to taste",
      "2 tbsp oil",
      "Fresh coriander to garnish"
    ],
    instructions: [
      "Heat oil in a wide pan; add cumin seeds and ginger — sauté for 30 seconds.",
      "Add potato cubes; stir-fry on medium heat for 5 minutes until they start to colour.",
      "Add cauliflower florets, turmeric, coriander powder, chilli powder, and salt; mix well.",
      "Cover and cook on low-medium heat for 12–15 minutes, stirring occasionally, until both vegetables are tender.",
      "Uncover, increase heat, and cook for 2–3 minutes to dry out any moisture; add amchur, garnish with coriander."
    ]
  },
  {
    id: 42,
    title: "Aloo Pyaz Sabzi",
    category: "Dinner",
    time: 25,
    calories: 280,
    servings: 2,
    description: "Tender potato and onion cooked with whole spices and nigella seeds in a dry, rustic style — a simple, deeply flavourful sabzi that is a staple in North Indian homes.",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=900",
    ingredients: [
      "3 medium potatoes, cubed",
      "2 medium onions, cut into thick wedges",
      "1 tsp cumin seeds",
      "½ tsp nigella seeds (kalonji)",
      "½ tsp turmeric",
      "1 tsp coriander powder",
      "½ tsp red chilli powder",
      "Salt to taste",
      "2 tbsp mustard oil",
      "Fresh coriander and green chilli to garnish"
    ],
    instructions: [
      "Heat mustard oil to smoking point; reduce heat and add cumin seeds and kalonji — let them splutter.",
      "Add potato cubes and stir-fry for 5 minutes on medium-high heat.",
      "Add onion wedges and all spices; mix well and cook covered on medium-low heat for 12 minutes.",
      "Stir occasionally to prevent sticking; uncover and cook on high heat for 2 minutes to caramelise edges.",
      "Adjust salt; garnish with fresh coriander and serve with freshly made rotis."
    ]
  },
  {
    id: 43,
    title: "Bhindi Masala",
    category: "Dinner",
    time: 25,
    calories: 240,
    servings: 2,
    description: "Crispy, non-slimy okra sautéed with onions, tomatoes, and tangy spices in a dry masala — the secret is high heat and no water.",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=900",
    ingredients: [
      "250g okra (bhindi), washed and completely dried",
      "1 large onion, sliced",
      "1 tomato, finely chopped",
      "1 tsp cumin seeds",
      "½ tsp turmeric",
      "1 tsp coriander powder",
      "½ tsp red chilli powder",
      "1 tsp amchur (dry mango powder)",
      "Salt to taste",
      "2 tbsp oil"
    ],
    instructions: [
      "Cut dried bhindi into 1-inch pieces — ensure they are completely dry to avoid sliminess.",
      "Heat 1 tbsp oil in a wide pan on high heat; fry bhindi in a single layer without stirring for 5 minutes; set aside.",
      "In the same pan, heat remaining oil; add cumin seeds, then onion — sauté until golden.",
      "Add tomatoes and all spices; cook until tomatoes break down (3–4 minutes).",
      "Add fried bhindi; toss on high heat for 2–3 minutes; add amchur, adjust salt, and serve with roti."
    ]
  },
  {
    id: 44,
    title: "Gajar Matar Sabzi",
    category: "Dinner",
    time: 25,
    calories: 220,
    servings: 2,
    description: "Sweet garden carrots and fresh green peas stir-fried with cumin and coriander — a light, colourful, nutritious winter vegetable side dish.",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=900",
    ingredients: [
      "2 large carrots, peeled and diced",
      "1 cup fresh green peas",
      "1 tsp cumin seeds",
      "½ tsp turmeric",
      "1 tsp coriander powder",
      "½ tsp red chilli powder",
      "½ tsp amchur",
      "Salt to taste",
      "2 tbsp oil",
      "Fresh coriander to garnish"
    ],
    instructions: [
      "Heat oil in a pan; add cumin seeds and let them splutter.",
      "Add diced carrots; stir-fry on medium heat for 5 minutes until they start to soften.",
      "Add green peas, turmeric, coriander powder, chilli powder, and salt; mix well.",
      "Cover and cook on low heat for 8–10 minutes until both vegetables are tender.",
      "Uncover; cook on high heat for 2 minutes to dry out moisture; add amchur, garnish with coriander, and serve."
    ]
  },
  {
    id: 45,
    title: "Matar Paneer Khurchan",
    category: "Dinner",
    time: 30,
    calories: 450,
    servings: 2,
    description: "A rich, restaurant-style dry preparation of paneer and peas cooked on a hot tawa with capsicum, tomatoes, and bold spices — crispy edges, intense flavour.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=900",
    ingredients: [
      "250g paneer, roughly broken or thickly sliced",
      "½ cup fresh peas",
      "1 capsicum, diced",
      "1 large onion, diced",
      "2 tomatoes, finely chopped",
      "1 tsp ginger-garlic paste",
      "1 tsp kashmiri chilli powder",
      "½ tsp cumin powder",
      "½ tsp garam masala",
      "1 tbsp kasuri methi",
      "2 tbsp butter",
      "Salt to taste"
    ],
    instructions: [
      "Heat a flat tawa or heavy pan; melt butter and sauté onion and capsicum on high heat for 2 minutes.",
      "Add ginger-garlic paste and cook for 1 minute; add tomatoes and all spices.",
      "Cook on high heat, scraping the bottom of the tawa — this 'khurchan' (scraping) develops deep flavour.",
      "Add peas and paneer pieces; keep tossing on high heat for 5–6 minutes until everything is well-coated.",
      "Crush kasuri methi, add garam masala, adjust salt, and serve immediately with tandoori roti."
    ]
  },
  {
    id: 46,
    title: "Palak Aloo Sabzi",
    category: "Dinner",
    time: 30,
    calories: 310,
    servings: 2,
    description: "Iron-rich spinach and tender potatoes cooked together with ginger, garlic, and warming spices — a wholesome, nutritious dinner favourite.",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=900",
    ingredients: [
      "2 cups fresh spinach, roughly chopped",
      "2 medium potatoes, cubed",
      "1 tsp cumin seeds",
      "1 small onion, finely chopped",
      "2 garlic cloves, minced",
      "1-inch ginger, grated",
      "½ tsp turmeric",
      "1 tsp coriander powder",
      "½ tsp red chilli powder",
      "Salt to taste",
      "2 tbsp oil"
    ],
    instructions: [
      "Heat oil; add cumin seeds, then sauté onions with ginger and garlic until golden.",
      "Add potato cubes and all spices; toss well and cook covered for 10 minutes.",
      "Add fresh spinach on top; cover and let steam for 3 minutes until spinach wilts.",
      "Stir everything together gently; cook uncovered on medium heat for 5 more minutes.",
      "Adjust salt; serve hot with roti or as a side with dal-rice."
    ]
  },
  {
    id: 47,
    title: "Paneer Do Pyaza",
    category: "Dinner",
    time: 35,
    calories: 460,
    servings: 3,
    description: "Paneer cooked with a double dose of onions — once in the masala and once as caramelised petals stirred in at the end — creating layers of sweet, spiced depth.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=900",
    ingredients: [
      "300g paneer, cubed",
      "3 large onions (2 for masala, 1 cut into petals)",
      "2 tomatoes, pureed",
      "1 tsp ginger-garlic paste",
      "1 tsp cumin seeds",
      "2 green cardamom pods",
      "1 tsp coriander powder",
      "½ tsp turmeric",
      "1 tsp red chilli powder",
      "½ tsp garam masala",
      "2 tbsp oil or ghee",
      "Salt to taste"
    ],
    instructions: [
      "Heat oil or ghee; add cumin seeds and cardamom, then finely chopped onions — cook until deep golden.",
      "Add ginger-garlic paste and cook 2 minutes; add tomato puree and all spices (except garam masala); cook until oil separates.",
      "Add paneer cubes; stir to coat; cook 5 minutes.",
      "In a separate pan, quickly sauté onion petals in a little ghee on high heat for 2–3 minutes — they should retain some crunch.",
      "Fold sautéed onion petals into the paneer curry; add garam masala, adjust salt, and serve with naan."
    ]
  },
  {
    id: 48,
    title: "Lauki Sabzi",
    category: "Dinner",
    time: 25,
    calories: 200,
    servings: 2,
    description: "Light, cooling bottle gourd simmered with coriander, cumin, and green chilli in a minimal, wholesome gravy — perfect for a light, digestive dinner.",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=900",
    ingredients: [
      "1 medium lauki (bottle gourd), peeled and cubed",
      "1 small onion, finely chopped",
      "2 tomatoes, finely chopped",
      "½ tsp cumin seeds",
      "½ tsp turmeric",
      "1 tsp coriander powder",
      "1 green chilli, slit",
      "Salt to taste",
      "1 tbsp oil",
      "Fresh coriander to garnish"
    ],
    instructions: [
      "Heat oil; add cumin seeds and green chilli, then onions — sauté until translucent.",
      "Add tomatoes and spices; cook until tomatoes soften into a thick masala (5 minutes).",
      "Add lauki cubes; mix well and cook covered on medium heat for 12–15 minutes until tender.",
      "No need to add extra water — lauki releases its own moisture.",
      "Adjust salt; garnish with coriander and serve as a light dinner with roti and dal."
    ]
  },
  {
    id: 49,
    title: "Tinda Masala",
    category: "Dinner",
    time: 25,
    calories: 220,
    servings: 2,
    description: "Round baby gourds (tinda) stir-fried in a simple onion-tomato masala with whole spices — a classic North Indian everyday sabzi with gentle, homestyle flavour.",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=900",
    ingredients: [
      "250g tinda (round gourd/baby apple gourd), peeled and quartered",
      "1 small onion, finely chopped",
      "2 tomatoes, finely chopped",
      "1 tsp cumin seeds",
      "½ tsp turmeric",
      "1 tsp coriander powder",
      "½ tsp red chilli powder",
      "Salt to taste",
      "2 tbsp oil",
      "Fresh coriander to garnish"
    ],
    instructions: [
      "Heat oil; add cumin seeds until they splutter, then sauté onions until golden.",
      "Add tomatoes and all spices; cook until tomatoes turn soft and mushy.",
      "Add tinda pieces; stir well, cover, and cook on medium heat for 15 minutes until tender.",
      "Uncover and cook for 2 minutes to reduce excess moisture.",
      "Season and garnish with fresh coriander; serve with roti or phulka."
    ]
  },
  {
    id: 50,
    title: "Stuffed Shimla Mirch",
    category: "Dinner",
    time: 35,
    calories: 340,
    servings: 2,
    description: "Vibrant bell peppers stuffed with a tangy spiced potato-paneer filling and roasted until tender — an impressive, flavour-packed dinner centrepiece.",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=900",
    ingredients: [
      "4 medium capsicums (any colour), tops cut and seeds removed",
      "2 medium potatoes, boiled and mashed",
      "100g paneer, crumbled",
      "1 small onion, finely chopped",
      "1 tsp cumin seeds",
      "½ tsp amchur",
      "½ tsp red chilli powder",
      "½ tsp garam masala",
      "Salt to taste",
      "2 tbsp oil",
      "Fresh coriander"
    ],
    instructions: [
      "Make the filling: heat oil, sauté onions until golden, add mashed potato, crumbled paneer, and all spices; cook 3 minutes; cool slightly.",
      "Stuff each capsicum firmly with the potato-paneer mixture.",
      "Heat oil in a wide, lidded pan; stand stuffed capsicums upright (or lay them).",
      "Cover and cook on low heat for 20 minutes, turning gently once halfway, until capsicums are tender but hold their shape.",
      "Serve garnished with coriander alongside dal and rice."
    ]
  },
  {
    id: 51,
    title: "Dal Fry",
    category: "Dinner",
    time: 35,
    calories: 330,
    servings: 3,
    description: "Restaurant-style yellow dal with a lavish, smoky ghee-and-garlic tadka poured tableside — the simplest dal elevated into an unforgettable experience.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=900",
    ingredients: [
      "¾ cup toor dal, rinsed",
      "2 tomatoes, finely chopped",
      "1 small onion, finely chopped",
      "2 green chillies, slit",
      "½ tsp turmeric",
      "Salt to taste",
      "2.5 cups water",
      "2 tbsp ghee",
      "1 tsp cumin seeds",
      "5 garlic cloves, sliced",
      "1 tsp kashmiri red chilli powder",
      "Lemon juice and coriander to serve"
    ],
    instructions: [
      "Pressure cook toor dal with water, tomatoes, onion, chillies, turmeric, and salt for 3 whistles.",
      "Mash gently and simmer with extra water for 5 minutes until creamy.",
      "Heat ghee in a small pan until hot; add cumin seeds and let them crackle.",
      "Add garlic slices; fry until golden and crisp; add kashmiri chilli powder — it will sizzle dramatically in the hot ghee.",
      "Pour the entire golden tadka over the dal; squeeze lemon, garnish with coriander, and serve with hot rotis."
    ]
  },
  {
    id: 52,
    title: "Rajma with Steamed Rice",
    category: "Dinner",
    time: 55,
    calories: 500,
    servings: 3,
    description: "Hearty kidney beans slow-cooked in a deeply spiced North Indian gravy — served over white rice for a complete, satisfying dinner.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=900",
    ingredients: [
      "1½ cups red kidney beans, soaked overnight",
      "2 onions, finely chopped",
      "3 tomatoes, pureed",
      "5 garlic cloves, minced",
      "1-inch ginger, grated",
      "2 tsp rajma masala",
      "1 tsp cumin seeds",
      "½ tsp garam masala",
      "Salt to taste",
      "2 tbsp oil",
      "2 cups basmati rice, cooked",
      "Ghee, fresh coriander to serve"
    ],
    instructions: [
      "Pressure cook soaked kidney beans with salt and water until very soft (8–10 whistles or 40 minutes).",
      "Heat oil; splutter cumin, then deeply caramelise onions (12–15 minutes) for the best base.",
      "Add garlic, ginger, tomato puree, and rajma masala; cook until oil separates.",
      "Add boiled beans with cooking water; simmer for 20 minutes, mashing a few beans against the pot.",
      "Finish with garam masala; drizzle ghee, garnish with coriander, and serve over steamed basmati rice."
    ]
  },
  {
    id: 53,
    title: "Aloo Matar Sabzi",
    category: "Dinner",
    time: 30,
    calories: 310,
    servings: 2,
    description: "Classic potato and green pea curry in a lightly spiced tomato-ginger gravy — one of the most comforting, dependable North Indian dinner staples.",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=900",
    ingredients: [
      "3 medium potatoes, cubed",
      "1 cup green peas",
      "2 tomatoes, chopped",
      "1 small onion, chopped",
      "1-inch ginger, grated",
      "1 tsp cumin seeds",
      "½ tsp turmeric",
      "1 tsp coriander powder",
      "½ tsp red chilli powder",
      "Salt to taste",
      "2 tbsp oil",
      "Fresh coriander to garnish"
    ],
    instructions: [
      "Heat oil; add cumin seeds and sauté onions with ginger until golden.",
      "Add tomatoes and all spices; cook until tomatoes break down into a thick masala.",
      "Add potato cubes; stir to coat; cook covered for 10 minutes.",
      "Add green peas and ¼ cup water; cover and cook for another 8–10 minutes until potatoes are fully tender.",
      "Adjust salt and consistency; garnish with coriander — serve with hot phulka rotis."
    ]
  },
  {
    id: 54,
    title: "Mix Sabzi",
    category: "Dinner",
    time: 35,
    calories: 290,
    servings: 3,
    description: "A colourful medley of seasonal vegetables cooked in a lightly spiced tomato base — versatile, nutritious, and a true celebration of India's diverse produce.",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=900",
    ingredients: [
      "1 cup cauliflower florets",
      "1 medium potato, cubed",
      "1 carrot, diced",
      "½ cup green beans, cut",
      "½ cup peas",
      "2 tomatoes, finely chopped",
      "1 large onion, finely chopped",
      "1 tsp ginger-garlic paste",
      "1 tsp cumin seeds",
      "½ tsp turmeric",
      "1 tsp coriander powder",
      "½ tsp red chilli powder",
      "½ tsp garam masala",
      "2 tbsp oil",
      "Salt to taste"
    ],
    instructions: [
      "Heat oil; add cumin seeds, then onions — sauté until golden.",
      "Add ginger-garlic paste and cook 1 minute; add tomatoes and all dry spices; cook until oil separates.",
      "Add potatoes and carrots first; cook covered for 8 minutes.",
      "Add cauliflower, beans, and peas; mix well, cover, and cook on medium heat for 10 more minutes until all vegetables are tender.",
      "Finish with garam masala; adjust salt and serve with roti, paratha, or rice."
    ]
  },
  {
    id: 55,
    title: "Paneer Lababdar",
    category: "Dinner",
    time: 40,
    calories: 470,
    servings: 3,
    description: "Paneer in a rich, indulgent tomato-onion sauce made aromatic with roasted whole spices and finished with cream — a Punjabi restaurant gem at home.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=900",
    ingredients: [
      "300g paneer, cubed",
      "3 large tomatoes, pureed",
      "2 onions, finely chopped",
      "5 cashews (soaked and blended)",
      "1 tsp ginger-garlic paste",
      "1 tsp cumin seeds",
      "2 dried red chillies",
      "1 tsp coriander powder",
      "1 tsp red chilli powder",
      "½ tsp garam masala",
      "2 tbsp fresh cream",
      "2 tbsp butter",
      "1 tsp kasuri methi",
      "Salt to taste"
    ],
    instructions: [
      "Heat butter; add cumin seeds and dried red chillies for 30 seconds, then deeply sauté onions.",
      "Add ginger-garlic paste; cook 2 minutes; add tomato puree and all spices; cook until oil separates.",
      "Stir in cashew paste and cook on medium heat for 5 more minutes until gravy thickens.",
      "Add cream and fold in paneer; simmer on low heat for 5 minutes.",
      "Crush kasuri methi, stir in garam masala, adjust salt; serve with garlic naan or steamed rice."
    ]
  },

  // ─── SNACK (15 recipes) ──────────────────────────────────────────────────────
  {
    id: 56,
    title: "Khandvi",
    category: "Snack",
    time: 30,
    calories: 190,
    servings: 4,
    description: "Delicate, paper-thin besan rolls perfumed with ginger-green chilli and tempered with sesame and curry leaves — a prized Gujarati snack that melts in the mouth.",
    image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=900",
    ingredients: [
      "1 cup besan (gram flour)",
      "2 cups buttermilk",
      "1 tsp ginger-green chilli paste",
      "½ tsp turmeric",
      "Salt to taste",
      "1 tbsp oil",
      "1 tsp mustard seeds",
      "2 tsp sesame seeds",
      "10 curry leaves",
      "Fresh coriander and grated coconut to garnish"
    ],
    instructions: [
      "Whisk besan with buttermilk, ginger-chilli paste, turmeric, and salt until completely smooth and lump-free.",
      "Cook the mixture in a non-stick pan on medium heat, stirring continuously, until it becomes very thick and pulls away from the sides (10–12 minutes).",
      "Working quickly, spread thin layers of the hot mixture onto greased plates or a marble counter; let it cool for 5 minutes.",
      "Roll up carefully into tight cylinders; arrange on a serving plate.",
      "Heat oil; add mustard seeds, sesame seeds, and curry leaves; pour the sizzling tadka over the rolls; garnish with coconut and coriander."
    ]
  },
  {
    id: 57,
    title: "Samosa",
    category: "Snack",
    time: 60,
    calories: 290,
    servings: 4,
    description: "Crispy, flaky triangular pastry filled with a spiced potato-pea mixture — the most iconic Indian snack, perfect with mint chutney and masala chai.",
    image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=900",
    ingredients: [
      "2 cups all-purpose flour (maida)",
      "4 tbsp ghee or oil (for dough)",
      "Water to knead",
      "Oil for deep frying",
      "3 medium potatoes, boiled and roughly mashed",
      "½ cup peas",
      "1 tsp cumin seeds",
      "1 tsp coriander seeds, crushed",
      "½ tsp amchur",
      "½ tsp garam masala",
      "1 tsp red chilli powder",
      "Salt to taste",
      "Fresh coriander, chopped"
    ],
    instructions: [
      "Make a stiff dough with maida, ghee, salt, and cold water; rest covered for 20 minutes.",
      "Cook samosa filling: heat oil, splutter cumin and coriander seeds, add peas and all spices; fold in mashed potato and coriander; cool completely.",
      "Divide dough into balls; roll into oval shapes, cut in half; form each half into a cone, fill with potato mixture, and seal edges with water pressure.",
      "Deep fry in medium-hot oil (not very hot) for 8–10 minutes, turning occasionally, until golden-brown and very crisp.",
      "Drain and serve with mint-coriander chutney and tamarind chutney."
    ]
  },
  {
    id: 58,
    title: "Aloo Tikki",
    category: "Snack",
    time: 30,
    calories: 250,
    servings: 3,
    description: "Crispy, golden potato patties seasoned with spices and fresh coriander — a beloved chaat base that is crunchy outside, fluffy inside, and endlessly satisfying.",
    image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=900",
    ingredients: [
      "4 large potatoes, boiled and mashed",
      "1 tsp cumin seeds, dry roasted and ground",
      "1 tsp amchur",
      "½ tsp red chilli powder",
      "½ tsp garam masala",
      "2 tbsp fresh coriander, chopped",
      "2 green chillies, finely chopped",
      "2 tbsp bread crumbs (or rice flour) for coating",
      "Salt to taste",
      "Oil for shallow frying"
    ],
    instructions: [
      "Mix mashed potatoes with all spices, coriander, green chillies, and salt until well combined.",
      "Divide into equal portions; shape into flat, round patties about 1.5 cm thick.",
      "Coat each tikki lightly with bread crumbs; this creates a crisp outer shell.",
      "Heat oil in a flat pan; shallow fry tikkis on medium heat for 3–4 minutes per side until deeply golden and crisp.",
      "Serve hot with green chutney, tamarind chutney, and a dollop of yogurt."
    ]
  },
  {
    id: 59,
    title: "Pani Puri",
    category: "Snack",
    time: 20,
    calories: 180,
    servings: 4,
    description: "Hollow crispy spheres filled with spiced potato-chickpea mixture and dunked in ice-cold, tangy, minty pani — the ultimate Indian street food experience.",
    image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=900",
    ingredients: [
      "24 ready-made puris (or homemade)",
      "2 medium potatoes, boiled and mashed",
      "½ cup boiled chickpeas",
      "1 tsp chaat masala",
      "Salt to taste",
      "1 cup fresh mint leaves",
      "½ cup fresh coriander",
      "2 green chillies",
      "1 tsp roasted cumin powder",
      "1 tsp black salt (kala namak)",
      "1 tbsp tamarind paste",
      "Juice of 2 lemons",
      "3 cups ice-cold water"
    ],
    instructions: [
      "Blend mint, coriander, green chillies with lemon juice, roasted cumin, black salt, tamarind paste, and water into a smooth, strained pani; chill for 30 minutes.",
      "Mix mashed potato with chickpeas, chaat masala, and salt for the filling.",
      "Make a small hole in the top of each puri; fill with a teaspoon of potato mixture.",
      "Dip filled puri straight into the pani or pour pani generously into the hollow.",
      "Eat immediately in one bite — the pop-and-burst experience is non-negotiable!"
    ]
  },
  {
    id: 60,
    title: "Vada Pav",
    category: "Snack",
    time: 40,
    calories: 350,
    servings: 3,
    description: "Mumbai's favourite street food — a spiced potato vada dipped in golden gram-flour batter and fried, then nestled in a soft pav with fiery dry garlic chutney.",
    image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=900",
    ingredients: [
      "4 medium potatoes, boiled and mashed",
      "1 tsp mustard seeds",
      "2 green chillies, finely chopped",
      "1-inch ginger, grated",
      "10 curry leaves",
      "½ tsp turmeric",
      "1 cup besan for batter",
      "Water for batter",
      "Salt to taste",
      "Oil for deep frying",
      "6 pav buns",
      "Dry garlic chutney and green chutney to serve"
    ],
    instructions: [
      "Make the filling: heat oil, splutter mustard seeds, add curry leaves, ginger, chillies, and turmeric; fold in mashed potato; cool.",
      "Roll into smooth balls.",
      "Make a medium-thick batter with besan, salt, and water.",
      "Dip each potato ball into the besan batter and deep fry in hot oil until golden and crisp.",
      "Split pav buns; spread dry garlic chutney and green chutney inside; place the hot vada and serve immediately."
    ]
  },
  {
    id: 61,
    title: "Dahi Puri",
    category: "Snack",
    time: 20,
    calories: 220,
    servings: 3,
    description: "Crispy puris filled with potato, chickpeas, and sweetened chilled yogurt, finished with chutneys and sev — a cooling, indulgent Mumbai chaat.",
    image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=900",
    ingredients: [
      "18 ready-made small puris",
      "2 medium potatoes, boiled and mashed",
      "½ cup boiled chickpeas",
      "1 cup chilled whisked yogurt (sweetened with 1 tsp sugar)",
      "2 tbsp tamarind chutney",
      "2 tbsp green chutney",
      "1 tsp chaat masala",
      "Sev for topping",
      "Fresh coriander and pomegranate seeds to garnish"
    ],
    instructions: [
      "Crack a small hole in each puri; fill with a mixture of mashed potato and chickpeas.",
      "Pour a generous spoonful of sweetened chilled yogurt over each puri.",
      "Drizzle tamarind chutney and green chutney over the yogurt.",
      "Sprinkle chaat masala and sev liberally.",
      "Garnish with coriander and pomegranate seeds; serve immediately."
    ]
  },
  {
    id: 62,
    title: "Papdi Chaat",
    category: "Snack",
    time: 20,
    calories: 280,
    servings: 3,
    description: "Crispy flour wafers layered with potato, chickpeas, yogurt, chutneys, and spices — the quintessential North Indian chaat that is sweet, tangy, spicy, and crunchy all at once.",
    image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=900",
    ingredients: [
      "20 ready-made papdi (small flour crackers)",
      "2 boiled potatoes, diced",
      "½ cup boiled chickpeas",
      "1 cup yogurt, whisked smooth",
      "3 tbsp tamarind chutney",
      "2 tbsp green chutney",
      "1 tsp chaat masala",
      "½ tsp cumin powder",
      "Sev and pomegranate seeds",
      "Fresh coriander leaves"
    ],
    instructions: [
      "Arrange papdi on a wide plate.",
      "Top with boiled potato and chickpeas.",
      "Pour whisked yogurt generously over everything.",
      "Drizzle tamarind chutney (sweet) and green chutney (spicy) over the yogurt.",
      "Sprinkle chaat masala, cumin powder, sev, pomegranate seeds, and coriander; serve at once."
    ]
  },
  {
    id: 63,
    title: "Makhana Chaat",
    category: "Snack",
    time: 15,
    calories: 160,
    servings: 2,
    description: "Crispy roasted fox-nut puffs tossed with chilli, chaat masala, and lemon juice — a light, protein-rich snack that is healthy and deeply moreish.",
    image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=900",
    ingredients: [
      "2 cups makhana (fox nuts/lotus seeds)",
      "1 tsp ghee",
      "½ tsp chaat masala",
      "¼ tsp black pepper",
      "¼ tsp cumin powder",
      "¼ tsp red chilli powder",
      "Salt to taste",
      "Squeeze of lemon juice"
    ],
    instructions: [
      "Heat ghee in a pan on low heat; add makhana and roast, stirring continuously, for 8–10 minutes until crisp.",
      "They should feel light and crunch when bitten — if not, roast 2–3 more minutes.",
      "Remove from heat; immediately sprinkle chaat masala, cumin powder, chilli powder, salt, and black pepper.",
      "Squeeze lemon juice and toss well to coat evenly.",
      "Cool completely before serving — they crisp up further as they cool; store in an airtight box."
    ]
  },
  {
    id: 64,
    title: "Corn Chaat",
    category: "Snack",
    time: 15,
    calories: 190,
    servings: 2,
    description: "Sweet, juicy corn kernels tossed in butter, lemon, chaat masala, and green chilli — a street-stall classic that takes just minutes to make.",
    image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=900",
    ingredients: [
      "2 cups sweet corn kernels (boiled or canned)",
      "1 tbsp butter",
      "1 tsp chaat masala",
      "½ tsp cumin powder",
      "1 green chilli, finely chopped",
      "Salt to taste",
      "Juice of 1 lemon",
      "Fresh coriander, chopped"
    ],
    instructions: [
      "If using fresh corn, boil ears for 5–7 minutes; cut off kernels.",
      "Heat butter in a pan; add corn and sauté on high heat for 3 minutes until some kernels get a slight char.",
      "Add green chilli and all spices; toss well.",
      "Squeeze fresh lemon juice and mix.",
      "Garnish with coriander and serve hot, ideally in small cups."
    ]
  },
  {
    id: 65,
    title: "Dabeli",
    category: "Snack",
    time: 30,
    calories: 310,
    servings: 3,
    description: "A Kutchi masterpiece — spiced sweet-tangy potato filling with peanuts and pomegranate stuffed inside buttered pav, topped with chutneys and sev.",
    image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=900",
    ingredients: [
      "4 medium potatoes, boiled and mashed",
      "2 tbsp dabeli masala",
      "1 tbsp tamarind chutney",
      "1 tbsp jaggery",
      "2 tbsp roasted peanuts",
      "2 tbsp pomegranate seeds",
      "6 pav buns",
      "2 tbsp butter",
      "Sev, green chutney, and date-tamarind chutney to serve"
    ],
    instructions: [
      "Mix mashed potato with dabeli masala, tamarind chutney, jaggery, and salt; taste — it should be sweet, tangy, and spiced.",
      "Add roasted peanuts and pomegranate seeds to the filling.",
      "Split pav buns; toast face-down on a buttered tawa until golden and crisp.",
      "Spread green chutney inside one side and date-tamarind chutney on the other; fill generously with potato mixture.",
      "Press the pav closed; roll the edges in sev; serve immediately."
    ]
  },
  {
    id: 66,
    title: "Onion Pakora",
    category: "Snack",
    time: 20,
    calories: 240,
    servings: 3,
    description: "Crispy, golden deep-fried onion fritters in a spiced gram-flour batter — the definitive Indian monsoon snack, perfect alongside a piping hot cup of chai.",
    image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=900",
    ingredients: [
      "2 large onions, thinly sliced",
      "1 cup besan (gram flour)",
      "2 tbsp rice flour (for extra crunch)",
      "1 tsp red chilli powder",
      "½ tsp ajwain (carom seeds)",
      "½ tsp cumin seeds",
      "2 green chillies, finely chopped",
      "Fresh coriander, chopped",
      "Salt to taste",
      "Water to make batter",
      "Oil for deep frying"
    ],
    instructions: [
      "In a wide bowl, combine sliced onions with besan, rice flour, all spices, green chillies, and coriander.",
      "Add salt and mix well — the onions will release moisture; add minimal water to bring everything together into a thick, sticky batter.",
      "Heat oil for deep frying; drop rough clumps of the onion-batter mixture into hot oil.",
      "Fry on medium heat for 4–5 minutes, turning once, until deeply golden and very crisp.",
      "Drain on paper towels; serve immediately with green chutney and masala chai."
    ]
  },
  {
    id: 67,
    title: "Murmura Bhel",
    category: "Snack",
    time: 10,
    calories: 160,
    servings: 2,
    description: "A light, spicy, oil-free puffed rice chaat tossed with raw vegetables and punchy chutneys — a supremely easy healthy snack ready in under 10 minutes.",
    image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=900",
    ingredients: [
      "2 cups puffed rice (murmura)",
      "1 small onion, finely diced",
      "1 tomato, finely diced",
      "1 small boiled potato, diced",
      "1 green chilli, finely chopped",
      "1 tsp chaat masala",
      "1 tbsp tamarind chutney",
      "1 tbsp green chutney",
      "Salt to taste",
      "Lemon juice",
      "Sev and coriander to garnish"
    ],
    instructions: [
      "In a large bowl, combine puffed rice with onion, tomato, potato, and green chilli.",
      "Add both chutneys, chaat masala, and salt; toss vigorously.",
      "Squeeze in fresh lemon juice and toss once more.",
      "Top with thin sev and fresh coriander.",
      "Serve instantly before the puffed rice absorbs moisture and loses crunch."
    ]
  },
  {
    id: 68,
    title: "Roasted Chana Chaat",
    category: "Snack",
    time: 10,
    calories: 190,
    servings: 2,
    description: "Crunchy roasted chickpeas tossed with onion, tomato, raw mango, and bold chaat spices — a fibre-rich, protein-packed snack with zero oil needed.",
    image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=900",
    ingredients: [
      "1½ cups roasted chickpeas (bhuna chana)",
      "1 small onion, finely chopped",
      "1 tomato, finely chopped",
      "½ raw mango, grated (or 1 tsp amchur)",
      "1 green chilli, finely chopped",
      "1 tsp chaat masala",
      "½ tsp cumin powder",
      "Salt to taste",
      "Lemon juice",
      "Fresh coriander"
    ],
    instructions: [
      "In a mixing bowl, combine roasted chickpeas with onion, tomato, raw mango, and green chilli.",
      "Add chaat masala, cumin powder, and salt; toss well.",
      "Squeeze fresh lemon juice and mix.",
      "Taste and adjust seasoning — it should be tangy, spicy, and lightly salty.",
      "Garnish with coriander and serve immediately."
    ]
  },
  {
    id: 69,
    title: "Mirchi Bajji",
    category: "Snack",
    time: 25,
    calories: 220,
    servings: 2,
    description: "Large green chillies stuffed with a tangy tamarind-peanut filling and dipped in a crispy besan batter — a popular Andhra and Hyderabad street snack.",
    image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=900",
    ingredients: [
      "6 large Bhavnagari chillies (mild variety)",
      "1 cup besan",
      "½ tsp red chilli powder",
      "½ tsp ajwain",
      "Salt to taste",
      "Water for batter",
      "Oil for deep frying",
      "2 tbsp roasted peanuts, coarsely ground",
      "1 tsp tamarind paste",
      "1 tsp cumin powder (for filling)"
    ],
    instructions: [
      "Slit chillies lengthwise; remove seeds if you prefer mild.",
      "Mix peanuts, tamarind paste, cumin powder, and salt into a rough filling; stuff each chilli.",
      "Make a smooth, medium-thick batter with besan, chilli powder, ajwain, salt, and water.",
      "Dip stuffed chillies into batter, coating completely.",
      "Deep fry in hot oil for 3–4 minutes until golden and crisp; drain and serve hot with onion rings and chutney."
    ]
  },
  {
    id: 70,
    title: "Paneer Tikka",
    category: "Snack",
    time: 30,
    calories: 310,
    servings: 3,
    description: "Vibrant paneer and vegetable skewers marinated in spiced yogurt and grilled to smoky perfection — restaurant-quality appetiser you can make at home.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=900",
    ingredients: [
      "300g paneer, cut into 1.5-inch cubes",
      "1 capsicum, cut into squares",
      "1 onion, cut into squares",
      "1 cup thick yogurt",
      "1 tsp ginger-garlic paste",
      "1 tsp kashmiri red chilli powder",
      "1 tsp cumin powder",
      "1 tsp coriander powder",
      "½ tsp garam masala",
      "1 tbsp lemon juice",
      "1 tbsp mustard oil",
      "Salt to taste"
    ],
    instructions: [
      "Whisk yogurt with ginger-garlic paste, all spices, mustard oil, lemon juice, and salt into a smooth marinade.",
      "Coat paneer and vegetables thoroughly in the marinade; refrigerate for at least 30 minutes (overnight is best).",
      "Thread onto skewers alternating paneer, onion, and capsicum.",
      "Grill on a hot griddle or under a broiler, turning occasionally, for 10–12 minutes until charred in spots.",
      "Serve with green chutney, lemon wedge, and sliced onions."
    ]
  },

  // ─── BEVERAGE (10 recipes) ────────────────────────────────────────────────────
  {
    id: 71,
    title: "Masala Chai",
    category: "Beverage",
    time: 10,
    calories: 90,
    servings: 2,
    description: "The soul of Indian mornings — black tea brewed with ginger, cardamom, cinnamon, and black pepper, simmered with full-fat milk into a warming, spiced cup.",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=900",
    ingredients: [
      "2 cups water",
      "1 cup whole milk",
      "2 tsp loose black tea leaves (or 2 tea bags)",
      "3 green cardamom pods, lightly crushed",
      "1-inch ginger, grated or sliced",
      "1 small cinnamon stick",
      "3–4 black peppercorns, crushed",
      "2 cloves",
      "Sugar to taste"
    ],
    instructions: [
      "In a saucepan, combine water with all whole spices (cardamom, cinnamon, peppercorns, cloves, ginger); bring to a boil.",
      "Add tea leaves; reduce to a simmer and brew for 2 minutes.",
      "Pour in milk and bring back to a gentle boil.",
      "Let it simmer for 2–3 minutes until tea is a beautiful deep amber colour and smells intensely aromatic.",
      "Strain into cups, add sugar to taste, and serve steaming hot."
    ]
  },
  {
    id: 72,
    title: "Sweet Lassi",
    category: "Beverage",
    time: 5,
    calories: 180,
    servings: 2,
    description: "Thick, cold Punjabi yogurt drink blended smooth with sugar, rose water, and cardamom — creamy, refreshing, and endlessly satisfying on a hot day.",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=900",
    ingredients: [
      "2 cups chilled thick yogurt",
      "1 cup chilled water or milk",
      "3–4 tbsp sugar (adjust to taste)",
      "¼ tsp cardamom powder",
      "1 tsp rose water",
      "Ice cubes",
      "Malai (clotted cream) and pistachios to garnish"
    ],
    instructions: [
      "Add yogurt, chilled water or milk, sugar, cardamom, and rose water to a blender.",
      "Blend on high speed for 30–45 seconds until smooth and frothy.",
      "Taste and adjust sweetness.",
      "Pour over ice cubes in tall glasses.",
      "Top with a dollop of malai (clotted cream) and crushed pistachios; serve immediately."
    ]
  },
  {
    id: 73,
    title: "Mango Lassi",
    category: "Beverage",
    time: 5,
    calories: 210,
    servings: 2,
    description: "Lusciously sweet Alphonso mango blended with yogurt, cardamom, and a hint of saffron — summer in a glass, celebrated across India and the world.",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=900",
    ingredients: [
      "1 cup fresh Alphonso mango pulp (or 1 large ripe mango)",
      "1 cup thick chilled yogurt",
      "½ cup chilled milk",
      "2 tbsp sugar (optional — depends on mango sweetness)",
      "¼ tsp cardamom powder",
      "A few saffron strands soaked in 2 tbsp warm milk",
      "Ice cubes"
    ],
    instructions: [
      "Combine mango pulp, yogurt, milk, sugar, and cardamom in a blender.",
      "Blend until completely smooth and frothy.",
      "Taste — if mango is very sweet, skip the sugar.",
      "Pour over ice in tall glasses; drizzle saffron milk on top for a beautiful golden swirl.",
      "Garnish with a small piece of mango and serve immediately."
    ]
  },
  {
    id: 74,
    title: "Jaljeera",
    category: "Beverage",
    time: 10,
    calories: 40,
    servings: 4,
    description: "A zingy, deeply spiced cumin-and-tamarind cooler with black salt and mint — a traditional Indian digestive drink that immediately refreshes and invigorates.",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=900",
    ingredients: [
      "1 cup fresh mint leaves",
      "2 tbsp fresh coriander leaves",
      "1 tsp roasted cumin powder",
      "1 tbsp tamarind paste",
      "1 tsp black salt (kala namak)",
      "½ tsp regular salt",
      "1 tsp chaat masala",
      "1 green chilli",
      "1 tbsp jaggery",
      "1 litre chilled water",
      "Ice cubes and mint sprigs to serve"
    ],
    instructions: [
      "Blend mint, coriander, green chilli, and ¼ cup water into a smooth green paste.",
      "Strain the paste through a fine sieve into a pitcher.",
      "Add tamarind paste, roasted cumin powder, black salt, regular salt, chaat masala, and jaggery; stir well.",
      "Pour in chilled water; mix thoroughly until jaggery dissolves.",
      "Taste and adjust tartness or sweetness; pour over ice, garnish with mint sprigs, and serve cold."
    ]
  },
  {
    id: 75,
    title: "Aam Panna",
    category: "Beverage",
    time: 20,
    calories: 70,
    servings: 4,
    description: "A refreshing North Indian summer cooler made from roasted raw mangoes with black salt, roasted cumin, and mint — a traditional heat-stroke remedy.",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=900",
    ingredients: [
      "2 large raw (green) mangoes",
      "½ cup sugar or jaggery",
      "1 tsp roasted cumin powder",
      "1 tsp black salt",
      "1 tsp regular salt",
      "1 tbsp fresh mint leaves",
      "1 litre chilled water",
      "Ice cubes"
    ],
    instructions: [
      "Roast raw mangoes directly over a gas flame (or pressure cook) until the skin is charred and the inside is soft.",
      "Cool, peel off the skin, and scoop out the cooked pulp.",
      "Blend pulp with sugar or jaggery, roasted cumin, black salt, regular salt, and mint until smooth.",
      "Strain and collect the concentrate in a jar — this concentrate keeps in the fridge for 1–2 weeks.",
      "To serve: mix 2–3 tbsp concentrate with 1 cup chilled water; pour over ice and enjoy."
    ]
  },
  {
    id: 76,
    title: "Rose Sharbat",
    category: "Beverage",
    time: 5,
    calories: 100,
    servings: 2,
    description: "A delicate, floral rose-flavoured cooler with basil seeds and chilled milk or water — a cooling, elegant Mughal-inspired summer drink.",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=900",
    ingredients: [
      "4 tbsp rose syrup (roohafza or homemade)",
      "2 cups chilled milk (or water)",
      "2 tsp sabja seeds (basil/tukmaria seeds), soaked for 30 minutes",
      "Ice cubes",
      "Rose petals and crushed pistachios to garnish"
    ],
    instructions: [
      "Soak sabja seeds in water for 30 minutes — they will swell up into beautiful clear globules.",
      "Pour rose syrup into chilled glasses.",
      "Add chilled milk or water and stir.",
      "Spoon in soaked sabja seeds.",
      "Add ice, garnish with a few rose petals and crushed pistachios, and serve immediately."
    ]
  },
  {
    id: 77,
    title: "Thandai",
    category: "Beverage",
    time: 20,
    calories: 250,
    servings: 4,
    description: "A rich, cooling Holi-special spiced milk drink blended with almonds, fennel, rose petals, cardamom, and saffron — festive, aromatic, and deeply indulgent.",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=900",
    ingredients: [
      "1 litre full-fat chilled milk",
      "¼ cup almonds, soaked and peeled",
      "2 tbsp melon seeds (magaz), soaked",
      "1 tbsp poppy seeds (khus-khus), soaked",
      "10 black peppercorns",
      "1 tsp fennel seeds",
      "1 tsp cardamom powder",
      "10 strands saffron",
      "2 tbsp dried rose petals",
      "Sugar to taste",
      "Rose water and pistachios to garnish"
    ],
    instructions: [
      "Soak almonds, melon seeds, poppy seeds, peppercorns, fennel, and rose petals in water for 2 hours.",
      "Drain and blend with ½ cup milk into a smooth, fine paste.",
      "Strain this paste through a fine muslin cloth into the cold milk; squeeze out all liquid.",
      "Add sugar, saffron, and cardamom; stir until sugar dissolves.",
      "Chill for at least 2 hours; serve in glasses over ice, garnished with rose petals and crushed pistachios."
    ]
  },
  {
    id: 78,
    title: "Cold Coffee",
    category: "Beverage",
    time: 5,
    calories: 170,
    servings: 2,
    description: "Indian-style cold coffee — rich, frothy, and sweetened, blended to a creamy perfection with ice cream — the ultimate café-style treat at home.",
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=900",
    ingredients: [
      "2 tsp instant coffee powder",
      "2 tbsp warm water",
      "2 cups chilled milk",
      "2 scoops vanilla ice cream",
      "2 tbsp sugar",
      "6–8 ice cubes",
      "Whipped cream and cocoa powder to garnish"
    ],
    instructions: [
      "Dissolve instant coffee and sugar in 2 tbsp warm water; cool slightly.",
      "Add chilled milk, ice cream, ice cubes, and coffee mixture to a blender.",
      "Blend on high speed for 30–45 seconds until frothy and smooth.",
      "Pour into tall glasses.",
      "Top with whipped cream, a dusting of cocoa powder, and serve with a straw."
    ]
  },
  {
    id: 79,
    title: "Badam Milk",
    category: "Beverage",
    time: 10,
    calories: 220,
    servings: 2,
    description: "Warm, nourishing almond-infused milk with saffron, cardamom, and rose water — a traditional Indian bedtime drink that is as comforting as it is luxurious.",
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=900",
    ingredients: [
      "2 cups full-fat milk",
      "15 almonds, blanched and peeled",
      "2 tbsp sugar",
      "¼ tsp cardamom powder",
      "A generous pinch of saffron soaked in 2 tbsp warm milk",
      "½ tsp rose water",
      "Crushed pistachios to garnish"
    ],
    instructions: [
      "Blend peeled almonds with ¼ cup milk into a smooth, fine paste.",
      "Heat remaining milk in a saucepan on medium heat.",
      "Add almond paste and stir continuously; bring to a gentle boil.",
      "Add sugar, saffron milk, cardamom, and rose water; simmer for 5 minutes.",
      "Pour into cups, garnish with crushed pistachios, and serve warm (or chilled over ice)."
    ]
  },
  {
    id: 80,
    title: "Filter Coffee",
    category: "Beverage",
    time: 10,
    calories: 80,
    servings: 2,
    description: "South India's beloved stainless-steel tumbler of strong, frothy filter coffee — dark-roasted decoction blended with hot milk and frothed to perfection.",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=900",
    ingredients: [
      "2 tbsp South Indian filter coffee powder (chicory blend)",
      "1.5 cups hot water",
      "1.5 cups full-fat milk",
      "Sugar to taste"
    ],
    instructions: [
      "Add filter coffee powder to the upper chamber of a traditional filter; press lightly.",
      "Pour hot water over the coffee; allow it to slowly drip through over 10–15 minutes to create a strong decoction.",
      "Heat milk until it just begins to bubble; froth it by pouring repeatedly between two containers from a height.",
      "In a cup or tumbler, mix 1–2 tbsp of decoction with hot, frothed milk.",
      "Add sugar; pour back and forth between the tumbler and the davara (saucer) to cool slightly and create more froth — serve in the traditional stainless steel set."
    ]
  },

  // ─── DESSERT (15 recipes) ─────────────────────────────────────────────────────
  {
    id: 81,
    title: "Rasmalai",
    category: "Dessert",
    time: 60,
    calories: 290,
    servings: 6,
    description: "Pillowy soft cottage-cheese patties soaked in a rich, saffron-scented, cardamom-kissed rabri — the crown jewel of Bengali sweets, utterly ethereal.",
    image: "https://images.unsplash.com/photo-1593434232-16a35c5b8c4d?w=900",
    ingredients: [
      "1 litre full-fat milk (for chenna)",
      "2 tbsp lemon juice",
      "1 tbsp all-purpose flour",
      "1 litre full-fat milk (for rabri)",
      "½ cup sugar (for rabri)",
      "½ cup sugar (for sugar syrup)",
      "2 cups water (for syrup)",
      "½ tsp cardamom powder",
      "A generous pinch of saffron soaked in warm milk",
      "Chopped pistachios and rose petals to garnish"
    ],
    instructions: [
      "Boil 1 litre milk; add lemon juice to curdle; drain curds through muslin; rinse under cold water; hang for 30 minutes to remove excess whey.",
      "Knead the chenna with flour until smooth; shape into small flat discs.",
      "Bring sugar and water to a rolling boil in a wide pan; add chenna discs; cover and cook for 15–17 minutes until they double in size.",
      "Meanwhile, reduce 1 litre milk on low heat with ½ cup sugar, saffron, and cardamom until it thickens to a creamy rabri (25–30 minutes).",
      "Gently squeeze out excess syrup from each rasmalai; soak in cold rabri; refrigerate for 4 hours; serve chilled, garnished with pistachios and rose petals."
    ]
  },
  {
    id: 82,
    title: "Gulab Jamun",
    category: "Dessert",
    time: 45,
    calories: 310,
    servings: 6,
    description: "Soft, melt-in-the-mouth milk-solid dumplings fried golden and soaked in a fragrant rose and cardamom sugar syrup — an absolute celebration in every bite.",
    image: "https://images.unsplash.com/photo-1593434232-16a35c5b8c4d?w=900",
    ingredients: [
      "1 cup milk powder",
      "2 tbsp all-purpose flour",
      "¼ tsp baking soda",
      "2 tbsp ghee",
      "Milk to bind (approx. 3–4 tbsp)",
      "Oil or ghee for deep frying",
      "1½ cups sugar",
      "1 cup water",
      "½ tsp cardamom powder",
      "1 tsp rose water",
      "A few saffron strands"
    ],
    instructions: [
      "Make sugar syrup: combine sugar, water, cardamom, saffron, and rose water; bring to a boil and simmer for 5 minutes until slightly sticky; keep warm.",
      "Mix milk powder, flour, and baking soda; rub in ghee; gradually add milk to form a soft, non-sticky dough — do not over-knead.",
      "Shape into smooth, crack-free balls slightly smaller than a marble.",
      "Deep fry in medium-low oil, stirring gently, until uniformly deep golden-brown (about 8 minutes) — patience is key.",
      "Immediately drop hot gulab jamuns into warm syrup; soak for at least 30 minutes before serving warm or at room temperature."
    ]
  },
  {
    id: 83,
    title: "Kheer",
    category: "Dessert",
    time: 50,
    calories: 280,
    servings: 4,
    description: "Slow-cooked rice pudding with full-fat milk, fragrant cardamom, saffron, and rose water — a timeless Indian dessert served at every celebration and festival.",
    image: "https://images.unsplash.com/photo-1593434232-16a35c5b8c4d?w=900",
    ingredients: [
      "½ cup basmati rice, soaked 30 minutes",
      "1.5 litres full-fat milk",
      "½ cup sugar",
      "½ tsp cardamom powder",
      "10 saffron strands soaked in warm milk",
      "2 tbsp slivered almonds",
      "2 tbsp slivered pistachios",
      "1 tsp rose water",
      "2 tbsp condensed milk (optional, for extra richness)"
    ],
    instructions: [
      "Bring full-fat milk to a boil in a heavy-bottomed pot; add soaked and drained rice.",
      "Cook on medium-low heat, stirring frequently to prevent sticking, for 30–35 minutes until rice is completely soft and milk has reduced by one-third.",
      "Add sugar, condensed milk, cardamom, and saffron milk; stir well.",
      "Simmer for 10 more minutes until kheer thickens and coats the back of a spoon.",
      "Remove from heat; add rose water; garnish with nuts; serve warm or refrigerate and serve chilled."
    ]
  },
  {
    id: 84,
    title: "Gajar Halwa",
    category: "Dessert",
    time: 60,
    calories: 390,
    servings: 4,
    description: "Slow-cooked grated carrot halwa with whole milk, ghee, sugar, and cardamom — a winter festival delicacy that fills your home with the most intoxicating aroma.",
    image: "https://images.unsplash.com/photo-1593434232-16a35c5b8c4d?w=900",
    ingredients: [
      "500g red Delhi carrots, peeled and finely grated",
      "1 litre full-fat milk",
      "¾ cup sugar",
      "4 tbsp pure ghee",
      "½ tsp cardamom powder",
      "2 tbsp condensed milk",
      "15 cashews",
      "15 raisins",
      "Slivered almonds and pistachios to garnish"
    ],
    instructions: [
      "In a heavy pot, cook grated carrots with milk on medium heat, stirring frequently, until all the milk evaporates — this takes about 30–40 minutes.",
      "Add ghee; cook on medium heat for 10 minutes, stirring continuously, until the carrot mixture turns a deeper shade and the ghee begins to separate.",
      "Add sugar and condensed milk; cook for 10 more minutes, stirring, until halwa is fragrant and pulls away from the sides.",
      "In a separate small pan, fry cashews and raisins in a little ghee until golden; add to the halwa.",
      "Add cardamom powder; mix and serve hot, garnished with slivered almonds and pistachios."
    ]
  },
  {
    id: 85,
    title: "Besan Ladoo",
    category: "Dessert",
    time: 30,
    calories: 210,
    servings: 8,
    description: "Crumbly, melt-away gram-flour balls slow-roasted in ghee with cardamom — a traditional Indian festival sweet made in every home during Diwali.",
    image: "https://images.unsplash.com/photo-1593434232-16a35c5b8c4d?w=900",
    ingredients: [
      "2 cups besan (gram flour)",
      "1 cup pure ghee",
      "1 cup powdered sugar (bura)",
      "½ tsp cardamom powder",
      "10 cashews, chopped",
      "2 tbsp raisins"
    ],
    instructions: [
      "Heat ghee in a heavy pan; add besan and roast on medium-low heat, stirring constantly, for 15–20 minutes until it turns golden and smells deeply nutty and fragrant.",
      "Add cashews and raisins; fry for 2 more minutes.",
      "Remove from heat and let it cool until warm but not hot (not fully cool).",
      "Stir in powdered sugar and cardamom powder; mix well.",
      "While still warm, shape into smooth balls; if the mixture becomes too firm, warm your hands; if too soft, cool further. Store in an airtight box."
    ]
  },
  {
    id: 86,
    title: "Rasgulla",
    category: "Dessert",
    time: 50,
    calories: 170,
    servings: 6,
    description: "Light, spongy cottage-cheese spheres cooked in sugar syrup until they achieve a bouncy, airy perfection — the pride of West Bengal's culinary heritage.",
    image: "https://images.unsplash.com/photo-1593434232-16a35c5b8c4d?w=900",
    ingredients: [
      "1 litre full-fat milk",
      "2 tbsp lemon juice",
      "1 tbsp all-purpose flour",
      "1½ cups sugar",
      "5 cups water",
      "2 green cardamom pods"
    ],
    instructions: [
      "Curdle milk with lemon juice; drain and wash chenna under cold water; hang for 30 minutes.",
      "Knead chenna with flour for 8–10 minutes until smooth and free of cracks.",
      "Shape into perfectly smooth balls (they must have no cracks or they will break while cooking).",
      "Bring sugar, water, and cardamom pods to a rolling boil in a wide, deep pan; add chenna balls.",
      "Cover tightly and cook on medium heat for 20–25 minutes without opening the lid; check — they should have doubled in size; cool in syrup and serve chilled."
    ]
  },
  {
    id: 87,
    title: "Jalebi",
    category: "Dessert",
    time: 40,
    calories: 350,
    servings: 4,
    description: "Crispy, syrup-saturated deep-fried spirals in a bright saffron sugar syrup — an ancient Indian sweet that is simultaneously light, crunchy, and intensely sweet.",
    image: "https://images.unsplash.com/photo-1593434232-16a35c5b8c4d?w=900",
    ingredients: [
      "1 cup all-purpose flour",
      "1 tbsp fine semolina",
      "1 tsp yogurt",
      "Water to make batter",
      "A pinch of orange food colour (optional)",
      "Oil for deep frying",
      "1 cup sugar",
      "½ cup water",
      "¼ tsp saffron strands",
      "½ tsp cardamom powder",
      "1 tsp lemon juice"
    ],
    instructions: [
      "Make batter: mix flour, semolina, yogurt, and water into a smooth, flowing batter (thinner than pancake batter); ferment for 8 hours or overnight.",
      "Make syrup: boil sugar, water, saffron, and cardamom until it reaches a one-string consistency (drop forms a single string between fingers); add lemon juice to prevent crystallisation; keep warm.",
      "Heat oil in a wide, shallow pan; fill a squeeze bottle or a cloth jalebi bag with batter.",
      "Pipe batter in circular spirals into hot oil; fry until crisp and lightly golden on both sides.",
      "Immediately transfer to warm syrup for 30 seconds; remove and serve hot."
    ]
  },
  {
    id: 88,
    title: "Phirni",
    category: "Dessert",
    time: 30,
    calories: 240,
    servings: 4,
    description: "A delicate ground-rice pudding set in earthen bowls with saffron, pistachios, and rose water — a Mughal-era dessert that is creamy, cool, and supremely elegant.",
    image: "https://images.unsplash.com/photo-1593434232-16a35c5b8c4d?w=900",
    ingredients: [
      "¼ cup basmati rice, soaked",
      "1 litre full-fat milk",
      "½ cup sugar",
      "¼ tsp cardamom powder",
      "10 saffron strands soaked in 2 tbsp warm milk",
      "1 tsp rose water",
      "Chopped pistachios, almonds, and rose petals to garnish"
    ],
    instructions: [
      "Drain soaked rice and coarsely grind with ¼ cup milk into a rough paste — do not make it completely smooth.",
      "Bring remaining milk to a boil in a heavy pot; reduce heat to medium.",
      "Add the rice paste gradually while stirring continuously to prevent lumps.",
      "Cook for 15–20 minutes, stirring frequently, until the mixture thickens to a creamy custard-like consistency.",
      "Add sugar, saffron milk, cardamom, and rose water; cook 5 more minutes; pour into clay bowls; garnish; chill for 3–4 hours before serving."
    ]
  },
  {
    id: 89,
    title: "Modak",
    category: "Dessert",
    time: 45,
    calories: 230,
    servings: 6,
    description: "Sacred Ganesh festival steamed dumplings with a shell of rice flour and a filling of sweet fresh coconut and jaggery — divine in every sense of the word.",
    image: "https://images.unsplash.com/photo-1593434232-16a35c5b8c4d?w=900",
    ingredients: [
      "2 cups rice flour",
      "2 cups hot water",
      "1 tsp ghee",
      "1 pinch salt",
      "1 cup freshly grated coconut",
      "¾ cup jaggery (grated)",
      "½ tsp cardamom powder",
      "1 tbsp poppy seeds (khus-khus)"
    ],
    instructions: [
      "Make the filling: heat a dry pan; add grated coconut, jaggery, and poppy seeds; cook on medium heat until jaggery melts and mixture comes together (5–7 minutes); add cardamom; cool.",
      "Make dough: mix rice flour with salt; pour boiling water gradually while mixing; knead with ghee into a smooth, pliable dough; keep covered.",
      "Take a small portion of dough; flatten into a thin cup shape using moistened fingers.",
      "Place a teaspoon of filling; gather the edges and pinch into a pointed top, creating the traditional modak shape.",
      "Steam on a greased plate for 10–12 minutes; serve warm with a drizzle of pure ghee."
    ]
  },
  {
    id: 90,
    title: "Peda",
    category: "Dessert",
    time: 25,
    calories: 190,
    servings: 8,
    description: "Soft, melt-in-the-mouth milk-solid sweets flavoured with cardamom and saffron — a quintessential temple prasad sweet made from condensed milk khoya.",
    image: "https://images.unsplash.com/photo-1593434232-16a35c5b8c4d?w=900",
    ingredients: [
      "400g condensed milk (or 2 cups khoya/mawa)",
      "2 tbsp milk powder",
      "1 tbsp ghee",
      "½ tsp cardamom powder",
      "10 saffron strands soaked in 1 tsp warm milk",
      "Pistachios to garnish"
    ],
    instructions: [
      "Heat ghee in a non-stick pan; add condensed milk and milk powder.",
      "Cook on medium-low heat, stirring constantly, for 12–15 minutes until the mixture thickens, leaves the sides of the pan, and forms a soft dough.",
      "Add cardamom powder and saffron milk; mix well.",
      "Remove from heat; cool until warm enough to handle.",
      "Divide into equal balls; flatten gently; press a pistachio on top; store in an airtight container at room temperature for 2–3 days."
    ]
  },
  {
    id: 91,
    title: "Kalakand",
    category: "Dessert",
    time: 40,
    calories: 300,
    servings: 6,
    description: "Grainy, fudgy milk cake made from freshly curdled chenna and condensed milk, perfumed with cardamom and silver leaf — a festive Indian mithai of rare beauty.",
    image: "https://images.unsplash.com/photo-1593434232-16a35c5b8c4d?w=900",
    ingredients: [
      "1 litre full-fat milk",
      "2 tbsp lemon juice",
      "400g condensed milk",
      "½ tsp cardamom powder",
      "2 tbsp slivered pistachios and almonds",
      "Silver leaf (vark) to garnish (optional)"
    ],
    instructions: [
      "Curdle 1 litre milk with lemon juice; drain chenna through a muslin cloth, squeeze out excess whey, but keep it slightly moist.",
      "Cook chenna in a heavy pan on medium heat, stirring, for 5 minutes to remove raw taste.",
      "Add condensed milk and cardamom; cook on medium heat, stirring constantly, for 15–20 minutes until mixture thickens.",
      "Pour into a greased square pan; smooth the top; garnish with nuts and silver leaf.",
      "Cool completely; refrigerate for 2 hours; cut into squares and serve."
    ]
  },
  {
    id: 92,
    title: "Malpua",
    category: "Dessert",
    time: 30,
    calories: 330,
    servings: 4,
    description: "Soft, lacy, deep-fried Indian pancakes soaked in fragrant saffron syrup and topped with rabri — a Holi and Navratri festive sweet that is simply irresistible.",
    image: "https://images.unsplash.com/photo-1593434232-16a35c5b8c4d?w=900",
    ingredients: [
      "1 cup all-purpose flour",
      "¼ cup fine semolina",
      "½ cup yogurt",
      "½ cup milk",
      "1 ripe banana, mashed",
      "1 tsp fennel seeds",
      "Oil for deep frying",
      "1 cup sugar",
      "½ cup water",
      "½ tsp saffron",
      "½ tsp cardamom",
      "Rabri or cream to serve"
    ],
    instructions: [
      "Make batter: mix flour, semolina, yogurt, milk, mashed banana, and fennel seeds into a smooth, pourable batter; rest 15 minutes.",
      "Make syrup: combine sugar, water, saffron, and cardamom; boil until slightly sticky (1-string consistency); keep warm.",
      "Heat oil in a wide pan; pour a ladleful of batter into medium-hot oil — it should spread naturally.",
      "Fry on medium heat until golden on both sides; drain briefly.",
      "Immediately soak in warm syrup for 1 minute; serve topped with cold rabri or fresh cream."
    ]
  },
  {
    id: 93,
    title: "Coconut Barfi",
    category: "Dessert",
    time: 25,
    calories: 220,
    servings: 8,
    description: "Soft, fragrant squares of freshly grated coconut cooked with condensed milk, cardamom, and a hint of rose water — a 3-ingredient Indian sweet of pure elegance.",
    image: "https://images.unsplash.com/photo-1593434232-16a35c5b8c4d?w=900",
    ingredients: [
      "2 cups freshly grated coconut",
      "400g condensed milk",
      "½ tsp cardamom powder",
      "1 tsp rose water",
      "1 tbsp ghee",
      "Chopped pistachios and dried rose petals to garnish"
    ],
    instructions: [
      "Heat ghee in a non-stick pan; add grated coconut and roast on medium heat for 2–3 minutes.",
      "Add condensed milk and cook on medium-low heat, stirring constantly, for 12–15 minutes until mixture thickens and leaves the sides of the pan.",
      "Add cardamom and rose water; mix well.",
      "Pour into a greased plate; flatten with a spatula; garnish with pistachios and rose petals.",
      "Cool completely at room temperature (or refrigerate for 30 minutes); cut into diamond shapes and serve."
    ]
  },
  {
    id: 94,
    title: "Sheer Khurma",
    category: "Dessert",
    time: 30,
    calories: 310,
    servings: 4,
    description: "A rich, creamy vermicelli pudding with dates, dried fruits, saffron, and rose water — the traditional Eid dessert, opulent and deeply comforting.",
    image: "https://images.unsplash.com/photo-1593434232-16a35c5b8c4d?w=900",
    ingredients: [
      "1 litre full-fat milk",
      "50g thin vermicelli (seviyan), roasted",
      "8 Medjool dates, pitted and slivered",
      "2 tbsp slivered almonds",
      "2 tbsp slivered pistachios",
      "1 tbsp raisins",
      "3 tbsp sugar",
      "½ tsp cardamom powder",
      "1 tsp rose water",
      "10 saffron strands soaked in milk",
      "2 tbsp ghee"
    ],
    instructions: [
      "Heat ghee in a heavy pot; fry almonds, pistachios, and raisins until golden; remove and set aside.",
      "In the same ghee, roast vermicelli until light golden; pour in hot milk.",
      "Bring to a boil; add dates, sugar, cardamom, and saffron milk; simmer for 10–15 minutes until vermicelli is very soft and milk has reduced.",
      "Add fried nuts and rose water; stir gently.",
      "Serve warm or at room temperature in bowls, garnished with more nuts and a drizzle of rose water."
    ]
  },
  {
    id: 95,
    title: "Sooji Ka Halwa",
    category: "Dessert",
    time: 20,
    calories: 360,
    servings: 3,
    description: "Quick, luscious semolina halwa enriched with generous ghee, roasted to a deep amber, and sweetened with sugar and cardamom — pure comfort in a bowl.",
    image: "https://images.unsplash.com/photo-1593434232-16a35c5b8c4d?w=900",
    ingredients: [
      "1 cup fine semolina (suji)",
      "¾ cup sugar",
      "4 tbsp pure ghee",
      "2.5 cups water",
      "½ tsp cardamom powder",
      "10 cashews, halved",
      "10 raisins",
      "A few saffron strands (optional)"
    ],
    instructions: [
      "Heat ghee in a thick pan; fry cashews and raisins until golden; remove and keep aside.",
      "In the same ghee, roast semolina on medium-low heat, stirring constantly, for 8–10 minutes until it turns golden and smells deeply nutty.",
      "Heat water with sugar in a separate pan until sugar dissolves; keep hot.",
      "Carefully pour the hot sugar water into the roasted semolina while stirring rapidly — it will sizzle and splutter.",
      "Cook on low heat, stirring, until halwa thickens and pulls from the sides; add cardamom, fried nuts and raisins, serve warm."
    ]
  },

  // ─── ADDITIONAL RECIPES TO REACH 100+ ────────────────────────────────────────
  {
    id: 96,
    title: "Stuffed Aloo Paratha",
    category: "Breakfast",
    time: 45,
    calories: 440,
    servings: 3,
    description: "Classic Punjabi breakfast of crispy whole-wheat parathas stuffed with garlicky spiced mashed potato, served with cold dahi and tangy mango pickle.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=900",
    ingredients: [
      "2 cups whole-wheat flour",
      "Water to knead",
      "4 boiled potatoes, mashed",
      "1 tsp cumin seeds",
      "2 green chillies, finely chopped",
      "2 garlic cloves, minced",
      "1 tsp amchur",
      "½ tsp red chilli powder",
      "2 tbsp fresh coriander",
      "Salt to taste",
      "Ghee for cooking"
    ],
    instructions: [
      "Knead soft dough with whole-wheat flour and water; cover and rest for 15 minutes.",
      "Mix mashed potato with cumin, green chillies, garlic, amchur, chilli powder, coriander, and salt.",
      "Divide dough into equal balls; roll each into a 4-inch circle; place filling; seal edges tightly.",
      "Gently roll the stuffed ball into a thin 7–8 inch flatbread.",
      "Cook on a hot tawa with generous ghee on both sides until golden spots appear; serve with cold dahi and achaar."
    ]
  },
  {
    id: 97,
    title: "Paneer Paratha",
    category: "Breakfast",
    time: 35,
    calories: 400,
    servings: 3,
    description: "Flaky whole-wheat flatbreads stuffed with spiced crumbled fresh paneer and herbs — a protein-rich Punjabi breakfast that is filling and delicious.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=900",
    ingredients: [
      "2 cups whole-wheat flour",
      "Water to knead",
      "250g paneer, finely crumbled",
      "1 tsp cumin powder",
      "½ tsp red chilli powder",
      "½ tsp amchur",
      "2 tbsp fresh coriander",
      "1 green chilli, finely chopped",
      "Salt to taste",
      "Ghee for cooking"
    ],
    instructions: [
      "Knead soft dough; rest for 15 minutes.",
      "Mix crumbled paneer with all spices, coriander, green chilli, and salt.",
      "Divide dough and roll into circles; place paneer filling in the centre; seal and re-roll.",
      "Cook on hot tawa with ghee on both sides until golden and evenly cooked.",
      "Serve hot with yogurt, pickle, or white butter."
    ]
  },
  {
    id: 98,
    title: "Veg Frankie",
    category: "Snack",
    time: 25,
    calories: 320,
    servings: 2,
    description: "Mumbai-style spiced potato-vegetable filling rolled in an egg-dipped flatbread with chutneys and raw onion — a street-food legend wrapped up to go.",
    image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=900",
    ingredients: [
      "2 rotis or large flatbreads",
      "2 medium potatoes, boiled and mashed",
      "½ cup mixed boiled vegetables",
      "1 tsp Frankie masala or chaat masala",
      "1 small onion, finely chopped",
      "2 tbsp green chutney",
      "1 tbsp tamarind chutney",
      "Salt to taste",
      "1 tbsp butter"
    ],
    instructions: [
      "Mix mashed potato and vegetables with Frankie masala and salt.",
      "Warm the roti on a tawa; apply butter; heat through.",
      "Spread green chutney on the roti; place potato filling along one edge.",
      "Top with raw onion and a drizzle of tamarind chutney.",
      "Roll tightly and wrap the bottom in foil or paper; serve immediately."
    ]
  },
  {
    id: 99,
    title: "Mango Shake",
    category: "Beverage",
    time: 5,
    calories: 230,
    servings: 2,
    description: "Thick, creamy mango milkshake blended from sweet Alphonso mangoes with chilled milk and ice — the definitive Indian summer beverage.",
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=900",
    ingredients: [
      "2 large ripe Alphonso mangoes, peeled and chopped",
      "2 cups chilled whole milk",
      "2 tbsp sugar (adjust to mango sweetness)",
      "½ cup vanilla ice cream",
      "Ice cubes",
      "Mango slice to garnish"
    ],
    instructions: [
      "Add chopped mango, cold milk, sugar, and ice cream to a blender.",
      "Blend on high speed for 45 seconds until completely smooth and frothy.",
      "Taste; adjust sweetness.",
      "Pour into chilled glasses over ice.",
      "Garnish with a fresh mango slice and serve immediately."
    ]
  },
  {
    id: 100,
    title: "Strawberry Banana Smoothie",
    category: "Beverage",
    time: 5,
    calories: 190,
    servings: 2,
    description: "A thick, vibrant fruit smoothie blending ripe strawberries and banana with chilled yogurt and honey — a fresh, nutritious Indian fruit-bar style drink.",
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=900",
    ingredients: [
      "1 cup fresh or frozen strawberries",
      "1 ripe banana",
      "1 cup chilled thick yogurt",
      "½ cup chilled milk",
      "1 tbsp honey",
      "Ice cubes"
    ],
    instructions: [
      "Add all ingredients to a blender.",
      "Blend on high speed for 30–40 seconds until smooth.",
      "Taste and add more honey if needed.",
      "Pour into glasses over ice.",
      "Garnish with a strawberry slice and serve immediately."
    ]
  },
  {
    id: 101,
    title: "Chocolate Barfi",
    category: "Dessert",
    time: 25,
    calories: 240,
    servings: 8,
    description: "An indulgent Indian-Western fusion sweet — creamy khoya and cocoa-infused barfi topped with shredded coconut — perfect for gifting or celebrations.",
    image: "https://images.unsplash.com/photo-1593434232-16a35c5b8c4d?w=900",
    ingredients: [
      "400g condensed milk",
      "2 tbsp cocoa powder",
      "2 tbsp desiccated coconut",
      "½ tsp cardamom powder",
      "1 tbsp ghee",
      "Chopped nuts for garnish"
    ],
    instructions: [
      "Heat ghee in a non-stick pan; add condensed milk and cocoa powder; stir until smooth.",
      "Cook on medium-low heat, stirring continuously, for 12–15 minutes until mixture thickens and leaves the sides of the pan.",
      "Add cardamom and desiccated coconut; stir well.",
      "Pour into a greased plate; flatten; garnish with chopped nuts.",
      "Cool completely; cut into squares and serve."
    ]
  },
  {
    id: 102,
    title: "Aloo Chaat",
    category: "Snack",
    time: 20,
    calories: 270,
    servings: 2,
    description: "Pan-fried crispy potato bites tossed with chutneys, yogurt, chaat masala, and pomegranate — the most addictive street-style snack made in under 20 minutes.",
    image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=900",
    ingredients: [
      "4 medium potatoes, boiled, peeled, and cubed",
      "2 tbsp oil for frying",
      "2 tbsp tamarind chutney",
      "2 tbsp green mint chutney",
      "2 tbsp yogurt, whisked",
      "1 tsp chaat masala",
      "½ tsp cumin powder",
      "Salt to taste",
      "Pomegranate seeds, sev, and coriander to garnish"
    ],
    instructions: [
      "Heat oil in a pan; fry potato cubes on medium-high heat until golden and slightly crispy on the edges.",
      "Drain on paper; transfer to a serving bowl.",
      "While still warm, drizzle tamarind chutney and green chutney.",
      "Spoon yogurt over the potatoes; sprinkle chaat masala and cumin powder.",
      "Garnish with pomegranate seeds, sev, and fresh coriander; serve immediately."
    ]
  },
  {
    id: 103,
    title: "Lemon Rice",
    category: "Lunch",
    time: 20,
    calories: 330,
    servings: 2,
    description: "Tangy, golden South Indian lemon rice with mustard seeds, urad dal, peanuts, and turmeric — a quick, flavour-packed rice dish perfect for lunchboxes.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=900",
    ingredients: [
      "2 cups cooked basmati or sona masuri rice (cooled)",
      "Juice of 2 lemons",
      "1 tsp mustard seeds",
      "1 tsp urad dal",
      "2 tbsp roasted peanuts",
      "2 dried red chillies",
      "10 curry leaves",
      "½ tsp turmeric",
      "2 green chillies, slit",
      "Salt to taste",
      "2 tbsp oil",
      "Fresh coriander to garnish"
    ],
    instructions: [
      "Heat oil in a wide pan; add mustard seeds and let them pop.",
      "Add urad dal and dried red chillies; fry until dal turns golden.",
      "Add curry leaves, green chillies, peanuts, and turmeric; sauté for 1 minute.",
      "Add cooled cooked rice; toss gently to coat without breaking the grains.",
      "Remove from heat; add lemon juice and salt; toss well, garnish with coriander, and serve."
    ]
  },
  {
    id: 104,
    title: "Coconut Chutney",
    category: "Snack",
    time: 10,
    calories: 90,
    servings: 4,
    description: "Freshly ground coconut chutney with green chilli, ginger, and a classic South Indian mustard-curry leaf tadka — the essential accompaniment to any South Indian breakfast.",
    image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=900",
    ingredients: [
      "1 cup fresh grated coconut",
      "2 green chillies",
      "1-inch ginger",
      "2 tbsp roasted chana dal",
      "Salt to taste",
      "Water to grind",
      "1 tsp oil",
      "½ tsp mustard seeds",
      "10 curry leaves",
      "1 dried red chilli"
    ],
    instructions: [
      "Blend coconut, green chillies, ginger, roasted chana dal, and salt with water into a smooth chutney.",
      "Transfer to a bowl; adjust salt and consistency with water.",
      "Heat oil in a small pan; splutter mustard seeds, then add dried red chilli and curry leaves.",
      "Pour the sizzling tadka over the chutney.",
      "Serve immediately with idli, dosa, or upma."
    ]
  },
  {
    id: 105,
    title: "Haldi Doodh",
    category: "Beverage",
    time: 10,
    calories: 120,
    servings: 2,
    description: "The original golden latte — warm milk infused with turmeric, black pepper, ginger, and honey — an ancient Ayurvedic immunity-boosting bedtime drink.",
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=900",
    ingredients: [
      "2 cups full-fat milk",
      "1 tsp turmeric powder",
      "¼ tsp black pepper, freshly ground",
      "½ tsp ginger powder (or fresh grated ginger)",
      "¼ tsp cinnamon powder",
      "1 tbsp honey",
      "½ tsp coconut oil (optional)"
    ],
    instructions: [
      "Heat milk in a saucepan on medium heat until it just starts to steam.",
      "Add turmeric, black pepper, ginger, and cinnamon; whisk thoroughly.",
      "Bring to a gentle simmer for 3–4 minutes — do not boil vigorously.",
      "Remove from heat; add honey and coconut oil; stir well.",
      "Pour into cups through a strainer; serve warm before bedtime."
    ]
  }
];

export const initialMeals = [
  { id: 101, date: dateKey(today), type: "Breakfast", title: "Aloo Paratha", time: "08:30", calories: 420, recipeId: 3 },
  { id: 102, date: dateKey(today), type: "Lunch", title: "Rajma Chawal", time: "13:15", calories: 490, recipeId: 16 },
  { id: 103, date: dateKey(today), type: "Dinner", title: "Palak Paneer", time: "20:00", calories: 400, recipeId: 37 }
];

export const initialGroceries = [
  { id: 1, name: "Basmati Rice", amount: "2 kg", category: "Pantry", done: false },
  { id: 2, name: "Fresh Paneer", amount: "500g", category: "Dairy", done: false },
  { id: 3, name: "Toor Dal", amount: "1 kg", category: "Pantry", done: true },
  { id: 4, name: "Fresh Spinach", amount: "500g", category: "Produce", done: false },
  { id: 5, name: "Kidney Beans (Rajma)", amount: "500g", category: "Pantry", done: true },
  { id: 6, name: "Tomatoes", amount: "1 kg", category: "Produce", done: false },
  { id: 7, name: "Onions", amount: "2 kg", category: "Produce", done: false },
  { id: 8, name: "Pure Ghee", amount: "500g", category: "Dairy", done: false }
];

export const initialExpenses = [
  { id: 1, title: "Kirana Store — Weekly Groceries", amount: 1450, category: "Groceries", date: dateKey(today) },
  { id: 2, title: "Sabzi Mandi — Fresh Vegetables", amount: 380, category: "Produce", date: dateKey(today) },
  { id: 3, title: "Dairy — Paneer & Ghee", amount: 320, category: "Groceries", date: dateKey(today) }
];

export const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack", "Beverage", "Dessert"];
export const categories = ["All", "Breakfast", "Lunch", "Dinner", "Snack", "Beverage", "Dessert"];
export const groceryCategories = ["Produce", "Dairy", "Bakery", "Pantry", "Meat", "Snacks", "Other"];
export const expenseCategories = ["Groceries", "Produce", "Dining Out", "Bakery", "Beverages", "Other"];

export const iconForMeal = (type) => {
  switch (type) {
    case "Breakfast": return Sunrise;
    case "Lunch": return Sun;
    case "Dinner": return Moon;
    case "Dessert": return Cake;
    case "Beverage": return Coffee;
    default: return UtensilsCrossed;
  }
};

export const blankRecipe = {
  title: "",
  category: "Breakfast",
  time: "15",
  calories: "350",
  servings: "2",
  description: "",
  image: "",
  ingredients: "",
  instructions: ""
};

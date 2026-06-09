const PRODUCTS_DATA = {
  categories: [
    {
      id: "awards-trophies",
      name: "Awards & Trophies",
      subtitle: "Celebrate Excellence",
      description:
        "Commemorate achievements with premium awards and custom trophies crafted for lasting impressions.",
      image:
        "https://placehold.co/800x500/1c1c1c/D2C6B6?text=Awards+%26+Trophies",
      products: [
        {
          id: "crystal-star-trophy",
          name: "Crystal Star Trophy",
          price: 1499,
          offerPrice: 1199,
          image:
            "https://placehold.co/520x520/1c1c1c/D2C6B6?text=Crystal+Star+Trophy",
          shortDesc:
            "Premium K9 crystal star trophy with custom laser engraving.",
          description:
            "Elevate your recognition programs with our Crystal Star Trophy, crafted from premium K9 optical crystal glass. The elegant star design symbolizes excellence and achievement, making it the perfect award for employee recognition, sales milestones, and business achievements. Each trophy comes with custom laser engraving and a luxurious velvet gift box.",
          features: [
            "Premium K9 crystal glass",
            "Custom laser engraving included",
            "Velvet gift box included",
            "Available in 3 sizes: Small, Medium, Large",
          ],
          moq: 10,
          featured: true,
          category: "awards-trophies",
          categoryName: "Awards & Trophies",
        },
        {
          id: "wooden-prestige-plaque",
          name: "Wooden Prestige Plaque",
          price: 899,
          offerPrice: 749,
          image:
            "https://placehold.co/520x520/1c1c1c/D2C6B6?text=Wooden+Prestige+Plaque",
          shortDesc:
            "Handcrafted wooden plaque with brass nameplate and custom engraving.",
          description:
            "Our Wooden Prestige Plaque combines natural warmth with executive elegance. Crafted from premium hardwood with a smooth lacquer finish, it features a brass nameplate for custom engraving. Ideal for service awards, special recognitions, and commemorative plaques for corporate milestones.",
          features: [
            "Premium hardwood construction",
            "Brass engraved nameplate",
            "Custom text and logo",
            "Wall-mount hardware included",
          ],
          moq: 5,
          featured: false,
          category: "awards-trophies",
          categoryName: "Awards & Trophies",
        },
        {
          id: "metal-pillar-trophy",
          name: "Metal Pillar Trophy",
          price: 1299,
          offerPrice: 999,
          image:
            "https://placehold.co/520x520/1c1c1c/D2C6B6?text=Metal+Pillar+Trophy",
          shortDesc:
            "Sleek metal pillar trophy on a marble base with custom engraving.",
          description:
            "The Metal Pillar Trophy is a modern, corporate-grade award with a polished zinc-alloy pillar atop a solid marble base. Its timeless design suits boardroom displays and annual award ceremonies alike. Custom engraving and logo embossing available.",
          features: [
            "Polished zinc-alloy construction",
            "Solid marble base",
            "Custom engraving & logo embossing",
            "Presentation gift box included",
          ],
          moq: 10,
          featured: false,
          category: "awards-trophies",
          categoryName: "Awards & Trophies",
        },
        {
          id: "sports-achievement-medal-set",
          name: "Sports Achievement Medal Set",
          price: 799,
          offerPrice: 599,
          image:
            "https://placehold.co/520x520/1c1c1c/D2C6B6?text=Sports+Medal+Set",
          shortDesc:
            "Premium medal set with ribbon and custom engraving for sporting events.",
          description:
            "Celebrate sporting spirit and teamwork with our Sports Achievement Medal Set. Each medal is die-cast in zinc alloy with a vibrant full-colour enamel finish and satin ribbon. Perfectly suited for corporate sports days, tournaments, and team-building events. Bulk discounts available.",
          features: [
            "Die-cast zinc alloy with enamel finish",
            "Satin ribbon included",
            "Custom text engraving",
            "Available in Gold, Silver & Bronze",
          ],
          moq: 20,
          featured: false,
          category: "awards-trophies",
          categoryName: "Awards & Trophies",
        },
        {
          id: "executive-diamond-award",
          name: "Executive Diamond Award",
          price: 2499,
          offerPrice: 1999,
          image:
            "https://placehold.co/520x520/1c1c1c/D2C6B6?text=Executive+Diamond+Award",
          shortDesc:
            "Luxurious diamond-cut crystal award for top-tier recognition.",
          description:
            "Our flagship recognition piece — the Executive Diamond Award — is precision-cut from flawless crystal glass with faceted diamond edges that catch and refract light beautifully. This premium award speaks to the highest levels of achievement and is the ultimate way to honour your top performers, long-service employees, or esteemed clients.",
          features: [
            "Precision-cut flawless crystal glass",
            "Faceted diamond-cut edges",
            "Deep laser engraving + UV printing",
            "Luxury wooden presentation box",
          ],
          moq: 5,
          featured: true,
          category: "awards-trophies",
          categoryName: "Awards & Trophies",
        },
      ],
    },
    {
      id: "gift-combos",
      name: "Gift Combos",
      subtitle: "Curated Gift Sets",
      description:
        "Thoughtfully assembled gift combos that make an unforgettable impression — from compact 2-in-1 sets to lavish 5-in-1 hampers.",
      image:
        "https://placehold.co/800x500/7B5E2A/F5F1ED?text=Gift+Combos",
      products: [
        {
          id: "executive-2in1-set",
          name: "2-in-1 Executive Set",
          price: 1299,
          offerPrice: 999,
          image:
            "https://placehold.co/520x520/7B5E2A/F5F1ED?text=2-in-1+Executive+Set",
          shortDesc:
            "A compact pair of premium corporate gifts in elegant packaging.",
          description:
            "Our 2-in-1 Executive Set pairs two best-selling corporate gifts — typically a branded metal pen and a premium leather diary — in a sleek gift box with custom ribbon. Ideal for onboarding kits, client thank-you gifts, and small-budget corporate gifting without compromising on quality.",
          features: [
            "2 premium corporate items",
            "Custom logo branding on each item",
            "Elegant gift box with ribbon",
            "Choice of item combination",
          ],
          moq: 20,
          featured: false,
          category: "gift-combos",
          categoryName: "Gift Combos",
        },
        {
          id: "premium-3in1-hamper",
          name: "3-in-1 Premium Hamper",
          price: 1899,
          offerPrice: 1499,
          image:
            "https://placehold.co/520x520/7B5E2A/F5F1ED?text=3-in-1+Premium+Hamper",
          shortDesc:
            "Three curated premium gifts in a luxurious hamper presentation.",
          description:
            "The 3-in-1 Premium Hamper brings together three hand-picked corporate gifts in a beautifully presented hamper basket. A popular combination includes a travel tumbler, a leather notebook, and a premium pen — each branded with your company logo. A crowd-pleaser for festive gifting, client appreciation, and team rewards.",
          features: [
            "3 premium branded items",
            "Hamper basket with tissue and ribbon",
            "Custom logo on all items",
            "Personalised greeting card included",
          ],
          moq: 15,
          featured: true,
          category: "gift-combos",
          categoryName: "Gift Combos",
        },
        {
          id: "luxury-4in1-bundle",
          name: "4-in-1 Luxury Bundle",
          price: 2499,
          offerPrice: 1999,
          image:
            "https://placehold.co/520x520/7B5E2A/F5F1ED?text=4-in-1+Luxury+Bundle",
          shortDesc:
            "Four luxury corporate items bundled in a premium gift box.",
          description:
            "Four of our best-selling items — a copper bottle, leather diary, metal pen, and scented candle — come together in the 4-in-1 Luxury Bundle. Presented in a premium rigid gift box with custom branding, it is the go-to choice for client gifts, Diwali hampers, and high-impact corporate giving.",
          features: [
            "4 luxury branded items",
            "Rigid premium gift box",
            "Full custom branding",
            "Personalised message card",
          ],
          moq: 10,
          featured: false,
          category: "gift-combos",
          categoryName: "Gift Combos",
        },
        {
          id: "corporate-5in1-collection",
          name: "5-in-1 Corporate Collection",
          price: 3299,
          offerPrice: 2699,
          image:
            "https://placehold.co/520x520/7B5E2A/F5F1ED?text=5-in-1+Collection",
          shortDesc:
            "Our most comprehensive gift set — five premium items in one grand hamper.",
          description:
            "The 5-in-1 Corporate Collection is our most comprehensive gifting solution, featuring five curated premium items in a grand wooden crate. Ideal for C-suite gifting, top client appreciation, and annual award ceremonies, this set makes an unforgettable statement of gratitude and excellence.",
          features: [
            "5 handpicked premium items",
            "Luxury wooden crate presentation",
            "Full custom branding on each piece",
            "Handwritten calligraphy gift card",
          ],
          moq: 5,
          featured: true,
          category: "gift-combos",
          categoryName: "Gift Combos",
        },
        {
          id: "festive-signature-combo",
          name: "Festive Signature Combo",
          price: 1599,
          offerPrice: 1299,
          image:
            "https://placehold.co/520x520/7B5E2A/F5F1ED?text=Festive+Signature+Combo",
          shortDesc:
            "Festive-themed combo with seasonal treats and branded merchandise.",
          description:
            "Make your festive season gifting truly special with our Festive Signature Combo. This curated set blends artisanal treats (dry fruits, chocolates, or sweets — your choice) with a branded corporate item in a decorative gift box. Perfect for Diwali, Christmas, Eid, and all occasions that call for warmth and celebration.",
          features: [
            "Festive artisanal treats included",
            "1 branded corporate item",
            "Decorative seasonal gift box",
            "Custom message ribbon",
          ],
          moq: 25,
          featured: false,
          category: "gift-combos",
          categoryName: "Gift Combos",
        },
      ],
    },
    {
      id: "drinkware",
      name: "Drinkware",
      subtitle: "Premium Sips, Every Day",
      description:
        "From sleek steel sippers to artisan ceramic mugs — our drinkware collection ensures your brand is part of every coffee break.",
      image:
        "https://placehold.co/800x500/1B4F72/BDE0F3?text=Drinkware",
      products: [
        {
          id: "premium-steel-sipper-bottle",
          name: "Premium Steel Sipper Bottle",
          price: 799,
          offerPrice: 599,
          image:
            "https://placehold.co/520x520/1B4F72/BDE0F3?text=Steel+Sipper+Bottle",
          shortDesc:
            "Double-wall insulated steel bottle that keeps beverages cold 24h / hot 12h.",
          description:
            "Our Premium Steel Sipper Bottle is engineered for the on-the-go professional. Double-wall vacuum insulation keeps cold drinks ice-cold for 24 hours and hot beverages steaming for 12 hours. The sleek matte finish offers ample surface for your brand logo, making it a daily-use gift that keeps on giving.",
          features: [
            "Double-wall vacuum insulated",
            "500ml capacity",
            "BPA-free stainless steel",
            "Laser-engraved logo",
          ],
          moq: 25,
          featured: true,
          category: "drinkware",
          categoryName: "Drinkware",
        },
        {
          id: "classic-ceramic-coffee-mug",
          name: "Classic Ceramic Coffee Mug",
          price: 449,
          offerPrice: 349,
          image:
            "https://placehold.co/520x520/1B4F72/BDE0F3?text=Ceramic+Coffee+Mug",
          shortDesc:
            "Premium ceramic mug with full-colour wrap printing for vibrant brand display.",
          description:
            "The Classic Ceramic Coffee Mug is a timeless corporate gift that sits on every desk. Made from premium ceramic with a comfortable C-handle, it features full-colour wrap printing that showcases your brand, artwork, or message in vivid detail. Dishwasher-safe and food-grade certified.",
          features: [
            "350ml premium ceramic",
            "Full-colour wrap printing",
            "Dishwasher-safe",
            "Individual gift box packing",
          ],
          moq: 50,
          featured: false,
          category: "drinkware",
          categoryName: "Drinkware",
        },
        {
          id: "executive-travel-tumbler",
          name: "Executive Travel Tumbler",
          price: 999,
          offerPrice: 799,
          image:
            "https://placehold.co/520x520/1B4F72/BDE0F3?text=Travel+Tumbler",
          shortDesc:
            "Sleek stainless steel travel tumbler with spill-proof lid for busy professionals.",
          description:
            "Built for the modern commuter, our Executive Travel Tumbler combines style and functionality in a tall, ergonomic stainless steel body. The secure twist-lock lid prevents spills, while the slim profile fits most car cup holders. Laser engrave your logo for a premium, long-lasting brand impression.",
          features: [
            "450ml stainless steel tumbler",
            "Spill-proof twist-lock lid",
            "Slim car cup holder compatible",
            "Laser engraved logo",
          ],
          moq: 20,
          featured: false,
          category: "drinkware",
          categoryName: "Drinkware",
        },
        {
          id: "hammered-copper-bottle",
          name: "Hammered Copper Bottle",
          price: 1299,
          offerPrice: 999,
          image:
            "https://placehold.co/520x520/1B4F72/BDE0F3?text=Hammered+Copper+Bottle",
          shortDesc:
            "Hand-hammered pure copper bottle — wellness-inspired corporate gift.",
          description:
            "Crafted by skilled artisans, our Hammered Copper Bottle is a wellness-inspired gift that brings Ayurvedic benefits to modern life. The hand-hammered texture gives each bottle a unique, artisanal character. Loved by health-conscious executives, it elevates any gifting occasion from product launches to Diwali hampers.",
          features: [
            "Pure copper, hand-hammered finish",
            "Leak-proof brass cap",
            "1000ml capacity",
            "Engraved brand logo",
          ],
          moq: 15,
          featured: false,
          category: "drinkware",
          categoryName: "Drinkware",
        },
        {
          id: "duo-ceramic-mug-gift-set",
          name: "Duo Ceramic Mug Gift Set",
          price: 799,
          offerPrice: 649,
          image:
            "https://placehold.co/520x520/1B4F72/BDE0F3?text=Duo+Mug+Gift+Set",
          shortDesc:
            "A matching pair of premium ceramic mugs in a beautiful gift box.",
          description:
            "Two is better than one — our Duo Ceramic Mug Gift Set pairs two matching 300ml premium ceramic mugs in an elegant gift box. Perfect for welcoming new couples, celebrating work anniversaries, or gifting to influential client pairs. Each mug can be printed with your company logo or a custom message.",
          features: [
            "2 × 300ml premium ceramic mugs",
            "Matching designs with custom print",
            "Elegant gift box with insert",
            "Microwave and dishwasher safe",
          ],
          moq: 20,
          featured: false,
          category: "drinkware",
          categoryName: "Drinkware",
        },
      ],
    },
    {
      id: "stationery-office",
      name: "Stationery & Office",
      subtitle: "Desk Essentials, Elevated",
      description:
        "Premium diaries, notebooks, pens, and desk accessories that make your brand a constant presence in every professional workspace.",
      image:
        "https://placehold.co/800x500/2C1B0E/E8DFD3?text=Stationery+%26+Office",
      products: [
        {
          id: "leather-executive-diary",
          name: "Leather Executive Diary A5",
          price: 899,
          offerPrice: 749,
          image:
            "https://placehold.co/520x520/2C1B0E/E8DFD3?text=Executive+Diary+A5",
          shortDesc:
            "Premium PU leather diary with gilded pages and ribbon bookmark.",
          description:
            "Our Leather Executive Diary is the ultimate professional companion — A5 format, premium PU leather cover, gilded page edges, and a satin ribbon bookmark. With 365 pages of quality ivory paper, it's perfect for planning, note-taking, and journaling. Custom emboss your logo on the cover for a sophisticated corporate gift.",
          features: [
            "A5 format, 365 pages",
            "Premium PU leather cover",
            "Gold gilded page edges",
            "Custom logo embossing on cover",
          ],
          moq: 20,
          featured: true,
          category: "stationery-office",
          categoryName: "Stationery & Office",
        },
        {
          id: "premium-hardcover-notebook",
          name: "Premium Hardcover Notebook",
          price: 499,
          offerPrice: 399,
          image:
            "https://placehold.co/520x520/2C1B0E/E8DFD3?text=Hardcover+Notebook",
          shortDesc:
            "Durable hardcover notebook with dot-grid pages and elastic closure.",
          description:
            "Our Premium Hardcover Notebook is inspired by the classic Moleskine but built for the corporate world. With a sturdy hardcover, 200 pages of 100gsm dot-grid paper, elastic closure band, and an expandable inner pocket, it suits designers, strategists, and creatives alike. Full-colour cover printing available.",
          features: [
            "A5, 200 pages, 100gsm dot-grid",
            "Sturdy hardcover binding",
            "Elastic closure & inner pocket",
            "Full-colour cover printing",
          ],
          moq: 30,
          featured: false,
          category: "stationery-office",
          categoryName: "Stationery & Office",
        },
        {
          id: "twisted-metal-ball-pen",
          name: "Twisted Metal Ball Pen",
          price: 299,
          offerPrice: 249,
          image:
            "https://placehold.co/520x520/2C1B0E/E8DFD3?text=Metal+Ball+Pen",
          shortDesc:
            "Executive-grade twisted metal pen with smooth Schmidt refill.",
          description:
            "The Twisted Metal Ball Pen makes a bold statement at every meeting. Its distinctive helix-twist barrel is precision-machined in zinc alloy with a matte chrome finish, weighted for a perfect grip. Loaded with a premium Schmidt refill for smooth, skip-free writing. Laser engrave your brand name on the barrel.",
          features: [
            "Zinc alloy twisted barrel",
            "Matte chrome & gold finish options",
            "Schmidt premium blue/black refill",
            "Velvet individual gift sleeve",
          ],
          moq: 50,
          featured: false,
          category: "stationery-office",
          categoryName: "Stationery & Office",
        },
        {
          id: "complete-desk-organizer-kit",
          name: "Complete Desk Organizer Kit",
          price: 1399,
          offerPrice: 1099,
          image:
            "https://placehold.co/520x520/2C1B0E/E8DFD3?text=Desk+Organizer+Kit",
          shortDesc:
            "5-piece bamboo desk organizer kit for a clutter-free, stylish workspace.",
          description:
            "Transform any desk into an organised, elegant workspace with our Complete Desk Organizer Kit. Five bamboo pieces — pen holder, card stand, paper tray, cable tidy, and phone dock — nest together in a unified modular design. Eco-friendly, durable, and customisable with laser-engraved branding. A gift that improves every workday.",
          features: [
            "5-piece sustainable bamboo set",
            "Modular, customisable layout",
            "Phone dock with cable slot",
            "Laser-engraved logo on each piece",
          ],
          moq: 10,
          featured: false,
          category: "stationery-office",
          categoryName: "Stationery & Office",
        },
        {
          id: "planner-pen-gift-set",
          name: "Planner & Pen Gift Set",
          price: 999,
          offerPrice: 799,
          image:
            "https://placehold.co/520x520/2C1B0E/E8DFD3?text=Planner+%26+Pen+Set",
          shortDesc:
            "Leather-bound planner paired with a premium metal pen in a gift box.",
          description:
            "The Planner & Pen Gift Set is the quintessential corporate gift for the organised professional. A leatherette-covered annual planner (monthly + weekly views, habit tracker, and notes pages) is paired with a premium metal rollerball pen in a matching colour, packed in a glossy gift box with a ribbon bow.",
          features: [
            "A5 annual planner, 12 months",
            "Matching premium metal rollerball",
            "Glossy gift box with ribbon",
            "Custom logo on cover and pen",
          ],
          moq: 15,
          featured: false,
          category: "stationery-office",
          categoryName: "Stationery & Office",
        },
      ],
    },
    {
      id: "accessories",
      name: "Accessories & Lifestyle",
      subtitle: "Everyday Essentials",
      description:
        "From pocket-size keychains to elegant desk lamps — thoughtful accessories that make your brand a constant, welcome presence.",
      image:
        "https://placehold.co/800x500/1a1a2e/D8BFD8?text=Accessories+%26+Lifestyle",
      products: [
        {
          id: "premium-leather-keychain",
          name: "Premium Leather Keychain",
          price: 399,
          offerPrice: 299,
          image:
            "https://placehold.co/520x520/1a1a2e/D8BFD8?text=Leather+Keychain",
          shortDesc:
            "Genuine leather keychain with brass hardware and custom debossing.",
          description:
            "Small but mighty, our Premium Leather Keychain is an everyday companion that keeps your brand top-of-mind. Crafted from genuine top-grain leather with solid brass split ring and key ring, it ages beautifully over time. Custom deboss your logo, initials, or a short message on the leather tag.",
          features: [
            "Genuine top-grain leather",
            "Solid brass hardware",
            "Custom debossed logo / initials",
            "Individual organza pouch",
          ],
          moq: 50,
          featured: false,
          category: "accessories",
          categoryName: "Accessories & Lifestyle",
        },
        {
          id: "elegant-wooden-desk-lamp",
          name: "Elegant Wooden Desk Lamp",
          price: 1599,
          offerPrice: 1199,
          image:
            "https://placehold.co/520x520/1a1a2e/D8BFD8?text=Wooden+Desk+Lamp",
          shortDesc:
            "Warm-glow bamboo desk lamp with USB charging port and dimmer.",
          description:
            "Our Elegant Wooden Desk Lamp adds warmth and sophistication to any home office or executive desk. The natural bamboo frame emits a warm 3000K glow that reduces eye fatigue during long work sessions. A built-in USB-A charging port keeps devices powered up, and the touch dimmer adjusts brightness to three levels.",
          features: [
            "Natural bamboo frame",
            "Warm 3000K LED, 3 brightness levels",
            "Touch dimmer + USB-A charging port",
            "Laser-engraved logo on base",
          ],
          moq: 10,
          featured: true,
          category: "accessories",
          categoryName: "Accessories & Lifestyle",
        },
        {
          id: "corporate-id-card-holder-set",
          name: "Corporate ID Card Holder Set",
          price: 499,
          offerPrice: 399,
          image:
            "https://placehold.co/520x520/1a1a2e/D8BFD8?text=ID+Card+Holder",
          shortDesc:
            "Slim PU leather ID card holder with retractable reel and custom print.",
          description:
            "Keep employees looking sharp with our Corporate ID Card Holder Set. The slim PU leather holder accommodates standard ID cards and features a 90cm retractable badge reel for easy tap-in access. Full-colour printing on the front panel proudly displays your company logo and colour scheme.",
          features: [
            "Slim PU leather, fits standard IDs",
            "90cm retractable badge reel",
            "Full-colour custom printing",
            "Metal carabiner clip",
          ],
          moq: 30,
          featured: false,
          category: "accessories",
          categoryName: "Accessories & Lifestyle",
        },
        {
          id: "premium-canvas-tote-bag",
          name: "Premium Canvas Tote Bag",
          price: 999,
          offerPrice: 799,
          image:
            "https://placehold.co/520x520/1a1a2e/D8BFD8?text=Canvas+Tote+Bag",
          shortDesc:
            "Eco-friendly heavy-duty canvas tote bag with inner zip pocket.",
          description:
            "Make an eco-conscious statement with our Premium Canvas Tote Bag. Made from 12oz heavy-duty cotton canvas with reinforced stitched handles and a zip-secured inner pocket, it is built to last for years. A large print area on both sides ensures maximum brand visibility at events, seminars, and daily commutes.",
          features: [
            "12oz heavy-duty cotton canvas",
            "Reinforced stitched handles",
            "Inner zip pocket",
            "Large custom print area, both sides",
          ],
          moq: 25,
          featured: false,
          category: "accessories",
          categoryName: "Accessories & Lifestyle",
        },
        {
          id: "smart-10000mah-power-bank",
          name: "Smart 10000mAh Power Bank",
          price: 1999,
          offerPrice: 1599,
          image:
            "https://placehold.co/520x520/1a1a2e/D8BFD8?text=Smart+Power+Bank",
          shortDesc:
            "Slim 10000mAh power bank with dual USB-A + USB-C PD fast charging.",
          description:
            "The Smart 10000mAh Power Bank is the gift every modern professional actually wants. Its ultra-slim aluminium body houses a 10000mAh lithium polymer battery capable of delivering two full charges to most smartphones. Dual outputs (USB-A + USB-C PD 18W fast charge) mean two devices can charge simultaneously. Your logo is laser-engraved for a premium finish.",
          features: [
            "10000mAh lithium polymer battery",
            "USB-C PD 18W + USB-A dual output",
            "Ultra-slim aluminium body",
            "LED charge indicator, laser logo",
          ],
          moq: 10,
          featured: true,
          category: "accessories",
          categoryName: "Accessories & Lifestyle",
        },
      ],
    },
  ],

  getFeatured() {
    const featured = [];
    this.categories.forEach((cat) => {
      cat.products.forEach((p) => {
        if (p.featured) featured.push(p);
      });
    });
    return featured;
  },

  getCategoryById(id) {
    return this.categories.find((c) => c.id === id) || null;
  },

  getProductById(id) {
    for (const cat of this.categories) {
      const product = cat.products.find((p) => p.id === id);
      if (product) return product;
    }
    return null;
  },

  getRelatedProducts(productId, categoryId, limit = 3) {
    const cat = this.getCategoryById(categoryId);
    if (!cat) return [];
    return cat.products.filter((p) => p.id !== productId).slice(0, limit);
  },

  formatPrice(price) {
    return "₹" + price.toLocaleString("en-IN");
  },

  getDiscount(price, offerPrice) {
    return Math.round(((price - offerPrice) / price) * 100);
  },
};

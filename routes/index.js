const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  let testimonials = [
    {
      id: 1,
      text: "Los chatbots me ayudaron a aumentar ventas!",
      author: "Victor Juan Jimenez Flores",
      img: "images/testimonial-2.jpg",
    },
    {
      id: 2,
      text: "Se incremento mi retencion de clientes!",
      author: "Juan Carlos Jimenez Flores",
      img: "images/testimonial-2.jpg",
    },
    {
      id: 3,
      text: "Mejoraron mis ganancias",
      author: "Test 2",
      img: "images/testimonial-2.jpg",
    },
    {
      id: 4,
      text: "Gracias!",
      author: "Ubaldo Castilla",
      img: "images/testimonial-2.jpg",
    },
    {
      id: 4,
      text:
        "Los chatbots hicieron que crezca mi cartera de clientes... Buen servicio!",
      author: "Reynaldo De Chatillon",
      img: "images/testimonial-2.jpg",
    },
  ];
  let categories = [
    {
      id: 1,
      name: "Comida",
      img: "images/Categories/restaurant.svg",
      path: "/restaurantes",
    },
    {
      id: 2,
      name: "Alojamiento",
      img: "images/Categories/hotel.svg",
      path: "/hoteles",
    },
    {
      id: 3,
      name: "Educación",
      img: "images/Categories/education.svg",
      path: "/educacion",
    },
  ];
  let benefitsHome = [
    {
      id: 1,
      title: "Atención las 24 horas",
      img: "images/Benefits/robot.svg",
      description:
        "Los chatbots trabajan para su organización las 24 horas, respondiendo consultas y realizando ventas de manera inmediata.",
    },
    {
      id: 2,
      title: "Nuevos canales de comunicación",
      img: "images/Benefits/multiplatform.svg",
      description:
        "Los chatbots extienden los canales de comunicación existentes ¡Tu organización puede ofrecer servicio al cliente en las principales redes sociales y servicios de mensajería ! ",
    },
    {
      id: 3,
      title: "Recolección de datos",
      img: "images/Benefits/charts.svg",
      description:
        "Los chatbots recolectan datos de los usuarios permanentemente ¡Puedes segmentar a tus clientes y enviar promociones de acuerdo a sus preferencias !",
    },
    {
      id: 4,
      title: "Mejores beneficios",
      img: "images/Benefits/sales.svg",
      description:
        "Los chatbots tienen el potencial de aumentar la satisfacción de los clientes, mejorando beneficios y reduciendo costos ¡Ahorra costes en formación y personal a tu área de atención al cliente !",
    },
  ];
  res.render("home", {
    anio: new Date().getFullYear(),
    testimonials,
    categories,
    benefitsHome,
  });
});

router.get("/about", (req, res) => {
  res.render("about");
});
router.get("/preguntas-frecuentes", (req, res) => {
  res.render("Faqs");
});
router.get("/precios", (req, res) => {
  let plans = [
    {
      id: 1,
      name: "Ayuda COVID-19",
      benefits: [
        "- Chatbot funcional en las plataformas que elija",
        "Responde preguntas frecuentes",
        "",
      ],
      price: "Gratis",
      color: "bg-primary",
      description:
        "⚠️ Debido a la conyuntura vivida, se creó este plan para apoyar la reactivación de la economía.",
    },
    {
      id: 2,
      name: "Emprendedores",
      benefits: [
        "Chatbot funcional en Facebook Messenger",
        "Recolección básica de datos",
        "Tablero de control",
        "Edición de intents",
      ],
      price: "10$ por mes",
      color: "bg-info",
      description: "Ideal para emprendedores y pequeñas empresas",
    },
    // {
    //     id: 3,
    //     name: "Pro",
    //     benefits: ["Chatbot funcional en Facebook Messenger", "Recolección básica de datos", "Tablero de control", "Edición de intents"],
    //     price: "10$ por mes",
    //     color: "bg-info",
    //     description: "Ideal para "
    // },
    {
      id: 4,
      name: "Personalizado",
      benefits: [
        "Chatbot funcional en Facebook Messenger",
        "Recolección básica de datos",
        "Tablero de control",
        "Edición de intents",
      ],
      price: "10$ por mes",
      color: "bg-info",
      description: "",
    },
  ];
  res.render("Pricing", {
    plans,
  });
});

router.get("/red-social", (req, res) => {
  let socialNetworks = [
    {
      id: "1",
      name: "Facebook",
      icon: "fab fa-facebook-f",
      description:
        "La herramienta está entre las favoritas del los jóvenes por su versatilidad en su diseño, el cual brinda comodidad a los jóvenes al momento de expresarse con sus amistades.",
      requirements: ["Nombre de la organziación"],
      considerations: [
        "El proceso de revisión es exhaustivo",
        "Puede tardar 1 mes",
      ],
      additionalInfo: ["www.google.com.pe"],
    },
    {
      id: "2",
      name: "Telegram",
      icon: "fab fa-telegram",
      description:
        "Telegram es una plataforma de mensajería y VOIP. La aplicación está enfocada en la mensajería instantánea, el envío de varios archivos y la comunicación en masa.",
      requirements: ["Nombre de la organziación"],
      considerations: [
        "El proceso de revisión es exhaustivo",
        "Puede tardar 1 mes",
      ],
      additionalInfo: ["www.google.com.pe"],
    },
    {
      id: "3",
      name: "WhatsApp",
      icon: "fab fa-whatsapp",
      description:
        "WhatsApp Messenger es una aplicación de mensajería instantánea para teléfonos inteligentes, en la que se envían y reciben mensajes mediante Internet, así como imágenes, vídeos, audios, grabaciones de audio, entre otras funciones.",
      requirements: ["Nombre de la organziación"],
      considerations: [
        "El proceso de revisión es exhaustivo",
        "Puede tardar 1 mes",
      ],
      additionalInfo: ["www.google.com.pe"],
    },
  ];
  res.render("socialNetwork", { socialNetworks });
});
router.get("/solicitud", (req, res) => {
  let query = req.query;
  let facebook = query.Facebook === "on" ? true : false;
  let telegram = query.Telegram === "on" ? true : false;
  let whatsapp = query.WhatsApp === "on" ? true : false;
  res.render("chatbotRequestForm", { facebook, telegram, whatsapp });
});

module.exports = router;

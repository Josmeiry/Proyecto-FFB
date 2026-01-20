window.addEventListener('DOMContentLoaded', () => {


  
  const menu = document.querySelector('.menu');
  const toggle = document.querySelector('.menu-toggle');
  const menuList = document.getElementById('menu-list');
  const langEn = document.getElementById('lang-en');
  const langEs = document.getElementById('lang-es');

  if (menu && toggle && menuList && langEn && langEs) {

    const menus = {
      en: [
        "Home", "Wash Pricing/Memberships", "Detail Services", "Ceramic Coating",
        "Sign Up For Membership", "Manage Membership", "About Us", "Gallery",
        "Customer Reviews", "Join Our Team", "Check Gift Card Balance", "FAQ",
        "Terms and Conditions", "Privacy Policy", "Weather"
      ],
      es: [
        "Inicio", "Precios/Membresías", "Servicios de Detalle", "Recubrimiento Cerámico",
        "Regístrate para Membresía", "Gestionar Membresía", "Sobre Nosotros", "Galería",
        "Reseñas de Clientes", "Únete a Nuestro Equipo", "Consultar Saldo de Tarjeta de Regalo", "Preguntas Frecuentes",
        "Términos y Condiciones", "Política de Privacidad", "Clima"
      ]
    };

    function loadMenu(lang = "en") {
      console.log("Idioma cargado:", lang);
      menuList.innerHTML = "";
      menus[lang].forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="#">${item}</a>`;
        menuList.appendChild(li);
      });
      localStorage.setItem("preferredLang", lang);
    }

    langEn.addEventListener("click", () => loadMenu("en"));
    langEs.addEventListener("click", () => loadMenu("es"));

    toggle.addEventListener("click", () => {
      menu.classList.toggle("open");
      toggle.innerHTML = menu.classList.contains("open") ? "&times;" : "&#9776;";
    });

    const savedLang = localStorage.getItem("preferredLang") || "es";
    loadMenu(savedLang);
  } else {
    console.warn("⚠️ Elementos del menú no se encontraron en esta página (es normal).");
  }

  // ============================
  //  CHAT FLOTANTE (PROTEGIDO)
  // ============================
  const chatBtn = document.getElementById("chat-btn");
  const chatBox = document.getElementById("chat-box");
  const closeChat = document.getElementById("close-chat");
  const sendBtn = document.getElementById("send-btn");
  const chatInput = document.getElementById("chat-input");
  const chatBody = document.querySelector(".chat-body");

  if (
    chatBtn && chatBox && closeChat &&
    sendBtn && chatInput && chatBody
  ) {
    chatBtn.addEventListener("click", () => {
      chatBox.style.display = "flex";
    });

    closeChat.addEventListener("click", () => {
      chatBox.style.display = "none";
    });

    sendBtn.addEventListener("click", () => {
      let msg = chatInput.value.trim();
      if (msg !== "") {
        let p = document.createElement("p");
        p.textContent = "Tú: " + msg;
        chatBody.appendChild(p);
        chatInput.value = "";
        chatBody.scrollTop = chatBody.scrollHeight;
      }
    });
  } else {
    console.warn("⚠️ Algunos elementos del chat no se encontraron (normal en varias páginas).");
  }

});

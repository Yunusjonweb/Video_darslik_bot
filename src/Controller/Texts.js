module.exports = class Texts {
  static reqCourses(lang) {
    if (lang == "uz") {
      return {
        text: `📚 Kurslardan birni tanlang`,
        courses: [
          "🛠 Kompyuter savodxonligi",
          "💻 Frontend dasturlash",
          "📚 English",
        ],
      };
    } else if (lang == "ru") {
      return {
        text: `📚 Выберите один из курсов`,
        courses: [
          "🛠 Компьютерная грамотность",
          "💻 Внешнее программирование",
          "📚 Английский",
        ],
      };
    } else if (lang == "eng") {
      return {
        text: `📚 Choose one of the courses`,
        courses: [
          "🛠 Computer literacy",
          "💻 Frontend Programming",
          "📚 English",
        ],
      };
    }
  }

  static reqPhone(lang) {
    if (lang == "uz") {
      return `📝 Ro'yxatdan o'tish uchun telefon raqamingizni kiriting!\n📞 Masalan: +998XX XXXXXXX`;
    } else if (lang == "ru") {
      return `📝 Введите свой номер телефона для регистрации! \n📞 Например: +998XX XXXXXXX`;
    } else if (lang == "eng") {
      return `📝 Enter your phone number to register! \n📞 For example: +998XX XXXXXXX`;
    }
  }

  static reqCode(lang) {
    if (lang == "uz") {
      return {
        text: `☎️ Telefoningizga tasdiqlash kodi yuborildi. Tasdiqlash kodini kiriging!`,
        btn: "♻️ Qayta kod so'rash",
      };
    } else if (lang == "ru") {
      return {
        text: `☎️ На ваш телефон отправлен код подтверждения. Введите код подтверждения!`,
        btn: "♻️ Запросить код еще раз",
      };
    } else if (lang == "eng") {
      return {
        text: `☎️ A confirmation code has been sent to your phone. Enter the confirmation code!`,
        btn: "♻️ Request code again",
      };
    }
  }

  static incorrectCode(lang) {
    if (lang == "uz") {
      return `❌ Xato kod terildi, qayta urinib ko'ring`;
    } else if (lang == "ru") {
      return `❌ Набран код ошибки, попробуйте еще раз`;
    } else if (lang == "eng") {
      return `❌ Error code dialed, try again`;
    }
  }

  static finishReg(lang, fristname) {
    if (lang == "uz") {
      return `🎉 ${fristname} Registratsiya jarayoningiz muvaffaqqiyatli o'tdi.`;
    } else if (lang == "ru") {
      return `🎉 ${fristname} Ваш процесс регистрации прошел успешно.`;
    } else if (lang == "eng") {
      return `🎉 ${fristname} Your registration process has been successful.`;
    }
  }

  static MenuMsg(lang) {
    if (lang == "uz") {
      return {
        text: "Quyidagilardan birini tanlang",
        keyboard: {
          office: "💻 Office darslari",
          programming: "💻 Dasturlash darslari",
          comment: "✍️ Taklif yuborish",
          settings: "⚙️ Sozlamalar",
          statistics: "📊 Statistikasi",
        },
      };
    } else if (lang == "ru") {
      return {
        text: "Выберите один из следующих",
        keyboard: {
          office: "💻 Офисные классы",
          programming: "💻 Классы программирования",
          comment: "✍️ Отправить предложение",
          settings: "⚙️ Настройки",
          statistics: "📊 Cтатистика",
        },
      };
    } else if (lang == "eng") {
      return {
        text: "Choose one of the following",
        keyboard: {
          office: "💻 Office classes",
          programming: "💻 Programming classes",
          comment: "✍️ Send an offer",
          settings: "⚙️ Settings",
          statistics: "📊 Statistics",
        },
      };
    }
  }

  static CommentStart(lang) {
    if (lang == "uz") {
      return {
        text: "📩 Fikr va mulohazalaringizni yuboring",
        btn: "⬅️ Ortga",
      };
    } else if (lang == "ru") {
      return {
        text: "📩 Отправьте свои мысли и отзывы",
        btn: "⬅️ Назад",
      };
    } else if (lang == "eng") {
      return {
        text: "📩 Leave your commments",
        btn: "⬅️ Back",
      };
    }
  }

  static CommentSaved(lang) {
    if (lang == "uz") {
      return "✅ Fikr va mulohazalaringiz uchun rahmat";
    } else if (lang == "ru") {
      return "✅ Спасибо за ваш отзыв и отзыв";
    } else if (lang == "eng") {
      return "✅ Thanks for your comments";
    }
  }

  static Settings(user) {
    if (user.lang == "uz") {
      return {
        text: `<b>Muloqot tili:</b> 🇺🇿 O'zbekcha\n<b>Kurs nomi:</b> ${user?.courses}\n<b>Telefon:</b> +${user?.phone_number}\n\nQuyidagilardan birini tanlang`,
        btns: {
          lang: "Muloqot tili",
          course: "Kurs nomi",
          phone: "Telefon",
        },
      };
    } else if (user.lang == "ru") {
      return {
        text: `<b>Язык общения:</b> 🇷🇺 Русский\n<b>Название курса:</b> ${user?.courses}\n<b>Телефон:</b> +${user?.phone_number}\n\nВыберите один из следующих`,
        btns: {
          lang: "Язык общения",
          course: "Название курса",
          phone: "Телефон",
        },
      };
    } else if (user.lang == "eng") {
      return {
        text: `<b>Language:</b> 🇬🇧 English\n<b>Course name:</b> ${user?.courses}\n<b>Phone:</b> +${user?.phone_number}\n\nChoose one of the following`,
        btns: {
          lang: "Language",
          course: "Course name",
          phone: "Phone",
        },
      };
    }
  }

  static LangChange(lang) {
    if (lang == "uz") {
      return "Muloqot tili o'zgardi";
    } else if (lang == "ru") {
      return "Изменился язык общения";
    } else if (lang == "eng") {
      return "Language was changed";
    }
  }

  static async CourseList(lang) {
    if (lang == "uz") {
      return {
        course: [
          "🛠 Kompyuter savodxonligi",
          "💻 Frontend dasturlash",
          "📚 English",
        ],
      };
    } else if (lang == "ru") {
      return {
        course: [
          "🛠Компьютерная грамотность",
          "💻 Фронтенд-программирование",
          "📚 Английский",
        ],
      };
    } else if (lang == "eng") {
      return {
        course: ["🛠Computer Literacy", "💻 Frontend programming", "📚 English"],
      };
    }
  }

  static CourseChange(lang) {
    if (lang == "uz") {
      return "Kurs o'zgardi";
    } else if (lang == "ru") {
      return "Курс изменился";
    } else if (lang == "eng") {
      return "Course was changed";
    }
  }

  static PhoneSend(user) {
    if (user.lang == "uz") {
      return {
        text: `<b>Muloqot tili:</b> 🇺🇿 O'zbekcha\n<b>Kurs:</b> ${user?.courses}\n<b>Telefon:</b> +${user?.phone_number}\n\n☎️ Telefon raqamingizni yozib qoldiring`,
        btns: {
          back: "⬅️ Ortga",
        },
      };
    } else if (user.lang == "ru") {
      return {
        text: `<b>Язык общения:</b> 🇷🇺 Русский\n<b>Курс:</b> ${user?.courses}\n<b>Телефон:</b> +${user?.phone_number}\n\n☎️ Запишите свой номер телефона`,
        btns: {
          back: "⬅️ Назад",
        },
      };
    } else if (user.lang == "eng") {
      return {
        text: `<b>Language:</b> 🇬🇧 English\n<b>Course:</b> ${user?.courses}\n<b>Phone:</b> +${user?.phone_number}\n\n☎️ Send your phone number`,
        btns: {
          lang: "⬅️ Back",
        },
      };
    }
  }

  static reqLesson(lang) {
    if (lang == "uz") {
      return {
        text: "Mualliflardan birini tanlang 👇",
        btns: {
          back: "⬅️ Ortga",
          location: "📍 Geo-joylashuvni yuborish",
        },
      };
    } else if (lang == "ru") {
      return {
        text: "Выберите одного из авторов 👇",
        btns: {
          back: "⬅️ Ortga",
          location: "📍 Geo-joylashuvni yuborish",
        },
      };
    } else if (lang == "eng") {
      return {
        text: "Choose one of the authors 👇",
        btns: {
          back: "⬅️ Ortga",
          location: "📍 Geo-joylashuvni yuborish",
        },
      };
    }
  }

  static verLocation(lang) {
    if (lang == "uz") {
      return {
        text: "Ushbu manzilni tasdiqlaysizmi?",
        btns: {
          yes: "✅ Ha",
          no: "❌ Yo'q",
        },
      };
    } else if (lang == "ru") {
      return {
        text: "Вы подтверждаете этот адрес?",
        btns: {
          yes: "✅ Да",
          no: "❌ Нет",
        },
      };
    }
    if (lang == "eng") {
      return {
        text: "Confirm this address?",
        btns: {
          yes: "✅ Yes",
          no: "❌ No",
        },
      };
    }
  }

  static verAttribution(lang) {
    if (lang == "uz") {
      return {
        text: "Ushbu maxsulotlar haqiqatan yuborilsinmi ?",
        btns: {
          yes: "✅ Ha",
          no: "❌ Yo'q",
        },
      };
    } else if (lang == "ru") {
      return {
        text: "Действительно ли эти продукты отправляются ?",
        btns: {
          yes: "✅ Да",
          no: "❌ Нет",
        },
      };
    }
    if (lang == "eng") {
      return {
        text: "Are these products really sent ?",
        btns: {
          yes: "✅ Yes",
          no: "❌ No",
        },
      };
    }
  }

  static startOrderMenu(lang) {
    if (lang == "uz") {
      return {
        text: "Quydagilardan birini tanlang",
        btns: {
          change_location: "📍 Manzilni o'zgartirish",
          menu: "🍽 Menu",
          orders: "🛍 Buyurtmalarim",
          vacancy: "👪 Bosh ish o'rni",
          comment: "✍️ Fikr bildirish",
          settings: "⚙️ Sozlamalar",
        },
      };
    } else if (lang == "ru") {
      return {
        text: "Выберите один из следующих вариантов",
        btns: {
          change_location: "📍 Изменить адрес",
          menu: "🍽 Меню",
          orders: "🛍 Мои заказы",
          vacancy: "👪 Главная работа",
          comment: "♦ Комментарий",
          settings: "⚙ ️ Настройки",
        },
      };
    } else if (lang == "eng") {
      return {
        text: "Choose one of those below",
        btns: {
          change_location: "📍 Change address",
          menu: "🍽 Menu",
          orders: "🛍 My orders",
          vacancy: "👪 Head job",
          comment: "✍️ Feedback",
          settings: "⚙️ Settings",
        },
      };
    }
  }

  static Menu(lang) {
    if (lang == "uz") {
      return "Kategoriyalardan birini tanlang";
    }
    if (lang == "ru") {
      return "Выберите одну из категорий";
    }
    if (lang == "eng") {
      return "Choose one of the categories";
    }
  }

  static vacancyStart(lang) {
    if (lang == "uz") {
      return {
        text: "Ish joyi topish uchun ariza berish\nHozir sizga birnecha savollar beriladi. Har biriga javob bering. Oxirida agar hammasi to`g`ri bo`lsa, HA tugmasini bosing va arizangiz Adminga yuboriladi.",
        btn: "⬅️ Ortga",
      };
    }
    if (lang == "ru") {
      return {
        text: "Подача заявки на работу\n теперь вам будет задано несколько вопросов. Ответьте на каждый. В конце, если все правильно, нажмите да, и ваше приложение будет отправлено администратору.",
        btn: "⬅️ Назад",
      };
    }
    if (lang == "eng") {
      return {
        text: "Applying to find a job\n You will now be asked some questions. Answer each one. At the end, if everything is right, click yes and your application will be sent to Admin.",
        btn: "⬅️ Back",
      };
    }
  }
};

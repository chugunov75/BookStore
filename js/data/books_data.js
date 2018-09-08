
function DataManager() {

  var catalogSections = [{
    "catalogSectionId": 1,
    "catalogSectionName": "языки программирования"
  }, {
    "catalogSectionId": 2,
    "catalogSectionName": "веб-разработка"
  }, {
    "catalogSectionId": 3,
    "catalogSectionName": "базы данных"
  }, {
    "catalogSectionId": 4,
    "catalogSectionName": "операционные системы"
  }];
  var booksData = [{
    "id": 1,
    "sectionIdes": [2],
    "name": "Angular для профессионалов",
    "authors": ["Фримен Адам"],
    "price": 975.00,
    "publisher": "Питер",
    "isbn": "978-5-4461-0451-2",
    "photoLarge": "images/booksPhoto/1_big.jpg",
    "photoSmall": "images/booksPhoto/1_small.jpg",
    "description": "Выжмите из Angular — ведущего фреймворка для динамических приложений JavaScript — всё. \
      Адам Фримен начинает с описания MVC и его преимуществ, затем показывает, как эффективно использовать Angular, \
      охватывая все этапы: начиная с основ и до самых передовых возможностей, которые кроются в глубинах этого фреймворка. \
      Каждая тема изложена четко и лаконично, снабжена большим количеством подробностей, которые позволят стать вам \
      действительно эффективными. Наиболее важные фичи даны без излишних подробностей, но содержат всю необходимую информацию, \
      чтобы вы смогли обойти все подводные камни. Рассмотрена 4 версия Angular.",
    "pagesQuantity": 800,
    "category": "Java Script",
    "categoryName": "Java Script"
  }, {
    "id": 2,
    "sectionIdes": [2],
    "name": "ASP.NET Core MVC с примерами на C# для профессионалов. 6-е издание",
    "authors": ["Фримен Адам"],
    "price": 1195,
    "publisher": "Диалектика",
    "isbn": "978-5-9908910-4-3",
    "photoLarge": "images/booksPhoto/2_big.jpg",
    "photoSmall": "images/booksPhoto/2_small.jpg",
    "description": "Разрабатывайте оптимизированные под облако веб-приложения с использованием ASP.NET Core MVC! \
      В книге ASP.NET Core MVC с примерами на C# для профессионалов объясняется, как эффективно применять \
      новые возможности инфраструктуры модель-представление-контроллер (MVC), обновленной до версии ASP.NET Core MVC. \
      Теперь вы сможете создавать более экономные, оптимизированные под облако и готовые к функционированию на \
      мобильных устройствах приложения для платформы .NET. Книга предоставляет детальное описание того, как вписать \
      новую функциональность в существующий контекст разработки. Инфраструктура ASP.NET Core MVC — это самая последняя \
      ступень развития веб-платформы ASP.NET производства Microsoft, построенная на совершенно новом фундаменте. \
      Она олицетворяет коренное изменение в том, как Microsoft конструирует и развертывает инфраструктуры для \
      разработки веб-приложений, и свободна от унаследованных технологий, подобных Web Forms. \
      Платформа ASP.NET Core MVC предлагает независимую от хоста инфраструктуру и высокопродуктивную модель программирования, \
      которая способствует построению более чистой кодовой архитектуры, разработке через тестирование и значительной расширяемости. \
      Новое 6-е издание этой лидирующей на рынке книги следует тому же формату и стилю подачи материала, которым отличались \
      популярные предыдущие издания, но повсеместно обновлено с учетом выпуска ASP.NET Core MVC. Адам Фримен, автор многочисленных бестселлеров, \
      тщательно пересмотрел книгу, чтобы показать, как извлечь максимум из ASP.NET Core MVC.<br><br>Он представляет полностью \
      работающий учебный пример функционирующего приложения ASP.NET MVC, который вы сможете использовать в качестве шаблона для собственных проектов. ",
    "pagesQuantity": 992,
    "category": "ASP.NET",
    "categoryName": "ASP.NET"
  }, {
    "id": 3,
    "sectionIdes": [2],
    "name": "ASP.NET MVC 5 с примерами на C# 5.0 для профессионалов, 5-е издание",
    "authors": ["Фримен Адам"],
    "price": 1025,
    "publisher": "Вильямс",
    "isbn": "978-5-8459-2008-9",
    "photoLarge": "images/booksPhoto/3_big.jpg",
    "photoSmall": "images/booksPhoto/3_small.jpg",
    "description": "В пятом издании книги ASP.NET MVC 5 с примерами на C# 5.0 для профессионалов раскрыты улучшения ASP.NET MVC 5, \
      включая возможность определения маршрутов с использованием атрибутов C# и возможность переопределения фильтров. \
      Пользовательский интерфейс, доступный при построении приложений MVC, также существенно усовершенствован. \
      Новая, более тесно интегрированная IDE-среда Visual Studio 2013 была создана специально с учетом разработки приложений MVC, \
      и теперь она предоставляет полный набор инструментов для улучшения процесса разработки, помогая в анализе, отладке и развертывании кода. \
      Инфраструктура ASP.NET MVC 5 Framework представляет собой последнюю версию веб-платформы ASP.NET от Microsoft. \
      Она предлагает высокопродуктивную модель программирования, которая способствует построению более чистой кодовой архитектуры, \
      обеспечивает разработку через тестирование и поддерживает повсеместную расширяемость в комбинации со всеми преимуществами ASP.NET. \
      В книге ASP.NET MVC 5 с примерами на C# 5.0 для профессионалов  также рассматривается популярная JavaScript-библиотека Bootstrap, \
      которая теперь изначально включена в MVC 5 и предоставляет разработчикам даже более широкий диапазон многоплатформенных \
      вариантов средств CSS и HTML5, чем было ранее, не требуя приложения дополнительных усилий по загрузке библиотек третьих сторон.",
    "pagesQuantity": 736,
    "category": "ASP.NET",
    "categoryName": "ASP.NET"
  }, {
    "id": 4,
    "sectionIdes": [2],
    "name": "jQuery 2.0 для профессионалов",
    "authors": ["Фримен Адам"],
    "price": 425,
    "publisher": "Вильямс",
    "isbn": "978-5-8459-1919-9",
    "photoLarge": "images/booksPhoto/4_big.jpg",
    "photoSmall": "images/booksPhoto/4_small.jpg",
    "description": "Выпуск библиотеки jQuery 2.0 ознаменовал начало разработки новой ветки фреймворка jQuery,\
       которая отличается отсутствием поддержки устаревших браузеров и значительно модернизированным API с \
       улучшенной поддержкой CSS3. Библиотека быстро приобретает популярность среди веб-разработчиков по всему миру, устанавливая промышленные стандарты простоты,",
    "pagesQuantity": 1040,
    "category": "Java Script",
    "categoryName": "Java Script"
  }, {
    "id": 5,
    "sectionIdes": [1, 2],
    "name": "Изучаем JavaScript: руководство по созданию современных веб-сайтов. 3-е издание",
    "authors": ["Браун Этан"],
    "price": 475.00,
    "publisher": "Вильямс",
    "isbn": "978-5-9908463-9-5",
    "photoLarge": "images/booksPhoto/5_big.jpg",
    "photoSmall": "images/booksPhoto/5_small.jpg",
    "description": "Сейчас самое время изучить JavaScript. После выхода последней спецификации JavaScript — ECMAScript 6.0 (ES6) \
      — научиться создавать высококачественные приложения на этом языке стало проще, чем когда-либо ранее. \
      Эта книга знакомит программистов (любителей и профессионалов) со спецификацией ES6 наряду с некоторыми связанными с \
      ней инструментальными средствами и методиками на сугубо практической основе. Этан Браун, автор книги Web Development \
      with Node and Express, излагает не только простые и понятные темы (переменные, ветвление потока, массивы), \
      но и более сложные концепции, такие как функциональное и асинхронное программирование. Вы узнаете, как создавать мощные и \
      эффективные веб-приложения для работы на клиенте или сервере Node.js. Используйте ES6 для транскомпиляции в переносимый код ESS.\
       Преобразуйте данные в формат, который может использовать JavaScript.\
        Усвойте основы и механику применения функций JavaScript<br>- Изучите объекты и объектно-ориентированное программирование.\
         Ознакомьтесь с новыми концепциями, такими как итераторы, генераторы и прокси-объекты.\
          Преодолейте сложности асинхронного программирования<br>- Используйте объектную модель документа для приложений, выполняемых в браузере.\
           Изучите основы применения платформы Node.js для разработки серверных приложений",
    "pagesQuantity": 368,
    "category": "Java Script",
    "categoryName": "Java Script"
  }, {
    "id": 6,
    "sectionIdes": [2],
    "name": "Веб-разработка с применением Node и Express. Полноценное использование стека JavaScript",
    "authors": ["Браун Этан"],
    "price": 425.00,
    "publisher": "Питер",
    "isbn": "978-5-496-02156-2",
    "photoLarge": "images/booksPhoto/6_big.jpg",
    "photoSmall": "images/booksPhoto/6_small.jpg",
    "description": "Java Script — самый популярный язык написания клиентских сценариев. \
      Это основополагающая технология для создания всевозможных анимаций и переходов. \
      Без Java Script  практически невозможно обойтись, если требуется добиться современной функциональности на \
      стороне клиента. Единственная проблема с  Java Script  — он не прощает неуклюжего программирования. \
      Экосистема Node  помогает значительно повысить качество приложений - предоставляет фреймворки, библиотеки и утилиты, \
      ускоряющие разработку и поощряющие написание хорошего кода. Эта книга предназначена для программистов, \
      желающих создавать веб-приложения (обычные сайты, воплощающие REST интерфейсы программирования приложений \
      или что-то среднее между ними) с использованием Java Script, Node.js и Express.",
    "pagesQuantity": 336,
    "category": "Java Script",
    "categoryName": "Java Script"
  }, {
    "id": 7,
    "sectionIdes": [1, 2],
    "name": "Секреты JavaScript ниндзя, 2-е издание",
    "authors": ["Резиг Джон", "Бибо Беэр", "Maras Josip"],
    "price": 765.00,
    "publisher": "Вильямс",
    "isbn": "978-5-9908911-8-0",
    "photoLarge": "images/booksPhoto/7_big.jpg",
    "photoSmall": "images/booksPhoto/7_small.jpg",
    "description": "Язык JavaScript быстро становится универсальным для разработки различных типов приложений, будь то для веб, облака, настольных систем или мобильных устройств. \
      Стать профессиональным разработчиком приложений на JavaScript — означает, приобрести ряд эффективных навыков, которые могут пригодиться во всех этих предметных областях. \
      Во втором издании данной книги на многих практических примерах ясно демонстрируется каждое основное понятие или методика. \
      Это издание было полностью переработано с целью показать, как овладеть такими понятиями JavaScript, как функции, замыкания, объекты, прототипы и обещания.\
       В нем рассматриваются и такие понятия, как модель DOM, события и таймеры, а также нормы передовой практики программирования, \
       в том числе тестирование и разработка кросс-браузерного кода. И все это подается с позиции опытных практикующих специалистов по \
       JavaScript, которыми являются авторы книги. Основные темы книги. Написание более эффективного кода с помощью функций, объектов и замыканий. \
       Преодоление скрытых препятствий, которые таит в себе разработка веб-приложений на JavaScript.\
        Применение регулярных выражений для написания лаконичного кода, предназначенного для обработки текста.\
         Управление асинхронным кодом с помощью обещаний.<br>- Рассмотрение языковых средств, внедренных в стандарты ES6 и ES7 языка JavaScript. \
         Для чтения этой книги совсем не обязательно быть профессиональным программистом на JavaScript. Нужно лишь иметь желание стать им. \
         И если вы готовы стать мастером своего дела, то книга окажет вам в этом всяческую помощь.",
    "pagesQuantity": 544,
    "category": "Java Script",
    "categoryName": "Java Script"
  }, {
    "id": 8,
    "sectionIdes": [1, 2],
    "name": "PHP: объекты, шаблоны и методики программирования. 4-е издание",
    "authors": ["Зандстра Мэтт"],
    "price": 725.00,
    "publisher": "Вильямс",
    "isbn": "978-5-8459-1922-9",
    "photoLarge": "images/booksPhoto/8_big.jpg",
    "photoSmall": "images/booksPhoto/8_small.jpg",
    "description": "Четвертое издание книги PHP: объекты, шаблоны и методики программирования было пересмотрено и дополнено новым материалом.\
       Книга начинается с обзора объектно-ориентированных возможностей PHP, в который включены важные темы, такие как определение классов, \
       наследование, инкапсуляция, рефлексия и многое другое. Этот материал закладывает основы объектно-ориентированного проектирования и программирования на PHP",
    "pagesQuantity": 572,
    "category": "PHP",
    "categoryName": "PHP"
  }, {
    "id": 9,
    "sectionIdes": [1, 2, 3],
    "name": "Разработка веб-приложений с помощью PHP и MySQL, 5-е издание",
    "authors": ["Веллинг Люк", "Томсон Лора"],
    "price": 855.00,
    "publisher": "Вильямс",
    "isbn": "978-5-9908911-9-7",
    "photoLarge": "images/booksPhoto/9_big.jpg",
    "photoSmall": "images/booksPhoto/9_small.jpg",
    "description": "Самое авторитетное руководство по построению веб-приложений на PHP, взаимодействующих с базами MySQL! \
      Овладейте современным передовым опытом разработки веб-приложений, взаимодействующих с базами данных, с помощью PHP 7 и MySQL 5.7! \
      В этом новом 5-м издании книги, признанной наиболее ясным, удобным и практичным руководством по разработке с использованием PHP и MySQL,\
       полностью отражены возможности последних версий PHP и MySQL. В первой части содержится ускоренный курс по PHP, в котором описано хранение/извлечение данных, \
       массивы, строки, регулярные выражения, повторное использование кода, объекты и обработка ошибок/исключений. Во второй части раскрывается проектирование, \
       создание, доступ и программирование для баз данных MySQL. Третья часть посвящена безопасности веб-приложений; в ней добавлена новая информация по угрозам веб-безопасности, \
       приведены инструкции по построению защищенных веб-приложений, а также рассмотрена реализация аутентификации в PHP и MySQL. \
       Отдельная часть по расширенным приемам PHP охватывает все темы, начиная с работы в сети и взаимодействия с файловой системой и \
       заканчивая интернационализацией и локализацией, генерированием изображений, а также инфраструктурами и компонентами PHP. \
       Книга завершается демонстрацией нескольких реальных проектов, в числе которых реализация аутентификации и персонализации пользователей, \
       создание службы веб-почты, интеграция с социальной сетью и построение корзины для покупок.",
    "pagesQuantity": 768,
    "category": "PHP",
    "categoryName": "PHP"
  }, {
    "id": 10,
    "sectionIdes": [2, 3],
    "name": "PHP и MySQL: создание интернет-магазинов. 2-е издание",
    "authors": ["Ульман Ларри"],
    "price": 765.00,
    "publisher": "Вильямс",
    "isbn": "978-5-8459-1939-7",
    "photoLarge": "images/booksPhoto/10_big.jpg",
    "photoSmall": "images/booksPhoto/10_small.jpg",
    "description": "В этом исчерпывающем руководстве опытный автор Ларри Ульман проведет вас через все этапы разработки интернет-магазина с использованием PHP и MySQL.\
       Вы узнаете, как спроектировать визуальный интерфейс и создать базу данных сайта, как реализовать представление контента и сгенерировать онлайн-каталог, \
       как управлять корзиной товаров и проводить платежи, как принимать и выполнять заказы с учетом требований безопасности и эффективности. \
       В книге рассматриваются примеры двух полнофункциональных интернет-магазинов, благодаря изучению которых читатели смогут сравнить разные \
       сценарии электронной коммерции. Второе издание книги включает описание современных функциональных средств, присущих платежным системам PayPal и Authorize.net. \
       Также демонстрируется применение технологий Ajax и JavaScript. В конце книги описано подключение интернет-магазинов к платежной системе Яндекс.Деньги.",
    "pagesQuantity": 544,
    "category": "PHP",
    "categoryName": "PHP"
  }];

  this.getSections = function () {
    return catalogSections;
  };

  this.getData = function (sectionId) {
    var result = booksData;
    if (sectionId) {
      var data = [];
      for (var i = 0; i < booksData.length; i++) {
        if (~booksData[i].sectionIdes.indexOf(parseInt(sectionId))) {
          data.push(booksData[i]);
        }
      }
      result = data;
    }

    return result;
  };

  this.getCategoriesWithNames = function (sectionId) {
    var data=this.getData(sectionId);
  
    let result = [];
    let categories = [];
    for (let i = 1; i < data.length; i++) {
      if (!~categories.indexOf(data[i].category)) {
        categories.push(data[i].category);
        result.push({
          name: data[i].category,
          text: data[i].categoryName
        });
      }
    }
    return result;
  };
  this.getProductById = function (productId) {
    var result = null;
    for (var i = 0; i < booksData.length; i++) {
      if (parseInt(productId) == booksData[i].id) {
        result = booksData[i];
        break;
      }
    }
    return result;
  };
}
DataManager.getMinMaxPrice = function (booksData) {
  let result = {
    min: parseFloat(booksData[0].price),
    max: parseFloat(booksData[0].price)
  };
  for (let i = 1; i < booksData.length; i++) {
    if (result.min > parseFloat(booksData[i].price)) {
      result.min = parseFloat(booksData[i].price);
    }
    if (result.max < parseFloat(booksData[i].price)) {
      result.max = parseFloat(booksData[i].price);
    }
  }
  return result;
};
/*статический метод для поиска продукта в коллекции по его идентификатору; 
в качестве аргументов принимает идентификатор продукта и коллекцию для поиска*/
DataManager.findProduct = function (id, products) {
  var product = null;
  for (var i = 0; i < products.length; i++) {
    if (parseInt(products[i].id) == parseInt(id)) {
      product = products[i];
      break;
    }
  }
  return product;
};
/*статический метод для получения краткого текстового представления продукта, в качестве аргумента принимает экземпляр продыкта*/
DataManager.getProductInfo = function (product) {
  return `${product.authors.join(', ')}; 
        ${product.name}; ISBN:${product.isbn}; 
        ${product.pagesQuantity}стр.`;
};
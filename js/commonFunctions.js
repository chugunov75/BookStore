/*функция для извлечения данных из строки запроса, в качестве параметра принимает адрес ресурса (из строки запроса)*/
function parseQueryString(url) {
  var queryData = null;
  if (~url.indexOf('?')) {
    queryData = Object.create(null);
    var queryString = url.slice(url.indexOf('?') + 1);

    var endIndex = queryString.indexOf('/');
    queryString = endIndex == -1 ? queryString : queryString.slice(0, endIndex);

    var data = queryString.split('&');
    for (var i = 0; i < data.length; i++) {
      var dataItem = data[i].split('=');
      queryData[dataItem[0]] = dataItem[1];
    }
  }
  return queryData;
}

function getSizeOfHiddenElem(hiddenDOMElem) {
  var elem = hiddenDOMElem.cloneNode(true);
  document.body.appendChild(elem);
  elem.style.cssText = 'position: absolute; left: -9999px; display: block';
  var result = {
    outerWidth: elem.offsetWidth,
    innerWidth: elem.clientWidth,
    outerHeight: elem.offsetHeight,
    innerHeight: elem.clientHeight
  };
  document.body.removeChild(elem);
  return result;
}
/*----функция для сокращения кода создания DOM элементов, принимаемые параметры: название тега, 
строка с названиями классов, родительский элемент, узел, перед которым осуществить вставку*/
function createElem(tagName, className, parent = null, nextNode = null) {
  let element = document.createElement(tagName);
  if (className) {
    element.className = className;
  }
  if (parent) {
    parent.insertBefore(element, nextNode);
  }
  return element;
}
/*функция, формирующая страницу каталога*/
function initPageOfCatalog() {

  var dataManager = new DataManager();

  var menuContainer = document.querySelector('nav');

  var nav = new Menu({
    parent: menuContainer,
    items: [{ text: 'главная', url: 'index.html' }, { text: 'контакты', url: 'contacts.html' }]
  });

  var catalog = new Catalog({
    parent: nav.menu,
    catalogSections: dataManager.getSections(),
    onLinkClickHandlerCallback: getCatalogData,
    previousElementSibling: nav.menu.children[1]
  });

  var queryData = parseQueryString(location.href);

  var sectionId = queryData ? queryData.sectionId : null;

  getCatalogData(sectionId);

  var cart = new Cart({ parent: document.querySelector('.header-top .cart-label-container') });
  /*функция извлекающая коллекцию товаров соответствующих определенному разделу каталога; в качестве параметра принимает идентификатор этого раздела;
 заполняет страницу каталога с помощью функции setProducts(data)*/
  function getCatalogData(sectionId) {
    var data = dataManager.getData(sectionId);

    if (data && data.length > 0) {

      setProducts(data);

      var minMaxPrice = DataManager.getMinMaxPrice(data);

      var wrap = document.querySelector('.sidebar>.filter-controls-wrap');
      var filter = wrap.querySelector('.common-filter');
      if (filter) {
        wrap.removeChild(filter);
      }

      var opt = {
        parent: wrap,
        units: 'грн.',
        products: data,
        minPrice: minMaxPrice.min,
        maxPrice: minMaxPrice.max,
        subcategoriesList: dataManager.getCategoriesWithNames(sectionId),
        callback: filterProductsOnPage
      };

      var filter = new CommonFilter(opt);
    } else {
      new InfoMessagebox({ message: 'В настоящее время данный раздел пуст.', onCloseCallback: function () {
          sessionStorage.removeItem('sectionId');
          location.assign('catalog.html');
        } });
    }
  }
  /*функция, заполняющая страницу каталога карточками товара и устанавливающая обработчики кнопок добавления товаров в корзину; 
 в качестве параметра принимает массив отображаемых продуктов*/
  function setProducts(booksData) {
    var booksTemplate = _.template(document.getElementById('booksTemplate').innerHTML, { variable: 'booksData' });
    var div = document.createElement('div');
    div.innerHTML = booksTemplate(booksData);
    var contentContainer = div.children[0];
    var container = document.querySelector('main>.container');

    container.replaceChild(contentContainer, container.children[0]);

    var addToCartButtons = document.querySelectorAll('.book-item button[type="submit"]');

    for (var i = 0; i < addToCartButtons.length; i++) {
      addToCartButtons[i].addEventListener('click', function (e) {
        e.preventDefault();
        var id = e.currentTarget.form.elements["bookId"].value;
        var product = DataManager.findProduct(id, booksData);
        cart.addProduct(product);
      });
    }
  }
}
/*функция для скрытия/отображения карточек товаров на странице каталога, в качестве параметра принимает коллекцию продуктов, информация о которых должна быть видна*/
function filterProductsOnPage(products) {

  let allProductsHiddenInput = document.querySelectorAll('.book-item input[type="hidden"]');
  for (let i = 0; i < allProductsHiddenInput.length; i++) {

    if (!DataManager.findProduct(parseInt(allProductsHiddenInput[i].value), products)) {
      allProductsHiddenInput[i].closest('.book-item').style.display = 'none';
    } else {
      allProductsHiddenInput[i].closest('.book-item').style.display = '';
    }
  }
}
/*функция, формирующая главную страницу*/
function initHomePage() {
  var dataManager = new DataManager();
  // sessionStorage.removeItem('sectionId'); //удалять, или нет?

  var menuContainer = document.querySelector('nav');

  var nav = new Menu({
    parent: menuContainer,
    items: [{ text: 'главная', url: '#' }, { text: 'контакты', url: 'contacts.html' }]
  });

  var catalog = new Catalog({
    parent: nav.menu,
    catalogSections: dataManager.getSections(),
    previousElementSibling: nav.menu.children[1]
  });

  var cart = new Cart({ parent: document.querySelector('.header-top .cart-label-container') });

  var sections = dataManager.getSections();
  var data = [];
  for (let i = 0; i < sections.length; i++) {
    var products = dataManager.getData(sections[i].catalogSectionId);
    if (products.length > 0) {
      data.push({
        section: sections[i],
        products: products
      });
    }
  }

  if (data.length > 0) {
    var homePageTemplate = _.template(document.getElementById('homePageTemplate').innerHTML, { variable: 'data' });
    var main = document.querySelector('.page-home');
    main.children[0].innerHTML = homePageTemplate(data);
  }

  var sectionLinks = document.querySelectorAll('h2 a');
  for (var i = 0; i < sectionLinks.length; i++) {
    sectionLinks[i].addEventListener('click', function (e) {
      sessionStorage.setItem('sectionId', parseQueryString(e.currentTarget.getAttribute('href')).sectionId);
    });
  }
}
/*функция, формирующая страницу отдельного продукта*/
function initProductPage() {
  var dataManager = new DataManager();

  var bookId = parseQueryString(location.href).bookId;

  var book = dataManager.getProductById(bookId);

  var menuContainer = document.querySelector('nav');

  var nav = new Menu({
    parent: menuContainer,
    items: [{ text: 'главная', url: 'index.html' }, { text: 'контакты', url: 'contacts.html' }]
  });

  var catalog = new Catalog({
    parent: nav.menu,
    catalogSections: dataManager.getSections(),
    previousElementSibling: nav.menu.children[1]
  });

  var cart = new Cart({ parent: document.querySelector('.header-top .cart-label-container') });

  var bookItemTemplate = _.template(document.getElementById('bookItemTemplate').innerHTML, { variable: 'data' });

  var container = document.querySelector('.page-book-single>.container');

  container.innerHTML = bookItemTemplate(book);

  var addToCartButton = container.querySelector('button[type="submit"]');

  addToCartButton.addEventListener('click', function (e) {
    e.preventDefault();
    cart.addProduct(book);
  });
}

/*функция, формирующая страницу контактов*/
function initContactsPage(){
  var dataManager=new DataManager();

  var menuContainer=document.querySelector('nav');

  var nav = new Menu({
    parent: menuContainer,
    items: [{text:'главная',url:'index.html'},{text:'контакты',url:'#'}],
  });

  var catalog=new Catalog({
    parent: nav.menu,
    catalogSections: dataManager.getSections(),
    previousElementSibling: nav.menu.children[1],
  });

  var cart=new Cart({parent: document.querySelector('.header-top .cart-label-container')});

}
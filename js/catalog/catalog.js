class Catalog {
  constructor(options) {
    /*подменю каталог предназначено представляет собой элемент списка меню более высокого уровня,
     ввиду этого  parent - это элемент ul визуализирующий родительское меню, 
     previousElementSibling - элемент родительского меню, перед которым каталог будет встроен; 
     onLinkClickHandlerCallback функция из внешнего кода, заменяющая содержимое страницы, 
     в качестве параметра принимает идентификатор соответствующей секции каталога;
     catalogSections - коллекция объектов, представляющих разделы каталога*/
    options = Object.assign({
      parent: null,
      previousElementSibling: null,
      catalogSections: null,
      onLinkClickHandlerCallback: function (id) {}
    }, options);

    let self = this;

    this.instance = Catalog.getCatalogFromTemplate(options.catalogSections);
    if (options.parent) {
      options.parent.insertBefore(this.instance, options.previousElementSibling);
    }

    let submenu = this.instance.querySelector('.submenu');

    this.label = this.instance.querySelector('.submenu-label');
/*отмечаем заголовок подменю каталог как активный, если находимся на странице каталога*/
    if (~location.href.indexOf('catalog.html')) {
      this.instance.classList.add('current');
    }

    let links = this.instance.querySelectorAll('a');
    for (let i = 0; i < links.length; i++) {
/*отмечаем активную ссылку внутри  каталога*/
      if (sessionStorage.getItem('sectionId') && parseInt(parseQueryString(links[i].getAttribute('href')).sectionId) == parseInt(sessionStorage.getItem('sectionId'))) {
        links[i].parentElement.classList.add('current');
      }

      links[i].addEventListener('click', function (e) {
        Catalog.setCurrent(e.currentTarget);
        /*если клик по ссылке подменю каталог произошел на странице каталога, то содержимое страницы заменяется без перезагрузки страницы*/
        if (~location.href.indexOf('catalog.html')) {
          e.preventDefault();
          let id = parseQueryString(e.currentTarget.getAttribute('href')).sectionId;
          options.onLinkClickHandlerCallback(id);
/*имитация нажатия на заголовок подменю нужна для сворачивания последнего*/
          self.instance.dispatchEvent(new Event('click'));
        }
      });
    }
/*обработчик клика на заголовке подменю каталог; управляет его сворачиванием / раскрытием*/
    this.instance.addEventListener('click', function (e) {
      if (e.target == e.currentTarget || e.target.classList.contains('submenu-label')) {

        if (submenu.parentElement.offsetHeight == 0) {
          submenu.parentElement.style.height = submenu.offsetHeight + 'px';
          if (!self.label.classList.contains('open')) {
            self.label.classList.add('open');
          }
        } else {
          submenu.parentElement.style.height = 0;
          if (self.label.classList.contains('open')) {
            self.label.classList.remove('open');
          }
        }
      }
    });
  }
  /*статический метод, формирующий пункт меню Каталог; в качестве параметра принимает коллекцию объектов, представляющих разделы каталога и возвращающий получившийся DOM-элемент*/
  static getCatalogFromTemplate(data) {
    var cartDataTableTemplate = `
    <li class="submenu-container">
      <label for="catalogSub1" class="btn submenu-label">каталог</label>
      <div class="submenu-wrap">
        <ul class="submenu">
          <% for(var i=0; i<data.length; i++){ %>
            <li><a href="catalog.html?sectionId=<%= data[i].catalogSectionId %>"><%= data[i].catalogSectionName %></a></li>
          <%}%>
        </ul>
      </div>
    </li>
    `;
    var template = _.template(cartDataTableTemplate, { variable: 'data' });
    var element = document.createElement('div');
    element.innerHTML = template(data);
    return element.children[0];
  }
  /*статический метод, визуально отмечающий текущую выбранную ссылку и 
  записывающий соответствующее ей значение идентификатора раздела каталога  в локальное хранилище*/
  static setCurrent(currentLink) {
    let listItems = currentLink.closest('ul').children;
    for (let i = 0; i < listItems.length; i++) {
      if (listItems[i].classList.contains('current')) {
        listItems[i].classList.remove('current');
      }
    }
    currentLink.parentElement.classList.add('current');
    let queryData = parseQueryString(currentLink.getAttribute('href'));
    if (queryData) {
      sessionStorage.setItem('sectionId', queryData.sectionId);
    }
  }
}
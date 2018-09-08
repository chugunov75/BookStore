class Menu {
  constructor(options) {
    /*---parent - элемент, внутрь которого будет встроено меню;
    items - массив объектов, 
представляющих собой пары значений: текстовое представление ссылки / адрес ресурса, на который она указывает;*/
    options = Object.assign({
      parent: null,
      items: [{ text: 'главная', url: '#' }, { text: 'контакты', url: '#' }]
    }, options);

    this.menuContainer = Menu.getMenu(options.items);

    options.parent.appendChild(this.menuContainer);

    this.menu = this.menuContainer.querySelector('.menu');

    this.toggleBtn = this.menuContainer.querySelector('.menu-toggle');

    let self = this;
/*обработчик нажатия на кнопку, управляющую раскрытием / сворачиванием меню на экранах с малым разрешением*/
    this.toggleBtn.addEventListener('click', function (e) {

      if (self.menu.parentElement.offsetHeight == 0) {
        self.menu.parentElement.style.height = self.menu.offsetHeight + 'px';
        self.menu.parentElement.addEventListener('transitionend', transitionEndHandler);
      } else {
        self.menu.parentElement.style.height = 0;
        self.menu.parentElement.style.overflow = 'hidden';
      }
    });
/*обработчик клика на элементе меню, управляющий раскрытием / сворачиванием последнего на экранах с малым разрешением,
если клик был не на заголовке подменю*/
    this.menu.addEventListener('click', function (e) {
      if (!e.target.classList.contains('submenu-container') && !e.target.classList.contains('submenu-label')) {
        self.toggleBtn.dispatchEvent(new Event('click'));
      }
    });

    function transitionEndHandler(e) {
      e.currentTarget.style.overflow = 'visible';
      e.currentTarget.removeEventListener('transitionend', transitionEndHandler);
    };
  }
/*статический метод, формирующий меню; в качестве параметра принимает массив объектов, 
представляющих собой пары значений: текстовое представление ссылки / адрес ресурса, на который она указывает;*/
  static getMenu(data) {
    var cartDataTableTemplate = `
    <div class="container">
      <div class="menu-toggle"></div>
      <div class="menu-wrap">
        <ul class="menu">
          <% for(var i=0; i<data.length; i++){ %>
            <li><a class="btn" href="<%= data[i].url %>"><%= data[i].text %></a></li>
          <%}%>
        </ul>
      </div>
    </div>
    `;
    var template = _.template(cartDataTableTemplate, { variable: 'data' });
    var element = document.createElement('div');
    element.innerHTML = template(data);
    return element.children[0];
  }
}
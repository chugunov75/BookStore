class CartPopup extends Popup {

  constructor(options) {

    options = Object.assign({
      cart: null,
      /*--------------for base class constructor---------------*/
      title: 'Ваш заказ:',
      width: '',
      className: '',
      parent: null,
      content: null,
      onCloseCallback: function () {}
    }, options);

    super(options);

    // this.cart;
    // this.lineValueFilds;
    // this.clearButton;
    // this.totalAmountCell;
  }

  init(options) {

    let cartContent = CartPopup.getCartDataTable(options.cart.lines);
    options.content = cartContent;

    super.init(options);
    /*переменная для хранения полей редактирования колличества заказанных единиц товара*/
    this.lineValueFilds = cartContent.querySelectorAll('input[type="number"]');
    /*кнопка очистки корзины*/
    this.clearButton = cartContent.querySelector('button');
    /*элемент, визуализирующий общую сумму заказа*/
    this.totalAmountCell = cartContent.querySelector('.totalAmount');
    /*ссылка на внешний объект корзины; (агрегация)*/
    this.cart = options.cart;
  }

  setHandlers() {
    super.setHandlers();

    let self = this;

    for (let i = 0; i < self.lineValueFilds.length; i++) {

      let prevValue = Object.create(null);

      prevValue.value = self.lineValueFilds[i].value;

      self.lineValueFilds[i].addEventListener('input', function (e) {

        if (!isNaN(parseInt(e.currentTarget.value))) {

          self.changeCartLineQuantityInputHandler(e.currentTarget, prevValue);
        }
      });
    }

    self.clearButton.addEventListener('click', function (e) {

      self.clearCartButtonClickHandler();
    });
  }
  /*метод - обработчик изменения количества определённого товара;
  в качестве аргументов принимает ссылку на соответствующее поле ввода и предыдущее значение этого поля 
  (в виде объекта - для возможности редактирования значения вне функции);
  если новое значение == 0 - вызывается модальное окно для подтверждения действия и при положительном ответе запись удаляется,
   иначе сохраняется предыущее значение*/
  changeCartLineQuantityInputHandler(inputField, prevValue) {
    let newValue = parseInt(inputField.value);

    let productId = parseInt(inputField.previousElementSibling.value);

    let cartLine = this.cart.findCartLine(productId).cartLine;

    if (newValue != 0) {
      this.cart.changeLineQuantity(productId, newValue);

      prevValue.value = newValue;

      inputField.parentElement.nextElementSibling.textContent = cartLine.getLineCost();

      this.totalAmountCell.textContent = this.cart.getTotalAmount();
    } else {

      this.instance.style.display = 'none';
      let self = this;

      new ConfirmMessagebox({
        message: `Вы действительно хотите удалить запись: ${cartLine.ProductInfo}?`,
        className: self.additionClassName,
        parent: self.instance.parentElement,
        onCloseCallback: function (result) {

          self.onRemoveLineCallback(result, inputField, prevValue.value);
        }
      });
    }
  }
  /*метод-обработчик очистки корзины; аналогично вызывается модальное окно для подтверждения действия и при положительном ответе запись удаляется,
   иначе сохраняется предыущее значение*/
  clearCartButtonClickHandler() {

    this.instance.style.display = 'none';
    let self = this;

    new ConfirmMessagebox({
      message: 'Вы действительно хотите очистить корзину?',
      className: self.additionClassName,
      parent: self.instance.parentElement,
      onCloseCallback: function (result) {

        self.onClearCartButtonClickCallback(result);
      }
    });
  }
  /*метод-обработчик вызова модального окна при полной очистке корзины,
  в качестве параметра принимает результат этого вызова - логическое значение*/

  onClearCartButtonClickCallback(result) {
    if (result) {

      this.cart.clear();
      this.close();
    } else {
      this.instance.style.display = 'block';
      this.instance.focus();
    }
  }
  /*метод-обработчик вызова модального окна при удалении из корзины одной записи,
  в качестве параметра принимает результат этого вызова - логическое значение, ссылка на соответствующее поле ввода
   и ссылка на объект, сохраняющий предыдущее значения поля*/
  onRemoveLineCallback(result, inputField, prevValue) {
    if (result) {
      let currentRow = inputField.parentElement.parentElement;

      if (currentRow.parentElement.rows.length > 1) {

        for (let i = currentRow.sectionRowIndex; i < currentRow.parentElement.rows.length; i++) {

          currentRow.parentElement.rows[i].cells[0].textContent = parseInt(currentRow.parentElement.rows[i].cells[0].textContent) - 1;
        }

        currentRow.parentElement.removeChild(currentRow);

        this.cart.removeProduct(parseInt(inputField.previousElementSibling.value));

        this.totalAmountCell.textContent = this.cart.getTotalAmount();
      } else {

        this.cart.clear();
        this.close();
      }
    } else {
      inputField.value = prevValue;
    }
    if (this.instance) {
      this.instance.style.display = 'block';
      this.instance.focus();
    }
  }
  /*метод для визуализации данных заказа; принимает в качестве аргумента заказанные продукты в виде массива объектов типа CartLine
  и возвращает DOM-объект таблицы*/
  static getCartDataTable(data) {
    var cartDataTableTemplate = `
      <table>
        <thead>
          <tr><th>№</th><th>Название</th><th>Цена, грн.</th><th>Количество, шт.</th><th>Стоимость, грн.</th></tr>
        </thead>
        
        <tbody>
        <% for(var i=0,sum=0; i<data.length; i++){%>
          <tr>
            <td><%= i+1 %></td>
            <td><%= data[i].ProductInfo %></td>
            <td><%= data[i].ProductPrice %></td>
            <td>
              <input type="hidden" value="<%= data[i].ProductId %>">
              <input type="number" min="0" value="<%= data[i].LineQuantity %>">
            </td>
            <td><%= data[i].getLineCost() %></td>
          </tr>
          <% sum+=data[i].getLineCost() %>
        <%}%>
        </tbody>
        <tfoot>
          <tr><td colspan="2">Общая стоимость заказа, грн.</td><td colspan="3" class="totalAmount"><%= sum %></tr>
          <tr><td colspan="5"><button class="btn btn-bordered">очистить корзину</button></td></tr>
        </tfoot>
      </table>
    `;
    var template = _.template(cartDataTableTemplate, { variable: 'data' });
    var element = document.createElement('div');
    element.innerHTML = template(data);
    return element.children[0];
    // return element;
  }
}
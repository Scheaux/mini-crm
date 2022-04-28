export default class App {
  static init() {
    this.products = [{ name: 'Nokia 3310', price: 'FREE' }];
    App.initEventListeners();
    App.renderProducts();
  }

  static initEventListeners() {
    const plusBtn = document.getElementById('plus_btn');
    plusBtn.addEventListener('click', App.plusBtnOnclick);
    App.initModalClose();
    App.initModalSave();
    App.initModalEdit();
    App.initTableClicks();
    App.initDeletionListener();
  }

  static plusBtnOnclick() {
    const modal = document.getElementById('add-product-form');
    modal.querySelector('.modal_name > input').value = '';
    modal.querySelector('.modal_price > input').value = '';
    modal.classList.remove('hidden');
  }

  static initModalClose() {
    const modalClose = document.querySelectorAll('.modal_close');
    modalClose.forEach((e) => {
      e.addEventListener('click', () => {
        e.closest('.modal').classList.add('hidden');
      });
    });
  }

  static initModalSave() {
    const modalSave = document.querySelectorAll('.modal_save');
    modalSave.forEach((e) => {
      e.addEventListener('click', () => {
        const name = e.closest('.modal').querySelector('.modal_name > input');
        const price = e.closest('.modal').querySelector('.modal_price > input');
        App.addNewProduct(name.value, price.value);
        name.value = '';
        price.value = '';
        e.closest('.modal').classList.add('hidden');
      });
    });
  }

  static initModalEdit() {
    const modalEdit = document.querySelector('.modal_edit');
    modalEdit.addEventListener('click', () => {
      const name = modalEdit.closest('.modal').querySelector('.modal_name > input').value;
      const price = modalEdit.closest('.modal').querySelector('.modal_price > input').value;
      this.selected.price = price;
      this.selected.name = name;
      App.renderProducts();
      modalEdit.closest('.modal').classList.add('hidden');
    });
  }

  static addNewProduct(name, price) {
    this.products.push({ name, price });
    App.renderProducts();
  }

  static initTableClicks() {
    const table = document.getElementById('table');
    const modal = document.getElementById('confirm-deletion');
    table.addEventListener('click', (e) => {
      if (e.target.classList.contains('cross')) {
        const target = e.target.closest('.product');
        modal.classList.remove('hidden');
        this.marked = target;
      } else if (e.target.classList.contains('edit')) {
        const target = e.target.closest('.product');
        const name = target.querySelector('.product_name').innerText;
        const price = target.querySelector('.product_price').innerText;
        const productModal = document.getElementById('edit-product-form');
        this.selected = this.products.find((n) => n.name === name && n.price === price);
        productModal.classList.remove('hidden');
        productModal.querySelector('.modal_name > input').value = name;
        productModal.querySelector('.modal_price > input').value = price;
      }
    });
  }

  static renderProducts() {
    const table = document.getElementById('table');
    table.innerHTML = '';
    this.products.forEach((e) => {
      table.innerHTML += `
      <tr class="product">
        <td class="product_name">${e.name}</td>
        <td class="product_price">${e.price}</td>
        <td class="product_actions">
          <button class="edit">✎</button>
          <button class="cross">✕</button>
        </td>
      </tr>
      `;
    });
  }

  static initDeletionListener() {
    const deleteBtn = document.getElementById('modal-delete');
    const modal = document.getElementById('confirm-deletion');
    deleteBtn.addEventListener('click', () => {
      const name = this.marked.querySelector('.product_name').innerText;
      const price = this.marked.querySelector('.product_price').innerText;
      this.products = this.products.filter((n) => {
        if (n.name === name && n.price === price) return false;
        return true;
      });
      App.renderProducts();
      modal.classList.add('hidden');
    });
  }
}

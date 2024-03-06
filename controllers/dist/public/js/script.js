//Return type price
const radioContainer = document.querySelectorAll('.radio-container');
if(radioContainer){
  radioContainer.forEach(button => {
    const input = button.querySelector('input[type="radio"]');
    input.addEventListener('click', () => {
      console.log(input.id)
      var inputElement = document.getElementById(`${input.id}`);
      const parentForm = inputElement.closest('form');
      const bookId = parentForm.getAttribute('book-id');
      const typeBook = input.value;
      const link = `/categories/detail/${bookId}/${typeBook}`;

      fetch(link)
        .then(res => res.json())
        .then(data => {
          if(data.code == 200 && data){
            const book = data.book;
            console.log(book);
            if(book){
              const htmls = `    
              <div class="col-6">              
            
                  <div class="inner-price-special">${data.price_special}$</div>
                  <div class="inner-price">${data.book.price}$</div>
                  <div class="inner-percent">Giảm tới ${data.book.discount}%</div>
                
                  <div class="inner-stock">
                      <span class="stock">Còn lại: ${data.book.stock}</span>
                  </div>
              </div>

              <div class="inner-form">
                <form form-add-to-cart book-id="${data.book.bookId}" typeBook="${data.book.typeBook}">
                  <input class="form-control mb-2" type="number" name="quantity" value="1" min="1" max="${book.stock}">
                  
                  <button type="submit" class="btn btn-success btn-block">Thêm vào giỏ hàng</button>
                </form>
              </div>


              `
              const innerCard = document.querySelector(".inner-card");
              innerCard.innerHTML = htmls;
            }
          }
        })
    });
  })
}

//End return type

//Alert success add to cart
const alertAddCartSuccess = () => {
  const elementAlert = document.querySelector('[alert-add-cart-success]');
  elementAlert.classList.remove('alert-hidden');

  setTimeout(() => {
    elementAlert.classList.add('alert-hidden');
  }, 5000);

  const closeAlert = elementAlert.querySelector('[close-alert]');
  closeAlert.addEventListener('click', () => {
    elementAlert.classList.add('alert-hidden');
  })
}
//End alert add cart success

//Mini cart
const showMiniCart = () => {
  const cart = JSON.parse(localStorage.getItem('cart'));
  if(cart){
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    const miniCart = document.querySelector('[mini-cart]');
    miniCart.innerHTML = totalQuantity;
  }
}
showMiniCart();
//End mini cart

//Cart
//Kiểm tra xem localStorage tồn tại cart chưa
const cart = localStorage.getItem('cart');
if(!cart) {
  localStorage.setItem('cart', JSON.stringify([]));
}

//Thêm book vào cart
document.body.addEventListener("submit", (event) => {
  if (event.target && event.target.matches("[form-add-to-cart]")) {
    event.preventDefault();

    const formAddToCart = event.target;
    const quantity = parseInt(formAddToCart.elements.quantity.value);
    const bookId = formAddToCart.getAttribute("book-id");
    const typeBook = formAddToCart.getAttribute("typeBook");

    if (quantity > 0 && bookId && typeBook) {
      const cart = JSON.parse(localStorage.getItem("cart"));

      const isExistBook = cart.findIndex(
        (item) => item.bookId == bookId && item.typeBook == typeBook
      );

      if (isExistBook == -1) {
        cart.push({
          bookId: bookId,
          typeBook: typeBook,
          quantity: quantity,
        });
      } else {
        cart[isExistBook].quantity = cart[isExistBook].quantity + quantity;
      }

      console.log(cart);
      localStorage.setItem("cart", JSON.stringify(cart));

      alertAddCartSuccess();

      showMiniCart();
    }
  }
});

//Show alert
const showAlert = document.querySelector("[show-alert]");
if(showAlert){
  const time = parseInt(showAlert.getAttribute('data-time'));
  const closeAlert = showAlert.querySelector('[close-alert]');

  setTimeout(() => {
    showAlert.classList.add('alert-hidden');
  }, time);

  closeAlert.addEventListener('click', () => {
    showAlert.classList.add('alert-hidden');
  });
}
//End show alert
//Return type price
const radioContainer = document.querySelectorAll('.radio-container');
if(radioContainer){
  radioContainer.forEach(button => {
    const input = button.querySelector('input[type="radio"]');
    input.addEventListener('click', () => {
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
                  
                  <button type="submit" class="btn-add-to-cart btn btn-success btn-block">Thêm vào giỏ hàng</button>

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
if(document.cookie){
  const showMiniCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if(cart){
      const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
      const miniCart = document.querySelector('[mini-cart]');
      miniCart.innerHTML = totalQuantity;
    }
  }
  showMiniCart();
}

//End mini cart

//Cart
//Kiểm tra xem localStorage tồn tại cart chưa
const cart = localStorage.getItem('cart');
if(!cart) {
  localStorage.setItem('cart', JSON.stringify([]));
}

//Thêm book vào cart
// Bắt sự kiện submit của form thêm giỏ hàng
document.body.addEventListener("submit", (event) => {
  // Kiểm tra xem form có thuộc tính form-add-to-cart không
  if (event.target.matches("[form-add-to-cart]")) {
      // Ngăn chặn hành vi mặc định của form
      event.preventDefault();

      // Kiểm tra xem cookie có tồn tại hay không
      if (document.cookie) {
          const formAddToCart = event.target;
          const quantity = parseInt(formAddToCart.elements.quantity.value);
          const bookId = formAddToCart.getAttribute("book-id");
          const typeBook = formAddToCart.getAttribute("typeBook");
          
          // Kiểm tra các giá trị cần thiết
          if (quantity > 0 && bookId && typeBook) {
              // Lấy giỏ hàng từ localStorage
              const cart = JSON.parse(localStorage.getItem("cart")) || [];

              // Kiểm tra xem sách đã tồn tại trong giỏ hàng chưa
              const isExistBook = cart.findIndex(
                  (item) => item.bookId == bookId && item.typeBook == typeBook
              );
      
              if (isExistBook == -1) {
                  // Nếu sách chưa tồn tại trong giỏ hàng, thêm vào
                  cart.push({
                      bookId: bookId,
                      typeBook: typeBook,
                      quantity: quantity,
                  });
              } else {
                  // Nếu sách đã tồn tại trong giỏ hàng, cập nhật số lượng
                  cart[isExistBook].quantity += quantity;
              }
      
              // Lưu giỏ hàng mới vào localStorage
              localStorage.setItem("cart", JSON.stringify(cart));
      
              // Thông báo thành công và cập nhật giỏ hàng mini
              alertAddCartSuccess();
              showMiniCart();
          }
      } else {
          // Nếu không có cookie, chuyển hướng đến trang đăng nhập
          window.location.href = '/user/login';
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

//Search suggest
const boxSearch = document.querySelector('.box-search');
if (boxSearch) {
  const input = boxSearch.querySelector("input[name='keyword']");
  const innerSuggest = boxSearch.querySelector('.inner-suggest');

  input.addEventListener('keyup', () => {
    const keyword = input.value;
    const link = `/search/suggest?keyword=${keyword}`;

    fetch(link)
      .then(res => res.json())
      .then(data => {
        if(data && data.code == 200){
          const books = data.books;
          if(books.length > 0){
            const htmls = books.map(item => {
              return `
                <a class="inner-item" href="/books/detail/${item.slug}">
                  <div class="inner-image">
                    <img src="${item.thumbnail}"/>
                  </div>
                  <div class="inner-info">
                    <div class="inner-title">${item.title}</div>
                    <div class="inner-author>
                      <i class="fa-solid fa-pencil"></i> ${item.author}
                    </div>
                  </div>
                </a>
              `;
            });

            const innerList = boxSearch.querySelector(".inner-list");
            innerList.innerHTML = htmls.join("");
            innerSuggest.classList.add("show");
          } else {
            innerSuggest.classList.remove("show");
          }
        }
      });
  });
}
//End search suggest

//Change radio typeBook
const radioChange = (radio) => {
  var radios = document.getElementsByName(radio.name);

    for (var i = 0; i < radios.length; i++) {
      if (radios[i] !== radio) {
        radios[i].checked = false;
      }
    }
}
//End change radio typeBook
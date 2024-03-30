//Lấy data in ra giao diện
const drawListBook = () => {
  fetch("https://sale-book.vercel.app/cart/list-json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: localStorage.getItem("cart")
  })
    .then(res => res.json())
    .then(data => {
      const htmls = data.books.map((item, index) => {
        return `
          <tr>
            <td>${index+1}</td>
            <td>
              <img src="${item.info.thumbnail}" alt="${item.info.title}" width="80px"/>
            </td>
            <td>
              <a href="/books/detail/${item.bookId}">${item.info.title}</a>
            </td>
            <td>${item.price_special}$</td>
            <td>
              <input 
                type="number" 
                name="quantity"
                value="${item.quantity}"
                min="1"
                item-id="${item.bookId}"
                style="width: 60px"
              />
            </td>
            <td>${item.total}$</td>
            <td>
              <button class="btn btn-sm btn-danger" btn-delete="${item.bookId}">Xóa</button>
            </td>
          </tr>
        `
      });

      const listBook = document.querySelector("[list-book]");
      listBook.innerHTML = htmls.join("");

      //Tính tổng đơn hàng
      const totalPrice = data.books.reduce((sum, item) => sum + item.total, 0);
      const elementTotalPrice = document.querySelector("[total-price]");
      elementTotalPrice.innerHTML = totalPrice;

      deleteItemInCart();
      updateQuantityInCart();

    })
}

//Xóa sản phẩm trong giỏ
const deleteItemInCart = () => {
  const listBtnDelete = document.querySelectorAll("[btn-delete]");
  listBtnDelete.forEach(button => {
    button.addEventListener("click", () => {
      const bookId = button.getAttribute("btn-delete");

      const cart = JSON.parse(localStorage.getItem("cart"));

      const newCart = cart.filter(item => item.bookId != bookId);

      localStorage.setItem("cart", JSON.stringify(newCart));

      drawListBook();

    });
  })
}
//Hết xóa sản phẩm trong giỏ

//Lấy data in ra giao diện
drawListBook();
//Hết lấy data in ra giao diện

//Cập nhật số lượng 
const updateQuantityInCart = () => {
  const listInputUpdate = document.querySelectorAll("[list-book] input[item-id]");
  listInputUpdate.forEach(input => {
    input.addEventListener("change", () => {
      const bookId = input.getAttribute("item-id");

      const quantity = parseInt(input.value);

      const cart = JSON.parse(localStorage.getItem("cart"));

      const bookUpdate = cart.find(item => item.bookId == bookId);
      bookUpdate.quantity = quantity;

      localStorage.setItem("cart", JSON.stringify(cart));

      drawListBook();
    });
  });
}
//Hết cập nhật số lượng

//Lấy data in ra giao diện
drawListBook();
//Hết lấy data in ra giao diện

//Đặt sách
const formOrder = document.querySelector("[form-order]");
if(formOrder){
  formOrder.addEventListener("submit", (event) => {
    event.preventDefault();

    const fullName = event.target.elements.fullName.value;
    const phone = event.target.elements.phone.value;
    const note = event.target.elements.note.value;

    const cart = JSON.parse(localStorage.getItem('cart'));

    const data = {
      info: {
        fullName: fullName,
        phone: phone,
        note: note
      },
      cart: cart
    }

    fetch('/order', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        if(data.code == 200){
          localStorage.removeItem("cart");
          window.location.href = `/order/success?orderCode=${data.orderCode}`;
        } else {
          alert("Đặt hàng không thành công!");
        }
      })
  });
}
//Hết đặt book
// ====================> Variables <====================

// Side bar
const menuOpen = document.querySelector(".menu-open");
const menuClose = document.querySelector(".menu-close");
const sideBar = document.querySelector(".nav-links");

// Cart items container Toggling
const cartOpen = document.querySelector(".open-cart");
const cartItems = document.querySelector(".cart-items");

// Slider
const sliderImages = {
  1: {
    image: "images/image-product-1.jpg",
    thumbnail: "images/image-product-1-thumbnail.jpg",
  },
  2: {
    image: "images/image-product-2.jpg",
    thumbnail: "images/image-product-2-thumbnail.jpg",
  },
  3: {
    image: "images/image-product-3.jpg",
    thumbnail: "images/image-product-3-thumbnail.jpg",
  },
  4: {
    image: "images/image-product-4.jpg",
    thumbnail: "images/image-product-4-thumbnail.jpg",
  },
};
const sliderContent = document.querySelector(".slider-content");
const nextSlide = document.querySelector(".next-slide");
const previousSlide = document.querySelector(".previous-slide");
const thumbnailImages = document.querySelectorAll(".slider-thumbnails > img");
const slide = document.querySelector(".slider-content");
const numberOfSlides = Object.keys(sliderImages).length;
let slideNumber = 1;

// Product Quantity
const quantityBtns = document.querySelectorAll(".quantity-wrapper > img");
const prodQuantity = document.querySelector(".quantity");

// Cart
const notification = document.querySelector(".notification");
const prodName = document.querySelector(".prod-name");
const prodPrice = document.querySelector(".price-current");
const addProdBtn = document.querySelector(".add-product");
const CartItemsContent = document.querySelector(".cart-items-content");

// ==========================================================================================

// Disableing previous slide button at the beginning
previousSlide.style.backgroundColor = "rgb(170, 158, 158)";

// ==========================================================================================

// ====================> Event Listeners <====================

// Side bar (open/close)
menuOpen.addEventListener("click", () => {
  sideBar.classList.add("nav-show");
  createOverlay();
});
menuClose.addEventListener("click", () => {
  sideBar.classList.remove("nav-show");

  document.querySelector(".overlay").remove();
});

// Remove overlay on screens bigger than 900px
window.addEventListener("resize", () => {
  if (window.innerWidth >= 900) {
    document.querySelector(".overlay").remove();
  }
});

// Cart items Toggling
cartOpen.addEventListener("click", () =>
  cartItems.classList.toggle("show-cart")
);

// Slider Controls
nextSlide.addEventListener("click", nextImage);
previousSlide.addEventListener("click", previousImage);

// Desktop thumbnail slider
thumbnailImages.forEach((thumbnail) => {
  thumbnail.addEventListener("click", (e) =>
    thumbnailSlider(e, thumbnailImages, sliderContent)
  );
});

// Lightbox slider
slide.addEventListener("click", (e) => lightBox(e));

// Quantity Buttons
quantityBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.id === "increase") {
      prodQuantity.innerText = parseInt(prodQuantity.innerText) + 1;
    } else if (prodQuantity.innerText > 0) {
      prodQuantity.innerText = parseInt(prodQuantity.innerText) - 1;
    }
  });
});

// add item to cart
addProdBtn.addEventListener("click", addToCart);

// remove item from cart
CartItemsContent.addEventListener("click", (e) => {
  if (e.target.id === "remove-item") {
    deleteFromCart(e);
  }
});

// ==========================================================================================

// ====================> Functions <====================

//create overlay div and append it to body
function createOverlay() {
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  document.body.appendChild(overlay);
}

// Slider Controls
function nextImage() {
  if (slideNumber < numberOfSlides) {
    slideNumber++;
    sliderContent.children[0].src = sliderImages[slideNumber]["image"];
  }
  if (slideNumber === numberOfSlides) {
    nextSlide.style.backgroundColor = "rgb(170, 158, 158)";
  }

  previousSlide.style.backgroundColor = "white";
}
function previousImage() {
  if (slideNumber !== 1) {
    slideNumber--;
    sliderContent.children[0].src = sliderImages[slideNumber]["image"];
  }
  if (slideNumber === 1) {
    previousSlide.style.backgroundColor = "rgb(170, 158, 158)";
  }

  nextSlide.style.backgroundColor = "white";
}
function thumbnailSlider(e, thumbnailImages, sliderContent) {
  // Removeing active class from all images

  thumbnailImages.forEach((thumbnail) => {
    thumbnail.classList.remove("active-image");
  });

  // Adding acive class to selected image and changing slider image to it

  e.target.classList.add("active-image");
  const clickedImageSrc = e.target.src;
  for (let image in sliderImages) {
    if (clickedImageSrc.includes(sliderImages[image]["thumbnail"])) {
      sliderContent.children[0].src = sliderImages[image]["image"];
    }
  }
}
function lightBox(e) {
  if (window.innerWidth > 900) {
    createOverlay();

    const sliderWrapper = document.createElement("section");
    sliderWrapper.classList.add("slider", "light-box");
    const x = `
      <div class="slider-content">
        <img src="images/image-product-1.jpg" alt="shoes product" />
      </div>
      <div class="slider-thumbnails">
        <img
          class="active-image"
          src="images/image-product-1-thumbnail.jpg"
          alt="shoes product thumbnail" />
        <img
          src="images/image-product-2-thumbnail.jpg"
          alt="shoes product thumbnail" />
        <img
          src="images/image-product-3-thumbnail.jpg"
          alt="shoes product thumbnail" />
        <img
          src="images/image-product-4-thumbnail.jpg"
          alt="shoes product thumbnail" />
      </div>
      <img
          class="lightbox-close"
          src="images/icon-close.svg"
          alt="close icon" />
      `;
    sliderWrapper.innerHTML = x;
    document.body.appendChild(sliderWrapper);

    const lightboxThumbnails = document.querySelectorAll(
      ".light-box .slider-thumbnails img"
    );
    const lightboxSlide = document.querySelector(".light-box .slider-content");
    lightboxThumbnails.forEach((lightboxThumbnail) =>
      lightboxThumbnail.addEventListener("click", (e) => {
        thumbnailSlider(e, lightboxThumbnails, lightboxSlide);
      })
    );

    // Closing lightbox
    const lightboxCloseBtn = document.querySelector(".lightbox-close");
    const overlay = document.querySelector(".overlay");
    lightboxCloseBtn.addEventListener("click", (e) => {
      e.target.parentElement.remove();
      overlay.remove();
    });
  }
}

// Adding items to cart
function addToCart() {
  if (prodQuantity.textContent !== "0") {
    // removing the empty cart message

    const emptyMessage = document.querySelector(".cart-empty");
    if (emptyMessage) {
      emptyMessage.remove();
    }

    // Adding cart notification

    notification.textContent =
      parseInt(notification.textContent) + parseFloat(prodQuantity.textContent);
    notification.classList.add("show-notification");

    // Creating Checkout button
    let checkout = document.querySelector(".checkout");
    if (!checkout) {
      checkout = document.createElement("button");
      checkout.classList.add("checkout");
      checkout.textContent = "Checkout";
      CartItemsContent.appendChild(checkout);
    }

    // Creating cart item product and appending it to cart
    const totalPrice =
      parseFloat(prodPrice.textContent.slice(1)) *
      parseFloat(prodQuantity.textContent);
    const cartItemContainer = document.createElement("section");
    cartItemContainer.classList.add("cart-item");
    cartItemContainer.setAttribute(
      "data-quantity",
      `${prodQuantity.textContent}`
    );
    const cartItem = `
      <img src="images/image-product-1-thumbnail.jpg" alt="product" />
      <div>
        <h4>${prodName.textContent}</h4>
        <p> ${prodPrice.textContent} x ${
      prodQuantity.textContent
    } = <span class="price">$${totalPrice.toFixed(2)}</span></p>
      </div>
      <img id="remove-item" src="images/icon-delete.svg" alt="remove item icon" />
      `;
    cartItemContainer.innerHTML = cartItem;
    CartItemsContent.insertBefore(cartItemContainer, checkout);
  }
}

// Deleting items from cart
function deleteFromCart(e) {
  e.target.parentElement.remove();
  if (CartItemsContent.children.length === 1) {
    // Removing the Checkout button

    let checkout = document.querySelector(".checkout");
    if (checkout) {
      checkout.remove();
    }

    // Adding cart empty message
    const cartEmpty = document.createElement("p");
    cartEmpty.classList.add("cart-empty");
    cartEmpty.textContent = "Your cart is empty.";
    CartItemsContent.appendChild(cartEmpty);
  }

  // Decreasing number of items in cart notification

  notification.textContent =
    parseInt(notification.textContent) -
    e.target.parentElement.dataset.quantity;
  if (notification.textContent === "0") {
    notification.classList.remove("show-notification");
  }
}

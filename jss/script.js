/*=========================================
        DARK MODE
=========================================*/

const themeBtn = document.querySelector("#theme-btn");
const savedTheme = localStorage.getItem("floraTheme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
}

function updateThemeIcon() {
    if (!themeBtn) {
        return;
    }

    const icon = themeBtn.querySelector("i");

    if (!icon) {
        return;
    }

    if (document.body.classList.contains("dark-mode")) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
    } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
    }
}

if (themeBtn) {
    themeBtn.addEventListener("click", function(){
        document.body.classList.toggle("dark-mode");
        localStorage.setItem(
            "floraTheme",
            document.body.classList.contains("dark-mode") ? "dark" : "light"
        );
        updateThemeIcon();
    });
}

updateThemeIcon();

/*=========================================
        RTL MODE
=========================================*/

const rtlBtn = document.querySelector("#rtl-btn");
const savedDirection = localStorage.getItem("floraDirection");

if (savedDirection === "rtl") {
    document.documentElement.setAttribute("dir", "rtl");
} else {
    document.documentElement.setAttribute("dir", "ltr");
}

function updateRtlButton() {
    if (!rtlBtn) {
        return;
    }

    const isRtl = document.documentElement.getAttribute("dir") === "rtl";
    rtlBtn.classList.toggle("active", isRtl);
    rtlBtn.setAttribute("aria-pressed", isRtl ? "true" : "false");
}

if (rtlBtn) {
    rtlBtn.addEventListener("click", function(){
        const isRtl = document.documentElement.getAttribute("dir") === "rtl";
        const nextDirection = isRtl ? "ltr" : "rtl";

        document.documentElement.setAttribute("dir", nextDirection);
        localStorage.setItem("floraDirection", nextDirection);
        updateRtlButton();
    });
}

updateRtlButton();

/*=========================================
        LOGO HOME LINK
=========================================*/

const siteLogo = document.querySelector(".logo");

if (siteLogo) {
    siteLogo.setAttribute("role", "link");
    siteLogo.setAttribute("tabindex", "0");
    siteLogo.setAttribute("aria-label", "Go to home page");

    function goToHomePage() {
        window.location.href = "index.html";
    }

    siteLogo.addEventListener("click", goToHomePage);

    siteLogo.addEventListener("keydown", function(event) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            goToHomePage();
        }
    });
}

/*=========================================
        MOBILE MENU
=========================================*/

const siteHeader = document.querySelector("header");
const siteNav = document.querySelector("nav");
const headerRight = document.querySelector(".header-right");

if (siteHeader && siteNav) {
    const menuToggle = document.createElement("button");
    menuToggle.className = "menu-toggle";
    menuToggle.type = "button";
    menuToggle.setAttribute("aria-label", "Open menu");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';

    if (headerRight) {
        siteHeader.insertBefore(menuToggle, headerRight);
    } else {
        siteHeader.appendChild(menuToggle);
    }

    function closeMobileMenu() {
        siteHeader.classList.remove("menu-open");
        menuToggle.setAttribute("aria-label", "Open menu");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }

    function openMobileMenu() {
        siteHeader.classList.add("menu-open");
        menuToggle.setAttribute("aria-label", "Close menu");
        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    }

    menuToggle.addEventListener("click", function(event) {
        event.stopPropagation();

        if (siteHeader.classList.contains("menu-open")) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    siteNav.querySelectorAll("a[href]").forEach(function(link) {
        link.addEventListener("click", function() {
            if (link.getAttribute("href") !== "#") {
                closeMobileMenu();
            }
        });
    });

    document.addEventListener("click", function(event) {
        if (!siteHeader.contains(event.target)) {
            closeMobileMenu();
        }
    });

    window.addEventListener("resize", function() {
        if (window.innerWidth > 1200) {
            closeMobileMenu();
        }
    });
}

/*=========================================
        ACTIVE MENU
=========================================*/

const currentPage = window.location.pathname.split("/").pop() || "index.html";
const navLinks = document.querySelectorAll("nav a[href]");

navLinks.forEach(function(link) {
    const linkPage = link.getAttribute("href");

    if (!linkPage || linkPage === "#") {
        return;
    }

    if (linkPage === currentPage) {
        link.classList.add("active");

        const dropdownParent = link.closest(".dropdown");

        if (dropdownParent) {
            dropdownParent.classList.add("active");
        }
    }
});

/*=========================================
        SCROLL TO TOP
=========================================*/

const scrollTopBtn = document.createElement("button");
scrollTopBtn.className = "scroll-top-btn";
scrollTopBtn.type = "button";
scrollTopBtn.setAttribute("aria-label", "Scroll to top");
scrollTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
document.body.appendChild(scrollTopBtn);

function toggleScrollTopButton() {
    if (window.scrollY > 350) {
        scrollTopBtn.classList.add("show");
    } else {
        scrollTopBtn.classList.remove("show");
    }
}

window.addEventListener("scroll", toggleScrollTopButton);

scrollTopBtn.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

toggleScrollTopButton();

const dropdown = document.querySelector(".dropdown");
const dropdownToggle = document.querySelector(".dropdown > a");
const dropdownMenu = document.querySelector(".dropdown-menu");

if (dropdown && dropdownToggle && dropdownMenu) {
    let ignoreNextDropdownClick = false;

    function toggleDropdown(event) {
        event.preventDefault();
        event.stopPropagation();
        dropdown.classList.toggle("open");
    }

    dropdownToggle.addEventListener("pointerdown", function(event) {
        if (event.pointerType !== "mouse") {
            ignoreNextDropdownClick = true;
            toggleDropdown(event);
        }
    });

    dropdownToggle.addEventListener("click", function(event) {
        if (ignoreNextDropdownClick) {
            event.preventDefault();
            event.stopPropagation();
            ignoreNextDropdownClick = false;
            return;
        }

        toggleDropdown(event);
    });

    dropdownMenu.addEventListener("click", function(event) {
        event.stopPropagation();
    });

    document.addEventListener("click", function() {
        dropdown.classList.remove("open");
    });
}

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dots .dot");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

let current = 0;

function showSlide(index){
    if (!slides.length || !dots.length) {
        return;
    }

    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    slides[index].classList.add("active");
    dots[index].classList.add("active");
}

if (next && prev && slides.length && dots.length) {
    next.onclick = () => {

    current++;

    if(current >= slides.length){
        current = 0;
    }

    showSlide(current);

    };

    prev.onclick = () => {

    current--;

    if(current < 0){
        current = slides.length - 1;
    }

    showSlide(current);

    };

    dots.forEach((dot,index)=>{

    dot.onclick = ()=>{

        current=index;
        showSlide(current);

    }

    });

// Auto Slide

    setInterval(()=>{

    current++;

    if(current>=slides.length){

        current=0;

    }

    showSlide(current);

    },5000);
}

const filterButtons = document.querySelectorAll(".filter-buttons button");
const cards = document.querySelectorAll(".product-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const filter = button.dataset.filter;

        cards.forEach(card => {

            if (filter === "all" || card.dataset.category === filter) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

});


/*=========================================
      TESTIMONIAL SLIDER
=========================================*/

const testimonialCards = document.querySelectorAll(".testimonial-card");
const testimonialDots = document.querySelectorAll(".testimonial-dots .dot");
const prevBtn = document.querySelector(".prev-test");
const nextBtn = document.querySelector(".next-test");

let currentTestimonial = 0;

/* Show Testimonial */

function showTestimonial(index){

    testimonialCards.forEach(card => {
        card.classList.remove("active");
    });

    testimonialDots.forEach(dot => {
        dot.classList.remove("active");
    });

    testimonialCards[index].classList.add("active");
    testimonialDots[index].classList.add("active");

}

/* Next */

function nextTestimonial(){

    currentTestimonial++;

    if(currentTestimonial >= testimonialCards.length){
        currentTestimonial = 0;
    }

    showTestimonial(currentTestimonial);

}

/* Previous */

function prevTestimonial(){

    currentTestimonial--;

    if(currentTestimonial < 0){
        currentTestimonial = testimonialCards.length - 1;
    }

    showTestimonial(currentTestimonial);

}

/* Buttons */

if (nextBtn && prevBtn && testimonialCards.length && testimonialDots.length) {
    nextBtn.addEventListener("click", nextTestimonial);

    prevBtn.addEventListener("click", prevTestimonial);

/* Dots */

    testimonialDots.forEach((dot,index)=>{

    dot.addEventListener("click",()=>{

        currentTestimonial = index;

        showTestimonial(currentTestimonial);

    });

    });

/* Auto Slider */

    setInterval(()=>{

    nextTestimonial();

    },4000);

/* Initial */

    showTestimonial(currentTestimonial);
}

/*=========================================
        HOME 2 HERO SLIDER
=========================================*/

const heroSlides = document.querySelectorAll(".hero-slide");
const heroDots = document.querySelectorAll(".hero-dots span");
const heroPrevBtn = document.querySelector(".hero-prev");
const heroNextBtn = document.querySelector(".hero-next");
const hero = document.querySelector(".hero2");

if (
    hero &&
    heroSlides.length > 0 &&
    heroDots.length > 0 &&
    heroPrevBtn &&
    heroNextBtn
) {

    let currentSlide = 0;

    function showHeroSlide(index) {

        heroSlides.forEach(slide => {
            slide.classList.remove("active");
        });

        heroDots.forEach(dot => {
            dot.classList.remove("active");
        });

        heroSlides[index].classList.add("active");
        heroDots[index].classList.add("active");

    }

    function nextSlide() {

        currentSlide++;

        if (currentSlide >= heroSlides.length) {
            currentSlide = 0;
        }

        showHeroSlide(currentSlide);

    }

    function prevSlide() {

        currentSlide--;

        if (currentSlide < 0) {
            currentSlide = heroSlides.length - 1;
        }

        showHeroSlide(currentSlide);

    }

    heroNextBtn.addEventListener("click", nextSlide);
    heroPrevBtn.addEventListener("click", prevSlide);

    heroDots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            currentSlide = index;
            showHeroSlide(currentSlide);

        });

    });

    let autoSlide = setInterval(nextSlide, 5000);

    hero.addEventListener("mouseenter", () => {
        clearInterval(autoSlide);
    });

    hero.addEventListener("mouseleave", () => {
        autoSlide = setInterval(nextSlide, 5000);
    });

    showHeroSlide(currentSlide);

}

/*=========================================
            FAQ ACCORDION
=========================================*/

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {

        // Close all other FAQ items
        faqItems.forEach(faq => {

            if(faq !== item){

                faq.classList.remove("active");

            }

        });

        // Toggle current item
        item.classList.toggle("active");

    });

});

/*=========================================
        SHOP PAGE JAVASCRIPT
=========================================*/

/*=========================
        Wishlist
=========================*/

const wishlistBtns = document.querySelectorAll(".wishlist");

wishlistBtns.forEach(btn=>{

    btn.addEventListener("click",function(){

        this.classList.toggle("active");

        const icon=this.querySelector("i");

        if(this.classList.contains("active")){

            icon.classList.remove("fa-regular");

            icon.classList.add("fa-solid");

        }

        else{

            icon.classList.remove("fa-solid");

            icon.classList.add("fa-regular");

        }

    });

});

/*=========================
        Category Filter
=========================*/

const categoryLinks=document.querySelectorAll(".category-list a");
const products=document.querySelectorAll(".product-card");

categoryLinks.forEach(link=>{

    link.addEventListener("click",function(e){

        e.preventDefault();

        categoryLinks.forEach(item=>item.classList.remove("active"));

        this.classList.add("active");

        const category=this.textContent.trim().split("(")[0].trim().toUpperCase();

        products.forEach(product=>{

            const productCategory=product.querySelector(".category").textContent.trim();

            if(productCategory===category){

                product.style.display="block";

            }

            else{

                product.style.display="none";

            }

        });

    });

});

/*=========================
        Search
=========================*/

const searchInput=document.querySelector(".search-box input");

if (searchInput) {

searchInput.addEventListener("keyup",function(){

    const value=this.value.toLowerCase();

    products.forEach(product=>{

        const title=product.querySelector("h3").textContent.toLowerCase();

        if(title.includes(value)){

            product.style.display="block";

        }

        else{

            product.style.display="none";

        }

    });

});

}

/*=========================
        Price Slider
=========================*/

const priceSlider=document.querySelector('input[type="range"]');

if (priceSlider) {

const priceText=priceSlider.nextElementSibling;

priceSlider.addEventListener("input",function(){

    priceText.innerHTML="₹500 - ₹"+this.value;

});

}

/*=========================
        Color Selection
=========================*/

const colors=document.querySelectorAll(".color-filter span");

colors.forEach(color=>{

    color.addEventListener("click",function(){

        colors.forEach(item=>item.classList.remove("active"));

        this.classList.add("active");

    });

});

/*=========================
        Sort
=========================*/

const sort=document.querySelector(".shop-sort select");

if (sort) {

sort.addEventListener("change",function(){

    alert("Sorting: "+this.value);

});

}

/*=========================================
        LOGIN PASSWORD TOGGLE
=========================================*/

const togglePassword = document.querySelector(".toggle-password");
const passwordInput = document.querySelector("#password");

if (togglePassword && passwordInput) {

    togglePassword.addEventListener("click", function(){

        const isPassword = passwordInput.type === "password";

        passwordInput.type = isPassword ? "text" : "password";

        this.classList.toggle("fa-eye");
        this.classList.toggle("fa-eye-slash");

    });

}

/*=========================================
        NEWSLETTER JAVASCRIPT
=========================================*/

const newsletterForm = document.querySelector(".newsletter-form");
const newsletterInput = document.querySelector(".newsletter-input input");

if (newsletterForm && newsletterInput) {

newsletterForm.addEventListener("submit", function(e){

    e.preventDefault();

    const email = newsletterInput.value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(email === ""){

        alert("Please enter your email address.");

        newsletterInput.focus();

        return;

    }

    if(!emailPattern.test(email)){

        alert("Please enter a valid email address.");

        newsletterInput.focus();

        return;

    }

    alert("🎉 Thank you for subscribing to Flora Bouquet!");

    newsletterForm.reset();

});

}

/*=========================================
        FLOWER CARE JAVASCRIPT
=========================================*/

/*=========================
        Card Hover
=========================*/

const careCards = document.querySelectorAll(".care-card");

careCards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-12px)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0)";

    });

});

/*=========================
        Icon Animation
=========================*/

const careIcons = document.querySelectorAll(".care-icon");

careIcons.forEach(icon => {

    icon.addEventListener("mouseenter", () => {

        icon.style.transform = "rotate(10deg) scale(1.1)";

    });

    icon.addEventListener("mouseleave", () => {

        icon.style.transform = "rotate(0deg) scale(1)";

    });

});

/*=========================
    Scroll Animation
=========================*/

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show-care");

        }

    });

},{

    threshold:0.2

});

careCards.forEach(card => {

    observer.observe(card);

});

/*custom page*/
/*=========================================
        OUR PROCESS TIMELINE
=========================================*/

const processSteps = document.querySelectorAll(".process-step");

const processObserver = new IntersectionObserver((entries) => {

    entries.forEach((entry,index)=>{

        if(entry.isIntersecting){

            setTimeout(()=>{

                entry.target.classList.add("active-step");

            },index * 180);

        }

    });

},{
    threshold:0.25
});

processSteps.forEach(step=>{

    processObserver.observe(step);

});

/*=========================================
        CTA ANIMATION
=========================================*/

const ctaSection = document.querySelector(".custom-cta");

const ctaObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show-cta");

        }

    });

},{
    threshold:0.3
});

if(ctaSection){

    ctaObserver.observe(ctaSection);

}

/*=========================================
        SHOPPING CART
=========================================*/

const cart = [];

const cartContainer = document.querySelector(".shopping-cart");

const addButtons = document.querySelectorAll(".add-cart");

const deliveryCharge = 100;
const taxRate = 0.05;

/*=============================
    ADD PRODUCT
==============================*/

addButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        const name = button.dataset.name;
        const price = Number(button.dataset.price);
        const image = button.dataset.image;

        if(!name || !image || !Number.isFinite(price)){
            return;
        }

        const existing = cart.find(item=>item.name===name);

        if(existing){

            existing.qty++;

        }else{

            cart.push({

                name,
                price,
                image,
                qty:1

            });

        }

        updateCart();

    });

});

/*=============================
    UPDATE CART
==============================*/

function updateCart(){

    const itemsContainer = cartContainer.querySelectorAll(".cart-item");

    itemsContainer.forEach(item=>item.remove());

    const heading = cartContainer.querySelector("h3");

    heading.innerHTML = `

        <i class="fa-solid fa-cart-shopping"></i>

        Your Cart (${cart.length})

    `;

    let subtotal = 0;

    cart.forEach((item,index)=>{

        subtotal += item.price * item.qty;

        const div = document.createElement("div");

        div.className="cart-item";

        div.innerHTML=`

            <img src="${item.image}" alt="">

            <div class="cart-info">

                <h4>${item.name}</h4>

                <span>₹${item.price}</span>

            </div>

            <div class="cart-qty">

                <button class="minus" data-index="${index}">-</button>

                <span>${item.qty}</span>

                <button class="plus" data-index="${index}">+</button>

            </div>

            <button class="remove-item"
                    data-index="${index}">

                <i class="fa-solid fa-trash"></i>

            </button>

        `;

        heading.after(div);

    });

    quantityButtons();

    removeButtons();

    updateSummary(subtotal);

}

/*=============================
    QUANTITY
==============================*/

function quantityButtons(){

    document.querySelectorAll(".plus").forEach(btn=>{

        btn.onclick=()=>{

            cart[btn.dataset.index].qty++;

            updateCart();

        }

    });

    document.querySelectorAll(".minus").forEach(btn=>{

        btn.onclick=()=>{

            const item = cart[btn.dataset.index];

            item.qty--;

            if(item.qty<=0){

                cart.splice(btn.dataset.index,1);

            }

            updateCart();

        }

    });

}

/*=============================
    REMOVE
==============================*/

function removeButtons(){

    document.querySelectorAll(".remove-item").forEach(btn=>{

        btn.onclick=()=>{

            cart.splice(btn.dataset.index,1);

            updateCart();

        }

    });

}

/*=============================
    SUMMARY
==============================*/

function updateSummary(subtotal){

    const discount = 0;

    const tax = subtotal * taxRate;

    const total = subtotal + deliveryCharge + tax - discount;

    document.querySelector(".cart-summary").innerHTML=`

        <div>

            <span>Subtotal</span>

            <span>₹${subtotal.toFixed(0)}</span>

        </div>

        <div>

            <span>Delivery</span>

            <span>₹${deliveryCharge}</span>

        </div>

        <div>

            <span>Discount</span>

            <span>₹${discount}</span>

        </div>

        <div>

            <span>Tax</span>

            <span>₹${tax.toFixed(0)}</span>

        </div>

        <hr>

        <div class="total">

            <strong>Total</strong>

            <strong>₹${total.toFixed(0)}</strong>

        </div>

    `;

}

/*=========================================
        CHECKOUT FORM VALIDATION
=========================================*/

const checkoutForm = document.querySelector(".checkout-form form");

if (checkoutForm) {

checkoutForm.addEventListener("submit", function(e){

    const requiredFields = checkoutForm.querySelectorAll("[required]");

    let valid = true;

    requiredFields.forEach(field=>{

        if(field.value.trim()===""){

            field.style.borderColor="#E91E63";

            valid = false;

        }else{

            field.style.borderColor="#f3d9e5";

        }

    });

    if(!valid){

        e.preventDefault();

        alert("Please fill in all required fields.");

    }

});

}

const checkoutSaveSections = [
    {
        button: ".billing-save-btn",
        card: ".billing-card",
        emptyMessage: "Please fill in all billing details.",
        successMessage: "Billing details saved successfully."
    },
    {
        button: ".shipping-save-btn",
        card: ".checkout-card",
        emptyMessage: "Please fill in all shipping details.",
        successMessage: "Shipping details saved successfully."
    },
    {
        button: ".delivery-save-btn",
        card: ".checkout-card",
        emptyMessage: "Please select delivery date and time.",
        successMessage: "Delivery time saved successfully."
    },
    {
        button: ".gift-save-btn",
        card: ".gift-card",
        emptyMessage: "Please add your gift message details.",
        successMessage: "Gift message saved successfully."
    }
];

checkoutSaveSections.forEach(section=>{

    const saveBtn = document.querySelector(section.button);
    const card = saveBtn ? saveBtn.closest(".checkout-card") : document.querySelector(section.card);

    if (!saveBtn || !card) {
        return;
    }

    saveBtn.addEventListener("click", function(){

        const requiredFields = card.querySelectorAll("[required]");

        let valid = true;

        requiredFields.forEach(field=>{

            if(field.value.trim()===""){

                field.style.borderColor="#E91E63";

                valid = false;

            }else{

                field.style.borderColor="#f3d9e5";

            }

        });

        if(!valid){

            alert(section.emptyMessage);

            return;

        }

        alert(section.successMessage);

    });

});
/*=========================================
        PAYMENT METHOD
=========================================*/

const paymentOptions = document.querySelectorAll(
".payment-option input"
);

paymentOptions.forEach(option=>{

    option.addEventListener("change",()=>{

        paymentOptions.forEach(item=>{

            item.parentElement.classList.remove("active-payment");

        });

        option.parentElement.classList.add("active-payment");

    });

});

/*=========================================
        DEFAULT ACTIVE
=========================================*/

const checkedPayment = document.querySelector(
'.payment-option input:checked'
);

if(checkedPayment){

    checkedPayment.parentElement.classList.add(
    "active-payment"
    );

}

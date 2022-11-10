Vue.component('product-details', {
  props: {
    details: {
      type: Array,
      required: true
    }
  },
  template: `
        <ul>
            <li v-for="detail in details">{{detail}}</li>
        </ul>
  `
})

Vue.component('product',{
    props:{
        premium:{
            type: Boolean,
            required: true
        }
    },
    template:` 
        <section>
            <div class="product">
                <div class="product-thumbnail">
                    <a :href="image" target="_blank">
                        <img :src="image" alt="">
                    </a>
                </div>
            </div>
                <div class="product">
                <div class="product-details">
                    <h1>{{title}} <sup v-show="onSale">On Sale</sup></h1>
                    <p v-show="inStock"> in Stock</p>
                    <p v-show="!inStock" :style="[ !inStock ? { 'text-decoration': 'line-through' } : '' ]"> out of Stock</p>
                    <p>Shipping: {{shipping}}</p>

                    <product-details :details="details"></product-details>
            
                    <div class="color-container">
                        <div v-for="(variant, index) in variants" :key="variant.variantId" class="color-box"
                            :style="{backgroundColor: variant.variantColor}" @mouseover="updateProduct(index)"></div>
                    </div>
                    <label v-for="(variantSize, sizeIndex) in Sizes"> {{ variantSize }}<input type="checkbox" :name="variantSize"
                            :value="variantSize"> </label>
                    <button @click="addToCart" :disabled="!inStock" class="btn btnBlue" :class="{disabledButton: !inStock }">Add to cart</button>
            
                </div>
            </div>
        </section>
                           `,
    data() {
        return   {
        brand: 'Vue',
        product: 'Socks',
        selectedVariant: 0,
        onSale: true,
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        variants: [
            {
                variantId: 1234,
                variantImage: "https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578366170160_4.png?alt=media&token=e0829829-627b-44e1-9d96-fa22eaca1ac9",
                variantColor: "green",
                variantSize: ["small", "medium", "large"],
                variantQuantity: 10
              
            },
            {
                variantId: 1235,
                variantImage: "https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578366211820_6.png?alt=media&token=8d11c5b3-5741-414c-a7ad-6d830f2f4229",
                variantColor: "blue",
                variantSize: ["small", "medium" ],
                variantQuantity: 0
            },
          ],
        //   cart:0,
        }
    },
    methods:{
        addToCart() {
            this.$emit('add-to-cart')
            //  this.cart += 1
            console.log('CLICKED')
        },
        updateProduct(index) {  
            this.selectedVariant = index
        }
    },
    computed:{
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        Sizes(){
            return this.variants[this.selectedVariant].variantSize
        },
        shipping(){
            if ( this.premium){
                return "Free"
            }

            return 2.99
        }
    }

})

var app = new Vue({
    el: '#app',
    data:{
        premium: true,
        cart: 0
    },
    method: {
        updateCart(){
            this.cart += 1
        }
    }
})
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

                    <p v-if="!reviews.length">There are no reviews yet </p>
                    <ul>
                        <li v-for="review in reviews">
                        <p>{{ review.name }}</p>
                        <p>Rating: {{ review.rating }}</p>
                        <p>{{ review.review }}</p>
                        </li>
                    </ul>   
                    <product-review @review-submitted="addReview"></product-review> <!-- calling addReview methods and passing the data from emit function-->
                    <product-question ></product-question>
                </div>
            </div>
        </section>`,
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
        reviews: [],
        question: []
        }
    },
    methods:{
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId )
        },
        updateProduct(index) {  
            this.selectedVariant = index
        },      
        addReview(productReview){ 
            this.reviews.push( productReview ) // push the data to review attribute
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

Vue.component('product-review',{
    template:`
       <form class="review-form" @submit.prevent="onSubmit">
        <p v-if="errors.length">
            <b>Please correct the following error(s): </b>
            <ul>
                <li v-for="error in errors">{{ error }}</li>
            </ul>
        </p>

      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name">
      </p>
      
      <p>
        <label for="review">Review:</label>      
        <textarea id="review" v-model="review"></textarea>
      </p>
      
      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>
          
      <p>
        <input type="submit" value="Submit">  
      </p>    
    
    </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            if (this.name && history.review && this.rating){ // Check if the variables are empty
                let productReview = { // adding all data to e produtReview variable
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                }
                this.$emit('review-submitted', productReview ) // Emiting he event triggered notice along with the productReview variable data to review-submitted
                this.name = null   // Emptying the data
                this.review = null // Emptying the data
                this.rating = null // Emptying the data
            }else{
                this.errors = []   // Emptying the data
                if( !this.name) this.errors.push("Name required.")     // Add error message
                if( !this.review) this.errors.push("review required.") // Add error message
                if( !this.rating) this.errors.push("rating required.") 
            }
            

        }
         }   
})




var app = new Vue({
    el: '#app',
    data:{
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id){
            this.cart.push(id)
        }
    }
})
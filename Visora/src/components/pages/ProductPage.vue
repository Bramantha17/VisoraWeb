<script setup>
import { useStore } from 'vuex'
import { onMounted, ref, computed } from 'vue'
import ProductList from '../product/ProductList.vue';
import TitleProduct from '../productContent/TitleProduct.vue';
import QustionProduct from '../productContent/QustionProduct.vue';
import TrialProduct from '../productContent/TrialProduct.vue';
import WebFooter from '../footer/WebFooter.vue';

const store = useStore()
const loading = ref(false)
console.log('Products in store:', store.state.product.products)


onMounted(async () => {
  loading.value = true
  try {
    await store.dispatch('product/getProductData')
  } catch (err) {
    console.error('ERROR:', err)
  } finally {
    loading.value = false
  }
})
const products = computed(() => store.state.product.products)
</script>

<template>
  <div class="product-background">
    <TitleProduct></TitleProduct>
    <div class=" p-5">
      <ProductList :products="products"></ProductList>
    </div>
    <QustionProduct></QustionProduct>
    <TrialProduct></TrialProduct>
    <WebFooter></WebFooter>
  </div>  
</template>
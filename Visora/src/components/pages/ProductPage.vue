<script setup>
import WebProduct from '../productContent/WebProduct.vue';
import { ref, onMounted } from 'vue'
import { getProducts } from '@/service/product'
import ProductList from '../product/ProductList.vue';
import TitleProduct from '../productContent/TitleProduct.vue';
import QustionProduct from '../productContent/QustionProduct.vue';
import TrialProduct from '../productContent/TrialProduct.vue';

const products = ref([])
const loading = ref(false)

const fetchProducts = async () => {
  loading.value = true
  try {
    const res = await getProducts()
    console.log('API response:', res)
    products.value = res.data
  } catch (err) {
    console.error('ERROR:', err)
  } finally {
    loading.value = false
  }
}

onMounted(fetchProducts)
</script>

<template>
  <div class="">
    <TitleProduct></TitleProduct>
    <ProductList :products="products"></ProductList>
    <QustionProduct></QustionProduct>
    <TrialProduct></TrialProduct>
  </div>  
</template>
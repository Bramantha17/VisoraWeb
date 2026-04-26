<script setup>
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import api from '@/service/api'

const route = useRoute()
const product = ref({})

onMounted(async () => {
    const id = route.params.id
    const response = await api.get(`/products/${id}`)
    product.value = response.data.data
})
</script>


<template>
  <div class="my-5">
    <div class="row align-items-center">
      <div class="col-md-8 text-center">
        <img
          :src="product.product_image_url"
          alt="Product image"
          class="img-fluid rounded"
          style="width: 407px; height: 577px;" />
      </div>
      <div class="col-md-3">
        <h2 class="fw-bold mb-3">{{ product.product_name }}</h2>
        <p v-html="product.product_description" class="text-muted"></p>
        <hr>

        <h4 class="text-warning mt-4">Rp{{ product.final_price }}</h4>
        <p>Stock: {{ product.product_stock }}</p>

        <a :href="product.product_link" target="_blank" class="btn btn-warning rounded-2 mt-3">
          Hubungi Kami
        </a>
      </div>
    </div>
  </div>
</template>

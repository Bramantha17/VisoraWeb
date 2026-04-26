<sctipt setup>

</sctipt>

<template>
    <div class="p-5 me-5 text-light">
        <div class="d-flex justify-content-around align-items-start">
            <div class="me-4" style="margin-top: -50px;">
                <img src="@/assets/image/Visora_logo.png" style="height: 140    px; width: 300px;">
                <p>Solusi bisnis modern yang membantu  <br>
                    perusahaan berkembang lebih cepat dan efisien.</p> 
                <div class="mt-3">
                    <font-awesome-icon :icon="['fab', 'facebook']" class="fs-2 me-3" />
                    <font-awesome-icon :icon="['fab', 'instagram']" class="fs-2 me-3" />
                    <font-awesome-icon :icon="['fab', 'x-twitter']" class="fs-2 me-3" />
                    <font-awesome-icon :icon="['fab', 'github']" class="fs-2 me-3   " />
                </div>
            </div>
            <div class="me-4">
                <h3 class="mb-4 fs-5">Produck</h3>
                <ul class="list-unstyled">
                    <li>Fitur</li>
                    <li class="mt-2 ">Harga</li>
                    <li class="mt-2">Intergrasi</li>
                    <li class="mt-2">API</li>
                </ul>
            </div>
            <div class="me-4">
                <h3 class="mb-4 fs-5">Perusahaan</h3>
                <ul class="list-unstyled">
                    <li>Tentang kami</li>
                    <li class="mt-2">Karir</li>
                    <li class="mt-2">Blog</li>
                    <li class="mt-2">Press kit</li>
                </ul>
            </div>
            <div>
                <h3 class="mb-4 fs-5">Kontak</h3>
                <ul class="list-unstyled">
                    <li>
                        <font-awesome-icon :icon="['fas', 'envelope']" class="fs-5" /> Visora@gmail.com
                    </li>
                    <li class="mt-3">
                        <font-awesome-icon :icon="['fas', 'phone']" class="fs-5" /> +62 123 4567 890
                    </li>
                    <li class="mt-3"> 
                        <font-awesome-icon :icon="['fas', 'location-dot']" class="fs-5" /> Jl. Sudirman No. 123 Jakarta Selatan, 12190
                    </li>
                </ul>
            </div>
        </div>  
    </div>
    <hr class="text-white p-2">
    <div class="container d-flex justify-content-between align-items-center">
        <span class="text-light">© 2026 Visora. All rights reserved.</span>
        <div>
            <a class="text-light me-3 text-decoration-none">Privacy Policy</a>
            <a class="text-light me-3 text-decoration-none">Terms of Service</a>
            <a class="text-light text-decoration-none">Cookie Policy</a>
        </div>
  </div>
</template>
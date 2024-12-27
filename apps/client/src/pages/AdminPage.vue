<script setup lang="ts">
import { RouterView } from 'vue-router';
import AdminSidebar from '@/components/adminPanel/AdminSidebar.vue';
import MainLayout from '@/components/MainLayout.vue';
</script>

<template>
  <MainLayout>
    <div class="flex gap-2">
      <AdminSidebar />
      <div class="flex-1">
        <RouterView/>
      </div>
    </div>
  </MainLayout>
</template>

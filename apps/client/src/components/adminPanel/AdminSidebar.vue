<script setup lang="ts">
import { computed, type Component } from "vue";
import { useRouter } from "vue-router";
import { cn } from "@/lib/utils";
import Separator from "@/components/ui/separator/Separator.vue";
import { BookOpenCheck, CalendarClock } from "lucide-vue-next";

interface Item {
  title: string;
  to: string;
  icon?: Component;
}

const router = useRouter();

const sidebarNavItems: Item[] = [
  {
    title: "Rezerwacje",
    to: "/admin-dashboard/reservations",
    icon: BookOpenCheck,
  },
  {
    title: "Grafik",
    to: "/admin-dashboard/schedule",
    icon: CalendarClock,
  },
];

const currentPath = computed(() => router.currentRoute.value.path);
</script>

<template>
  <div class="h-fullNoHeader flex">
    <nav
      class="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-2 lg:py-4 min-w-48"
    >
      <RouterLink
        v-for="item in sidebarNavItems"
        :key="item.title"
        as="a"
        :to="item.to"
        variant="ghost"
        :class="
          cn(
            'w-full text-left justify-start p-2 flex gap-4 items-center',
            currentPath === `${item.to}` && 'bg-muted hover:bg-muted'
          )
        "
      >
        <component :is="item.icon" v-if="item.icon" /> {{ item.title }}
      </RouterLink>
    </nav>
    <Separator orientation="vertical" />
  </div>
</template>

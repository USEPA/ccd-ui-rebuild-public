<template>
  <div class="grid grid-cols-1 grid-flow-row justify-start ">
    <div class="row-span-1 h-28">
      <ComponentsUiChemicalLeftNavHeader v-if="selectedList" />
    </div>
    <ClientOnly v-if="getNavTabs">
      <div
        v-if="getNavTabs"
        class="row-span-8"
      >
        <TieredMenu
          :model="getNavTabs"
          :pt="{
            root: { class: 'w-[180px] text-xl relative' },
            item: { 'class': 'bg-primary !text-white', 'aria-level': null },
          }"
        >
          <template #item="{ item, props, hasSubmenu }">
            <div class="text-white py-1">
              <nuxt-link
                v-if="item.external"
                v-bind="props.action"
                :to="item.route"
                :target="item.target"
                class="text-white mt-0"
              >
                <span class="ml-1">{{ item.labelDisplay }}</span>
              </nuxt-link>
              <nuxt-link
                v-else
                v-bind="props.action"
                :to="item.route"
                class="text-white mt-0"
              >
                <span class="ml-1">{{ item.labelDisplay }}</span>
                <span
                  v-if="hasSubmenu"
                  class="pi pi-angle-right text-white ml-auto float-end align-middle mt-1"
                />
              </nuxt-link>
            </div>
          </template>
        </TieredMenu>
      </div>
    </ClientOnly>
    <Skeleton
      v-else
      class="w-[200px] h-36"
    />
  </div>
</template>

<script setup lang="ts">
import { Skeleton } from 'primevue';
import { ClientOnly } from '#components';
import { useNavTabsStore } from '~/stores/navTabsStore';

const route = useRoute();

const {selectedList} = storeToRefs(useChemListStore());

const useTabs = useNavTabsStore();

const {getNavTabs} = storeToRefs(useTabs);
</script>

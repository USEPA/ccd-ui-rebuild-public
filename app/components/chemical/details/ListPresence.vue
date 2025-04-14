<template>
  <div class="list-presence pt-4">
    <div
      v-if="noLists"
      class="text-gray-500 italic"
    >
      {{ lists }}
    </div>
    <div
      v-else
      class="space-y-4"
    >
      <Card
        v-for="type in orderedTypes"
        :key="type"
        class="mb-4"
      >
        <template #title>
          <div
            class="flex items-center justify-between cursor-pointer"
            @click="toggleType(type)"
          >
            <div class="flex items-center">
              <i class="pi pi-list mr-2" />
              <span
                v-tooltip.top="getHeaderDescription(type)"
                class="capitalize"
              >{{ getDisplayName(type) }}</span>
            </div>
            <i :class="getIconClass(type)" />
          </div>
        </template>
        <template #content>
          <div
            v-if="groupedLists[type] && groupedLists[type].length > 0"
            v-show="expandedTypes[type]"
            class="flex flex-wrap gap-3"
          >
            <NuxtLink
              v-for="list in sortedListsByType[type]"
              :key="list.id"
              v-tooltip.top="list.shortDescription"
              :to="`/chemical-lists/${list.listName}`"
              class="p-3 rounded-lg shadow-sm cursor-pointer transition-colors duration-200 text-center"
              :class="[getListClass(type), { 'max-w-full': true }]"
            >
              <div
                class="font-medium truncate"
                :style="{ maxWidth: '100%' }"
              >
                {{ list.label }}
              </div>
            </NuxtLink>
          </div>
          <div
            v-else
            v-show="expandedTypes[type]"
            class="text-gray-500 italic"
          >
            No {{ type }} lists found
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ChemicalList } from '~/api/types/listTypes';

const props = defineProps<{
  lists: ChemicalList[] | undefined;
}>();

const noLists = computed(() => {
  return !props.lists || !props.lists.length;
});

// Define the order of list types as a computed property
const orderedTypes = computed(() => ['federal', 'state', 'international', 'other']);

// Track which types are expanded
const expandedTypes = ref<Record<string, boolean>>({
  federal: true,
  state: true,
  international: true,
  other: true,
});

// Toggle the expanded state of a type
const toggleType = (type: string) => {
  expandedTypes.value[type] = !expandedTypes.value[type];
};

// Get the icon class based on expanded state
const getIconClass = (type: string) => {
  return [
    'pi',
    expandedTypes.value[type] ? 'pi-chevron-down' : 'pi-chevron-right',
    'transition-transform duration-200',
  ];
};

const groupedLists = computed(() => {
  if (!props.lists) { return {}; }
  return props.lists.reduce((acc, list) => {
    const type = list.type || 'other';
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(list);
    return acc;
  }, {} as Record<string, ChemicalList[]>);
});

// Sort lists by type to optimize layout
const sortedListsByType = computed(() => {
  const result: Record<string, ChemicalList[]> = {};
  // Process each type
  orderedTypes.value.forEach((type) => {
    if (!groupedLists.value[type]) {
      result[type] = [];
      return;
    }
    // Create a copy of the lists for this type
    const lists = [...groupedLists.value[type]];
    // Sort lists by label length (shortest first)
    lists.sort((a, b) => {
      // First sort by length
      const lengthDiff = (a.label?.length || 0) - (b.label?.length || 0);
      // If lengths are equal, sort alphabetically
      if (lengthDiff === 0) {
        return (a.label || '').localeCompare(b.label || '');
      }
      return lengthDiff;
    });
    result[type] = lists;
  });
  return result;
});

const getListClass = (typeName: string) => {
  switch (typeName) {
    case 'federal':
      return 'bg-amber-200 text-slate-600 hover:bg-amber-300';
    case 'state':
      return 'bg-green-200 text-slate-600 hover:bg-green-300';
    case 'international':
      return 'bg-blue-200 text-slate-600 hover:bg-blue-300';
    case 'other':
      return 'bg-pink-200 text-slate-600 hover:bg-pink-300';
    default:
      return 'bg-gray-200 text-slate-600 hover:bg-gray-300';
  }
};

const getDisplayName = (type: string) => {
  switch (type) {
    case 'federal':
      return 'Federal';
    case 'state':
      return 'US State';
    case 'international':
      return 'International';
    case 'other':
      return 'Other';
    default:
      return type;
  }
};

const getHeaderDescription = (type: string) => {
  switch (type) {
    case 'federal':
      return 'Lists defined by the US federal government';
    case 'state':
      return 'Lists defined by a US state government';
    case 'international':
      return 'Lists defined by international organizations';
    case 'other':
      return 'All lists not falling into one of the defined categories';
    default:
      return '';
  }
};
</script>

<script setup lang="ts">
import Popover from 'primevue/popover';
import {
  ref, onMounted, watch, computed,
} from 'vue';
import type {HelpObj} from './types';
import { useHelpTexts } from '~/stores/helpTexts';

const helpTextsStore = useHelpTexts();

const helpText = ref <HelpObj | Record<string, never>>({});

const {getHelpTexts} = storeToRefs(helpTextsStore);

const props = defineProps({
  dataCy: {type: String, default: 'helpTextHeader'},
  labelType: {type: String, default: 'h1'},
  helpKey: {type: String, default: ''},
  headingText: {type: String, default: ''},
});

const getHelp = async (): Promise<HelpObj | Record<string, never>> => {
  let help = null;
  help = await helpTextsStore.getById(props.helpKey);
  let icon = 'b-info-circle';
  let trigger = 'mouseenter';
  if (help.iconType === 'Help') {
    icon = 'help-circle';
  }
  const helpObj = {
    icon: icon,
    trigger: trigger,
    text: help.helpText,
  };
  return helpObj;
};

watch(getHelpTexts, async (newVal, oldVal) => {
  if (newVal.length > oldVal.length) {
    helpText.value = await getHelp();
  }
});

onMounted(async () => {
  helpText.value = await getHelp();
});

const helpTextTrigger = computed(() => helpText.value?.trigger || 'mouseenter');

const getLabelComponentType = computed(() => props.labelType);

const op = ref();

const toggle = (event: MouseEvent | KeyboardEvent) => {
  op.value.toggle(event);
};

const hide = () => {
  op.value.hide();
};
</script>

<template>
  <client-only>
    <div>
      <div
        v-if="helpText.text?.length > 0"
      >
        <Popover
          ref="op"
          data-cy="helpText"
          @mouseleave="hide"
        >
          <template #default>
            <div class="flex flex-col p-2 bg-slate-100">
              <span
                data-cy="helpTextHeader"
                autofocus
              >{{ headingText }}</span>
            </div>
            <div class="flex flex-col p-2 gap-2">
              <span
                data-cy="helpTextBody"
                v-html="helpText.text"
              />
            </div>
          </template>
        </Popover>
        <span
          class="flex align-top flex-wrap popoverLabel"
          :tabindex="0"
          @[helpTextTrigger]="toggle"
          @keyup.enter="toggle"
        >
          <component
            :is="getLabelComponentType"
            class="popoverLabel"
            :data-cy="dataCy"
          >
            {{ headingText }}
          </component>
          <nuxt-icon
            :class="'ml-2'"
            :name="helpText.icon"
          />
        </span>
      </div>
      <span
        v-else
      >
        <component
          :is="getLabelComponentType"
          class="popoverLabel"
          data-cy="headerText"
        >
          {{ headingText }}
        </component>
      </span>
    </div>
  </client-only>
</template>

<style scoped lang="scss">
.widen {
  max-width: 700px !important;
}

.popoverLabel {
  width: fit-content;
}

.fa-info-circle {
  color: rgb(33, 37, 41) !important;
}
</style>

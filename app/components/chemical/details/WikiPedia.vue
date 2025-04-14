<template>
  <div>
    <div
      v-if="wikiData.loading"
      class="flex justify-center items-center p-4"
    >
      <div
        class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"
        role="status"
      >
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div
      v-else-if="wikiData.summary"
      class="p-4"
    >
      <div
        class="prose prose-sm max-w-none space-y-4"
        data-cy="wikiText"
        v-html="wikiData.summary"
      />
      <a
        :href="`https://en.wikipedia.org/wiki/${encodeURIComponent(props.title)}`"
        target="_blank"
        rel="noopener noreferrer"
        class="text-blue-600 hover:text-blue-800 mt-2 inline-block"
      >
        Read more
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import WikipediaRepository from '~/api/WikipediaRepository';

const wikiRepo = new WikipediaRepository();

interface WikiData {
  loading: boolean;
  summary: string;
}

interface WikiPage {
  pageid: number;
  extract: string;
}

interface WikiResponse {
  query: {
    pageids: string[];
    pages: Record<string, WikiPage>;
  };
}

const props = defineProps<{
  title: string;
}>();

const wikiData = ref<WikiData>({
  loading: false,
  summary: '',
});

const getWikiData = async () => {
  wikiData.value.loading = true;
  try {
    const result = await wikiRepo.getWikipediaArticle(props.title) as WikiResponse;
    if (result.query.pageids.length > 0) {
      const pageId = result.query.pageids[0] as keyof typeof result.query.pages;
      const page = result.query.pages[pageId];
      if (page?.extract) {
        const searchTerm = '...';
        const endSubStr = page.extract.lastIndexOf(searchTerm) > 50 ?
            page.extract.lastIndexOf(searchTerm) :
          page.extract.length + 1;
        wikiData.value.summary = page.extract
          .substring(0, endSubStr)
          .replaceAll('<br />', '')
          .replaceAll('<br>', '');
      }
    }
  }
  catch (error) {
    console.error('Error fetching Wikipedia data:', error);
    wikiData.value.summary = '';
  }
  finally {
    wikiData.value.loading = false;
  }
};

watch(() => props.title,
  (newValue) => {
    if (newValue) {
      getWikiData();
    }
  },
  { immediate: true });
</script>

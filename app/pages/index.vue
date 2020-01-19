<template lang="pug">
  div
    h1 hello.
    pre {{ catalog }}
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class IndexPage extends Vue {
  /** カタログデータ */
  catalog: any[] = [];

  /** Unicodeレンジデータ */
  unicodeRanges: any = [];

  /** Lifecycle hook */
  async beforeMount(): Promise<void> {
    await Promise.all([
      this.fetchCatalog(),
      this.fetchUnicodeRanges(),
    ]);
  }

  /**
   * カタログデータを取得する
   */
  async fetchCatalog(): Promise<void> {
    this.catalog = await this.$http.$get('catalog.json');
  }

  /**
   * Unicodeレンジを取得する
   */
  async fetchUnicodeRanges(): Promise<void> {
    this.unicodeRanges = await this.$http.$get('unicode-ranges.json');
  }
}
</script>

<style lang="sass" scoped>
</style>

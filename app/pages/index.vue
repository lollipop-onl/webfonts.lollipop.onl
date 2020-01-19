<template lang="pug">
  .page-container
    h1.page-title.title(:style="fontStyle")
      .sub lollipop.onl
      .main Webフォントプレビュー
    .free-textarea.textarea(
      :style="fontStyle"
      placeholder="Free textarea"
      contenteditable="true"
    )
    .options
      select(v-model="selectedFontName")
        option(
          v-for="({ fontName }) in catalog"
          :value="fontName"
        ) {{ fontName }}
      select(v-model="selectedFontWeight")
        option(
          v-for="weight in fontWeights"
          :value="weight"
        ) {{ weight }}
      select(v-model="unicodeIndex")
        option(
          v-for="(_, i) in unicodeRanges"
          :value="i"
        ) {{ i }}
    RangePreview.preview(
      :style="fontStyle"
      :unicodeRanges="unicodeRanges"
      :index="unicodeIndex"
    )
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'nuxt-property-decorator';
import RangePreview from '@/components/RangePreview.vue';

@Component({
  components: {
    RangePreview,
  }
})
export default class IndexPage extends Vue {
  /** カタログデータ */
  catalog: any[] = [];

  /** Unicodeレンジデータ */
  unicodeRanges: any = [];

  /** Unicodeインデックス */
  unicodeIndex = 0;

  /** 選択中のフォント名 */
  selectedFontName = '';

  /** 選択中のフォントウェイト */
  selectedFontWeight = 400;

  /** 選択中のフォントのウェイト */
  get fontWeights(): Array<number> {
    const font = this.catalog.find(({ fontName }) => fontName === this.selectedFontName);

    if (!font) {
      return [];
    }

    return font.weights;
  }

  /** フォントのスタイル */
  get fontStyle(): any {
    return {
      fontFamily: this.selectedFontName,
      fontWeight: this.selectedFontWeight,
    };
  }

  /** フォントが変更されたらウェイトを調整する */
  @Watch('selectedFontName')
  onChangeFontName(fontName: string): void {
    const font = this.catalog.find(({ fontName }) => fontName === this.selectedFontName);

    if (!font) {
      return;
    }

    const hasWeight = font.weights.some((weight: number) => weight === this.selectedFontWeight);

    if (hasWeight) {
      return;
    }

    this.selectedFontWeight = 400;
  }

  /** Lifecycle hook */
  async beforeMount(): Promise<void> {
    await Promise.all([
      this.fetchCatalog(),
      this.fetchUnicodeRanges(),
    ]);

    this.addWebfontCss();
  }

  /**
   * カタログデータを取得する
   */
  async fetchCatalog(): Promise<void> {
    this.catalog = await this.$http.$get('catalog.json');
    this.selectedFontName = this.catalog[0].fontName;
  }

  /**
   * Unicodeレンジを取得する
   */
  async fetchUnicodeRanges(): Promise<void> {
    this.unicodeRanges = await this.$http.$get('unicode-ranges.json');
  }

  /**
   * フォントCSSをHeadに埋め込む
   */
  addWebfontCss(): void {
    this.catalog.forEach(({ fontName }) => {
      const $link = document.createElement('link');

      $link.setAttribute('rel', 'stylesheet');
      $link.setAttribute('href', `https://lollipop-onl.github.io/webfonts.lollipop.onl/${fontName}.css`);

      document.head.appendChild($link);
    });
  }
}
</script>

<style lang="sass" scoped>
  .page-container
    &
      padding: 32px 20px 100px

    & > .textarea,
    & > .options,
    & > .preview
      margin-top: 32px

  .page-title
    &
      line-height: 1.5

    & > .sub
      font-size: 12px

    & > .main
      font-size: 20px

  .free-textarea
    &
      width: 100%
      box-sizing: border-box
      padding: 1em 1.2em
      font-size: 24px
      line-height: 1.5
      border: 1px solid #cccccc
      border-radius: 4px

    &:empty::before
      content: attr(placeholder)
      opacity: 0.5
</style>

<template lang="pug">
  div
    ul.range-preview(
      v-for="(unicodeRange, i) in unicodeRanges"
      v-if="i === index"
    )
      li.char(
        v-for="unicode in unicodeRange"
        :unicode="unicode"
      ) {{ toCharacter(unicode) }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component
export default class RangePreview extends Vue {
  /** Unicodeレンジ */
  @Prop({ type: Array, required: true })
  unicodeRanges!: any[];

  /** インデックス */
  @Prop({ type: Number, required: true })
  index!: number;

  /**
   * Unicodeを文字に変換
   * @param unicode Unicode
   */
  toCharacter(unicode: string): string {
    const hex = Number.parseInt(unicode.replace(/^U\+/, '0x'), 16);

    return String.fromCharCode(hex);
  }
}
</script>

<style lang="sass" scoped>
  .range-preview
    &
      display: flex
      flex-wrap: wrap

    & > .char
      position: relative
      display: flex
      align-items: center
      justify-content: center
      width: 56px
      height: 56px
      font-size: 24px

    & > .char::before
      position: absolute
      top: 0
      left: 50%
      visibility: hidden
      content: attr(unicode)
      font-family: monospace
      font-size: 12px
      white-space: nowrap
      transform: translate(-50%, -100%)

    & > .char:hover
      background: #ccc

    & > .char:hover::before
      visibility: visible
</style>

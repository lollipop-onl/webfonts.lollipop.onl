<template lang="pug">
  div
    ul(
      v-for="(unicodeRange, i) in unicodeRanges"
      v-if="i === index"
    )
      li(
        v-for="unicode in unicodeRange"
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
</style>

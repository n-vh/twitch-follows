<div class="follows">
  <slot />
</div>

<style lang="scss">
  .follows {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(auto-fit, minmax(240px, 0fr));
    justify-content: center;
  }
</style>

<section class="warning">
  <span>User banned!</span>
  <span>Follows count may be inaccurate.</span>
</section>

<style lang="scss">
  @import 'src/lib/styles/colors.scss';

  .warning {
    align-items: center;
    background-color: $red-warning;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    font-size: 16px;
    font-variation-settings: 'wght' 550;
    height: 68px;
    justify-content: center;
    line-height: 22px;
    margin: auto;
    position: relative;
    top: -14px;
    width: 330px;

    &::after {
      content: '';
      background: $red-warning;
      padding: 5px;
      position: absolute;
      transform: rotate(45deg);
      top: -4px;
    }
  }
</style>

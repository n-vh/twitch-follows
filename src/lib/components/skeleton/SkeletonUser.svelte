<div class="user">
  <div class="avatar skeleton" />
  <div class="info">
    <div class="username skeleton" />
    <div class="follows skeleton" />
  </div>
</div>

<style lang="scss">
  .user {
    align-items: center;
    display: flex;
    gap: 14px;
    justify-content: center;

    .avatar {
      border-radius: 50%;
      height: 68px;
      width: 68px;
    }

    .info {
      display: flex;
      flex-direction: column;
      gap: 10px;

      .username {
        height: 18px;
        width: 120px;
      }

      .follows {
        height: 16px;
        width: 90px;
      }
    }
  }
</style>

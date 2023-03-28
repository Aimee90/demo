<template>
  <div class="user-avatar-dropdown">
    <Dropdown @on-click="handleClick">
      <Badge :dot="!!messageUnreadCount">
        <Avatar v-if="!!userAvatar" :src="userAvatar"/>
        <Avatar v-else icon="ios-person" style="background-color: #87d068"/>
        <!-- <Avatar v-else style="background-color: #87d068">{{avatar}}</Avatar> -->
      </Badge>
      <span style="margin-left: 10px;">{{uName}}</span>
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <!-- <DropdownItem name="message">
          消息中心<Badge style="margin-left: 10px" :count="messageUnreadCount"></Badge>
        </DropdownItem> -->
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import './user.less'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'User',
  props: {
    userAvatar: {
      type: String,
      default: ''
    },
    messageUnreadCount: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      uName: this.userName()
    }
  },
  methods: {
    ...mapActions([
      'handleLogOut'
    ]),
    ...mapGetters([
      'userName'
    ]),
    logout () {
      this.handleLogOut().then(() => {
        this.$router.push({
          name: 'login'
        })
      })
    },
    message () {
      this.$router.push({
        name: 'message_page'
      })
    },
    handleClick (name) {
      switch (name) {
        case 'logout': this.logout()
          break
        case 'message': this.message()
          break
      }
    }
  },
  computed: {
    avatar () {
      return this.uName ? this.uName.substr(0, 1) : 'U'
    }
  }
}
</script>
<style lang="less" scoped>
  .icon-user{
    width: 32px;
    height: 32px;
    border-radius: 20px;
    background-color: #87d068;
    font-size: 1.2em;
    display: block;
    color: #FFF;
    font-weight: bold;
  }
</style>

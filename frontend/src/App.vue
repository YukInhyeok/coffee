
<template>
    <v-app>
        <v-app-bar app color="primary" dark>
            <v-app-bar-nav-icon @click.stop="bDrawer=!bDrawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Coffee</v-toolbar-title>
        </v-app-bar>
        <v-navigation-drawer absolute temporary v-model="bDrawer">
            <v-toolbar flat height="100px">
                <v-list>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-avatar>
                                <img src="http://randomuser.me/api/portraits/men/44.jpg">
                            </v-list-item-avatar>
                            <v-list-item-title class="title">관리자 페이지</v-list-item-title>
                            <v-list-item-subtitle></v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-toolbar>
            <v-divider></v-divider>
            <v-list class="pt-3">
                <v-list-item v-for="item in items" :key="item.text" :href="item.to">
                    <v-list-item-action>
                        <v-icon>{{item.icon}}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>{{item.text}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-main>
            <router-view/>
        </v-main>
        <v-footer>
            <v-btn text value="서비스 안내">
                <v-icon>subway</v-icon>
            </v-btn>
        </v-footer>
    </v-app>
</template>
<script>// bDrawer = 메뉴 버튼

export default {
  name: 'App',

  data() {     
      return {
      bDrawer: false,
      items: [
        { text: '소개', icon: 'mdi-star' , to:'/about'},
        { text: '메인페이지', icon: 'mdi-account-multiple',to:'/home' },
        { text: 'Starred', icon: 'mdi-star' },
        { text: 'Recent', icon: 'mdi-history' },
        { text: 'Offline', icon: 'mdi-check-circle' },
        { text: 'Uploads', icon: 'mdi-upload' },
        { text: 'Backups', icon: 'mdi-cloud-upload' },
      ],
      }
  }
};
</script>

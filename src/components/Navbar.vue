<template>
  <div>
    <v-snackbar v-model="snackbar" :timeout="4000" top color="success">
      <span>You have added a project</span>

      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <v-app-bar app flat>
      <v-app-bar-nav-icon
        class="grey--text"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light"> Todo </span>
        <span>Chuck</span>
      </v-toolbar-title>
      <v-spacer />

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn depressed color="grey--text" v-bind="attrs" v-on="on">
            <span> Menu </span>
            <v-icon right> mdi-arrow-down-drop-circle-outline </v-icon>
          </v-btn>
        </template>
        <v-list dense nav>
          <v-list-item
            v-for="link in links"
            :key="link.text"
            router
            :to="link.route"
          >
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title> {{ link.text }} </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn depressed color="grey--text">
        <span> Sign Out </span>
        <v-icon right> mdi-logout </v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer">
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <img src="/avatar-2.png" alt="The Chuck Spadina" />
          </v-avatar>
          <p class="white--text subheading mt-1">Chuck Spadina</p>
        </v-flex>

        <v-flex class="mt-2 mb-3">
          <Popup @toggleSnackbar="snackbar=true"/>
        </v-flex>
      </v-layout>
      <v-list dense nav>
        <v-list-item
          v-for="link in links"
          :key="link.text"
          router
          :to="link.route"
        >
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> {{ link.text }} </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import Popup from "./Popup.vue";
export default {
  name: "Navbar" as string,
  components: {
    Popup,
  },
  data: () => ({
    drawer: false as boolean,
    links: [
      { icon: "mdi-view-dashboard", text: "Dashboard", route: "/" },
      { icon: "mdi-folder", text: "My Projects", route: "/projects" },
      { icon: "mdi-account", text: "Team", route: "/team" },
    ] as object[],
    snackbar: false as boolean
  }),
};
</script>


<!-- Template für ein News Element -->
<template>
  <b-container>
    <!-- NAVBAR-->
<nav class="navbar navbar-expand-lg py-3 navbar-dark bg-dark shadow-sm">
  <div class="container">
    <a href v-on:click="index" class="navbar-brand">
      <!-- Logo Image -->
      <img src="@/assets/logo.svg" width="45" alt="" class="d-inline-block align-middle mr-2">
      <!-- Logo Text -->
      <span class="text-uppercase font-weight-bold">Refundable</span>
    </a>

    <button type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler"><span class="navbar-toggler-icon"></span></button>

    <div id="navbarSupportedContent" class="collapse navbar-collapse">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item"><a href v-on:click="index" class="nav-link">Home </a></li>
        <li class="nav-item"><a href v-on:click="accountView" class="nav-link">Konto </a></li>
        <li class="nav-item"><a href v-on:click="logout" class="nav-link">Abmelden</a></li>
      </ul>
    </div>
  </div>
</nav>
    <!-- Verlinkung zu dem zugehörigen Antrag -->
    <b-row
      align-v="center"
      v-on:click="linkToApplication(snews.uuid)"
      class="shadow-lg news-elem-row"
    >
      <b-col cols="12">
        <b-container>
          <b-row align-v="center">
            <b-col cols="2">
              <b-container style="height: 100%">
                <b-row align-v="center" align-h="center" style="height: 100%">
                  <!-- Illustration Angenommen/Abgelehnt -->
                  <img
                    src="@/assets/accepted_1.svg"
                    class="align-middle news-status"
                    style="height: 50px; width: auto"
                    alt="Illustration von arbeitenden Personen"
                  />
                </b-row>
              </b-container>
            </b-col>
            <b-col cols="10">
              <b-container>
                <b-row align-h="center" align-v="center">
                  <b-col cols="12">
                    <!-- Titel der Neuigkeit -->
                    <h3 class="news-elem-heading">{{ snews.title }}</h3>
                  </b-col>
                </b-row>
                <b-row align-h="center" class="d-none d-md-block">
                  <b-col cols="12">
                    <!-- Beschreibung der Neuigkeit -->
                    <h4 class="news-elem-heading">
                      Der Antrag {{ snews.title }} wurde aktualisiert
                    </h4>
                  </b-col>
                </b-row>
              </b-container>
            </b-col>
          </b-row>
        </b-container>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  name: "NewsElement",
  props: ["snews"],
  methods: {
    /**
     * Diese Methode sorgt dafür, dass der Benutzer auf die richtigen Antrag weitergeleitet wird
     * @param application The Application of the News-Element
     */
    linkToApplication(uuid) {
      if (this.checkClick()) {
        this.$emit("change-component", "ApplicationView", true, uuid);
      }
    },
    /**
     * Diese Methode meldet den Benutzer vom System ab
     */
    logout() {
      if (this.checkClick()) {
        this.$emit("logout");
      }
    },
    /**
     * Diese Methode leitet den Benutzer auf die AccountView-Seite weiter
     */
    accountView() {
      if (this.checkClick()) {
        this.changeComponent("AccountView");
      }
    },
    /**
     * Diese Methode sorgt dafür, dass nicht unnötigerweise geclickt wird, falls nur makiert worden ist
     */
    checkClick() {
      if (
        window
          .getSelection()
          .toString()
          .trim() === ""
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

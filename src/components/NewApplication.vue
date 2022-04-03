<!-- Komponente zum auswählen der Art des neuen Antrags -->
<template>
  <b-container fluid>
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
    <b-row id="new-application-row" align-h="center">
      <b-col cols="12">
        <b-container fluid>
          <b-row>
            <b-col cols="12">
              <!-- Verzeichnisanzeige -->
              <b-breadcrumb
                style="background-color: white"
                :items="items"
              ></b-breadcrumb>
            </b-col>
          </b-row>
          <b-row id="na-srow" align-h="center" align-v="center">
            <b-col cols="12" md="6" lg="4">
              <b-container id="school-button" class="na-elem shadow-xl">
                <!-- Custom Button zum erstellen eines Schulantrages -->
                <b-row
                  class="na-elem-sr"
                  align-v="center"
                  v-on:click="school()"
                >
                  <b-col cols="12">
                    <h2 class="na-elem-h">Schulveranstaltung</h2>
                  </b-col>
                </b-row>
              </b-container>
              <b-container
                id="na-elem-2"
                class="na-elem shadow-xl"
                style="border-radius:0px"
              >
                <!-- Custom Button zum erstellen eines anderen Antrages -->
                <b-row
                  class="na-elem-sr"
                  align-h="center"
                  align-v="center"
                  v-on:click="workshop()"
                >
                  <b-col cols="12">
                    <h2 class="na-elem-h">Fortbildung</h2>
                  </b-col>
                </b-row>
              </b-container>
              <b-container id="na-elem-2" class="na-elem shadow-xl">
                <!-- Custom Button zum erstellen eines anderen Antrages -->
                <b-row
                  class="na-elem-sr"
                  align-h="center"
                  align-v="center"
                  v-on:click="otherCause()"
                >
                  <b-col cols="12">
                    <h2 class="na-elem-h">Anderer Grund</h2>
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
  name: "NewApplication",
  methods: {
    /**
     * Diese Methode ändert die angezeigte Komponente
     * @param component Die neue Komponente, welche angezeigt werden soll
     * @param back Boolean-Wert, ob die neue Komponente in die History des Browsers gespeichert werden soll
     */
    changeComponent(component, back = true) {
      this.$emit("change-component", component, back);
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
    },
    /**
     * Diese Methode leitet den Benutzer auf die Schulveranstaltungs-Seite weiter
     */
    school() {
      if (this.checkClick()) {
        this.changeComponent("School");
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
     * Diese Methode leitet den Benutzer auf die Startseite weiter
     */
    index() {
      if (this.checkClick()) {
        this.changeComponent("Index");
      }
    },
    /**
     * Diese Methode leitet den Benutzer auf die Workshop-Seite weiter
     */
    workshop() {
      if (this.checkClick()) {
        this.changeComponent("Workshop");
      }
    },
    /**
     * Diese Methode leitet den Benutzer auf die OtherCause-Seite weiter
     */
    otherCause() {
      if (this.checkClick()) {
        this.changeComponent("OtherCause");
      }
    }
  },
  data() {
    return {
      items: [
        {
          //text: "Antrag Übersicht",
          //active: true
        }
      ]
    };
  }
};
</script>

<!-- Komponente zum Suchen eines Antrages -->
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
    <b-row align-v="center" align-h="center">
      <b-col cols="12" md="6">
        <h1 id="new-application-heading">Antrag Suchen</h1>
      </b-col>
      <div class="col-12 col-md-6">
        <!-- Neuer Antrag Button -->
        <b-button
          variant="outline-primary"
          class="float-right"
          v-on:click="newApplication"
          style="margin-right:20px"
        >
          <b-icon icon="plus" aria-hidden="true"></b-icon> Neuer Antrag
        </b-button>
      </div>
    </b-row>
    <b-row align-h="center" align-v="center" style="margin-top:3rem">
      <b-col>
        <!-- Input zur eingabe der ID des gewünschten Antrags -->
        <b-form-group
          id="search-application"
          label-cols-sm="4"
          label-cols-lg="3"
          content-cols-sm
          content-cols-lg="7"
          description="Geben Sie die ID des gewünschten Antrags ein."
          label-for="search"
        >
          <b-input-group id="search" prepend="Antrags ID" class="mt-3">
            <b-form-input v-model="searching"></b-form-input>
            <b-input-group-append>
              <!-- Antrag suchen -->
              <b-button v-on:click="search" variant="info">Suchen</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";
export default {
  props: ["url", "user", "token", "refresh_token"],
  data() {
    return {
      searching: ""
    };
  },
  methods: {
    /**
     * Diese Methode leitet den Benutzer auf die NewApplication-Seite weiter
     */
    newApplication() {
      if (this.checkClick()) {
        this.changeComponent("NewApplication");
        this.changeURL("NewApplication");
      }
    },
    /**
     * Diese Methode ändert die angezeigte Komponente
     * @param component Die neue Komponente, welche angezeigt werden soll
     * @param back Boolean-Wert, ob die neue Komponente in die History des Browsers gespeichert werden soll
     * @param application Die ID des Antrags, welcher angezeigt werden soll
     */
    changeComponent(component, back = true, application = null) {
      this.$emit("change-component", component, back, application);
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
     * Diese Methode leitet den Benutzer auf die Startseite weiter
     */
    index() {
      if (this.checkClick()) {
        this.changeComponent("Index");
        this.changeURL("Index");
      }
    },
    /**
     * Diese Methode zeigt dem Benutzer an, dass keine ID in das Suchfeld eingegeben worden ist
     */
    makeToast() {
      this.$bvToast.toast("Es wurde keine ID eingegeben!", {
        title: "Ein Fehler ist aufgetreten!",
        autoHideDelay: 2500,
        appendToast: false,
        variant: "danger"
      });
    },
    /**
     * Diese Methode gibt die ID des Antrgas zurück
     * @returns Die ID des Antrags
     */
    requestApplication() {
      axios
        .get(this.url + "/getApplication?uuid=" + this.searching, {
          headers: {
            Authorization: "Basic " + this.token
          }
        })
        .then(response => {
          if (response.data.uuid !== "") {
            this.changeComponent("ApplicationView", true, response.data.uuid);
            this.changeURL("ApplicationView");
          } else {
            this.failedLoad();
          }
        })
        .catch(error => {
          switch (error.response.status) {
            case 401:
              axios
                .post(this.url + "/login/refresh", {
                  refresh_token: this.refresh_token
                })
                .then(resp => {
                  this.$emit(
                    "updateToken",
                    resp.data.access_token,
                    resp.data.refresh_token
                  );
                  axios
                    .get(this.url + "/getApplication?uuid=" + this.searching, {
                      headers: {
                        Authorization: "Basic " + resp.data.access_token
                      }
                    })
                    .then(res => {
                      if (res.data.uuid !== "") {
                        this.changeComponent(
                          "ApplicationView",
                          true,
                          res.data.uuid
                        );
                        this.changeURL("ApplicationView");
                      } else {
                        this.failedLoad();
                      }
                    })
                    .catch(e => {
                      e.toString();
                      return false;
                    });
                })
                .catch(err => {
                  err.toString();
                  this.$emit("logout");
                });
              break;
            default:
              return false;
          }
        });
    },
    /**
     * Diese Methode lädt den gefragten Antrag und leitet den Benutzer darauf weiter
     */
    search() {
      if (this.checkClick()) {
        if (this.searching === "") {
          this.makeToast();
        } else {
          this.requestApplication();
        }
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
     * Diese Methode zeigt dem Benutzer an, dass der Antrag einen Fehler beim Laden hatte
     */
    failedLoad() {
      this.$bvToast.toast("Es ist ein Fehler aufgetreten!", {
        title: "Antrag konnte nicht geladen werden",
        autoHideDelay: 2500,
        appendToast: false,
        variant: "danger"
      });
    },
    /**
     * Diese Methode sorgt dafür, dass die URL angepasst ist, damit keine Reste des Viewers (ApplicationSearch) in der URL stehen
     * @param nextpage Die nächste Seite, welche aufgerufen wird
     */
    changeURL(nextpage) {
      if (window.location.href.indexOf("/viewer") >= 0) {
        history.replaceState(
          nextpage,
          null,
          window.location.href.substring(
            0,
            window.location.href.indexOf("/viewer")
          )
        );
      }
    }
  }
};
</script>

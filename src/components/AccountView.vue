<!-- Template für einen Antrag einer Schulveranstaltung -->
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
        <li class="nav-item active"><a href v-on:click="accountView" class="nav-link">Konto <span class="sr-only">(current)</span></a></li>
        <li class="nav-item"><a href v-on:click="logout" class="nav-link">Abmelden</a></li>
      </ul>
    </div>
  </div>
</nav>
    <b-row align-h="center">
      <b-col cols="12">
        <b-container fluid>
          <b-row>
            <b-col cols="12">
              <!-- Verzeichnisanzeige -->
              <b-breadcrumb style="background-color: white; margin-top: 5%">
                <b-breadcrumb-item active
                  >Benutzerdaten Übersicht</b-breadcrumb-item
                >
              </b-breadcrumb>
            </b-col>
          </b-row>
          <b-row align-h="center">
            <b-col cols="12" md="8">
              <!-- Benutzername -->
              <b-form-group
                id="be"
                label-cols-sm="4"
                label-cols-lg="3"
                content-cols-sm
                content-cols-lg="7"
                description="Benutzername ändern"
                label="Benutzername"
                label-for="benutzername"
              >
                <b-form-input
                  id="benutzername"
                  v-model="data.nameData"
                  :state="Benutzern"
                  v-on:input="checkBenutzern"
                  placeholder="Benutzername Placeholder"
                >
                </b-form-input>
              </b-form-group>
              <!-- Vorname -->
              <b-form-group
                id="pw"
                label-cols-sm="4"
                label-cols-lg="3"
                content-cols-sm
                content-cols-lg="7"
                description="Vorname ändern"
                label="Vorname"
                label-for="passwort"
              >
                <b-form-input
                  id="passwort"
                  v-model="data.pwData"
                  :state="Passw"
                  v-on:input="checkPassw"
                  placeholder="Vorname Placeholder"
                >
                </b-form-input>
              </b-form-group>
              <!-- Nachname -->
              <b-form-group
                id="pw"
                label-cols-sm="4"
                label-cols-lg="3"
                content-cols-sm
                content-cols-lg="7"
                description="Nachname ändern"
                label="Nachname"
                label-for="passwort"
              >
                <b-form-input
                  id="passwort"
                  v-model="data.pwData"
                  :state="Passw"
                  v-on:input="checkPassw"
                  placeholder="Nachname Placeholder"
                >
                </b-form-input>
              </b-form-group>
           
              <center>
                <!-- Button um zu den Begleitformularen zu kommen -->
                <button class="blueish-gradiant">
                  <a
                    id="forgotten-password"
                    href="https://elearning.tgm.ac.at/login/forgot_password.php"
                    >Passwort ändern</a
                  >
                </button>
              </center>
            </b-col>
          </b-row>
        </b-container>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  name: "AccountView",
  methods: {
    /**
     * Diese Methode ändert die angezeigte Komponente
     * @param component Die neue Komponente, welche angezeigt werden soll
     * @param back Boolean-Wert, ob die neue Komponente in die History des Browsers gespeichert werden soll
     * @param application Die ID des Antrags, welcher angezeigt werden soll
     * @param escortsdata Die Daten der Schulveranstaltung
     */
    changeComponent(
      component,
      back = true,
      application = null,
      escortsdata = null
    ) {
      this.$emit("change-component", component, back, application, escortsdata);
    },
    logout() {
      if (this.checkClick()) {
        this.$emit("logout");
      }
    },
    /**
     * Diese Methode sorgt dafür, dass nicht unnötigerweise geklickt wird, falls nur makiert worden ist
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
      }
    },
    /**
     * Diese Methode wandelt die Zahl inputs von Strings in Ints um
     */
    makeNumber() {
      for (let i = 0; i < this.data.count_student_male.length; i++) {
        this.data.count_student_male[i] = Number(
          this.data.count_student_male[i]
        );
        this.data.count_student_female[i] = Number(
          this.data.count_student_female[i]
        );
      }
    },
    /**
     * Diese Methode zeigt dem Benutzer an, dass nicht alle Felder richtig ausgefüllt worden sind
     */
    makeToast() {
      this.$bvToast.toast("Es wurden nicht alle Felder richtig ausgefüllt!", {
        title: "Ein Fehler ist aufgetreten!",
        autoHideDelay: 2500,
        appendToast: false,
        variant: "danger"
      });
    },
    /**
     * Diese Methode leitet den Benutzer weiter, sofern alle Daten richtig gesetzt worden sind
     */
    next() {
      if (this.checkClick()) {
        if (this.validInputs) {
          this.makeUpper();
          this.makeNumber();
          this.calculateLength();
          this.changeComponent("Escorts", true, null, this.data);
        } else {
          this.makeToast();
          if (this.Time === null) this.Time = false;
          if (this.Desc === null) this.Desc = false;
          if (this.Students === null) this.Students = false;
          if (this.Class === null) this.Class = false;
          if (this.Start === null) this.Start = false;
          if (this.Ziel === null) this.Ziel = false;
        }
      }
    },
    /**
     * Diese Methode schreibt alle Klassen richtig an
     */
    makeUpper() {
      for (let i = 0; i < this.data.class.length; i++) {
        this.data.class[i] = this.data.class[i].toUpperCase();
      }
    },
    /**
     * Diese Methode überprüft, ob der neue Benutzername gültig ist
     */
    checkBenutzern() {
      if (this.data.nameData === "") {
        this.Benutzern = false;
      } else {
        this.Benutzern = true;
      }
      this.checkInputs();
    },
    /**
     * Diese Methode überprüft, ob das neue Passwort gültig ist
     */
    checkPassw() {
      if (this.data.pwData === "") {
        this.Passw = false;
      } else {
        this.Passw = true;
      }
      this.checkInputs();
    },
    /**
     * Diese Methode überprüft, ob die Eingaben valide sind
     */
    checkInputs() {
      if (
        this.Time === true &&
        this.Desc === true &&
        this.Class === true &&
        this.Start === true &&
        this.Ziel === true
      ) {
        for (let i = 0; i < this.Students.length; i++) {
          if (!this.Students[i]) {
            this.validInputs = false;
            return;
          }
        }
        this.validInputs = true;
      } else {
        this.validInputs = false;
      }
    }
  },
  data() {
    return {
      data: {
        nameData: "",
        pwData: "",
        options: [
        { item: "2", name: "Seminar" },
        { item: "3", name: "Tagung" },
        { item: "4", name: "Lehrgang" },
        { item: "5", name: "Sonstiges" }
      ]
      },
      validInputs: false,
      Time: null,
      Desc: null,
      Class: null,
      Students: [],
      Start: null,
      Ziel: null
    };
  }
};
</script>

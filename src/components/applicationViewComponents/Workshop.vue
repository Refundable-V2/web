<!-- Template für Fortbildungsanträge -->
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
    <b-row align-h="center">
      <b-col cols="12">
        <b-container fluid>
          <b-row align-h="center">
            <b-col cols="12" md="8">
              <!-- Bezeichnung der Fortbildung -->
              <b-form-group
                id="titel"
                label-cols-sm="4"
                label-cols-lg="3"
                content-cols-sm
                content-cols-lg="7"
                description="Geben Sie den Titel der Fortbildung ein."
                label="Titel"
                label-for="tit"
              >
                <b-form-input
                  id="tit"
                  v-model="data.name"
                  :readonly="readonly"
                  @input="updateData"
                ></b-form-input>
              </b-form-group>
              <!-- Startdatum der Fortbildung -->
              <b-form-group
                id="startd"
                label-cols-sm="4"
                label-cols-lg="3"
                content-cols-sm
                content-cols-lg="7"
                description="Geben Sie das Startdatum der Fortbildung ein."
                label="Startdatum"
                label-for="std"
              >
                <b-form-datepicker
                  id="std"
                  v-model="startDate"
                  :readonly="readonly"
                  @input="updateTime"
                  class="mb-2"
                  placeholder="Datum auswählen"
                ></b-form-datepicker>
              </b-form-group>
              <!-- Startzeit der Fortbildung -->
              <b-form-group
                id="startz"
                label-cols-sm="4"
                label-cols-lg="3"
                content-cols-sm
                content-cols-lg="7"
                description="Geben Sie die Startzeit der Fortbildung ein."
                label="Startzeit"
                label-for="stz"
              >
                <b-form-timepicker
                  id="stz"
                  v-model="startTime"
                  :readonly="readonly"
                  @input="updateTime"
                  locale="de"
                  placeholder="Zeit auswählen"
                ></b-form-timepicker>
              </b-form-group>
              <!-- Enddatum der Fortbildung -->
              <b-form-group
                id="endd"
                label-cols-sm="4"
                label-cols-lg="3"
                content-cols-sm
                content-cols-lg="7"
                description="Geben Sie das Enddatum der Fortbildung ein."
                label="Enddatum"
                label-for="end"
              >
                <b-form-datepicker
                  id="end"
                  v-model="endDate"
                  :readonly="readonly"
                  @input="updateTime"
                  class="mb-2"
                  placeholder="Datum auswählen"
                ></b-form-datepicker>
              </b-form-group>
              <!-- Endzeit der Fortbildung -->
              <b-form-group
                id="endz"
                label-cols-sm="4"
                label-cols-lg="3"
                content-cols-sm
                content-cols-lg="7"
                description="Geben Sie die Endzeit der Fortbildung ein."
                label="Endzeit"
                label-for="enz"
              >
                <b-form-timepicker
                  id="enz"
                  v-model="endTime"
                  :readonly="readonly"
                  @input="updateTime"
                  locale="de"
                  placeholder="Zeit auswählen"
                ></b-form-timepicker>
              </b-form-group>
              <!-- Input für die PH-Zahl -->
              <b-form-group
                id="phzahl"
                label-cols-sm="4"
                label-cols-lg="3"
                content-cols-sm
                content-cols-lg="7"
                description="Geben Sie Ihre PH-Zahl ein."
                label="PH-Zahl"
                label-for="phz"
              >
                <b-form-input
                  id="phz"
                  v-model="data.training_details.ph"
                  :readonly="readonly"
                  @input="updateData"
                  type="number"
                  min="1"
                  max="3000"
                ></b-form-input>
              </b-form-group>
              <!-- Name des Veranstalters -->
              <b-form-group
                id="veran"
                label-cols-sm="4"
                label-cols-lg="3"
                content-cols-sm
                content-cols-lg="7"
                description="Geben Sie den Namen des Veranstalters ein."
                label="Veranstalter"
                label-for="ver"
              >
                <b-form-input
                  id="ver"
                  v-model="data.training_details.organizer"
                  :readonly="readonly"
                  @input="updateData"
                ></b-form-input>
              </b-form-group>
              <!-- Art der Fortbildung -->
              <b-form-group
                id="art"
                label-cols-sm="4"
                label-cols-lg="3"
                content-cols-sm
                content-cols-lg="7"
                description="Wählen Sie die Art der Fortbildung."
                label="Art"
                label-for="ar"
              >
                <b-form-radio-group
                  id="ar"
                  v-model="data.training_details.kind"
                  @input="updateData"
                  :disabled="readonly"
                  :options="options"
                  class="mb-3"
                  value-field="item"
                  text-field="name"
                  disabled-field="notEnabled"
                ></b-form-radio-group>
              </b-form-group>
              <!-- Bezeichnung der Sonstigen Art, falls diese ausgewählt wurde -->
              <b-form-group
                id="sonst"
                label-cols-sm="4"
                label-cols-lg="3"
                content-cols-sm
                content-cols-lg="7"
                description="Geben Sie Sonstige Art ein."
                label="Sonstige Art"
                label-for="son"
                v-if="data.training_details.kind === 5"
              >
                <b-form-input
                  id="son"
                  v-model="data.training_details.miscellaneous_reason"
                  @input="updateData"
                  :readonly="readonly"
                ></b-form-input>
              </b-form-group>
              <!-- Zusätzliche Anmerkungen -->
              <b-form-group
                id="anmerkung"
                label-cols-sm="4"
                label-cols-lg="3"
                content-cols-sm
                content-cols-lg="7"
                description="Geben Sie zusätzliche Anmerkungen an."
                label="Anmerkungen"
                label-for="an"
              >
                <b-form-textarea
                  id="an"
                  :readonly="readonly"
                  v-model="data.notes"
                  @input="updateData"
                  placeholder="Anmerkungen"
                  rows="3"
                  no-resize
                ></b-form-textarea>
              </b-form-group>
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
  props: ["data", "readonly"],
  data() {
    return {
      selected: "",
      options: [
        { item: 2, name: "Seminar" },
        { item: 3, name: "Tagung" },
        { item: 4, name: "Lehrgang" },
        { item: 5, name: "Sonstiges" }
      ],
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: ""
    };
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
  mounted() {
    var start = new Date(this.data.start_time);
    var end = new Date(this.data.end_time);
    this.startDate =
      start.getFullYear() +
      "-" +
      (start.getMonth() + 1) +
      "-" +
      start.getDate();
    this.endDate =
      end.getFullYear() + "-" + (end.getMonth() + 1) + "-" + end.getDate();
    this.startTime = start.getHours() + ":" + start.getMinutes();
    this.endTime = end.getHours() + ":" + end.getMinutes();
  },
  methods: {
    /**
     * Diese Methode sendet die aktuellen Daten an den Parent
     */
    updateData() {
      this.$emit("update", this.data);
    },
    /**
     * Diese Methode wandelt die Zeiteingaben in ein valides Datum um und ruft die updateData-Methode
     */
    updateTime() {
      var start = new Date(this.startDate);
      start.setHours(this.startTime.split(":")[0]);
      start.setMinutes(this.startTime.split(":")[1]);
      var end = new Date(this.endDate);
      end.setHours(this.endTime.split(":")[0]);
      end.setMinutes(this.endTime.split(":")[1]);
      this.data.start_time = start;
      this.data.end_time = end;
      this.updateData();
    }
  }
};
</script>

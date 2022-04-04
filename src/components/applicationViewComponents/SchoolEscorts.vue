<!-- Template fpr die Anträge der Begleiter der Schulveranstaltungen -->
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
    <b-row>
      <b-col cols="12">
        <!-- Input für das Startdatum der SV -->
        <b-form-group
          id="startd"
          label-cols-sm="4"
          label-cols-lg="3"
          content-cols-sm
          content-cols-lg="7"
          description="Geben Sie das Startdatum der Schulveranstaltung ein."
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
        <!-- Input für die Startzeit der SV -->
        <b-form-group
          id="startz"
          label-cols-sm="4"
          label-cols-lg="3"
          content-cols-sm
          content-cols-lg="7"
          description="Geben Sie die Startzeit der Schulveranstaltung ein."
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
        <!-- Input für das Enddatum der SV -->
        <b-form-group
          id="endd"
          label-cols-sm="4"
          label-cols-lg="3"
          content-cols-sm
          content-cols-lg="7"
          description="Geben Sie das Enddatum der Schulveranstaltung ein."
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
        <!-- Input für die Endzeit der SV -->
        <b-form-group
          id="endz"
          label-cols-sm="4"
          label-cols-lg="3"
          content-cols-sm
          content-cols-lg="7"
          description="Geben Sie die Endzeit der Schulveranstaltung ein."
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
        <!-- Input für die Gruppe der Begleitperson -->
        <b-form-group
          id="gruppe"
          label-cols-sm="4"
          label-cols-lg="3"
          content-cols-sm
          content-cols-lg="7"
          description="Wählen Sie die Gruppe der Begleitperson"
          label="Gruppe"
          label-for="gr"
        >
          <b-form-radio-group
            id="gr"
            v-model="selected"
            :disabled="readonly"
            :options="options"
            v-on:change="updateRadio"
            class="mb-3"
            value-field="item"
            text-field="name"
            disabled-field="notEnabled"
          ></b-form-radio-group>
        </b-form-group>
        <!-- Input für die Zieladresse -->
        <b-form-group
          id="starta"
          label-cols-sm="4"
          label-cols-lg="3"
          content-cols-sm
          content-cols-lg="7"
          description="Geben Sie Ihre Startadresse für diese Schulveranstaltung ein."
          label="Startaddresse"
          label-for="sta"
        >
          <b-form-input
            id="sta"
            placeholder="Straße & Nr., Postleitzahl & Ort, Land"
            v-model="data.start_address"
            :readonly="readonly"
            v-on:input="updateData"
          >
          </b-form-input>
        </b-form-group>
        <!-- Input für die Treffpunktadresse -->
        <b-form-group
          id="treff"
          label-cols-sm="4"
          label-cols-lg="3"
          content-cols-sm
          content-cols-lg="7"
          description="Geben Sie den Treffpunkt für diese Schulveranstaltung ein."
          label="Treffpunkt"
          label-for="tr"
        >
          <b-form-input
            id="tr"
            placeholder="Straße & Nr., Postleitzahl & Ort, Land"
            v-model="data.meeting_point"
            :readonly="readonly"
            v-on:input="updateData"
          >
          </b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  props: ["data", "readonly"],
  methods: {
    /**
     * Diese Methode sendet die aktuellen Daten an den Parent
     */
    updateData() {
      this.$emit("update", this.data);
    },
    /**
     * Diese Methode aktualisiert die Daten mit den Radiobuttons der Komponente
     */
    updateRadio() {
      this.data.group = this.selected;
      this.updateData();
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
      this.data.attendance_from = start;
      this.data.attendance_till = end;
      this.updateData();
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
  mounted() {
    this.selected = this.data.group;
    var start = new Date(this.data.attendance_from);
    var end = new Date(this.data.attendance_till);
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
  data() {
    return {
      selected: "",
      options: [
        { item: 1, name: "L1" },
        { item: 2, name: "L2" },
        { item: 3, name: "L3" }
      ],
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: ""
    };
  }
};
</script>

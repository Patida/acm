<template>
  <div>
   <!--  <div>{{ carData }}</div> -->



        <img class="car" src="../assets/car2go.png" height="87" width="140">

        <table>
          <tr>


          </tr>
          <tr>
            <td class="green">Strecke</td>
            <td>{{ carData.distance/1000 }} km</td>

          </tr>

          <tr>
            <td class="green">Preis</td>
            <td>{{carData.duration / 250 }} € </td>

          </tr>




        </table>


  </div>
</template>

<script>
  export default {
    name: "prices",
    props: {
      carData: '',

    },

    data() {
      return {
        imagelink: '../assets/downarrow.png',

      }
    },

    methods: {
    }
  }

</script>

<style scoped>


table {
    border-collapse: collapse;
    width: 50%;
    margin: auto;
}

th, td {
    text-align: left;
    padding: 8px;

}

tr {
  background-color: #f2f2f2;
}

tr {
      width: 30px;
}

.green {
  background-color: #3f51b5;
  color: white;
/*  font-weight: bold; */
}

.car {
  padding: 10px;
  width: 140px;
  height: 87px;
}

</style>

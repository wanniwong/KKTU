<template>
      <!-- <q-layout 
      view="lHh lpr lFf" 
      container 
      style="height: 650px" 
      class="shadow-2 rounded-borders"> -->
      <q-page style="background: linear-gradient(0deg, rgba(9,63,79, 0.6)0%, rgba(89,181,215, 0.1)) 100%">
        <q-header elevated  
        class="bg-white">
          <q-toolbar class="text-center" >
            <q-btn  
            v-go-back="'/topupexact'" 
            style="color:black" 
            flat 
            round 
            dense 
            icon="chevron_left" />
              <q-toolbar-title 
              class="text-subtitle1 text-black text-bold" align="center">
              Payment Fail
              </q-toolbar-title>
          </q-toolbar>
        </q-header>

<q-separator/>
        <q-page-container>
            <q-page>
                <div class="card ">
                    <q-card style="box-shadow:none" > 
                        <div class="column" style="height: 150px">
                            <div class="text-center col-5" style="margin-top:40px">
                                <img src="~assets/imgs/icons8-cancel-64.png" width="100px">
                            </div>
                        </div>
                            <div class="text-center" align="center" style="margin-top:10px"> 
                                <div style="margin-top:10px">
                                    <p class="text-bold" style="font-size:24px">Unsuccessful</p><p class="text-bold"> <br>The payment did not go through. <br> Please try again later. </p>
                                </div>
                                
                            </div>

                    </q-card>
                </div>
  
            <q-btn to="/topupexact"  class="full-width" label="TRY AGAIN" style="background-color:#272343; color:white" />
            </q-page>
          </q-page-container>
      </q-page>
        <!-- </q-layout> -->
</template>

<script>
</script>

<style lang="sass" scoped>
.row > div
  padding: 10px 15px

.row + .row
  margin-top: 1rem

.btn-group button 

  padding: 10px 24px;
  cursor: pointer; 
  float: left; 

.btn-group button:not(:last-child) 
  border-right: none;
.btn-group:after 
  content: "";
  clear: both;
  display: table;


</style>
<style>
.card {
    width:88%;
    height:100%;
    background-color:white;
    margin:20px;
    padding:10px;
    margin-left:30px;
    padding:30px;
    -webkit-box-shadow: 0 15px 10px #777;
  -moz-box-shadow: 0 15px 10px #777;
  box-shadow: 0 1px 5px rgb(51, 51, 51);
  border-radius: 35px;
}
</style>

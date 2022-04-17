<template>
      <q-layout 
      view="lHh lpr lFf" 
      container 
      style="height: 650px" 
      class="shadow-2 rounded-borders">
        <q-header elevated  
        class="bg-white">
          <q-toolbar class="text-center" >
            <q-btn  
            v-go-back="'/'" 
            style="color:black" 
            flat 
            round 
            dense 
            icon="chevron_left" />             
          </q-toolbar>
        </q-header>

          <q-page-container>
            <q-page>
              <div>
                  <div class="q-pa-md " align="center"> 
                    <p class="text-bold" align="center"> Please wait while you are redirecting to<br>secure bank site....</p>
                  </div>
            <div class="text-center">
              <q-spinner-ios class="pull-right on-left q-pa-sm"
              anchor="center"
              color="primary"
              size="4em"
              />
                <q-tooltip :offset="[0, 8]">Redirecting....</q-tooltip>          
            </div>
              </div>
            </q-page>
          </q-page-container>
      </q-layout>
</template>

<script>
</script>  

<style>
</style> 